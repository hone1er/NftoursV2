import useSWR from "swr";
import { z } from "zod";

async function fetcher(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
}
const useNfts = () => {
  const { data, error, mutate } = useSWR("/api/getNfts", fetcher);

  return {
    nfts: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useNfts;
