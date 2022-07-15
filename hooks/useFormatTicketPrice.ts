import { useRouter } from "next/router";
import type * as Api from "types/api";

export const useFormatTicketPrice = () => {
  const { locale } = useRouter();

  return (price: Api.TicketPrice, currency = "en-GB") =>
    /**
     * at TickX we are required by our US clients (and I guess law) to show prices
     * as early as possible inc. fees, taxes etc. hence the ticket price object.
     */
    new Intl.NumberFormat(locale, {
      currency,
      style: "currency",
    }).format(price.face_value / 100);
};
