import axios from "axios";
import { ICompanyProps, IGetRequest } from "./types";

// Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const get = async <T extends { list: T[]; totalCount: number }>({
  url,
  page,
  pageSize,
  searchText = "",
}: {
  url: string;
  page: number;
  pageSize: number;
  searchText?: string;
}): Promise<IGetRequest<ICompanyProps>> => {
  try {
    const params = new URLSearchParams({
      _page: page.toString(),
      _limit: pageSize.toString(),
      q: searchText.toLowerCase(),
    });

    const fullUrl = `${url}?${params.toString()}`;

    const res = await axiosInstance.get(fullUrl);

    const totalCount = res.headers["x-total-count"]
      ? parseInt(res.headers["x-total-count"], 10)
      : res.data.items?.length || 0;

    return {
      list: res?.data,
      totalCount,
    };
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching data."
    );
  }
};

// POST request for creating new data
const create = async <T>(url: string, data: T): Promise<T> =>
  await axiosInstance.post(url, data).then((res) => res.data);

// PUT request for updating existing data
const update = async <T>(url: string, data: T): Promise<T> =>
  await axiosInstance.put(url, data).then((res) => res.data);

// DELETE request for deleting data
const remove = async <T>({ url }: { url: string }): Promise<T> =>
  await axiosInstance.delete(url).then((res) => res.data);

// DELETE MULTIPLE ITEMS from (since json-server doesn't support multiple deletion, this will be an alternative for this demo)
const removeMultiple = async ({
  ids,
  url,
}: {
  ids: string[];
  url: string;
}): Promise<void> => {
  // Create an array of DELETE requests
  const deleteRequests = ids.map((id) => axiosInstance.delete(`${url}/${id}`));

  // Send all DELETE requests in parallel
  await axios.all(deleteRequests);
};

// Exporting all utility functions
export { get, create, update, remove, removeMultiple };
