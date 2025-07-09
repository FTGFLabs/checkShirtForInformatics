export default function Footer() {
  const footerDetail = process.env.NEXT_PUBLIC_FOOTER_DETAIL;

    return (
      <div className="flex justify-center p-2 gap-2">
        <p className="text-[8px] md:text-[12px] text-gray-400">
          {footerDetail}
        </p>
      </div>
    );
  }