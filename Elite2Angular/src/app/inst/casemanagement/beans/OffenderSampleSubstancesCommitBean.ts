import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderSampleSubstances } from '@instCaseManagementbeans/OffenderSampleSubstances';
import { OffenderSamples } from './OffenderSamples';

export class OffenderSampleSubstancesCommitBean extends BaseModel {

    private _insertList: Array<OffenderSampleSubstances>;
    private _deleteList: Array<OffenderSampleSubstances>;
    private _updateList: Array<OffenderSampleSubstances>;
    private _offenderSamples: OffenderSamples; 
    

    get insertList(): Array<OffenderSampleSubstances> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderSampleSubstances>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderSampleSubstances> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderSampleSubstances>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderSampleSubstances> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderSampleSubstances>) { this._updateList = pupdateList; }

    public get offenderSamples(): OffenderSamples {  return this._offenderSamples;}

    public set offenderSamples(value: OffenderSamples) {  this._offenderSamples = value;    }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'offenderSamples':this._offenderSamples
        };
    }
}
