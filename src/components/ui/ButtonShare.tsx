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
      className="cursor-pointer w-full h-10 border border-black/20 rounded-sm text-black bg-white hover:bg-gray-100 "
    >
      <div className="flex items-center justify-center gap-1">
        <CiShare2 />
        <p>Share</p>
      </div>
    </button>
  );
}

export default ButtonShare