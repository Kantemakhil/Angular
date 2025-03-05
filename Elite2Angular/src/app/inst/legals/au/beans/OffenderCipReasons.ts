

export class OffenderCipReasons {
  private _reasonSeq: number;
  private _internalStatusSeq: number;
  private _offenderBookId: number;
  private _intStsRsnCodeDom: string;
  private _intStsReasonCode: string;
  private _parentValue: string;

  get reasonSeq(): number { return this._reasonSeq; }

  set reasonSeq(preasonSeq: number) { this._reasonSeq = preasonSeq; }

  get internalStatusSeq(): number { return this._internalStatusSeq; }

  set internalStatusSeq(pinternalStatusSeq: number) { this._internalStatusSeq = pinternalStatusSeq; }

  get offenderBookId(): number { return this._offenderBookId; }

  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

  get intStsRsnCodeDom(): string { return this._intStsRsnCodeDom; }

  set intStsRsnCodeDom(pintStsRsnCodeDom: string) { this._intStsRsnCodeDom = pintStsRsnCodeDom; }

  get intStsReasonCode(): string { return this._intStsReasonCode; }

  set intStsReasonCode(pintStsReasonCode: string) { this._intStsReasonCode = pintStsReasonCode; }

  get parentValue(): string { return this._parentValue; }

  set parentValue(pparentValue: string) { this._parentValue = pparentValue; }


  toJSON(): any {
    return {
      'reasonSeq': this._reasonSeq,
      'internalStatusSeq': this._internalStatusSeq,
      'offenderBookId': this._offenderBookId,
      'intStsRsnCodeDom': this._intStsRsnCodeDom,
      'intStsReasonCode': this._intStsReasonCode,
      'parentValue': this._parentValue
    };
  }
}
