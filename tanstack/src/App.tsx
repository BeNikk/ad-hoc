import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import "./App.css";
import { getPosts, type User } from "./api/api";

const queryClient = new QueryClient();
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component/>
      </QueryClientProvider>
    </>
  );
}

export default App;

function Component() {

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return (
      <div className="text-blue-500">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-xl font-bold mb-4">Tanstack Query Users</h2>
        {data && data.length > 0 ? (
          data.map((user: User) => (
            <div key={user.id} className="mb-2 p-2 border rounded">
              <div><strong>Name:</strong> {user.name}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Username:</strong> {user.username}</div>
            </div>
          ))
        ) : (
          <div>No users found</div>
        )}
      </div>
    </div>
  );
}
