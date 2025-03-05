import { Time } from "@angular/common";
import { BaseModel } from "@common/beans/BaseModel";

export class OffenderProposedIntlocs extends BaseModel {

    private _locationSeq: number;
    private _approvalDate: Date;
    private _offenderBookId: number;
    private _modifiedDatetime: Date;
    private _movementReason: string;
    private _commentText: string;
    private _toLivingUnitId: number;
    private _movementType: string;
    private _levelTwoId: number;
    private _levelOneId: number;
    private _levelFourId: number;
    private _levelThreeId: number;
    private _sealFlag: string;
    // private _nbtFromLivCode: string;
    // private _nbtLevel3Cd: string;
    // private _nbtLevel4Cd: string;
    private _initiatedDate: Date;
    // private _butMove: string;
    // private _butLevel2: string;
    // private _butLevel1: string;
    private _createUserId: string;
    private _createDatetime: Date;
    private _modifiyUserId: string;
    // private _butBedVac: string;
    // private _butLevel4: string;
    // private _butLevel3: string;
    // private _butReason: string;
    // private _nbtFromAgy: string;
    private _fromLivingUnitId: number;
    // private _nbtLevel1Cd: string;
    // private _nbtLevel2Cd: string;
    private _description: string;
    private _agyLocId: string;
    // private _approvalStatus: string;
    // private _completedDate: Date;
    // private _completeTime: Time;
    // private _completeStaffId: string;
    // private _approvalComment: string;
    // private _transactionStatus: string;
    // private _transactionComment: string;
    private _vCount: number;
    private _lvReturnCheckNonAsso: string;
    private _lvReturnCheckSecurity: string;
    private _offenderId: number;
    private _fromLivUnitidDesc: string;
    private _commentRole: string;

    get commentRole(): string { return this._commentRole; }
    set commentRole(value: string) { this._commentRole = value; }
    get fromLivUnitidDesc(): string { return this._fromLivUnitidDesc; }
    set fromLivUnitidDesc(value: string) { this._fromLivUnitidDesc = value; }
    get offenderId(): number {return this._offenderId;}
    set offenderId(value: number) {this._offenderId = value;}
    get lvReturnCheckNonAsso(): string { return this._lvReturnCheckNonAsso; }
    set lvReturnCheckNonAsso(value: string) { this._lvReturnCheckNonAsso = value; }
    get lvReturnCheckSecurity(): string { return this._lvReturnCheckSecurity; }
    set lvReturnCheckSecurity(value: string) { this._lvReturnCheckSecurity = value; }
    get vCount(): number { return this._vCount; }
    set vCount(value: number) { this._vCount = value; }

    get locationSeq(): number { return this._locationSeq; }
    set locationSeq(plocationSeq: number) { this._locationSeq = plocationSeq; }
    get approvalDate(): Date { return this._approvalDate; }
    set approvalDate(papprovalDate: Date) { this._approvalDate = papprovalDate; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get modifiedDatetime(): Date { return this._modifiedDatetime; }
    set modifiedDatetime(pmodifiedDatetime: Date) { this._modifiedDatetime = pmodifiedDatetime; }
    get movementReason(): string { return this._movementReason; }
    set movementReason(pmovementReason: string) { this._movementReason = pmovementReason; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get toLivingUnitId(): number { return this._toLivingUnitId; }
    set toLivingUnitId(ptoLivingUnitId: number) { this._toLivingUnitId = ptoLivingUnitId; }
    get movementType(): string { return this._movementType; }
    set movementType(pmovementType: string) { this._movementType = pmovementType; }
    get levelTwoId(): number { return this._levelTwoId; }
    set levelTwoId(value: number) { this._levelOneId = value; }
    get levelOneId(): number { return this._levelTwoId; }
    set levelOneId(value: number) { this._levelOneId = value; }
    get levelFourId(): number { return this._levelFourId; }
    set levelFourId(value: number) { this._levelFourId = value; }
    get levelThreeId(): number { return this._levelThreeId; }
    set levelThreeId(value: number) { this._levelThreeId = value; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    // get nbtFromLivCode(): string { return this._nbtFromLivCode; }
    // set nbtFromLivCode(pnbtFromLivCode: string) { this._nbtFromLivCode = pnbtFromLivCode; }
    // get nbtLevel3Cd(): string { return this._nbtLevel3Cd; }
    // set nbtLevel3Cd(pnbtLevel3Cd: string) { this._nbtLevel3Cd = pnbtLevel3Cd; }
    // get nbtLevel4Cd(): string { return this._nbtLevel4Cd; }
    // set nbtLevel4Cd(pnbtLevel4Cd: string) { this._nbtLevel4Cd = pnbtLevel4Cd; }
    get initiatedDate(): Date { return this._initiatedDate; }
    set initiatedDate(pinitiatedDate: Date) { this._initiatedDate = pinitiatedDate; }
    // get butMove(): string { return this._butMove; }
    // set butMove(pbutMove: string) { this._butMove = pbutMove; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(value: string) { this._createUserId = value; }
    // get butLevel2(): string { return this._butLevel2; }
    // set butLevel2(pbutLevel2: string) { this._butLevel2 = pbutLevel2; }
    // get butLevel1(): string { return this._butLevel1; }
    // set butLevel1(pbutLevel1: string) { this._butLevel1 = pbutLevel1; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get modifiyUserId(): string { return this._modifiyUserId; }
    set modifiyUserId(pmodifiyUserId: string) { this._modifiyUserId = pmodifiyUserId; }
    // get butBedVac(): string { return this._butBedVac; }
    // set butBedVac(pbutBedVac: string) { this._butBedVac = pbutBedVac; }
    // get butLevel4(): string { return this._butLevel4; }
    // set butLevel4(pbutLevel4: string) { this._butLevel4 = pbutLevel4; }
    // get butLevel3(): string { return this._butLevel3; }
    // set butLevel3(pbutLevel3: string) { this._butLevel3 = pbutLevel3; }
    // get butReason(): string { return this._butReason; }
    // set butReason(pbutReason: string) { this._butReason = pbutReason; }
    // get nbtFromAgy(): string { return this._nbtFromAgy; }
    // set nbtFromAgy(pnbtFromAgy: string) { this._nbtFromAgy = pnbtFromAgy; }
    get fromLivingUnitId(): number { return this._fromLivingUnitId; }
    set fromLivingUnitId(pfromLivingUnitId: number) { this._fromLivingUnitId = pfromLivingUnitId; }
    // get nbtLevel1Cd(): string { return this._nbtLevel1Cd; }
    // set nbtLevel1Cd(pnbtLevel1Cd: string) { this._nbtLevel1Cd = pnbtLevel1Cd; }
    // get nbtLevel2Cd(): string { return this._nbtLevel2Cd; }
    // set nbtLevel2Cd(pnbtLevel2Cd: string) { this._nbtLevel2Cd = pnbtLevel2Cd; }
    get description(): string { return this._description; }
    set description(value: string) { this._description = value; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(value: string) { this._agyLocId = value; }
    // get approvalStatus(): string { return this._approvalStatus; }
    // set approvalStatus(value: string) { this._approvalStatus = value; }
    // get completedDate(): Date { return this._completedDate; }
    // set completedDate(value: Date) { this._completedDate = value; }
    // get completeTime(): Time { return this._completeTime; }
    // set completeTime(value: Time) { this._completeTime = value; }
    // get completeStaffId(): string { return this._completeStaffId; }
    // set completeStaffId(value: string) { this._completeStaffId = value; }
    // get approvalComment(): string { return this._approvalComment; }
    // set approvalComment(value: string) { this._approvalComment = value }
    // get transactionComment(): string { return this._transactionComment; }
    // set transactionComment(value: string) { this._transactionComment = value; }
    // get transactionStatus(): string { return this._transactionStatus; }
    // set transactionStatus(value: string) { this._transactionStatus = value; }
    toJSON(): any {
        return {
            'locationSeq': this._locationSeq,
            'approvalDate': this._approvalDate,
            'offenderBookId': this._offenderBookId,
            'modifiedDatetime': this._modifiedDatetime,
            'movementReason': this._movementReason,
            'commentText': this._commentText,
            'toLivingUnitId': this._toLivingUnitId,
            'movementType': this._movementType,
            'levelTwoId': this._levelTwoId,
            'levelOneId': this._levelOneId,
            'levelFourId': this._levelFourId,
            'levelThreeId': this._levelThreeId,
            'sealFlag': this._sealFlag,
            // 'nbtFromLivCode': this._nbtFromLivCode,
            // 'nbtLevel3Cd': this._nbtLevel3Cd,
            // 'nbtLevel4Cd': this._nbtLevel4Cd,
            'initiatedDate': this._initiatedDate,
            // 'butMove': this._butMove,
            // 'butLevel2': this._butLevel2,
            // 'butLevel1': this._butLevel1,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifiyUserId': this._modifiyUserId,
            // 'butBedVac': this._butBedVac,
            // 'butLevel4': this._butLevel4,
            // 'butLevel3': this._butLevel3,
            // 'butReason': this._butReason,
            // 'nbtFromAgy': this._nbtFromAgy,
            'fromLivingUnitId': this._fromLivingUnitId,
            // 'nbtLevel1Cd': this._nbtLevel1Cd,
            // 'nbtLevel2Cd': this._nbtLevel2Cd,
            'description': this._description,
            'agyLocId': this._agyLocId,
            // 'approvalStatus': this._approvalStatus,
            // 'completedDate': this._completedDate,
            // 'completeTime': this._completeTime,
            // 'completeStaffId': this._completeStaffId,
            // 'approvalComment': this._approvalComment,
            // 'transactionComment': this._transactionComment,
            // 'transactionStatus': this._transactionStatus,
            'vCount': this._vCount,
            'lvReturnCheckNonAsso': this._lvReturnCheckNonAsso,
            'lvReturnCheckSecurity': this._lvReturnCheckSecurity,
            'offenderId': this._offenderId,
            'fromLivUnitidDesc': this._fromLivUnitidDesc,
            'commentRole': this._commentRole
        };
    }
}