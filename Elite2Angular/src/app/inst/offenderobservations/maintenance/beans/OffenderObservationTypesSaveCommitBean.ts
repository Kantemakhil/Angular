import {BaseModel} from '@commonbeans/BaseModel';
import { OffenderObservationTypesCommitBean } from './OffenderObservationTypesCommitBean';
import { OffObsCharacteristicsCommitBean } from './OffObsCharacteristicsCommitBean';

export class OffenderObservationTypesSaveCommitBean extends BaseModel {

    private _offednerObservationCommitList: OffenderObservationTypesCommitBean = new OffenderObservationTypesCommitBean();
    private _offednerObservationDetailCommitList: OffObsCharacteristicsCommitBean = new OffObsCharacteristicsCommitBean();
   

    get offednerObservationCommitList(): OffenderObservationTypesCommitBean {
        return this._offednerObservationCommitList;
    }
    set offednerObservationCommitList(value: OffenderObservationTypesCommitBean) {
        this._offednerObservationCommitList = value;
    }
    get offednerObservationDetailCommitList(): OffObsCharacteristicsCommitBean {
        return this._offednerObservationDetailCommitList;
    }
    set offednerObservationDetailCommitList(value: OffObsCharacteristicsCommitBean) {
        this._offednerObservationDetailCommitList = value;
    }
    
    toJSON(): any {
        return {
            'offednerObservationCommitList' : this._offednerObservationCommitList,
             'staffForceCommitList' : this._offednerObservationDetailCommitList,
           
        }
    }

}