import { dayjs } from "./utils";

export function formatDate(date?: Date | string, format?: string) {
  if (!date) return ""; // handle undefined, null, or empty
  const d = dayjs(date);
  return d.isValid() ? d.format(format ? format : "DD/MM/YYYY") : "";
}

export function isValidDate(date?: Date | string): boolean {
  if (!date) return false;
  return dayjs(date).isValid();
}
