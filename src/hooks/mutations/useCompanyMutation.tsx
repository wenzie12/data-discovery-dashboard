import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remove, removeMultiple } from "@/services/api";
import { queryKeys } from "../constants";
import { toast } from "sonner";
import { ICompanyProps } from "@/services/types";

// Add all company related mutations here

export const useDeleteCompanyItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }): Promise<ICompanyProps> =>
      await remove({
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/${id}`,
      }),
    onSuccess: (data: ICompanyProps) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMPANY_LISTS_QUERY],
      });
      if (data.name) return toast(`Successfully deleted ${data.name}`);
      toast(`Successfully deleted an Item`);
    },
    onError: (err) => {
      toast(`Error message: ${err.message}`);
    },
  });
};

// delete multiple items from an array (list)
export const useDeleteCompanyLists = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ids }: { ids: string[] }) =>
      await removeMultiple({
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies`,
        ids,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMPANY_LISTS_QUERY],
      });
      toast("Successfully deleted multiple items.");
    },
    onError: (err) => {
      toast(`Error message: ${err.message}`);
    },
  });
};

// add more mutations fn here if needed...
// export const useAddCompanyItems = () => useMutation({ // add code here... })
// export const useUpdateCompanyItems = () => useMutation({ // add code here... })
