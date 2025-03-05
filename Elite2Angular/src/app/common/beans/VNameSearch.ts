import { BaseModel } from './BaseModel';

export class VNameSearch extends BaseModel {

    private _lastName: string;
    private _firstName: string;
    private _activeFlag: string;
    private _offenderId: number;
    private _offenderBookId: number;
    private _bookingNo: string;
    private _offenderIdDisplay: string;
    private _birthDate: Date;
    private _agyLocId: string;
    private _agyLocName: string;
    private _livingUnitDescription: string;
    private _inOutStatus: string;
    private _middleName: string;
    private _inserted: boolean;
    private _disablerow: boolean;
    private _age: number;
    private _gender: string;
    private _offAlerts: string;
    private _offSupLevel: string;
    private _communityActiveFlag: string;
    private _nbtLivingUnitId: number;
    private _moduleName: string;
    private _caseloadId: string;
    private _parentForm: string;
    public get parentForm(): string {
        return this._parentForm;
    }
    public set parentForm(value: string) {
        this._parentForm = value;
    }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get moduleName(): string { return this._moduleName; }

    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

    get age(): number { return this._age; }

    set age(page: number) { this._age = page; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }


    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }


    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }


    get bookingNo(): string { return this._bookingNo; }

    set bookingNo(pbookingNo: string) { this._bookingNo = pbookingNo; }


    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }


    get birthDate(): Date { return this._birthDate; }

    set birthDate(pbirthDate: Date) { this._birthDate = pbirthDate; }


    get agyLocId(): string { return this._agyLocId; }

    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }


    get agyLocName(): string { return this._agyLocName; }

    set agyLocName(pagyLocName: string) { this._agyLocName = pagyLocName; }


    get livingUnitDescription(): string { return this._livingUnitDescription; }

    set livingUnitDescription(plivingUnitDescription: string) { this._livingUnitDescription = plivingUnitDescription; }


    get inOutStatus(): string { return this._inOutStatus; }

    set inOutStatus(pinOutStatus: string) { this._inOutStatus = pinOutStatus; }


    get middleName(): string { return this._middleName; }

    set middleName(pmiddleName: string) { this._middleName = pmiddleName; }


    get inserted(): boolean { return this._inserted; }

    set inserted(pinserted: boolean) { this._inserted = pinserted; }

    get disablerow(): boolean { return this._disablerow; }

    set disablerow(pdisablerow: boolean) { this._disablerow = pdisablerow; }

    get gender(): string { return this._gender; }

    set gender(pgender: string) { this._gender = pgender; }

    get offAlerts(): string { return this._offAlerts; }

    set offAlerts(poffAlerts: string) { this._offAlerts = poffAlerts; }

    get offSupLevel(): string { return this._offSupLevel; }

    set offSupLevel(poffSupLevel: string) { this._offSupLevel = poffSupLevel; }

    get communityActiveFlag(): string { return this._communityActiveFlag; }

    set communityActiveFlag(pcommunityActiveFlag: string) { this._communityActiveFlag = pcommunityActiveFlag; }

    get nbtLivingUnitId(): number { return this._nbtLivingUnitId; }

    set nbtLivingUnitId( pnbtLivingUnitId: number ) { this._nbtLivingUnitId = pnbtLivingUnitId; }


    toJSON(): any {
        return {
            'lastName': this._lastName,
            'firstName': this._firstName,
            'activeFlag': this._activeFlag,
            'offenderId': this._offenderId,
            'offenderBookId': this._offenderBookId,
            'bookingNo': this._bookingNo,
            'offenderIdDisplay': this._offenderIdDisplay,
            'birthDate': this._birthDate,
            'agyLocId': this._agyLocId,
            'agyLocName': this._agyLocName,
            'livingUnitDescription': this._livingUnitDescription,
            'inOutStatus': this._inOutStatus,
            'middleName': this._middleName,
            'inserted': this._inserted,
            'age': this._age,
            'gender': this._gender,
            'offAlerts': this._offAlerts,
            'offSupLevel': this._offSupLevel,
            'communityActiveFlag': this._communityActiveFlag,
            'nbtLivingUnitId': this._nbtLivingUnitId,
            'moduleName': this._moduleName,
            'caseloadId': this._caseloadId,
            'parentForm':this._parentForm
        };
    }
}
