import {BaseModel} from '@commonbeans/BaseModel'; 
import { ReportableIncedentDetails } from '@instincidentsbeans/ReportableIncedentDetails';

export class ReportableIncedentDetailsCommitBean extends BaseModel {

    private _insertList: Array<ReportableIncedentDetails>;
    private _deleteList: Array<ReportableIncedentDetails>;
    private _updateList: Array<ReportableIncedentDetails>;

    get insertList(): Array<ReportableIncedentDetails> { return this._insertList; }

    set insertList(pinsertList: Array<ReportableIncedentDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<ReportableIncedentDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ReportableIncedentDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ReportableIncedentDetails> { return this._updateList; }

    set updateList(pupdateList: Array<ReportableIncedentDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
