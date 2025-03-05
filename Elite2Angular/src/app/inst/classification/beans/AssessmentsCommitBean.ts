import { BaseModel } from '@commonbeans/BaseModel';
import { Assessments } from './Assessments';
import { OffenderAssessments } from './OffenderAssessments';
// import { Assessments } from '@inst/classification/beans/Assessments';
// import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';

export class AssessmentsCommitBean extends BaseModel {

    private _insertList: Array<Assessments>;
    private _deleteList: Array<Assessments>;
    private _updateList: Array<Assessments>;
    private _assesList: Array<Assessments>;
    private _assesQuestList: Array<Assessments>;
    private _assesAnsList: Array<Assessments>;
    private _offAssesModel: OffenderAssessments;
    private _enforceFlag: Boolean;
    
    get insertList(): Array<Assessments> { return this._insertList; }

    set insertList(pinsertList: Array<Assessments>) { this._insertList = pinsertList; }

    get deleteList(): Array<Assessments> { return this._deleteList; }

    set deleteList(pdeleteList: Array<Assessments>) { this._deleteList = pdeleteList; }

    get updateList(): Array<Assessments> { return this._updateList; }

    set updateList(pupdateList: Array<Assessments>) { this._updateList = pupdateList; }
    
    get assesList(): Array<Assessments> { return this._assesList; }

    set assesList(passesList: Array<Assessments>) { this._assesList = passesList; }
    
    get assesQuestList(): Array<Assessments> { return this._assesQuestList; }

    set assesQuestList(passesQuestList: Array<Assessments>) { this._assesQuestList = passesQuestList; }
    
    get assesAnsList(): Array<Assessments> { return this._assesAnsList; }

    set assesAnsList(passesAnsList: Array<Assessments>) { this._assesAnsList = passesAnsList; }
    
    get offAssesModel(): OffenderAssessments { return this._offAssesModel; }

    set offAssesModel(poffAssesModel: OffenderAssessments) { this._offAssesModel = poffAssesModel; }

     get enforceFlag(): Boolean {  return this._enforceFlag; }
     
     set enforceFlag(value: Boolean) { this._enforceFlag = value; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'assesList': this._assesList,
            'assesQuestList': this._assesQuestList,
            'assesAnsList': this._assesAnsList,
            'offAssesModel': this._offAssesModel,
            'enforceFlag':this._enforceFlag,
        };
    }
}
