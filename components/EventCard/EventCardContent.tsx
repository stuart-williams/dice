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
  endDate: string;
  currency: string;
  description: string;
  tickets: Api.Ticket[];
  lineup: Api.LineupItem[];
}

const EventCardContent: FC<Props> = ({
  lineup,
  endDate,
  tickets,
  currency,
  description,
}) => {
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
            {/* TODO: read more on truncated description */}
            <Text noOfLines={8}>{description}</Text>
            <SectionTitle>Line Up</SectionTitle>
            <List spacing={1}>
              {lineup.map(({ details }) => (
                <ListItem key={details}>{details}</ListItem>
              ))}
              {/* don't want to replace curfew in lineup because there are artists called Curfew! */}
              {!lineup.find(({ details }) => details.includes("Curfew")) && (
                <ListItem>
                  Curfew - <b>{dayjs(endDate).format("LT")}</b>
                </ListItem>
              )}
            </List>
            <SectionTitle>Tickets</SectionTitle>
            <List spacing={1}>
              {tickets.map(({ id, name, price }) => (
                <ListItem key={id}>
                  {name} - <b>{formatTicketPrice(price, currency)}</b>{" "}
                </ListItem>
              ))}
            </List>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default EventCardContent;
