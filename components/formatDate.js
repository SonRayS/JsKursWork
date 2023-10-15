import { formatDistance, subDays } from "date-fns";
import { ru } from "date-fns/locale";

export function dateFns(date) {
    const result = formatDistance(new Date(), new Date(date), {
        locale: ru,
    });
    return `${result} назад`;
}
