'use client'
import { useState } from "react";
import { GrContact } from "react-icons/gr";
import { toast } from "sonner";
import { useEffect } from "react";
import Link from "next/link";

const ButtonContact = () => {
  const [open, setOpen] = useState(false);
  const email1 = "papangkorn.pitjawong.work@gmail.com";
  const email2 = "67160063@go.buu.ac.th";
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success(`${email} copied to clipboard!`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer w-full h-10 border border-black/20 rounded-sm text-black bg-white hover:bg-gray-100"
      >
        <div className="flex items-center justify-center gap-1">
          <GrContact />
          <p>Contact</p>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-2">Contact Me</h2>
            <p className="text-sm text-gray-700 mb-4">
              Send an email to:
            </p>
            <button onClick={() => copyToClipboard(email1)} className="cursor-pointer">
              <p className="font-medium text-blue-600 mb-4">{email1}</p>
            </button>
            <button onClick={() => copyToClipboard(email2)} className="cursor-pointer">
            <p className="font-medium text-blue-600 mb-4">{email2}</p>
            </button>
            <div className="flex gap-2 justify-center">
              <Link
                href={`mailto:${email1}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Open Mail App
              </Link>
              <button
                onClick={() => copyToClipboard(email1)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
              >
                Copy Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonContact;

