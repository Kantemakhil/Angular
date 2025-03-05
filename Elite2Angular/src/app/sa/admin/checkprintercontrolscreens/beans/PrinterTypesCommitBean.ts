import { BaseModel } from '@commonbeans/BaseModel';
import { PrinterTypes } from '@sa/admin/checkprintercontrolscreens/beans/PrinterTypes';
export class PrinterTypesCommitBean  extends BaseModel {
    private _insertList: Array<PrinterTypes>;
    private _deleteList: Array<PrinterTypes>;
    private _updateList: Array<PrinterTypes>;

    get insertList(): Array<PrinterTypes> { return this._insertList; }

    set insertList(pinsertList: Array<PrinterTypes>) { this._insertList = pinsertList; }

    get deleteList(): Array<PrinterTypes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<PrinterTypes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<PrinterTypes> { return this._updateList; }

    set updateList(pupdateList: Array<PrinterTypes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}