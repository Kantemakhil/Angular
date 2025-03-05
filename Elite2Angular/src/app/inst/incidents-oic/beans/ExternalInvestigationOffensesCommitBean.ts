

import {BaseModel} from '@commonbeans/BaseModel';
import { ExternalInvestigationOffenses } from './ExternalInvestigationOffenses';

export class ExternalInvestigationOffensesCommitBean extends  BaseModel {

    private _insertList: Array<ExternalInvestigationOffenses>;
    private _deleteList: Array<ExternalInvestigationOffenses>;
    private _updateList: Array<ExternalInvestigationOffenses>;

      get insertList(): Array<ExternalInvestigationOffenses> { return this._insertList; }

    set insertList(pinsertList: Array<ExternalInvestigationOffenses>){ this._insertList = pinsertList; }

    get deleteList(): Array<ExternalInvestigationOffenses> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ExternalInvestigationOffenses>){ this._deleteList = pdeleteList; }

    get updateList(): Array<ExternalInvestigationOffenses> { return this._updateList; }

    set updateList(pupdateList: Array<ExternalInvestigationOffenses>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
   
}