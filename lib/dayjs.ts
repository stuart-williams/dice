import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

const mapping: Record<string, string> = {
  "en-US": "en",
  "en-GB": "en-gb",
};

export const setLocale = (locale: string) =>
  dayjs.locale(mapping[locale] || "en-gb");

export default dayjs;
