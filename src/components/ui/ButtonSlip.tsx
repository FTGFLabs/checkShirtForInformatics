'use client'
import { IoReceiptOutline } from "react-icons/io5";

import { toast } from "sonner";

type ButtonSlipProps = {
  photoUrl: string;
};

const ButtonSlip = ({ photoUrl }: ButtonSlipProps) => {
  const handleOpenSlip = () => {
    if (photoUrl) {
      window.open(photoUrl, "_blank");
    } else {
      toast.error("ไม่พบลิงก์สลิป");
    }
  };

  return (
    <button
      onClick={handleOpenSlip}
      className="h-10 w-full cursor-pointer rounded-sm border border-black/20 bg-green-500 text-white hover:bg-green-600"
    >
      <div className="flex items-center justify-center gap-2">
        <IoReceiptOutline className="text-xl" />
        <p>กดเพื่อดูสลิป</p>
      </div>
    </button>
  );
};

export default ButtonSlip;
