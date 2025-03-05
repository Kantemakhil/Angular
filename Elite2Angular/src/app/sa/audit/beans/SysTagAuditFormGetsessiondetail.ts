export class SysTagAuditFormGetsessiondetail {
    private _sessionid: number;
    private _scn: number;
    private _sqlText: string;
    private _statementType: string;
    private _sqlBind: string;
    private _policyName: string;
    private _objectName: string;
    private _actTimestamp: string;


    get sessionid(): number { return this._sessionid; }
    set sessionid(sessionid: number) { this._sessionid = sessionid; }
    get scn(): number { return this._scn; }
    set scn(scn: number) { this._scn = scn; }
    get sqlText(): string { return this._sqlText; }
    set sqlText(sqlText: string) { this._sqlText = sqlText; }
    get statementType(): string { return this._statementType; }
    set statementType(statementType: string) { this._statementType = statementType; }
    get sqlBind(): string { return this._sqlBind; }
    set sqlBind(sqlBind: string) { this._sqlBind = sqlBind; }
    get policyName(): string { return this._policyName; }
    set policyName(policyName: string) { this._policyName = policyName; }
    get objectName(): string { return this._objectName; }
    set objectName(objectName: string) { this._objectName = objectName; }
    get actTimestamp(): string { return this._actTimestamp; }
    set actTimestamp(actTimestamp: string) { this._actTimestamp = actTimestamp; }

toJSON(): any {
    return {
       'sessionid': this._sessionid,
       'scn': this._scn,
       'sqlText': this._sqlText,
       'statementType': this._statementType,
       'sqlBind': this._sqlBind,
       'policyName': this._policyName,
       'objectName': this._objectName,
       'actTimestamp': this._actTimestamp,
        };
    }
}
