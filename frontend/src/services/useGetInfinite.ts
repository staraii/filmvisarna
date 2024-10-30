import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface InfiniteQueryOptions {
  queryKey: string[];
  urlPrefix: string;
  pageSize: number;
  queryFilters: boolean;
}

const useGetInfinite = ({queryKey, urlPrefix, pageSize, queryFilters}: InfiniteQueryOptions) => {

  const getInfinite = async (pageParam: number) => {
    const { data } = await axios.get(`${urlPrefix}${queryFilters ? "&" : "?"}offset=${pageParam * pageSize}&limit=${pageSize}`);
    return data;
  };
  
  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => getInfinite(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  return {status, error, data, fetchNextPage, isFetchingNextPage, hasNextPage,}
}
export default useGetInfinite;