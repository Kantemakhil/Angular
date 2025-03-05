import {BaseModel} from '@commonbeans/BaseModel';

export class SecurityThreatGroups extends BaseModel {

    private _stgId: number;
    private _stgLevel: string;
    private _stgCode: string;
    private _description: string;
    private _parentStgId: number;
    private _listSeq: number;
    private _effectiveDate: Date;
    private _historyText: string;
    private _activeFlag: string;
    private _createUserId: string;
    private _createDatetime: Date;
    private _modifyUserId: string;
    private _modifyDatetime: Date;
    private _sealFlag: string;
    private _butDetail: string;
    private _butDetail1: string;
    private _butRealign: string;
    private _butDetail2: string;
    private _butRealign2: string;
    private _lpValue: number;
    private _lpGang: number;
    private _lpSet: number;
    private _description1: string;

    get lpValue(): number { return this._lpValue; }

    set lpValue(plpValue: number) { this._lpValue = plpValue; }

    get lpGang(): number { return this._lpGang; }

    set lpGang(plpGang: number) { this._lpGang = plpGang; }

    get lpSet(): number { return this._lpSet; }

    set lpSet(plpSet: number) { this._lpSet = plpSet; }


    get butDetail1(): string { return this._butDetail1; }

    set butDetail1(pbutDetail1: string) { this._butDetail1 = pbutDetail1; }

    get butRealign(): string { return this._butRealign; }

    set butRealign(pbutRealign: string) { this._butRealign = pbutRealign; }

    get butDetail2(): string { return this._butDetail2; }

    set butDetail2(pbutDetail2: string) { this._butDetail2 = pbutDetail2; }

    get butRealign2(): string { return this._butRealign2; }

    set butRealign2(pbutRealign2: string) { this._butRealign2 = pbutRealign2; }

    get butDetail(): string { return this._butDetail; }

    set butDetail(pbutDetail: string) { this._butDetail = pbutDetail; }


    get stgId(): number { return this._stgId; }

    set stgId(pstgId: number) { this._stgId = pstgId; }

     get stgLevel(): string { return this._stgLevel; }

    set stgLevel(pstgLevel: string) { this._stgLevel = pstgLevel; }

     get stgCode(): string { return this._stgCode; }

    set stgCode(pstgCode: string) { this._stgCode = pstgCode; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get parentStgId(): number { return this._parentStgId; }

    set parentStgId(pparentStgId: number) { this._parentStgId = pparentStgId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get effectiveDate(): Date { return this._effectiveDate; }

    set effectiveDate(peffectiveDate: Date) { this._effectiveDate = peffectiveDate; }

    get historyText(): string { return this._historyText; }

    set historyText(phistoryText: string) { this._historyText = phistoryText; }

     get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

     get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get description1(): string { return this._description1; }

    set description1(pdescription: string) { this._description1 = pdescription; }

    toJSON(): any {
        return {
            'stgId': this._stgId,
             'stgLevel': this._stgLevel,
             'stgCode': this._stgCode,
             'description': this._description,
             'parentStgId': this._parentStgId,
             'listSeq': this._listSeq,
             'effectiveDate': this._effectiveDate,
             'historyText': this._historyText,
             'activeFlag': this._activeFlag,
             'createUserId': this._createUserId,
             'createDatetime': this._createDatetime,
             'modifyUserId': this._modifyUserId,
             'modifyDatetime' : this._modifyDatetime,
             'sealFlag' : this._sealFlag,
             'butDetail': this._butDetail,
             'butDetail1': this.butDetail1,
             'butRealign': this._butRealign,
             'butDetail2': this._butDetail2,
             'butRealign2': this._butRealign2,
             'description1': this._description1

        };
    }
}

