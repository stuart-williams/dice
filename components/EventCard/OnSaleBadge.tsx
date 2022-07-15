import { Badge, chakra } from "@chakra-ui/react";
import dayjs from "lib/dayjs";
import { FC } from "react";

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
  onSaleDate: string;
}

const OnSaleBadge: FC<Props> = ({ onSaleDate }) => {
  const onSale = dayjs(onSaleDate);

  // TODO: remove hard coded now
  if (
    onSale.isBefore(
      dayjs("2022-04-01" /* time travel so we can see some on sale dates */)
    )
  ) {
    return null;
  }

  return <OnSale>On sale {onSale.format("LL - LT")}</OnSale>;
};

export default OnSaleBadge;
