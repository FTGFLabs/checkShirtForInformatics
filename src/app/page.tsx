"use client";
import ButtonContact from "@/components/ui/ButtonContact";
import ButtonShare from "@/components/ui/ButtonShare";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import ButtonSlip from "@/components/ui/ButtonSlip";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";

type Student = {
  time: string;
  id: string;
  name: string;
  group: string;
  size: string;
  total: string;
  status: string;
  photo: string;
  noteSize: string;
  noteMore: string;
  [key: string]: string;
};

export default function StudentSearch() {
  const [data, setData] = useState<Student[]>([]);
  const [searchId, setSearchId] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState("");
  const URL = process.env.NEXT_PUBLIC_URL

  useEffect(() => {
    if (!URL) return;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        const formatted = json.map((row: Student) => ({
          id: row["รหัสนิสิต"]?.trim(),
          name: row["ชื่อ-สกุล"],
          group: row["สาขา"],
          size: row["ขนาดเสื้อโปโลที่ต้องการ"],
          total: row["จำนวนเสื้อโปโล (ตัว)"],
          status: row["สถานะ"],
          photo: row["หลักฐานการชำระเงิน"],
          noteSize: row["หมายเหตุ กรณีสั่งแยกไซส์"],
          noteMore: row["หมายเหตุเพิ่มเติม"],
        }));
        setData(formatted);
      }).catch((error) =>{
        toast.error("ไม่สามารถโหลดข้อมูลได้")
      });
  }, []);

  const handleSearch = () => {
    if (searchId.length !== 8) {
      toast.error("กรุณากรอกรหัสนิสิตให้ครบ 8 หลัก");
      return;
    }

    const matched = data.filter((s) => s.id === searchId.trim());
    // const matched = data.filter((s) => s.id.includes(searchId.trim()));

    if (matched.length > 0) {
      setStudents(matched);
      setError("");
      setSearchId("");
      toast.success(`พบการสั่งซื้อ ${matched.length} รายการ`);
    } else {
      setStudents([]);
      setError("ไม่พบข้อมูล");
      toast.error("ไม่พบข้อมูลนิสิต", {
        description: "กรุณาตรวจสอบรหัสนิสิตอีกครั้ง",
      });
    }
  };


  return (
    <div className="m-2 h-auto w-200 max-w-md content-center items-center justify-center space-y-2 rounded-sm bg-[#FFF] p-8 font-sans text-black shadow-xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-center text-2xl font-semibold">ตรวจสอบเสื้อโปโล</h1>
        <h2 className="text-center text-sm text-gray-400">
          คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา
        </h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="space-y-2"
      >
        <div className="flex content-center items-center gap-2">
          <FaUser />
          <h3>รหัสนิสิต</h3>
        </div>
        <Input
          inputMode="numeric"
          maxLength={8}
          placeholder="กรอกรหัสนิสิต 8 หลัก"
          value={searchId}
          onChange={(e) => {
            // regEx limit number length 8
            const value = e.target.value;
            if (/^\d{0,8}$/.test(value)) {
              setSearchId(value);
            }
          }}
        />
        <button
          type="submit"
          className={`w-full shadow-sm ${
            searchId.length !== 8
              ? "cursor-not-allowed border border-black/20 opacity-70"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } rounded-md px-4 py-2 font-semibold shadow`}
        >
          ค้นหา
        </button>
      </form>


      {students.length > 0 && (
        <div className="mt-6 space-y-6">
          {students.map((student, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-800 shadow-md"
            >
              <h2 className="mb-4 text-center text-xl font-semibold">
                การสั่งซื้อครั้งที่ {index + 1}
              </h2>
              <div className="space-y-2 text-base">
                <p>
                  <strong>รหัสนิสิต:</strong> {student.id}
                </p>
                <p>
                  <strong>ชื่อ:</strong> {student.name}
                </p>
                <p>
                  <strong>สาขา:</strong> {student.group}
                </p>
                <p>
                  <strong>ขนาดเสื้อ:</strong> {student.size}
                  <strong> จำนวน:</strong> {student.total} ตัว
                </p>
                {student.noteSize !== "-" && (
                  <p>
                    <strong>หมายเหตุกรณีสั่งแยกไซส์:</strong> {student.noteSize}
                  </p>
                )}

                {/* if have noteMore show it up */}
                {student.noteMore && (
                  <p>
                    <strong>หมายเหตุเพิ่มเติม:</strong>{" "}
                    {/* check if link with regEx */}
                    {/^https?:\/\//.test(student.noteMore) ? (
                      <a
                        href={student.noteMore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        เปิดลิงก์
                      </a>
                    ) : (
                      student.noteMore
                    )}
                  </p>
                )}

                <p>
                  <strong>สถานะ:</strong> {student.status}
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                <ButtonSlip photoUrl={student.photo} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* footer */}
      <hr className="my-4 border-t border-gray-300" />
      <div className="flex gap-4">
        <ButtonShare />
        <ButtonContact />
      </div>
      <Footer />
    </div>
  );
}
