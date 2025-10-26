import { initTRPC } from '@trpc/server';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const createContext = async () => {
  const session = "mysession";

  return {
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
const logMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next({
    ctx: {
      requestTime: new Date().toISOString(),
    },
  });
  const durationMs = Date.now() - start;
  console.log(`[${type}] ${path} took ${durationMs}ms`);
  return result;
});
export const loggedProcedure = t.procedure.use(logMiddleware);
export const router = t.router;
export const publicProcedure = t.procedure;

