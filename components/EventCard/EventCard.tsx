import { VStack } from "@chakra-ui/react";
import Content from "components/EventCard/EventCardContent";
import Header from "components/EventCard/EventCardHeader";
import Media from "components/EventCard/EventCardMedia";
import OnSaleBadge from "components/EventCard/OnSaleBadge";
import { FC } from "react";
import type * as Api from "types/api";

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

  return (
    <VStack align="start">
      <Media
        name={name}
        images={images}
        spotifyTracks={spotifyTracks}
        appleMusicTracks={appleMusicTracks}
      >
        <OnSaleBadge onSaleDate={onSaleDate} />
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
