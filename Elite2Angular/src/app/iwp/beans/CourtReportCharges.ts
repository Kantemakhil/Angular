import { BaseModel } from '@common/beans/BaseModel';

export class CourtReportCharges extends BaseModel{
    private _offenderBookId: number;
    private _matter: string;
    private _description: string;
    private _code: string;
    private _act: string;
    private _outcome: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _selectFlag: string;
    private _sealFlag: string;
    private _chargeId: number;
    private _orderId: number;
    private _select:boolean;

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get matter(): string { return this._matter; }
    set matter(pmatter: string) { this._matter = pmatter; }

    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }

    get code(): string { return this._code; }
    set code(pcode: string) { this._code = pcode; }

    get act(): string { return this._act; }
    set act(pact: string) { this._act = pact; }

    get outcome(): string { return this._outcome; }
    set outcome(poutcome: string) { this._outcome = poutcome; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get selectFlag(): string { return this._selectFlag; }
    set selectFlag(pselectFlag: string) { this._selectFlag = pselectFlag; }

    get select(): boolean { return this._select; }
    set select(pselect: boolean) { this._select = pselect; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get chargeId(): number { return this._chargeId; }
    set chargeId(pchargeId: number) { this._chargeId = pchargeId; }

    get orderId(): number { return this._orderId; }
    set orderId(porderId: number) { this._orderId = porderId; }

    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'matter': this._matter,
            'description': this._description,
            'code': this._code,
            'act': this._act,
            'outcome': this._outcome,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'selectFlag': this._selectFlag,
            'chargeId': this._chargeId,
            'orderId': this._orderId,
            'select': this._select
        };
    }

}