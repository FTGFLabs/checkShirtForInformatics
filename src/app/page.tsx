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
  id: string;
  name: string;
  group: string;
  size: string;
  total: string;
  status: string;
  photo: string;
  note: string;
  [key: string]: string;
};

export default function StudentSearch() {
  const [data, setData] = useState<Student[]>([]);
  const [searchId, setSearchId] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
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
          note: row["หมายเหตุ กรณีสั่งแยกไซส์"]
        }));
        setData(formatted);
      }).catch((error) =>{
        toast.error("ไม่สามารถโหลดข้อมูลได้")
      });
  }, []);

  
  const handleSearch = () => {
    if (searchId.length !== 8){
      toast.error("กรุณากรอกรหัสนิสิตให้ครบ 8 หลัก");  
      return
    }

    const found = data.find((s) => s.id === searchId.trim());
    if (found) {
      setStudent(found);
      setError("");
      setSearchId("");
      toast.success(`พบข้อมูลนิสิต ${found.id}`);
    } else {
      setStudent(null);
      setError("ไม่พบข้อมูล");
      toast.error("ไม่พบข้อมูลนิสิต", {
        description: "กรุณาตรวจสอบรหัสนิสิตอีกครั้ง",
      });
    }
  };

  return (
    <div className="max-w-md  m-2 p-8 h-auto w-200 font-sans shadow-xl rounded-sm bg-[#FFF] text-black space-y-2 items-center justify-center content-center ">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-center">ตรวจสอบเสื้อโปโล</h1>
        <h2 className="text-sm text-center text-gray-400">
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
        <div className="flex content-center gap-2 items-center">
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
              ? "opacity-70 border border-black/20 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }   font-semibold py-2 px-4 rounded-md shadow`}
        >
          ค้นหา
        </button>
      </form>

      {/* show when have data */}
      {student && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50 text-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-center">
            ข้อมูลนิสิต
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
            </p>
            <p>
              <strong>จำนวน:</strong> {student.total}
            </p>
            {student.note !== "-" && (
              <p>
                <strong>หมายเหตุ:</strong> {student.note}
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
      )}

     {/* footer */}
      <hr className="border-t border-gray-300 my-4" />
      <div className="flex gap-4">
        <ButtonShare />
        <ButtonContact />
      </div>
      <Footer />
    </div>
  );
}
