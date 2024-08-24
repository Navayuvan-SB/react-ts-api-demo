import { useQuery } from '@tanstack/react-query';
import httpClient from '../api/HttpClient';
import { QUERY_KEYS } from '../api/queryKeys';
import { User } from '../api/interfaces';

const useFetchUsers = () => {
  return useQuery<User[]>({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: () => httpClient.get<User[]>("/users").then((res) => res.data),
  });
};

export default useFetchUsers;
