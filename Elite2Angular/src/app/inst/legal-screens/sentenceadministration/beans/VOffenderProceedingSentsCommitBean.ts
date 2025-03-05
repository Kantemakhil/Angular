
import { VOffenderProceedingSents } from '@inst/legal/beans/VOffenderProceedingSents';
	export class VOffenderProceedingSentsCommitBean {
		 

		private _deleteList: Array<VOffenderProceedingSents>;
		private _insertList: Array<VOffenderProceedingSents>;
		private _updateList: Array<VOffenderProceedingSents>;
		public get updateList(): Array<VOffenderProceedingSents> {
			return this._updateList;
		}
		public set updateList(value: Array<VOffenderProceedingSents>) {
			this._updateList = value;
		}
		public get insertList(): Array<VOffenderProceedingSents> {
			return this._insertList;
		}
		public set insertList(value: Array<VOffenderProceedingSents>) {
			this._insertList = value;
		}
		public get deleteList(): Array<VOffenderProceedingSents> {
			return this._deleteList;
		}
		public set deleteList(value: Array<VOffenderProceedingSents>) {
			this._deleteList = value;
		}

 	toJSON(): any {
 		return { 
			'deleteList': this._deleteList,
			'insertList': this._insertList,
			'updateList': this._updateList,
 			};
 		}  
 }