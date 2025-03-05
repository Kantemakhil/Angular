import { BaseModel } from "@common/beans/BaseModel";
export class FormAccessibleForms extends BaseModel {
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _listSeq: number;
    private _destinationForm: string;
    private _sealFlag: string;
    private _originatingForm: string;
    private _checkFlag: string;
    private _tempCheckFlag: boolean;
    private _description: string;
    private _butView: string;
    private _butGo: string;
    private _bookId: number;
    private _offenderId: number;
    private _chkData: boolean;




    get butView(): string { return this._butView; }

    set butView(pbutView: string) { this._butView = pbutView; }

    get checkFlag(): string { return this._checkFlag; }

    set checkFlag(pcheckFlag: string) { this._checkFlag = pcheckFlag; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get createUserId(): string { return this._createUserId; }

    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    get destinationForm(): string { return this._destinationForm; }

    set destinationForm(pdestinationForm: string) { this._destinationForm = pdestinationForm; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get originatingForm(): string { return this._originatingForm; }

    set originatingForm(poriginatingForm: string) { this._originatingForm = poriginatingForm; }

    get butGo(): string { return this._butGo; }

    set butGo(butGo: string) { this._butGo = butGo; }

    get tempCheckFlag(): boolean { return this._tempCheckFlag; }

    set tempCheckFlag(tempCheckFlag: boolean) { this._tempCheckFlag = tempCheckFlag; }

    get bookId(): number { return this._bookId; }

    set bookId(pbookId: number) { this._bookId = pbookId; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get chkData(): boolean { return this._chkData; }

    set chkData(pchkData: boolean) { this._chkData = pchkData; }






    toJSON(): any {
        return {
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'listSeq': this._listSeq,
            'destinationForm': this._destinationForm,
            'sealFlag': this._sealFlag,
            'originatingForm': this._originatingForm,
            'checkFlag': this._checkFlag,
            'description' : this._description,
            'butView': this._butView,
            'tempCheckFlag': this._tempCheckFlag,
            'bookId': this.bookId,
            'offenderId': this._offenderId,
            'chkData': this._chkData,

        };
    }
}