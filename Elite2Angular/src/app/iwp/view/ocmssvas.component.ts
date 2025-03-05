import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OcmssvasService } from '../service/ocmssvas.service';
import { CourseActivityAreas } from '@cm/programsservices/maintenance/beans/CourseActivityAreas';
import { CourseActivityAreasCommitBean } from '@cm/programsservices/maintenance/beans/CourseActivityAreasCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';

@Component({
    selector: 'app-ocmssvas',
    templateUrl: './ocmssvas.component.html'
})

export class OcmssvasComponent implements OnInit {
    enableDelete: boolean;
    cactaCommitModel: CourseActivityAreasCommitBean = new CourseActivityAreasCommitBean();
    msgs: any[] = [];
    cactaData: any[] = [];
    cactaDataTemp: CourseActivityAreas[] = [];
    cactaModel: CourseActivityAreas = new CourseActivityAreas();
    cactaIndex = 0;
    cactaInsertList: CourseActivityAreas[] = [];
    cactaUpdatetList: CourseActivityAreas[] = [];
    cactaDeleteList: CourseActivityAreas[] = [];
    @ViewChild('dialog', { static: true }) dialog: any;
    @ViewChild('grid', { static: true }) grid: any;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    cActAColumnDef: any[];
    tasksColumnDef: any[];
    ctrlReadOnly = false;
    tasksReadOnly = false;
    cActAReadOnly = false;
    rgareaclassRg: any[] = [];
    rgarearegionRg: any[] = [];
    msglist: any[];
    message: any;
    type: any;
    cactainsertList: CourseActivityAreas[] = [];
    cactaupdateList: CourseActivityAreas[] = [];
    cactadeleteList: CourseActivityAreas[] = [];
    caseLoadType: string;
    rgAreaRegion: string;
    areaClass = '';
    locationLink: string;
    nbtAreaCode: any;
    nbtAreaType: string;
    crsActyId: number;
    selectOne = -1;
    constructor(
        private ocmssvasFactory: OcmssvasService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.cActAColumnDef = [];
        this.tasksColumnDef = [];
    }
    ngOnInit() {
        this.crsActyId = this.dialog.data.crsActyId;
        this.caseLoadType = this.sessionManager.currentCaseLoadType;
        this.cActAColumnDef = [
            {
                fieldName: this.translateService.translate('ocmssvas.type'), domain:'AREA_CLASS',field: 'areaClass', cellEditable: this.canAssesCodeEdit,
                editable: true, width: 150, datatype: 'lov',
                 
            },
            {
                fieldName: this.translateService.translate('ocmssvas.area'), parentField: 'areaClass', cellEditable: this.canAssesCodeEdit,
                field: 'areaCode', editable: true, width: 150, datatype: 'lov',source:'OUMRAREA',
                link: 'ocmssvas/rgAreaRegionRecordGroup?caseLoadType=' + this.sessionManager.currentCaseLoadType + '&nbtAreaType='
            },
        ];
        this.cactaExecuteQuery();
    }
    /**
       * This function displays the messages
       */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
     * This function will be executed  cactaExecuteQuery event fired
     */
    cactaExecuteQuery() {
        this.cactaModel.crsActyId = this.dialog.data && this.dialog.data.crsActyId;
        this.cactaModel.caseLoadType = this.caseLoadType;
        const cactaResult = this.ocmssvasFactory.cActAExecuteQuery(this.cactaModel);
        cactaResult.subscribe(cactaResultList => {
            if (cactaResultList.length === 0) {
                this.cactaData = [];
            } else {
                this.cactaData = cactaResultList;
                this.cactaModel = cactaResultList[0];
                this.cactaData.forEach(element => {
                    element.nbtAreaType = element.areaClass;
                    // this.crsActyId = element.crsActyId;
                    this.selectOne = 0;
                    this.enableDelete = true;

                });
            }
        });
    }
    /**
     *  This function will be executed  onAssessGridInsert event fired
     */
    onAssessGridInsert = () => {
        if (!this.ocmssvasValidations()) {
            return;
        }
        return {};
    }
    /**
         *   This function will be executed  canAssesCodeEdit event fired
         */

    canAssesCodeEdit = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime) {
            return false;
        }
        if (field === 'areaCode' && !data.areaClass) {
            return false;
        }

        return true;
    }
    /**
         *    This function will be executed EVENT fired
         */
    onRowClickcacta(event) {
        if (event) {
            this.cactaModel = event;
            this.enableDelete = true;
        } else {
            this.cactaData = [];
            this.cactaModel = new CourseActivityAreas();
            this.enableDelete = false;
        }
    }
    /**
     *   This function will be executed EVENT fired
     */
    cancel() {
        this.dialog.close(null);
    }
    /**
       *  This function will be executed to validate the mandetory fields in Regions grid
       * fired
       */
    ocmssvasValidations() {
        const is = { valid: true };
        this.cactaData.forEach(data => {
            if (is.valid) {
                if (!data.areaClass) {
                    this.show('ocmssvas.typeMustValid', 'warn');
                    is.valid = false;
                    return;
                }
                if (!data.areaCode) {
                    this.show('ocmssvas.areaMustMsg', 'warn');
                    is.valid = false;
                    return;
                }
                for (let x = 0; x < this.cactaData.length; x++) {
                    for (let y = 0; y < this.cactaData.length; y++) {
                      if (x !== y) {
                        if ((this.cactaData[x].areaClass ===
                          this.cactaData[y].areaClass) &&
                          (this.cactaData[x].areaCode ===
                            this.cactaData[y].areaCode)) {
                          this.message = this.translateService.translate('ocmssvas.alreadyExists');
                          this.message = String(this.message).replace('%contactType%', this.cactaData[x].areaClass);
                          this.message = String(this.message).replace('%relationshipType%', this.cactaData[x].areaCode);
                          this.show(this.message, 'warn');
                          is.valid = false;
                          return;
                        }
                      }
                    }
                  }
            }
        });
        return is.valid;
    }
    /**
       *  This function will be executed when commit event is
       * fired
       */
    ocmssvasSavecactaForm(event) {
        if (!this.ocmssvasValidations()) {
            return;
        }
        this.cactaInsertList = event.added;
        this.cactaUpdatetList = event.updated;
        this.cactaDeleteList = event.removed;
        this.cactaCommitModel.insertList = [];
        this.cactaCommitModel.updateList = [];
        this.cactaCommitModel.deleteList = [];
        if (this.cactaInsertList.length > 0 || this.cactaUpdatetList.length > 0) {
            for (let i = 0; i < this.cactaInsertList.length; i++) {
                this.cactaInsertList[i].createDatetime = DateFormat.getDate();
                this.cactaInsertList[i].modifyDatetime = DateFormat.getDate();
                this.cactaInsertList[i].crsActyId = this.crsActyId;
                this.cactaCommitModel.insertList = this.cactaInsertList;
            }
            for (let i = 0; i < this.cactaUpdatetList.length; i++) {
                this.cactaInsertList[i].modifyDatetime = DateFormat.getDate();
                this.cactaCommitModel.updateList = this.cactaUpdatetList;
            }
        }
        if (this.cactaDeleteList.length > 0) {
            // for (let i = 0; i < this.cactaDeleteList.length; i++) {
                this.cactaCommitModel.deleteList = this.cactaDeleteList;
            // }
        }
        const cactaSaveData = this.ocmssvasFactory.cActACommit(this.cactaCommitModel);
        cactaSaveData.subscribe(data => {

            if (data && data.sealFlag === '1') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.cactaExecuteQuery();
           return;
         } else if (data && data.sealFlag && data.seqOne === 2292) {
                this.message = this.translateService.translate('common.recordcannotbedeletedmodified');
                this.message = String(this.message).replace('%tablename%', data.sealFlag);
                this.show(this.message, 'warn');
                this.cactaExecuteQuery();
                return;
              } else if (data && data.sealFlag && data.seqOne === 2291) {
                this.message = this.translateService.translate('common.recordcannotbedeletedparent');
                this.message = String(this.message).replace('%tablename%', data.sealFlag);
                this.show(this.message, 'warn');
                this.cactaExecuteQuery();
                return;
               } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.cactaExecuteQuery();
                return;
               }
        });
    }
    /**
     *    This function will be executed EVENT fired
     */
    onGridInsert = () => {
        this.enableDelete = false;
        if (!this.ocmssvasValidations()) {
            return false;
        }
        return {};
    }
    /**
     *  This function will be executed EVENT fired
     *
     */
    validateRowData = (event) => {
        const rowIndex = this.cactaData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'areaClass' && event.newValue !== event.oldValue) {
            this.grid.setColumnData('areaCode', rowIndex, undefined);
        }
        rowdata.validated = true;
        return rowdata;
      }
      onOffdedDelete = () => {
        return true;
      }

      onGridClear = () => {
        this.cactaExecuteQuery();
        return true;
      }
}
