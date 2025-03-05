import { BaseModel } from '@commonbeans/BaseModel'; 
export class OffenderPendNotifications extends BaseModel {
		 private _moveScheduleFlag: string;
		 private _createUserId: string;
		 private _notiSeq: number;
		 private _modifyDatetime: number;
		 private _movementReasonCode: string;
		 private _offenderBookId: number;
		 private _modifyUserId: string;
		 private _movementDate: number;
		 private _notiMoveSeq: number;
		 private _createDatetime: number;
		 private _serialVersionUID: number;
		 private _movementType: string;
		 private _sealFlag: string;
		 private _OffenderNotCompletions: number;
		 private _scheduleId: number;

		 get moveScheduleFlag(): string{ return  this._moveScheduleFlag }

		 set moveScheduleFlag(pmoveScheduleFlag: string){ this._moveScheduleFlag = pmoveScheduleFlag }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get notiSeq(): number{ return  this._notiSeq }

		 set notiSeq(pnotiSeq: number){ this._notiSeq = pnotiSeq }

		 get modifyDatetime(): number{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: number){ this._modifyDatetime = pmodifyDatetime }

		 get movementReasonCode(): string{ return  this._movementReasonCode }

		 set movementReasonCode(pmovementReasonCode: string){ this._movementReasonCode = pmovementReasonCode }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get movementDate(): number{ return  this._movementDate }

		 set movementDate(pmovementDate: number){ this._movementDate = pmovementDate }

		 get notiMoveSeq(): number{ return  this._notiMoveSeq }

		 set notiMoveSeq(pnotiMoveSeq: number){ this._notiMoveSeq = pnotiMoveSeq }

		 get createDatetime(): number{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: number){ this._createDatetime = pcreateDatetime }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get movementType(): string{ return  this._movementType }

		 set movementType(pmovementType: string){ this._movementType = pmovementType }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

		 get OffenderNotCompletions(): number{ return  this._OffenderNotCompletions }

		 set OffenderNotCompletions(pOffenderNotCompletions: number){ this._OffenderNotCompletions = pOffenderNotCompletions }

		 get scheduleId(): number{ return  this._scheduleId }

		 set scheduleId(pscheduleId: number){ this._scheduleId = pscheduleId }


 	toJSON(): any {
 		return { 
			'moveScheduleFlag': this._moveScheduleFlag,
			'createUserId': this._createUserId,
			'notiSeq': this._notiSeq,
			'modifyDatetime': this._modifyDatetime,
			'movementReasonCode': this._movementReasonCode,
			'offenderBookId': this._offenderBookId,
			'modifyUserId': this._modifyUserId,
			'movementDate': this._movementDate,
			'notiMoveSeq': this._notiMoveSeq,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'movementType': this._movementType,
			'sealFlag': this._sealFlag,
			'OffenderNotCompletions': this._OffenderNotCompletions,
			'scheduleId': this._scheduleId,
 			};
 		}  
 }