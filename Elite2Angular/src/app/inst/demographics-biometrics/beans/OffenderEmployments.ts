import { BaseModel } from '@commonbeans/BaseModel';
//import {OffenderBookings} from './OffenderBookings';

export class OffenderEmployments extends BaseModel {

    private _caseloadType: string;
    private _certification: string;
    private _checkBox1: string;
    private _checkBox2: string;
    private _commentText: string;
    private _contactEmployerFlag: string;
    private _contactNumber: string;
    private _contactType: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _employerAwareFlag: string;
    private _employerName: string;
    private _employmentDate: Date;
    private _employmentPostCode: string;
    private _employmentSchedule: string;
    private _employmentType: string;
    private _hoursWeek: number;
    private _hoursWeekStr: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _occupationsCode: string;
    private _offenderEmploymentId: number;
    private _partialEmploymentDateFlag: string;
    private _partialTerminationDateFlag: string;
    private _position: string;
    private _rootOffenderId: number;
    private _scheduleHours: number;
    private _scheduleType: string;
    private _sealFlag: string;
    private _supervisorName: string;
    private _terminationDate: Date;
    private _terminationReasonText: string;
    private _wage: number;
    private _wageStr: string;
    private _wagePeriodCode: string;
    //private _offenderBookings: OffenderBookings;
    private _offenderBookId: number;
    private _employSeq: number;




    get hoursWeekStr(): string { return this._hoursWeekStr; }

    set hoursWeekStr(phoursWeekStr: string) { this._hoursWeekStr = phoursWeekStr; }

    get caseloadType(): string { return this._caseloadType; }

    set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }

    get wageStr(): string { return this._wageStr; }

    set wageStr(pwageStr: string) { this._wageStr = pwageStr; }

    get certification(): string { return this._certification; }

    set certification(pcertification: string) { this._certification = pcertification; }

    get checkBox1(): string { return this._checkBox1; }

    set checkBox1(pcheckBox1: string) { this._checkBox1 = pcheckBox1; }

    get checkBox2(): string { return this._checkBox2; }

    set checkBox2(pcheckBox2: string) { this._checkBox2 = pcheckBox2; }

    get commentText(): string { return this._commentText; }

    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    get contactEmployerFlag(): string { return this._contactEmployerFlag; }

    set contactEmployerFlag(pcontactEmployerFlag: string) { this._contactEmployerFlag = pcontactEmployerFlag; }

    get contactNumber(): string { return this._contactNumber; }

    set contactNumber(pcontactNumber: string) { this._contactNumber = pcontactNumber; }

    get contactType(): string { return this._contactType; }

    set contactType(pcontactType: string) { this._contactType = pcontactType; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get employerAwareFlag(): string { return this._employerAwareFlag; }

    set employerAwareFlag(pemployerAwareFlag: string) { this._employerAwareFlag = pemployerAwareFlag; }

    get employerName(): string { return this._employerName; }

    set employerName(pemployerName: string) { this._employerName = pemployerName; }

    get employmentDate(): Date { return this._employmentDate; }

    set employmentDate(pemploymentDate: Date) { this._employmentDate = pemploymentDate; }

    get employmentPostCode(): string { return this._employmentPostCode; }

    set employmentPostCode(pemploymentPostCode: string) { this._employmentPostCode = pemploymentPostCode; }

    get employmentSchedule(): string { return this._employmentSchedule; }

    set employmentSchedule(pemploymentSchedule: string) { this._employmentSchedule = pemploymentSchedule; }

    get employmentType(): string { return this._employmentType; }

    set employmentType(pemploymentType: string) { this._employmentType = pemploymentType; }

    get hoursWeek(): number { return this._hoursWeek; }

    set hoursWeek(phoursWeek: number) { this._hoursWeek = phoursWeek; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get occupationsCode(): string { return this._occupationsCode; }

    set occupationsCode(poccupationsCode: string) { this._occupationsCode = poccupationsCode; }

    get offenderEmploymentId(): number { return this._offenderEmploymentId; }

    set offenderEmploymentId(poffenderEmploymentId: number) { this._offenderEmploymentId = poffenderEmploymentId; }

    get partialEmploymentDateFlag(): string { return this._partialEmploymentDateFlag; }

    set partialEmploymentDateFlag(ppartialEmploymentDateFlag: string) { this._partialEmploymentDateFlag = ppartialEmploymentDateFlag; }

    get partialTerminationDateFlag(): string { return this._partialTerminationDateFlag; }

    set partialTerminationDateFlag(ppartialTerminationDateFlag: string) { this._partialTerminationDateFlag = ppartialTerminationDateFlag; }

    get position(): string { return this._position; }

    set position(pposition: string) { this._position = pposition; }

    get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }

    get scheduleHours(): number { return this._scheduleHours; }

    set scheduleHours(pscheduleHours: number) { this._scheduleHours = pscheduleHours; }

    get scheduleType(): string { return this._scheduleType; }

    set scheduleType(pscheduleType: string) { this._scheduleType = pscheduleType; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get supervisorName(): string { return this._supervisorName; }

    set supervisorName(psupervisorName: string) { this._supervisorName = psupervisorName; }

    get terminationDate(): Date { return this._terminationDate; }

    set terminationDate(pterminationDate: Date) { this._terminationDate = pterminationDate; }

    get terminationReasonText(): string { return this._terminationReasonText; }

    set terminationReasonText(pterminationReasonText: string) { this._terminationReasonText = pterminationReasonText; }

    get wage(): number { return this._wage; }

    set wage(pwage: number) { this._wage = pwage; }

    get wagePeriodCode(): string { return this._wagePeriodCode; }

    set wagePeriodCode(pwagePeriodCode: string) { this._wagePeriodCode = pwagePeriodCode; }

    //  get offenderBookings(): OffenderBookings { return this._offenderBookings; }
    //
    //  set offenderBookings(poffenderBookings: OffenderBookings){ this._offenderBookings = poffenderBookings; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get employSeq(): number { return this._employSeq; }

    set employSeq(pemploySeq: number) { this._employSeq = pemploySeq; }

    toJSON(): any {
        return {
            'wageStr': this._wageStr,
            'caseloadType': this._caseloadType,
            'certification': this._certification,
            'checkBox1': this._checkBox1,
            'checkBox2': this._checkBox2,
            'commentText': this._commentText,
            'contactEmployerFlag': this._contactEmployerFlag,
            'contactNumber': this._contactNumber,
            'contactType': this._contactType,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'employerAwareFlag': this._employerAwareFlag,
            'employerName': this._employerName,
            'employmentDate': this._employmentDate,
            'employmentPostCode': this._employmentPostCode,
            'employmentSchedule': this._employmentSchedule,
            'employmentType': this._employmentType,
            'hoursWeek': this._hoursWeek,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'occupationsCode': this._occupationsCode,
            'offenderEmploymentId': this._offenderEmploymentId,
            'partialEmploymentDateFlag': this._partialEmploymentDateFlag,
            'partialTerminationDateFlag': this._partialTerminationDateFlag,
            'position': this._position,
            'rootOffenderId': this._rootOffenderId,
            'scheduleHours': this._scheduleHours,
            'scheduleType': this._scheduleType,
            'sealFlag': this._sealFlag,
            'supervisorName': this._supervisorName,
            'terminationDate': this._terminationDate,
            'terminationReasonText': this._terminationReasonText,
            'wage': this._wage,
            'wagePeriodCode': this._wagePeriodCode,
            //      'offenderBookings': this._offenderBookings,
            'offenderBookId': this._offenderBookId,
            'employSeq': this._employSeq,
            'hoursWeekStr': this._hoursWeekStr,
        };
    }
}
