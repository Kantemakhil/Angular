import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiidmoveService } from '../service/oiidmove.service';
import { VOffExtMovements } from '@inst/movement-external/beans/VOffExtMovements';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

// import required bean declarations

@Component({
    selector: 'app-oiidmove',
    templateUrl: './oiidmove.component.html',
    styleUrls: [],
})

export class OiidmoveComponent implements OnInit {
    msgs: any[] = [];
    offemData : any[] = [];
    offemModel : VOffExtMovements = new VOffExtMovements();
    offEmColumnDef : any[];
    reasonMap: Map<string, string> = new Map();
    reasonCodeMap: Map<string, string> = new Map();
    typeMap: Map<string, string> = new Map();
    typeCodeMap: Map<string, string> = new Map();
    isEditable: boolean;
    movementTypeDesc: string;
    movementReasonCodeDesc: string;
    clearFlag: boolean;
    retrieveFlag: boolean;
    commonFlag: boolean;
    @ViewChild('grid') grid: any;
    @ViewChild('oiidmoveForm', {static: true}) form: any;
    constructor(private oiidmoveFactory: OiidmoveService,
                public translateService: TranslateService,
                public dialogService: DialogService) {
    this.offEmColumnDef = [];
     }

    ngOnInit() {
    this.offEmColumnDef = [
        { fieldName: this.translateService.translate('common.date'), field: 'movementDate', datatype: 'date',
        editable: true, cellEditable: this.canEdit, width: 150},
        { fieldName: this.translateService.translate('common.time'), field: 'movementTime', datatype: 'time', editable: true,
            cellEditable: this.canEdit, width: 100},
            { fieldName: this.translateService.translate('common.type'), field: 'movementType', datatype: 'lov',
            domain:'MOVE_TYPE'/*link: 'oiidmove/cgfkOffEmMovementTypeRecordGroup'*/,
             descTitle: 'Type', codeTitle: 'Description' , editable: true,
             cellEditable: this.canEdit, width: 150},
            { fieldName: this.translateService.translate('common.reason'), field: 'movementReasonCode', datatype: 'lov' ,
            domain:'MOVE_RSN'/*link: 'oiidmove/cgfkOffEmMovementReasonCoRecordGroup'*/, descTitle: 'Reason', codeTitle: 'Description' , editable: true,
            cellEditable: this.canEdit, width: 150},
        { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: true,
        cellEditable: this.canEdit, width: 300},
        { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: true,
        cellEditable: this.canEdit, width: 150},
        { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: true, width: 150},
        { fieldName: this.translateService.translate('oiidmove.s'), field: 'activeFlag', editable: false, width: 80},
        { fieldName: this.translateService.translate('oiidmove.dir'), field: 'directionCode', editable: true,
            cellEditable: this.canEdit, width: 150},
        { fieldName: this.translateService.translate('common.from'), field: 'fromAgyLocDesc', editable: false, width: 150},
        { fieldName: this.translateService.translate('common.to'), field: 'toAgyLocDesc', editable: false, width: 150},
    ];
    var currentDate = DateFormat.getDate(DateFormat.getDate(new Date()).setHours(0, 0, 0, 0));
    var priorDate = new Date(new Date().setDate(currentDate.getDate() - 90));
    this.offemModel.fromMovementDate = DateFormat.getDate(DateFormat.getDate(priorDate).setHours(0, 0, 0, 0));
    this.offemModel.toMovementDate = currentDate;
    this.offemExecuteQuery();
    this.getTypeData();
    this.clearFlag = false;
    this.form.valueChanges.subscribe(data => {
        const keys = Object.keys(data);
        const count = {i: 0};
        if(this.offemData.length === 0) {
        do {
            if(!data[keys[count.i]]) {
                this.clearFlag = true;
            } else {
                this.clearFlag = false;
            }
            count.i++;
        } while(this.clearFlag && count.i < keys.length);
    } 
    });
    
    }

    canEdit = (data: any, index: number, field: string): boolean => {
        return this.isEditable;
      }

    getTypeData() {
        const typeService = this.oiidmoveFactory.cgfkOffemmovementtypeRecordGroup();
        typeService.subscribe(data => {
            data.forEach( element => {
                this.typeMap.set(element.code, element.description);
                this.typeCodeMap.set(element.description, element.code);
            });
            this.getReasonData();
        });

    }
    getReasonData() {
        const typeService = this.oiidmoveFactory.cgfkOffemmovementreasoncoRecordGroup();
        typeService.subscribe(data => {
            data.forEach( element => {
                this.reasonMap.set(element.code, element.description);
                this.reasonCodeMap.set(element.description, element.code);
            });
        });
    }
    onRowClickoffem(event) {
    }
     ok(event?) {
        this.offemExecuteQuery();
    }
     no() {
        this.offemData = [];
        this.offemModel = new VOffExtMovements();
        this.movementReasonCodeDesc = this.movementReasonCodeDesc === undefined ? '' : undefined;
        this.movementTypeDesc = this.movementTypeDesc  === undefined ? '' : undefined;
        this.isEditable = false;
        this.retrieveFlag = false;
        this.clearFlag = true;
    }
     cancel() {
    }
    disableClear(event) {
        this.movementReasonCodeDesc;
        this.movementTypeDesc;
    }
    onOffenderChange(offender) {
    }
    resetLov() {
        if(!this.movementReasonCodeDesc) {
        this.movementReasonCodeDesc = this.movementReasonCodeDesc === undefined ? '' : undefined;
        }
        if(!this.movementTypeDesc) {
        this.movementTypeDesc = this.movementTypeDesc  === undefined ? '' : undefined;
        }
    }
    offemExecuteQuery() {
                    this.offemModel.movementType = null;
                    this.offemModel.movementReasonCode = null;
                    if(!this.offemModel.movementDate && this.offemModel.movementTime) {
                        this.show(this.translateService.translate('oiidmove.pleaseentermovementdate'), 'warn');
                        return;
                    }
                
                    if (this.movementTypeDesc) {
                        this.offemModel.movementType = this.typeMap.get(this.movementTypeDesc);
                    }
                    if (this.movementReasonCodeDesc) {
                        this.offemModel.movementReasonCode = this.reasonMap.get(this.movementReasonCodeDesc);
                        }
                
                 const offemResult = this.oiidmoveFactory.
                 offEmExecuteQuery(this.offemModel);
                     offemResult.subscribe(offemResultList => {
                    if (offemResultList.length === 0) {
                        this.offemData = [];
                        this.show(this.translateService.translate('oiidmove.querycaused'), 'warn');
                    } else {
                        const withType = {data: [], isType: true}
                        offemResultList.forEach(data => {
                            data.fromAgyLocDesc =  data.fromAgyLocDesc ? data.fromAgyLocDesc : data.fromCityDesc;
                            data.fromAgyLocDesc =  data.fromAgyLocDesc ? data.fromAgyLocDesc : data.fromAddressDesc;
                            data.toAgyLocDesc =  data.toAgyLocDesc ? data.toAgyLocDesc : data.toCityDesc;
                            data.toAgyLocDesc =  data.toAgyLocDesc ? data.toAgyLocDesc : data.toAddressDesc;
                            data.activeFlag = (data.activeFlag === 'Y') ? 'A' : 'I';
                            data['movementTypeDesc'] = this.typeCodeMap.get(data.movementType);
                            if (this.reasonCodeMap.get(data.movementReasonCode)) {
                            data['movementReasonCodeDesc'] = this.reasonCodeMap.get(data.movementReasonCode);
                            } else {
                                withType.data.push(data);
                                withType.isType = false;
                                                           }
                        });
                        if(withType.isType) {
                            this.offemData = offemResultList;
                        } else {
                            this.offemData = withType.data;
                              this.offemData = offemResultList;
                              this.retrieveFlag = true;
                        }
                        
                        this.isEditable = false;
                        this.clearFlag = false;
                        this.commonFlag = true;
                    }
                });
            }
            show(vldmsg, type?) {
                const msgval = [{ message: vldmsg, type: type }];
                this.msgs = [...msgval];
            }

    offExMvExecuteQuery(fromdate?, todate?) {
        if (fromdate.innerValue && DateFormat.compareDate(fromdate.innerValue, DateFormat.getDate()) === 1) {
            this.show(this.translateService.translate('oiidmove.fromdatemustbeequaltoorlessthancurrentdate'), 'warn');
            return;
        }
        if(todate.innerValue && DateFormat.compareDate(fromdate.innerValue, todate.innerValue) === 1 ||
         DateFormat.compareDate(DateFormat.getDate(todate.innerValue), DateFormat.getDate()) === 1 ){
            this.show(this.translateService.translate('oiidmove.todatemustequalorbegreaterthanFromDateandnotgreaterthancurrentdate'), 'warn');
            return;
        }
        this.offemExecuteQuery();
        this.getTypeData();
    }
    get rettBtnFlg() {
        if (this.offemModel.fromMovementDate && this.offemData.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    get clrBtnFlag() {
        if (this.offemData.length > 0 || this.offemModel.fromMovementDate || this.offemModel.toMovementDate) {
            return false;
        } else {
            return true;
        }
    }

    onButClear() {
        this.offemData = [];
        this.offemModel = new VOffExtMovements();
        this.commonFlag = false;
    }
}