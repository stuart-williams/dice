import { useRouter } from "next/router";
import type * as Api from "types/api";

/**
 * Function to format ticket prices in the correct currency.

 * At TickX we are required by our US clients to show prices inc. fees etc. 
 * as early as possible so I expect this function would be extended in future 
 * to accomidate stuff like that.
 * 
 * Using set min/max fraction digits for nicer looking prices i.e. $266.26 -> $266
 * but any rounding etc. would depend on product requirements.
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: "narrowSymbol",
    }).format(price.face_value / 100);
  };
};
