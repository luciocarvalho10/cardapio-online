import { format, type FormatOptions } from "date-fns";
import { ptBR as locale } from "date-fns/locale";
import { formatDistanceToNow, type FormatDistanceToNowOptions } from "date-fns/formatDistanceToNow";

//rawData format
//new Date().toISOString()
//'2026-04-05T20:42:27.627Z'

export function formatDateTime(rawDate: string): string {
  const date = new Date(rawDate);
  const formatStr = "dd/MM/yyyy 'às' HH'h'mm"
  const options: FormatOptions = {locale}

  return format(date, formatStr, options)
}

export function formatTimeToNow(rawDate: string): string {
  const date = new Date(rawDate);
  const options: FormatDistanceToNowOptions = {
    addSuffix: true,
    includeSeconds: true,
    locale
  }

  return formatDistanceToNow(date, options)
}
