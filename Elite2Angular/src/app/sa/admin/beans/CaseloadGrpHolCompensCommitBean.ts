import { BaseModel } from "@common/beans/BaseModel";
import { CaseloadGrpHolCompens } from "./CaseloadGrpHolCompens";

export class CaseloadGrpHolCompensCommitBean extends BaseModel {
    
		private _serialVersionUID: number;
		private _deleteList: Array<CaseloadGrpHolCompens>;
    	private _insertList: Array<CaseloadGrpHolCompens>;
		private _updateList: Array<CaseloadGrpHolCompens>;

		get serialVersionUID(): number { return  this._serialVersionUID; }
    	set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
		 get deleteList(): Array<CaseloadGrpHolCompens>{ return this._deleteList; }
		 set deleteList(pdeleteList: Array<CaseloadGrpHolCompens>){ this._deleteList = pdeleteList ;}
		 get insertList(): Array<CaseloadGrpHolCompens>{ return this._insertList; }
		 set insertList(pinsertList: Array<CaseloadGrpHolCompens>){ this._insertList = pinsertList ;}
		 get updateList(): Array<CaseloadGrpHolCompens>{ return this._updateList; }
		 set updateList(pupdateList: Array<CaseloadGrpHolCompens>){ this._updateList = pupdateList ;}

 	toJSON(): any {
 		return { 
			'deleteList': this._deleteList,
			'serialVersionUID': this._serialVersionUID,
			'insertList': this._insertList,
			'updateList': this._updateList,
 			};
 		} 
}