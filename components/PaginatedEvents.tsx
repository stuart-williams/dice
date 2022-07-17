import { Button, SimpleGrid, useTheme } from "@chakra-ui/react";
import EventCard from "components/EventCard";
import { usePaginatedEvents } from "hooks";
import { FC } from "react";
import type * as Api from "types/api";

interface Props {
  maxW: string;
  initialPage: number;
  fallbackData: Api.EventsResponse[];
  buildDataURL: (page: number) => string;
}

const PaginatedEvents: FC<Props> = ({
  maxW,
  initialPage,
  fallbackData,
  buildDataURL,
}) => {
  const { breakpoints } = useTheme();

  // TODO: include spacing in calc
  const imgSizes = [
    `(min-width: ${maxW}) calc(${maxW} / 3)`,
    `(min-width: ${breakpoints.lg}) calc(100vw / 3)`,
    `(min-width: ${breakpoints.sm}) calc(100vw / 2)`,
    "100vw",
  ].join(",");

  const { events, loadMore, hasMore, isLoading } = usePaginatedEvents({
    initialPage,
    fallbackData,
    buildDataURL,
  });

  return (
    <>
      <SimpleGrid spacing={8} columns={{ base: 1, sm: 2, lg: 3 }}>
        {events.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            image={{
              sizes: imgSizes,
              priority: i < 6, // above the fold
            }}
          />
        ))}
      </SimpleGrid>
      {hasMore && (
        <Button
          alignSelf="center"
          colorScheme="blue"
          onClick={loadMore}
          isLoading={isLoading}
        >
          Load More
        </Button>
      )}
    </>
  );
};

export default PaginatedEvents;
