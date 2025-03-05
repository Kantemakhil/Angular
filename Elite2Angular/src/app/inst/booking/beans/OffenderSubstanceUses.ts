export class OffenderSubstanceUses {

    private _createUserId: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _caseloadType: string;
    private _rootOffenderId: number;
    private _ageUsed: number;
    private _offenderSubstanceDetails: number;
    private _offenderSubstanceTreatments: number;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _substanceType: string;
    private _sealFlag: string;
    private _nbtCaseloadType: string;
    private _rowId: string;


    get rowId(): string { return this._rowId; }
     set rowId(prowId: string) { this._rowId = prowId; }

    get nbtCaseloadType(): string{ return this._nbtCaseloadType; }
    set nbtCaseloadType(pnbtCaseloadType: string){ this._nbtCaseloadType = pnbtCaseloadType ; }
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ; }
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ; }
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ; }
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ; }
    get caseloadType(): string{ return this._caseloadType; }
    set caseloadType(pcaseloadType: string){ this._caseloadType = pcaseloadType ; }
    get rootOffenderId(): number{ return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number){ this._rootOffenderId = prootOffenderId ; }
    get ageUsed(): number{ return this._ageUsed; }
    set ageUsed(pageUsed: number){ this._ageUsed = pageUsed ; }
    get offenderSubstanceDetails(): number{ return this._offenderSubstanceDetails; }
    set offenderSubstanceDetails(poffenderSubstanceDetails: number){ this._offenderSubstanceDetails = poffenderSubstanceDetails ; }
    get offenderSubstanceTreatments(): number{ return this._offenderSubstanceTreatments; }
    set offenderSubstanceTreatments(poffenderSubstanceTreatments: number){ this._offenderSubstanceTreatments = poffenderSubstanceTreatments ; }
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ; }
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ; }
    get substanceType(): string{ return this._substanceType; }
    set substanceType(psubstanceType: string){ this._substanceType = psubstanceType ; }
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ; }

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'offenderBookId': this._offenderBookId,
       'modifyUserId': this._modifyUserId,
       'caseloadType': this._caseloadType,
       'rootOffenderId': this._rootOffenderId,
       'ageUsed': this._ageUsed,
       'offenderSubstanceDetails': this._offenderSubstanceDetails,
       'offenderSubstanceTreatments': this._offenderSubstanceTreatments,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'substanceType': this._substanceType,
       'sealFlag': this._sealFlag,
       'nbtCaseloadType': this._nbtCaseloadType,
       'rowId': this._rowId,
        };
    }  


}