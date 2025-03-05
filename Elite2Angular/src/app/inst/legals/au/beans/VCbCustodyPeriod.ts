import { BaseModel } from "@common/beans/BaseModel";

export class VCbCustodyPeriod extends BaseModel {


       private _daysAfterEffDate: number;
       private _serialVersionUID: number;
       private _admissionDate: Date;
       private _offenderBookId: number;
       private _releaseDate: Date;
       private _custodyPeriodSeq: number;
       private _offenderId: number;
       private _addittionalDays: number;
       private _offBalCalcId: number;
       private _effectiveDate: Date;
       private _description: string;
       private _code: string;


       get offBalCalcId(): number { return this._offBalCalcId; }
       set offBalCalcId(poffBalCalcId: number) { this._offBalCalcId = poffBalCalcId; }
       get addittionalDays(): number { return this._addittionalDays; }
       set addittionalDays(paddittionalDays: number) { this._addittionalDays = paddittionalDays; }
       get daysAfterEffDate(): number { return this._daysAfterEffDate; }
       set daysAfterEffDate(pdaysAfterEffDate: number) { this._daysAfterEffDate = pdaysAfterEffDate; }
       get serialVersionUID(): number { return this._serialVersionUID; }
       set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
       get admissionDate(): Date { return this._admissionDate; }
       set admissionDate(padmissionDate: Date) { this._admissionDate = padmissionDate; }
       get offenderBookId(): number { return this._offenderBookId; }
       set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
       get releaseDate(): Date { return this._releaseDate; }
       set releaseDate(preleaseDate: Date) { this._releaseDate = preleaseDate; }
       get custodyPeriodSeq(): number { return this._custodyPeriodSeq; }
       set custodyPeriodSeq(pcustodyPeriodSeq: number) { this._custodyPeriodSeq = pcustodyPeriodSeq; }
       get offenderId(): number { return this._offenderId; }
       set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
       get effectiveDate(): Date { return this._effectiveDate; }
       set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }
       get code(): string { return this._code; }
       set code(pcode: string) { this._code = pcode; }
       get description(): string { return this._description; }
       set description(pdescription: string) { this._description = pdescription; }

       toJSON(): any {
              return {
                     'daysAfterEffDate': this._daysAfterEffDate,
                     'serialVersionUID': this._serialVersionUID,
                     'admissionDate': this._admissionDate,
                     'offenderBookId': this._offenderBookId,
                     'releaseDate': this._releaseDate,
                     'custodyPeriodSeq': this._custodyPeriodSeq,
                     'offenderId': this._offenderId,
                     'offBalCalcId': this._offBalCalcId,
                     'effectiveDate': this._effectiveDate,
                     'code': this._code,
                     'description': this._description,
              };
       }

}