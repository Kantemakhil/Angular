import { BaseModel } from '@commonbeans/BaseModel'; 
export class OffenderNotCompletions extends BaseModel {
		 private _notifyMethod: string;
		 private _createUserId: string;
		 private _notiAgencyPartyCode: string;
		 private _notiSeq: number;
		 private _modifyDatetime: number;
		 private _offenderBookId: number;
		 private _modifyUserId: string;
		 private _OffenderPendNotifications: number;
		 private _notiMoveSeq: number;
		 private _notiCorpId: number;
		 private _commentText: string;
		 private _createDatetime: number;
		 private _serialVersionUID: number;
		 private _completionDate: number;
		 private _sealFlag: string;
		 private _notiPersonId: number;
		 private _status: string;

		 get notifyMethod(): string{ return  this._notifyMethod }

		 set notifyMethod(pnotifyMethod: string){ this._notifyMethod = pnotifyMethod }

		 get createUserId(): string{ return  this._createUserId }

		 set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId }

		 get notiAgencyPartyCode(): string{ return  this._notiAgencyPartyCode }

		 set notiAgencyPartyCode(pnotiAgencyPartyCode: string){ this._notiAgencyPartyCode = pnotiAgencyPartyCode }

		 get notiSeq(): number{ return  this._notiSeq }

		 set notiSeq(pnotiSeq: number){ this._notiSeq = pnotiSeq }

		 get modifyDatetime(): number{ return  this._modifyDatetime }

		 set modifyDatetime(pmodifyDatetime: number){ this._modifyDatetime = pmodifyDatetime }

		 get offenderBookId(): number{ return  this._offenderBookId }

		 set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId }

		 get modifyUserId(): string{ return  this._modifyUserId }

		 set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId }

		 get OffenderPendNotifications(): number{ return  this._OffenderPendNotifications }

		 set OffenderPendNotifications(pOffenderPendNotifications: number){ this._OffenderPendNotifications = pOffenderPendNotifications }

		 get notiMoveSeq(): number{ return  this._notiMoveSeq }

		 set notiMoveSeq(pnotiMoveSeq: number){ this._notiMoveSeq = pnotiMoveSeq }

		 get notiCorpId(): number{ return  this._notiCorpId }

		 set notiCorpId(pnotiCorpId: number){ this._notiCorpId = pnotiCorpId }

		 get commentText(): string{ return  this._commentText }

		 set commentText(pcommentText: string){ this._commentText = pcommentText }

		 get createDatetime(): number{ return  this._createDatetime }

		 set createDatetime(pcreateDatetime: number){ this._createDatetime = pcreateDatetime }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get completionDate(): number{ return  this._completionDate }

		 set completionDate(pcompletionDate: number){ this._completionDate = pcompletionDate }

		 get sealFlag(): string{ return  this._sealFlag }

		 set sealFlag(psealFlag: string){ this._sealFlag = psealFlag }

		 get notiPersonId(): number{ return  this._notiPersonId }

		 set notiPersonId(pnotiPersonId: number){ this._notiPersonId = pnotiPersonId }

		 get status(): string{ return  this._status }

		 set status(pstatus: string){ this._status = pstatus }


 	toJSON(): any {
 		return { 
			'notifyMethod': this._notifyMethod,
			'createUserId': this._createUserId,
			'notiAgencyPartyCode': this._notiAgencyPartyCode,
			'notiSeq': this._notiSeq,
			'modifyDatetime': this._modifyDatetime,
			'offenderBookId': this._offenderBookId,
			'modifyUserId': this._modifyUserId,
			'OffenderPendNotifications': this._OffenderPendNotifications,
			'notiMoveSeq': this._notiMoveSeq,
			'notiCorpId': this._notiCorpId,
			'commentText': this._commentText,
			'createDatetime': this._createDatetime,
			'serialVersionUID': this._serialVersionUID,
			'completionDate': this._completionDate,
			'sealFlag': this._sealFlag,
			'notiPersonId': this._notiPersonId,
			'status': this._status,
 			};
 		}  
 }