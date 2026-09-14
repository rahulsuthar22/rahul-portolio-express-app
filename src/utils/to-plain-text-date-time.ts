export const toPlainDateTime = (
  value: Date | null | undefined
) => {
  if (value == null) return value;

  return Temporal.PlainDateTime.from(
    value.toISOString().slice(0, 19)
  );
};