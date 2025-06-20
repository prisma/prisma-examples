import { QuoteWrapper } from "./QuoteWrapper";
import { QuoteCacheType, QuoteResult } from "@/lib/types";
import { findIATA } from "openflights-cached";

export const Quote: React.FC<{
  title: string;
  type: QuoteCacheType;
  result: QuoteResult;
}> = ({ title, type, result }) => {
  const [{ id, quote, createdAt }, { cacheStatus, region, lastModified }] = [
    result.data,
    result.info,
  ];

  return (
    <QuoteWrapper title={title} type={type}>
      <div className="flex flex-col">
        <p className="text-lg">
          {" "}
          <span className="text-green-300">ID {id} </span>⸺ {'"'}
          {quote}
          {'"'}
        </p>
        <br />
        <p className="text-slate-200 text-lg">
          <span className="font-bold mt-3.5">Created At</span> ⸺
          {new Date(createdAt).toLocaleString("en-US")}
        </p>

        <div className="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"></div>

        <div>
          <br />
          <p>
            Cache Node Region ⸺
            <span className="font-bold">
              {" "}
              {findIATA(region)?.city ?? region}
            </span>
          </p>
          <br />
          <p>
            Cached Modified at ⸺{" "}
            <span className="font-bold">
              {" "}
              {new Date(lastModified).toLocaleString("en-US")}
            </span>
          </p>
          <br />
          <p>
            Cache status ⸺{" "}
            <span
              className={`font-bold ${
                cacheStatus === "swr" || cacheStatus === "ttl"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {" "}
              {cacheStatus
                .toUpperCase()
                .concat(
                  cacheStatus === "swr" || cacheStatus === "ttl"
                    ? " CACHE HIT"
                    : ""
                )}
            </span>
          </p>
          <br />
          <p>
            Time taken: <span className="font-bold"> {result.time}ms</span>
          </p>
          <br />
        </div>
      </div>
    </QuoteWrapper>
  );
};
