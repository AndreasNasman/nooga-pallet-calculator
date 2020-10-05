export function textFieldDateFormat(date) {
  return date.toISOString().split("T")[0];
}
