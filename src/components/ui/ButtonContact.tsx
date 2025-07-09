'use client'
import { useState, useEffect } from "react";
import { GrContact } from "react-icons/gr";
import { toast } from "sonner";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const ButtonContact = () => {
  const [open, setOpen] = useState(false);
  const email = "smoif.burapha@example.com";
  

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
        className="h-10 w-full cursor-pointer rounded-sm border border-black/20 bg-white text-black opacity-70 shadow hover:bg-gray-100"
      >
        <div className="flex items-center justify-center gap-1 font-semibold">
          <GrContact />
          <p>ติดต่อ</p>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="animate-fadeIn relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 cursor-pointer text-3xl font-bold text-gray-400 transition-colors duration-200 hover:text-gray-700"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="mb-4 text-center text-2xl font-bold">ติดต่อเรา</h2>

            <div className="space-y-4 text-center text-gray-700">
              <p className="font-semibold">ช่องทางการติดต่อ</p>

              <div className="flex justify-center gap-6 text-xl text-blue-600">
                <a
                  href="https://www.facebook.com/SmoInformaticsBuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-blue-800"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/smoif.buu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-pink-600"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://x.com/smoif_buu?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gray-800"
                  aria-label="X Twitter"
                >
                  <FaSquareXTwitter />
                </a>
              </div>

              <p className="font-semibold">
                อีเมลสำหรับติดต่อ (แตะเพื่อคัดลอก)
              </p>
              <div className="flex flex-col gap-2">
                {[email].map((email) => (
                  <button
                    key={email}
                    onClick={() => copyToClipboard(email)}
                    className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 transition-colors select-all hover:bg-gray-200"
                    aria-label={`Copy email ${email}`}
                  >
                    {email}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ButtonContact;
