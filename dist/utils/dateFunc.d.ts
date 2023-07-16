import { TIME } from "../constants";
export declare class DateFunc {
    date: Date;
    constructor(date?: string | Date);
    isValid(dateString?: any): boolean;
    setTime(timestamp: number, jwt?: boolean): this;
    toJwt(): number;
    toDate(): Date;
    checkTime(compareDate: string | Date, unit: keyof typeof TIME.Unit): number;
    isSame(compareDate: string | Date, unit: keyof typeof TIME.Unit): boolean;
    isAfter(compareDate: string | Date, unit: keyof typeof TIME.Unit): boolean;
    isBefore(compareDate: string | Date, unit: keyof typeof TIME.Unit): boolean;
    isSameOrAfter(compareDate: string | Date, unit: keyof typeof TIME.Unit): boolean;
    isSameOrBefore(compareDate: string | Date, unit: keyof typeof TIME.Unit): boolean;
    format(text: string): string;
    getOrdinal(day: number): string;
    calDuration(duration: number, unit: keyof typeof TIME.Unit): number;
    add(duration: number, unit: keyof typeof TIME.Unit): this;
    subtract(duration: number, unit: keyof typeof TIME.Unit): this;
    diff(compareDate: string, unit: keyof typeof TIME.Unit): number;
}
