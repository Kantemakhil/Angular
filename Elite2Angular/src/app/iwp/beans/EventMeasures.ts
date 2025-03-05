import { BaseModel } from "@common/beans/BaseModel";

export class EventMeasures extends BaseModel{
    private _createUserId: string;
		 private _eventSubType: string;
		 private _modifyDatetime: Date;
		 private _modifyUserId: string;
		 private _eventType: string;
		 private _eventMeasureId: number;
		 private _expiryDate: Date;
		 private _createDatetime: Date;
		 private _serialVersionUID: number;
		 private _listSeq: number;
		 private _measuresStandardFlag: string;
		 private _updateAllowedFlag: string;
		 private _sealFlag: string;
		 private _activeFlag: string;
		 private _createDate: Date;
		 private _emailFlag: string;
		 private _smsFlag: string;
		 private _nonAssociationFlag: string;
		 private _sanctionsFlag: string;
		 

		 get createUserId(): string{ return this._createUserId; }
		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
		 get eventSubType(): string{ return this._eventSubType; }
		 set eventSubType(peventSubType: string){ this._eventSubType = peventSubType ;}
		 get modifyDatetime(): Date{ return this._modifyDatetime; }
		 set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
		 get modifyUserId(): string{ return this._modifyUserId; }
		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
		 get eventType(): string{ return this._eventType; }
		 set eventType(peventType: string){ this._eventType = peventType ;}
		 get eventMeasureId(): number{ return this._eventMeasureId; }
		 set eventMeasureId(peventMeasureId: number){ this._eventMeasureId = peventMeasureId ;}
		 get expiryDate(): Date{ return this._expiryDate; }
		 set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
		 get createDatetime(): Date{ return this._createDatetime; }
		 set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get listSeq(): number{ return this._listSeq; }
		 set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}
		 get measuresStandardFlag(): string{ return this._measuresStandardFlag; }
		 set measuresStandardFlag(pmeasuresStandardFlag: string){ this._measuresStandardFlag = pmeasuresStandardFlag ;}
		 get updateAllowedFlag(): string{ return this._updateAllowedFlag; }
		 set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag ;}
		 get sealFlag(): string{ return this._sealFlag; }
		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
		 get activeFlag(): string{ return this._activeFlag; }
		 set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
		 get createDate(): Date{ return this._createDate; }
		 set createDate(pcreateDate: Date){ this._createDate = pcreateDate ;}
		 get emailFlag(): string{ return this._emailFlag; }
		 set emailFlag(pemailFlag: string){ this._emailFlag = pemailFlag ;}
		 get smsFlag(): string{ return this._smsFlag; }
		 set smsFlag(psmsFlag: string){ this._smsFlag = psmsFlag ;}
		 get nonAssociationFlag(): string{ return this._nonAssociationFlag; }
		 set nonAssociationFlag(pnonAssociationFlag: string){ this._nonAssociationFlag = pnonAssociationFlag ;}

		 get sanctionsFlag(): string{ return this._sanctionsFlag; }
		 set sanctionsFlag(psanctionsFlag: string){ this._sanctionsFlag = psanctionsFlag ;}

 	toJSON(): any {
 		return { 
			'createUserId': this._createUserId,
			'eventSubType': this._eventSubType,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'eventType': this._eventType,
			'eventMeasureId': this._eventMeasureId,
			'expiryDate': this._expiryDate,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'listSeq': this._listSeq,
			'measuresStandardFlag': this._measuresStandardFlag,
			'updateAllowedFlag': this._updateAllowedFlag,
			'sealFlag': this._sealFlag,
			'activeFlag': this._activeFlag,
			'createDate': this._createDate,
			'smsFlag': this._smsFlag,
			'emailFlag': this._emailFlag,
			'nonAssociationFlag': this._nonAssociationFlag,
			'sanctionsFlag': this._sanctionsFlag
 			};
 		} 
}