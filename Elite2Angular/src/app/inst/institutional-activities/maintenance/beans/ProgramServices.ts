import { BaseModel } from '@commonbeans/BaseModel';
export class ProgramServices extends BaseModel {
    private _createUserId: string;
    private _programClass: string;
    private _endDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _commentText: string;
    private _phaseType: string;
    private _capacity: number;
    private _noOfAllowableAbsences: number;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _programCategory: string;
    private _functionType: string;
    private _sealFlag: string;
    private _sessionLength: number;
    private _activeFlag: string;
    private _contactMethod: string;
    private _startFlag: string;
    private _moduleFlag: string;
    private _moduleType: string;
    private _noOfWeeklySessions: number;
    private _programCode: string;
    private _noOfAllowableRestarts: number;
    private _createDatetime: Date;
    private _noOfSessions: number;
    private _breakAllowedFlag: string;
    private _listSeq: number;
    private _completionFlag: string;
    private _programId: number;
    private _startDate: Date;
    private _programStatus: string;
    private _parentProgramId:number;

    private _phasedescription:string;

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get programClass(): string { return this._programClass; }

    set programClass( pprogramClass: string ) { this._programClass = pprogramClass; }

    get endDate(): Date { return this._endDate; }

    set endDate( pendDate: Date ) { this._endDate = pendDate; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get phaseType(): string { return this._phaseType; }

    set phaseType( pphaseType: string ) { this._phaseType = pphaseType; }

    get capacity(): number { return this._capacity; }

    set capacity( pcapacity: number ) { this._capacity = pcapacity; }

    get noOfAllowableAbsences(): number { return this._noOfAllowableAbsences; }

    set noOfAllowableAbsences( pnoOfAllowableAbsences: number ) { this._noOfAllowableAbsences = pnoOfAllowableAbsences; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate( pexpiryDate: Date ) { this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }

    get programCategory(): string { return this._programCategory; }

    set programCategory( pprogramCategory: string ) { this._programCategory = pprogramCategory; }

    get functionType(): string { return this._functionType; }

    set functionType( pfunctionType: string ) { this._functionType = pfunctionType; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get sessionLength(): number { return this._sessionLength; }

    set sessionLength( psessionLength: number ) { this._sessionLength = psessionLength; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }

    get contactMethod(): string { return this._contactMethod; }

    set contactMethod( pcontactMethod: string ) { this._contactMethod = pcontactMethod; }

    get startFlag(): string { return this._startFlag; }

    set startFlag( pstartFlag: string ) { this._startFlag = pstartFlag; }

    get moduleFlag(): string { return this._moduleFlag; }

    set moduleFlag( pmoduleFlag: string ) { this._moduleFlag = pmoduleFlag; }

    get moduleType(): string { return this._moduleType; }

    set moduleType( pmoduleType: string ) { this._moduleType = pmoduleType; }

    get noOfWeeklySessions(): number { return this._noOfWeeklySessions; }

    set noOfWeeklySessions( pnoOfWeeklySessions: number ) { this._noOfWeeklySessions = pnoOfWeeklySessions; }

    get programCode(): string { return this._programCode; }

    set programCode( pprogramCode: string ) { this._programCode = pprogramCode; }

    get noOfAllowableRestarts(): number { return this._noOfAllowableRestarts; }

    set noOfAllowableRestarts( pnoOfAllowableRestarts: number ) { this._noOfAllowableRestarts = pnoOfAllowableRestarts; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get noOfSessions(): number { return this._noOfSessions; }

    set noOfSessions( pnoOfSessions: number ) { this._noOfSessions = pnoOfSessions; }

    get breakAllowedFlag(): string { return this._breakAllowedFlag; }

    set breakAllowedFlag( pbreakAllowedFlag: string ) { this._breakAllowedFlag = pbreakAllowedFlag; }

    get listSeq(): number { return this._listSeq; }

    set listSeq( plistSeq: number ) { this._listSeq = plistSeq; }

    get completionFlag(): string { return this._completionFlag; }

    set completionFlag( pcompletionFlag: string ) { this._completionFlag = pcompletionFlag; }

    get programId(): number { return this._programId; }

    set programId( pprogramId: number ) { this._programId = pprogramId; }

    get startDate(): Date { return this._startDate; }

    set startDate( pstartDate: Date ) { this._startDate = pstartDate; }

    get programStatus(): string { return this._programStatus; }

    set programStatus( pprogramStatus: string ) { this._programStatus = pprogramStatus; }

    get parentProgramId(): number { return this._parentProgramId; }

    set parentProgramId( pparentProgramId: number ) { this._parentProgramId = pparentProgramId; }

    get phasedescription(): string { return this._phasedescription; }

    set phasedescription( pphasedescription: string ) { this._phasedescription = pphasedescription; }
    
    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'programClass': this._programClass,
            'endDate': this._endDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'description': this._description,
            'commentText': this._commentText,
            'phaseType': this._phaseType,
            'capacity': this._capacity,
            'noOfAllowableAbsences': this._noOfAllowableAbsences,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'programCategory': this._programCategory,
            'functionType': this._functionType,
            'sealFlag': this._sealFlag,
            'sessionLength': this._sessionLength,
            'activeFlag': this._activeFlag,
            'contactMethod': this._contactMethod,
            'startFlag': this._startFlag,
            'moduleFlag': this._moduleFlag,
            'moduleType': this._moduleType,
            'noOfWeeklySessions': this._noOfWeeklySessions,
            'programCode': this._programCode,
            'noOfAllowableRestarts': this._noOfAllowableRestarts,
            'createDatetime': this._createDatetime,
            'noOfSessions': this._noOfSessions,
            'breakAllowedFlag': this._breakAllowedFlag,
            'listSeq': this._listSeq,
            'completionFlag': this._completionFlag,
            'programId': this._programId,
            'startDate': this._startDate,
            'programStatus': this._programStatus,
            'parentProgramId': this._parentProgramId,
            'phasedescription': this._phasedescription,
            
        };
    }
 }