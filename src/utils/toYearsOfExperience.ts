import type { Numeric } from "@prisma/orm-postgres/target/codec-types";

export const toYearsOfExperience = (
  value: number | undefined
): Numeric<3, 1> | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return value as unknown as Numeric<3, 1>;
};

export const toPercentage = (
  value: number | undefined | null
): Numeric<4, 2> | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return value as unknown as Numeric<4, 2>;
};