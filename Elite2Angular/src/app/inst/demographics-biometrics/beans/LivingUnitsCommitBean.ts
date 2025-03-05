import { BaseModel } from '@commonbeans/BaseModel';
import { LivingUnits } from '@inst/demographics-biometrics/beans/LivingUnits';

export class LivingUnitsCommitBean extends BaseModel {
    private _insertList: Array<LivingUnits>;
    private _deleteList: Array<LivingUnits>;
    private _updateList: Array<LivingUnits>;
    private _housingLevel: number;

    public get housingLevel(): number {
        return this._housingLevel;
    }
    public set housingLevel(value: number) {
        this._housingLevel = value;
    }

    get insertList(): Array<LivingUnits> { return this._insertList; }

    set insertList(pinsertList: Array<LivingUnits>) { this._insertList = pinsertList; }

    get deleteList(): Array<LivingUnits> { return this._deleteList; }

    set deleteList(pdeleteList: Array<LivingUnits>) { this._deleteList = pdeleteList; }

    get updateList(): Array<LivingUnits> { return this._updateList; }

    set updateList(pupdateList: Array<LivingUnits>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'housingLevel':this._housingLevel
        };
    }
}
