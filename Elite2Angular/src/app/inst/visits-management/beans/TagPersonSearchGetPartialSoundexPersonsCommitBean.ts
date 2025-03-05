	export class TagPersonSearchGetPartialSoundexPersonsCommitBean {
		 private _deleteList: number;
		 private _serialVersionUID: number;
		 private _insertList: number;
		 private _updateList: number;

		 get deleteList(): number{ return  this._deleteList }

		 set deleteList(pdeleteList: number){ this._deleteList = pdeleteList }

		 get serialVersionUID(): number{ return  this._serialVersionUID }

		 set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID }

		 get insertList(): number{ return  this._insertList }

		 set insertList(pinsertList: number){ this._insertList = pinsertList }

		 get updateList(): number{ return  this._updateList }

		 set updateList(pupdateList: number){ this._updateList = pupdateList }


 	toJSON(): any {
 		return { 
			'deleteList': this._deleteList,
			'serialVersionUID': this._serialVersionUID,
			'insertList': this._insertList,
			'updateList': this._updateList,
 			};
 		}  
 }