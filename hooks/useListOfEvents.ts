import { fetcher } from "common/http";
import useSWRInfinite from "swr/infinite";
import type * as Api from "types/api";

interface Options {
  initialPage: number;
  fallbackData: Api.EventsResponse[];
  buildDataURL: (page: number) => string;
}

// TODO: move
export const useListOfEvents = ({
  initialPage,
  fallbackData,
  buildDataURL,
}: Options) => {
  const { data, size, setSize } = useSWRInfinite<Api.EventsResponse>(
    (page) => buildDataURL(page + 1),
    fetcher,
    {
      fallbackData,
      initialSize: initialPage,
    }
  );

  return {
    loadMore: () => {
      // TODO: if there is a next page
      setSize(size + 1);
    },
    // flatten page data into list of events
    events: (data || []).reduce<Api.Event[]>(
      (events, { data }) => [...events, ...data],
      []
    ),
  };
};
