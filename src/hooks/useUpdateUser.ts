import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '../api/HttpClient';
import { QUERY_KEYS } from '../api/queryKeys';
import { User } from '../api/interfaces';

const useUpdateUser = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser: Partial<Omit<User, "id">>) =>
      httpClient.put<User>(`/users/${userId}`, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER(userId.toString())],
      });
    },
  });
};

export default useUpdateUser;
