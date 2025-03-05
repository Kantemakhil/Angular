
import {BaseModel} from '@commonbeans/BaseModel';


export class ExternalInvestigationOffenses extends BaseModel {

	private _agencyIncidentId: number;
	
	private _chargeSeq: number;
	
	private _eidSeq: number;
	
	private _externalId: string;
	
	private _contactDate: Date;
	
	private _contactTime: Date;
	
	private _extInvStatus: string;
	
	private _extInvComment: string;
	
	private _createDatetime: Date;

	private _createUserId: string;

	private _modifyDateTime: Date;
	
	private _modifyUserId: Date;

	private _sealFlag: string;	

	private _charge: string;

	private _chargeDescription: string;

	public get chargeDescription(): string {
		return this._chargeDescription;
	}
	public set chargeDescription(value: string) {
		this._chargeDescription = value;
	}

	public get charge(): string {
		return this._charge;
	}
	public set charge(value: string) {
		this._charge = value;
	}

    public get agencyIncidentId(): number {
        return this._agencyIncidentId;
    }
    public set agencyIncidentId(value: number) {
        this._agencyIncidentId = value;
    }

	public get chargeSeq(): number {
		return this._chargeSeq;
	}
	public set chargeSeq(value: number) {
		this._chargeSeq = value;
	}

	public get eidSeq(): number {
		return this._eidSeq;
	}
	public set eidSeq(value: number) {
		this._eidSeq = value;
	}
	
	public get externalId(): string {
		return this._externalId;
	}
	public set externalId(value: string) {
		this._externalId = value;
	}
	
	public get contactDate(): Date {
		return this._contactDate;
	}
	public set contactDate(value: Date) {
		this._contactDate = value;
	}

	public get contactTime(): Date {
		return this._contactTime;
	}
	public set contactTime(value: Date) {
		this._contactTime = value;
	}

	public get extInvStatus(): string {
		return this._extInvStatus;
	}
	public set extInvStatus(value: string) {
		this._extInvStatus = value;
	}

	public get extInvComment(): string {
		return this._extInvComment;
	}
	public set extInvComment(value: string) {
		this._extInvComment = value;
	}
	
	public get createDatetime(): Date {
		return this._createDatetime;
	}
	public set createDatetime(value: Date) {
		this._createDatetime = value;
	}

	public get createUserId(): string {
		return this._createUserId;
	}
	public set createUserId(value: string) {
		this._createUserId = value;
	}

	public get modifyDateTime(): Date {
		return this._modifyDateTime;
	}
	public set modifyDateTime(value: Date) {
		this._modifyDateTime = value;
	}

	public get modifyUserId(): Date {
		return this._modifyUserId;
	}
	public set modifyUserId(value: Date) {
		this._modifyUserId = value;
	}

	public get sealFlag(): string {
		return this._sealFlag;
	}
	public set sealFlag(value: string) {
		this._sealFlag = value;
	}
	toJSON(): any {
        return {
			'agencyIncidentId':this._agencyIncidentId,
			'chargeSeq' : this._chargeSeq,
			'eidSeq': this._eidSeq,
			'externalId' : this._externalId,
			'contactDate' : this._contactDate,
			'contactTime' : this._contactTime,
			'extInvStatus' : this._extInvStatus,
			'extInvComment' : this._extInvComment,
			'createDatetime' : this._createDatetime,
			'createUserId' : this._createUserId,
			'modifyDateTime' : this._modifyDateTime,
			'modifyUserId' : this._modifyUserId,
			'sealFlag' : this._sealFlag,
			'charge' : this._charge,
			'chargeDescription' : this._chargeDescription

		};
	}

}