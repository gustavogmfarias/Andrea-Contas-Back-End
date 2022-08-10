interface IDateProvider {
    compareInHours(startDate: Date, endDate: Date): number;
    convertToUtc(date: Date): string;
    onlyDate(date: Date): string;
    dateNow(): Date;
    compareInDays(startDate: Date, endDate: Date): number;
    addDays(days: number): Date;
    addDaysToDate(date: Date, days: number): Date;
    addHours(hours: number): Date;
    convertToUtc3Hours(horaInicial: Date): Date;
    addMonths(dataInicial: Date, months: number): Date;
    compareIfBefore(startDate: Date, endDate: Date): boolean;
}

export { IDateProvider };
