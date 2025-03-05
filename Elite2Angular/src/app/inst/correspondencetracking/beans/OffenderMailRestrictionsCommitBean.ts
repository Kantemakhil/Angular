import { OffenderMailRestrictions } from "./OffenderMailRestrictions";

export class OffenderMailRestrictionsCommitBean {
    private _insertList: Array<OffenderMailRestrictions>;
    private _updateList: Array<OffenderMailRestrictions>;
    private _deleteList: Array<OffenderMailRestrictions>;

    get insertList(): Array<OffenderMailRestrictions> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderMailRestrictions> ) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderMailRestrictions> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderMailRestrictions> ) { this._updateList = pupdateList; }
    
    get deleteList(): Array<OffenderMailRestrictions> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderMailRestrictions> ) { this._deleteList = pdeleteList; }
    

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList':this._deleteList,
        };
    }
}