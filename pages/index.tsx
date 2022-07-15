import { Button, Container, VStack } from "@chakra-ui/react";
import { apiClient } from "common/http";
import ListOfEvents from "components/ListOfEvents";
import { useListOfEvents } from "hooks";
import type { GetStaticProps, NextPage } from "next";
import type * as Api from "types/api";

const pageSize = 12;

const buildDataURL = (page: number, size = pageSize): string =>
  `/events?page[number]=${page}&page[size]=${size}`;

interface Props {
  initialPage: number;
  fallbackData: Api.EventsResponse[];
}

// TODO: page meta
const Page: NextPage<Props> = ({ initialPage, fallbackData }) => {
  const { events, loadMore, isLoading, canLoadMore } = useListOfEvents({
    initialPage,
    fallbackData,
    buildDataURL,
  });

  return (
    <Container py={8} as={VStack}>
      <ListOfEvents events={events} />
      {canLoadMore && (
        <Button isLoading={isLoading} onClick={loadMore}>
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
