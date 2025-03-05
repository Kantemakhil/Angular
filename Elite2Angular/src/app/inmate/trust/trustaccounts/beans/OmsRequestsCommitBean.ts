import { BaseModel } from '@commonbeans/BaseModel';
import { OmsRequests } from '@inmatetrustaccountsbeans/OmsRequests';

export class OmsRequestsCommitBean extends BaseModel {

    private _insertList: Array<OmsRequests>;
    private _deleteList: Array<OmsRequests>;
    private _updateList: Array<OmsRequests>;

    get insertList(): Array<OmsRequests> { return this._insertList; }

    set insertList( pinsertList: Array<OmsRequests> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OmsRequests> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OmsRequests> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OmsRequests> { return this._updateList; }

    set updateList( pupdateList: Array<OmsRequests> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
