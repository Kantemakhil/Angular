import {BaseModel} from '@commonbeans/BaseModel';;
import {SignificantIncident} from '@instincidentsbeans/SignificantIncident';

export class SignificantIncidentCommitBean extends BaseModel {

    private _insertList: Array<SignificantIncident>;
    private _deleteList: Array<SignificantIncident>;
    private _updateList: Array<SignificantIncident>;

    get insertList(): Array<SignificantIncident> { return this._insertList; }

    set insertList(pinsertList: Array<SignificantIncident>){ this._insertList = pinsertList; }

    get deleteList(): Array<SignificantIncident> { return this._deleteList; }

    set deleteList(pdeleteList: Array<SignificantIncident>){ this._deleteList = pdeleteList; }

    get updateList(): Array<SignificantIncident> { return this._updateList; }

    set updateList(pupdateList: Array<SignificantIncident>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}