import {BaseModel} from '@commonbeans/BaseModel';

	export class OffenderPptyConTxns extends BaseModel {
		 private _createUserId: string;
		 private _trnToAgyLocId: string;
		 private _modifyUserId: string;
		 private _propertyContainerId: number;
		 private _trnFromAgyLocId: string;
		 private _commentText: string;
		 private _createDateTime: Date;
		 private _serialVersionUID: number;
		 private _sealMark: string;
		 private _inserted: number;
		 private _modifyDateTime: Date;
		 private _agyLocId: string;
		 private _actionCode: string;
		 private _sealFlag: string;
		 private _propertyContainerTxnId: number;
		 private _internalLocationId: number;
		 private _createDate: Date;
         private  _nbtAgyLocDesc : string;
         private  _nbtFromAgyDesc : string;
         private  _nbtToAgyDesc : string;
         private _nbtCreateDate :Date;
		 private _actionReason: string;
		
		 get actionReason(): string { return this._actionReason; }
	 
		 set actionReason( pactionReason: string ) { this._actionReason = pactionReason; }
		 get createUserId(): string{ return  this._createUserId; }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

		 get trnToAgyLocId(): string{ return  this._trnToAgyLocId; }

		 set trnToAgyLocId(ptrnToAgyLocId: string){ this._trnToAgyLocId = ptrnToAgyLocId; }

		 get modifyUserId(): string{ return  this._modifyUserId; }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

		 get propertyContainerId(): number{ return  this._propertyContainerId; }

		 set propertyContainerId(ppropertyContainerId: number){ this._propertyContainerId = ppropertyContainerId; }

		 get trnFromAgyLocId(): string{ return  this._trnFromAgyLocId; }

		 set trnFromAgyLocId(ptrnFromAgyLocId: string){ this._trnFromAgyLocId = ptrnFromAgyLocId; }

		 get commentText(): string{ return  this._commentText; }

		 set commentText(pcommentText: string){ this._commentText = pcommentText; }

		 get createDateTime(): Date{ return  this._createDateTime; }

		 set createDateTime(pcreateDateTime: Date){ this._createDateTime = pcreateDateTime; }

		 get serialVersionUID(): number{ return  this._serialVersionUID; }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID; }

		 get sealMark(): string{ return  this._sealMark; }

		 set sealMark(psealMark: string){ this._sealMark = psealMark; }

		 get inserted(): number{ return  this._inserted; }

		 set inserted(pinserted: number){ this._inserted = pinserted; }

		 get modifyDateTime(): Date{ return  this._modifyDateTime; }

		 set modifyDateTime(pmodifyDateTime: Date){ this._modifyDateTime = pmodifyDateTime; }

		 get agyLocId(): string{ return  this._agyLocId; }

		 set agyLocId(pagyLocId: string){ this._agyLocId = pagyLocId; }

		 get actionCode(): string{ return  this._actionCode; }

		 set actionCode(pactionCode: string){ this._actionCode = pactionCode; }

		 get sealFlag(): string{ return  this._sealFlag; }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

		 get propertyContainerTxnId(): number{ return  this._propertyContainerTxnId; }

		 set propertyContainerTxnId(ppropertyContainerTxnId: number){ this._propertyContainerTxnId = ppropertyContainerTxnId; }

		 get internalLocationId(): number{ return  this._internalLocationId; }

		 set internalLocationId(pinternalLocationId: number){ this._internalLocationId = pinternalLocationId; }

		 get createDate(): Date{ return  this._createDate; }

		 set createDate(pcreateDate: Date){ this._createDate = pcreateDate; }
 
         get  nbtAgyLocDesc(): string{ return  this._nbtAgyLocDesc; }

         set nbtAgyLocDesc(pnbtAgyLocDesc: string){ this._nbtAgyLocDesc = pnbtAgyLocDesc; }
        
         get  nbtFromAgyDesc(): string{ return  this._nbtFromAgyDesc; }

         set nbtFromAgyDesc(pnbtFromAgyDesc: string){ this._nbtFromAgyDesc = pnbtFromAgyDesc; }
        
         get  nbtToAgyDesc(): string{ return  this._nbtToAgyDesc; }

         set nbtToAgyDesc(pnbtToAgyDesc: string){ this._nbtToAgyDesc = pnbtToAgyDesc; }
        
        get nbtCreateDate(): Date{ return  this._nbtCreateDate; }

         set nbtCreateDate(pnbtCreateDate: Date){ this._nbtCreateDate = pnbtCreateDate; }

 	toJSON(): any {
 		return { 
			'createUserId': this._createUserId,
			'trnToAgyLocId': this._trnToAgyLocId,
			'modifyUserId': this._modifyUserId,
			'propertyContainerId': this._propertyContainerId,
			'trnFromAgyLocId': this._trnFromAgyLocId,
			'commentText': this._commentText,
			'createDateTime': this._createDateTime,
			'serialVersionUID': this._serialVersionUID,
			'sealMark': this._sealMark,
			'inserted': this._inserted,
			'modifyDateTime': this._modifyDateTime,
			'agyLocId': this._agyLocId,
			'actionCode': this._actionCode,
			'sealFlag': this._sealFlag,
			'propertyContainerTxnId': this._propertyContainerTxnId,
			'internalLocationId': this._internalLocationId,
			'createDate': this._createDate,
            'nbtAgyLocDesc': this._nbtAgyLocDesc,
            'nbtFromAgyDesc': this._nbtFromAgyDesc,
            'nbtToAgyDesc': this._nbtToAgyDesc,
			'nbtCreateDate': this._nbtCreateDate,
			'actionReason':this._actionReason
 			};
 		}  
 }