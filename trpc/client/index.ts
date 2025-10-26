import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});
async function main() {
  let todo1 = await trpc.createTodo.mutate({
    title: 'Code',
    description: 'Implement a backend using trpc and push to github'
  })
  console.log(todo1);
  let todo2 = await trpc.createTodo.mutate({
    title: "Hit the gym",
    description: "Work your shoulders and legs"
  });
  console.log(todo2);
  let allTodos = await trpc.getTodo.query();
  console.log(allTodos);
}
main();
