import type { Numeric } from "@prisma/orm-postgres/target/codec-types";

export const toYearsOfExperience = (
  value: number | undefined
): Numeric<3, 1> | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return value as unknown as Numeric<3, 1>;
};