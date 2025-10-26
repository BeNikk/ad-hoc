import { publicProcedure, router, createContext } from './trpc';
import z from "zod";
import fs from "fs";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
  createTodo: publicProcedure
    .input(z.object({
      title: z.string().min(1).max(1000),
      description: z.string().min(1).max(1000)
    })
    )
    .mutation(async (opts) => {
      const title = opts.input.title;
      const description = opts.input.description;
      const todoId = Math.random() * 1000;
      const todo = { todoId, title, description };
      //db insert 
      fs.appendFileSync("a.txt", JSON.stringify(todo));
      return todo;
    }),
  getTodo: publicProcedure
    .query(async (opts) => {
      console.log(opts.ctx.session);
      let todos = fs.readFileSync("a.txt", "utf8");
      return todos;
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext
});

server.listen(3000);
