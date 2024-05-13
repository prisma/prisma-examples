import { QuoteCacheType } from "@/lib/types";
import { ReactNode } from "react";

export const QuoteWrapper: React.FC<{
  title: string;
  type: QuoteCacheType;
  children: ReactNode;
}> = ({ title, type, children }) => {
  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="w-16"></div>
        <p className="text-xl font-medium text-blue-600 dark:text-blue-500">
          {type}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
};
