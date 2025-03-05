export class OffenderMovementDetails {
    private _offenderBookId: number;
    private _imprisonmentStatus: string;
    private _agyId: string;
    private _cant: string;
    private _reasonType: string;
    private _movementReason: string;
    private _moveAllowDate: Date;
    private _movementSeq: number;
    private _ssn: string;
    private _livingUnitId: number;
    private _inmComment: string;
    private _agyDir: string;
    private _movementType: string;
    private _agyFrom: string;
    private _PotentialScheduledconflicts: string;
    private _rootOffenderId: number;
    private _detailSeq: number;
    private _moveByDate: Date;
    private _scheduledTripId: number;
    private _fromDate: Date;
    private _alerts: number;
    private _firstName: string;
    private _nbtLivDescp: string;
    private _fromAgyLocId: string;
    private _forSegement: string;
    private _must: string;
    private _offenderId: number;
    private _sanctions: string;
    private _offName: string;
    private _nbtSchDate: Date;
    private _eventDate: Date;
    private _statusCode: string;
    private _lastName: string;
    private _ethnicity: string;
    private _offenderIdDisplay: string;
    private _tmpGroupId: string;
    private _affilliation: number;
    private _commentText: string;
    private _currAgyId: string;
    private _securityLevel: string;
    private _nonAssociation: string;
    private _txnStatus: string;
    private _dateType: string;
    private _alternateAgyLocId: string;
    private _checklocation: string;
    private _toAgyLocId: string;
    private _vScheduleId: number;
    private _toDate: Date;
    private _schedYn: string;
    private _agyTo: string;
    private _birthDate: Date;
    private _moveType: string;
    private _sexCode: string;
    private _approve: string;
    private _Schedule: string;
    private _scheduleDateType: number;
    private _moveResn: string;
    private _priorityCode: string;
    private _raceCode: string;
    private _recordedBy: string;
    private _appRsn: string;
    private _nonAdmInmateId: number;
    private _toAgyId: string;
    private _updToLoc: string;
    private _updMovType: string;
    private _updMovReason: string;
    private _vCoice:string;
    private _vUser:string;
    private _vRecDate:Date;
    private _vAppRsn:string;
    private _vTxnRsn:string;
    private _recordedDate: Date;
    private _txnRsn: string;
    private _checkFlag: boolean;
    private _createDatetime: Date;
    private _createUserId: string;
    private _nonAssoFlag: string;
    private _actionType:string;
    private _cancRole: string;
    private _appRole: string;
    private _ScheduleDate:number;
    private _selected:Boolean;
    


   

   
    get selected(): Boolean{ return this._selected; }
    set selected(pselected: Boolean){ this._selected= pselected ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get imprisonmentStatus(): string{ return this._imprisonmentStatus; }
    set imprisonmentStatus(pimprisonmentStatus: string){ this._imprisonmentStatus = pimprisonmentStatus ;}
    get agyId(): string{ return this._agyId; }
    set agyId(pagyId: string){ this._agyId = pagyId ;}
    get cant(): string{ return this._cant; }
    set cant(pcant: string){ this._cant = pcant ;}
    get reasonType(): string{ return this._reasonType; }
    set reasonType(preasonType: string){ this._reasonType = preasonType ;}
    get movementReason(): string{ return this._movementReason; }
    set movementReason(pmovementReason: string){ this._movementReason = pmovementReason ;}
    get moveAllowDate(): Date{ return this._moveAllowDate; }
    set moveAllowDate(pmoveAllowDate: Date){ this._moveAllowDate = pmoveAllowDate ;}
    get movementSeq(): number{ return this._movementSeq; }
    set movementSeq(pmovementSeq: number){ this._movementSeq = pmovementSeq ;}
    get ssn(): string{ return this._ssn; }
    set ssn(pssn: string){ this._ssn = pssn ;}
    get livingUnitId(): number{ return this._livingUnitId; }
    set livingUnitId(plivingUnitId: number){ this._livingUnitId = plivingUnitId ;}
    get inmComment(): string{ return this._inmComment; }
    set inmComment(pinmComment: string){ this._inmComment = pinmComment ;}
    get agyDir(): string{ return this._agyDir; }
    set agyDir(pagyDir: string){ this._agyDir = pagyDir ;}
    get movementType(): string{ return this._movementType; }
    set movementType(pmovementType: string){ this._movementType = pmovementType ;}
    get agyFrom(): string{ return this._agyFrom; }
    set agyFrom(pagyFrom: string){ this._agyFrom = pagyFrom ;}
    get PotentialScheduledconflicts(): string{ return this._PotentialScheduledconflicts; }
    set PotentialScheduledconflicts(pPotentialScheduledconflicts: string){ this._PotentialScheduledconflicts = pPotentialScheduledconflicts ;}
    get rootOffenderId(): number{ return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId ;}
    get detailSeq(): number{ return this._detailSeq; }
    set detailSeq(pdetailSeq: number){ this._detailSeq = pdetailSeq ;}
    get moveByDate(): Date{ return this._moveByDate; }
    set moveByDate(pmoveByDate: Date){ this._moveByDate = pmoveByDate ;}
    get scheduledTripId(): number{ return this._scheduledTripId; }
    set scheduledTripId(pscheduledTripId: number){ this._scheduledTripId = pscheduledTripId ;}
    get fromDate(): Date{ return this._fromDate; }
    set fromDate(pfromDate: Date){ this._fromDate = pfromDate ;}
    get alerts(): number{ return this._alerts; }
    set alerts(palerts: number){ this._alerts = palerts ;}
    get firstName(): string{ return this._firstName; }
    set firstName(pfirstName: string){ this._firstName = pfirstName ;}
    get nbtLivDescp(): string{ return this._nbtLivDescp; }
    set nbtLivDescp(pnbtLivDescp: string){ this._nbtLivDescp = pnbtLivDescp ;}
    get fromAgyLocId(): string{ return this._fromAgyLocId; }
    set fromAgyLocId(pfromAgyLocId: string){ this._fromAgyLocId = pfromAgyLocId ;}
    get forSegement(): string{ return this._forSegement; }
    set forSegement(pforSegement: string){ this._forSegement = pforSegement ;}
    get must(): string{ return this._must; }
    set must(pmust: string){ this._must = pmust ;}
    get offenderId(): number{ return this._offenderId; }
    set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
    get sanctions(): string{ return this._sanctions; }
    set sanctions(psanctions: string){ this._sanctions = psanctions ;}
    get offName(): string{ return this._offName; }
    set offName(poffName: string){ this._offName = poffName ;}
    get nbtSchDate(): Date{ return this._nbtSchDate; }
    set nbtSchDate(pnbtSchDate: Date){ this._nbtSchDate = pnbtSchDate ;}
    get eventDate(): Date{ return this._eventDate; }
    set eventDate(peventDate: Date){ this._eventDate = peventDate ;}
    get statusCode(): string{ return this._statusCode; }
    set statusCode(pstatusCode: string){ this._statusCode = pstatusCode ;}
    get lastName(): string{ return this._lastName; }
    set lastName(plastName: string){ this._lastName = plastName ;}
    get ethnicity(): string{ return this._ethnicity; }
    set ethnicity(pethnicity: string){ this._ethnicity = pethnicity ;}
    get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
    get tmpGroupId(): string{ return this._tmpGroupId; }
    set tmpGroupId(ptmpGroupId: string){ this._tmpGroupId = ptmpGroupId ;}
    get affilliation(): number{ return this._affilliation; }
    set affilliation(paffilliation: number){ this._affilliation = paffilliation ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get currAgyId(): string{ return this._currAgyId; }
    set currAgyId(pcurrAgyId: string){ this._currAgyId = pcurrAgyId ;}
    get securityLevel(): string{ return this._securityLevel; }
    set securityLevel(psecurityLevel: string){ this._securityLevel = psecurityLevel ;}
    get nonAssociation(): string{ return this._nonAssociation; }
    set nonAssociation(pnonAssociation: string){ this._nonAssociation = pnonAssociation ;}
    get txnStatus(): string{ return this._txnStatus; }
    set txnStatus(ptxnStatus: string){ this._txnStatus = ptxnStatus ;}
    get dateType(): string{ return this._dateType; }
    set dateType(pdateType: string){ this._dateType = pdateType ;}
    get alternateAgyLocId(): string{ return this._alternateAgyLocId; }
    set alternateAgyLocId(palternateAgyLocId: string){ this._alternateAgyLocId = palternateAgyLocId ;}
    get checklocation(): string{ return this._checklocation; }
    set checklocation(pchecklocation: string){ this._checklocation = pchecklocation ;}
    get toAgyLocId(): string{ return this._toAgyLocId; }
    set toAgyLocId(ptoAgyLocId: string){ this._toAgyLocId = ptoAgyLocId ;}
    get vScheduleId(): number{ return this._vScheduleId; }
    set vScheduleId(pvScheduleId: number){ this._vScheduleId = pvScheduleId ;}
    get toDate(): Date{ return this._toDate; }
    set toDate(ptoDate: Date){ this._toDate = ptoDate ;}
    get schedYn(): string{ return this._schedYn; }
    set schedYn(pschedYn: string){ this._schedYn = pschedYn ;}
    get agyTo(): string{ return this._agyTo; }
    set agyTo(pagyTo: string){ this._agyTo = pagyTo ;}
    get birthDate(): Date{ return this._birthDate; }
    set birthDate(pbirthDate: Date){ this._birthDate = pbirthDate ;}
    get moveType(): string{ return this._moveType; }
    set moveType(pmoveType: string){ this._moveType = pmoveType ;}
    get sexCode(): string{ return this._sexCode; }
    set sexCode(psexCode: string){ this._sexCode = psexCode ;}
    get approve(): string{ return this._approve; }
    set approve(papprove: string){ this._approve = papprove ;}
    get Schedule(): string{ return this._Schedule; }
    set Schedule(pSchedule: string){ this._Schedule = pSchedule ;}
    get scheduleDateType(): number{ return this._scheduleDateType; }
    set scheduleDateType(pscheduleDateType: number){ this._scheduleDateType = pscheduleDateType ;}
    get moveResn(): string{ return this._moveResn; }
    set moveResn(pmoveResn: string){ this._moveResn = pmoveResn ;}
    get priorityCode(): string{ return this._priorityCode; }
    set priorityCode(ppriorityCode: string){ this._priorityCode = ppriorityCode ;}
    get raceCode(): string{ return this._raceCode; }
    set raceCode(praceCode: string){ this._raceCode = praceCode ;}
    get recordedBy(): string{ return this._recordedBy; }
    set recordedBy(precordedBy: string){ this._recordedBy = precordedBy ;}
    get appRsn(): string{ return this._appRsn; }
    set appRsn(pappRsn: string){ this._appRsn = pappRsn;}
    get nonAdmInmateId(): number{ return this._nonAdmInmateId; }
    set nonAdmInmateId(pnonAdmInmateId: number){ this._nonAdmInmateId = pnonAdmInmateId ;}
    
    get toAgyId(): string{ return this._toAgyId; }
    set toAgyId(ptoAgyId: string){ this._toAgyId = ptoAgyId;}

    get updToLoc(): string{ return this._updToLoc; }
    set updToLoc(pupdToLoc: string){ this._updToLoc = pupdToLoc;}

    get updMovType(): string{ return this._updMovType; }
    set updMovType(pupdMovType: string){ this._updMovType= pupdMovType;}

    get updMovReason(): string{ return this._updMovReason; }
    set updMovReason(pupdMovReason: string){ this._updMovReason= pupdMovReason;}

    get vCoice():string{ return this._vCoice; }
    set vCoice(pvCoice: string){ this._vCoice= pvCoice;}


    get vUser():string{ return this._vUser; }
    set vUser(pvUser: string){ this._vUser= pvUser;}
    get vRecDate(): Date{ return this._vRecDate; }
    set vRecDate(pvRecDate: Date){ this._vRecDate = pvRecDate ;}
    get vAppRsn():string{ return this._vAppRsn; }
    set vAppRsn(pvAppRsn: string){ this._vAppRsn= pvAppRsn;}
    get vTxnRsn():string{ return this._vTxnRsn; }
    set vTxnRsn(pvTxnRsn: string){ this._vTxnRsn= pvTxnRsn;}
  
    get recordedDate(): Date{ return this._recordedDate; }
    set recordedDate(precordedDate: Date){ this._recordedDate = precordedDate ;}

    
    get txnRsn():string{ return this._txnRsn; }
    set txnRsn(ptxnRsn: string){ this._txnRsn= ptxnRsn;}

    get checkFlag():boolean{ return this._checkFlag; }
    set checkFlag(pcheckFlag: boolean){ this._checkFlag= pcheckFlag;}
   
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime;}

    get createUserId():string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId= pcreateUserId;}

    get nonAssoFlag():string{ return this._nonAssoFlag; }
    set nonAssoFlag(pnonAssoFlag: string){ this._nonAssoFlag= pnonAssoFlag;}
   
    get actionType():string{ return this._actionType; }
    set actionType(pactionType: string){ this._actionType= pactionType;}
  
    get cancRole(): string { return this._cancRole; }
    set cancRole(value: string) { this._cancRole = value; }

    get appRole(): string { return this._appRole; }
    set appRole(value: string) { this._appRole = value; }

    get ScheduleDate(): number{ return this._ScheduleDate; }
    set ScheduleDate(pScheduleDate: number){ this._ScheduleDate = pScheduleDate ;}

toJSON(): any {
    return { 
       'offenderBookId': this._offenderBookId,
       'imprisonmentStatus': this._imprisonmentStatus,
       'agyId': this._agyId,
       'cant': this._cant,
       'reasonType': this._reasonType,
       'movementReason': this._movementReason,
       'moveAllowDate': this._moveAllowDate,
       'movementSeq': this._movementSeq,
       'ssn': this._ssn,
       'livingUnitId': this._livingUnitId,
       'inmComment': this._inmComment,
       'agyDir': this._agyDir,
       'movementType': this._movementType,
       'agyFrom': this._agyFrom,
       'PotentialScheduledconflicts': this._PotentialScheduledconflicts,
       'rootOffenderId': this._rootOffenderId,
       'detailSeq': this._detailSeq,
       'moveByDate': this._moveByDate,
       'scheduledTripId': this._scheduledTripId,
       'fromDate': this._fromDate,
       'alerts': this._alerts,
       'firstName': this._firstName,
       'nbtLivDescp': this._nbtLivDescp,
       'fromAgyLocId': this._fromAgyLocId,
       'forSegement': this._forSegement,
       'must': this._must,
       'offenderId': this._offenderId,
       'sanctions': this._sanctions,
       'offName': this._offName,
       'nbtSchDate': this._nbtSchDate,
       'eventDate': this._eventDate,
       'statusCode': this._statusCode,
       'lastName': this._lastName,
       'ethnicity': this._ethnicity,
       'offenderIdDisplay': this._offenderIdDisplay,
       'tmpGroupId': this._tmpGroupId,
       'affilliation': this._affilliation,
       'commentText': this._commentText,
       'currAgyId': this._currAgyId,
       'securityLevel': this._securityLevel,
       'nonAssociation': this._nonAssociation,
       'txnStatus': this._txnStatus,
       'dateType': this._dateType,
       'alternateAgyLocId': this._alternateAgyLocId,
       'checklocation': this._checklocation,
       'toAgyLocId': this._toAgyLocId,
       'vScheduleId': this._vScheduleId,
       'toDate': this._toDate,
       'schedYn': this._schedYn,
       'agyTo': this._agyTo,
       'birthDate': this._birthDate,
       'moveType': this._moveType,
       'sexCode': this._sexCode,
       'approve': this._approve,
       'Schedule': this._Schedule,
       'scheduleDateType': this._scheduleDateType,
       'moveResn': this._moveResn,
       'priorityCode': this._priorityCode,
       'raceCode': this._raceCode,
       'recordedBy': this._recordedBy,
       'appRsn': this._appRsn,
       'nonAdmInmateId': this._nonAdmInmateId,
       'toAgyId': this._toAgyId,
       'updToLoc': this._updToLoc,
       'updMovType': this._updMovType,
       'updMovReason': this._updMovReason,
       'vCoice': this._vCoice,
       'vUser': this._vUser,
       'vRecDate': this._vRecDate,
       'vAppRsn': this._vAppRsn,
       'vTxnRsn': this._vTxnRsn,
       'recordedDate': this._recordedDate,
       'txnRsn': this._txnRsn,
       'checkFlag': this._checkFlag,
       'createDatetime': this._createDatetime,
       'createUserId': this._createUserId,
       'nonAssoFlag': this._nonAssoFlag,
       'actionType':this._actionType,
       'appRole': this._appRole,
       'cancRole': this._cancRole,
       'ScheduleDate':this._ScheduleDate,
       'selected':this._selected,
        };
        
    } 
}
