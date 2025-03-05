import {BaseModel} from '@commonbeans/BaseModel';

export class AgyIncInvStatements extends BaseModel {
    private _agyIiStatementId: number;
    private _agyIncInvestigationId: number;
    private _statementType: string;
    private _nameOfStatementTaker: string;
    private _dateOfStatementTaken: Date;
    private _statementDetail: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;


    get agyIiStatementId(): number { return this._agyIiStatementId; }

    set agyIiStatementId(pagyIiStatementId: number) { this._agyIiStatementId = pagyIiStatementId; }

    get agyIncInvestigationId(): number { return this._agyIncInvestigationId; }

    set agyIncInvestigationId(pagyIncInvestigationId: number) { this._agyIncInvestigationId = pagyIncInvestigationId; }

    get statementType(): string { return this._statementType; }

    set statementType(pstatementType: string) { this._statementType = pstatementType; }

    get nameOfStatementTaker(): string { return this._nameOfStatementTaker; }

    set nameOfStatementTaker(pnameOfStatementTaker: string) { this._nameOfStatementTaker = pnameOfStatementTaker; }

    get dateOfStatementTaken(): Date { return this._dateOfStatementTaken; }

    set dateOfStatementTaken(pdateOfStatementTaken: Date) { this._dateOfStatementTaken = pdateOfStatementTaken; }

    get statementDetail(): string { return this._statementDetail; }

    set statementDetail(pstatementDetail: string) { this._statementDetail = pstatementDetail; }

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

toJSON(): any {
        return {
                 'agyIiStatementId': this._agyIiStatementId,
                 'agyIncInvestigationId': this._agyIncInvestigationId,
                 'statementType': this._statementType,
                 'nameOfStatementTaker': this._nameOfStatementTaker,
                 'dateOfStatementTaken': this._dateOfStatementTaken,
                 'statementDetail': this._statementDetail,
                 'createDatetime': this._createDatetime,
                 'createUserId': this._createUserId,
                 'modifyDatetime': this._modifyDatetime,
                 'modifyUserId': this._modifyUserId,
                 'sealFlag': this._sealFlag

                  };
        }
 }
