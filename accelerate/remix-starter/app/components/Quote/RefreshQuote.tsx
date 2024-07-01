import { Toaster } from "react-hot-toast";

export const RefreshQuote = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Refresh
      </button>
    </>
  );
};
