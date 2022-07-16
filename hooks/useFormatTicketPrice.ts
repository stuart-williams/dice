import { useRouter } from "next/router";
import type * as Api from "types/api";

/**
 * Function to format ticket prices in the correct currency.

 * At TickX we are required by our US clients to show prices inc. fees etc. 
 * as early as possible so I expect this function would be extended in future 
 * to accomidate stuff like that.
 */
export const useFormatTicketPrice = () => {
  const { locale } = useRouter();

  return (price: Api.TicketPrice, currency = "GBP") => {
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
