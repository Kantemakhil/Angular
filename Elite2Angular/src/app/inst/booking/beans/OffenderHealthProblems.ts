export class OffenderHealthProblems {
    private _createUserId: string;
    private _offenderBookId: number;
    private _endDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _caseloadType: string;
    private _problemCode: string;
    private _createDatetime: Date;
    private _problemStatus: string;
    private _offenderHealthProblemId: number;
    private _sealFlag: string;
    private _problemType: string;
    private _startDate: Date;

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get endDate(): Date{ return this._endDate; }
    set endDate(pendDate: Date){ this._endDate = pendDate ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get caseloadType(): string{ return this._caseloadType; }
    set caseloadType(pcaseloadType: string){ this._caseloadType = pcaseloadType ;}
    get problemCode(): string{ return this._problemCode; }
    set problemCode(pproblemCode: string){ this._problemCode = pproblemCode ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get problemStatus(): string{ return this._problemStatus; }
    set problemStatus(pproblemStatus: string){ this._problemStatus = pproblemStatus ;}
    get offenderHealthProblemId(): number{ return this._offenderHealthProblemId; }
    set offenderHealthProblemId(poffenderHealthProblemId: number){ this._offenderHealthProblemId = poffenderHealthProblemId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get problemType(): string{ return this._problemType; }
    set problemType(pproblemType: string){ this._problemType = pproblemType ;}
    get startDate(): Date{ return this._startDate; }
    set startDate(pstartDate: Date){ this._startDate = pstartDate ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'offenderBookId': this._offenderBookId,
       'endDate': this._endDate,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'description': this._description,
       'caseloadType': this._caseloadType,
       'problemCode': this._problemCode,
       'createDatetime': this._createDatetime,
       'problemStatus': this._problemStatus,
       'offenderHealthProblemId': this._offenderHealthProblemId,
       'sealFlag': this._sealFlag,
       'problemType': this._problemType,
       'startDate': this._startDate,
        };
    }  
}
