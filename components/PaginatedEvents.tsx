import {
  Button,
  Container,
  SimpleGrid,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import EventCard from "components/EventCard";
import { usePaginatedEvents } from "hooks";
import { FC } from "react";
import type * as Api from "types/api";

interface Props {
  pageSize: number;
  initialPage: number;
  fallbackData: Api.EventsResponse[];
  buildDataURL: (page: number) => string;
}

const PaginatedEvents: FC<Props> = ({
  pageSize,
  initialPage,
  fallbackData,
  buildDataURL,
}) => {
  const { sizes, breakpoints: bp } = useTheme();
  const maxW = sizes.container.lg;

  const imgSizes = [
    `(min-width: ${maxW}) calc(${maxW} / 3)`,
    `(min-width: ${bp.lg}) calc(100vw / 3)`,
    `(min-width: ${bp.sm}) calc(100vw / 2)`,
    "100vw",
  ].join(",");

  const { events, loadMore, hasMore, isLoading } = usePaginatedEvents({
    initialPage,
    fallbackData,
    buildDataURL,
  });

  return (
    <Container py={8} spacing={8} as={VStack} align="stretch" maxW={maxW}>
      <SimpleGrid spacing={8} columns={{ base: 1, sm: 2, lg: 3 }}>
        {events.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            image={{
              sizes: imgSizes,
              priority: i < pageSize / 2,
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
    </Container>
  );
};

export default PaginatedEvents;
