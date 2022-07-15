import { AspectRatio, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import type * as Api from "types/api";

interface Props {
  event: Api.Event;
}

const EventCard: FC<Props> = ({ event }) => {
  const { name, event_images: images } = event;

  return (
    <VStack>
      <AspectRatio w="100%" ratio={375 / 225}>
        <Image alt={name} layout="fill" src={images.landscape} />
      </AspectRatio>
    </VStack>
  );
};

export default EventCard;
