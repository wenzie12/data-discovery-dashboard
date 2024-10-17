import { get } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants";

// Add all company related queries here

export const useCompanyListQuery = ({
  searchText = "",
  id = "",
  page = 1,
  pageSize = 10,
}: {
  searchText?: string;
  id?: string;
  page?: number;
  pageSize?: number;
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies`;
  return useQuery({
    queryKey: [queryKeys.GET_COMPANY_LISTS_QUERY, id, page, pageSize, searchText],
    queryFn: async () => {
      const { list, totalCount } = await get({
        url,
        page,
        pageSize,
        searchText,
      });
      return { list, totalCount };
    },
  });
};
