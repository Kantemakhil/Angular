import { BaseModel } from "@common/beans/BaseModel";
import { EventMeasureOutcomes } from "./EventMeasureOutcomes";

export class EventMeasureOutcomesCommitBean extends BaseModel {
    private _deleteList: Array<EventMeasureOutcomes>;
		 private _serialVersionUID: number;
		 private _insertList: Array<EventMeasureOutcomes>;
		 private _updateList: Array<EventMeasureOutcomes>;

		 get deleteList(): Array<EventMeasureOutcomes>{ return this._deleteList; }
		 set deleteList(pdeleteList: Array<EventMeasureOutcomes>){ this._deleteList = pdeleteList ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get insertList(): Array<EventMeasureOutcomes>{ return this._insertList; }
		 set insertList(pinsertList: Array<EventMeasureOutcomes>){ this._insertList = pinsertList ;}
		 get updateList(): Array<EventMeasureOutcomes>{ return this._updateList; }
		 set updateList(pupdateList: Array<EventMeasureOutcomes>){ this._updateList = pupdateList ;}

 	toJSON(): any {
 		return { 
			'deleteList': this._deleteList,
			'serialVersionUID': this._serialVersionUID,
			'insertList': this._insertList,
			'updateList': this._updateList,
 			};
 		} 
}