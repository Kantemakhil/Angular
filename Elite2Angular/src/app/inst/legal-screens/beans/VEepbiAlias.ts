
export class VEepbiAlias {
    private _cni: number;
    public get cni(): number {
        return this._cni;
    }
    public set cni(value: number) {
        this._cni = value;
    }
    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    private _middleName: string;
    public get middleName(): string {
        return this._middleName;
    }
    public set middleName(value: string) {
        this._middleName = value;
    }
    private _dob: Date;
    public get dob(): Date {
        return this._dob;
    }
    public set dob(value: Date) {
        this._dob = value;
    }
    private _sex: string;
    public get sex(): string {
        return this._sex;
    }
    public set sex(value: string) {
        this._sex = value;
    }
// tslint:disable-next-line: eofline
}