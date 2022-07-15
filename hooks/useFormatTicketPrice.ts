import { useRouter } from "next/router";
import type * as Api from "types/api";

export const useFormatTicketPrice = () => {
  const { locale } = useRouter();

  return (price: Api.TicketPrice, currency = "GBP") => {
    /**
     * at TickX we are required by our US clients (and I guess law) to show prices
     * as early as possible inc. fees, taxes etc. hence the ticket price object.
     */

    if (!price.face_value) {
      return "Free";
    }

    return new Intl.NumberFormat(locale, {
      currency,
      style: "currency",
      currencyDisplay: "narrowSymbol",
    }).format(price.face_value / 100);
  };
};
