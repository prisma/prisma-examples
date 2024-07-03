import { Component, createEffect } from 'solid-js';
import QuoteWrapper from './quoteWrapper';
import { formatDate } from '../lib/utils/helper';
import type { QuoteResult, QuoteCacheType } from '../types';

type QuoteProps = {
  title: string;
  type: QuoteCacheType;
  result: QuoteResult | undefined;
};

const Quote: Component<QuoteProps> = (props) => {
  let quoteData: QuoteResult | undefined = props.result;

  createEffect(() => {
    if (props.result) {
      quoteData = props.result;
    }
  });
 
  return (
    <QuoteWrapper title={props.title} type={props.type}>
      <div class="quote-content">
        {quoteData ? (
          <>
            <p class="text-lg">
              <span class="text-green-300">ID {quoteData.data.id}</span> ⸺ '"
              <span>{quoteData.data.quote}</span>"
            </p>
            <p class="text-lg font-normal text-black">
              <span class="mt-3.5">Created At</span> ⸺ {formatDate(quoteData.data.createdAt)}
            </p>
            <div class="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100"></div>
            <p>
              Cache Node Region ⸺ <span class="font-bold">{quoteData.info?.region}</span>
            </p>
            <p>
              Cached Modified at ⸺ <span class="font-bold">{formatDate(quoteData.info?.lastModified.toString())}</span>
            </p>
            <p>
              Cache status ⸺
              <span class={`font-bold ${quoteData.info?.cacheStatus === 'swr' || quoteData.info?.cacheStatus === 'ttl' ? 'text-green-400' : 'text-red-400'}`}>
                {quoteData.info?.cacheStatus?.toUpperCase()} {quoteData.info?.cacheStatus === 'swr' || quoteData.info?.cacheStatus === 'ttl' ? ' CACHE HIT' : ''}
              </span>
            </p>
            <p>Time taken: <span class="font-bold">{quoteData.time}ms</span></p>
          </>
        ) : (
          <p class="text-red-500">No data available</p>
        )}
      </div>
    </QuoteWrapper>
  );
};

export default Quote;
