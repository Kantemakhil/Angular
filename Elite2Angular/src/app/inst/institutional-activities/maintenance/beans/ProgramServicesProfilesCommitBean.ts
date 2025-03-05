import { ProgramServicesProfiles } from "./ProgramServicesProfiles";




   export class ProgramServicesProfilesCommitBean {
       private _deleteList: Array<ProgramServicesProfiles>;
       private _serialVersionUID: number;
       private _insertList: Array<ProgramServicesProfiles>;
       private _updateList: Array<ProgramServicesProfiles>;

       get deleteList(): Array<ProgramServicesProfiles> { return  this._deleteList; }

       set deleteList(pdeleteList: Array<ProgramServicesProfiles>) { this._deleteList = pdeleteList; }

       get serialVersionUID(): number { return  this._serialVersionUID; }

       set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

       get insertList(): Array<ProgramServicesProfiles> { return  this._insertList; }

       set insertList(pinsertList: Array<ProgramServicesProfiles>) { this._insertList = pinsertList; }

       get updateList(): Array<ProgramServicesProfiles> { return  this._updateList; }

       set updateList(pupdateList: Array<ProgramServicesProfiles>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'serialVersionUID': this._serialVersionUID,
         'insertList': this._insertList,
         'updateList': this._updateList,
          };
       }
 }
