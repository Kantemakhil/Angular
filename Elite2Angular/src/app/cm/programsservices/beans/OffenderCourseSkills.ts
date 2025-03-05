import { BaseModel } from "@common/beans/BaseModel";

export class OffenderCourseSkills extends BaseModel {
    private _createDatetime: Date;
    private _eventId: number;
    private _createUserId: string;
    private _staffRole: string;
    private _modifyDatetime: Date;
    private _noOfHours: number;
    private _modifyUserId: string;
    private _skillCode: string;
    private _sealFlag: string;
    private _commentText: string;
    private _staffId: number;
    private _staffDesc: string;
    private _butTutor: string;
    private _nbtNoOfHours: Date;
    private _rowId: string;
    private _nbt: string;
    private _firstName :string;
    private _lastName : string;
    private _offenderBookId: number;
    private _rowIdOne: number;
    get rowIdOne(): number { return this._rowIdOne; }
    set rowIdOne(value: number) { this._rowIdOne = value; }

    get staffDesc(): string { return this._staffDesc; }
    set staffDesc(pstaffDesc: string) { this._staffDesc = pstaffDesc; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get eventId(): number { return this._eventId; }
    set eventId(peventId: number) { this._eventId = peventId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get staffRole(): string { return this._staffRole; }
    set staffRole(pstaffRole: string) { this._staffRole = pstaffRole; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get noOfHours(): number { return this._noOfHours; }
    set noOfHours(pnoOfHours: number) { this._noOfHours = pnoOfHours; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get skillCode(): string { return this._skillCode; }
    set skillCode(pskillCode: string) { this._skillCode = pskillCode; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get staffId(): number { return this._staffId; }
    set staffId(pstaffId: number) { this._staffId = pstaffId; }
    get butTutor(): string { return this._butTutor; }
    set butTutor(pbutTutor: string) { this._butTutor = pbutTutor; }
    get nbtNoOfHours(): Date { return this._nbtNoOfHours; }
    set nbtNoOfHours(pnbtNoOfHours: Date) { this._nbtNoOfHours = pnbtNoOfHours; }
    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get nbt(): string { return this._nbt; }
    set nbt(pnbt: string) { this._nbt = pnbt; }

    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'eventId': this._eventId,
            'createUserId': this._createUserId,
            'staffRole': this._staffRole,
            'modifyDatetime': this._modifyDatetime,
            'noOfHours': this._noOfHours,
            'modifyUserId': this._modifyUserId,
            'skillCode': this._skillCode,
            'sealFlag': this._sealFlag,
            'commentText': this._commentText,
            'staffId': this._staffId,
            'nbtNoOfHours': this._nbtNoOfHours,
            'rowId': this._rowId,
            'nbt' : this._nbt,
            'firstName' : this._firstName,
            'lastName' :this._lastName,
            'offenderBookId': this._offenderBookId,
            'rowIdOne': this._rowIdOne
        };
    }
}
