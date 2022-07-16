import { Box, Center, chakra, Icon, useTheme } from "@chakra-ui/react";
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
  priority?: boolean;
  images: Api.EventImage;
  spotifyTracks: Api.Track[];
  appleMusicTracks: Api.Track[];
}

const Media: FC<PropsWithChildren<Props>> = ({
  name,
  images,
  priority,
  spotifyTracks,
  appleMusicTracks,
  children,
}) => {
  const theme = useTheme();
  const maxW = theme.sizes.container.lg;
  const { sm, lg } = theme.breakpoints;
  const audio = !!(spotifyTracks.length + appleMusicTracks.length);

  const sizes = [
    `(min-width: ${maxW}) calc(${maxW} / 3)`,
    `(min-width: ${lg}) calc(100vw / 3)`,
    `(min-width: ${sm}) calc(100vw / 2)`,
    "100vw",
  ];

  return (
    <Box w="100%" position="relative" bg="black">
      <Image
        alt={name}
        // aspect ratio
        width={375}
        height={225}
        priority={priority}
        layout="responsive"
        src={images.landscape}
        sizes={sizes.join(",")}
      />
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
