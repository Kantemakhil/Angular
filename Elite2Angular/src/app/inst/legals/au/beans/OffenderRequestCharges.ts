export class OffenderRequestCharges {
  private _createDatetime: Date;
  private _eventId: number;
  private _createUserId: string;
  private _offenderBookId: number;
  private _offenderChargeId: number;
  private _modifyDatetime: Date;
  private _requestSeq: number;
  private _modifyUserId: string;
  private _applyFlag: boolean;
  private _offenceApplyFlag: boolean;

  get createDatetime(): Date { return this._createDatetime; }

  set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

  get eventId(): number { return this._eventId; }

  set eventId(peventId: number) { this._eventId = peventId; }

  get createUserId(): string { return this._createUserId; }

  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

  get offenderBookId(): number { return this._offenderBookId; }

  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

  get offenderChargeId(): number { return this._offenderChargeId; }

  set offenderChargeId(poffenderChargeId: number) { this._offenderChargeId = poffenderChargeId; }

  get modifyDatetime(): Date { return this._modifyDatetime; }

  set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

  get requestSeq(): number { return this._requestSeq; }

  set requestSeq(prequestSeq: number) { this._requestSeq = prequestSeq; }

  get modifyUserId(): string { return this._modifyUserId; }

  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

  get applyFlag(): boolean { return this._applyFlag; }

  set applyFlag(papplyFlag: boolean) { this._applyFlag = papplyFlag; }

  get offenceApplyFlag(): boolean { return this._offenceApplyFlag; }

  set offenceApplyFlag(poffenceApplyFlag: boolean) { this._offenceApplyFlag = poffenceApplyFlag; }


  toJSON(): any {
    return {
      'createDatetime': this._createDatetime,
      'eventId': this._eventId,
      'createUserId': this._createUserId,
      'offenderBookId': this._offenderBookId,
      'offenderChargeId': this._offenderChargeId,
      'modifyDatetime': this._modifyDatetime,
      'requestSeq': this._requestSeq,
      'modifyUserId': this._modifyUserId,
      'applyFlag': this._applyFlag,
      'offenceApplyFlag': this._offenceApplyFlag,
    };
  }
}
