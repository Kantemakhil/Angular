import { BaseModel } from '@commonbeans/BaseModel';

export class OffenderCommunitySentense extends BaseModel {
    private _formInfoJson: string;
    private _lastName: string;
    private _commenceType: string;
    private _no: number;
    private _offenderBookId: number;
    private _offenderIdDisplay: string;
    private _matter: string;
    private _commenceDate: Date;
    private _expiryDate: Date;
    private _firstName: string;
    private _formInfoJsonBlob: number;
    private _serialVersionUID: number;
    private _caseLoadId: string;

    get formInfoJson(): string{ return this._formInfoJson; }
    set formInfoJson(pformInfoJson: string){ this._formInfoJson = pformInfoJson ;}
    get lastName(): string{ return this._lastName; }
    set lastName(plastName: string){ this._lastName = plastName ;}
    get commenceType(): string{ return this._commenceType; }
    set commenceType(pcommenceType: string){ this._commenceType = pcommenceType ;}
    get no(): number{ return this._no; }
    set no(pno: number){ this._no = pno ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
    get matter(): string{ return this._matter; }
    set matter(pmatter: string){ this._matter = pmatter ;}
    get commenceDate(): Date{ return this._commenceDate; }
    set commenceDate(pcommenceDate: Date){ this._commenceDate = pcommenceDate ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get firstName(): string{ return this._firstName; }
    set firstName(pfirstName: string){ this._firstName = pfirstName ;}
    get formInfoJsonBlob(): number{ return this._formInfoJsonBlob; }
    set formInfoJsonBlob(pformInfoJsonBlob: number){ this._formInfoJsonBlob = pformInfoJsonBlob ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get caseLoadId(): string{ return this._caseLoadId; }
    set caseLoadId(pcaseLoadId: string){ this._caseLoadId = pcaseLoadId ;}

toJSON(): any {
    return { 
       'formInfoJson': this._formInfoJson,
       'lastName': this._lastName,
       'commenceType': this._commenceType,
       'no': this._no,
       'offenderBookId': this._offenderBookId,
       'offenderIdDisplay': this._offenderIdDisplay,
       'matter': this._matter,
       'commenceDate': this._commenceDate,
       'expiryDate': this._expiryDate,
       'firstName': this._firstName,
       'formInfoJsonBlob': this._formInfoJsonBlob,
       'serialVersionUID': this._serialVersionUID,
       'caseLoadId': this._caseLoadId,
        };
    } 
}