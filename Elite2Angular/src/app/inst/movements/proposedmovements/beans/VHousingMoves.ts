import { BaseModel } from "@common/beans/BaseModel";

export class VHousingMoves extends BaseModel {
    private _lastName: string;
    private _offenderBookId: number;
    private _offenderIdDisplay: string;
    private _agyId: string;
    private _movementReason: string;
    private _commentText: string;
    private _movementSeq: number;
    private _currAgyId: string;
    private _livingUnitId: number;
    private _txnStatus: string;
    private _movementType: string;
    private _toAgyLocId: string;
    private _rootOffenderId: number;
    private _detailSeq: number;
    private _moveType: string;
    private _sexCode: string;
    private _fromAgyLocId: string;
    private _offenderId: number;
    private _offName: string;
    private _raceCode: string;
    private _statusCode: string;
    private _cancReq: string;
    private _fromLivingUnitId: number;
    private _toLivingUnitId: number;
    private _approvalDate: Date;
    private _alertCode: string;
    private _secLevel: string;
    private _impStatus: string;
    private _sancCode: string;
    private _affiliation: string;
    private _potSchFlag: string;
    private _nonAssoFlag: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _staffName: string;
    private _appReason: string;
    private _txnRsn: string;
    private _locationSeq: number;
    private _recordedDate: Date;
    private _appRsn: string;
    private _recordedBy: string;
    private _statusComment: string;
    private _currentLocation: any;
    private _sanctions: Boolean;
    private _nonAssociation: Boolean;
    private _PScheduledconflicts: Boolean;
    private _schedYn: string;
    private _commentRole: string;
    private _createUserId: string;
    private _statusObj: any[] = [];
    private _txnObj: any[] = [];
    private _newFlag: Boolean;
    private _appFlag: Boolean;
    private _appPenFlag: Boolean;
    private _denFlag: Boolean;
    private _txnPen: Boolean;
    private _txnComp: Boolean;
    private _txnCanc: Boolean;
    private _ethnicity: string;
    private _vCapacity: number;
    private _vOccupied: number;
    private _lvBedMaxAssignSeq: number;
    private _vBedSeq: number;

    get ethnicity(): string {return this._ethnicity;}
    set ethnicity(value: string) {this._ethnicity = value;}
    get lvBedMaxAssignSeq(): number { return this._lvBedMaxAssignSeq; }
    set lvBedMaxAssignSeq(value: number) { this._lvBedMaxAssignSeq = value; }
    get vBedSeq(): number { return this._vBedSeq; }
    set vBedSeq(value: number) { this._vBedSeq = value; }
    get vCapacity(): number { return this._vCapacity; }
    set vCapacity(value: number) { this._vCapacity = value; }
    get vOccupied(): number { return this._vOccupied; }
    set vOccupied(value: number) { this._vOccupied = value; }
    get newFlag(): Boolean { return this._newFlag; }
    set newFlag(value: Boolean) { this._newFlag = value; }
    get appFlag(): Boolean { return this._appFlag; }
    set appFlag(value: Boolean) { this._appFlag = value; }
    get appPenFlag(): Boolean { return this._appPenFlag; }
    set appPenFlag(value: Boolean) { this._appPenFlag = value; }
    get denFlag(): Boolean { return this._denFlag; }
    set denFlag(value: Boolean) { this._denFlag = value; }
    get txnPen(): Boolean { return this._txnPen; }
    set txnPen(value: Boolean) { this._txnPen = value; }
    get txnComp(): Boolean { return this._txnComp; }
    set txnComp(value: Boolean) { this._txnComp = value; }
    get txnCanc(): Boolean { return this._txnCanc; }
    set txnCanc(value: Boolean) { this._txnCanc = value; }
    get statusObj(): any { return this._statusObj; }
    set statusObj(pstatusObj: any) { this._statusObj = pstatusObj; }

    get txnObj(): any { return this._txnObj; }
    set txnObj(ptxnObj: any) { this._txnObj = ptxnObj; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(value: string) { this._createUserId = value; }

    get commentRole(): string { return this._commentRole; }
    set commentRole(value: string) { this._commentRole = value; }

    get schedYn(): string { return this._schedYn; }
    set schedYn(value: string) { this._schedYn = value; }
    get PScheduledconflicts(): Boolean { return this._PScheduledconflicts; }
    set PScheduledconflicts(pPScheduledconflicts: Boolean) { this._PScheduledconflicts = pPScheduledconflicts; }
    get nonAssociation(): Boolean { return this._nonAssociation; }
    set nonAssociation(pnonAssociation: Boolean) { this._nonAssociation = pnonAssociation; }
    get sanctions(): Boolean { return this._sanctions; }
    set sanctions(psanctions: Boolean) { this._sanctions = psanctions; }
    get currentLocation(): any { return this._currentLocation; }
    set currentLocation(pcurrentLocation: any) { this._currentLocation = pcurrentLocation; }
    get locationSeq(): number { return this._locationSeq; }
    set locationSeq(plocationSeq: number) { this._locationSeq = plocationSeq; }
    get recordedDate(): Date { return this._recordedDate; }
    set recordedDate(precordedDate: Date) { this._recordedDate = precordedDate; }
    get appRsn(): string { return this._appRsn; }
    set appRsn(pappRsn: string) { this._appRsn = pappRsn; }
    get recordedBy(): string { return this._recordedBy; }
    set recordedBy(precordedBy: string) { this._recordedBy = precordedBy; }
    get statusComment(): string { return this._statusComment; }
    set statusComment(pstatusComment: string) { this._statusComment = pstatusComment; }
    get staffName(): string { return this._staffName; }
    set staffName(pstaffName: string) { this._staffName = pstaffName; }
    get appReason(): string { return this._appReason; }
    set appReason(pappReason: string) { this._appReason = pappReason; }
    get txnRsn(): string { return this._txnRsn; }
    set txnRsn(ptxnRsn: string) { this._txnRsn = ptxnRsn; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get approvalDate(): Date { return this._approvalDate; }
    set approvalDate(papprovalDate: Date) { this._approvalDate = papprovalDate; }
    get alertCode(): string { return this._alertCode; }
    set alertCode(palertCode: string) { this._alertCode = palertCode; }
    get secLevel(): string { return this._secLevel; }
    set secLevel(psecLevel: string) { this._secLevel = psecLevel; }
    get impStatus(): string { return this._impStatus; }
    set impStatus(pimpStatus: string) { this._impStatus = pimpStatus; }
    get sancCode(): string { return this._sancCode; }
    set sancCode(psancCode: string) { this._sancCode = psancCode; }
    get affiliation(): string { return this._affiliation; }
    set affiliation(paffiliation: string) { this._affiliation = paffiliation; }
    get potSchFlag(): string { return this._potSchFlag; }
    set potSchFlag(ppotSchFlag: string) { this._potSchFlag = ppotSchFlag; }
    get nonAssoFlag(): string { return this._nonAssoFlag; }
    set nonAssoFlag(pnonAssoFlag: string) { this._nonAssoFlag = pnonAssoFlag; }
    get cancReq(): string { return this._cancReq; }
    set cancReq(pcancReq: string) { this._cancReq = pcancReq; }
    get fromLivingUnitId(): number { return this._fromLivingUnitId; }
    set fromLivingUnitId(pfromLivingUnitId: number) { this._fromLivingUnitId = pfromLivingUnitId; }
    get toLivingUnitId(): number { return this._toLivingUnitId; }
    set toLivingUnitId(ptoLivingUnitId: number) { this._toLivingUnitId = ptoLivingUnitId; }


    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    get agyId(): string { return this._agyId; }
    set agyId(pagyId: string) { this._agyId = pagyId; }
    get movementReason(): string { return this._movementReason; }
    set movementReason(pmovementReason: string) { this._movementReason = pmovementReason; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get movementSeq(): number { return this._movementSeq; }
    set movementSeq(pmovementSeq: number) { this._movementSeq = pmovementSeq; }
    get currAgyId(): string { return this._currAgyId; }
    set currAgyId(pcurrAgyId: string) { this._currAgyId = pcurrAgyId; }
    get livingUnitId(): number { return this._livingUnitId; }
    set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }
    get txnStatus(): string { return this._txnStatus; }
    set txnStatus(ptxnStatus: string) { this._txnStatus = ptxnStatus; }
    get movementType(): string { return this._movementType; }
    set movementType(pmovementType: string) { this._movementType = pmovementType; }
    get toAgyLocId(): string { return this._toAgyLocId; }
    set toAgyLocId(ptoAgyLocId: string) { this._toAgyLocId = ptoAgyLocId; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }
    get detailSeq(): number { return this._detailSeq; }
    set detailSeq(pdetailSeq: number) { this._detailSeq = pdetailSeq; }
    get moveType(): string { return this._moveType; }
    set moveType(pmoveType: string) { this._moveType = pmoveType; }
    get sexCode(): string { return this._sexCode; }
    set sexCode(psexCode: string) { this._sexCode = psexCode; }
    get fromAgyLocId(): string { return this._fromAgyLocId; }
    set fromAgyLocId(pfromAgyLocId: string) { this._fromAgyLocId = pfromAgyLocId; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get offName(): string { return this._offName; }
    set offName(poffName: string) { this._offName = poffName; }
    get raceCode(): string { return this._raceCode; }
    set raceCode(praceCode: string) { this._raceCode = praceCode; }
    get statusCode(): string { return this._statusCode; }
    set statusCode(pstatusCode: string) { this._statusCode = pstatusCode; }


    toJSON(): any {
        return {
            'lastName': this._lastName,
            'offenderBookId': this._offenderBookId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'toLivingUnitId': this._toLivingUnitId,
            'agyId': this._agyId,
            'movementReason': this._movementReason,
            'fromLivingUnitId': this._fromLivingUnitId,
            'commentText': this._commentText,
            'movementSeq': this._movementSeq,
            'cancReq': this._cancReq,
            'currAgyId': this._currAgyId,
            'livingUnitId': this._livingUnitId,
            'txnStatus': this._txnStatus,
            'movementType': this._movementType,
            'toAgyLocId': this._toAgyLocId,
            'rootOffenderId': this._rootOffenderId,
            'detailSeq': this._detailSeq,
            'moveType': this._moveType,
            'sexCode': this._sexCode,
            'fromAgyLocId': this._fromAgyLocId,
            'offenderId': this._offenderId,
            'offName': this._offName,
            'raceCode': this._raceCode,
            'statusCode': this._statusCode,
            'approvalDate': this._approvalDate,
            'alertCode': this._alertCode,
            'secLevel': this._secLevel,
            'impStatus': this._impStatus,
            'sancCode': this._sancCode,
            'affiliation': this._affiliation,
            'potSchFlag': this._potSchFlag,
            'nonAssoFlag': this._nonAssoFlag,
            'modifyUserId': this._modifyUserId,
            'modifyDatetime': this._modifyDatetime,
            'staffName': this._staffName,
            'appReason': this._appReason,
            'txnRsn': this._txnRsn,
            'commentRole': this._commentRole,
            'createUserId': this._createUserId,
            'statusObj': this._statusObj,
            'txnObj': this._txnObj,
            'schedYn': this._schedYn,
            'ethnicity': this._ethnicity,
            'vCapacity': this._vCapacity,
            'vOccupied': this._vOccupied,
            'lvBedMaxAssignSeq': this._lvBedMaxAssignSeq,
            'vBedSeq': this._vBedSeq,
        };
    }
}