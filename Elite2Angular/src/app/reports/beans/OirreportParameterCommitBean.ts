import { BaseModel } from '@common/beans/BaseModel';
import { OmsModuleParameters } from '@inmate/trust/financialreports/beans/OmsModuleParameters';

export class OirreportParameterCommitBean extends BaseModel {
    private _insertList: Array<OmsModuleParameters>;
    private _deleteList: Array<OmsModuleParameters>;
    private _updateList: Array<OmsModuleParameters>;

    get insertList(): Array<OmsModuleParameters> { return this._insertList; }

    set insertList( pinsertList: Array<OmsModuleParameters> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OmsModuleParameters> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OmsModuleParameters> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OmsModuleParameters> { return this._updateList; }

    set updateList( pupdateList: Array<OmsModuleParameters> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
