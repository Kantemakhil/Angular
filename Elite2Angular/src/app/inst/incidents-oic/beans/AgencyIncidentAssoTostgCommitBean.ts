import { BaseModel } from '@commonbeans/BaseModel';
import { AgencyIncidentAssoTostg } from '@instincidentsbeans/AgencyIncidentAssoTostg';

export class AgencyIncidentAssoTostgCommitBean extends BaseModel {

    private _insertList: Array<AgencyIncidentAssoTostg>;
    private _deleteList: Array<AgencyIncidentAssoTostg>;
    private _updateList: Array<AgencyIncidentAssoTostg>;

    get insertList(): Array<AgencyIncidentAssoTostg> { return this._insertList; }

    set insertList( pinsertList: Array<AgencyIncidentAssoTostg> ) { this._insertList = pinsertList;}

    get deleteList(): Array<AgencyIncidentAssoTostg> { return this._deleteList; }

    set deleteList( pdeleteList: Array<AgencyIncidentAssoTostg> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<AgencyIncidentAssoTostg> { return this._updateList; }

    set updateList( pupdateList: Array<AgencyIncidentAssoTostg> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
