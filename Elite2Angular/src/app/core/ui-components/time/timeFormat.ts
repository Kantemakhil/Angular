import * as moment from 'moment';
import { DateFormat } from '../datepicker/dateFormat';

export class TimeFormat {

    private static _timeFormat = 'HH:mm';

    static get timeFormat(): string {
        return TimeFormat._timeFormat;
    }

    static set timeFormat(tformat: string) {
        TimeFormat._timeFormat = tformat;
    }

    static format(time: Date): string {
        if (time) {
            return moment(DateFormat.getDate(time)).format(TimeFormat.timeFormat);
        } else {
            return '';
        }
    }

    static parse(time: string, date?: Date): Date {
        if (time) {
            const timeinfo = time.split(':');
            const dtTime = DateFormat.getDate(date);
            dtTime.setHours(parseInt(timeinfo[0]));
            dtTime.setMinutes(parseInt(timeinfo[1]));
            return dtTime;
        } else {
            return null;
        }
    }

    static getTimeInSeconds(time: Date): number {
        let sec = 0;
        if (time && time instanceof Date) {
            sec += (time.getHours() * 60 * 60);
            sec += (time.getMinutes() * 60);
            sec += time.getSeconds();
        }
        return sec;
    }

    static getTimeInMinutes(time: Date): number {
        let min = 0;
        if (time && time instanceof Date) {
            min = (time.getHours() * 60) + time.getMinutes();
        }
        return min;
    }

}
