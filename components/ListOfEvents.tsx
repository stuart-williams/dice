import { List, ListItem } from "@chakra-ui/react";
import { FC } from "react";
import type * as Api from "types/api";

interface Props {
  events: Api.Event[];
}

const ListOfEvents: FC<Props> = ({ events }) => (
  <List>
    {events.map(({ id, name }) => (
      <ListItem key={id}>{name}</ListItem>
    ))}
  </List>
);

export default ListOfEvents;
