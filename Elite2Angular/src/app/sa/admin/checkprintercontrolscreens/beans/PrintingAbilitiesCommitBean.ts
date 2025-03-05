import { BaseModel } from '@commonbeans/BaseModel';
import { PrintingAbilities } from '@sa/admin/checkprintercontrolscreens/beans/PrintingAbilities';
export class PrintingAbilitiesCommitBean  extends BaseModel {
    private _insertList: Array<PrintingAbilities>;
    private _deleteList: Array<PrintingAbilities>;
    private _updateList: Array<PrintingAbilities>;

    get insertList(): Array<PrintingAbilities> { return this._insertList; }

    set insertList(pinsertList: Array<PrintingAbilities>) { this._insertList = pinsertList; }

    get deleteList(): Array<PrintingAbilities> { return this._deleteList; }

    set deleteList(pdeleteList: Array<PrintingAbilities>) { this._deleteList = pdeleteList; }

    get updateList(): Array<PrintingAbilities> { return this._updateList; }

    set updateList(pupdateList: Array<PrintingAbilities>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}