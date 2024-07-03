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
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <main class="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <h1 class="text-3xl text-slate-800 text-black">Accelerated Quotes</h1>
      <p class="text-xl text-slate-800 mb-10">
         Retrieves the most recently added quote with and without caching enabled
      </p>
      <button class="mb-9 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800" onClick={refreshPage}>Refresh Page</button>
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





