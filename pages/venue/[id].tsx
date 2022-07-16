import { apiClient } from "common/http";
import PaginatedEvents from "components/PaginatedEvents";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import type * as Api from "types/api";

// TODO: move to config
const pageSize = 12;

const buildDataURL = (page: number, size: number, venue: string): string =>
  `/events?page[number]=${page}&page[size]=${size}&filter[venues]=${venue}`;

interface Props {
  name: string;
  events: {
    initialPage: number;
    fallbackData: Api.EventsResponse[];
  };
}

const VenuePage: NextPage<Props> = ({ name, events }) => {
  return (
    <>
      <Head>
        <title>{name} | Dice</title>
      </Head>
      <PaginatedEvents
        {...events}
        buildDataURL={(page) => buildDataURL(page, pageSize, name)}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query.id as string;
  const page = 1; // TODO: get from url
  const size = page * pageSize;

  // fetch venue data
  // TODO: not found
  const venue = {
    name: "O2 Ritz",
  };

  const { data } = await apiClient.get<Api.EventsResponse>(
    buildDataURL(page, size, venue.name)
  );

  return {
    props: {
      ...venue,
      events: {
        initialPage: page,
        fallbackData: [data],
      },
    },
  };
};

export default VenuePage;
