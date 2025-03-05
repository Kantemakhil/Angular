import { BaseModel } from '@commonbeans/BaseModel';
export class VExternalMovesOne extends BaseModel {
    private _lastName: string;
    private _offenderBookId: number;
    private _offenderIdDisplay: string;
    private _tmpGroupId: string;
    private _agyId: string;
    private _movementReason: string;
    private _moveAllowDate: Date;
    private _commentText: string;
    private _movementSeq: number;
    private _ssn: string;
    private _currAgyId: string;
    private _livingUnitId: number;
    private _inmComment: string;
    private _agyDir: string;
    private _txnStatus: string;
    private _movementType: string;
    private _agyFrom: string;
    private _alternateAgyLocId: string;
    private _toAgyLocId: string;
    private _agyTo: string;
    private _rootOffenderId: number;
    private _detailSeq: number;
    private _moveByDate: Date;
    private _birthDate: Date;
    private _moveType: string;
    private _scheduledTripId: number;
    private _firstName: string;
    private _sexCode: string;
    private _nbtLivDescp: string;
    private _fromAgyLocId: string;
    private _moveResn: string;
    private _priorityCode: string;
    private _offenderId: number;
    private _offName: string;
    private _raceCode: string;
    private _eventDate: Date;
    private _statusCode: string;
    private _reasonType: string;
    private _dateType: string;
    private _checklocation: Boolean;
    private _forSegement: Boolean;
    private _must: string;
    private _cant: string;
    private _approve: string;
    private _fromDate: Date;
    private _toDate: Date;
    private _sanctions: Boolean;
    private _nonAssociation: Boolean;
    private _PScheduledconflicts: Boolean;
    private _pCommentRole: Boolean;
    private _currentLocation: any;
    private _appNew: string;
    private _appPend: string;
    private _appApp: string;
    private _appDen: string;
    private _txnPend: string;
    private _txnSchd: string;
    private _txnComp: string;
    private _txnCanc: string;
    private _diffLoc: string;
    private _ctrlCancReq: string;
    private _noBkg: string;
    private _vTxnStatus: string;
    private _vStatusCode: string;
    private _vPrioFlag: string;
    private _roleAssigned: string;
    private _vCoice: string;
    private _vUser: string;
    private _vRecDate: Date;
    private _vAppRsn: string;
    private _vTxnRsn: string;
    private _reason: string;
    private _agencyFrom: string;
    private _agencyTo: string;
    private _securityLevel: string;
    private _selected: Boolean;
    private _ScheduleDate: Date;
    private _alertCode: string;
    private _affiliation: string;
    private _secLevel: string;
    private _impStatus: string;
    private _nonAssoFlag: string;
    private _nbtApprDate: Date;
    private _ethnicity: string;
    private _commentRole: string;
    private _sancCode: string;
    private _potSchFlag: string;
    private _appRsn: string;
    private _txnRsn: string;
    private _recordedDate: Date;
    private _recordedBy: string;
    private _createUserId: string;
    private _judgeName: string;

    get judgeName(): string { return this._judgeName; }
    set judgeName(value: string) { this._judgeName = value; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(value: string) { this._createUserId = value; }
    get recordedBy(): string { return this._recordedBy; }
    set recordedBy(precordedBy: string) { this._recordedBy = precordedBy; }
    get recordedDate(): Date { return this._recordedDate; }
    set recordedDate(precordedDate: Date) { this._recordedDate = precordedDate; }
    get appRsn(): string { return this._appRsn; }
    set appRsn(pappRsn: string) { this._appRsn = pappRsn; }
    get txnRsn(): string { return this._txnRsn; }
    set txnRsn(ptxnRsn: string) { this._txnRsn = ptxnRsn; }
    get selected(): Boolean { return this._selected; }
    set selected(pselected: Boolean) { this._selected = pselected; }
    get currentLocation(): any { return this._currentLocation; }
    set currentLocation(pcurrentLocation: any) { this._currentLocation = pcurrentLocation; }
    get pCommentRole(): Boolean { return this._pCommentRole; }
    set pCommentRole(ppCommentRole: Boolean) { this._pCommentRole = ppCommentRole; }
    get PScheduledconflicts(): Boolean { return this._PScheduledconflicts; }
    set PScheduledconflicts(pPScheduledconflicts: Boolean) { this._PScheduledconflicts = pPScheduledconflicts; }
    get nonAssociation(): Boolean { return this._nonAssociation; }
    set nonAssociation(pnonAssociation: Boolean) { this._nonAssociation = pnonAssociation; }
    get sanctions(): Boolean { return this._sanctions; }
    set sanctions(psanctions: Boolean) { this._sanctions = psanctions; }
    get toDate(): Date { return this._toDate; }
    set toDate(ptoDate: Date) { this._toDate = ptoDate; }
    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }
    get approve(): string { return this._approve; }
    set approve(papprove: string) { this._approve = papprove; }
    get cant(): string { return this._cant; }
    set cant(pcant: string) { this._cant = pcant; }
    get must(): string { return this._must; }
    set must(pmust: string) { this._must = pmust; }
    get forSegement(): Boolean { return this._forSegement; }
    set forSegement(pforSegement: Boolean) { this._forSegement = pforSegement; }
    get checklocation(): Boolean { return this._checklocation; }
    set checklocation(pchecklocation: Boolean) { this._checklocation = pchecklocation; }
    get dateType(): string { return this._dateType; }
    set dateType(pdateType: string) { this._dateType = pdateType; }
    get reasonType(): string { return this._reasonType; }
    set reasonType(preasonType: string) { this._reasonType = preasonType; }

    get lastName(): string { return this._lastName; }
    set lastName(plastName: string) { this._lastName = plastName; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
    get tmpGroupId(): string { return this._tmpGroupId; }
    set tmpGroupId(ptmpGroupId: string) { this._tmpGroupId = ptmpGroupId; }
    get agyId(): string { return this._agyId; }
    set agyId(pagyId: string) { this._agyId = pagyId; }
    get movementReason(): string { return this._movementReason; }
    set movementReason(pmovementReason: string) { this._movementReason = pmovementReason; }
    get moveAllowDate(): Date { return this._moveAllowDate; }
    set moveAllowDate(pmoveAllowDate: Date) { this._moveAllowDate = pmoveAllowDate; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get movementSeq(): number { return this._movementSeq; }
    set movementSeq(pmovementSeq: number) { this._movementSeq = pmovementSeq; }
    get ssn(): string { return this._ssn; }
    set ssn(pssn: string) { this._ssn = pssn; }
    get currAgyId(): string { return this._currAgyId; }
    set currAgyId(pcurrAgyId: string) { this._currAgyId = pcurrAgyId; }
    get livingUnitId(): number { return this._livingUnitId; }
    set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }
    get inmComment(): string { return this._inmComment; }
    set inmComment(pinmComment: string) { this._inmComment = pinmComment; }
    get agyDir(): string { return this._agyDir; }
    set agyDir(pagyDir: string) { this._agyDir = pagyDir; }
    get txnStatus(): string { return this._txnStatus; }
    set txnStatus(ptxnStatus: string) { this._txnStatus = ptxnStatus; }
    get movementType(): string { return this._movementType; }
    set movementType(pmovementType: string) { this._movementType = pmovementType; }
    get agyFrom(): string { return this._agyFrom; }
    set agyFrom(pagyFrom: string) { this._agyFrom = pagyFrom; }
    get alternateAgyLocId(): string { return this._alternateAgyLocId; }
    set alternateAgyLocId(palternateAgyLocId: string) { this._alternateAgyLocId = palternateAgyLocId; }
    get toAgyLocId(): string { return this._toAgyLocId; }
    set toAgyLocId(ptoAgyLocId: string) { this._toAgyLocId = ptoAgyLocId; }
    get agyTo(): string { return this._agyTo; }
    set agyTo(pagyTo: string) { this._agyTo = pagyTo; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }
    get detailSeq(): number { return this._detailSeq; }
    set detailSeq(pdetailSeq: number) { this._detailSeq = pdetailSeq; }
    get moveByDate(): Date { return this._moveByDate; }
    set moveByDate(pmoveByDate: Date) { this._moveByDate = pmoveByDate; }
    get birthDate(): Date { return this._birthDate; }
    set birthDate(pbirthDate: Date) { this._birthDate = pbirthDate; }
    get moveType(): string { return this._moveType; }
    set moveType(pmoveType: string) { this._moveType = pmoveType; }
    get scheduledTripId(): number { return this._scheduledTripId; }
    set scheduledTripId(pscheduledTripId: number) { this._scheduledTripId = pscheduledTripId; }
    get firstName(): string { return this._firstName; }
    set firstName(pfirstName: string) { this._firstName = pfirstName; }
    get sexCode(): string { return this._sexCode; }
    set sexCode(psexCode: string) { this._sexCode = psexCode; }
    get nbtLivDescp(): string { return this._nbtLivDescp; }
    set nbtLivDescp(pnbtLivDescp: string) { this._nbtLivDescp = pnbtLivDescp; }
    get fromAgyLocId(): string { return this._fromAgyLocId; }
    set fromAgyLocId(pfromAgyLocId: string) { this._fromAgyLocId = pfromAgyLocId; }
    get moveResn(): string { return this._moveResn; }
    set moveResn(pmoveResn: string) { this._moveResn = pmoveResn; }
    get priorityCode(): string { return this._priorityCode; }
    set priorityCode(ppriorityCode: string) { this._priorityCode = ppriorityCode; }
    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get offName(): string { return this._offName; }
    set offName(poffName: string) { this._offName = poffName; }
    get raceCode(): string { return this._raceCode; }
    set raceCode(praceCode: string) { this._raceCode = praceCode; }
    get eventDate(): Date { return this._eventDate; }
    set eventDate(peventDate: Date) { this._eventDate = peventDate; }
    get statusCode(): string { return this._statusCode; }
    set statusCode(pstatusCode: string) { this._statusCode = pstatusCode; }

    get appNew(): string { return this._appNew; }
    set appNew(pappNew: string) { this._appNew = pappNew; }

    get appPend(): string { return this._appPend; }
    set appPend(pappPend: string) { this._appPend = pappPend; }

    get appApp(): string { return this._appApp; }
    set appApp(pappApp: string) { this._appApp = pappApp; }

    get appDen(): string { return this._appDen; }
    set appDen(pappDen: string) { this._appDen = pappDen; }

    get txnPend(): string { return this._txnPend; }
    set txnPend(ptxnPend: string) { this._txnPend = ptxnPend; }

    get txnSchd(): string { return this._txnSchd; }
    set txnSchd(ptxnSchd: string) { this._txnSchd = ptxnSchd; }

    get txnComp(): string { return this._txnComp; }
    set txnComp(ptxnComp: string) { this._txnComp = ptxnComp; }

    get txnCanc(): string { return this._txnCanc; }
    set txnCanc(ptxnCanc: string) { this._txnComp = ptxnCanc; }

    get diffLoc(): string { return this._diffLoc; }
    set diffLoc(pdiffLoc: string) { this._diffLoc = pdiffLoc; }

    get ctrlCancReq(): string { return this._ctrlCancReq; }
    set ctrlCancReq(pctrlCancReq: string) { this._ctrlCancReq = pctrlCancReq; }

    get noBkg(): string { return this._noBkg; }
    set noBkg(pnoBkg: string) { this._noBkg = pnoBkg; }

    get vTxnStatus(): string { return this._vTxnStatus; }
    set vTxnStatus(pvTxnStatus: string) { this._vTxnStatus = pvTxnStatus; }

    get vStatusCode(): string { return this._vStatusCode; }
    set vStatusCode(pvStatusCode: string) { this._vStatusCode = pvStatusCode; }

    get vPrioFlag(): string { return this._vPrioFlag; }
    set vPrioFlag(pvPrioFlag: string) { this._vPrioFlag = pvPrioFlag; }

    get roleAssigned(): string { return this._roleAssigned; }
    set roleAssigned(proleAssigned: string) { this._roleAssigned = proleAssigned; }

    get vCoice(): string { return this._vCoice; }
    set vCoice(pvCoice: string) { this._vCoice = pvCoice; }


    get vUser(): string { return this._vUser; }
    set vUser(pvUser: string) { this._vUser = pvUser; }
    get vRecDate(): Date { return this._vRecDate; }
    set vRecDate(pvRecDate: Date) { this._vRecDate = pvRecDate; }
    get vAppRsn(): string { return this._vAppRsn; }
    set vAppRsn(pvAppRsn: string) { this._vAppRsn = pvAppRsn; }
    get vTxnRsn(): string { return this._vTxnRsn; }
    set vTxnRsn(pvTxnRsn: string) { this._vTxnRsn = pvTxnRsn; }

    get reason(): string { return this._reason; }
    set reason(preason: string) { this._reason = preason; }

    get agencyFrom(): string { return this._agencyFrom; }
    set agencyFrom(pagencyFrom: string) { this._agencyFrom = pagencyFrom; }

    get agencyTo(): string { return this._agencyTo; }
    set agencyTo(pagencyTo: string) { this._agencyTo = pagencyTo; }

    get securityLevel(): string { return this._securityLevel; }
    set securityLevel(psecurityLevel: string) { this._securityLevel = psecurityLevel; }

    get ScheduleDate(): Date { return this._ScheduleDate; }
    set ScheduleDate(pScheduleDate: Date) { this._ScheduleDate = pScheduleDate; }

    get alertCode(): string { return this._alertCode; }
    set alertCode(palertCode: string) { this._alertCode = palertCode; }

    get affiliation(): string { return this._affiliation; }
    set affiliation(paffiliation: string) { this._affiliation = paffiliation; }

    get secLevel(): string { return this._secLevel; }
    set secLevel(psecLevel: string) { this._secLevel = psecLevel; }

    get impStatus(): string { return this._impStatus; }
    set impStatus(pimpStatus: string) { this._impStatus = pimpStatus; }

    get nonAssoFlag(): string { return this._nonAssoFlag; }
    set nonAssoFlag(pnonAssoFlag: string) { this._nonAssoFlag = pnonAssoFlag; }

    get nbtApprDate(): Date { return this._nbtApprDate; }
    set nbtApprDate(pnbtApprDate: Date) { this._nbtApprDate = pnbtApprDate; }

    get ethnicity(): string { return this._ethnicity; }
    set ethnicity(pethnicity: string) { this._ethnicity = pethnicity; }

    get commentRole(): string { return this._commentRole; }
    set commentRole(value: string) { this._commentRole = value; }

    get sancCode(): string { return this._sancCode; }
    set sancCode(value: string) { this._sancCode = value; }

    get potSchFlag(): string { return this._potSchFlag; }
    set potSchFlag(value: string) { this._potSchFlag = value; }

    toJSON(): any {
        return {
            'lastName': this._lastName,
            'offenderBookId': this._offenderBookId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'tmpGroupId': this._tmpGroupId,
            'agyId': this._agyId,
            'movementReason': this._movementReason,
            'moveAllowDate': this._moveAllowDate,
            'commentText': this._commentText,
            'movementSeq': this._movementSeq,
            'ssn': this._ssn,
            'currAgyId': this._currAgyId,
            'livingUnitId': this._livingUnitId,
            'inmComment': this._inmComment,
            'agyDir': this._agyDir,
            'txnStatus': this._txnStatus,
            'movementType': this._movementType,
            'agyFrom': this._agyFrom,
            'alternateAgyLocId': this._alternateAgyLocId,
            'toAgyLocId': this._toAgyLocId,
            'agyTo': this._agyTo,
            'rootOffenderId': this._rootOffenderId,
            'detailSeq': this._detailSeq,
            'moveByDate': this._moveByDate,
            'birthDate': this._birthDate,
            'moveType': this._moveType,
            'scheduledTripId': this._scheduledTripId,
            'firstName': this._firstName,
            'sexCode': this._sexCode,
            'nbtLivDescp': this._nbtLivDescp,
            'fromAgyLocId': this._fromAgyLocId,
            'moveResn': this._moveResn,
            'priorityCode': this._priorityCode,
            'offenderId': this._offenderId,
            'offName': this._offName,
            'raceCode': this._raceCode,
            'eventDate': this._eventDate,
            'statusCode': this._statusCode,
            'reasonType': this._reasonType,
            'dateType': this._dateType,
            'forSegement': this._forSegement,
            'checklocation': this._checklocation,
            'must': this._must,
            'cant': this._cant,
            'approve': this._eventDate,
            'fromDate': this._fromDate,
            'toDate': this._toDate,
            'sanctions': this._sanctions,
            'nonAssociation': this._nonAssociation,
            'PScheduledconflicts': this._PScheduledconflicts,
            'pCommentRole': this._pCommentRole,
            'currentLocation': this._currentLocation,
            'appNew': this._appNew,
            'appPend': this._appPend,
            'appApp': this._appApp,
            'appDen': this._appDen,
            'txnPend': this._txnPend,
            'txnSchd': this._txnSchd,
            'txnComp': this._txnComp,
            'txnCanc': this._txnCanc,
            'diffLoc': this._diffLoc,
            'ctrlCancReq': this._ctrlCancReq,
            'noBkg': this._noBkg,
            'vTxnStatus': this._vTxnStatus,
            'vStatusCode': this._vStatusCode,
            'vPrioFlag': this._vPrioFlag,
            'roleAssigned': this._roleAssigned,
            'vCoice': this._vCoice,
            'vUser': this._vUser,
            'vRecDate': this.vRecDate,
            'vAppRsn': this.vAppRsn,
            'vTxnRsn': this.vTxnRsn,
            'reason': this.reason,
            'agencyFrom': this.agencyFrom,
            'agencyTo': this.agencyTo,
            'securityLevel': this.securityLevel,
            'selected': this._selected,
            'ScheduleDate': this._ScheduleDate,
            'alertCode': this._alertCode,
            'affiliation': this._affiliation,
            'secLevel': this._secLevel,
            'impStatus': this._impStatus,
            'nonAssoFlag': this._nonAssoFlag,
            'nbtApprDate': this._nbtApprDate,
            'ethnicity': this._ethnicity,
            'commentRole': this._commentRole,
            'sancCode': this._sancCode,
            'potSchFlag': this._potSchFlag,
            'txnRsn': this._txnRsn,
            'appRsn': this._appRsn,
            'createUserId': this._createUserId,
            'recordedBy': this._recordedBy,
            'recordedDate': this._recordedDate,
            'judgeName': this._judgeName,
        };
    }
}