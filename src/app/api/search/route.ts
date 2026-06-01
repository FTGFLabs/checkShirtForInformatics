import { NextResponse } from "next/server";
import { SheetRow } from "@/types/student";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();
  const warm = searchParams.get("warm")?.trim() === "true";

  if (!id && !warm) {
    return NextResponse.json({ error: "กรุณาระบุรหัสนิสิต" }, { status: 400 });
  }

  const url = process.env.SHEET_API_URL;
  if (!url) {
    console.error("SHEET_API_URL environment variable is not defined");
    return NextResponse.json({ error: "API URL configuration is missing on server" }, { status: 500 });
  }

  try {
    // Next.js automatically caches fetches by default in version 15 unless configured otherwise
    // We cache on the server for 60 seconds to ensure high performance
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error(`Failed to fetch from sheet: ${res.statusText}`);
      return NextResponse.json({ error: "ไม่สามารถเชื่อมต่อฐานข้อมูลได้" }, { status: 502 });
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("Sheet data is not an array:", data);
      return NextResponse.json({ error: "ข้อมูลจากฐานข้อมูลไม่ถูกต้อง" }, { status: 502 });
    }

    // If it's a cache warming request, we return early without any student data
    if (warm) {
      return NextResponse.json({ success: true, warmed: true });
    }

    const rows = data as SheetRow[];

    const matched = rows.filter((row) => {
      const studentId = row["รหัสนิสิต"]?.toString().trim();
      return studentId === id;
    });

    // Format fields securely and only return the matching student data
    const formatted = matched.map((row) => ({
      id: row["รหัสนิสิต"]?.trim() || "",
      name: row["ชื่อ-สกุล"] || "",
      group: row["สาขา"] || "",
      size: row["ขนาดเสื้อโปโลที่ต้องการ"] || "",
      total: row["จำนวนเสื้อโปโล (ตัว)"] || "",
      status: row["สถานะ"] || "",
      photo: row["หลักฐานการชำระเงิน"] || "",
      noteSize: row["หมายเหตุ กรณีสั่งแยกไซส์"] || "",
      noteMore: row["หมายเหตุเพิ่มเติม"] || "",
    }));

    return NextResponse.json({ data: formatted });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
