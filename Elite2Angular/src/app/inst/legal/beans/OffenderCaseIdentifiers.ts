import { BaseModel } from "../../../common/beans/BaseModel";

export class OffenderCaseIdentifiers extends BaseModel{
    private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _modifyDatetime: Date;
		 private _caseId: number;
		 private _modifyUserId: string;
		 private _identifierNo: string;
		 private _identifierType: string;
		 private _sealFlag: string;
		 private _rowId: string;

		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get caseId(): number{ return this._caseId; }
		 set caseId(pcaseId: number){ this._caseId = pcaseId ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get identifierNo(): string{ return this._identifierNo; }
		 set identifierNo(pidentifierNo: string){ this._identifierNo = pidentifierNo ;}
		 get identifierType(): string{ return this._identifierType; }
		 set identifierType(pidentifierType: string){ this._identifierType = pidentifierType ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get rowId(): string{ return this._rowId; }
		 set rowId(prowId: string){ this._rowId = prowId ;}

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDatetime,
			'caseId': this._caseId,
			'modifyUserId': this._modifyUserId,
			'identifierNo': this._identifierNo,
			'identifierType': this._identifierType,
			'sealFlag': this._sealFlag,
			'rowId': this._rowId,
 			};
 		} 
}