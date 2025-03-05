import { CourtMovementTmp } from "@inst/movements/housingchanges/beans/CourtMovementTmp";

	export class CourtMovementTmpCommitBean {
		private _insertList: Array<CourtMovementTmp>;
		private _deleteList: Array<CourtMovementTmp>;
		private _updateList: Array<CourtMovementTmp>;
	
		get insertList(): Array<CourtMovementTmp> { return this._insertList; }
	
		set insertList( pinsertList: Array<CourtMovementTmp> ) { this._insertList = pinsertList; }
	
		get deleteList(): Array<CourtMovementTmp> { return this._deleteList; }
	
		set deleteList( pdeleteList: Array<CourtMovementTmp> ) { this._deleteList = pdeleteList; }
	
		get updateList(): Array<CourtMovementTmp> { return this._updateList; }
	
		set updateList( pupdateList: Array<CourtMovementTmp> ) { this._updateList = pupdateList; }
	
		toJSON(): any {
			return {
				'insertList': this._insertList,
				'deleteList': this._deleteList,
				'updateList': this._updateList
			};
		}
	}