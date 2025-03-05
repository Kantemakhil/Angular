import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderProposedMvmnts extends BaseModel {
	private _createUserId: string;
	private _reasonText: string;
	private _offenderBookId: number;
	private _modifyDatetime: Date;
	private _AppRsn: string;
	private _TxnRsn: string;
	private _tmpGroupId: number;
	private _priorityAssignedBy: string;
	private _modifyUserId: string;
	private _AppUser: string;
	private _movementReason: string;
	private _moveAllowDate: Date;
	private _commentText: string;
	private _toAgySeq: number;
	private _movementSeq: number;
	private _AppStat: string;
	private _priorityAssignedDate: Date;
	private _movementType: string;
	private _alternateAgyLocId: string;
	private _judge: string;
	private _userDefineFlag1: string;
	private _sealFlag: string;
	private _toAgyLocId: string;
	private _algoComment: string;
	private _fromAgySeq: number;
	private _userDefineFlag2: string;
	private _moveByDate: Date;
	private _scheduledTripId: number;
	private _createDatetime: Date;
	private _TxnUser: string;
	private _fromAgyLocId: string;
	private _ApprDate: Date;
	private _TxnStat: string;
	private _priorityCode: string;
	private _eventDate: Date;
	private _eventTime: Date;
	private _nbtLevel1Cd: any;
	private _updMoveType: string;
	private _initiatedBy: string;
	private _requestedBy: string;
	private _approvedBy: string;
	private _reason: string;
	private _requestCancellation: boolean;
	private _cantmoveuntil: string;
	private _mustmoveBy: string;
	private _movementcomment: string;
	private _moveType: string;

	private _lvReturnCheckSecurity: string;
	private _lvReturnCheckNonAsso: string;
	private _vCount: number;


	public get lvReturnCheckSecurity(): string {
		return this._lvReturnCheckSecurity;
	}
	public set lvReturnCheckSecurity(value: string) {
		this._lvReturnCheckSecurity = value;
	}

	public get vCount(): number {
		return this._vCount;
	}
	public set vCount(value: number) {
		this._vCount = value;
	}

	public get lvReturnCheckNonAsso(): string {
		return this._lvReturnCheckNonAsso;
	}
	public set lvReturnCheckNonAsso(value: string) {
		this._lvReturnCheckNonAsso = value;
	}



	get eventTime(): Date { return this._eventTime; }
	set eventTime(peventTime: Date) { this._eventTime = peventTime; }
	get nbtLevel1Cd(): any { return this._nbtLevel1Cd; }
	set nbtLevel1Cd(pnbtLevel1Cd: any) { this._nbtLevel1Cd = pnbtLevel1Cd; }
	get createUserId(): string { return this._createUserId; }
	set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
	get reasonText(): string { return this._reasonText; }
	set reasonText(preasonText: string) { this._reasonText = preasonText; }
	get offenderBookId(): number { return this._offenderBookId; }
	set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
	get modifyDatetime(): Date { return this._modifyDatetime; }
	set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
	get AppRsn(): string { return this._AppRsn; }
	set AppRsn(pAppRsn: string) { this._AppRsn = pAppRsn; }
	get TxnRsn(): string { return this._TxnRsn; }
	set TxnRsn(pTxnRsn: string) { this._TxnRsn = pTxnRsn; }
	get tmpGroupId(): number { return this._tmpGroupId; }
	set tmpGroupId(ptmpGroupId: number) { this._tmpGroupId = ptmpGroupId; }
	get priorityAssignedBy(): string { return this._priorityAssignedBy; }
	set priorityAssignedBy(ppriorityAssignedBy: string) { this._priorityAssignedBy = ppriorityAssignedBy; }
	get modifyUserId(): string { return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
	get AppUser(): string { return this._AppUser; }
	set AppUser(pAppUser: string) { this._AppUser = pAppUser; }
	get movementReason(): string { return this._movementReason; }
	set movementReason(pmovementReason: string) { this._movementReason = pmovementReason; }
	get moveAllowDate(): Date { return this._moveAllowDate; }
	set moveAllowDate(pmoveAllowDate: Date) { this._moveAllowDate = pmoveAllowDate; }
	get commentText(): string { return this._commentText; }
	set commentText(pcommentText: string) { this._commentText = pcommentText; }
	get toAgySeq(): number { return this._toAgySeq; }
	set toAgySeq(ptoAgySeq: number) { this._toAgySeq = ptoAgySeq; }
	get movementSeq(): number { return this._movementSeq; }
	set movementSeq(pmovementSeq: number) { this._movementSeq = pmovementSeq; }
	get AppStat(): string { return this._AppStat; }
	set AppStat(pAppStat: string) { this._AppStat = pAppStat; }
	get priorityAssignedDate(): Date { return this._priorityAssignedDate; }
	set priorityAssignedDate(ppriorityAssignedDate: Date) { this._priorityAssignedDate = ppriorityAssignedDate; }
	get movementType(): string { return this._movementType; }
	set movementType(pmovementType: string) { this._movementType = pmovementType; }
	get alternateAgyLocId(): string { return this._alternateAgyLocId; }
	set alternateAgyLocId(palternateAgyLocId: string) { this._alternateAgyLocId = palternateAgyLocId; }
	get judge(): string { return this._judge; }
	set judge(pjudge: string) { this._judge = pjudge; }
	get userDefineFlag1(): string { return this._userDefineFlag1; }
	set userDefineFlag1(puserDefineFlag1: string) { this._userDefineFlag1 = puserDefineFlag1; }
	get sealFlag(): string { return this._sealFlag; }
	set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
	get toAgyLocId(): string { return this._toAgyLocId; }
	set toAgyLocId(ptoAgyLocId: string) { this._toAgyLocId = ptoAgyLocId; }
	get algoComment(): string { return this._algoComment; }
	set algoComment(palgoComment: string) { this._algoComment = palgoComment; }
	get fromAgySeq(): number { return this._fromAgySeq; }
	set fromAgySeq(pfromAgySeq: number) { this._fromAgySeq = pfromAgySeq; }
	get userDefineFlag2(): string { return this._userDefineFlag2; }
	set userDefineFlag2(puserDefineFlag2: string) { this._userDefineFlag2 = puserDefineFlag2; }
	get moveByDate(): Date { return this._moveByDate; }
	set moveByDate(pmoveByDate: Date) { this._moveByDate = pmoveByDate; }
	get scheduledTripId(): number { return this._scheduledTripId; }
	set scheduledTripId(pscheduledTripId: number) { this._scheduledTripId = pscheduledTripId; }
	get createDatetime(): Date { return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
	get TxnUser(): string { return this._TxnUser; }
	set TxnUser(pTxnUser: string) { this._TxnUser = pTxnUser; }
	get fromAgyLocId(): string { return this._fromAgyLocId; }
	set fromAgyLocId(pfromAgyLocId: string) { this._fromAgyLocId = pfromAgyLocId; }
	get ApprDate(): Date { return this._ApprDate; }
	set ApprDate(pApprDate: Date) { this._ApprDate = pApprDate; }
	get TxnStat(): string { return this._TxnStat; }
	set TxnStat(pTxnStat: string) { this._TxnStat = pTxnStat; }
	get priorityCode(): string { return this._priorityCode; }
	set priorityCode(ppriorityCode: string) { this._priorityCode = ppriorityCode; }
	get eventDate(): Date { return this._eventDate; }
	set eventDate(peventDate: Date) { this._eventDate = peventDate; }
	set updMoveType(pupdMoveType: string) { this._updMoveType = pupdMoveType; }
	get updMoveType(): string { return this._updMoveType; }
	get requestCancellation(): boolean { return this._requestCancellation; }
	set requestCancellation(prequestCancellation: boolean) { this._requestCancellation = prequestCancellation; }
	get requestedBy(): string { return this._requestedBy; }
	set requestedBy(prequestedBy: string) { this._requestedBy = prequestedBy; }
	get reason(): string { return this._reason; }
	set reason(preason: string) { this._reason = preason; }
	get approvedBy(): string { return this._approvedBy; }
	set approvedBy(papprovedBy: string) { this._approvedBy = papprovedBy; }
	get initiatedBy(): string { return this._initiatedBy; }
	set initiatedBy(pinitiatedBy: string) { this._initiatedBy = pinitiatedBy; }
	get movementcomment(): string { return this._movementcomment; }
	set movementcomment(pmovementcomment: string) { this._movementcomment = pmovementcomment; }
	get cantmoveuntil(): string { return this._cantmoveuntil; }
	set cantmoveuntil(pcantmoveuntil: string) { this._cantmoveuntil = pcantmoveuntil; }
	get mustmoveBy(): string { return this._mustmoveBy; }
	set mustmoveBy(pmustmoveBy: string) { this._mustmoveBy = pmustmoveBy; }
	get moveType(): string { return this._moveType; }
	set moveType(pmoveType: string) { this._moveType = pmoveType; }



	toJSON(): any {
		return {
			'createUserId': this._createUserId,
			'reasonText': this._reasonText,
			'offenderBookId': this._offenderBookId,
			'modifyDatetime': this._modifyDatetime,
			'AppRsn': this._AppRsn,
			'TxnRsn': this._TxnRsn,
			'tmpGroupId': this._tmpGroupId,
			'priorityAssignedBy': this._priorityAssignedBy,
			'modifyUserId': this._modifyUserId,
			'AppUser': this._AppUser,
			'movementReason': this._movementReason,
			'moveAllowDate': this._moveAllowDate,
			'commentText': this._commentText,
			'toAgySeq': this._toAgySeq,
			'movementSeq': this._movementSeq,
			'AppStat': this._AppStat,
			'priorityAssignedDate': this._priorityAssignedDate,
			'movementType': this._movementType,
			'alternateAgyLocId': this._alternateAgyLocId,
			'judge': this._judge,
			'userDefineFlag1': this._userDefineFlag1,
			'sealFlag': this._sealFlag,
			'toAgyLocId': this._toAgyLocId,
			'algoComment': this._algoComment,
			'fromAgySeq': this._fromAgySeq,
			'userDefineFlag2': this._userDefineFlag2,
			'moveByDate': this._moveByDate,
			'scheduledTripId': this._scheduledTripId,
			'createDatetime': this._createDatetime,
			'TxnUser': this._TxnUser,
			'fromAgyLocId': this._fromAgyLocId,
			'ApprDate': this._ApprDate,
			'TxnStat': this._TxnStat,
			'priorityCode': this._priorityCode,
			'eventDate': this._eventDate,
			'eventTime': this._eventTime,
			'nbtLevel1Cd': this._nbtLevel1Cd,
			'updMoveType': this._updMoveType,
			'requestCancellation': this._requestCancellation,
			'requestedBy': this._requestedBy,
			'reason': this._reason,
			'approvedBy': this._approvedBy,
			'initiatedBy': this._initiatedBy,
			'movementcomment': this._movementcomment,
			'cantmoveuntil': this._cantmoveuntil,
			'mustmoveBy': this._mustmoveBy,
			'moveType': this._moveType,
			'lvReturnCheckSecurity': this._lvReturnCheckSecurity,
			'lvReturnCheckNonAsso': this._lvReturnCheckNonAsso,
			'vCount': this._vCount,
		};
	}
}