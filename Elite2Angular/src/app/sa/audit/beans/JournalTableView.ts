export class JournalTableView {

    private _fromDate: Date;
        private _status: string;
        private _tableName: string;
        private _serialVersionUID: number;

        get status(): string{ return this._status; }
        set status(status: string){ this._status = status ;}
        get tableName(): string{ return this._tableName; }
        set tableName(tableName: string){ this._tableName = tableName ;}
        get serialVersionUID(): number{ return this._serialVersionUID; }
        set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}

    toJSON(): any {
        return { 
           'status': this._status,
           'tableName': this._tableName,
           'serialVersionUID': this._serialVersionUID,
            };
        }
}