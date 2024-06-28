import { createResource, Suspense, Show } from 'solid-js';
import Quote from './components/quote';
import { HOST } from './lib/utils/helper';
import type { QuoteResult } from './types';

const fetchQuotes = async (type: string): Promise<QuoteResult> => {

  const res = await fetch(`${HOST}/api/quotes?cache=${encodeURIComponent(type)}`);

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res.json();
};

const App = () => {
  const [ttl, { loading: ttlLoading, error: ttlError }] = createResource(() => 'TTL', fetchQuotes);
  const [swr, { loading: swrLoading, error: swrError }] = createResource(() => 'SWR', fetchQuotes);
  const [both, { loading: bothLoading, error: bothError }] = createResource(() => 'TTL + SWR', fetchQuotes);
  const [none, { loading: noneLoading, error: noneError }] = createResource(() => 'NO CACHING', fetchQuotes);

  const renderQuote = (title: string, type: string, result: () => QuoteResult | undefined, loading: boolean, error: any) => (
    <Show when={!loading} fallback={<div>Loading...</div>}>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Quote title={title} type={type} result={result()} />
      )}
    </Show>
  );

  return (
    <main class="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <h1 class="text-3xl text-slate-800 text-black">Accelerated Quotes</h1>
      <p class="text-xl text-slate-800 mb-10">
         Retrieves the most recently added quote with and without caching enabled
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Suspense fallback={<div class="news-list-nav">Loading...</div>}>
        {renderQuote("Cached Quote", "TTL", ttl, ttlLoading, ttlError)}
        {renderQuote("Cached Quote", "SWR", swr, swrLoading, swrError)}
        { renderQuote("Cached Quote", "TTL + SWR", both, bothLoading, bothError)}
        {renderQuote("Quote", "NO CACHING", none, noneLoading, noneError)} 
      </Suspense>
      </div>
    </main>
  );
};

export default App;





