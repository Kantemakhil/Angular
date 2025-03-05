export class OffenderMedicalTreatments {
    private _createUserId: string;
    private _endDate: Date;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _description: string;
    private _offenderMedicaltreatmentId: number;
    private _caseloadType: string;
    private _commentText: string;
    private _treatmentProviderCode: string;
    private _createDatetime: Date;
    private _offenderHealthProblemId: number;
    private _sealFlag: string;
    private _treatmentCode: string;
    private _startDate: Date;

    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get endDate(): Date{ return this._endDate; }
    set endDate(pendDate: Date){ this._endDate = pendDate ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get description(): string{ return this._description; }
    set description(pdescription: string){ this._description = pdescription ;}
    get offenderMedicaltreatmentId(): number{ return this._offenderMedicaltreatmentId; }
    set offenderMedicaltreatmentId(poffenderMedicaltreatmentId: number){ this._offenderMedicaltreatmentId = poffenderMedicaltreatmentId ;}
    get caseloadType(): string{ return this._caseloadType; }
    set caseloadType(pcaseloadType: string){ this._caseloadType = pcaseloadType ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get treatmentProviderCode(): string{ return this._treatmentProviderCode; }
    set treatmentProviderCode(ptreatmentProviderCode: string){ this._treatmentProviderCode = ptreatmentProviderCode ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get offenderHealthProblemId(): number{ return this._offenderHealthProblemId; }
    set offenderHealthProblemId(poffenderHealthProblemId: number){ this._offenderHealthProblemId = poffenderHealthProblemId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get treatmentCode(): string{ return this._treatmentCode; }
    set treatmentCode(ptreatmentCode: string){ this._treatmentCode = ptreatmentCode ;}
    get startDate(): Date{ return this._startDate; }
    set startDate(pstartDate: Date){ this._startDate = pstartDate ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'endDate': this._endDate,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'description': this._description,
       'offenderMedicaltreatmentId': this._offenderMedicaltreatmentId,
       'caseloadType': this._caseloadType,
       'commentText': this._commentText,
       'treatmentProviderCode': this._treatmentProviderCode,
       'createDatetime': this._createDatetime,
       'offenderHealthProblemId': this._offenderHealthProblemId,
       'sealFlag': this._sealFlag,
       'treatmentCode': this._treatmentCode,
       'startDate': this._startDate,
        };
    }  
}