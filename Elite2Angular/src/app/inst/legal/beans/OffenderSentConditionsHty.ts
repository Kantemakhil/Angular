
import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderSentConditionsHty extends BaseModel {
	private _statusDate: Date;
	private _createUserId: string;
	private _offenderBookId: number;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
	private _description: string;
	private _commConditionCode: string;
	private _sentenceSeq: number;
	private _commConditionType: string;
	private _expiryDate: Date;
	private _createDatetime: Date;
	private _sentenceEventId: number;
	private _conditionStatus: string;
	private _provision: string;
	private _longCommentText: string;
	private _startDate: Date;
	private _status: string;

	get statusDate(): Date{ return this._statusDate; }
	set statusDate(pstatusDate: Date){ this._statusDate = pstatusDate ;}
	get createUserId(): string{ return this._createUserId; }
	set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
	get offenderBookId(): number{ return this._offenderBookId; }
	set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
	get modifyDatetime(): Date{ return this._modifyDatetime; }
	set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
	get modifyUserId(): string{ return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
	get description(): string{ return this._description; }
	set description(pdescription: string){ this._description = pdescription ;}
	get commConditionCode(): string{ return this._commConditionCode; }
	set commConditionCode(pcommConditionCode: string){ this._commConditionCode = pcommConditionCode ;}
	get sentenceSeq(): number{ return this._sentenceSeq; }
	set sentenceSeq(psentenceSeq: number){ this._sentenceSeq = psentenceSeq ;}
	get commConditionType(): string{ return this._commConditionType; }
	set commConditionType(pcommConditionType: string){ this._commConditionType = pcommConditionType ;}
	get expiryDate(): Date{ return this._expiryDate; }
	set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
	get createDatetime(): Date{ return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
	get sentenceEventId(): number{ return this._sentenceEventId; }
	set sentenceEventId(psentenceEventId: number){ this._sentenceEventId = psentenceEventId ;}
	get conditionStatus(): string{ return this._conditionStatus; }
	set conditionStatus(pconditionStatus: string){ this._conditionStatus = pconditionStatus ;}
	get provision(): string{ return this._provision; }
	set provision(pprovision: string){ this._provision = pprovision ;}
	get longCommentText(): string{ return this._longCommentText; }
	set longCommentText(plongCommentText: string){ this._longCommentText = plongCommentText ;}
	get startDate(): Date{ return this._startDate; }
	set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
	get status(): string{ return this._status; }
	set status(pstatus: string){ this._status = pstatus ;}

toJSON(): any {
	return { 
	   'statusDate': this._statusDate,
	   'createUserId': this._createUserId,
	   'offenderBookId': this._offenderBookId,
	   'modifyDatetime': this._modifyDatetime,
	   'modifyUserId': this._modifyUserId,
	   'description': this._description,
	   'commConditionCode': this._commConditionCode,
	   'sentenceSeq': this._sentenceSeq,
	   'commConditionType': this._commConditionType,
	   'expiryDate': this._expiryDate,
	   'createDatetime': this._createDatetime,
	   'sentenceEventId': this._sentenceEventId,
	   'conditionStatus': this._conditionStatus,
	   'provision': this._provision,
	   'longCommentText': this._longCommentText,
	   'startDate': this._startDate,
	   'status': this._status,
		};
	} 

}
