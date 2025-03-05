import { OffenderProceedings } from "@inst/legal/beans/OffenderProceedings";
import { VOffenderProceedingSents } from "@inst/legal/beans/VOffenderProceedingSents";

	export class OffenderProceedingsCommitBean {
		 
		private _deleteList: Array<OffenderProceedings>;
		private _insertList: Array<OffenderProceedings>;
		private _updateList: Array<OffenderProceedings>;
		private _vOffenderScheduleModel: VOffenderProceedingSents;

		public get deleteList(): Array<OffenderProceedings> { return this._deleteList; 	}
		public set deleteList(value: Array<OffenderProceedings>) { this._deleteList = value; }
		public get insertList(): Array<OffenderProceedings> {  return this._insertList; }
		public set insertList(value: Array<OffenderProceedings>) { 	this._insertList = value; 	}
		public get updateList(): Array<OffenderProceedings> { return this._updateList; 	}
		public set updateList(value: Array<OffenderProceedings>) { this._updateList = value; }

        public get vOffenderScheduleModel(): VOffenderProceedingSents { return this._vOffenderScheduleModel; 	}
		public set vOffenderScheduleModel(vOffenderScheduleModel: VOffenderProceedingSents)
		 { this._vOffenderScheduleModel = vOffenderScheduleModel; }


		/*  private _insertList: Array<OffenderSenetenceTerms>;
    private _deleteList: Array<OffenderSenetenceTerms>;
    private _updateList: Array<OffenderSenetenceTerms>;
 */
		

 	toJSON(): any {
 		return { 
			'deleteList': this._deleteList,
			'insertList': this._insertList,
			'updateList': this._updateList,
			'vOffenderScheduleModel': this._vOffenderScheduleModel,
 			};
 		}  
 }


 /* private _insertList: Array<OffenderSentencesHty>;
 private _deleteList: Array<OffenderSentencesHty>;
 private _updateList: Array<OffenderSentencesHty>;

 get insertList(): Array<OffenderSentencesHty> { return this._insertList; }

 set insertList( pinsertList: Array<OffenderSentencesHty> ) { this._insertList = pinsertList; }

 get deleteList(): Array<OffenderSentencesHty> { return this._deleteList; }

 set deleteList( pdeleteList: Array<OffenderSentencesHty> ) { this._deleteList = pdeleteList; }

 get updateList(): Array<OffenderSentencesHty> { return this._updateList; }

 set updateList( pupdateList: Array<OffenderSentencesHty> ) { this._updateList = pupdateList; }

 toJSON(): any {
	 return {
		 'insertList': this._insertList,
		 'deleteList': this._deleteList,
		 'updateList': this._updateList
	 };
 } */