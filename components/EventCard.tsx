import {
  AspectRatio,
  Badge,
  Box,
  Center,
  chakra,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "lib/dayjs";
import Image from "next/image";
import { FC } from "react";
import { BiPlay as PlayIcon } from "react-icons/bi";
import type * as Api from "types/api";

const Play = chakra(Center, {
  baseStyle: {
    left: 0,
    bottom: 0,
    h: "50px",
    w: "50px",
    color: "white",
    bg: "blackAlpha.700",
    position: "absolute",
  },
});

const OnSale = chakra(Badge, {
  baseStyle: {
    py: 1,
    px: 2,
    right: 2,
    bottom: 2,
    color: "white",
    fontSize: "0.8em",
    bg: "blackAlpha.900",
    position: "absolute",
  },
});

interface Props {
  event: Api.Event;
}

const EventCard: FC<Props> = ({ event }) => {
  const {
    name,
    venue,
    cities,
    event_images: images,
    spotify_tracks: spotify,
    apple_music_tracks: apple,
    sale_start_date: startDate,
  } = event;

  const start = dayjs(startDate);
  const city = cities[0]?.name;
  const audio = !!(spotify.length + apple.length);
  // TODO: remove - time travel so we can see some on sale dates
  const onSale = start.isAfter(dayjs("2022-04-01"));

  return (
    <VStack align="start">
      <Box w="100%" position="relative" bg="black">
        <AspectRatio w="100%" ratio={375 / 225}>
          <Image alt={name} layout="fill" src={images.landscape} />
        </AspectRatio>
        {audio && (
          <Play>
            <Icon as={PlayIcon} boxSize="40px" />
          </Play>
        )}
        {onSale && <OnSale>{start.format("LL - LT")}</OnSale>}
      </Box>
      <VStack spacing={0} align="start">
        <Text fontSize="xl" fontWeight="bold">
          {name}
        </Text>
        <Text fontWeight="bold">{venue}</Text>
        {city && <Text>{city}</Text>}
      </VStack>
    </VStack>
  );
};

export default EventCard;
