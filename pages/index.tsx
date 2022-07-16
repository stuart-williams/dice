import { Button, Container, SimpleGrid, VStack } from "@chakra-ui/react";
import { apiClient } from "common/http";
import EventCard from "components/EventCard";
import { useEventCardLayout, useListOfEvents } from "hooks";
import type { GetStaticProps, NextPage } from "next";
import type * as Api from "types/api";

// TODO: move to config
const pageSize = 12;

// TODO: venue filter
const buildDataURL = (page: number, size = pageSize): string =>
  `/events?page[number]=${page}&page[size]=${size}`;

interface Props {
  initialPage: number;
  fallbackData: Api.EventsResponse[];
}

// TODO: page meta
const Page: NextPage<Props> = ({ initialPage, fallbackData }) => {
  const layout = useEventCardLayout();

  const { events, loadMore, isLoading, canLoadMore } = useListOfEvents({
    initialPage,
    fallbackData,
    buildDataURL,
  });

  return (
    <Container
      py={8}
      spacing={8}
      as={VStack}
      align="stretch"
      maxW={layout.container.maxW}
    >
      <SimpleGrid spacing={8} columns={layout.grid.columns}>
        {events.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            image={{
              sizes: layout.image.sizes,
              priority: i < pageSize / 2,
            }}
          />
        ))}
      </SimpleGrid>
      {canLoadMore && (
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = 1; // TODO: get from url
  const size = page * pageSize;

  const { data } = await apiClient.get<Api.EventsResponse>(
    buildDataURL(page, size)
  );

  return {
    props: {
      initialPage: page,
      fallbackData: [data],
    },
  };
};

export default Page;
