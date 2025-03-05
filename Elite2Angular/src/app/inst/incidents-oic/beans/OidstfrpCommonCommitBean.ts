import {BaseModel} from '@commonbeans/BaseModel';
import { IncidentStaffReportCommitBean } from './InidentStaffReportCommitBean';
import { StaffEquipmentCommitBean } from './StaffEquipmentCommitBean';
import { StaffForceCommitBean } from './StaffForceCommitBean';

export class OidstfrpCommonCommitBean extends BaseModel {

    private _staffReportCommitList: IncidentStaffReportCommitBean = new IncidentStaffReportCommitBean();
    private _staffForceCommitList: StaffForceCommitBean = new StaffForceCommitBean();
    private _staffEquipmentCommitList: StaffEquipmentCommitBean = new StaffEquipmentCommitBean();

    get staffReportCommitList(): IncidentStaffReportCommitBean {
        return this._staffReportCommitList;
    }
    set staffReportCommitList(value: IncidentStaffReportCommitBean) {
        this._staffReportCommitList = value;
    }
    get staffForceCommitList(): StaffForceCommitBean {
        return this._staffForceCommitList;
    }
    set staffForceCommitList(value: StaffForceCommitBean) {
        this._staffForceCommitList = value;
    }
    get staffEquipmentCommitList(): StaffEquipmentCommitBean {
        return this._staffEquipmentCommitList;
    }
    set staffEquipmentCommitList(value: StaffEquipmentCommitBean) {
        this._staffEquipmentCommitList = value;
    }

    toJSON(): any {
        return {
            'staffReportCommitList' : this._staffReportCommitList,
            'staffForceCommitList' : this._staffForceCommitList,
            'staffEquipmentCommitList' : this._staffEquipmentCommitList
        }
    }

}