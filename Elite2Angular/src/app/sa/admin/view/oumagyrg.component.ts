import {
      Component, OnInit,

      ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AgencyLocations } from '../beans/AgencyLocations';
import { AgencyLocationsCommitBean } from '../beans/AgencyLocationsCommitBean';
import { OumagyrgService } from '../service/oumagyrg.service';


@Component({
      selector: 'app-oumagyrg',
      templateUrl: './oumagyrg.component.html'
})

export class OumagyrgComponent implements OnInit {
      // Variable declaration
      @ViewChild('grid') grid: any;
      msgs: any[] = [];
      agylocData: AgencyLocations[] = [];
      agylocDataTemp: AgencyLocations[] = [];
      agylocModel: AgencyLocations = new AgencyLocations();
      agylocModelTemp: AgencyLocations = new AgencyLocations();
      agylocInsertList: AgencyLocations[] = [];
      agylocUpdatetList: AgencyLocations[] = [];
      agylocDeleteList: AgencyLocations[] = [];
      editable = true;
      agyLocColumnDef: any[];
      subAreaLink: any;
      agylocCommitModel: AgencyLocationsCommitBean = new AgencyLocationsCommitBean();
      nomsRegionCode: string;
      areaCode: string;
      subAreaCode: string;
      geographicRegionCode: string;
      areaLink: any;
      disableSearchFields: boolean;
      type: string;
      message: string;
      msglist: any[];
      tableIndex = -1;
      agyLocIdSearch: string;
      descriptionSearch: string;
      agencyLocationTypeSearch: string;
      regionSearch: string;
      geographicSearch: string;
      areaCodeReadonlyData: boolean;
      subareaCodeReadonlyData: boolean;
      retrievedisabled: boolean;
      clearDisabled: boolean;
      regionreadonly: boolean;
      georeadonly: boolean;
      enableUpdate = false;
      regionLinkTitles = {
            'code': this.translateService.translate('common.code'),
            'description': this.translateService.translate('common.description')
      };
      areaLinkTitles = {
            'code': this.translateService.translate('common.code'),
            'description': this.translateService.translate('common.description')
      };
      subAreLinkTitles = {
            'code': this.translateService.translate('common.code'),
            'description': this.translateService.translate('common.description')
      };
      geographicLinkTitles = {
            'code': this.translateService.translate('common.code'),
            'description': this.translateService.translate('common.description')
      };
      agencyTypeLinkTitles = {
            'code': this.translateService.translate('common.code'),
            'description': this.translateService.translate('common.description')
      };
      regionLink: string;
      level1Code: any;
      saveDisabled: boolean;
      regionProfile: string;
      createDatetime: any;
      regionCode: string;
      parentArea: string;
      agyLocType: string;
      subAreaType: string;
      parentSubAreaCode: any;
      parentSubAreaType: any;
      subAreaFlag: boolean;
      areaFlag: boolean;
      lovFlag: number;
      changedFlag: number;
      subAreaRgRecordGroupTot = [];
      areaRgRecordGroupTot = [{"areaType":'',areaCode:""}];
      constructor(private oumagyrgFactory: OumagyrgService, public translateService: TranslateService,
            public sessionManager: UserSessionManager) {
            this.agyLocColumnDef = [];
      }
      ngOnInit() {
            this.agyLocType = this.agylocModel.agencyLocationType +  '-' + this.agylocModel.nomsRegionCode;
            this.subAreaType = this.agylocModel.agencyLocationType +  '-' + this.agylocModel.areaCode;
            this.agyLocColumnDef = [
                  {
                        fieldName: this.translateService.translate('common.codemandatory'), field: 'agyLocId',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('common.locationdescription') + '*', field: 'description',
                        editable: false, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('oumagyrg.agencytype'), field: 'agencyLocationType',
                        editable: false, width: 150, datatype: 'lov',  domain: 'AGY_LOC_TYPE'
                  },

                  {
                        fieldName: this.translateService.translate('system-profile.off-id-code') + ' ' +
                        this.translateService.translate('oumagyrg.region'), field: 'nomsRegionCode', titles: this.regionLinkTitles,
                        editable: true, width: 150, datatype: 'lov',  link: 'oumagyrg/nomsRegionRgRecordGroup',source:'OUMRAREA'
                  },

                  {
                        fieldName: this.translateService.translate('oumagyrg.area'), field: 'areaCode',
                        editable: true, width: 150, datatype: 'lov', parentField: 'parentAreaCode', titles: this.areaLinkTitles,
                         link: 'oumagyrg/areaRgRecordGroup?parentAreaCode=', cellEditable: this.canCellEdit,source:'OUMRAREA'

                  },
                  {
                        fieldName: '', field: 'parentAreaCode', hide: true,
                  },
                  {
                        fieldName: this.translateService.translate('oumagyrg.subArea'), field: 'subAreaCode',
                        editable: true, width: 150, datatype: 'lov', parentField: 'parentSubAreaType', titles: this.subAreLinkTitles,
                        link: 'oumagyrg/subAreaRgRecordGroup?parentSubAreaType=', cellEditable: this.canSubAreaEdit,source:'OUMRAREA'

                  },
                  {
                        fieldName: '', field: 'parentSubAreaType', hide: true,
                  },
                  {
                        fieldName: this.translateService.translate('oumagyrg.geographicRegion'), field: 'geographicRegionCode',
                        editable: true, width: 150, datatype: 'lov', domain : 'GEOGRAPHIC', titles: this.geographicLinkTitles

                  },


                  {
                        fieldName: '', field: 'hideValue', hide: true,
                  },
                  {
                        fieldName: '', field: 'parentArea', hide: true,
                  },
            ];
            this.agylocExecuteQuery();
             this.oumagyrgFactory.subAreaRgRecordGroupTot().subscribe(data => {

                  data.forEach(element => {
                        this.subAreaRgRecordGroupTot.push(element.code);
                  });
            });

            this.agylocExecuteQuery();
            this.oumagyrgFactory.areaRgRecordGroupTot().subscribe(data => {
                 data.forEach(element => {
                  var obj:any={}
                  obj.areaType=element.areaType;
                  obj.areaCode=element.code;
                       this.areaRgRecordGroupTot.push(obj);
                 });
           });
      }

      show(vldmsg, type?) {
            type = type ? type : 'warn';
            vldmsg = this.translateService.translate(vldmsg);
            const msgval = [{ message: vldmsg, type: type }];
            this.msgs = [...msgval];
      }

      canCellEdit = (data: any, index: number, field: string) : boolean => {
            // this.agyLocType = this.agylocModel.agencyLocationType + '-' + this.agylocModel.nomsRegionCode;
            //             const agylocResult = this.oumagyrgFactory.areaRgRecordGroup(this.agyLocType);
            //             agylocResult.subscribe(data => {
            //                   if (data.length === 0) {
            //                         this.areaFlag = true;
            //                   } else {
            //                         this.areaFlag = false;
            //                   }
            //             });
            var response=false;
            this.areaRgRecordGroupTot.forEach(element => {
                  if(element.areaCode===data.nomsRegionCode && element.areaType===data.agencyLocationType){
                        response=true;
                  }
            });
            return response;
      }
      canSubAreaEdit = (data: any, index: number, field: string) : boolean => {
            // this.subAreaType = this.agylocModel.agencyLocationType + '-' + this.agylocModel.areaCode;
            // const agylocResult = this.oumagyrgFactory.subAreaRgRecordGroup(this.subAreaType);
            //             agylocResult.subscribe(data => {
            //                   if (data.length === 0) {
            //                         this.subAreaFlag = true;
            //                   } else {
            //                         this.subAreaFlag = false;
            //                   }
            //             });
                        if (this.subAreaRgRecordGroupTot.indexOf(data.areaCode) !== -1) {
                              return true;
                        } else {
                        return false;
                        }
      }

      validateRowData = (event) => {
            const rowdata = new ValidateRowReturn();
            const rowIndex = event.rowIndex;
            if (event.field === 'nomsRegionCode') {
                  if (event.data.agencyLocationType && event.data.nomsRegionCode) {
                        this.grid.setColumnData('parentAreaCode', rowIndex,
                              event.data.agencyLocationType + '-' + event.data.nomsRegionCode);
                        this.agyLocType = this.agylocModel.agencyLocationType + '-' + this.agylocModel.nomsRegionCode;
                        const agylocResult = this.oumagyrgFactory.areaRgRecordGroup(this.agyLocType);
                        agylocResult.subscribe(data => {
                              if (data.length === 0) {
                                    this.areaFlag = true;
                              } else {
                                    this.areaFlag = false;
                              }
                        });
                        this.grid.setColumnData('areaCode', rowIndex, undefined);
                        this.grid.setColumnData('subAreaCode', rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;
                  }
            }
            if (event.field === 'areaCode') {
                  if (event.data.agencyLocationType && event.data.areaCode) {
                        this.grid.setColumnData('parentSubAreaType', rowIndex, event.data.agencyLocationType + '-' + event.data.areaCode);
                        this.subAreaType = this.agylocModel.agencyLocationType + '-' + this.agylocModel.areaCode;
                        const agylocResult = this.oumagyrgFactory.subAreaRgRecordGroup(this.subAreaType);
                        agylocResult.subscribe(data => {
                              if (data.length === 0) {
                                    this.subAreaFlag = true;
                              } else {
                                    this.subAreaFlag = false;
                              }
                        });
                        this.grid.setColumnData('subAreaCode', rowIndex, undefined);
                        rowdata.validated = true;
                        return rowdata;
                  }
            }
            rowdata.validated = true;
            return rowdata;

      }
      agylocExecuteQuery() {
            const agylocResult = this.oumagyrgFactory.agyLocExecuteQuery(this.agylocModel);
            agylocResult.subscribe(agylocResultList => {
                  if (agylocResultList.length === 0) {
                        this.agylocData = [];
                        this.show('common.querycaused');
                        return;
                  } else {
                        agylocResultList.forEach(element => {
                              element.parentAreaCode = element.agencyLocationType + '-' + element.nomsRegionCode;
                              element.parentSubAreaType = element.agencyLocationType + '-' + element.areaCode;
                        });
                        this.agylocData = agylocResultList;
                        this.agylocModel = agylocResultList[0];
                        this.tableIndex = 0;
                  }
            });
      }

      oumagyrgValidations() {
            const is = { valid: true };
            if (!this.agylocModel.agyLocId) {
                  this.show(this.translateService.translate('common.codemustbeentered'));
                  is.valid = false;
                  return;
            }
            if (!this.agylocModel.description) {
                  this.show(this.translateService.translate('oumagyrg.locationdescriptionmustbeentered'));
                  is.valid = false;
                  return;
            }
            return is.valid;
      }



      oumagyrgSaveagylocForm(event) {
            if (!this.oumagyrgValidations()) {
                  return;
            }
            this.agylocInsertList = event.added;
            this.agylocUpdatetList = event.updated;
            this.agylocDeleteList = event.removed;
            this.agylocCommitModel.insertList = [];
            this.agylocCommitModel.updateList = [];
            this.agylocUpdatetList.push(this.agylocModel);
            this.agylocCommitModel.updateList = this.agylocUpdatetList;
            if (this.agylocUpdatetList.length > 0) {
                  const agylocSaveData = this.oumagyrgFactory.agyLocCommit(this.agylocCommitModel);
                  agylocSaveData.subscribe(data => {
                        if (data === 1) {
                              this.show('common.addupdateremoverecordsuccess', 'success');
                              this.agylocExecuteQuery();
                              return;
                        } else {
                              this.show('common.addupdateremoverecordfailed');
                              this.agylocExecuteQuery();
                              return;
                        }
                  });
            }

      }
      onRowClickalert(event) {
            if (event) {
                  this.agylocModel = event;
            }

      }

}

