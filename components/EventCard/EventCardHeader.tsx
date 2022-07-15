import { Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  name: string;
  venue: string;
  city?: string;
}

const EventCardHeader: FC<Props> = ({ name, venue, city }) => (
  <VStack spacing={0} align="start">
    <Text fontSize="xl" fontWeight="bold">
      {name}
    </Text>
    <Text fontWeight="bold">{venue}</Text>
    {city && <Text>{city}</Text>}
  </VStack>
);

export default EventCardHeader;
