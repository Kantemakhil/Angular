import {
      Component,
      OnInit
} from '@angular/core';
import { Routes } from '../beans/Routes';
import { RouteStopDetails } from '../beans/RouteStopDetails'
import { TranslateService } from '@common/translate/translate.service';
import { OimrouteService } from '../service/oimroute.service';
import { RoutesCommitBean } from '../beans/RoutesCommitBean';
import { RouteStopDetailsCommitBean } from '../beans/RouteStopDetailsCommitBean';
import { element } from 'protractor';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';

@Component({
      selector: 'app-oimroute',
      templateUrl: './oimroute.component.html'
})

export class OimrouteComponent implements OnInit {
      paneTitle1: any;
      routeData: Routes[] = [];
      stopdetData: RouteStopDetails[] = [];
      feeddetData: any[] = [];
      routeColumnDef: any[];
      stopdetColumnDef: any[];
      feeddetColumnDef: any[];
      rowIndex : number;
      routedatamodel: Routes;
      routemodeldata: Routes[] = [];
      routestopdatamodel: RouteStopDetails;
      msglist: any[];
      msgs: any[] = [];
      routesInsertList: Routes[] = [];
      routesUpdateList: Routes[] = [];
      routestopdetailsInsertList: RouteStopDetails[] = [];
      routestopdetailsUpdateList: RouteStopDetails[] = [];
      stopdetinsert: Boolean = true;
      type: string;
      message: string;
      routesCommitModel: RoutesCommitBean = new RoutesCommitBean();
      routestopdetailsCommitModel: RouteStopDetailsCommitBean = new RouteStopDetailsCommitBean();
      indexVal: number;

      constructor(public translateService: TranslateService, public oimrouteService: OimrouteService) { }
      ngOnInit() {
            this.paneTitle1 = this.translateService.translate('oimroute.title');
            this.routeColumnDef = [
                  {
                        fieldName: this.translateService.translate('oimroute.routename'), field: 'routeName',
                        editable: true, datatype: 'text', required: true, cellEditable: this.canAlertEdit,maxlength: 12,strictFP: true,
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.descrip'), field: 'description',
                        editable: true, datatype: 'text', required: true,maxlength: 40
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.stops'), field: 'noStops', datatype: 'Number', editable: false
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.startlocation'), field: 'startAgyLocId',
                        datatype: 'text', editable: false
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.stoplocation'), field: 'stopAgyLocId'
                        , datatype: 'text', editable: false
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.active'), field: 'activeFlag', datatype: 'checkbox',
                        editable: false
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.ExpDate'), field: 'expiryDate', datatype: 'date',
                        editable: false
                  },
            ];
            this.stopdetColumnDef = [
                  {
                        fieldName: this.translateService.translate('oimroute.leg'), field: 'legId',
                        editable: true, datatype: 'number', required: true, cellEditable: this.canAlertEdit,maxlength: '5',
                        minValue: '1',strictFP: true, maxValue: '99999'
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.seq'), field: 'legSeq',
                        editable: true, datatype: 'number', required: true, cellEditable: this.canAlertEdit,maxlength: '5',
                        minValue: '0',strictFP: true, whole: true,maxValue: '99999'
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.aglocid'), field: 'agyLocId', required: true,
                        editable: true, link: 'oimroute/rgAgyLocRecordGroup', datatype: 'lov', cellEditable: this.canAlertEdit,source: 'OUMAGLOC'
                  },
                  {
                        fieldName: this.translateService.translate("oimroute.countflag"), field: 'countFlag', datatype: 'checkbox',
                        editable: false
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.intakelocflag'), field: 'intakeLocFlag', datatype: 'checkbox',
                        editable: false
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.overnightcountflag'), field: 'overnightFlag', datatype: 'checkbox',
                        editable: false
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.active'), field: 'activeFlag', datatype: 'checkbox',
                        editable: true
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.ExpDate'), field: 'expiryDate', datatype: 'date',
                        editable: false
                  },
            ];
            this.feeddetColumnDef = [
                  {
                        fieldName: this.translateService.translate('oimroute.aglocid'), field: 'feedAgyLocId',
                        editable: true, datatype: 'text'
                  },
                  {
                        fieldName: this.translateService.translate('oimroute.descrip'), field: 'description',
                        editable: true, datatype: 'text'
                  },
            ]

            this.getrouteExecuteQuery();
      }
      getrouteExecuteQuery() {
            const data = this.oimrouteService.getrouteExecuteQuery();
            data.subscribe(response => {
                  if (response && response.length > 0) {
                        if (response.field = 'activeFlag') {
                              response.forEach(element => {
                                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                              })
                              this.routeData = response
                        }
                  }
            })
      }


      onRowClickroute(event) {
            this.routedatamodel = event;
            this.routestopdetailsexecuteQuery();
      }
      onRowClickstopdet(event) {
            this.routestopdatamodel = event;
           // this.agylocfeeddetailsExecuteQuery();
      }
      insertData = () => {
            return true;
      }
      oimrouteRouteSave(event) {
            this.routesInsertList = event.added
            this.routesUpdateList = event.updated
            this.routesCommitModel.insertList = [];
            this.routesCommitModel.updateList = [];
            if (this.routesInsertList.length > 0) {
                  for (let i = 0; i < this.routesInsertList.length; i++) {
                        this.routesInsertList[i].activeFlag = this.routesInsertList[i].activeFlag ? 'Y' : 'N';
                        let dupListroute = this.routeData.filter(x =>
                              (this.routesInsertList[i].routeName === x.routeName));
                        if (dupListroute.length > 1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.rowalreadyexists');
                              this.show();
                              this.onclear;
                              return;

                        }
                  }
                  this.routesCommitModel.insertList = this.routesInsertList;
            }

            if (this.routesUpdateList.length > 0) {
                  for (let i = 0; i < this.routesUpdateList.length; i++) {
                        this.routesUpdateList[i].activeFlag = this.routesUpdateList[i].activeFlag ? 'Y' : 'N';
                  }
                  this.routesCommitModel.updateList = this.routesUpdateList;
            }

            const routesSaveData = this.oimrouteService.routesCommit(this.routesCommitModel);
            routesSaveData.subscribe(data => {
                  if (data === 1) {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        this.getrouteExecuteQuery();
                  } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                        this.getrouteExecuteQuery();
                  }
            });
            this.stopdetinsert = true;
      }
      routestopdetailsexecuteQuery() {
            const data = this.oimrouteService.getroutestopdetailsExecuteQuery(this.routedatamodel);
            data.subscribe(response => {
                  if (response && response.length > 0) {

                        response.forEach(element => {
                              element.activeFlag = element.activeFlag === 'Y' ? true : false;
                              element.countFlag = element.countFlag === 'Y' ? true : false;
                              element.intakeLocFlag = element.intakeLocFlag === 'Y' ? true : false;
                              element.overnightFlag = element.overnightFlag === 'Y' ? true : false;
                        })
                        this.stopdetData = response;
                  }
                  else {
                        this.stopdetData = [];
                  }
            });
      }
      oimroutesaverouteandroutestopdetails(routestopdetails) {
            const routestopdetailsSaveData = this.oimrouteService.routestopdetailsCommit(routestopdetails);
            routestopdetailsSaveData.subscribe(data => {
                  if (data === 1) {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        return;
                  } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                        return;
                  }
            });

      }

      oimrouteSaveroutestopdetailsForm(event) {
            this.rowIndex = this.stopdetData.indexOf(event.data);
            this.routestopdetailsInsertList = event.added
            this.routestopdetailsUpdateList = event.updated
            this.routestopdetailsCommitModel.insertList = [];
            this.routestopdetailsCommitModel.updateList = [];
            if (this.routestopdetailsInsertList.length > 0) {
                  for (let i = 0; i < this.routestopdetailsInsertList.length; i++) {
                        if(this.routestopdetailsInsertList[i].legId<=0){
                              this.type = 'warn';
                              this.message = this.translateService.translate('oimroute.minvaluevaidation');
                              this.show();
                              return; 
                        }


                        this.routestopdetailsInsertList[i].activeFlag = this.routestopdetailsInsertList[i].activeFlag ? 'Y' : 'N';
                        this.routestopdetailsInsertList[i].routeName = this.routedatamodel.routeName;

                        let dupList = this.stopdetData.filter(x => x &&
                              ((Number(this.routestopdetailsInsertList[i].legId) === Number(x.legId) && Number(this.routestopdetailsInsertList[i].legSeq) === Number(x.legSeq) && this.routestopdetailsInsertList[i].agyLocId === x.agyLocId)));
                        if (dupList.length > 1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('common.rowalreadyexists');
                              this.show();
                              return;
                        }
                        let dupListLegIdLegseq = this.stopdetData.filter(x => x &&
                              ((Number(this.routestopdetailsInsertList[i].legId) === Number(x.legId) && Number(this.routestopdetailsInsertList[i].legSeq) === Number(x.legSeq))));
                        if (dupListLegIdLegseq.length > 1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oimroute.duplegandseq');
                              this.show();
                              return;
                        }
                  }
                  this.routestopdetailsCommitModel.insertList = this.routestopdetailsInsertList;
            }
            if (this.routestopdetailsUpdateList.length > 0) {
                  for (let i = 0; i < this.routestopdetailsUpdateList.length; i++) {

                        this.routestopdetailsUpdateList[i].activeFlag = this.routestopdetailsUpdateList[i].activeFlag ? 'Y' : 'N';
                        this.routestopdetailsUpdateList[i].routeName = this.routedatamodel.routeName;

                        let dupList = this.stopdetData.filter(x => x &&  
                              ((Number(this.routestopdetailsUpdateList[i].legId) === Number(x.legId) && Number(this.routestopdetailsUpdateList[i].legSeq) === Number(x.legSeq) && this.routestopdetailsUpdateList[i].agyLocId === x.agyLocId)));
                        if (dupList.length > 1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oimroute.duplegandseq');
                              this.show();
                              return;
                        }
                        let dupListLegIdLegseq = this.stopdetData.filter(x => x &&  
                              ((Number(this.routestopdetailsUpdateList[i].legId) === Number(x.legId) && Number(this.routestopdetailsUpdateList[i].legSeq) === Number(x.legSeq))));
                        if (dupListLegIdLegseq.length > 1) {
                              this.type = 'warn';
                              this.message = this.translateService.translate('oimroute.duplegandseq');
                              this.show();
                              return;
                        }
                  }
                  this.routestopdetailsCommitModel.updateList = this.routestopdetailsUpdateList;
            }
            const routestopdetailsSaveData = this.oimrouteService.routestopdetailsCommit(this.routestopdetailsCommitModel);
            routestopdetailsSaveData.subscribe(data => {
                  if (data === 1) {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        this.routestopdetailsexecuteQuery();
                        this.getrouteExecuteQuery();
                  } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                        this.routestopdetailsexecuteQuery();
                   this.getrouteExecuteQuery();
                  }
            });
      }
      agylocfeeddetailsExecuteQuery() {
            const data = this.oimrouteService.getfeeddetailsExecuteQuery(this.routestopdatamodel);
            data.subscribe(response => {
                  if (response && response.length > 0) {
                        this.feeddetData = response;
                  }
            })

      }
      show() {
            this.msglist = [];
            this.msglist.push({ message: this.message, type: this.type });
            this.msgs = [...this.msglist];
      }
      expDateGenerator = (event) => {
            const rowdata = new ValidateRowReturn();

            if (event.data.activeFlag == false) {
                  rowdata.data = { expiryDate: new Date() }
            }
            else {
                  rowdata.data = { expiryDate: null }
            }

            rowdata.validated = true;
            return rowdata;
      }

      expDateGeneratorRouteStopDet = (event) => {
            const rowdata = new ValidateRowReturn();
            if (event.field === 'activeFlag') {
                  if (!event.newValue) {
                        rowdata.data = { expiryDate: new Date() }
                  } else {
                        rowdata.data = { expiryDate: null }
                  }
            }
            rowdata.validated = true;
            return rowdata;
      }
      addProp = () => {
            this.stopdetinsert = false;
            return { activeFlag: true, expiryDate: null, isNewRow: true };
      }
      addProp1 = () => {
            return { activeFlag: true, expiryDate: null, isNewRow: true, };
      }
      onclear = () => {
            this.stopdetinsert = true;
            return true;
      }


      canAlertEdit = (data: any, index: number, field: any): boolean => {
            if (!data.createDatetime) {
                  return true;
            } else {
                  return false;
            }
      }
}
