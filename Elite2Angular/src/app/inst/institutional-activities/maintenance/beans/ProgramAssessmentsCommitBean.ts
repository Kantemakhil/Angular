import { ProgramAssessments } from "./ProgramAssessments";



   export class ProgramAssessmentsCommitBean {
       private _deleteList: Array<ProgramAssessments>;
       private _serialVersionUID: number;
       private _insertList: Array<ProgramAssessments>;
       private _updateList: Array<ProgramAssessments>;
       

       get deleteList(): Array<ProgramAssessments> { return  this._deleteList; }

       set deleteList(pdeleteList: Array<ProgramAssessments>) { this._deleteList = pdeleteList; }

       get serialVersionUID(): number { return  this._serialVersionUID; }

       set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

       get insertList(): Array<ProgramAssessments> { return  this._insertList; }

       set insertList(pinsertList: Array<ProgramAssessments>) { this._insertList = pinsertList; }

       get updateList(): Array<ProgramAssessments> { return  this._updateList; }

       set updateList(pupdateList: Array<ProgramAssessments>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'serialVersionUID': this._serialVersionUID,
         'insertList': this._insertList,
         'updateList': this._updateList,
          };
       }
 }
