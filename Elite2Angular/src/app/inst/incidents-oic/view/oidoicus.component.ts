
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { OidoicusService } from '../service/oidoicus.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OidincdeService } from '../service/oidincde.service';
import { Images } from '@commonbeans/Images';
import { RelatedScreensService } from '@core/ui-components/pane/relatedScreens.service';
import { VOicIncidents } from '../beans/VOicIncidents';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { SchedulerService } from '@core/ui-components/schedule/scheduler.service';


@Component({
    selector: 'app-oidoicus',
    templateUrl: './oidoicus.component.html'
})

export class OidoicusComponent implements OnInit,OnDestroy {
    voicinciData: VOicIncidents[] = [];
    voicinciDataTemp: VOicIncidents[] = [];
    voicinciModel: VOicIncidents = new VOicIncidents();
    oidoicusTemp: VOicIncidents = new VOicIncidents();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    voicinciIndex = -1;
    voicinciInsertList: VOicIncidents[] = [];
    voicinciUpdatetList: VOicIncidents[] = [];
    voicinciDeleteList: VOicIncidents[] = [];
    display: boolean;
    disabled: boolean;
    editable: boolean;
    rginctypeRg: any[] = [];
    vOicIncidentscolumnDefs: any[] = [];
    msgs: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    locationList: any[] = [];
    backBtn: boolean;
    imageModel: Images = new Images();
    disableBtnFlag: Boolean;
    screenId ='OIDOICUS';
    constructor(private oidoicusFactory: OidoicusService, public translateService: TranslateService ,public oidincdeFactory:  OidincdeService,
        private offenderSearchService: OffenderSearchService,private router: Router,private osiosearFactory: OsiosearService,
        private relatedScreensService:RelatedScreensService,private eoffenderService: EoffenderService,private activatedRoute: ActivatedRoute, private schedularService: SchedulerService) {

    }
    ngOnInit() {
        this.disableBtnFlag = true;
        this.disabled = true;
        this.vHeaderBlockModel = new VHeaderBlock();
        if(this.oidincdeFactory.selectedInvolvedOffender!=null && this.relatedScreensService.involvementFlag){
            this.offenderSearchService.selectedOffender=this.oidincdeFactory.selectedInvolvedOffender;
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
            if (this.oidincdeFactory.selectedInvolvedOffender.imageId != null) {
                    this.imageModel.imageId = this.oidincdeFactory.selectedInvolvedOffender.imageId;
                    this.osiosearFactory.imageExecuteQuery(this.imageModel).subscribe(imageData => {
                        this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                    });
            }
        } else{
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
            this.relatedScreensService.involvementFlag=false;
        }


        this.vOicIncidentscolumnDefs = [
            { fieldName: this.translateService.translate('common.incident'), field: 'agencyIncidentId', editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.incidentdate'), field: 'incidentDate',
             datatype: 'date', editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.time'), field: 'incidentTime',  datatype: 'time',
             editable: true, width: 200 },
            { fieldName: this.translateService.translate('common.incidenttype'), field: 'incidentTypeDesc', datatype: 'select',
             editable: true, width: 200, options: this.rginctypeRg },
            { fieldName: this.translateService.translate('common.location'), field: 'intLocDescription', datatype: 'select',
             editable: true, width: 200, options: this.locationList},
            { fieldName: this.translateService.translate('common.oic'), field: 'oicIncidentId', editable: true, width: 200 },
            {
                fieldName: this.translateService.translate('ocdnoque.iwpdocument')
				, field: 'iwpButton', datatype: 'hyperlink',onLaunchClick: this.onEoffenderClick,
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
            },
        ];
        if (this.oidoicusFactory.exitFlag) {
            this.backBtn = true;
        }

        if (this.schedularService.backBtnFlag) {
            this.backBtn = true;
        } 
           const serviceObj1 = this.oidoicusFactory.rgIncTypeRecordGroup();
           serviceObj1.subscribe(incidentTypeList => {
                   if (incidentTypeList.length === 0) {
                        return;
                    } else {
                   for (let i = 0; i < incidentTypeList.length; i++) {
                   this.rginctypeRg.push({ 'id': incidentTypeList[i].description
                   , 'text': incidentTypeList[i].description });
               }
               }
           });
           const optionList = this.oidoicusFactory.findLocationList();
           optionList.subscribe(list => {
               list.forEach(listval => {
                   this.locationList.push({ 'id': listval, 'text': listval });
               });
           });
        if ( !this.vHeaderBlockModel ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
        }
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.disableBtnFlag = false;
            this.oidoicusExecuteQuery();
        } else {
            this.voicinciData = [];
            this.voicinciModel = new VOicIncidents();
            this.disabled = true;
            this.disableBtnFlag = true;
        }
    }
    onRowClickvoicinci(event) {
        if (event) {
        this.oidoicusTemp = new VOicIncidents();
        this.oidoicusTemp = event;
        this.voicinciModel = event;
        this.eoffenderService.selectedRowData=event;
        this.oidoicusFactory.oicIncidentId = this.voicinciModel.oicIncidentId;
        }else{
            this.eoffenderService.selectedRowData=null;
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    oidoicusExecuteQuery() {
         this.voicinciModel = new VOicIncidents();
        this.voicinciModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            const voicinciResult = this.oidoicusFactory.vOicInciExecuteQuery(this.voicinciModel);
            voicinciResult.subscribe(voicinciResultList => {
                if (voicinciResultList.length === 0) {
                    this.voicinciData = [];
                    this.disabled = true;
                    // this.type = 'warn';
                    // this.message = this.translateService.translate('common.querycaused');
                    // this.show();
                    // return;
                } else {
                    this.disabled = false;
                    voicinciResultList.forEach(e => {
                        e['iwpButton'] = '';
                        e['SCREEN'] = this.screenId + "~" + "true" + "~" + e.agencyIncidentId;
                    })
                    this.voicinciData = voicinciResultList;
                    for (let i = 0; i < this.voicinciData.length; i++) {
                        if (!this.voicinciData[i].incidentTime) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('oidoicus.youmustenteranoccurrencedate');
                            this.show();
                            return false;
                        }
                    }
                    this.voicinciIndex = 0;
                    this.voicinciModel = voicinciResultList[this.voicinciIndex];
                }
            });
    }
    onGridDelete = () => {
        for (let i = 0; i < this.voicinciData.length; i++) {
            if (this.voicinciData.length === 1 && !this.voicinciData[i].agencyIncidentId) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemasterrecord');
                this.show();
                return false;
            }
        }
        return true;
    }
    onbackBtnClick = () => {
        if (this.oidoicusFactory.exitFlag) {
            this.backBtn = false;
            this.oidoicusFactory.exitFlag = false;
            this.router.navigate(['/OIDCIPON']);
        }
        if(this.schedularService.backBtnFlag){
			this.schedularService.backBtnFlag = false;
			this.router.navigate(['/CALSCH']);
		} 
    }
    ngOnDestroy(){
        this.backBtn = false;
        this.oidoicusFactory.exitFlag = false;
        this.schedularService.backBtnFlag = false;
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }
    onEoffenderClick = (data) => {
        this.eoffenderService.selectedRowData=data;
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
     }
}
