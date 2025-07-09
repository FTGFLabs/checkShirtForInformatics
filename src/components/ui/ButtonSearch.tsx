'use client'
import * as React from "react";

interface ButtonSearchProps extends React.ComponentProps<"button"> {
  searchId: string;
}

const ButtonSearch = React.forwardRef<HTMLButtonElement, ButtonSearchProps>(
  ({ className = "", searchId, ...props }, ref) => {
    const isDisabled = searchId.length !== 8;
    
    return (
      <button
        ref={ref}
        type="submit"
        disabled={isDisabled}
        className={`w-full rounded-md px-4 py-2 font-semibold shadow-sm ${
          isDisabled
            ? "cursor-not-allowed border border-black/20 opacity-70"
            : "bg-blue-600 text-white hover:bg-blue-700"
        } ${className}`}
        {...props}
      >
        ค้นหา
      </button>
    );
  }
);

ButtonSearch.displayName = "ButtonSearch";

export { ButtonSearch };



