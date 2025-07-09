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
        className="shadow opacity-70 cursor-pointer w-full h-10 border border-black/20  rounded-sm text-black bg-white hover:bg-gray-100"
      >
        <div className="flex items-center justify-center gap-1 font-semibold">
          <GrContact />
          <p>ติดต่อ</p>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-3xl font-bold cursor-pointer transition-colors duration-200"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">ติดต่อเรา</h2>

            <div className="space-y-4 text-center text-gray-700">
              <p className="font-semibold">ช่องทางการติดต่อ</p>

              <div className="flex justify-center gap-6 text-blue-600 text-xl">
                <a
                  href="https://www.facebook.com/SmoInformaticsBuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-800 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/smoif.buu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://x.com/smoif_buu?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-800 transition-colors"
                  aria-label="X Twitter"
                >
                  <FaSquareXTwitter />
                </a>
              </div>

              <p className="font-semibold">อีเมลสำหรับติดต่อ (แตะเพื่อคัดลอก)</p>
              <div className="flex flex-col gap-2">
                {[email].map((email) => (
                  <button
                    key={email}
                    onClick={() => copyToClipboard(email)}
                    className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-md py-2 px-4 cursor-pointer select-all"
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
