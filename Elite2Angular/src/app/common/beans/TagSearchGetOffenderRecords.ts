import { BaseModel } from './BaseModel';

export class TagSearchGetOffenderRecords extends BaseModel {

    private _pSearchType: string;
    private _pLastName: string;
    private _pFirstName: string;
    private _pMiddleName: string;
    private _pIdentifierType: string;
    private _pIdentifierValue: string;
    private _offenderIdDisplay: string;
    private _pSexCode: string;
    private _pBirthDate: Date;
    private _pBirthYear: string;
    private _pBirthRange: number;
    private _pAgedate: Date;
    private _pAgeRange: number;
    private _pEthnicity: string;
    private _pNameVariation: string;
    private _pSwitchNames: string;
    private _offenderId: string;
    private _rootOffenderId: string;
    private _workingNameFlag: string;
    private _nbtBkgNo: string;
    private _pBookNo: string;
    private _nameType: string;
    private _pGenderCode: string;
    private _secondMiddleName: string;
    private _pin: string;
    private _intCorrelationId: number;
    private _moduleName: string;
    private _parentForm: string;
    private _pnin: string;



    get pBookNo(): string { return this._pBookNo; }

    set pBookNo(ppBookNo: string) { this._pBookNo = ppBookNo; }

    get pSearchType(): string { return this._pSearchType; }

    set pSearchType(pSearchType: string) { this._pSearchType = pSearchType; }

    get pLastName(): string { return this._pLastName; }

    set pLastName(ppLastName: string) { this._pLastName = ppLastName; }

    get pFirstName(): string { return this._pFirstName; }

    set pFirstName(ppFirstName: string) { this._pFirstName = ppFirstName; }

    get pMiddleName(): string { return this._pMiddleName; }

    set pMiddleName(ppMiddleName: string) { this._pMiddleName = ppMiddleName; }

    get pIdentifierType(): string { return this._pIdentifierType; }

    set pIdentifierType(ppIdentifierType: string) { this._pIdentifierType = ppIdentifierType; }

    get pIdentifierValue(): string { return this._pIdentifierValue; }

    set pIdentifierValue(ppIdentifierValue: string) { this._pIdentifierValue = ppIdentifierValue; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get pSexCode(): string { return this._pSexCode; }

    set pSexCode(ppSexCode: string) { this._pSexCode = ppSexCode; }

    get pBirthDate(): Date { return this._pBirthDate; }

    set pBirthDate(ppBirthDate: Date) { this._pBirthDate = ppBirthDate; }

    get pBirthYear(): string { return this._pBirthYear; }

    set pBirthYear(ppBirthYear: string) { this._pBirthYear = ppBirthYear; }

    get pBirthRange(): number { return this._pBirthRange; }

    set pBirthRange(ppBirthRange: number) { this._pBirthRange = ppBirthRange; }

    get pAgedate(): Date { return this._pAgedate; }

    set pAgedate(ppAgedate: Date) { this._pAgedate = ppAgedate; }

    get pAgeRange(): number { return this._pAgeRange; }

    set pAgeRange(ppAgeRange: number) { this._pAgeRange = ppAgeRange; }

    get pEthnicity(): string { return this._pEthnicity; }

    set pEthnicity(ppEthnicity: string) { this._pEthnicity = ppEthnicity; }

    get pNameVariation(): string { return this._pNameVariation; }

    set pNameVariation(ppNameVariation: string) { this._pNameVariation = ppNameVariation; }

    get pSwitchNames(): string { return this._pSwitchNames; }

    set pSwitchNames(ppSwitchNames: string) { this._pSwitchNames = ppSwitchNames; }

    get offenderId(): string { return this._offenderId; }

    set offenderId(poffenderId: string) { this._offenderId = poffenderId; }

    get rootOffenderId(): string { return this._rootOffenderId; }

    set rootOffenderId(prootOffenderId: string) { this._rootOffenderId = prootOffenderId; }

    get workingNameFlag(): string { return this._workingNameFlag; }

    set workingNameFlag(pworkingNameFlag: string) { this._workingNameFlag = pworkingNameFlag; }

    get nbtBkgNo(): string { return this._nbtBkgNo; }

    set nbtBkgNo(pnbtBkgNo: string) { this._nbtBkgNo = pnbtBkgNo; }

    get nameType(): string { return this._nameType; }

    set nameType(nameType: string) { this._nameType = nameType; }

    get pGenderCode(): string { return this._pGenderCode; }

    set pGenderCode(value: string) { this._pGenderCode = value; }

    get secondMiddleName(): string { return this._secondMiddleName; }

    set secondMiddleName(psecondMiddleName: string) { this._secondMiddleName = psecondMiddleName; }

    get pin(): string {return this._pin;}

    set pin(value: string) {this._pin = value;}

    get intCorrelationId(): number {return this._intCorrelationId;}

    set intCorrelationId(value: number) {this._intCorrelationId = value;}

    get moduleName(): string { return this._moduleName;}

    set moduleName(value: string) { this._moduleName = value;}

    get parentForm(): string { return this._parentForm; }

    set parentForm(value: string) { this._parentForm = value; }

    get pnin(): string { return this._pnin; }

    set pnin(value: string) { this._pnin = value; }

    toJSON(): any {
        return {
            'pSearchType': this._pSearchType,
            'pLastName': this._pLastName,
            'pFirstName': this._pFirstName,
            'pMiddleName': this._pMiddleName,
            'pIdentifierType': this._pIdentifierType,
            'pIdentifierValue': this._pIdentifierValue,
            'offenderIdDisplay': this._offenderIdDisplay,
            'pSexCode': this._pSexCode,
            'pBirthDate': this._pBirthDate,
            'pBirthYear': this._pBirthYear,
            'pBirthRange': this._pBirthRange,
            'pAgedate': this._pAgedate,
            'pAgeRange': this._pAgeRange,
            'pEthnicity': this._pEthnicity,
            'pNameVariation': this._pNameVariation,
            'pSwitchNames': this._pSwitchNames,
            'offenderId': this._offenderId,
            'rootOffenderId': this._rootOffenderId,
            'workingNameFlag': this._workingNameFlag,
            'nbtBkgNo': this._nbtBkgNo,
            'pBookNo': this._pBookNo,
            'nameType': this._nameType,
            'pGenderCode': this._pGenderCode,
            'secondMiddleName': this._secondMiddleName,
            'pin':this._pin,
            'intCorrelationId': this._intCorrelationId,
            'moduleName':this._moduleName,
            'parentForm' :this._parentForm,
            'pnin': this._pnin
        };
    }
}
