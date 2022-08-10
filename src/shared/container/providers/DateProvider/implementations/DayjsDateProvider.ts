import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    compareInHours(startDate: Date, endDate: Date): number {
        const endDate_utc = this.convertToUtc(endDate);
        const startDate_utc = this.convertToUtc(startDate);
        return dayjs(endDate_utc).diff(startDate_utc, "hours");
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    convertToString(date: Date): string {
        return dayjs(date).toISOString();
    }

    onlyDate(date: Date): string {
        return dayjs(date).format("L");
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    compareInDays(startDate: Date, endDate: Date): number {
        const endDate_utc = this.convertToUtc(endDate);
        const startDate_utc = this.convertToUtc(startDate);
        return dayjs(endDate_utc).diff(startDate_utc, "days");
    }

    addMonths(dataInicial: Date, months: number): Date {
        return dayjs(dataInicial).add(months, "month").toDate();
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addDaysToDate(date: Date, days: number): Date {
        return dayjs(date).add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }

    convertToUtc3Hours(horaInicial: Date): Date {
        return dayjs(horaInicial).add(-3, "hour").toDate();
    }

    compareIfBefore(startDate: Date, endDate: Date): boolean {
        return dayjs(startDate).isBefore(endDate);
    }
}

export { DayjsDateProvider };
