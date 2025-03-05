import * as moment from 'moment';
import { TimeFormat } from '../time/timeFormat';

export class DateFormat {

    public static placeholderChar = '_';
    private static _dateFormat = 'dd/MM/yyyy';
    private static _dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    private static _monthYearFormat = 'MM/YYYY';
    private static _monthYearMask = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    private static _serverDate: Date;
    private static _diffTime: number;
    private static _timeOffset;
    private static _dayFormat = 'EEEE';
    private static _timeFormat = 'shortTime';
    private static _monthDateYearFormat = 'MM/DD/YYYY';
    private static _webStdFormat = 'YYYY-MM-DDTHH:mm:ss';

    static get dateFormat(): string {
        return DateFormat._dateFormat;
    }

    static set dateFormat(format: string) {
        if (format !== DateFormat._dateFormat) {
            DateFormat._dateFormat = format.toUpperCase();
            const data = DateFormat._dateFormat.split('');
            const mask = [];
            for (const ch of data) {
                if (ch === 'D' || ch === 'M' || ch === 'Y') {
                    mask.push(/\d/);
                } else {
                    mask.push(ch);
                }
            }
            DateFormat._dateMask = mask;
        }
    }

    static get monthYearFormat(): string {
        return DateFormat._monthYearFormat;
    }

    static get dateMask(): any {
        return DateFormat._dateMask;
    }

    static get monthYearMask(): any {
        return DateFormat._monthYearMask;
    }

    static setServerDate(date: string) {
        const datearr = date.split('T');
        const serDate = new Date(datearr[0] + ' ' + datearr[1]);
        DateFormat._diffTime = new Date().getTime() - serDate.getTime();
        DateFormat._serverDate = serDate;
    }

    static get serverDate(): Date {
        if (DateFormat._serverDate) {
            return new Date(this._serverDate);
        } else {
            return new Date();
        }
    }

    static updateServerDate(): string {
        if (DateFormat._serverDate) {
            DateFormat._serverDate.setTime(new Date().getTime() - DateFormat._diffTime);
            return moment(DateFormat._serverDate).format(DateFormat.dateFormat + ' HH:mm:ss');
        } else {
            return '';
        }
    }

    static getDate(other?: any): Date {
        let current;
        if (DateFormat._serverDate) {
            current = new Date(DateFormat._serverDate);
        } else {
            current = new Date();
        }
        if (other) {
            current = new Date('August 19, 1975 23:15:30');
            const old = new Date(other);
            current.setUTCFullYear(old.getUTCFullYear());
            current.setUTCMonth(old.getUTCMonth());
            current.setUTCDate(old.getUTCDate());
            current.setUTCHours(old.getUTCHours());
            current.setUTCMinutes(old.getUTCMinutes());
            current.setUTCSeconds(old.getUTCSeconds());
        }
        return current;
    }

    static format(date: Date): string {
        if (date) {
            return moment(DateFormat.getDate(date)).format(DateFormat.dateFormat);
        } else {
            return '';
        }
    }

    static parse(date: string): Date {
        if (date) {
            return DateFormat.getDate(moment(date, DateFormat.dateFormat).toDate());
        } else {
            return null;
        }
    }

    static formatMY(date: Date): string {
        if (date) {
            return moment(date).format(DateFormat.monthYearFormat);
        } else {
            return '';
        }
    }

    static parseMY(date: string): Date {
        if (date) {
            return moment(date, DateFormat.monthYearFormat).toDate();
        } else {
            return null;
        }
    }

    static compareDate(date1: Date, date2: Date): number {
        if (date1.getFullYear() === date2.getFullYear()) {
            if (date1.getMonth() === date2.getMonth()) {
                if (date1.getDate() === date2.getDate()) {
                    return 0;
                } else if (date1.getDate() > date2.getDate()) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (date1.getMonth() > date2.getMonth()) {
                return 1;
            } else {
                return -1;
            }
        } else if (date1.getFullYear() > date2.getFullYear()) {
            return 1;
        } else {
            return -1;
        }
    }

    static compareTime(date1: Date, date2: Date): number {
        if (date1.getHours() === date2.getHours()) {
            if (date1.getMinutes() === date2.getMinutes()) {
                if (date1.getSeconds() === date2.getSeconds()) {
                    return 0;
                } else if (date1.getSeconds() > date2.getSeconds()) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (date1.getMinutes() > date2.getMinutes()) {
                return 1;
            } else {
                return -1;
            }
        } else if (date1.getHours() > date2.getHours()) {
            return 1;
        } else {
            return -1;
        }
    }

    static compareDateTime(date1: Date, date2: Date): number {
        const dComp = DateFormat.compareDate(date1, date2);
        if (dComp !== 0) {
            return dComp;
        } else {
            return DateFormat.compareTime(date1, date2);
        }
    }
    
    static get dayFormat(): string {
        return DateFormat._dayFormat;
    }
    
    static set dayFormat(dayformat:string) {
        this._dayFormat=dayformat;
    }
    
    static get timeFormat(): string {
        return DateFormat._timeFormat;
    }
    
    static set timeFormat(timeFormat:string) {
        this._timeFormat=timeFormat;
    }
    // To get MM/DD/YYYY date format
    static formatMDY(date: Date): string {
        if (date) {
            return moment(date).format(DateFormat._monthDateYearFormat);
        } else {
            return '';
        }
    }

    // converts 'YYYY-MM-DDTHH:mm:ss' to 'DateFormat._dateFormat + ' ' + TimeFormat.timeFormat'(eg. dd/MM/yyyy hh:mm)
    static formatDateTimefromUTC(date) {
        return moment(date, DateFormat._webStdFormat).format(DateFormat._dateFormat + ' '+ TimeFormat.timeFormat);
    }
        
}

Date.prototype.toJSON = function () {
    return moment(this).format('YYYY-MM-DDTHH:mm:ss');
};

