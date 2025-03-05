import { BaseModel } from '@commonbeans/BaseModel';
import { OtmtfproFmbBean } from '@inmate/trust/deductions/deductionsmaintenance/beans/OtmtfproFmbBean';

export class OtmtfproFmbBeanCommitBean extends BaseModel {

    private _insertList: Array<OtmtfproFmbBean>;
    private _deleteList: Array<OtmtfproFmbBean>;
    private _updateList: Array<OtmtfproFmbBean>;

    get insertList(): Array<OtmtfproFmbBean> { return this._insertList; }

    set insertList(pinsertList: Array<OtmtfproFmbBean>) { this._insertList = pinsertList; }

    get deleteList(): Array<OtmtfproFmbBean> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OtmtfproFmbBean>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OtmtfproFmbBean> { return this._updateList; }

    set updateList(pupdateList: Array<OtmtfproFmbBean>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
