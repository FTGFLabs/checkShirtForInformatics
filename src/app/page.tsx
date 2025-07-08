"use client";
import { useEffect, useState } from "react";

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
      console.log()
      setStudent(found);
      setError("");
    } else {
      setStudent(null);
      setError("ไม่พบข้อมูล");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 font-sans shadow ">
      <h1 className="text-2xl font-semibold text-center mb-6">
        🔍 ตรวจสอบเสื้อโปโล
      </h1>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="กรอกรหัสนิสิต"
          className="flex-1 border rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ค้นหา
        </button>
      </div>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {student && (
        <div className="p-4 space-y-2 text-sm ">
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

          <a href={student.photo}>click to show image</a>
        </div>
      )}
    </div>
  );
}
