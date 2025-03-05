import { OffenderSentenceAdjustment } from '@inst/legal/beans/OffenderSentenceAdjustment';
import { BaseModel } from '@commonbeans/BaseModel';
	export class OffenderSentenceAdjustmentCommitBean extends BaseModel {
		private _insertList: Array<OffenderSentenceAdjustment>;
		private _deleteList: Array<OffenderSentenceAdjustment>;
		private _updateList: Array<OffenderSentenceAdjustment>;
		private _calcReason: string;
		private _offenderBookId: number;
		public get insertList(): Array<OffenderSentenceAdjustment> {
			return this._insertList;
		}
	
		public set insertList(value: Array<OffenderSentenceAdjustment>) {
			this._insertList = value;
		}
		public get deleteList(): Array<OffenderSentenceAdjustment> {
			return this._deleteList;
		}
		public set deleteList(value: Array<OffenderSentenceAdjustment>) {
			this._deleteList = value;
		}
		public get updateList(): Array<OffenderSentenceAdjustment> {
			return this._updateList;
		}
		public set updateList(value: Array<OffenderSentenceAdjustment>) {
			this._updateList = value;
		}
		public get calcReason(): string {
			return this._calcReason;
		}
		public set calcReason(value: string) {
			this._calcReason = value;
		}
		public get offenderBookId(): number {
			return this._offenderBookId;
		}
		public set offenderBookId(value: number) {
			this._offenderBookId = value;
		}

		toJSON(): any {
			return {
				'insertList': this._insertList,
				'deleteList': this._deleteList,
				'updateList': this._updateList,
				'calcReason': this._calcReason,
				'offenderBookId': this._offenderBookId
			};
		}
 }