import {BaseModel} from '@commonbeans/BaseModel';

export class AccessibleFormTables extends BaseModel{
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _destinationForm: string;
    private _sealFlag: string;
    private _originatingForm: string;
    private _tableName: string;
    private _description: string;
    private _code: string;
    private _listSeq: number;
    

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime ; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID ;        }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId ; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime ; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get destinationForm(): string { return this._destinationForm; }
    set destinationForm(pdestinationForm: string) { this._destinationForm = pdestinationForm ; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag ; }
    get originatingForm(): string { return this._originatingForm; }
    set originatingForm(poriginatingForm: string) { this._originatingForm = poriginatingForm ; }
    get tableName(): string { return this._tableName; }
    set tableName(ptableName: string) { this._tableName = ptableName ; }
    get description(): string { return this._description; }
    set description(pdescription: string) { this._description = pdescription; }
    get code(): string { return this._code; }
    set code(pcode: string) { this._code = pcode; }
    get listSeq(): number { return this._listSeq; }
    set listSeq(plistSeq: number) { this._listSeq = plistSeq; }

    

toJSON(): any {
    return {
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'destinationForm': this._destinationForm,
       'sealFlag': this._sealFlag,
       'originatingForm': this._originatingForm,
       'tableName': this._tableName,
       'description' : this._description,
       'code' : this._code,
       'listSeq' : this._listSeq,
        };
    }
}
