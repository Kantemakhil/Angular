import { OffenderSenetenceTerms } from "./OffenderSenetenceTerms";

export class OffenderSenetenceTermsCommitBean {
    private _insertList: Array<OffenderSenetenceTerms>;
    private _deleteList: Array<OffenderSenetenceTerms>;
    private _updateList: Array<OffenderSenetenceTerms>;

    get insertList(): Array<OffenderSenetenceTerms> { return this._insertList; }

    set insertList( pinsertList: Array<OffenderSenetenceTerms> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderSenetenceTerms> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffenderSenetenceTerms> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderSenetenceTerms> { return this._updateList; }

    set updateList( pupdateList: Array<OffenderSenetenceTerms> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}