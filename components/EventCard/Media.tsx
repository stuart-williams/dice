import { AspectRatio, Box, Center, chakra, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
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

interface Props {
  name: string;
  images: Api.EventImage;
  spotifyTracks: Api.Track[];
  appleMusicTracks: Api.Track[];
}

const Media: FC<PropsWithChildren<Props>> = ({
  name,
  images,
  spotifyTracks,
  appleMusicTracks,
  children,
}) => {
  const audio = !!(spotifyTracks.length + appleMusicTracks.length);

  return (
    <Box w="100%" position="relative" bg="black">
      <AspectRatio w="100%" ratio={375 / 225}>
        <Image alt={name} layout="fill" src={images.landscape} />
      </AspectRatio>
      {audio && (
        <Play>
          <Icon as={PlayIcon} boxSize="40px" />
        </Play>
      )}
      {children}
    </Box>
  );
};

export default Media;