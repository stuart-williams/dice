import { renderHook } from "@testing-library/react";
import { useFormatTicketPrice } from "hooks";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    locale: "en-GB",
  }),
}));

describe("useFormatTicketPrice", () => {
  it("should format price in default currency", () => {
    const { result } = renderHook(useFormatTicketPrice);

    expect(
      result.current({
        face_value: 26626,
      })
    ).toEqual("£266");
  });

  it("should format price in USD", () => {
    const { result } = renderHook(useFormatTicketPrice);

    expect(
      result.current(
        {
          face_value: 26626,
        },
        "USD"
      )
    ).toEqual("$266");
  });

  it("should format 0 value tickets", () => {
    const { result } = renderHook(useFormatTicketPrice);

    expect(
      result.current({
        face_value: 0,
      })
    ).toEqual("Free");
  });
});
