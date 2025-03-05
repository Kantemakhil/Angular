import { BaseModel } from "@common/beans/BaseModel";
import { CourseScheduleStaffsCommitBean } from "@inst/institutional-activities/maintenance/beans/CourseScheduleStaffsCommitBean";
import { CourseSchedules } from "@inst/institutional-activities/maintenance/beans/CourseSchedules";
import { OffenderCourseAttendancesCommitBean } from "./OffenderCourseAttendancesCommitBean";

	export class OcdpatteCommitBean extends BaseModel {

		 private _crsSchCommitBean: CourseScheduleStaffsCommitBean;
		 private _deliveryDetailsModel: CourseSchedules;
		 private _offCrsCommitBean: OffenderCourseAttendancesCommitBean;

		 
		 get crsSchCommitBean(): CourseScheduleStaffsCommitBean{ return this._crsSchCommitBean; }
		 set crsSchCommitBean(pcrsSchCommitBean: CourseScheduleStaffsCommitBean){ this._crsSchCommitBean = pcrsSchCommitBean ;}
		 get deliveryDetailsModel(): CourseSchedules{ return this._deliveryDetailsModel; }
		 set deliveryDetailsModel(pdeliveryDetailsModel: CourseSchedules){ this._deliveryDetailsModel = pdeliveryDetailsModel ;}
		 get offCrsCommitBean(): OffenderCourseAttendancesCommitBean{ return this._offCrsCommitBean; }
		 set offCrsCommitBean(poffCrsCommitBean: OffenderCourseAttendancesCommitBean){ this._offCrsCommitBean = poffCrsCommitBean ;}

 	toJSON(): any {
 		return { 
			'crsSchCommitBean': this._crsSchCommitBean,
			'deliveryDetailsModel': this._deliveryDetailsModel,
			'offCrsCommitBean': this._offCrsCommitBean,
 			};
 		} 
 }