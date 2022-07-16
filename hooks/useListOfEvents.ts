import { fetcher } from "common/http";
import useSWRInfinite from "swr/infinite";
import type * as Api from "types/api";

interface Options {
  initialPage: number;
  fallbackData: Api.EventsResponse[];
  buildDataURL: (page: number) => string;
}

/**
 * Abstract the logic to populate swr with the data used during SSR and
 * handle infinite pagination.
 */
export const useListOfEvents = ({
  initialPage,
  fallbackData,
  buildDataURL,
}: Options) => {
  const { data, size, setSize, isValidating } =
    useSWRInfinite<Api.EventsResponse>(
      (page) => buildDataURL(page + 1),
      fetcher,
      {
        fallbackData,
        initialSize: initialPage,
      }
    );

  const pages = data || [];
  const canLoadMore = !!pages[pages.length - 1]?.links.next;

  return {
    canLoadMore,
    loadMore: () => {
      if (canLoadMore) {
        setSize(size + 1);
      }
    },
    isLoading: isValidating,
    // flatten page data into list of events
    events: pages.reduce<Api.Event[]>((e, { data }) => [...e, ...data], []),
  };
};
