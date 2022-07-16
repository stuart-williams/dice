/**
 * dayjs - nice small alternative to moment + does localisation etc.
 * https://day.js.org/
 */
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

const defaultLocale = "en-gb";

// map sensible locales to dayjs locales
const localeMap: Record<string, string> = {
  "en-US": "en",
  "en-GB": "en-gb",
};

export const setLocale = (locale: string) =>
  dayjs.locale(localeMap[locale] || defaultLocale);

export default dayjs;
