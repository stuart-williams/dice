export const dataTestId = (selector: string): { [key: string]: string } => {
  if (process.env.NODE_ENV === "test") {
    return {
      "data-testid": selector,
    };
  }

  return {};
};
