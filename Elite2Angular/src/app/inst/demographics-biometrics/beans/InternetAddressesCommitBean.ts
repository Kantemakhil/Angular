import {BaseModel} from '@commonbeans/BaseModel';
import {InternetAddresses} from './InternetAddresses';
import { Work } from '@inst/workflow/maintenance/beans/Work';

export class InternetAddressesCommitBean extends BaseModel {

    private _insertList: Array<InternetAddresses>;
    private _deleteList: Array<InternetAddresses>;
    private _updateList: Array<InternetAddresses>;
    private _workupdateList: Array<Work>;
    private _workdeleteList: Array<Work>;

    get insertList(): Array<InternetAddresses> { return this._insertList; }

    set insertList(pinsertList: Array<InternetAddresses>) { this._insertList = pinsertList; }

    get deleteList(): Array<InternetAddresses> { return this._deleteList; }

    set deleteList(pdeleteList: Array<InternetAddresses>) { this._deleteList = pdeleteList; }

    get updateList(): Array<InternetAddresses> { return this._updateList; }

    set updateList(pupdateList: Array<InternetAddresses>) { this._updateList = pupdateList; }

    get workupdateList(): Array<Work> { return this._workupdateList; }

    set workupdateList(pworkupdateList: Array<Work>) { this._workupdateList = pworkupdateList; }

    get workdeleteList(): Array<Work> { return this._workdeleteList; }

    set workdeleteList(pworkdeleteList: Array<Work>) { this._workupdateList = pworkdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'workupdateList': this._workupdateList,
            'workdeleteList': this._workdeleteList
        };
    }
}
