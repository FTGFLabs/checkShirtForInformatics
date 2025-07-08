"use client";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function StudentSearch() {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://opensheet.elk.sh/14qcjBVzPtH6mYoIc_qLKaFhLpNjFtLm-xpotoPSDWts/sheet1")
      .then((res) => res.json())
      .then((json) => {
        const formatted = json.map((row: any) => ({
          id: row["รหัสนิสิต"]?.trim(),
          name: row["ชื่อ-สกุล"],
          group: row["สาขา"],
          size: row["ขนาดเสื้อโปโลที่ต้องการ"],
          total: row["จำนวนเสื้อโปโล (ตัว)"],
          status: row["สถานะ"],
          photo: row["หลักฐานการชำระเงิน"]
        }));
        setData(formatted);
      });
  }, []);

  const handleSearch = () => {
    const found = data.find((s) => s.id === searchId.trim());
    if (found) {
      setStudent(found);
      setError("");
    } else {
      setStudent(null);
      setError("ไม่พบข้อมูล");
    }
  };

  return (
    <div className="max-w-md mx-4 md:mx-auto p-10 font-sans shadow-xl rounded-lg bg-[#FFF]">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-center">
          ตรวจสอบเสื้อโปโล
        </h1>
        <h2 className="text-sm text-center text-gray-400">
          คณะวิทยาการสารสนเทศ
        </h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="space-y-2"
      >
        <div className="flex content-center gap-2 items-center">
          <FaUser />
          <h3>รหัสนิสิต</h3>
        </div>
        <input
          type="text"
          placeholder="กรอกรหัสนิสิต"
          className="border-none flex h-9 w-full rounded-md border border-input bg-transparent px-4 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm space-y-2"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </form>

      {error && <p className="text-center text-red-500 p-4">{error}</p>}

      {student && (
        <div className="p-4 space-y-2 text-lg ">
          <p>
            <strong>📌 รหัสนิสิต:</strong> {student.id}
          </p>
          <p>
            <strong>👤 ชื่อ:</strong> {student.name}
          </p>
          <p>
            <strong>🏫 สาขา:</strong> {student.group}
          </p>
          <p>
            <strong>📏 ขนาดเสื้อ:</strong> {student.size}
          </p>
          <p>
            <strong>🔢 จำนวน:</strong> {student.total}
          </p>
          <p>
            <strong>✅ สถานะ:</strong> {student.status}
          </p>
          <div className="flex">
          <p>ตรวจสอบสลิป</p>
          <a href={student.photo}>click</a>
          </div>
        </div>
      )}
    </div>
  );
}
