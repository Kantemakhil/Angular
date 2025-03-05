import { BaseModel } from "@common/beans/BaseModel";
import { OffenderObservationTypes } from "./OffenderObservationTypes";
import { OffObsCharacteristics } from "./OffObsCharacteristics";

export class OffObsCharacteristicsCommitBean extends BaseModel {
    private _insertList: Array<OffObsCharacteristics>;
    private _deleteList: Array<OffObsCharacteristics>;
    private _updateList: Array<OffObsCharacteristics>;
    private _observationCheckDetailTypeBean: OffenderObservationTypes = new OffenderObservationTypes();
    
    get insertList(): Array<OffObsCharacteristics> { return this._insertList; }

    set insertList( pinsertList: Array<OffObsCharacteristics> ) { this._insertList = pinsertList; }

    get deleteList(): Array<OffObsCharacteristics> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffObsCharacteristics> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffObsCharacteristics> { return this._updateList; }

    set updateList( pupdateList: Array<OffObsCharacteristics> ) { this._updateList = pupdateList; }

    public get observationCheckDetailTypeBean(): OffenderObservationTypes {
        return this._observationCheckDetailTypeBean;
    }
    public set observationCheckDetailTypeBean(value: OffenderObservationTypes) {
        this._observationCheckDetailTypeBean = value;
    }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'observationCheckDetailTypeBean': this._observationCheckDetailTypeBean
        };
    }
}
