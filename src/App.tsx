import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetchUsers from './hooks/useFetchUsers';
import useCreateUser from './hooks/useCreateUser';
import useUpdateUser from './hooks/useUpdateUser';
import useDeleteUser from './hooks/useDeleteUser';
import { User } from './api/interfaces';

const queryClient = new QueryClient();

const newUser: Omit<User, "id"> = {
  name: "New User",
  username: "newuser",
  email: "newuser@example.com",
  address: {
    street: "New Street",
    suite: "Suite 1",
    city: "New City",
    zipcode: "00000",
    geo: {
      lat: "0.0000",
      lng: "0.0000",
    },
  },
  phone: "000-000-0000",
  website: "newuser.com",
  company: {
    name: "New Company",
    catchPhrase: "New Catchphrase",
    bs: "New BS",
  },
};

const App: React.FC = () => {
  const { data: users } = useFetchUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser(1); // Example user ID
  const deleteUser = useDeleteUser(1); // Example user ID

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Users</h1>
        <button onClick={() => createUser.mutate(newUser)}>Create User</button>
        <button
          onClick={() =>
            updateUser.mutate({
              name: "Updated User",
            })
          }
        >
          Update User
        </button>
        <button onClick={() => deleteUser.mutate()}>Delete User</button>

        <ul>
          {users?.map((user: User) => (
            <li key={user.id}>
              {user.id} - {user.name}
            </li>
          ))}
        </ul>
      </div>
    </QueryClientProvider>
  );
};

export default App;
