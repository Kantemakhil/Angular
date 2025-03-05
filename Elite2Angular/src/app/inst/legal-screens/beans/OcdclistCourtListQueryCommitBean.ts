
import { OcdclistCourtListQuery } from '@instlegalscreensbeans/OcdclistCourtListQuery';

export class OcdclistCourtListQueryCommitBean {
    private _insertList: Array<OcdclistCourtListQuery>;
    private _deleteList: Array<OcdclistCourtListQuery>;
    private _updateList: Array<OcdclistCourtListQuery>;

    get insertList(): Array<OcdclistCourtListQuery> { return this._insertList; }

    set insertList( pinsertList: Array<OcdclistCourtListQuery> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OcdclistCourtListQuery> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OcdclistCourtListQuery> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OcdclistCourtListQuery> { return this._updateList; }

    set updateList( pupdateList: Array<OcdclistCourtListQuery> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

 }