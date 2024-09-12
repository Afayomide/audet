"use client";

import { useEffect } from "react";
import "@/app/error.css";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex__column w-screen h-screen gap-4 ">
      <h2>Something went wrong!</h2>
      <button
        className="bg-primary text-white p-3 rounded-md"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
