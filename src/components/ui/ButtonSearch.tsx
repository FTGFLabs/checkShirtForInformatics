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
        className={`w-full shadow-sm font-semibold py-2 px-4 rounded-md ${
          isDisabled
            ? "opacity-70 border border-black/20 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
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



