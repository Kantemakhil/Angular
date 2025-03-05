import { OffenderMailLog } from "./OffenderMailLog";


export class OffenderMailLogCommitBean {
    private _insertList: Array<OffenderMailLog>;
    private _updateList: Array<OffenderMailLog>;
    private _deleteList: Array<OffenderMailLog>;

    get insertList(): Array<OffenderMailLog> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderMailLog> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderMailLog> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderMailLog> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<OffenderMailLog> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderMailLog> ) { this._deleteList = pdeleteList; }
    

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList':this._deleteList,
        };
    }
}