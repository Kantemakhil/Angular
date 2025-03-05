export class VAcpSchedules {
    private _programDesc: string;
    private _moduleInstanceDesc: string;
    private _programInstanceDesc: string;
    private _sessionNo: number;
    private _internalLocationDesc: string;
    private _phaseDescription: string;
    private _serialVersionUID: number;
    private _phaseProviderPartyId: number;
    private _catchUpSessionFlag: boolean;
    private _crsSchId: number;
    private _scheduleDate: Date;
    private _moduleInstanceId: number;
    private _scheduleStatus: string;
    private _scheduleStatusTemp: string;
    private _scheduleStatusFlag: boolean;
    private _startTime: Date;
    private _phaseCode: string;
    private _phaseProviderName: string;
    private _programCode: string;
    private _moduleListSeq: number;
    private _phaseInstanceCode: string;
    private _phaseSessionLength: number;
    private _programInstanceCode: string;
    private _phaseProviderPartyClass: string;
    private _phaseInstanceId: number;
    private _phaseInstanceDesc: string;
    private _programInstanceId: number;
    private _phaseProviderPartyCode: string;
    private _weekDay: string;
   
    public get scheduleStatusFlag(): boolean {
        return this._scheduleStatusFlag;
    }
    public set scheduleStatusFlag(value: boolean) {
        this._scheduleStatusFlag = value;
    }
    private _endTime: Date;
    private _phaseListSeq: number;
    private _programId: number;

    public get weekDay(): string {
        return this._weekDay;
    }
    public set weekDay(value: string) {
        this._weekDay = value;
    }

    get programDesc(): string{ return this._programDesc; }
    set programDesc(pprogramDesc: string){ this._programDesc = pprogramDesc ;}
    get moduleInstanceDesc(): string{ return this._moduleInstanceDesc; }
    set moduleInstanceDesc(pmoduleInstanceDesc: string){ this._moduleInstanceDesc = pmoduleInstanceDesc ;}
    get programInstanceDesc(): string{ return this._programInstanceDesc; }
    set programInstanceDesc(pprogramInstanceDesc: string){ this._programInstanceDesc = pprogramInstanceDesc ;}
    get sessionNo(): number{ return this._sessionNo; }
    set sessionNo(psessionNo: number){ this._sessionNo = psessionNo ;}
    get internalLocationDesc(): string{ return this._internalLocationDesc; }
    set internalLocationDesc(pinternalLocationDesc: string){ this._internalLocationDesc = pinternalLocationDesc ;}
    get phaseDescription(): string{ return this._phaseDescription; }
    set phaseDescription(pphaseDescription: string){ this._phaseDescription = pphaseDescription ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get phaseProviderPartyId(): number{ return this._phaseProviderPartyId; }
    set phaseProviderPartyId(pphaseProviderPartyId: number){ this._phaseProviderPartyId = pphaseProviderPartyId ;}
    get catchUpSessionFlag(): boolean{ return this._catchUpSessionFlag; }
    set catchUpSessionFlag(pcatchUpSessionFlag: boolean){ this._catchUpSessionFlag = pcatchUpSessionFlag ;}
    get crsSchId(): number{ return this._crsSchId; }
    set crsSchId(pcrsSchId: number){ this._crsSchId = pcrsSchId ;}
    get scheduleDate(): Date{ return this._scheduleDate; }
    set scheduleDate(pscheduleDate: Date){ this._scheduleDate = pscheduleDate ;}
    get moduleInstanceId(): number{ return this._moduleInstanceId; }
    set moduleInstanceId(pmoduleInstanceId: number){ this._moduleInstanceId = pmoduleInstanceId ;}
    get scheduleStatus(): string{ return this._scheduleStatus; }
    set scheduleStatus(pscheduleStatus: string){ this._scheduleStatus = pscheduleStatus ;}
    get scheduleStatusTemp(): string{ return this._scheduleStatusTemp; }
    set scheduleStatusTemp(pscheduleStatusTemp: string){ this._scheduleStatusTemp = pscheduleStatusTemp ;}
    get startTime(): Date{ return this._startTime; }
    set startTime(pstartTime: Date){ this._startTime = pstartTime ;}
    get phaseCode(): string{ return this._phaseCode; }
    set phaseCode(pphaseCode: string){ this._phaseCode = pphaseCode ;}
    get phaseProviderName(): string{ return this._phaseProviderName; }
    set phaseProviderName(pphaseProviderName: string){ this._phaseProviderName = pphaseProviderName ;}
    get programCode(): string{ return this._programCode; }
    set programCode(pprogramCode: string){ this._programCode = pprogramCode ;}
    get moduleListSeq(): number{ return this._moduleListSeq; }
    set moduleListSeq(pmoduleListSeq: number){ this._moduleListSeq = pmoduleListSeq ;}
    get phaseInstanceCode(): string{ return this._phaseInstanceCode; }
    set phaseInstanceCode(pphaseInstanceCode: string){ this._phaseInstanceCode = pphaseInstanceCode ;}
    get phaseSessionLength(): number{ return this._phaseSessionLength; }
    set phaseSessionLength(pphaseSessionLength: number){ this._phaseSessionLength = pphaseSessionLength ;}
    get programInstanceCode(): string{ return this._programInstanceCode; }
    set programInstanceCode(pprogramInstanceCode: string){ this._programInstanceCode = pprogramInstanceCode ;}
    get phaseProviderPartyClass(): string{ return this._phaseProviderPartyClass; }
    set phaseProviderPartyClass(pphaseProviderPartyClass: string){ this._phaseProviderPartyClass = pphaseProviderPartyClass ;}
    get phaseInstanceId(): number{ return this._phaseInstanceId; }
    set phaseInstanceId(pphaseInstanceId: number){ this._phaseInstanceId = pphaseInstanceId ;}
    get phaseInstanceDesc(): string{ return this._phaseInstanceDesc; }
    set phaseInstanceDesc(pphaseInstanceDesc: string){ this._phaseInstanceDesc = pphaseInstanceDesc ;}
    get programInstanceId(): number{ return this._programInstanceId; }
    set programInstanceId(pprogramInstanceId: number){ this._programInstanceId = pprogramInstanceId ;}
    get phaseProviderPartyCode(): string{ return this._phaseProviderPartyCode; }
    set phaseProviderPartyCode(pphaseProviderPartyCode: string){ this._phaseProviderPartyCode = pphaseProviderPartyCode ;}
    get endTime(): Date{ return this._endTime; }
    set endTime(pendTime: Date){ this._endTime = pendTime ;}
    get phaseListSeq(): number{ return this._phaseListSeq; }
    set phaseListSeq(pphaseListSeq: number){ this._phaseListSeq = pphaseListSeq ;}
    get programId(): number{ return this._programId; }
    set programId(pprogramId: number){ this._programId = pprogramId ;}

toJSON(): any {
    return { 
       'programDesc': this._programDesc,
       'moduleInstanceDesc': this._moduleInstanceDesc,
       'programInstanceDesc': this._programInstanceDesc,
       'sessionNo': this._sessionNo,
       'internalLocationDesc': this._internalLocationDesc,
       'phaseDescription': this._phaseDescription,
       'serialVersionUID': this._serialVersionUID,
       'phaseProviderPartyId': this._phaseProviderPartyId,
       'catchUpSessionFlag': this._catchUpSessionFlag,
       'crsSchId': this._crsSchId,
       'scheduleDate': this._scheduleDate,
       'moduleInstanceId': this._moduleInstanceId,
       'scheduleStatus': this._scheduleStatus,
       'scheduleStatusTemp': this._scheduleStatusTemp,
       'startTime': this._startTime,
       'phaseCode': this._phaseCode,
       'phaseProviderName': this._phaseProviderName,
       'programCode': this._programCode,
       'moduleListSeq': this._moduleListSeq,
       'phaseInstanceCode': this._phaseInstanceCode,
       'phaseSessionLength': this._phaseSessionLength,
       'programInstanceCode': this._programInstanceCode,
       'phaseProviderPartyClass': this._phaseProviderPartyClass,
       'phaseInstanceId': this._phaseInstanceId,
       'phaseInstanceDesc': this._phaseInstanceDesc,
       'programInstanceId': this._programInstanceId,
       'phaseProviderPartyCode': this._phaseProviderPartyCode,
       'endTime': this._endTime,
       'phaseListSeq': this._phaseListSeq,
       'programId': this._programId,
       'weekDay': this._weekDay,
       'scheduleStatusFlag': this._scheduleStatusFlag,
        };
    }  
}