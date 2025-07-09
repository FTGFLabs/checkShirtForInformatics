'use client'
import * as React from "react"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={
          "flex h-10 w-full rounded-md border border-black/20 bg-transparent px-4 py-1 text-base shadow-sm transition-colors " +
          "placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none" +
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" +
          className
        }
        {...props}
      />
    );
  }
)

Input.displayName = "Input"

export { Input }

