import { BaseModel } from '@commonbeans/BaseModel';
import { Offenders } from '@common/beans/Offenders';



export class BedAssignmentHistories extends BaseModel {


  private _offenderBookId: number;
  private _bedAssignSeq: number;
  private _livingUnitId: number;
  private _assignmentDate: Date;
  private _assignmentTime: Date;
  private _assignmentReason: string;
  private _assignmentEndDate: Date;
  private _assignmentEndTime: Date;
  private _createDatetime: Date;
  private _createUserId: string;
  private _modifyDatetime: Date;
  private _modifyUserId: string;
  private _sealFlag: string;
  private _inserted: boolean;
  private _dspDescription: string;
  private _warningMsg: string;
  private _warningPrompt: string;
  private _agyLocId: string;
  private _isNonAssocOverriddenWarn: string;
  private _notification: string;
  private _offenderId: number;
  private _offenderName: string;
  private _offenderIdDisplay: string;
  private _offenderNonAssociationsByGang: Array<Offenders>;
  private _offenderNonAssociationsByInd: Array<Offenders>;


  public get offenderName(): string {
    return this._offenderName;
  }

  public set offenderName(value: string) {
    this._offenderName = value;
  }

  public get offenderIdDisplay(): string {
    return this._offenderIdDisplay;
  }
  public set offenderIdDisplay(value: string) {
    this._offenderIdDisplay = value;
  }

  public get offenderNonAssociationsByInd(): Array<Offenders> {
    return this._offenderNonAssociationsByInd;
  }
  public set offenderNonAssociationsByInd(value: Array<Offenders>) {
    this._offenderNonAssociationsByInd = value;
  }

  public get offenderNonAssociationsByGang(): Array<Offenders> {
    return this._offenderNonAssociationsByGang;
  }
  public set offenderNonAssociationsByGang(value: Array<Offenders>) {
    this._offenderNonAssociationsByGang = value;
  }

  public get offenderId(): number {
    return this._offenderId;
  }
  public set offenderId(value: number) {
    this._offenderId = value;
  }

  get warningMsg(): string { return this._warningMsg; }

  set warningMsg(pwarningMsg: string) { this._warningMsg = pwarningMsg; }

  get warningPrompt(): string { return this._warningPrompt; }

  set warningPrompt(pwarningPrompt: string) { this._warningPrompt = pwarningPrompt; }

  get offenderbookid(): number { return this._offenderBookId; }

  set offenderBookId(poffenderBookTd: number) { this._offenderBookId = poffenderBookTd; }

  get bedAssignSeq(): number { return this._bedAssignSeq; }

  set bedAssignSeq(pbedAssignSeq: number) { this._bedAssignSeq = pbedAssignSeq; }

  get livingUnitId(): number { return this._livingUnitId; }

  set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }

  get assignmentDate(): Date { return this._assignmentDate; }

  set assignmentDate(passignmentDate: Date) { this._assignmentDate = passignmentDate; }

  get assignmentTime(): Date { return this._assignmentTime; }

  set assignmentTime(passignmentTime: Date) { this._assignmentTime = passignmentTime; }

  get assignmentReason(): string { return this._assignmentReason; }

  set assignmentReason(passignmentReason: string) { this._assignmentReason = passignmentReason; }

  get assignmentEndDate(): Date { return this._assignmentEndDate; }

  set assignmentEndDate(passignmentEndDate: Date) { this._assignmentEndDate = passignmentEndDate; }

  get assignmentEndTime(): Date { return this._assignmentEndTime; }

  set assignmentEndTime(passignmentEndTime: Date) { this._assignmentEndTime = passignmentEndTime; }

  get createDatetime(): Date { return this._createDatetime; }

  set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

  get createUserId(): string { return this._createUserId; }

  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

  get modifyDatetime(): Date { return this._modifyDatetime; }

  set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

  get modifyUserId(): string { return this._modifyUserId; }

  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

  get sealFlag(): string { return this._sealFlag; }

  set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

  get inserted(): boolean { return this._inserted; }

  set inserted(pinserted: boolean) { this._inserted = pinserted; }
    
     get dspDescription(): string { return this._dspDescription; }

  set dspDescription(pdspDescription: string) { this._dspDescription = pdspDescription; }

  get agyLocId(): string { return this._agyLocId; }
  
  set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

  get isNonAssocOverriddenWarn(): string { return this._isNonAssocOverriddenWarn; }

  set isNonAssocOverriddenWarn(pisNonAssocOverriddenWarn: string) { this._isNonAssocOverriddenWarn = pisNonAssocOverriddenWarn; }

  get notification(): string { return this._notification; }

  set notification(pnotification: string) { this._notification = pnotification; }
  toJSON(): any {
    return {
      'offenderBookId': this._offenderBookId,
      'bedAssignSeq': this._bedAssignSeq,
      'livingUnitId': this._livingUnitId,
      'assignmentDate': this._assignmentDate,
      'assignmentTime': this._assignmentTime,
      'assignmentReason': this._assignmentReason,
      'assignmentEndDate': this._assignmentEndDate,
      'assignmentEndTime': this._assignmentEndTime,
      'createDatetime': this._createDatetime,
      'createUserId': this._createUserId,
      'modifyDatetime': this._modifyDatetime,
      'modifyUserId': this._modifyUserId,
      'sealFlag': this._sealFlag,
      'inserted': this._inserted,
      'warningMsg': this._warningMsg,
      'warningPrompt': this._warningPrompt,
      'agyLocId': this._agyLocId,
      'dspDescription': this._dspDescription,
      'isNonAssocOverriddenWarn':this.isNonAssocOverriddenWarn,
      'notification':this._notification,
      'offenderId':this.offenderId,
      'offenderName':this._offenderName,
      'offenderNonAssociationsByGang': this._offenderNonAssociationsByGang,
      'offenderNonAssociationsByInd': this._offenderNonAssociationsByInd,
      'offenderIdDisplay': this._offenderIdDisplay
    };
  }
}
