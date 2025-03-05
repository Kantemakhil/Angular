import {BaseModel} from '@commonbeans/BaseModel';

export class AgencyIncidentAssoTostg extends BaseModel {

    private _agencyIncidentId: number;
    private _seqNo: number;
    private _stgId: number;
    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _sealFlag: string;


    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }

    get seqNo(): number { return this._seqNo; }

    set seqNo(pseqNo: number) { this._seqNo = pseqNo; }

    get stgId(): number { return this._stgId; }

    set stgId(pstgId: number) { this._stgId = pstgId; }

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
            'agencyIncidentId': this._agencyIncidentId,
            'seqNo': this._seqNo,
            'stgId': this._stgId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
        };
    }
}
