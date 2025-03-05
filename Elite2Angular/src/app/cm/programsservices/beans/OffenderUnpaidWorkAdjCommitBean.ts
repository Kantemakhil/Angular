import { OffenderUnpaidWorkAdj } from "./OffenderUnpaidWorkAdj";

	export class OffenderUnpaidWorkAdjCommitBean {
		private _insertList: Array<OffenderUnpaidWorkAdj>;
		private _deleteList: Array<OffenderUnpaidWorkAdj>;
		private _updateList: Array<OffenderUnpaidWorkAdj>;
		
		
		
		public get insertList(): Array<OffenderUnpaidWorkAdj> {
			return this._insertList;
		}
		public set insertList(value: Array<OffenderUnpaidWorkAdj>) {
			this._insertList = value;
		}
		public get deleteList(): Array<OffenderUnpaidWorkAdj> {
			return this._deleteList;
		}
		public set deleteList(value: Array<OffenderUnpaidWorkAdj>) {
			this._deleteList = value;
		}

		
		public get updateList(): Array<OffenderUnpaidWorkAdj> {
			return this._updateList;
		}
		public set updateList(value: Array<OffenderUnpaidWorkAdj>) {
			this._updateList = value;
		}

		 

 	toJSON(): any {
 		return { 
			'deleteList': this._deleteList,
			'insertList': this._insertList,
			'updateList': this._updateList,
 			};
 		}  
 }