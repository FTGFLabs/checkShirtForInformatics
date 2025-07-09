'use client'
import { toast } from "sonner";
import { CiShare2 } from "react-icons/ci";

const ButtonShare = () => {
  const handleShare = async () => {
    const myUrl = `${window.location.origin}`;

    try {
    if (navigator.share) {
        await navigator.share({
        title: "informatics shirt",
        text: "informatics shirt",
        url: myUrl,
        });
    } else {
        await navigator.clipboard.writeText(myUrl);
        toast.success("Share link copied to clipboard!");
    }
    } catch{
      toast.error("Failed to share. Please try again.");
    }
};
  return (
    <button
      onClick={handleShare}
      className="h-10 w-full cursor-pointer rounded-sm border border-black/20 bg-white text-black opacity-70 shadow hover:bg-gray-100"
    >
      <div className="flex items-center justify-center gap-1 font-semibold">
        <CiShare2 />
        <p>ส่งต่อ</p>
      </div>
    </button>
  );
}

export default ButtonShare