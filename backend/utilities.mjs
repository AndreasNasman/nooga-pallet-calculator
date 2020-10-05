import shortid from "shortid";

export function generateID() {
  return `PAL-${shortid.generate()}`;
}
