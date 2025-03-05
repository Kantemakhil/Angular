import { BaseModel } from "@common/beans/BaseModel"

export class VOffenderProgramProfiles extends BaseModel {
    private _age: number;
    private _crsActyId: number;
    private _firstName: string;
    private _pGenderCode: string;
    private _pEthnicityCode: string;
    private _lastName: string;
    private _offPrgrefId: number;
    private _offenceTypes: string;
    private _offenderAlert: string;
    private _offenderBookId: number;
    private _offenderEndDate: Date;
    private _offenderId: number;
    private _offenderIdDisplay: string;
    private _offenderName: string;
    private _offenderProgramStatus: string;
    private _offenderStartDate: Date;
    private _programId: number;
    private _raceCode: string;
    private _sexCode: string;
    private _suspendedFlag: string;
    private _prgServiceList: Array<VOffenderProgramProfiles>;
    public get prgServiceList(): Array<VOffenderProgramProfiles> {
        return this._prgServiceList;
    }
    public set prgServiceList(value: Array<VOffenderProgramProfiles>) {
        this._prgServiceList = value;
    }


    get suspendedFlag(): string { return this._suspendedFlag; }

    set suspendedFlag(psuspendedFlag: string) { this._suspendedFlag = psuspendedFlag; }

    get pGenderCode(): string { return this._pGenderCode; }

    set pGenderCode(ppGenderCode: string) { this._pGenderCode = ppGenderCode; }

    get pEthnicityCode(): string { return this._pEthnicityCode; }

    set pEthnicityCode(ppEthnicityCode: string) { this._pEthnicityCode = ppEthnicityCode; }

    get raceCode(): string { return this._raceCode; }

    set raceCode(praceCode: string) { this._raceCode = praceCode; }

    get sexCode(): string { return this._sexCode; }

    set sexCode(psexCode: string) { this._sexCode = psexCode; }

    get programId(): number { return this._programId; }

    set programId(pprogramId: number) { this._programId = pprogramId; }

    get offenderStartDate(): Date { return this._offenderStartDate; }

    set offenderStartDate(poffenderStartDate: Date) { this._offenderStartDate = poffenderStartDate; }

    get offenderProgramStatus(): string { return this._offenderProgramStatus; }

    set offenderProgramStatus(poffenderProgramStatus: string) { this._offenderProgramStatus = poffenderProgramStatus; }

    get offenderName(): string { return this._offenderName; }

    set offenderName(poffenderName: string) { this._offenderName = poffenderName; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get offenderEndDate(): Date { return this._offenderEndDate; }

    set offenderEndDate(poffenderEndDate: Date) { this._offenderEndDate = poffenderEndDate; }


    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }


    get offenderAlert(): string { return this._offenderAlert; }

    set offenderAlert(poffenderAlert: string) { this._offenderAlert = poffenderAlert; }

    get offenceTypes(): string { return this._offenceTypes; }

    set offenceTypes(poffenceTypes: string) { this._offenceTypes = poffenceTypes; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }


    get crsActyId(): number { return this._crsActyId; }

    set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId; }

    get age(): number { return this._age; }

    set age(page: number) { this._age = page; }

    toJSON(): any {
        return {
            'age': this._age,
            'pGenderCode': this._pGenderCode,
            'pEthnicityCode': this._pEthnicityCode,
            'crsActyId': this._crsActyId,
            'firstName': this._firstName,
            'lastName': this._lastName,
            'offenceTypes': this._offenceTypes,
            'offenderAlert': this._offenderAlert,
            'offenderBookId': this._offenderBookId,
            'offenderEndDate': this._offenderEndDate,
            'offPrgrefId': this._offPrgrefId,
            'offenderId': this._offenderId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'offenderName': this._offenderName,
            'offenderProgramStatus': this._offenderProgramStatus,
            'offenderStartDate': this._offenderStartDate,
            'programId': this._programId,
            'sexCode': this._sexCode,
            'raceCode': this._raceCode,
            'suspendedFlag': this._suspendedFlag,
            'prgServiceList':this._prgServiceList
        };
    }
}
