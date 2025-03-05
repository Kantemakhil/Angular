import {BaseModel} from './BaseModel';

export class OffenderPhysicalAttributes extends BaseModel {

  private _createDatetime: Date;
  private _createUserId: string;
  private _heightCm: number;
  private _heightFt: number;
  private _heightIn: number;
  private _modifyDatetime: Date;
  private _modifyUserId: string;
  private _sealFlag: string;
  private _weightKg: number;
  private _weightLbs: number;
  private _offenderBookId: number;
  private _attributeSeq: number;

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

    get heightCm(): number { return this._heightCm; }

    set heightCm(pheightCm: number){ this._heightCm = pheightCm; }

    get heightFt(): number { return this._heightFt; }

    set heightFt(pheightFt: number){ this._heightFt = pheightFt; }

    get heightIn(): number { return this._heightIn; }

    set heightIn(pheightIn: number){ this._heightIn = pheightIn; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

    get weightKg(): number { return this._weightKg; }

    set weightKg(pweightKg: number){ this._weightKg = pweightKg; }

    get weightLbs(): number { return this._weightLbs; }

    set weightLbs(pweightLbs: number){ this._weightLbs = pweightLbs; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId; }

    get attributeSeq(): number { return this._attributeSeq; }

    set attributeSeq(pattributeSeq: number){ this._attributeSeq = pattributeSeq; }

    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'heightCm': this._heightCm,
            'heightFt': this._heightFt,
            'heightIn': this._heightIn,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'weightKg': this._weightKg,
            'weightLbs': this._weightLbs,
            'offenderBookId': this._offenderBookId,
            'attributeSeq': this._attributeSeq
        };
    }
}
