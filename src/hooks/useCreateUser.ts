import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '../api/HttpClient';
import { QUERY_KEYS } from '../api/queryKeys';
import { User } from '../api/interfaces';

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser: Omit<User, "id">) =>
      httpClient.post<User>("/users", newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
};

export default useCreateUser;
