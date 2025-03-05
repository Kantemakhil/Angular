import { ModuleTables } from "./ModuleTables";

export class ModuleTablesCommitBean {
    private _insertList: Array<ModuleTables>;
    private _deleteList: Array<ModuleTables>;
    private _updateList: Array<ModuleTables>;
    private _continueFlag: string;
    private _auditLog: any;


    get insertList(): Array<ModuleTables> { return this._insertList; }

    set insertList( pinsertList: Array<ModuleTables> ) { this._insertList = pinsertList; }

    get updateList(): Array<ModuleTables> { return this._updateList; }

    set updateList( pupdateList: Array<ModuleTables> ) { this._updateList = pupdateList; }

    get deleteList(): Array<ModuleTables> { return this._deleteList; }

    set deleteList( pdeleteList: Array<ModuleTables> ) { this._deleteList = pdeleteList; }

    get continueFlag(): string{ return this._continueFlag; }
    set continueFlag(pcontinueFlag: string){ this._continueFlag = pcontinueFlag ;}

    get auditLog(): any { return this._auditLog;  }
    set auditLog(value: any) { this._auditLog = value;   }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'continueFlag':this._continueFlag,
            'auditLog': this._auditLog
        };
    }
}