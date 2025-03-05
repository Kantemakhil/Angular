export class OffenderSubstanceDetails {

    private _createUserId: string;
    private _usePeriod: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _caseloadType: string;
    private _rootOffenderId: number;
    private _commentText: string;
    private _offenderSubstanceUs: number;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _useLevel: string;
    private _substanceType: string;
    private _sourceOfInfo: string;
    private _seqNumber: number;
    private _sealFlag: string;
    private _nbtCaseloadType: string;
    get nbtCaseloadType(): string{ return this._nbtCaseloadType; }
    set nbtCaseloadType(pnbtCaseloadType: string){ this._nbtCaseloadType = pnbtCaseloadType ; }
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get usePeriod(): string{ return this._usePeriod; }
    set usePeriod(pusePeriod: string){ this._usePeriod = pusePeriod ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get caseloadType(): string{ return this._caseloadType; }
    set caseloadType(pcaseloadType: string){ this._caseloadType = pcaseloadType ;}
    get rootOffenderId(): number{ return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get offenderSubstanceUs(): number{ return this._offenderSubstanceUs; }
    set offenderSubstanceUs(poffenderSubstanceUs: number){ this._offenderSubstanceUs = poffenderSubstanceUs ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get useLevel(): string{ return this._useLevel; }
    set useLevel(puseLevel: string){ this._useLevel = puseLevel ;}
    get substanceType(): string{ return this._substanceType; }
    set substanceType(psubstanceType: string){ this._substanceType = psubstanceType ;}
    get sourceOfInfo(): string{ return this._sourceOfInfo; }
    set sourceOfInfo(psourceOfInfo: string){ this._sourceOfInfo = psourceOfInfo ;}
    get seqNumber(): number{ return this._seqNumber; }
    set seqNumber(pseqNumber: number){ this._seqNumber = pseqNumber ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'usePeriod': this._usePeriod,
       'modifyDatetime': this._modifyDatetime,
       'offenderBookId': this._offenderBookId,
       'modifyUserId': this._modifyUserId,
       'caseloadType': this._caseloadType,
       'rootOffenderId': this._rootOffenderId,
       'commentText': this._commentText,
       'offenderSubstanceUs': this._offenderSubstanceUs,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'useLevel': this._useLevel,
       'substanceType': this._substanceType,
       'sourceOfInfo': this._sourceOfInfo,
       'seqNumber': this._seqNumber,
       'sealFlag': this._sealFlag,
       'nbtCaseloadType': this._nbtCaseloadType,
        };
    }  

    
}