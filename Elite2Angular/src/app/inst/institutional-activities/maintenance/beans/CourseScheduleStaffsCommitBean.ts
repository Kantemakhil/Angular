import { CourseScheduleStaff } from '@cm/programsservices/beans/CourseScheduleStaff';

	export class CourseScheduleStaffsCommitBean {
		private _insertList: Array<CourseScheduleStaff>;
		private _deleteList: Array<CourseScheduleStaff>;
		private _updateList: Array<CourseScheduleStaff>;


		get insertList(): Array<CourseScheduleStaff> { return this._insertList; }

	set insertList(pinsertList: Array<CourseScheduleStaff>){ this._insertList = pinsertList; }

	get deleteList(): Array<CourseScheduleStaff> { return this._deleteList; }

	set deleteList(pdeleteList: Array<CourseScheduleStaff>){ this._deleteList = pdeleteList; }

	get updateList(): Array<CourseScheduleStaff> { return this._updateList; }

	set updateList(pupdateList: Array<CourseScheduleStaff>){ this._updateList = pupdateList; }


	toJSON(): any {
		return {
			'insertList': this._insertList,
			'deleteList': this._deleteList,
			'updateList': this._updateList,
            
		};
 }
}
