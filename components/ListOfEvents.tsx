import { SimpleGrid } from "@chakra-ui/react";
import EventCard from "components/EventCard";
import { FC } from "react";
import type * as Api from "types/api";

interface Props {
  events: Api.Event[];
}

const ListOfEvents: FC<Props> = ({ events }) => (
  <SimpleGrid spacing={8} columns={{ base: 1, sm: 2, lg: 3 }}>
    {events.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </SimpleGrid>
);

export default ListOfEvents;
