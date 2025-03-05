import {BaseModel} from '@commonbeans/BaseModel';

export class Areas extends BaseModel {
        private _createUserId: string;
        private _code: string;
        private _modifyUserId: string;
        private _description: string;
        private _createDateTime: Date;
        private _expiryDate: Date;
        private _serialVersionUID: number;
        private _areaCode: string;
        private _modifyDateTime: string;
        private _areaType: string;
        private _areaClass: string;
        private _listSeq: number;
        private _parentAreaCode: string;
        private _sealFlag: string;
        private _activeFlag: string;
        private _returnValue: number;
        private _serverCode: number;
        private _rowId: string;
        get returnValue(): number{ return this._returnValue; }
        set returnValue(preturnValue: number){ this._returnValue = preturnValue;}
        get serverCode(): number{ return this._serverCode; }
        set serverCode(pserverCode: number){ this._serverCode = pserverCode;}
        get createUserId(): string{ return this._createUserId; }
        set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
        get code(): string{ return this._code; }
        set code(pcode: string){ this._code = pcode ;}
        get modifyUserId(): string{ return this._modifyUserId; }
        set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
        get description(): string{ return this._description; }
        set description(pdescription: string){ this._description = pdescription ;}
        get createDateTime(): Date{ return this._createDateTime; }
        set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime ;}
        get expiryDate(): Date{ return this._expiryDate; }
        set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
        get serialVersionUID(): number{ return this._serialVersionUID; }
        set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
        get areaCode(): string{ return this._areaCode; }
        set areaCode(pareaCode: string){ this._areaCode = pareaCode ;}
        get modifyDateTime(): string{ return this._modifyDateTime; }
        set modifyDateTime(pmodifyDateTime: string){ this._modifyDateTime = pmodifyDateTime ;}
        get areaType(): string{ return this._areaType; }
        set areaType(pareaType: string){ this._areaType = pareaType ;}
        get areaClass(): string{ return this._areaClass; }
        set areaClass(pareaClass: string){ this._areaClass = pareaClass ;}
        get listSeq(): number{ return this._listSeq; }
        set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
        get parentAreaCode(): string{ return this._parentAreaCode; }
        set parentAreaCode(pparentAreaCode: string){ this._parentAreaCode = pparentAreaCode ;}
        get sealFlag(): string{ return this._sealFlag; }
        set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
        get activeFlag(): string{ return this._activeFlag; }
        set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
        get rowId(): string { return this._rowId; }
	    set rowId(prowId: string) { this._rowId = prowId; }

    toJSON(): any {
        return { 
           'createUserId': this._createUserId,
           'code': this._code,
           'modifyUserId': this._modifyUserId,
           'description': this._description,
           'createDateTime': this._createDateTime,
           'expiryDate': this._expiryDate,
           'serialVersionUID': this._serialVersionUID,
           'areaCode': this._areaCode,
           'modifyDateTime': this._modifyDateTime,
           'areaType': this._areaType,
           'areaClass': this._areaClass,
           'listSeq': this._listSeq,
           'parentAreaCode': this._parentAreaCode,
           'sealFlag': this._sealFlag,
           'activeFlag': this._activeFlag,
           'returnValue': this._returnValue,
           'serverCode': this._serverCode,
           'rowId': this._rowId,
            };
        }
}


