import { Injectable } from '@angular/core';
import { UserSession } from '../domain/userSession';
import { RedirectUtil } from './redirectUtil';
import { CaseLoads } from '@commonbeans/CaseLoads';
import { Subject, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class UserSessionManager {

    private userSession: UserSession;

    private innerLang: string;

    private innerCaseLoads: CaseLoads[];

    private nameSubject = new Subject<any>();
    private caseloadChangedSubject = new  Subject<any>();   
    
    private innerMsgs = [];

    private innerUserRoles: any;

    private innerCaseLoadAgencies: any;
    
    private _adRedirectUrl:any;
    private _mainLink: any;
    private _nonce: any;
    private _clientInfo: any;
    private _clientRequestId: any;
    private _state: any;
    private _scope: any;
    private _clientID: any;

    private _isDeployementHappen:boolean = false;


    public get isDeployementHappen(): boolean {
        return this._isDeployementHappen;
    }
    public set isDeployementHappen(value: boolean) {
        this._isDeployementHappen = value;
    }
    
    public get mainLink(): any {
        return this._mainLink;
    }
    public set mainLink(value: any) {
        this._mainLink = value;
    }
    public get scope(): any {
        return this._scope;
    }
    public set scope(value: any) {
        this._scope = value;
    }
    public get clientID(): any {
        return this._clientID;
    }
    public set clientID(value: any) {
        this._clientID = value;
    }
    public get state(): any {
        return this._state;
    }
    public set state(value: any) {
        this._state = value;
    }
    public get nonce(): any {
        return this._nonce;
    }
    public set nonce(value: any) {
        this._nonce = value;
    }
    public get clientInfo(): any {
        return this._clientInfo;
    }
    public set clientInfo(value: any) {
        this._clientInfo = value;
    }
    public get clientRequestId(): any {
        return this._clientRequestId;
    }
    public set clientRequestId(value: any) {
        this._clientRequestId = value;
    }

    constructor(private redirectUtil: RedirectUtil) {
    }

    get lang(): string {
        return this.innerLang;
    }

    set lang(lang: string) {
        this.innerLang = lang;
    }

    public isSessionValied(): boolean {
        if (this.userSession) {
            return this.userSession.isLoggedin;
        } else {
            if (typeof (Storage) !== 'undefined') {
                const sessiondata: string = sessionStorage.getItem('UserInfo');
                if (sessiondata != null && sessiondata.length > 0) {
                    this.userSession = JSON.parse(sessiondata);
                    return this.userSession.isLoggedin;
                }
            }
            return false;
        }
    }
    public addUserSession(userSession: UserSession) {
        if (typeof (Storage) !== 'undefined') {
            if (this.isSessionValied()) {
                if (this.userSession) {
                    userSession.caseloadid = this.userSession.caseloadid;
                    if(this.userSession.id && this.userSession.id !== "") {
						userSession.id = this.userSession.id;
					}
                    userSession.lang = this.userSession.lang;
                    userSession.randomid = this.userSession.randomid;
                    userSession.caseLoadType = this.userSession.caseLoadType;
                }
                sessionStorage.removeItem('UserInfo');
            }
            sessionStorage.setItem('UserInfo', JSON.stringify(userSession));
        }
        this.userSession = userSession;
    }
    public removeUserSession() {
        this.userSession = undefined;
        this.innerUserRoles = undefined;
        if (typeof (Storage) !== 'undefined') {
            sessionStorage.removeItem('UserInfo');
        }
    }
    public removeSsoSession(){
        this.adRedirectUrl = undefined;
        this.mainLink = undefined;
        this.scope = undefined;
        this.clientID = undefined;
        this.state = undefined;
        this.nonce = undefined;
        this.clientInfo = undefined;
        this.clientRequestId = undefined;
    }
    public getAccessToken(): string {
        if (this.validateSession()) {
            return this.userSession.accessToken;
        } else {
            return '';
        }
    }
    public getTokenType(): string {
        if (this.validateSession()) {
            return this.userSession.tokenType;
        } else {
            return '';
        }
    }
    public getRefreshToken(): string {
        if (this.validateSession()) {
            return this.userSession.refreshToken;
        } else {
            return '';
        }
    }

    public getId(): string {
        if (this.validateSession()) {
            return this.userSession.id;
        } else {
            return '';
        }
    }

    public validateSession(): boolean {
        if (this.isSessionValied()) {
            return true;
        } else {
            this.redirectUtil.redirectToLogin();
            return false;
        }
    }

    get currentCaseLoad(): string {
        if (this.validateSession()) {
            return this.userSession.caseloadid;
        } else {
            return '';
        }
    }

    set currentCaseLoad(caseload: string) {
        if (this.validateSession()) {
            this.userSession.caseloadid = caseload;
            sessionStorage.setItem('UserInfo', JSON.stringify(this.userSession));
            this.caseloadChangedSubject.next(this.currentCaseLoad);
        }
    }

    get caseLoadIdObservable(): Observable<any> {
        return this.caseloadChangedSubject.asObservable();
    }


    get currentCaseLoadType(): string {
        if (this.validateSession()) {
            return this.userSession.caseLoadType;
        } else {
            return '';
        }
    }

    set currentCaseLoadType(caseloadType: string) {
        if (this.validateSession()) {
           this.userSession.caseLoadType = caseloadType;
           sessionStorage.setItem('UserInfo', JSON.stringify(this.userSession));
        }
    }

    getStaffDetail(): any {
        if (this.validateSession()) {
            return this.userSession.staff;
        } else {
            return new Object();
        }
    }

    get caseLoads(): CaseLoads[] {
        return this.innerCaseLoads;
    }

    set caseLoads(caseloads: CaseLoads[]) {
        this.innerCaseLoads = caseloads;
        this.nameSubject.next(this.currentCaseLoadName);
    }

    get currentCaseLoadName(): string {
        if (this.innerCaseLoads) {
            for (const caseload of this.innerCaseLoads) {
                if (caseload.caseloadId === this.currentCaseLoad) {
                    return caseload.description;
                }
            }
        }
        return '';
    }

    get caseLoadNameObservable(): Observable<any> {
        return this.nameSubject.asObservable();
    }

    get msgs(): any[] {
        if (this.innerMsgs) {
            const msgs = [...this.innerMsgs];
            this.innerMsgs.splice(0, this.innerMsgs.length);
            return msgs;
        } else {
            return [];
        }
    }

    addMessage(msg: any) {
        this.innerMsgs.push(msg);
    }

    get userRoles(): any {
        return this.innerUserRoles;
    }

    set userRoles(roles: any) {
        this.innerUserRoles = roles;
    }

    public getLang(): string {
        if (this.validateSession()) {
            return this.userSession.lang;
        } else {
            return '';
        }
    }
    set setLang(lang: string) {
        if (this.validateSession()) {
            this.userSession.lang = lang;
            sessionStorage.setItem('UserInfo', JSON.stringify(this.userSession));
        }
    }
    get userRoutes(): any {
        if (this.validateSession()) {
            if (this.innerUserRoles.roles) {
                return this.innerUserRoles.roles;
            } else {
                return {};
            }
        } else {
            return {};
        }
    }

    get caseLoadAgencies(): any {
        return this.innerCaseLoadAgencies;
    }

    set caseLoadAgencies(caseLoadAgencies: any) {
        this.innerCaseLoadAgencies = caseLoadAgencies;
    }
    get randomid(): number {
        if (this.validateSession()) {
            return this.userSession.randomid;
        }
    }
    
    get adRedirectUrl() : any{
        return this._adRedirectUrl;
    }
    
    set adRedirectUrl(adRedirectUri) {
        this._adRedirectUrl = adRedirectUri;
    }

    userSessionDetails(): UserSession {
        return this.userSession;
    }
}
