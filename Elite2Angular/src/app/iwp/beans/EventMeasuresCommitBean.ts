import { BaseModel } from "@common/beans/BaseModel";
import { EventMeasures } from "./EventMeasures";

export class EventMeasuresCommitBean extends BaseModel{
    private _deleteList: Array<EventMeasures>;
		 private _serialVersionUID: number;
		 private _insertList: Array<EventMeasures>;
		 private _updateList: Array<EventMeasures>;

		 get deleteList(): Array<EventMeasures>{ return this._deleteList; }
		 set deleteList(pdeleteList: Array<EventMeasures>){ this._deleteList = pdeleteList ;}
		 get serialVersionUID(): number{ return this._serialVersionUID; }
		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
		 get insertList(): Array<EventMeasures>{ return this._insertList; }
		 set insertList(pinsertList: Array<EventMeasures>){ this._insertList = pinsertList ;}
		 get updateList(): Array<EventMeasures>{ return this._updateList; }
		 set updateList(pupdateList: Array<EventMeasures>){ this._updateList = pupdateList ;}

 	toJSON(): any {
 		return { 
			'deleteList': this._deleteList,
			'serialVersionUID': this._serialVersionUID,
			'insertList': this._insertList,
			'updateList': this._updateList,
 			};
 		}
}