export class OffenderSubstanceTreatments {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _treatmentFromDate: Date;
    private _caseloadType: string;
    private _rootOffenderId: number;
    private _treatmentSeq: number;
    private _commentText: string;
    private _offenderSubstanceUs: number;
    private _fromDateFlag: string;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _substanceType: string;
    private _toDateFlag: string;
    private _sealFlag: string;
    private _treatmentCode: string;
    private _treatmentPlace: string;
    private _treatmentToDate: Date;
    private _nbtCaseloadType: string;

    get nbtCaseloadType(): string{ return this._nbtCaseloadType; }
    set nbtCaseloadType(pnbtCaseloadType: string){ this._nbtCaseloadType = pnbtCaseloadType ; }
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get treatmentFromDate(): Date{ return this._treatmentFromDate; }
    set treatmentFromDate(ptreatmentFromDate: Date){ this._treatmentFromDate = ptreatmentFromDate ;}
    get caseloadType(): string{ return this._caseloadType; }
    set caseloadType(pcaseloadType: string){ this._caseloadType = pcaseloadType ;}
    get rootOffenderId(): number{ return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId ;}
    get treatmentSeq(): number{ return this._treatmentSeq; }
    set treatmentSeq(ptreatmentSeq: number){ this._treatmentSeq = ptreatmentSeq ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get offenderSubstanceUs(): number{ return this._offenderSubstanceUs; }
    set offenderSubstanceUs(poffenderSubstanceUs: number){ this._offenderSubstanceUs = poffenderSubstanceUs ;}
    get fromDateFlag(): string{ return this._fromDateFlag; }
    set fromDateFlag(pfromDateFlag: string){ this._fromDateFlag = pfromDateFlag ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get substanceType(): string{ return this._substanceType; }
    set substanceType(psubstanceType: string){ this._substanceType = psubstanceType ;}
    get toDateFlag(): string{ return this._toDateFlag; }
    set toDateFlag(ptoDateFlag: string){ this._toDateFlag = ptoDateFlag ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get treatmentCode(): string{ return this._treatmentCode; }
    set treatmentCode(ptreatmentCode: string){ this._treatmentCode = ptreatmentCode ;}
    get treatmentPlace(): string{ return this._treatmentPlace; }
    set treatmentPlace(ptreatmentPlace: string){ this._treatmentPlace = ptreatmentPlace ;}
    get treatmentToDate(): Date{ return this._treatmentToDate; }
    set treatmentToDate(ptreatmentToDate: Date){ this._treatmentToDate = ptreatmentToDate ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'offenderBookId': this._offenderBookId,
       'modifyUserId': this._modifyUserId,
       'treatmentFromDate': this._treatmentFromDate,
       'caseloadType': this._caseloadType,
       'rootOffenderId': this._rootOffenderId,
       'treatmentSeq': this._treatmentSeq,
       'commentText': this._commentText,
       'offenderSubstanceUs': this._offenderSubstanceUs,
       'fromDateFlag': this._fromDateFlag,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'substanceType': this._substanceType,
       'toDateFlag': this._toDateFlag,
       'sealFlag': this._sealFlag,
       'treatmentCode': this._treatmentCode,
       'treatmentPlace': this._treatmentPlace,
       'treatmentToDate': this._treatmentToDate,
       'nbtCaseloadType': this._nbtCaseloadType,
        };
    } 
    
}