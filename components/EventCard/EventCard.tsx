import { VStack } from "@chakra-ui/react";
import Content from "components/EventCard/Content";
import Header from "components/EventCard/Header";
import Media from "components/EventCard/Media";
import OnSaleBadge from "components/EventCard/OnSaleBadge";
import { FC } from "react";
import type * as Api from "types/api";

interface Props {
  event: Api.Event;
  image: {
    sizes: string;
    priority: boolean;
  };
}

const EventCard: FC<Props> = ({ event, image }) => {
  const {
    name,
    venue,
    cities,
    lineup,
    timezone,
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
        {...image}
        name={name}
        images={images}
        spotifyTracks={spotifyTracks}
        appleMusicTracks={appleMusicTracks}
      >
        <OnSaleBadge timezone={timezone} onSaleDate={onSaleDate} />
      </Media>
      <Header name={name} venue={venue} city={cities[0]?.name} />
      <Content
        lineup={lineup}
        tickets={tickets}
        endDate={endDate}
        timezone={timezone}
        currency={currency}
        description={description}
      />
    </VStack>
  );
};

export default EventCard;
