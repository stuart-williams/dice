import { Container, Heading, useTheme, VStack } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { apiClient } from "common/http";
import PaginatedEvents from "components/PaginatedEvents";
import get from "lodash.get";
import type { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import Head from "next/head";
import type * as Api from "types/api";

// hard code page size for now
const buildDataURL = (page: number, venue: string): string =>
  `/events?page[number]=${page}&page[size]=12&filter[venues]=${venue}`;

interface Props {
  statusCode?: number;
  venue?: {
    name: string;
    events: {
      initialPage: number;
      fallbackData: Api.EventsResponse[];
    };
  };
}

const VenuePage: NextPage<Props> = ({ venue, statusCode }) => {
  const theme = useTheme();
  const maxW = theme.sizes.container.lg;

  if (statusCode || !venue) {
    return <Error statusCode={statusCode || 404} />;
  }

  return (
    <>
      <Head>
        <title>{`${venue.name} | Dice`}</title>
      </Head>
      <Container py={8} spacing={8} as={VStack} maxW={maxW} align="stretch">
        <Heading as="h1" size="lg">
          Upcoming events at {venue.name}
        </Heading>
        <PaginatedEvents
          maxW={maxW}
          {...venue.events}
          buildDataURL={(page) => buildDataURL(page, venue.name)}
        />
      </Container>
    </>
  );
};

interface Venue {
  name: string;
}

// Quick and dirty mock a venue endpoint
const mockFetchVenue = async (id: string): Promise<AxiosResponse<Venue>> => {
  const mockVenues: Record<string, Venue> = {
    "o2-ritz": {
      name: "O2 Ritz",
    },
    "albert-hall-manchester": {
      name: "Albert Hall Manchester",
    },
    "o2-academy-brixton": {
      name: "O2 Academy Brixton",
    },
  };

  const venue = mockVenues[id];

  if (venue) {
    return { data: venue } as AxiosResponse;
  }

  return Promise.reject({
    response: {
      status: 404,
    },
  } as unknown as AxiosResponse);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const page = 1; // hard code for now
  const id = context.query.id as string;

  try {
    const { data: venue } = await mockFetchVenue(id);

    const { data: events } = await apiClient.get<Api.EventsResponse>(
      buildDataURL(page, venue.name)
    );

    return {
      props: {
        venue: {
          ...venue,
          events: {
            initialPage: page,
            fallbackData: [events],
          },
        },
      },
    };
  } catch (error) {
    return {
      props: {
        statusCode: get(error, "response.status", 500),
      },
    };
  }
};

export default VenuePage;
