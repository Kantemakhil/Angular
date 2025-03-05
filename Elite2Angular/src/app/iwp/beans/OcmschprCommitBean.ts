
import { CourseScheduleRulesCommitBean } from "@inst/institutional-activities/maintenance/beans/CourseScheduleRulesCommitBean";
import { CourseActivitiesCommitBean } from "@inst/institutional-activities/maintenance/beans/CourseActivitiesCommitBean";
import { VAcpSchedulesCommitBean } from "./VAcpSchedulesCommitBean";



export class OcmschprCommitBean {
    private _crsschedulerulCommitBean: CourseScheduleRulesCommitBean = new CourseScheduleRulesCommitBean();
    private _vacpscheduleCommitBean: VAcpSchedulesCommitBean = new VAcpSchedulesCommitBean();
    private _crsActCommitBean: CourseActivitiesCommitBean = new CourseActivitiesCommitBean();

    public get crsActCommitBean(): CourseActivitiesCommitBean {
        return this._crsActCommitBean;
    }
    public set crsActCommitBean(value: CourseActivitiesCommitBean) {
        this._crsActCommitBean = value;
    }
    public get vacpscheduleCommitBean(): VAcpSchedulesCommitBean {
        return this._vacpscheduleCommitBean;
    }
    public set vacpscheduleCommitBean(value: VAcpSchedulesCommitBean) {
        this._vacpscheduleCommitBean = value;
    }

    public get crsschedulerulCommitBean(): CourseScheduleRulesCommitBean {
        return this._crsschedulerulCommitBean;
    }
    public set crsschedulerulCommitBean(value: CourseScheduleRulesCommitBean) {
        this._crsschedulerulCommitBean = value;
    }

    

    

    toJSON(): any {
        return {
            'crsschedulerulCommitBean': this._crsschedulerulCommitBean,
            'vacpscheduleCommitBean': this._vacpscheduleCommitBean,
            'crsActCommitBean': this._crsActCommitBean
        };
    }

}