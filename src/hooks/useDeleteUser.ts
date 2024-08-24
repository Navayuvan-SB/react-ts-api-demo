import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '../api/HttpClient';
import { QUERY_KEYS } from '../api/queryKeys';

const useDeleteUser = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => httpClient.delete(`/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
};

export default useDeleteUser;
