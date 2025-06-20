"use client";

import { HOST, delay } from "@/lib/utils/helpers";
import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";

export const AddQuote = () => {
  const router = useRouter();

  const addQuote = async () => {
    try {
      const response = await fetch(`${HOST}/api`, {
        method: "POST",
      });
      const data = await response.json();
      const toastId = toast.success(`New quote added - "${data.quote}"`);
      await delay(2000);
      toast.remove(toastId);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button
        type="button"
        onClick={addQuote}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add new quote and refresh page
      </button>

      <button
        type="button"
        onClick={() => router.refresh()}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Refresh
      </button>
    </>
  );
};
