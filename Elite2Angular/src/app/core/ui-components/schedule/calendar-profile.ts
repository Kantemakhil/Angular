export class CalendarProfile {
    static calView: string;
    static calEvtTime: string;
    static courtColor: string;
    static intColor: string;
    static extColor: string;
    static tempColor: string;
    static prgColor: string;
    static defaultColor: string;
    static intEvntTime: string;
    static extEvntTime: string;
    static calStartTime: string;
    static calEndTime: string;
    static monthAgendaView: string;
   static displayList: any[];



    constructor() { }
    static getProfilesValues(): any {
        return {
            'calView': CalendarProfile.calView,
            'calEvtTime': CalendarProfile.calEvtTime,
            'courtColor': CalendarProfile.courtColor,
            'intColor': CalendarProfile.intColor,
            'extColor': CalendarProfile.extColor,
            'tempColor': CalendarProfile.tempColor,
            'prgColor': CalendarProfile.prgColor,
            'intEvntTime': CalendarProfile.intEvntTime,
            'extEvntTime': CalendarProfile.extEvntTime,
            'defaultColor': CalendarProfile.defaultColor,
            'calStartTime': CalendarProfile.calStartTime,
            'calEndTime': CalendarProfile.calEndTime,
            'monthAgendaView': CalendarProfile.monthAgendaView,
            'displayList': CalendarProfile.displayList,
        };
    }







}
