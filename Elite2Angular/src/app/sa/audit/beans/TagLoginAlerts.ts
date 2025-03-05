export class TagLoginAlerts {
    private _logDate: Date;
    private _ipAddress: string;
    private _host: string;
    private _dbUser: string;
    private _osUser: string;
    private _tool: string;
    private _logTime: Date;

    get logDate(): Date { return this._logDate; }
    set logDate(plogDate: Date) { this._logDate = plogDate ;}
    get ipAddress(): string { return this._ipAddress; }
    set ipAddress(pipAddress: string) { this._ipAddress = pipAddress ;}
    get host(): string { return this._host; }
    set host(phost: string) { this._host = phost ;}
    get dbUser(): string { return this._dbUser; }
    set dbUser(pdbUser: string) { this._dbUser = pdbUser ;}
    get osUser(): string { return this._osUser; }
    set osUser(posUser: string) { this._osUser = posUser ;}
    get tool(): string { return this._tool; }
    set tool(ptool: string) { this._tool = ptool ;}
    get logTime(): Date { return this._logTime; }
    set logTime(plogTime: Date) { this._logTime = plogTime ;}

toJSON(): any {
    return { 
       'logDate': this._logDate,
       'ipAddress': this._ipAddress,
       'host': this._host,
       'dbUser': this._dbUser,
       'osUser': this._osUser,
       'tool': this._tool,
       'logTime': this._logTime,
        };
    }




}