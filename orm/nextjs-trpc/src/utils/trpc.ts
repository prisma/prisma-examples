import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '@/lib/trpc/routers';

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();
