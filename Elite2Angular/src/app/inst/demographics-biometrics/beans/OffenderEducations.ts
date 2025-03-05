import { BaseModel } from '@commonbeans/BaseModel';
// import { OffenderBookings } from './OffenderBookings';

export class OffenderEducations extends BaseModel {

    private _agyLocId: string;
    private _caseloadType: string;
    private _commentText: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _educationLevelCode: string;
    private _educationSchedule: string;
    private _educationType: string;
    private _endDate: Date;
    private _graduationYear: number;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _numberOfYears: number;
    private _partialEndDateFlag: string;
    private _partialStartDateFlag: string;
    private _rootOffenderId: number;
    private _schoolCode: string;
    private _schoolName: string;
    private _sealFlag: string;
    private _specialEducationFlag: string;
    private _startDate: Date;
    private _studentId: string;
    private _studyAreaCode: string;
   // private _offenderBookings: OffenderBookings;
    private _offenderBookId: number;
    private _educationSeq: number;
    private _educationDbLevelCode: string;
    private _educationDbSchedule: string;

    get educationDbLevelCode(): string { return this._educationDbLevelCode; }

    set educationDbLevelCode( peducationDbLevelCode: string ) { this._educationDbLevelCode = peducationDbLevelCode; }

    get educationDbSchedule(): string { return this._educationDbSchedule; }

    set educationDbSchedule( peducationDbSchedule: string ) { this._educationDbSchedule = peducationDbSchedule; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId( pagyLocId: string ) { this._agyLocId = pagyLocId; }

    get caseloadType(): string { return this._caseloadType; }

    set caseloadType( pcaseloadType: string ) { this._caseloadType = pcaseloadType; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get educationLevelCode(): string { return this._educationLevelCode; }

    set educationLevelCode( peducationLevelCode: string ) { this._educationLevelCode = peducationLevelCode; }

    get educationSchedule(): string { return this._educationSchedule; }

    set educationSchedule( peducationSchedule: string ) { this._educationSchedule = peducationSchedule; }

    get educationType(): string { return this._educationType; }

    set educationType( peducationType: string ) { this._educationType = peducationType; }

    get endDate(): Date { return this._endDate; }

    set endDate( pendDate: Date ) { this._endDate = pendDate; }

    get graduationYear(): number { return this._graduationYear; }

    set graduationYear( pgraduationYear: number ) { this._graduationYear = pgraduationYear; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get numberOfYears(): number { return this._numberOfYears; }

    set numberOfYears( pnumberOfYears: number ) { this._numberOfYears = pnumberOfYears; }

    get partialEndDateFlag(): string { return this._partialEndDateFlag; }

    set partialEndDateFlag( ppartialEndDateFlag: string ) { this._partialEndDateFlag = ppartialEndDateFlag; }

    get partialStartDateFlag(): string { return this._partialStartDateFlag; }

    set partialStartDateFlag( ppartialStartDateFlag: string ) { this._partialStartDateFlag = ppartialStartDateFlag; }

    get rootOffenderId(): number { return this._rootOffenderId; }

    set rootOffenderId( prootOffenderId: number ) { this._rootOffenderId = prootOffenderId; }

    get schoolCode(): string { return this._schoolCode; }

    set schoolCode( pschoolCode: string ) { this._schoolCode = pschoolCode; }

    get schoolName(): string { return this._schoolName; }

    set schoolName( pschoolName: string ) { this._schoolName = pschoolName; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get specialEducationFlag(): string { return this._specialEducationFlag; }

    set specialEducationFlag( pspecialEducationFlag: string ) { this._specialEducationFlag = pspecialEducationFlag; }

    get startDate(): Date { return this._startDate; }

    set startDate( pstartDate: Date ) { this._startDate = pstartDate; }

    get studentId(): string { return this._studentId; }

    set studentId( pstudentId: string ) { this._studentId = pstudentId; }

    get studyAreaCode(): string { return this._studyAreaCode; }

    set studyAreaCode( pstudyAreaCode: string ) { this._studyAreaCode = pstudyAreaCode; }

//    get offenderBookings(): OffenderBookings { return this._offenderBookings; }
//
//    set offenderBookings( poffenderBookings: OffenderBookings ) { this._offenderBookings = poffenderBookings; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( poffenderBookId: number ) { this._offenderBookId = poffenderBookId; }

    get educationSeq(): number { return this._educationSeq; }

    set educationSeq( peducationSeq: number ) { this._educationSeq = peducationSeq; }

    toJSON(): any {
        return {
            'agyLocId': this._agyLocId,
            'caseloadType': this._caseloadType,
            'commentText': this._commentText,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'educationLevelCode': this._educationLevelCode,
            'educationSchedule': this._educationSchedule,
            'educationType': this._educationType,
            'endDate': this._endDate,
            'graduationYear': this._graduationYear,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'numberOfYears': this._numberOfYears,
            'partialEndDateFlag': this._partialEndDateFlag,
            'partialStartDateFlag': this._partialStartDateFlag,
            'rootOffenderId': this._rootOffenderId,
            'schoolCode': this._schoolCode,
            'schoolName': this._schoolName,
            'sealFlag': this._sealFlag,
            'specialEducationFlag': this._specialEducationFlag,
            'startDate': this._startDate,
            'studentId': this._studentId,
            'studyAreaCode': this._studyAreaCode,
            //'offenderBookings': this._offenderBookings,
            'offenderBookId': this._offenderBookId,
            'educationSeq': this._educationSeq,
            'educationDbLevelCode': this._educationDbLevelCode,
            'educationDbSchedule': this._educationDbSchedule,
        };
    }
}