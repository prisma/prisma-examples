import { Component, JSX } from 'solid-js';

type QuoteWrapperProps = {
  title: string;
  type: string;
  children: JSX.Element;
};

const QuoteWrapper: Component<QuoteWrapperProps> = ({ title, type, children }) => {
  return (
    <div class="quote-wrapper border p-4 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-2">{title}</h2>
      <p class="text-gray-700 mb-4">Type: {type}</p>
      {children}
    </div>
  );
};

export default QuoteWrapper;
