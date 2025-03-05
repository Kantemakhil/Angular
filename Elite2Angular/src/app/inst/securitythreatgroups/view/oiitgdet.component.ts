import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiitgdetService } from '@inst/securitythreatgroups/service/oiitgdet.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { StgValidations } from '@inst/securitythreatgroups/beans/StgValidations';
import { VStgRacialMakeup } from '@inst/securitythreatgroups/beans/VStgRacialMakeup';
import { VStgLocationPresence } from '@inst/securitythreatgroups/beans/VStgLocationPresence';
import { ValidateRowReturn, GridComponent } from '@ui-components/grid/grid.component';
import { Router } from '@angular/router';
import { LovService } from '@ui-components/lov/lov.service';
import { IWPPaneService } from '@core/ui-components/pane/iwppane.service';
import { ScreenWorkFlowService } from '@core/ui-components/pane/screen-workflow.service';
import { EoffenderService } from '@common/iwp/service/eoffender.service';

@Component({
    selector: 'app-oiitgdet',
    templateUrl: './oiitgdet.component.html'
})

export class OiitgdetComponent implements OnInit, AfterViewInit {
    @ViewChild('raceGrid') raceGrid: GridComponent;
    routerpath: string[] = [];
    stgGrpDisable: boolean;
    selectedForm = -1;
    @Input() isDialog: boolean;
    groupLink: string;
    selectedRace = -1;
    selectedLocation = -1;
    selectedValidation = -1;
    validated: any;
    totalMember: any;
    nonValidated: any;
    msgs: any[] = [];
    grouptitles: any;
    @Input() dlgStgId: string;
    stgId: string;
    screenId: string;
    screenTitle: string;
    stgvalidationsData: StgValidations[] = [];
    stgvalidationsModel: StgValidations = new StgValidations();
    stgvalidationsRowClickModel: StgValidations =  new StgValidations(); 
    stgracemakeupData: VStgRacialMakeup[] = [];
    stgracemakeupModel: VStgRacialMakeup = new VStgRacialMakeup();
    stglocationpresenceData: VStgLocationPresence[] = [];
    stglocationpresenceModel: VStgLocationPresence = new VStgLocationPresence();
    fafData: any[] = [];
    stgLocationPresenceColumnDef: any[];
    fafColumnDef: any[];
    stgRaceMakeupColumnDef: any[];
    groupvalidationColumnDef: any[];
    linkMaps: Map<string, string> = new Map();
    stgvalidationsDataIndex: number;
    selectedStgId: any;
    showDocIcon=false;
    showIwp: boolean;
    showIwpIcon: boolean;
    constructor(private oiitgdetFactory: OiitgdetService,
        private dialogService: DialogService,
        private router: Router,
        private translateService: TranslateService,
        private lovService: LovService,
        private iwpPaneService :IWPPaneService,
        private eoffenderService: EoffenderService,
        private screenflow: ScreenWorkFlowService) {
    }
    ngOnInit() {
        const routerComponets = this.router.config;
        this.routerpath = routerComponets.map(ele => ele.path);
        this.linkMaps.set('RG_STG1', 'oiitgdet/rgStg1RecordGroup');
        this.linkMaps.set('RG_STG2', 'oiitgdet/rgStg2RecordGroup');
        this.linkMaps.set('RG_STG3', 'oiitgdet/rgStg3RecordGroup');
        this.linkMaps.forEach((v, k) => {
            this.lovService.clear(v);
        });
        this.grouptitles = { stgCode: this.trMsg('oiitgdet.stgcode'), description: this.trMsg('common.description') };
        
        this.groupvalidationColumnDef = [
            { fieldName: this.trMsg('oiitgdet.validationstatus'), field: 'action',datatype:'lov', editable: false, width: 150,domain:'STG_VAL_ACT' },
            { fieldName: this.trMsg('common.date'), field: 'validationDate', datatype:'date',editable: false, width: 150 },
            { fieldName: this.trMsg('oiitgdet.desingnation'), field: 'designation', datatype:'lov',editable: false, width: 150,domain:'STG_VAL_DES' },
            { fieldName: this.trMsg('oiitgdet.reviewdate'), field: 'reviewDate',datatype:'date', editable: false, width: 150 },
            { fieldName: this.trMsg('common.comment'), field: 'commentText',datatype:'text', editable: false, width: 150 },
        ]
        this.stgLocationPresenceColumnDef = [
            { fieldName: this.trMsg('oiitgdet.locationpersence'), field: 'locationDescription', editable: false, width: 150 },
            { fieldName: this.trMsg('oiitgdet.count'), field: 'locationCount', editable: false, width: 150 },
            { fieldName: this.trMsg('oiitgdet.precentage'), field: 'locationPercent', editable: false, width: 150 },
            {
                fieldName: '', field: 'butMembershipInq', datatype: 'launchbutton', editable: false, width: 150,
                link: '/OIISTGMB', modal: true, updateField: 'row', data: 'row', dialogWidth: '80'
            },
        ];
        this.fafColumnDef = [
            { fieldName: this.trMsg('oiitgdet.accessibleforms'), field: 'description', editable: false, width: 150 },
            { fieldName: this.trMsg('oiitgdet.data'), field: 'cgnbtDestinationForm', datatype: 'checkbox', editable: false, width: 150 },
            {
                fieldName: '', field: 'butDestinationForm', datatype: 'launchbutton', editable: false, width: 150,
                link: '/', modal: true, updateField: 'row', onLaunchClick: this.viewLaunchClick,
                data: 'row', isDisable: this.isFormDisable
            },
        ];
        this.stgRaceMakeupColumnDef = [
            { fieldName: this.trMsg('oiitgdet.racemakeup'), field: 'raceDescription', editable: false, width: 150 },
            { fieldName: this.trMsg('oiitgdet.count'), field: 'raceCount', editable: false, width: 150 },
            { fieldName: this.trMsg('oiitgdet.precentage'), field: 'racePercent', editable: false, width: 150 },
        ];
        this.oiitgdetWhenNewFormInstance();
        if (this.isDialog) {
            this.stgGrpDisable = true;
            this.screenTitle = '';
            this.screenId = '';
            if (this.dlgStgId) {
                this.stgId = this.dlgStgId;
            }
        } else {
            this.screenTitle = this.trMsg('oiitgdet.screenId');
            this.screenId = 'OIITGDET';
            //this.fafExecuteQuery();
        }
        this.iwpPaneService.objectId =null;
        this.eoffenderService.objectId =null;
        this.getModuleTemplates();
        this.getRaceLabel();
    }
    ngAfterViewInit(): void {
        setTimeout(ele => {
            this.stgGrpDisable = false;
        }, 1000);
        if (this.isDialog) {
            const tag = document.getElementById('oiitgdetpane');
            if (tag) {
                const classList = document.getElementsByClassName('pane-title-no-header');
                if (classList && classList.length > 0) {
                    const element = classList.item(0);
                    if (element) {
                        element['hidden'] = true;
                        element['height'] = '0px';
                    }
                }
                const child = tag.firstElementChild;
                if (child) {
                    child['style']['marginTop'] = '-20px';
                }
            }
        }
    }
    oiitgdetWhenNewFormInstance() {
        this.oiitgdetFactory.oiitgdetWhenNewFormInstance()
            .subscribe(ele => {
                if (ele && ele.value) {
                    this.groupLink = this.linkMaps.get(ele.value);
                    if (this.isDialog) {
                        if (this.stgId) {
                            setTimeout(t => { this.onButRetvclick(); }, 1000);
                        } else {
                            this.fafExecuteQuery();
                        }
                    } else {
                        this.fafExecuteQuery();
                    }
                } else {
                    this.show('oiitgdet.systemprofilewithprofilecode');
                }
            });
    }
    onButRetvclick() {
        if (!this.stgId) {
            this.show('oiitgdet.groupmustbeentered');
            return;
        }
        this.stgvalidationsExecuteQuery();
        this.stgDetailKeyExeqry(Number(this.stgId));
        this.fafExecuteQuery(Number(this.stgId));

    }

    onRowClickGroupValidation = (event) =>{
        this.stgvalidationsRowClickModel = event;
    }

    viewLaunchClick = (data) => {
        if(data.destinationForm=='OIUIWPVE'){
            var screenParam = 'OIITGDET' + "~" + "false" + "~" + this.selectedStgId;
            this.router.navigate(['/EOFFENDER'],{ queryParams: { ['SCREEN'] : screenParam } });

        }else{
            this.dialogService.openLinkDialog(data.destinationForm, data, 80).subscribe(result => {
                this.fafExecuteQuery(Number(this.stgId));
             });
        }

        return false;
    }
    isFormDisable = (data) => {
        if (data && data.cgnbtDestinationForm) {
            if (this.routerpath.includes(data.destinationForm)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    onStgIdBlur() {
        if (!this.stgId) {
            this.stgId = this.stgId === undefined ? '' : undefined;
        }
    }
    cancel() {
        this.stgId = undefined;
        this.showDocIcon=false;
        this.iwpPaneService.objectId =null;
        this.eoffenderService.objectId =null;
        this.stgvalidationsData = [];
        this.stgvalidationsModel = new StgValidations();
        this.nonValidated = null;
        this.totalMember = null;
        this.validated = null;
        this.stgracemakeupData = [];
        this.stglocationpresenceData = [];
        this.fafExecuteQuery();
    }
    stgvalidationsExecuteQuery() {
        this.selectedValidation = 0;
        this.stgvalidationsModel.stgId = this.stgId ? Number(this.stgId) : null;
        const stgvalidationsResult = this.oiitgdetFactory.
            stgValidationsExecuteQuery(this.stgvalidationsModel);
        stgvalidationsResult.subscribe(stgvalidationsResultList => {
            if (stgvalidationsResultList.length === 0) {
                this.stgvalidationsData = [];
                this.show(this.translateService.translate('common.querycaused'), 'warn');
            } else {
                if (stgvalidationsResultList[0].errorMessage) {
                    this.show('oiitgdet.errorretriving');
                    return;
                }
                this.stgvalidationsData = stgvalidationsResultList;
                this.stgvalidationsModel = stgvalidationsResultList[this.selectedValidation];
                this.stgvalidationsDataIndex = 0;
            }
        }, error => this.show('oiitgdet.errorretriving'));
    }
    next() {
        if (this.stgvalidationsData[this.selectedValidation + 1]) {
            this.selectedValidation++;
            this.stgvalidationsModel = this.stgvalidationsData[this.selectedValidation];
        }
    }
    previous() {
        if (this.stgvalidationsData[this.selectedValidation - 1]) {
            this.selectedValidation--;
            this.stgvalidationsModel = this.stgvalidationsData[this.selectedValidation];
        }
    }
    get retrieveBtnFlg() {
        if (this.retrieveFlag || this.stgvalidationsData.length === 0 || this.selectedValidation === this.stgvalidationsData.length - 1) {
            return true;
        } else {
            return false;
        }
    }
    get previousBtnFlg() {
        if (this.retrieveFlag || this.selectedValidation === 0) {
            return true;
        } else {
            return false;
        }
    }
    stgDetailKeyExeqry(stgId) {
        this.nonValidated = null;
        this.totalMember = null;
        this.validated = null;
        this.oiitgdetFactory.stgDetailKeyExeqry(stgId).subscribe(data => {
            if (data) {
                if (data.nonValidated) {
                    this.nonValidated = data.nonValidated;
                } else {
                    this.nonValidated = 0;
                }
                if (data.totalMember) {
                    this.totalMember = data.totalMember;
                } else {
                    this.totalMember = 0;
                }
                if (data.validated) {
                    this.validated = data.validated;
                } else {
                    this.validated = 0;
                }

            }
            this.stgracemakeupExecuteQuery();
            this.stglocationpresenceExecuteQuery();
        });
    }
    stgracemakeupExecuteQuery() {
        this.selectedRace = -1;
        if (this.stgId) {
            this.stgracemakeupModel.stgId = Number(this.stgId);
        } else {
            this.stgracemakeupData = [];
            return;
        }
        const stgracemakeupResult = this.oiitgdetFactory.
            stgRaceMakeupExecuteQuery(this.stgracemakeupModel);
        stgracemakeupResult.subscribe(stgracemakeupResultList => {
            if (stgracemakeupResultList.length === 0) {
                this.stgracemakeupData = [];
            } else {
                if (stgracemakeupResultList[0].errorMessage) {
                    this.show('oiitgdet.errorretriving');
                    return;
                }
                stgracemakeupResultList.forEach(ele => {
                    ele.racePercent = ((Number(ele.raceCount) / Number(this.totalMember)) * 100).toFixed();
                });
                this.stgracemakeupData = stgracemakeupResultList;
                this.stgracemakeupModel = stgracemakeupResultList[0];
                this.selectedRace = 0;
            }
        }, error => {
            this.show('oiitgdet.errorretriving');
        });
    }
    stglocationpresenceExecuteQuery() {
        this.selectedLocation = -1;
        if (this.stgId) {
            this.stglocationpresenceModel.stgId = Number(this.stgId);
        } else {
            this.stglocationpresenceData = [];
            return;
        }
        const stglocationpresenceResult = this.oiitgdetFactory.
            stgLocationPresenceExecuteQuery(this.stglocationpresenceModel);
        stglocationpresenceResult.subscribe(stglocationpresenceResultList => {
            if (stglocationpresenceResultList.length === 0) {
                this.stglocationpresenceData = [];
            } else {
                if (stglocationpresenceResultList[0].errorMessage) {
                    this.show('oiitgdet.errorretriving');
                    return;
                }
                stglocationpresenceResultList.forEach(ele => {
                    ele.locationPercent = ((Number(ele.locationCount) / Number(this.totalMember)) * 100).toFixed();
                    ele.butMembershipInq = this.trMsg('common.details');
                });
                this.stglocationpresenceData = stglocationpresenceResultList;
                this.stglocationpresenceModel = stglocationpresenceResultList[0];
                this.selectedLocation = 0;
            }
        }, error => this.show('oiitgdet.errorretriving'));
    }
    fafExecuteQuery(stgId?) {
        this.selectedForm = -1;
        const req = { stgId: stgId ? Number(stgId) : null };
        const fafResult = this.oiitgdetFactory.fafExecuteQuery(req);
        fafResult.subscribe(fafResultList => {
            if (fafResultList.length === 0) {
                this.fafData = [];
            } else {
                fafResultList.forEach(ele => {
                    ele.butDestinationForm = this.trMsg('oiitgdet.view');
                    if (ele.checkFlag) {
                        ele.cgnbtDestinationForm = ele.checkFlag === 'Y' ? true : false;
                    }
                });
                this.fafData = fafResultList;
                this.selectedForm = 0;
            }
        });
    }
    // get retrieveFlag(): boolean {
    //     if (this.stgvalidationsData.length > 0 || !this.isNull(this.nonValidated) ||
    //         !this.isNull(this.totalMember) || !this.isNull(this.validated) ||
    //         this.stgracemakeupData.length > 0 || this.stglocationpresenceData.length > 0) {
    //         return false;
    //     } else {
    //         return true;
    //     }

    // }
    get retrieveFlag(): boolean {
        if(this.stgId !== null && this.stgId !== undefined) {
            return false;
        } else {
            return true;
        }
    }

    isNull(value) {
        return value === null || value === undefined || value === '' || value === 0;
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    raceValiate = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.newValue !== event.oldValue) {
            if (event.field = 'stgId') {
                this.oiitgdetFactory.oiitgdetPrimaryCur(event.newValue).subscribe(data => {
                    if (data !== 'x') {
                        this.show('oiitgdet.forenkeywarning');
                    }
                });
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    onStgGroupChange(event) {
        if(event){
        if (event.code !== this.dlgStgId) {
            this.dlgStgId = null;
        }
        this.selectedStgId=event.stgId;
        this.stgvalidationsData = [];
        this.stgvalidationsModel = new StgValidations();
        this.nonValidated = null;
        this.totalMember = null;
        this.validated = null;
        this.stgracemakeupData = [];
        this.stglocationpresenceData = [];
        if(this.showIwp){
            this.showDocIcon=true;
        }
        this.iwpPaneService.objectId =event.stgId;
        this.eoffenderService.objectId =event.stgId;

        this.fafExecuteQuery(event.stgId);
    }else{
       this.showDocIcon=false;
    }
    }
    get isRetBtnFlg(): boolean {
        if (this.stgvalidationsData.length > 0) {
            return true;
        }
    }
    getRaceLabel() {
        this.oiitgdetFactory.oiitgdetGetProfileValue('CLIENT', 'MAND_RACE')
            .subscribe(data => {
                const race = { lable: this.trMsg('system-profile.pers-id-race', ' ') + this.trMsg('oiitgdet.racemakeup') };
                if (data === 'Y') {
                    race.lable = race.lable + '*';
                }
                this.raceGrid.setColumnHeader('raceDescription', race.lable);
            });
    }
    get groupReadOnly() {
        if (this.stgvalidationsData.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    getModuleTemplates(){
    this.screenflow.iwpSupported(this.screenId).subscribe(count => {
            if((count && count>0)) { 
                this.showIwp = true;
            } else {
                this.showIwp = false;
            }
        }); 
    }
   
}
