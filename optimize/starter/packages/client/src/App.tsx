import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import "./App.css";
import expressLogo from "./assets/express.png";
import reactLogo from "./assets/react.svg";
import tRpcLogo from "./assets/trpc.svg";
import AddTodo from "./components/AddTodo";
import ListTodos from "./components/ListTodos";
import { trpc } from "./lib/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `http://localhost:${import.meta.env.PORT || 4444}/trpc`,
        }),
      ],
    });
  });

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-xl mx-auto">
          <div className="text-center text-3xl font-bold text-gray-700">
            <h1>Prisma Optimize Demo</h1>
            <h3 className="text-sm">by the expansion team</h3>
          </div>
          <div className="max-w-md mx-auto grid gap-y-4 mt-8">
            <ListTodos />
            <AddTodo />
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
