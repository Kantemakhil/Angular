import { EoffenderDetails } from "@common/beans/EoffenderDetails";

export class UserSession {

    private _isLoggedin = false;
    private _accessToken: string;
    private _tokenType: string;
    private _refreshToken: string;
    private _expiresIn: string;
    private _scope: string;
    private _lang: string;
    private _id: string;
    private _caseloadid: string;
    private _userRoutes: string[];
    private _randomid: number;
    private _caseLoadType: string;
    private _staff: any;
    private _selectedOffender:any;
    private _eoffenderDetails:EoffenderDetails;

    get isLoggedin(): boolean { return this._isLoggedin; }

    set isLoggedin(pisLoggedin: boolean) { this._isLoggedin = pisLoggedin; }

    get accessToken(): string { return this._accessToken; }

    set accessToken(paccessToken: string) { this._accessToken = paccessToken; }

    get tokenType(): string { return this._tokenType; }

    set tokenType(ptokenType: string) { this._tokenType = ptokenType; }

    get refreshToken(): string { return this._refreshToken; }

    set refreshToken(prefreshToken: string) { this._refreshToken = prefreshToken; }

    get expiresIn(): string { return this._expiresIn; }

    set expiresIn(expiresIn: string) { this._expiresIn = expiresIn; }

    get scope(): string { return this._scope; }

    set scope(scope: string) { this._scope = scope; }

    get lang(): string { return this._lang; }

    set lang(lang: string) { this._lang = lang; }

    get id(): string { return this._id; }

    set id(id: string) { this._id = id; }

    get caseloadid(): string { return this._caseloadid; }

    set caseloadid(caseloadid: string) { this._caseloadid = caseloadid; }
    
    get eoffenderDetails(): EoffenderDetails {return this._eoffenderDetails; }

    set eoffenderDetails(eoffenderDetails: EoffenderDetails) {this._eoffenderDetails = eoffenderDetails; }

    get selectedOffender(): any {return this._selectedOffender; }

    set selectedOffender(selectedOffender: any) {this._selectedOffender = selectedOffender; }

    get userRoutes(): string[] { return this._userRoutes; }

    set userRoutes(userRoutes: string[]) { this._userRoutes = userRoutes; }

    get randomid(): number { return this._randomid; }

    set randomid(randomid: number) { this._randomid = randomid; }

    get caseLoadType(): string { return this._caseLoadType; }

    set caseLoadType(caseLoadType) { this._caseLoadType = caseLoadType; }

    get staff(): any {return this._staff; }

    set staff(staff: any) {this._staff = staff; }

    toJSON(): any {
        return {
            'isLoggedin': this._isLoggedin,
            'accessToken': this._accessToken,
            'tokenType': this._tokenType,
            'refreshToken': this._refreshToken,
            'expiresIn': this._expiresIn,
            'scope': this._scope,
            'lang': this._lang,
            'id': this._id,
            'caseloadid': this._caseloadid,
            'userRoutes': this._userRoutes,
            'randomid': this._randomid,
            'caseLoadType': this._caseLoadType,
            'staff': this._staff
        };
    }

}
