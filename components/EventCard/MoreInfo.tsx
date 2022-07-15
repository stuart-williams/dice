import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  chakra,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormatTicketPrice } from "hooks";
import dayjs from "lib/dayjs";
import { FC } from "react";
import type * as Api from "types/api";

const SectionTitle = chakra(Text, {
  baseStyle: {
    color: "blue.500",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

interface Props {
  event: Api.Event;
}

const MoreInfo: FC<Props> = ({ event }) => {
  const {
    lineup,
    currency,
    description,
    date_end: endDate,
    ticket_types: tickets,
  } = event;

  const formatTicketPrice = useFormatTicketPrice();

  return (
    <Accordion w="100%" allowToggle>
      <AccordionItem border="none" bg="gray.100">
        <AccordionButton>
          <Text flex={1} textAlign="left" fontWeight="bold">
            More Info
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <VStack align="start">
            {/* 
               There are some long descriptions which are pretty ugly inline + push the lineup etc.
               pretty far down the page. Would want to add a "read more" or similar to make the 
               full description visible.
            */}
            <Text noOfLines={8}>{description}</Text>
            <SectionTitle>Line Up</SectionTitle>
            <List spacing={1}>
              {lineup.map(({ details }) => (
                <ListItem key={details}>{details}</ListItem>
              ))}
              {/*
                 Show curfew time when lineup doesn't contain it. I was origionally going to remove
                 items contaning "Curfew" from the lineup but I know there are artists named Curfew!
               */}
              {!lineup.find(({ details }) => details.includes("Curfew")) && (
                <ListItem>
                  <Text>
                    Curfew - <b>{dayjs(endDate).format("LT")}</b>
                  </Text>
                </ListItem>
              )}
            </List>
            <SectionTitle>Tickets</SectionTitle>
            <List spacing={1}>
              {tickets.map(({ id, name, price }) => (
                <ListItem key={id}>
                  {name} - <b>{formatTicketPrice(price, currency)}</b>
                </ListItem>
              ))}
            </List>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default MoreInfo;
