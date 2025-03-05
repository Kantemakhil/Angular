import { BaseModel } from '@commonbeans/BaseModel'

export class OffenderAttributes extends BaseModel {

    private _offenderAttributes: string[] = [];
    private _offenderAttributeLabel: string;
    private _offenderSystemTable: string;
    private _offenderSystemTblCol: string;
    private _domainCode: string;
    private _caseType: string;
    private _caseStatus: string;
    private _caseSeq: number;
    private _sentenceCalcType: string;
    private _sentenceType: string;
    private _category: string;
    private _gender:string;
    private _securityLevel:string;
    private _offenderAttValues:string;
    private _domainValue:string;
    private _uniqueId:string;
    private _attDescription:string;
    private _personalAttributes:string;
    private _offenderBookId:number;
    private _agyLocId:string;
    private _required:string;



    set offenderAttributes(offenderAttributes: string[]) { this._offenderAttributes = offenderAttributes; }

    get offenderAttributes(): string[] { return this._offenderAttributes; }
    
    set offenderAttributeLabel(offenderAttributeLabel: string) { this._offenderAttributeLabel = offenderAttributeLabel; }

    get offenderAttributeLabel(): string { return this._offenderAttributeLabel; }
    
    set offenderSystemTable(offenderSystemTable: string) { this._offenderSystemTable = offenderSystemTable; }

    get offenderSystemTable(): string { return this._offenderSystemTable; }
    
    set offenderSystemTblCol(offenderSystemTblCol: string) { this._offenderSystemTblCol = offenderSystemTblCol; }

    get offenderSystemTblCol(): string { return this._offenderSystemTblCol; }
    
    set domainCode(domainCode: string) { this._domainCode = domainCode; }

    get domainCode(): string { return this._domainCode; }
    
    get caseType(): string { return this._caseType; }

    set caseType( caseType: string ) { this._caseType = caseType; }
    
    get caseStatus(): string { return this._caseStatus; }

    set caseStatus( caseStatus: string ) { this._caseStatus = caseStatus; }
    
    get caseSeq(): number { return this._caseSeq; }

    set caseSeq( caseSeq: number ) { this._caseSeq = caseSeq; }
    
    get sentenceCalcType(): string { return this._sentenceCalcType; }

    set sentenceCalcType( sentenceCalcType: string ) { this._sentenceCalcType = sentenceCalcType; }

    get sentenceType(): string { return this._sentenceType; }

    set sentenceType( sentenceType: string ) { this._sentenceType = sentenceType; }
    
    get category(): string { return this._category; }

    set category( category: string ) { this._category = category; }

    set gender(gender: string) { this._gender = gender; }

    get gender(): string { return this._gender; }
    
    set securityLevel(securityLevel: string) { this._securityLevel = securityLevel; }

    get securityLevel(): string { return this._securityLevel; }
    
    get offenderAttValues() : string { return this._offenderAttValues } ;

    set offenderAttValues( offenderAttValues: string ) { this._offenderAttValues = offenderAttValues; }

    set domainValue(domainValue: string) { this._domainValue = domainValue; }

    get domainValue(): string { return this._domainValue; }
    
    set uniqueId(uniqueId: string) { this._uniqueId = uniqueId; }

    get uniqueId(): string { return this._uniqueId; }
    
    set attDescription(attDescription: string) { this._attDescription = attDescription; }

    get attDescription(): string { return this._attDescription; }
    
    set personalAttributes(personalAttributes: string) { this._personalAttributes = personalAttributes; }

    get personalAttributes(): string { return this._personalAttributes; }
    
    set offenderBookId(offenderBookId: number) { this._offenderBookId = offenderBookId; }

    get offenderBookId(): number { return this._offenderBookId; }
    
    set agyLocId(agyLocId: string) { this._agyLocId = agyLocId; }

    get agyLocId(): string { return this._agyLocId; }

    set required(required: string) { this._required = required; }

    get required(): string { return this._required; }

    toJSON(): any {
        return {
            'offenderAttributes': this._offenderAttributes,
            'offenderAttributeLabel': this._offenderAttributeLabel,
            'offenderSystemTable': this._offenderSystemTable,
            'offenderSystemTblCol': this._offenderSystemTblCol,
            'domainCode': this._domainCode,
            'caseType': this._caseType,
            'caseStatus': this._caseStatus,
            'caseSeq': this._caseSeq,
            'sentenceCalcType': this._sentenceCalcType,
            'sentenceType': this._sentenceType,  
            'category': this._category,  
            'gender':this._gender,
            'securityLevel':this._securityLevel,
            'offenderAttValues':this._offenderAttValues,
            'domainValue':this._domainValue,
            'uniqueId':this._uniqueId,
            'attDescription':this._attDescription,
            'personalAttributes':this._personalAttributes,
            'offenderBookId':this._offenderBookId,
            'agyLocId':this._agyLocId,
            'required':this._required
        };
    }
}
