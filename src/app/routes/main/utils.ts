import {
    addDays,
    eachDayOfInterval,
} from "date-fns";
/**
 * Gets an array of dates Mon-Friday for the week
 * containing the date d given
 * @param {Date} d date inside the week to obtain
 * @return {Date[]} array containing dates in week
 */
export function getWeekArray(d: Date): Date[] {
    const day = d.getDay();
    // Monday is first day of week in this
    const distFromMon = (day === 0 ? 7 : day) - 1;
    const d0 = addDays(d, distFromMon * -1);
    const d6 = addDays(d0, 7);
    return eachDayOfInterval({
        start: d0,
        end: d6,
    });
}
