import { Box, Center, chakra, Icon } from "@chakra-ui/react";
import { dataTestId } from "common/test-utils";
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
  sizes: string;
  priority: boolean;
  images: Api.EventImage;
  spotifyTracks: Api.Track[];
  appleMusicTracks: Api.Track[];
}

const Media: FC<PropsWithChildren<Props>> = ({
  name,
  sizes,
  images,
  priority,
  spotifyTracks,
  appleMusicTracks,
  children,
}) => {
  const audio = !!(spotifyTracks.length + appleMusicTracks.length);

  return (
    <Box w="100%" position="relative" bg="black">
      <Image
        alt={name}
        // aspect ratio
        width={375}
        height={225}
        sizes={sizes}
        priority={priority}
        layout="responsive"
        src={images.landscape}
      />
      {audio && (
        <Play {...dataTestId("play")}>
          <Icon as={PlayIcon} boxSize="40px" />
        </Play>
      )}
      {children}
    </Box>
  );
};

export default Media;
