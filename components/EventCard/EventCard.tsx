import { Badge, chakra, VStack } from "@chakra-ui/react";
import dayjs from "lib/dayjs";
import { FC } from "react";
import type * as Api from "types/api";
import Content from "./EventCardContent";
import Header from "./EventCardHeader";
import Media from "./EventCardMedia";

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
    textTransform: "none",
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
    lineup,
    currency,
    description,
    date_end: endDate,
    event_images: images,
    ticket_types: tickets,
    sale_start_date: onSaleDate,
    spotify_tracks: spotifyTracks,
    apple_music_tracks: appleMusicTracks,
  } = event;

  const onSale = dayjs(onSaleDate);
  // TODO: remove hard coded now
  const showOnSale = onSale.isAfter(
    dayjs("2022-04-01" /* time travel so we can see some on sale dates */)
  );

  return (
    <VStack align="start">
      <Media
        name={name}
        images={images}
        spotifyTracks={spotifyTracks}
        appleMusicTracks={appleMusicTracks}
      >
        {showOnSale && <OnSale>On sale {onSale.format("LL - LT")}</OnSale>}
      </Media>
      <Header name={name} venue={venue} city={cities[0]?.name} />
      <Content
        lineup={lineup}
        tickets={tickets}
        endDate={endDate}
        currency={currency}
        description={description}
      />
    </VStack>
  );
};

export default EventCard;
