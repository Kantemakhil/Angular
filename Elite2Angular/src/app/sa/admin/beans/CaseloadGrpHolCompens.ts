import { BaseModel } from "@common/beans/BaseModel";

export class CaseloadGrpHolCompens extends BaseModel {
    private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _createUserId: string;
		 private _compensationCode: string;
		 private _modifyDatetime: Date;
		 private _caseloadId: string;
		 private _modifyUserId: string;
		 private _sealFlag: string;
		 private _workGroupId: string;
		 private _holidayEventId: number;
		 private _rowId: string;

		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get compensationCode(): string{ return this._compensationCode; }
		 set compensationCode(pcompensationCode: string){ this._compensationCode = pcompensationCode ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get caseloadId(): string{ return this._caseloadId; }
		 set caseloadId(pcaseloadId: string){ this._caseloadId = pcaseloadId ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get workGroupId(): string{ return this._workGroupId; }
		 set workGroupId(pworkGroupId: string){ this._workGroupId = pworkGroupId ;}
		 get holidayEventId(): number{ return this._holidayEventId; }
		 set holidayEventId(pholidayEventId: number){ this._holidayEventId = pholidayEventId ;}
		 get rowId(): string{ return this._rowId; }
		 set rowId(prowId: string){ this._rowId = prowId ;}

 	toJSON(): any {
 		return { 
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'createUserId': this._createUserId,
			'compensationCode': this._compensationCode,
			'modifyDatetime': this._modifyDatetime,
			'caseloadId': this._caseloadId,
			'modifyUserId': this._modifyUserId,
			'sealFlag': this._sealFlag,
			'workRroupId': this._workGroupId,
			'holidayEventId': this._holidayEventId,
			'rowId': this._rowId,
 			};
 		} 
}