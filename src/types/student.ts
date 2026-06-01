export interface Student {
  id: string;
  name: string;
  group: string;
  size: string;
  total: string;
  status: string;
  photo: string;
  noteSize: string;
  noteMore: string;
  time?: string;
}

export interface SheetRow {
  "รหัสนิสิต"?: string;
  "ชื่อ-สกุล"?: string;
  "สาขา"?: string;
  "ขนาดเสื้อโปโลที่ต้องการ"?: string;
  "จำนวนเสื้อโปโล (ตัว)"?: string;
  "สถานะ"?: string;
  "หลักฐานการชำระเงิน"?: string;
  "หมายเหตุ กรณีสั่งแยกไซส์"?: string;
  "หมายเหตุเพิ่มเติม"?: string;
}
