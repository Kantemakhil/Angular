export class CourseSchedules {
	private _occurrenceCode: string;
	private _programDesc: string;
	private _createUserId: string;
	private _videoReferenceId: string;
	private _videoReferenceIdTemp: string;
	private _providerCode: string;
	private _modifyDatetime: Date;
	private _crsSchIdcrsSchId: string;
	private _catchUpCrsSchId: number;
	private _moduleDesc: string;
	private _weekday: string;
	private _modifyUserId: string;
	private _phaseId: string;
	private _sessionNo: number;
	private _serialVersionUID: number;
	private _catchUpSessionFlag: string;
	private _crsSchId: number;
	private _crsActyId: number;
	private _scheduleDate: Date;
	private _scheduleStatus: string;
	private _startTime: Date;
	private _details: string;
	private _sealFlag: string;
	private _serviceId: string;
	private _cancelledFlag: string;
	private _createDatetime: Date;
	private _programInstanceId: number;
	private _phaseDesc: string;
	private _endTime: Date;
	private _programId: number;
	private _providerDesc: string;
	private _reviewDate:Date;
	private _sessioncancelledFlag: boolean;
	private _catchUpSession: boolean;
	private _providerPartyClass: string;
	providerPartyId: any;
	code: any;

	
	get sessioncancelledFlag(): boolean{ return this._sessioncancelledFlag; }
	set sessioncancelledFlag(psessioncancelledFlag: boolean){ this._sessioncancelledFlag = psessioncancelledFlag ;}

	get occurrenceCode(): string{ return this._occurrenceCode; }
	set occurrenceCode(poccurrenceCode: string){ this._occurrenceCode = poccurrenceCode ;}
	get programDesc(): string{ return this._programDesc; }
	set programDesc(pprogramDesc: string){ this._programDesc = pprogramDesc ;}
	get createUserId(): string{ return this._createUserId; }
	set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
	get videoReferenceId(): string{ return this._videoReferenceId; }
	set videoReferenceId(pvideoReferenceIdTemp: string){ this._videoReferenceIdTemp = pvideoReferenceIdTemp ;}
	get videoReferenceIdTemp(): string{ return this._videoReferenceIdTemp; }
	set videoReferenceIdTemp(pvideoReferenceId: string){ this._videoReferenceId = pvideoReferenceId ;}
	get providerCode(): string{ return this._providerCode; }
	set providerCode(pproviderCode: string){ this._providerCode = pproviderCode ;}
	get modifyDatetime(): Date{ return this._modifyDatetime; }
	set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
	get crsSchIdcrsSchId(): string{ return this._crsSchIdcrsSchId; }
	set crsSchIdcrsSchId(pcrsSchIdcrsSchId: string){ this._crsSchIdcrsSchId = pcrsSchIdcrsSchId ;}
	get catchUpCrsSchId(): number{ return this._catchUpCrsSchId; }
	set catchUpCrsSchId(pcatchUpCrsSchId: number){ this._catchUpCrsSchId = pcatchUpCrsSchId ;}
	get moduleDesc(): string{ return this._moduleDesc; }
	set moduleDesc(pmoduleDesc: string){ this._moduleDesc = pmoduleDesc ;}
	get weekday(): string{ return this._weekday; }
	set weekday(pweekday: string){ this._weekday = pweekday ;}
	get modifyUserId(): string{ return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
	get phaseId(): string{ return this._phaseId; }
	set phaseId(pphaseId: string){ this._phaseId = pphaseId ;}
	get sessionNo(): number{ return this._sessionNo; }
	set sessionNo(psessionNo: number){ this._sessionNo = psessionNo ;}
	get serialVersionUID(): number{ return this._serialVersionUID; }
	set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
	get catchUpSessionFlag(): string{ return this._catchUpSessionFlag; }
	set catchUpSessionFlag(pcatchUpSessionFlag: string){ this._catchUpSessionFlag = pcatchUpSessionFlag ;}
	get crsSchId(): number{ return this._crsSchId; }
	set crsSchId(pcrsSchId: number){ this._crsSchId = pcrsSchId ;}
	get crsActyId(): number{ return this._crsActyId; }
	set crsActyId(pcrsActyId: number){ this._crsActyId = pcrsActyId ;}
	get scheduleDate(): Date{ return this._scheduleDate; }
	set scheduleDate(pscheduleDate: Date){ this._scheduleDate = pscheduleDate ;}
	get scheduleStatus(): string{ return this._scheduleStatus; }
	set scheduleStatus(pscheduleStatus: string){ this._scheduleStatus = pscheduleStatus ;}
	get startTime(): Date{ return this._startTime; }
	set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
	get details(): string{ return this._details; }
	set details(pdetails: string){ this._details = pdetails ;}
	get sealFlag(): string{ return this._sealFlag; }
	set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
	get serviceId(): string{ return this._serviceId; }
	set serviceId(pserviceId: string){ this._serviceId = pserviceId ;}
	get cancelledFlag(): string{ return this._cancelledFlag; }
	set cancelledFlag(pcancelledFlag: string){ this._cancelledFlag = pcancelledFlag ;}
	get createDatetime(): Date{ return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
	get programInstanceId(): number{ return this._programInstanceId; }
	set programInstanceId(pprogramInstanceId: number){ this._programInstanceId = pprogramInstanceId ;}
	get phaseDesc(): string{ return this._phaseDesc; }
	set phaseDesc(pphaseDesc: string){ this._phaseDesc = pphaseDesc ;}
	get endTime(): Date{ return this._endTime; }
	set endTime(pendTime: Date){ this._endTime = pendTime ;}
	get programId(): number{ return this._programId; }
	set programId(pprogramId: number){ this._programId = pprogramId ;}

	get providerDesc(): string{ return this._providerDesc; }
	set providerDesc(pproviderDesc: string){ this._providerDesc = pproviderDesc ;}

	get reviewDate(): Date { return this._reviewDate; }
	set reviewDate( reviewDate: Date ) { this._reviewDate = reviewDate; }

	get catchUpSession(): boolean { return this._catchUpSession }

set catchUpSession(pcatchUpSession: boolean) { this._catchUpSession = pcatchUpSession }

public get providerPartyClass(): string {return this._providerPartyClass;}
public set providerPartyClass(value: string) {this._providerPartyClass = value;}

toJSON(): any {
	return { 
	   'occurrenceCode': this._occurrenceCode,
	   'programDesc': this._programDesc,
	   'createUserId': this._createUserId,
	   'videoReferenceId': this._videoReferenceId,
	   'providerCode': this._providerCode,
	   'modifyDatetime': this._modifyDatetime,
	   'crsSchIdcrsSchId': this._crsSchIdcrsSchId,
	   'catchUpCrsSchId': this._catchUpCrsSchId,
	   'moduleDesc': this._moduleDesc,
	   'weekday': this._weekday,
	   'modifyUserId': this._modifyUserId,
	   'phaseId': this._phaseId,
	   'sessionNo': this._sessionNo,
	   'serialVersionUID': this._serialVersionUID,
	   'catchUpSessionFlag': this._catchUpSessionFlag,
	   'crsSchId': this._crsSchId,
	   'crsActyId': this._crsActyId,
	   'scheduleDate': this._scheduleDate,
	   'scheduleStatus': this._scheduleStatus,
	   'startTime': this._startTime,
	   'details': this._details,
	   'sealFlag': this._sealFlag,
	   'serviceId': this._serviceId,
	   'cancelledFlag': this._cancelledFlag,
	   'createDatetime': this._createDatetime,
	   'programInstanceId': this._programInstanceId,
	   'phaseDesc': this._phaseDesc,
	   'endTime': this._endTime,
	   'programId': this._programId,
	   'providerDesc': this._providerDesc,
	   'reviewDate' : this._reviewDate,
	   'sessioncancelledFlag' : this._sessioncancelledFlag,
	   'catchUpSession': this._catchUpSession,
	   'videoReferenceIdTemp':this._videoReferenceIdTemp,
	   'providerPartyClass': this._providerPartyClass

	   
		};
	}  
}