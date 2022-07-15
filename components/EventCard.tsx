import {
  AspectRatio,
  Box,
  Center,
  chakra,
  Icon,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { BiPlay as PlayIcon } from "react-icons/bi";
import type * as Api from "types/api";

const Media = chakra(Center, {
  baseStyle: {
    h: "50px",
    w: "50px",
    left: 0,
    bottom: 0,
    color: "white",
    bg: "blackAlpha.500",
    position: "absolute",
  },
});

interface Props {
  event: Api.Event;
}

const EventCard: FC<Props> = ({ event }) => {
  const { name, event_images, spotify_tracks, apple_music_tracks } = event;

  const media = !!(spotify_tracks.length + apple_music_tracks.length);

  return (
    <VStack>
      <Box w="100%" position="relative">
        <AspectRatio w="100%" ratio={375 / 225}>
          <Image alt={name} layout="fill" src={event_images.landscape} />
        </AspectRatio>
        {media && (
          <Media>
            <Icon as={PlayIcon} boxSize="40px" />
          </Media>
        )}
      </Box>
    </VStack>
  );
};

export default EventCard;
