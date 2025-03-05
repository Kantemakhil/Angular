import { BaseModel } from "@common/beans/BaseModel";

export class VBookAdmin extends BaseModel {

    private _lastName: string;
    private _firstName: string;
    private _suffix: string;
    private _birthDate: Date;
    private _offenderIdDisplay: string;
    private _offenderId: number;
    private _rootOffenderId: number;
    private _middleName: string;

    get lastName(): string { return  this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get firstName(): string { return  this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get suffix(): string { return  this._suffix; }

    set suffix(psuffix: string) { this._suffix = psuffix; }

    get birthDate(): Date { return  this._birthDate; }

    set birthDate(pbirthDate: Date) { this._birthDate = pbirthDate; }

    get offenderIdDisplay(): string { return  this._offenderIdDisplay; }

    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get offenderId(): number { return  this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get rootOffenderId(): number { return  this._rootOffenderId; }

    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }

    get middleName(): string { return  this._middleName; }

    set middleName(pmiddleName: string) { this._middleName = pmiddleName; }

    toJSON(): any {
        return {
           'lastName': this._lastName,
           'firstName': this._firstName,
           'suffix': this._suffix,
           'birthDate': this._birthDate,
           'offenderIdDisplay': this._offenderIdDisplay,
           'offenderId': this._offenderId,
           'rootOffenderId': this._rootOffenderId,
           'middleName': this._middleName,
};

    }
}
