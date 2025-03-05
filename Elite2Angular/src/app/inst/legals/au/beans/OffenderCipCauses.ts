
export class OffenderCipCauses {
  private _reasonSeq: number;
  private _internalStatusSeq: number;
  private _offenderBookId: number;
  private _causeSeq: number;
  private _cipCauseCodeDom: string;
  private _cipCauseCode: string;

  get reasonSeq(): number { return this._reasonSeq; }

  set reasonSeq(preasonSeq: number) { this._reasonSeq = preasonSeq; }

  get internalStatusSeq(): number { return this._internalStatusSeq; }

  set internalStatusSeq(pinternalStatusSeq: number) { this._internalStatusSeq = pinternalStatusSeq; }

  get offenderBookId(): number { return this._offenderBookId; }

  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

  get causeSeq(): number { return this._causeSeq; }

  set causeSeq(pcauseSeq: number) { this._causeSeq = pcauseSeq; }

  get cipCauseCodeDom(): string { return this._cipCauseCodeDom; }

  set cipCauseCodeDom(pcipCauseCodeDom: string) { this._cipCauseCodeDom = pcipCauseCodeDom; }

  get cipCauseCode(): string { return this._cipCauseCode; }

  set cipCauseCode(pcipCauseCode: string) { this._cipCauseCode = pcipCauseCode; }


  toJSON(): any {
    return {
      'reasonSeq': this._reasonSeq,
      'internalStatusSeq': this._internalStatusSeq,
      'offenderBookId': this._offenderBookId,
      'causeSeq': this._causeSeq,
      'cipCauseCodeDom': this._cipCauseCodeDom,
      'cipCauseCode': this._cipCauseCode,
    };
  }
}
