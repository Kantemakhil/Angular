import { BaseModel } from '@commonbeans/BaseModel';

export class CaseloadAdmOtherProfiles extends BaseModel {

    private _agyLocId: string;
    private _description: string;
    private _dspDescription: string;
    private _code: string;
    private _livUnitId: string;
    private _caseloadId: string;
    private _youngOffenderAge: number;
    private _messageNumber: number;
    private _applnCode: string;
    private _trustAccountFlag: string;
    private _livingUnitId: number;
    private _modifyUserId: string;
    private _modifyDatetime: Date;
    private _createDatetime: Date;
    private _createUserId: string;
    private _sealFlag: string;
    private _livUnitCode: string;
    private _messNum: string;
    private _messNumTemp: string;
    private _trustAccountBool: boolean;
    private _livingUnitDesc: string;
    private _rowId: string;
    private _avalibleBedsInLocation: number;

    public get avalibleBedsInLocation(): number {
        return this._avalibleBedsInLocation;
    }
    public set avalibleBedsInLocation(value: number) {
        this._avalibleBedsInLocation = value;
    }

    get messNumTemp(): string { return this._messNumTemp; }
    set messNumTemp(pmessNumTemp: string) { this._messNumTemp = pmessNumTemp; }

    get rowId(): string { return this._rowId; }
    set rowId(prowId: string) { this._rowId = prowId; }

    get livingUnitDesc(): string { return this._livingUnitDesc; }
    set livingUnitDesc(plivingUnitDesc: string) { this._livingUnitDesc = plivingUnitDesc; }

    get trustAccountBool(): boolean { return this._trustAccountBool; }
    set trustAccountBool(ptrustAccountBool: boolean) { this._trustAccountBool = ptrustAccountBool; }

    get messNum(): string { return this._messNum; }
    set messNum(pmessNum: string) { this._messNum = pmessNum; }

    get livUnitCode(): string { return this._livUnitCode; }
    set livUnitCode(plivUnitCode: string) { this._livUnitCode = plivUnitCode; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get livingUnitId(): number { return this._livingUnitId; }
    set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }

    get trustAccountFlag(): string { return this._trustAccountFlag; }
    set trustAccountFlag(ptrustAccountFlag: string) { this._trustAccountFlag = ptrustAccountFlag; }

    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get youngOffenderAge(): number { return this._youngOffenderAge; }
    set youngOffenderAge(pyoungOffenderAge: number) { this._youngOffenderAge = pyoungOffenderAge; }

    get messageNumber(): number { return this._messageNumber; }
    set messageNumber(pmessageNumber: number) { this._messageNumber = pmessageNumber; }

    get applnCode(): string { return this._applnCode; }
    set applnCode(papplnCode: string) { this._applnCode = papplnCode; }

    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

    get code(): string { return this._code; }

    set code(pcode: string) { this._code = pcode; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get dspDescription(): string { return this._dspDescription; }

    set dspDescription(pdspDescription: string) { this._dspDescription = pdspDescription; }

    get livUnitId(): string { return this._livUnitId; }

    set livUnitId(plivUnitId: string) { this._livUnitId = plivUnitId; }

    toJSON(): any {
        return {
            'agyLocId': this._agyLocId,
            'code': this._code,
            'description': this._description,
            'dspDescription': this._dspDescription,
            'livUnitId': this._livUnitId,
            'caseloadId': this._caseloadId,
            'youngOffenderAge': this._youngOffenderAge,
            'messageNumber': this._messageNumber,
            'applnCode': this._applnCode,
            'trustAccountFlag': this._trustAccountFlag,
            'livingUnitId': this._livingUnitId,
            'modifyUserId': this._modifyUserId,
            'modifyDatetime': this._modifyDatetime,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'sealFlag': this._sealFlag,
            'livUnitCode': this._livUnitCode,
            'messNum': this.messNum,
            'trustAccountBool': this._trustAccountBool,
            'livingUnitDesc': this._livingUnitDesc,
            'rowId': this._rowId,
            'messNumTemp': this._messNumTemp,
            'avalibleBedsInLocation':this._avalibleBedsInLocation
        };
    }
}
