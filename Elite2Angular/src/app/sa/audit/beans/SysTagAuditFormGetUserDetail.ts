export class SysTagAuditFormGetUserDetail {
    private _pTableName: string;
    private _toTime: Date;
    private _fromTime: Date;
    private _fromDate: Date;
    private _toDate: Date;
    private _stamp: Date;
    private _sessionId: number;
    private _osUsername: string;
    private _dbUser: string;
    private _clientHost: string;
    private _staffName: string;
    private _userName: string;
    private _userId: string;
    private _time: Date;


    get userId(): string { return this._userId; }
    set userId(puserId: string) { this._userId = puserId; }
    get userName(): string { return this._userName; }
    set userName(puserName: string) { this._userName = puserName; }
    get staffName(): string { return this._staffName; }
    set staffName(pstaffName: string) { this._staffName = pstaffName; }
    get pTableName(): string { return this._pTableName; }
    set pTableName(ppTableName: string) { this._pTableName = ppTableName; }
    get toTime(): Date { return this._toTime; }
    set toTime(ptoTime: Date) { this._toTime = ptoTime; }
    get fromTime(): Date { return this._fromTime; }
    set fromTime(pfromTime: Date) { this._fromTime = pfromTime; }
    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }
    get toDate(): Date { return this._toDate; }
    set toDate(ptoDate: Date) { this._toDate = ptoDate; }
    get time(): Date { return this._time; }
    set time(ptime: Date) { this._time = ptime; }

    get stamp(): Date { return this._stamp; }
    set stamp(pstamp: Date) { this._stamp = pstamp; }
    get sessionId(): number { return this._sessionId; }
    set sessionId(psessionId: number) { this._sessionId = psessionId; }
    get osUsername(): string { return this._osUsername; }
    set osUsername(posUsername: string) { this._osUsername = posUsername; }
    get dbUser(): string { return this._dbUser; }
    set dbUser(pdbUser: string) { this._dbUser = pdbUser; }
    get clientHost(): string { return this._clientHost; }
    set clientHost(pclientHost: string) { this._clientHost = pclientHost; }

    toJSON(): any {
        return {
            'pTableName': this._pTableName,
            'toTime': this._toTime,
            'fromTime': this._fromTime,
            'fromDate': this._fromDate,
            'toDate': this._toDate,
            'clientHost': this._clientHost,
            'dbUser': this._dbUser,
            'osUsername': this._osUsername,
            'sessionId': this._sessionId,
            'stamp': this._stamp,
            'staffName': this._staffName,
            'userName':this._userName,
            'userId':this._userId,
            'time': this._time,
        }
    }


}