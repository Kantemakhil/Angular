import { OidcnoteService } from './../../../inst/casemanagement/service/oidcnote.service';
import { BpmnProcessCommitBean } from './../../../sa/recordmaintenance/beans/BpmnProcessCommitBean';
import { BpmnProcess } from './../../../sa/recordmaintenance/beans/BpmnProcess';
import { BpmnModulerService } from './bpmn-moduler.service';
import { Component, Input, Output, EventEmitter, AfterContentInit, OnChanges, OnDestroy, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import { HttpService } from '@core/service/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '../datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { ProsmainService } from '@sa/recordmaintenance/service/prosmain.service';
import { DialogService } from '../dialog/dialog.service';
import { OcmteamMainService } from './../../../inst/workflow/maintenance/service/ocmteamMain.service';
// import PaletteProvider from 'bpmn-js/lib/features/palette/PaletteProvider';


@Component( {
    selector: 'app-bpmnmoduler',
    templateUrl: './bpmn-moduler.component.html',
    styleUrls: ['./bpmn-moduler.component.css']
} )
export class BpmnModulerComponent implements AfterContentInit, OnChanges, OnDestroy  {

    private bpmnJS: BpmnJS;
    xmlFlag: boolean = false;
    hideModular: boolean = false;
    hideOnXml: boolean = false;
    hideOnCmnPros: boolean = false;
    xmlText:string;

    // retrieve DOM element reference
    @ViewChild('ref', { static: true }) private el: ElementRef;
  
    @Output() private importDone: EventEmitter<any> = new EventEmitter();
  
    @Input() private url: string;

    @Input() private xmlData: string;

    @Input() public hideSave: boolean;

    @Input() private triggerId: string;
    @ViewChild('sidebar', {static:true}) sidebar: SidebarComponent;

    xmlNew; string;
    newBpmn:string;
    entityName;
    entityUser;
    currentElement;
    entityPropMap: Map <string, any> = new Map();
    editableTypes = ['bpmn:UserTask', 'bpmn:StartEvent', 'bpmn:ServiceTask', 'bpmn:ScriptTask', 'bpmn:EndEvent', 'bpmn:Task', 'bpmn:SequenceFlow', 'bpmn:BusinessRuleTask', 'bpmn:BoundaryEvent', 'bpmn:IntermediateCatchEvent', 'bpmn:CallActivity', 'bpmn:SubProcess'];
    displayMap: Map<string, Array<string>> = new Map();
    dynamicShowMap: Map<string, boolean> = new Map();
    msgs: { message: any; type: any; }[];
    domParser = new DOMParser();
    xmlSerializer = new XMLSerializer();
    iParams: Array<any>;
    eParams: Array<any>;
    startFormVabs: Array<any>;
  selectedAction: string;
  templateList: any;
  caseNoteSubData : any;
  showDocTemplate: boolean;
  showCaseNoteLov : boolean;
  showQueueLov : boolean;
  showTeamType :boolean;
  showExternalSystem : boolean;
  showTimer: boolean;
  startEntityPropMap = new Map();
  module: string;
  triggerName: string;
  decisionRef: string;
  resultVariable: string;
  mapDecisionResult: string;
  mapDecisionResultList: { code: String, description: string; }[];
  resultType = {
    'description': 'Result Type'
  };
  dmns = {
    'description': 'Decisions'
  }
  commonProcess = {
    'description': 'Common Process'
  }
  lovTitles = {
    'description': ''
  };
  queueLovTitles = {
    'description': 'Queue Description',
    'code':'Queue Code'
  }
  moduleTitles = {
    'description': 'Trigger',
    'moduleName': 'Module'
  }
  workflowActions: { code: string; description: string; }[];
  timerOptions: { code: string; description: string; }[];
  emailTemplateOptions: { code: string; description: string; }[];
  teamOptions: { code: string; description: string; }[];
  disableDeployBtn: boolean = true;
  xmlTemp: string;
  actionApi = [];
  quickActionParameters = [];
  apiId: string;
  queryKey: string;
  actionUrl: string;
  caseNoteData : any;
  sourceData : { code: string; description: string; }[];
  teamselectionType : string;
  teamList: any[] = [];
  connectorOptions: { code: string; description: string; }[];
  actionCodes = [];
  hideForTimer: boolean;
  hideListeners: boolean = true;
  hideClear: boolean;
    constructor(private http: HttpService,private bpmnModulerService: BpmnModulerService,private router: Router,
      public translateService: TranslateService, public sessionManager: UserSessionManager, 
      private eoffenderService: EoffenderService, private processFactory: ProsmainService,
       private dialogService: DialogService,private activatedRoute: ActivatedRoute,
       private oidcnoteService :OidcnoteService,private ocmteamMainService : OcmteamMainService ) {

      this.newBpmn = 'assets/bpmns/circle.bpmn';
      
      if (document.getElementsByTagName('mat-sidenav')[0]['style'].visibility === 'visible') {
        document.getElementsByClassName('s4-sidenav-button')[0].dispatchEvent(new Event('click'));
      }
      this.bpmnJS = new BpmnJS();
      const teamObj = this.ocmteamMainService.getAllTeams();
      teamObj.subscribe(teamsData => {
            this.teamList = [];

            if (teamsData.length === 0) {
                return;
            } else {
                for (let i = 0; i < teamsData.length; i++) {
                    this.teamList.push({
                        'description': teamsData[i].description ,
                           'code': teamsData[i].code
                    });
                }
            }
        });

      //this.loadUrl(this.url);
      this.bpmnJS.on('import.done', ({ error }) => {
        if (!error) {
          this.bpmnJS.get('canvas').zoom('fit-viewport');
        }
      });
    }



  
    ngAfterContentInit(): void {
      if(this.bpmnModulerService.routeTo == 'PROSDEAC') {
        this.hideSave = true;
        this.hideClear = false;
      } else {
        this.hideClear = true; 
      }

      if(this.bpmnModulerService.routeTo == 'CMNPROSS'){
        this.hideOnCmnPros = true;
      }
     
      this.bpmnJS.attachTo(this.el.nativeElement);
      if(this.bpmnModulerService.routeTo == 'CMDWORK'){
        this.activatedRoute.queryParams.subscribe(params => {
          let processId = params['process'];
          const serviceObj = this.processFactory.getProcessData(processId);
        serviceObj.subscribe(data => {
          if(data){
          this.bpmnModulerService.bpmnRowData = data;
          this.importDiagram(this.bpmnModulerService.bpmnRowData.bpmn);
          this.intialiseBpmnContent();
          }
        })
        })
      }else{
        if (this.bpmnModulerService.bpmnRowData && this.bpmnModulerService.bpmnRowData.bpmn) {
          this.importDiagram(this.bpmnModulerService.bpmnRowData.bpmn);
          this.intialiseBpmnContent();

        } else {
          this.createNewBpmn();
          this.intialiseBpmnContent();
        }
      }
      
      /* this.oidcnoteService.rgCasenoteTypeRecordGroup('INST')
      .subscribe( value => {
        this.caseNoteData= value;
        }); */
    }
  
    intialiseBpmnContent(){

      if(this.bpmnModulerService.bpmnRowData?.deployFlag == 'Y') {
        this.disableDeployBtn = false;
      }

     
      var eventBus = this.bpmnJS.get('eventBus');
      var events = [
        'element.click',
        'element.changed'
      ];
      const context = this;
      Array.from(events).forEach(function (event) {
        eventBus.on(event, function (e) {
          /* if (context.currentElement && !context.isDataValid(context.currentElement) && e?.type != 'element.changed') {
            e.stopPropagation();
            e.preventDefault();
            return false;
          } */
          context.dynamicShowMap.clear();
          if(!(context.editableTypes?.includes(e.element.type))) {
            context.entityPropMap.clear();
            context.startFormVabs = [];
            context.currentElement = undefined;
            context.iParams = [];
            context.eParams = [];
            context.showDocTemplate = false;
            context.showCaseNoteLov = false;
            context.showTeamType = false;
            context.showQueueLov=false;
            context.showExternalSystem = false;
            
            
            // context.hideProperties();
            return;
          }
          if(e?.type == 'element.changed' && e.element.type == 'bpmn:SequenceFlow') {
            return;
          }
          context.currentElement = e;
          context.selectedAction = '';
          context.teamselectionType = '';
          context.templateList = [];
          context.caseNoteData = [];
          context.caseNoteSubData = [];
          
          context.readElementData(e);
          if (e?.type == 'element.changed') {
            if ('bpmn:StartEvent' === e.element.type) {
              // context.module = context.bpmnModulerService.bpmnRowData.module;
              context.startModuleChange({code:context.module});
              context.writeElementData(e,'start_msg_changed', '');
            } else if ('bpmn:UserTask' === e.element.type) {
              context.writeElementData(e,'bpmn:documentation', '');
            } 
          }
        });
      });
      if(this.bpmnModulerService && this.bpmnModulerService.bpmnRowData){
        this.module = this.bpmnModulerService.bpmnRowData.triggerId;
      }else{
        this.module=this.triggerId;
      }
      
      this.displayMap.set('common',['name','id']);
      this.displayMap.set('bpmn:UserTask',['moduleName', 'camunda:candidateGroups', 'approveBtn']); //'camunda:priority', 'camunda:dueDate', 'camunda:followUpDate'
      this.displayMap.set('bpmn:StartEvent',['timer', 'startModuleName']);
      this.displayMap.set('bpmn:BusinessRuleTask',['camunda:decisionRef', 'camunda:resultVariable', 'camunda:mapDecisionResult']);
      this.displayMap.set('bpmn:ServiceTask',['connectorId']);
      this.displayMap.set('bpmn:ScriptTask',['scriptFormat','script','camunda:resultVariable']);
      this.displayMap.set('bpmn:EndEvent',[]);
      this.displayMap.set('bpmn:Task',[]);
      this.displayMap.set('bpmn:BoundaryEvent',[]);
      this.displayMap.set('bpmn:IntermediateCatchEvent',[]);
      this.displayMap.set('bpmn:SequenceFlow',['expression']);
      this.displayMap.set('bpmn:CallActivity',['calledElement']);
      this.displayMap.set('bpmn:SubProcess',[]);

      this.mapDecisionResultList = [
        { code: 'singleEntry', description: 'singleEntry (TypedValue)', },
        { code: 'singleResult', description: 'singleResult (Map<String, Object>)',},
        { code: 'collectEntries', description: 'collectEntries (List<Object>)',},
        { code: 'resultList', description: 'resultList(List<Map<String, Object>>)',},
     ];
      this.workflowActions = [
        { code: 'COMPLETE', description: 'Task Completion'},
        { code: 'APP_REJ', description: 'Approval'}
     ];
      this.connectorOptions = [
        { code: 'CREATECNOTE', description: 'Create Case Note'},
        { code: 'DOCUMENT', description: 'Document'},
        { code: 'EMAIL', description: 'Email'},
        { code: 'SMS', description: 'Sms'},
        { code: 'JHUB_SMS_MSG', description: 'Resolve SMS Template Bookmark'},
        { code: 'AUTH', description: 'Authentication'},
        { code: 'QUEUE_NOTIFY', description: 'Notify Service Bus Queue'},
     ];
     this.sourceData = [
      { code: 'INST', description: 'Institution'},
      { code: 'COMM', description: 'Community'},
     ];
     this.timerOptions = [{code:'TIMEDATE', description:'Date'},{code:'TIMEDURATION', description:'Duration'},{code:'TIMECYCLE', description:'Cycle'}];
     this.emailTemplateOptions = [{code:'MANUAL', description:'Manual'},{code:'TEMPLATE', description:'Template'},{code:'TEMPLATE_ADVANCE', description:'Template With Inputs'}];
     this.teamOptions = [{code:'TEAM_MANNUAL', description:'Team Selection'},{code:'TEAM_DYNAMIC', description:'Dynamic Team'}];
     
     document.getElementsByClassName('entry bpmn-icon-data-store')[0].setAttribute('hidden', 'true');
     document.getElementsByClassName('entry bpmn-icon-data-object')[0].setAttribute('hidden', 'true');

     this.getQuickActions();
    }

    getQuickActions(){
      const serviceObj = this.bpmnModulerService.getQuickActions();
      serviceObj.subscribe(data => {
        if (data.length === 0) {
        } else {
          this.actionApi = data;
          data.forEach(element => {
            this.connectorOptions.push({"code":element.apiId,"description":element.apiDescription});
            this.actionCodes.push(element.apiId);
          });
        }
      });
    }


    ngOnChanges(changes: SimpleChanges) {
      // re-import whenever the url changes
      if (changes.xmlData) {
        this.importDiagram(changes.xmlData.currentValue);
       // this.loadUrl(changes.url.currentValue);
      } else if(changes.triggerId) {
        this.sidebar.hide();
        this.startFormVabs = [];
        this.module=changes.triggerId.currentValue;
      }
    }
  
    ngOnDestroy(): void {
      // destroy BpmnJS instance
      this.bpmnJS.destroy();
    }

    zoomIn(){
      this.bpmnJS.get('zoomScroll').stepZoom(1);
    }
    zoomOut(){
      this.bpmnJS.get('zoomScroll').stepZoom(-1);
    }
    showProperties(){
      this.sidebar.show();
    }
    hideProperties(){
      this.sidebar.hide();
    }
    toggleProperties() {
      this.sidebar.toggle();
    }
    resetZoom(){
      this.bpmnJS.get('zoomScroll').reset (); 
    }
    onExitBtnClick(){
      var elem = document.getElementById("s4MainBody");
      if(this.bpmnModulerService.routeTo=='CMDWORK'){
        this.router.navigate(['/CMDWORK']);
      } else if(this.bpmnModulerService.routeTo=='CMNPROSS') {
        this.router.navigate(['/CMNPROSS']);
      } else if(this.bpmnModulerService.routeTo=='PROSDEAC') {
        this.router.navigate(['/PROSDEAC']);
      }else{
        this.router.navigate(['/PROSMAIN']);
        document.exitFullscreen();
        elem.classList.remove('fullScreenBPMN');
      }
     
    }

    
    loadXml(){

      
    }

    

    createNewBpmn(){
      //this.importDiagram('');
      if(this.bpmnModulerService && this.bpmnModulerService.bpmnRowData){
      const processid = this.bpmnModulerService.bpmnRowData.processDesc?.trim().replace(/ +/g,'_');
      this.newBpmn = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_1pm53ot" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.8.1" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.15.0">' +
        '  <bpmn:process id="'+processid +'" isExecutable="true">' +
        '    <bpmn:startEvent id="StartEvent_1" name="Start Event" />' +
        '  </bpmn:process>' +
        '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
          '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="'+processid +'">' +
        '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
        '        <dc:Bounds x="179" y="79" width="36" height="36" />' +
        '        <bpmndi:BPMNLabel>' +
        '          <dc:Bounds x="170" y="122" width="56" height="14" />' +
        '        </bpmndi:BPMNLabel>' +
        '      </bpmndi:BPMNShape>' +
        '    </bpmndi:BPMNPlane>' +
        '  </bpmndi:BPMNDiagram>' +
        '</bpmn:definitions>' +
        '';

      this.importDiagram(this.newBpmn);
      }

    }


    saveBpmn(isDeploy ?: boolean) {
      this.bpmnJS.saveXML({ format: true }, (err, xml) => {
        if (err) {
        } else {
          this.setEncoded(xml, 'bpmn.xml');
          this.saveProcessData(xml, isDeploy);
        }
      });
    }


    saveProcessData(xml, isDeploy ?: boolean){
      const bpmnDetails=new BpmnProcess();
      const bpmnComitt=new BpmnProcessCommitBean();
      bpmnComitt.updateList=[];
      this.xmlTemp = xml;
      if(this.bpmnModulerService.bpmnRowData){
        bpmnDetails.processKey=this.bpmnModulerService.bpmnRowData.processKey;
        bpmnDetails.processDesc=this.bpmnModulerService.bpmnRowData.processDesc;
        bpmnDetails.bpmn=xml;
      bpmnDetails.processId=this.bpmnModulerService.bpmnRowData.processId;
      bpmnDetails.deployeId=this.bpmnModulerService.bpmnRowData.deployeId;
      bpmnDetails.category=this.bpmnModulerService.bpmnRowData.category;
      bpmnDetails.timerProcess=this.bpmnModulerService.bpmnRowData.timerProcess;
      bpmnDetails.triggerId = this.module;
      bpmnDetails.commonProcess = this.bpmnModulerService.bpmnRowData.commonProcess;
      bpmnDetails.processKey = this.bpmnModulerService.bpmnRowData.processDesc?.trim().replace(/ +/g,'_');
      if(this.bpmnModulerService.bpmnRowData.createDatetime == undefined || this.bpmnModulerService.bpmnRowData.createDatetime == null) {
        bpmnDetails.createDatetime=DateFormat.getDate();
        bpmnDetails.createUserId= this.sessionManager.getId();
      } else {
        bpmnDetails.createDatetime= this.bpmnModulerService.bpmnRowData.createDatetime;
        bpmnDetails.createUserId= this.bpmnModulerService.bpmnRowData.createUserId;
      }
     
      bpmnDetails.modifyDatetime=DateFormat.getDate();
      bpmnDetails.modifyUserId= this.sessionManager.getId();
      bpmnDetails.defVersion= this.bpmnModulerService.bpmnRowData.defVersion;
      }
      bpmnComitt.updateList.push(bpmnDetails);
      const result = this.bpmnModulerService.saveBpmn(bpmnComitt);
      result.subscribe(data => {
          if (data) {
            if(data === 1){
              if(!isDeploy) {
                this.show('common.addupdateremoverecordsuccess', 'success');
              }
              let originlPayload = JSON.parse(JSON.stringify(this.bpmnModulerService.bpmnRowData));
              if(originlPayload['___gridData']){
                  delete originlPayload['___gridData'];
              }
              this.bpmnModulerService.getProcess(originlPayload).subscribe(data => {
                if(data.length > 0) {
                  this.bpmnModulerService.bpmnRowData = data[0];
                  this.disableDeployBtn = false;
                  if(isDeploy) {
                    this.validateDeploy();
                  }
                }
              });
            }else{
              this.show('common.addupdateremoverecordfailed');
            }
              }
              
          

      }) 

    }
      setEncoded(data, name) {
        const encodedData = encodeURIComponent(data);
     
        if (data) {
         /*  this.saveHref = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
          this.saveName = name; */
        }
      }
      show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

      importDiagram(xml,property?: any) {
          this.sidebar.show();
        
        var context = this;
        this.bpmnJS.importXML(xml, function(err) {
          if (['connectorId', 'start_msg_changed', 'startModuleName'].includes(property)) {
            context.readElementData(context.currentElement);
          }
          if(context.hideSave){
            const panelCss = document.querySelector('.djs-palette') as HTMLElement;
            if (panelCss) {
              panelCss.style.visibility='hidden';
            }
          }
          if (err) {
            console.error(err);
          }
          
        });
      }
    
      readElementData(currentElement) {
        this.showDocTemplate = false;
        this.showCaseNoteLov = false;
        this.showTeamType=false;
        this.showQueueLov=false;
        this.showExternalSystem=false;
        this.showTimer = false;
        this.hideForTimer = false;
        this.iParams = [];
        this.eParams = [];
        this.quickActionParameters = [];
        this.dynamicShowMap.clear();
        this.bpmnJS.saveXML({ format: true }, (err, xml) => {
          if (!err) {
            var parsedXml = this.domParser.parseFromString(xml,'text/xml');
            var currentId = currentElement.element.id;
            var element = parsedXml.getElementById(currentId);
            this.entityPropMap.clear();
            Array.from(element.getAttributeNames()).forEach( (attrib) => {
              if ('camunda:candidateGroups' === attrib) {
                this.teamselectionType='TEAM_MANNUAL';
                if(element.getAttribute(attrib).includes('#{')){
                  this.teamselectionType='TEAM_DYNAMIC';
                }
                this.entityPropMap.set('teamselectionType', this.teamselectionType);
                this.entityPropMap.set(attrib, element.getAttribute(attrib).split(','));
                if(this.teamselectionType === 'TEAM_MANNUAL'){
                  this.entityPropMap.set('camunda:candidateGroupSelection', this.entityPropMap.get('camunda:candidateGroups'));
                  this.entityPropMap.set('camunda:candidateGroupDynamic', '');
                }else{
                  this.entityPropMap.set('camunda:candidateGroupSelection', '');
                  this.entityPropMap.set('camunda:candidateGroupDynamic', this.entityPropMap.get('camunda:candidateGroups'));
                }
              } else {
                this.entityPropMap.set(attrib, element.getAttribute(attrib));
              }
            })

            if(element.getElementsByTagName('bpmn:extensionElements').length > 0) {
              var extl = element.getElementsByTagName('bpmn:extensionElements')[0];
              if(extl.getElementsByTagName('camunda:executionListener').length > 0) {
                var listElm = extl.getElementsByTagName('camunda:executionListener')[0];
                  if(listElm.getElementsByTagName('camunda:script').length > 0) {
                    this.entityPropMap.set('lisScript', listElm.getElementsByTagName('camunda:script')[0].textContent);
                  }
              }
            }
            if ( !['bpmn:StartEvent','bpmn:BoundaryEvent','bpmn:IntermediateCatchEvent','bpmn:EndEvent'].includes(currentElement.element.type) ){
              Array.from(element.childNodes).forEach((chEl: any) => {
                // Sequential or Parallel loops
                if (chEl.tagName === 'bpmn:multiInstanceLoopCharacteristics') {
                  // Sequential loops
                  this.dynamicShowMap.set('camunda:elementVariable', true);
                  this.dynamicShowMap.set('camunda:collection', true);

                  if(chEl.getAttribute('isSequential')){
                    this.entityPropMap.set('camunda:collection',chEl.getAttribute('camunda:collection'));
                    this.entityPropMap.set('camunda:elementVariable',chEl.getAttribute('camunda:elementVariable'));
                  } else {
                    // Parallel loops
                    this.entityPropMap.set('camunda:collection',chEl.getAttribute('camunda:collection') );
                    this.entityPropMap.set('camunda:elementVariable',chEl.getAttribute('camunda:elementVariable') );
                  }
                  
                  // Cyclical loop
                }else if (chEl.tagName === 'bpmn:standardLoopCharacteristics') {
                  // Set cyclical vars

                }
              });
            }
            if ( ['bpmn:StartEvent','bpmn:BoundaryEvent','bpmn:IntermediateCatchEvent'].includes(currentElement.element.type) ) {
              const timerEl = element.getElementsByTagName('bpmn:timerEventDefinition')[0];
              if (timerEl) {
                this.showTimer = true;
                this.hideForTimer = true;
                Array.from(timerEl.childNodes).forEach((chEl: any) => {
                  if (chEl.tagName === 'bpmn:timeDate') {
                    this.entityPropMap.set('timerType', 'TIMEDATE');
                    this.entityPropMap.set('timer', chEl.textContent?chEl.textContent : '');
                  } else if (chEl.tagName === 'bpmn:timeDuration') {
                    this.entityPropMap.set('timerType', 'TIMEDURATION');
                    this.entityPropMap.set('timer', chEl.textContent?chEl.textContent : '');
                  } else if (chEl.tagName === 'bpmn:timeCycle') {
                    this.entityPropMap.set('timerType', 'TIMECYCLE');
                    this.entityPropMap.set('timer', chEl.textContent?chEl.textContent : '');
                  }
                })
            }
            if(this.module && !['bpmn:IntermediateCatchEvent', 'bpmn:BoundaryEvent'].includes(currentElement.element.type)) {
                Array.from(element.childNodes).forEach((chEl: any) => {
                if (chEl.tagName === 'bpmn:extensionElements') {
                  var formEl = undefined;
                  if(chEl.getElementsByTagName('camunda:formData').length>0) {
                    formEl = chEl.getElementsByTagName('camunda:formData')[0];
                    Array.from(formEl.getElementsByTagName('camunda:formField')).forEach((chEl1: any) => {
                        if(this.startFormVabs && this.startFormVabs.length !== 0) {
                          Array.from(this.startFormVabs).forEach(element => {
                            if (chEl1.getAttribute('id') == element) {
                              this.entityPropMap.set(element, 'Y');
                              this.startEntityPropMap.set(element, 'Y');
                            }
                          });
                        }
                    })
                  }
                }
              })}
            } else if (currentElement.element.type === 'bpmn:ScriptTask') {
              // element.appendChild(document.createElement('bpmn:documentation').appendChild(document.createTextNode('#{description}')));
              Array.from(element.childNodes).forEach((chEl: any) => {
                if (chEl.tagName === 'bpmn:script') {
                  this.entityPropMap.set('script', chEl.textContent);
                }
              })
            } else if (currentElement.element.type === 'bpmn:SequenceFlow') {
              // element.appendChild(document.createElement('bpmn:documentation').appendChild(document.createTextNode('#{description}')));
              if(!['bpmn:ExclusiveGateway', 'bpmn:InclusiveGateway'].includes(this.getSourceElement(currentElement))) {
                return
              } else {
                const userTaskMap = this.getUserTaskMap(parsedXml);
                this.entityPropMap.set('userTaskMap', userTaskMap);
              }
              Array.from(element.childNodes).forEach((chEl: any) => {
                if (chEl.tagName === 'bpmn:conditionExpression') {
                  this.entityPropMap.set('expression', chEl.textContent);
                }
              })
            } else if (currentElement.element.type === 'bpmn:UserTask') {
              this.showTeamType=true;
              // element.appendChild(document.createElement('bpmn:documentation').appendChild(document.createTextNode('#{description}')));
              Array.from(element.childNodes).forEach((chEl: any) => {
                /* if (chEl.tagName === 'bpmn:documentation') {
                  this.entityPropMap.set('bpmn:documentation', chEl.textContent);
                } */

                if (chEl.tagName === 'bpmn:extensionElements') {
                  var formEl = undefined;
                  if(chEl.getElementsByTagName('camunda:formData').length>0) {
                    formEl = chEl.getElementsByTagName('camunda:formData')[0];
                    Array.from(formEl.getElementsByTagName('camunda:formField')).forEach((chEl1: any) => {
                      if (chEl1.getAttribute('id') == 'moduleName') {
                        this.entityPropMap.set('moduleName', chEl1.getAttribute('defaultValue'));
                      }
                      if (chEl1.getAttribute('id').includes('approveBtn')) {
                        this.entityPropMap.set('approveBtn', true);
                      }
                    })
                    if(this.entityPropMap.get('approveBtn')) {
                      this.entityPropMap.set('approveBtn', 'APP_REJ');
                    } else {
                      this.entityPropMap.set('approveBtn', 'COMPLETE');
                    }
                  }
                }
              })
            } else if (currentElement.element.type === 'bpmn:ServiceTask') {
              
              Array.from(element.childNodes).forEach((chEl: any) => {
              /* if (chEl.tagName === 'bpmn:documentation') {
                this.entityPropMap.set('bpmn:documentation', chEl.textContent);
              } */
              if (chEl.tagName === 'bpmn:extensionElements') {
                var ioEl = undefined;
                if(chEl.getElementsByTagName('camunda:inputOutput').length>0) {
                  ioEl = chEl.getElementsByTagName('camunda:inputOutput')[0];
                  Array.from(ioEl.getElementsByTagName('camunda:inputParameter')).forEach((chEl1: any) => {
                    if (chEl1.getAttribute('name') == 'url'){
                      this.entityPropMap.set('actionUrl', chEl1.textContent);
                    }else if (chEl1.getAttribute('name') == 'method') {
                      this.entityPropMap.set('actionMethod', chEl1.textContent);
                    }
                  });
                  Array.from(ioEl.getElementsByTagName('camunda:outputParameter')).forEach((chEl1: any) => {
                    this.entityPropMap.set('responseVar', chEl1.getAttribute('name')?chEl1.getAttribute('name'):'responseVar');
                  });
                  Array.from(ioEl.getElementsByTagName('camunda:inputParameter')).forEach((chEl1: any) => {
                    if (chEl1.getAttribute('name') == 'headers'){
                      if (!this.selectedAction) {
                        this.iParams = [];
                        this.eParams = [];
                        this.quickActionParameters = [];
                        this.showDocTemplate = false;
                        Array.from(chEl1.getElementsByTagName('camunda:map')).forEach((chEl2: any) => {
                          Array.from(chEl2.getElementsByTagName('camunda:entry')).forEach((chEl3: any) => {
                            if (chEl3.getAttribute('key') === 'QueryKey') {
                              this.entityPropMap.set('queryKey', chEl3.textContent);
                            }
                          })
                        })
                        this.selectedAction = this.entityPropMap.get('queryKey');
                        this.actionApi.forEach(obj=>{
                          if(obj.queryKey == this.selectedAction) {
                            this.queryKey = obj.queryKey
                            this.actionUrl = obj.url;
                            this.quickActionParameters = obj.paramList;
                          }
                        })
                      } else {
                          this.iParams = [];
                          this.eParams = [];
                          this.showDocTemplate = false;
                          Array.from(chEl1.getElementsByTagName('camunda:map')).forEach((chEl2: any) => {
                            if(chEl2.getAttribute('key') === 'QueryKey') {
                              this.entityPropMap.set('queryKey', chEl2.textContent);
                            }
                          })
                          this.actionApi.forEach(obj=>{
                            if(obj.queryKey == this.selectedAction) {
                              this.queryKey = obj.queryKey
                              this.actionUrl = obj.url;
                              this.quickActionParameters = obj.paramList;
                            }
                          })
                          
                      }
                    }
                    if (chEl1.getAttribute('name') == 'payload'){
                      this.iParams = [];
                      this.eParams = [];
                      this.quickActionParameters = [];
                      if (!this.selectedAction) {
                        if (this.entityPropMap.get('actionUrl')?.includes('postMail') || this.entityPropMap.get('actionUrl')?.includes('sendMail') ) {
                          this.selectedAction = 'EMAIL';
                        } else if (this.entityPropMap.get('actionUrl')?.includes('postSms') || this.entityPropMap.get('actionUrl')?.includes('sendSms')) {
                          this.selectedAction = 'SMS';
                        } else if (this.entityPropMap.get('actionUrl')?.includes('postJhubSms') || this.entityPropMap.get('actionUrl')?.includes('sendJhubSms')) {
                          this.selectedAction = 'JHUB_SMS_MSG';
                        } else if (this.entityPropMap.get('actionUrl')?.includes('submitAdhocWorkflowCmd')) {
                          this.selectedAction = 'CREATECNOTE'
                        } else if (this.entityPropMap.get('actionUrl')?.includes('generateCmd')) {
                          this.selectedAction = 'DOCUMENT'
                        } else if (this.entityPropMap.get('actionUrl')?.includes('token')) {
                          this.selectedAction = 'AUTH'
                        } else if (this.entityPropMap.get('actionUrl')?.includes('connectExternalSystem')) {
                          this.selectedAction = 'QUEUE_NOTIFY'
                        } else {
                          
                          this.iParams = [];
                          this.eParams = [];
                          this.showDocTemplate = false;
                          try {
                            const dynPayload = JSON.parse(chEl1.textContent);
                            Object.keys(dynPayload).forEach(key=>{
                              this.entityPropMap.set(key, dynPayload[key]?dynPayload[key]:'');
                            });
                            // this.selectedAction = this.entityPropMap.get('queryKey');
                          } catch(e) {
                            // sets undefined for all props @ runtime
                            // this.quickActionParameters.forEach(obj=>{
                            //   this.entityPropMap.set(obj.parameterCode,'');
                            // });
                          }
                          // this.actionApi.forEach(obj=>{
                          //   if(obj.queryKey == this.selectedAction) {
                          //     this.queryKey = obj.queryKey
                          //     this.actionUrl = obj.url;
                          //     this.quickActionParameters = obj.paramList;
                          //   }
                          // })
                          }
                      }
                      if (this.selectedAction == 'EMAIL') {
                        if(!this.selectedAction) this.selectedAction = 'EMAIL';
                        // this.entityPropMap.set('connectorId', 'EMAIL');
                        this.eParams = [ {code:'toId', description: 'Recipient(s)'},
                                        {code:'subject', description: 'Subject'},
                                        {code:'emailType', description: 'Body Type'},
                                        {code:'body', description: 'Body'},
                                        {code:'emailTemplate', description: 'Email Template'},
                                        {code:'emailOffenderBookId', description: 'Offender'},
                                        {code:'templateInput', description: 'PayLoadInput'}
                                      ];
                        try {
                          const mailPayload = JSON.parse(chEl1.textContent);
                          this.entityPropMap.set('toId', mailPayload.toId?mailPayload.toId:'');
                          this.entityPropMap.set('subject', mailPayload.subject?mailPayload.subject:'');
                          this.entityPropMap.set('emailOffenderBookId', mailPayload.offenderBookId?mailPayload.offenderBookId:'');
                          this.entityPropMap.set('templateInput', mailPayload.templateInput?mailPayload.templateInput:'');
                          this.entityPropMap.set('body', mailPayload.body?mailPayload.body:'');
                          this.entityPropMap.set('emailTemplate', mailPayload.emailTemplate?mailPayload.emailTemplate:'');
                          this.entityPropMap.set('emailType', mailPayload.emailType?mailPayload.emailType:'MANUAL');
                        } catch(e) {
                          this.entityPropMap.set('toId',    '');
                          this.entityPropMap.set('subject', '');
                          this.entityPropMap.set('emailOffenderBookId', '');
                          this.entityPropMap.set('templateInput', '');
                          this.entityPropMap.set('body',    '');
                          this.entityPropMap.set('emailTemplate',    '');
                          this.entityPropMap.set('emailType',    'MANUAL');
                        }
                      } else if (this.selectedAction == 'SMS') {
                        if(!this.selectedAction) this.selectedAction = 'SMS';
                        // this.entityPropMap.set('connectorId', 'EMAIL');
                        this.eParams = [ {code:'toId', description: 'Recipient(s)'},
                                        {code:'emailType', description: 'Body Type'},
                                        {code:'body', description: 'Body'},
                                        {code:'emailTemplate', description: 'SMS Template'},
                                        {code:'emailOffenderBookId', description: 'Offender'},
                                        {code:'templateInput', description: 'PayLoadInput'}
                                      ];
                        try {
                          const mailPayload = JSON.parse(chEl1.textContent);
                          this.entityPropMap.set('toId', mailPayload.toId?mailPayload.toId:'');
                          this.entityPropMap.set('emailOffenderBookId', mailPayload.offenderBookId?mailPayload.offenderBookId:'');
                          this.entityPropMap.set('templateInput', mailPayload.templateInput?mailPayload.templateInput:'');
                          this.entityPropMap.set('emailTemplate', mailPayload.emailTemplate?mailPayload.emailTemplate:'');
                          this.entityPropMap.set('body', mailPayload.body?mailPayload.body:'');
                          this.entityPropMap.set('emailType', mailPayload.emailType?mailPayload.emailType:'MANUAL');
                        } catch(e) {
                          this.entityPropMap.set('toId',    '');
                          this.entityPropMap.set('emailOffenderBookId', '');
                          this.entityPropMap.set('emailTemplate',    '');
                          this.entityPropMap.set('body',    '');
                          this.entityPropMap.set('templateInput',    '');
                          this.entityPropMap.set('emailType',    'MANUAL');
                        }
                      } else if (this.selectedAction == 'JHUB_SMS_MSG') {
                        if(!this.selectedAction) this.selectedAction = 'JHUB_SMS_MSG';
                        // this.entityPropMap.set('connectorId', 'EMAIL');
                        this.eParams = [
                                        {code:'emailType', description: 'Body Type'},
                                        {code:'body', description: 'Body'},
                                        {code:'emailTemplate', description: 'SMS Template'},
                                        {code:'emailOffenderBookId', description: 'Offender'},
                                        {code:'templateInput', description: 'PayLoadInput'}
                                      ];
                        try {
                          const mailPayload = JSON.parse(chEl1.textContent);
                          this.entityPropMap.set('emailOffenderBookId', mailPayload.offenderBookId?mailPayload.offenderBookId:'');
                          this.entityPropMap.set('templateInput', mailPayload.templateInput?mailPayload.templateInput:'');
                          this.entityPropMap.set('emailTemplate', mailPayload.emailTemplate?mailPayload.emailTemplate:'');
                          this.entityPropMap.set('body', mailPayload.body?mailPayload.body:'');
                          this.entityPropMap.set('emailType', mailPayload.emailType?mailPayload.emailType:'MANUAL');
                        } catch(e) {
                          this.entityPropMap.set('emailOffenderBookId', '');
                          this.entityPropMap.set('emailTemplate',    '');
                          this.entityPropMap.set('body',    '');
                          this.entityPropMap.set('templateInput',    '');
                          this.entityPropMap.set('emailType',    'MANUAL');
                        }
                      } else if (this.selectedAction == 'CREATECNOTE') {
                        if(!this.selectedAction) this.selectedAction = 'CREATECNOTE';
                        this.showCaseNoteLov=true;
                        // this.entityPropMap.set('connectorId', 'CREATECNOTE');
                            this.iParams = [ {code:'offenderBookId', description: 'Offender'},
                              /* {code:'workType', description: 'Note Type'},
                              {code:'workSubType', description: 'Note Sub-type'}, */
                              {code:'messageText', description: 'Case Notes'}
                            ];
                            try {
                            const cNotePayload = JSON.parse(chEl1.textContent);
                            this.entityPropMap.set('offenderBookId', cNotePayload.offenderBookId?cNotePayload.offenderBookId:'');
                            this.entityPropMap.set('senderId', cNotePayload.senderId?cNotePayload.senderId:'');
                            this.entityPropMap.set('msgId', cNotePayload.msgId?cNotePayload.msgId:'');
                            this.entityPropMap.set('messageText', cNotePayload.messageText?cNotePayload.messageText:'');
                            this.entityPropMap.set('sourceName', cNotePayload.sourceName?cNotePayload.sourceName:'');
                            this.entityPropMap.set('workType', cNotePayload.workType?cNotePayload.workType:'');
                            this.entityPropMap.set('workSubType', cNotePayload.workSubType?cNotePayload.workSubType:'');
                          } catch(e) {
                            this.entityPropMap.set('offenderBookId',    '');
                            this.entityPropMap.set('senderId', '');
                            this.entityPropMap.set('msgId',    '');
                            this.entityPropMap.set('messageText',    '');
                            this.entityPropMap.set('sourceName',    '');
                            this.entityPropMap.set('workType',    '');
                            this.entityPropMap.set('workSubType',    '');
                          }
                      } else if (this.selectedAction == 'DOCUMENT') {
                        if(!this.selectedAction) this.selectedAction = 'DOCUMENT';
                        // this.entityPropMap.set('connectorId', 'DOCUMENT');
                        this.showDocTemplate = true;
                        try {
                          const docPayload = JSON.parse(chEl1.textContent);
                          this.entityPropMap.set('templateId', docPayload.templateId);
                          this.entityPropMap.set('templateName', docPayload.templateName);
                          this.entityPropMap.set('templateType', docPayload.templateType);
                        } catch(e) {
                          this.entityPropMap.set('templateId', '');
                          this.entityPropMap.set('templateName', '');
                          this.entityPropMap.set('templateType', '');
                        }
                      } 
                      else if (this.selectedAction == 'QUEUE_NOTIFY') {
                        if(!this.selectedAction) this.selectedAction = 'QUEUE_NOTIFY';
                        // this.entityPropMap.set('connectorId', 'DOCUMENT');
                        this.showQueueLov = true;
                        try {
                          const docPayload = JSON.parse(chEl1.textContent);
                          this.entityPropMap.set('serviceBusInput', docPayload.serviceBusInput);
                          this.entityPropMap.set('queueName', docPayload.queueName);
                        } catch(e) {
                          this.entityPropMap.set('serviceBusInput', '');
                          this.entityPropMap.set('queueName', '');
                        }
                      } 
                      // else if (this.selectedAction == 'AUTH') {
                      //   if(!this.selectedAction) this.selectedAction = 'AUTH';
                      //   // this.entityPropMap.set('connectorId', 'AUTH');
                      //   this.eParams = [ {code:'grant_type', description: 'Grant Type'},
                      //                   {code:'username', description: 'User Name'},
                      //                   {code:'password', description: 'Password'},
                      //                 ];
                      //   try {
                      //     const authPayload = JSON.parse(chEl1.textContent);
                      //     this.entityPropMap.set('grant_type', authPayload.grant_type?authPayload.grant_type:'');
                      //     this.entityPropMap.set('username', authPayload.username?authPayload.username:'');
                      //     this.entityPropMap.set('password', authPayload.password?authPayload.password:'');
                      //   } catch(e) {
                      //     this.entityPropMap.set('grant_type',    '');
                      //     this.entityPropMap.set('username', '');
                      //     this.entityPropMap.set('password', '');
                      //   }
                      // }
                      else {
                        chEl1.getAttribute("isObj") == 'true' ? this.entityPropMap.set('isObj', true) : this.entityPropMap.set('isObj', false);
                        this.iParams = [];
                        this.eParams = [];
                        this.showDocTemplate = false;
                        if (this.entityPropMap.get('isObj')) {
                          this.entityPropMap.set('payloadObj', chEl1.textContent);
                        } else {
                          try {
                            const dynPayload = JSON.parse(chEl1.textContent);
                            Object.keys(dynPayload).forEach(key=>{
                              this.entityPropMap.set(key, dynPayload[key]?dynPayload[key]:'');
                            });
                          } catch(e) {
                          }
                          }
                        }

                    }
                  })
                }
              } else if(['DOCUMENT','EMAIL','SMS', 'JHUB_SMS_MSG','CREATECNOTE','AUTH','QUEUE_NOTIFY'].includes(this.selectedAction)) {
                if (this.selectedAction == 'EMAIL') {
                  this.iParams = [];
                  this.quickActionParameters = [];
                  this.eParams = [ {code:'toId', description: 'Recipient(s)'},
                                   {code:'subject', description: 'Subject'},
                                   {code:'emailType', description: 'Body Type'},
                                   {code:'body', description: 'Body'},
                                   {code:'emailTemplate', description: 'Email Template'},
                                   {code:'emailOffenderBookId', description: 'Offender'},
                                   {code:'templateInput', description: 'PayLoadInput'}

                                 ];
                } else if (this.selectedAction == 'SMS') {
                  this.iParams = [];
                  this.quickActionParameters = [];
                  this.eParams = [ {code:'toId', description: 'Recipient(s)'},
                                   {code:'emailType', description: 'Body Type'},
                                   {code:'body', description: 'Body'},
                                   {code:'emailTemplate', description: 'Sms Template'},
                                   {code:'emailOffenderBookId', description: 'Offender'},
                                   {code:'templateInput', description: 'PayLoadInput'}
                                 ];
                } else if (this.selectedAction == 'JHUB_SMS_MSG') {
                  this.iParams = [];
                  this.quickActionParameters = [];
                  this.eParams = [ 
                                   {code:'emailType', description: 'Body Type'},
                                   {code:'body', description: 'Body'},
                                   {code:'emailTemplate', description: 'Sms Template'},
                                   {code:'emailOffenderBookId', description: 'Offender'},
                                   {code:'templateInput', description: 'PayLoadInput'}
                                 ];
                } else if (this.selectedAction == 'DOCUMENT') {
                  this.eParams = [];
                  this.iParams = [];
                  this.quickActionParameters = [];
                  this.showDocTemplate = true;
                } else if(this.selectedAction == 'CREATECNOTE') {
                  this.eParams = [];
                  this.quickActionParameters = [];
                  this.showCaseNoteLov=true;
                  this.iParams = [ {code:'offenderBookId', description: 'Offender'},
                                  /*  {code:'workType', description: 'Note Type'},
                                   {code:'workSubType', description: 'Note Sub-type'}, */
                                   {code:'messageText', description: 'Case Notes'}
                                 ];
                } 
                else if(this.selectedAction == 'QUEUE_NOTIFY') {
                  this.eParams = [];
                  this.iParams = [];
                  this.quickActionParameters = [];
                  this.showQueueLov = true;
                } 
                // else if(this.selectedAction == 'AUTH') {
                //     this.iParams = [];
                //     this.quickActionParameters = [];
                //     this.eParams = [ {code:'grant_type', description: 'Grant Type'},
                //          {code:'username', description: 'User Name'},
                //          {code:'password', description: 'Password'},
                //     ];
                // }
              } else if(this.actionCodes.includes(this.selectedAction)){
                  this.iParams = [];
                  this.eParams = [];
                  this.showDocTemplate = false;
                  this.showCaseNoteLov = false;
                  this.showQueueLov=false;
                  this.showExternalSystem = false;
                this.actionApi.forEach(obj=>{
                  if(obj.queryKey == this.selectedAction) {
                    this.queryKey = obj.queryKey;
                    this.actionUrl = obj.url;
                    this.quickActionParameters = obj.paramList;
                  }
                })
              }
            })}
          }
        });
      }
      getUserTaskMap(parsedXml: any) {
        let userElements = parsedXml.getElementsByTagName('bpmn:userTask');
        const userTaskMap = [];
        Array.from(userElements).forEach((srcEle: any) => {
        const userTaskId = srcEle.id;
        const userTaskname = srcEle.getAttribute('name');
        const userTaskObj = { name: userTaskname, id: userTaskId, formVars: [] };
        for (var i = 0; i < srcEle.childNodes.length; i++) {
          var chEl = srcEle.childNodes[i];
          if (chEl.tagName === 'bpmn:extensionElements') {
            var formEl = undefined;
            if (chEl.getElementsByTagName('camunda:formData').length > 0) {
              formEl = chEl.getElementsByTagName('camunda:formData')[0];
              Array.from(formEl.getElementsByTagName('camunda:formField')).forEach((chEl1: any) => {
                userTaskObj.formVars.push(chEl1.getAttribute('id'));
              })
            }
          }
        }
        userTaskMap.push(userTaskObj);
      });
        return userTaskMap;
      }
      getSourceElement(currentElement: any) {
        return currentElement.element.businessObject.sourceRef.$type;
      }

      writeElementData(currentElement,property, data) {
        this.bpmnJS.saveXML({ format: true }, (err, xml) => {
          if (!err) {
            var parsedXml = this.domParser.parseFromString(xml,'text/xml');
            var xmlSerializer = this.xmlSerializer;
            var currentId = currentElement.element.id;
            var nextData = data;
            var element = parsedXml.getElementById(currentId);
            /* if (this.isDate(nextData)) {
              nextData = moment(nextData, "YYYY-MM-DD[T]HH:mm:ss").format("YYYY-MM-DD[T]HH:mm:ss");
            } */
            if(!data){
              nextData = '';
            }
            if(['lisScript'].includes(property)) { //'listenerFlag'
              if(property == 'lisScript' && nextData) {
                this.listenerFlagCheck(element, nextData);
              } else if(property == 'lisScript' && !nextData) {
                this.removeListeners(element);
              }
            } else if(['camunda:collection', 'camunda:elementVariable'].includes(property) && !['bpmn:StartEvent','bpmn:BoundaryEvent','bpmn:IntermediateCatchEvent','bpmn:EndEvent'].includes(currentElement.element.type)){
              // for seq and parallel loops
              if(!nextData){
                element.getElementsByTagName('bpmn:multiInstanceLoopCharacteristics')[0].removeAttribute(property);
              } else if(element.getElementsByTagName('bpmn:multiInstanceLoopCharacteristics')){
                element.getElementsByTagName('bpmn:multiInstanceLoopCharacteristics')[0].setAttributeNS('http://camunda.org/schema/1.0/bpmn', property, nextData);
              }

              element.getElementsByTagName('bpmn:multiInstanceLoopCharacteristics')[0].textContent = nextData;
            } else if (property === 'script' && currentElement.element.type === 'bpmn:ScriptTask') {
              if (!(element.getElementsByTagName('bpmn:script').length > 0)) {
                let scriptEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:script');
                let textEl = document.createTextNode(nextData);
                scriptEl.appendChild(textEl);
                element.appendChild(scriptEl);
              } else {
                element.getElementsByTagName('bpmn:script')[0].textContent = nextData;
              }
            } else if (property === 'bpmn:documentation'  && currentElement.element.type === 'bpmn:UserTask') {
              var startEls = parsedXml.getElementsByTagName('bpmn:startEvent');
              if (startEls.length > 0) {
                var startEl = startEls[0];
                if ((startEl.getElementsByTagName('bpmn:extensionElements').length > 0)) {
                  let extEl = startEl.getElementsByTagName('bpmn:extensionElements')[0].cloneNode(true);
                  element.appendChild(extEl);
                }
              }
            } else if (property === 'moduleName' && currentElement.element.type === 'bpmn:UserTask') {
                if (element.getElementsByTagName('bpmn:extensionElements').length > 0) {
                  var formEl = undefined;
                  let extEl = element.getElementsByTagName('bpmn:extensionElements')[0];
                  if(extEl.getElementsByTagName('camunda:formData').length>0) {
                    formEl = extEl.getElementsByTagName('camunda:formData')[0];
                    let isModule = false;
                    Array.from(formEl.getElementsByTagName('camunda:formField')).forEach((chEl1: any) => {
                      if (chEl1.getAttribute('id') == 'moduleName') {
                        chEl1.setAttribute('defaultValue', nextData);
                        isModule = true;
                      }
                    });
                    if (!isModule) {
                      let formFldDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                      formFldDataEl.setAttribute('id', 'moduleName');
                      formFldDataEl.setAttribute('label', 'Module Name');
                      formFldDataEl.setAttribute('defaultValue', nextData);
                      formFldDataEl.setAttribute('type', 'string');
                      formEl.appendChild(formFldDataEl);
                    }
                  }
                } else {
                  let extEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:extensionElements');
                  let formDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formData');
                  let formFldDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                  formFldDataEl.setAttribute('id', 'moduleName');
                  formFldDataEl.setAttribute('label', 'Module Name');
                  formFldDataEl.setAttribute('defaultValue', nextData);
                  formFldDataEl.setAttribute('type', 'string');
                  formDataEl.appendChild(formFldDataEl);
                  extEl.appendChild(formDataEl);
                  element.appendChild(extEl);
                }
            } else if (['approveBtn'].includes(property) && currentElement.element.type === 'bpmn:UserTask') {
                if ( nextData === 'COMPLETE' ) {
                  if (element.getElementsByTagName('bpmn:extensionElements').length > 0) {
                    var formEl = undefined;
                    let extEl = element.getElementsByTagName('bpmn:extensionElements')[0];
                    if(extEl.getElementsByTagName('camunda:formData').length>0) {
                      
                    formEl = extEl.getElementsByTagName('camunda:formData')[0];
                    let isApprove = false;
                    let childEls = [];
                    Array.from(formEl.getElementsByTagName('camunda:formField')).forEach((chEl1: any) => {
                      if (chEl1.getAttribute('id') == currentElement.element.id + '_' +'approveBtn' || 
                      chEl1.getAttribute('id') == currentElement.element.id + '_' +'rejectionReason' || 
                      chEl1.getAttribute('id') == currentElement.element.id + '_' +'actionFlag' || 
                      chEl1.getAttribute('id') == currentElement.element.id + '_' +'completeStatus' || 
                      chEl1.getAttribute('id') == currentElement.element.id + '_' +'rejectBtn'
                      ) {
                        childEls.push(chEl1);
                        chEl1.setAttribute('defaultValue', 'A');
                        isApprove = true;
                      }
                    });
                    if(childEls.length > 0) {
                      for ( let childEl of childEls) {
                        formEl.removeChild(childEl);
                      }
                      extEl.replaceChild(extEl.getElementsByTagName('camunda:formData')[0], formEl);
                    }
                  }
                }
                } else if (nextData === 'APP_REJ' ) {

                  if (element.getElementsByTagName('bpmn:extensionElements').length > 0) {
                    var formEl = undefined;
                    let extEl = element.getElementsByTagName('bpmn:extensionElements')[0];
                    if(extEl.getElementsByTagName('camunda:formData').length>0) {
                      
                    formEl = extEl.getElementsByTagName('camunda:formData')[0];
                    let isApprove = false;
                    let childEl = null;
                    Array.from(formEl.getElementsByTagName('camunda:formField')).forEach((chEl1: any) => {
                      if (chEl1.getAttribute('id') == currentElement.element.id + '_' +'approveBtn') {
                        childEl = chEl1;
                        chEl1.setAttribute('defaultValue', 'A');
                        isApprove = true;
                      }
                    });
                    if (!isApprove) {
                      let appDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                      let reasonDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                      let actionDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                      let completeDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                      let rejectDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                      appDataEl.setAttribute('id', currentElement.element.id + '_' +'approveBtn');
                      appDataEl.setAttribute('label', 'Approve');
                      appDataEl.setAttribute('defaultValue', 'A');
                      appDataEl.setAttribute('type', 'string');
                      reasonDataEl.setAttribute('id', currentElement.element.id + '_' +'rejectionReason');
                      reasonDataEl.setAttribute('label', 'Rejection Reason');
                      reasonDataEl.setAttribute('defaultValue', '');
                      reasonDataEl.setAttribute('type', 'string');
                      actionDataEl.setAttribute('id', currentElement.element.id + '_' +'actionFlag');
                      actionDataEl.setAttribute('label', 'Action Flag');
                      actionDataEl.setAttribute('defaultValue', '');
                      actionDataEl.setAttribute('type', 'string');
                      completeDataEl.setAttribute('id', currentElement.element.id + '_' +'completeStatus');
                      completeDataEl.setAttribute('label', 'Completion Status');
                      completeDataEl.setAttribute('defaultValue', '');
                      completeDataEl.setAttribute('type', 'string');
                      rejectDataEl.setAttribute('id', currentElement.element.id + '_' +'rejectBtn');
                      rejectDataEl.setAttribute('label', 'Reject');
                      rejectDataEl.setAttribute('defaultValue', 'R');
                      rejectDataEl.setAttribute('type', 'string');
                      formEl.appendChild(appDataEl);
                      formEl.appendChild(reasonDataEl);
                      formEl.appendChild(actionDataEl);
                      formEl.appendChild(completeDataEl);
                      formEl.appendChild(rejectDataEl);
                    }
                    }
                  } else {
                    let extEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:extensionElements');
                    let formDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formData');
                    let appDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                    let reasonDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                    let actionDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                    let completeDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                    let rejectDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                    appDataEl.setAttribute('id', currentElement.element.id + '_' +'approveBtn');
                    appDataEl.setAttribute('label', 'Approve');
                    appDataEl.setAttribute('defaultValue', 'A');
                    appDataEl.setAttribute('type', 'string');
                    reasonDataEl.setAttribute('id', currentElement.element.id + '_' +'rejectionReason');
                    reasonDataEl.setAttribute('label', 'Rejection Reason');
                    reasonDataEl.setAttribute('defaultValue', '');
                    reasonDataEl.setAttribute('type', 'string');
                    actionDataEl.setAttribute('id', currentElement.element.id + '_' +'actionFlag');
                    actionDataEl.setAttribute('label', 'Action Flag');
                    actionDataEl.setAttribute('defaultValue', '');
                    actionDataEl.setAttribute('type', 'string');
                    completeDataEl.setAttribute('id', currentElement.element.id + '_' +'completeStatus');
                    completeDataEl.setAttribute('label', 'Completion Status');
                    completeDataEl.setAttribute('defaultValue', '');
                    completeDataEl.setAttribute('type', 'string');
                    rejectDataEl.setAttribute('id', currentElement.element.id + '_' +'rejectBtn');
                    rejectDataEl.setAttribute('label', 'Reject');
                    rejectDataEl.setAttribute('defaultValue', 'R');
                    rejectDataEl.setAttribute('type', 'string');
                    formDataEl.appendChild(appDataEl);
                    formDataEl.appendChild(reasonDataEl);
                    formDataEl.appendChild(actionDataEl);
                    formDataEl.appendChild(completeDataEl);
                    formDataEl.appendChild(rejectDataEl);
                    extEl.appendChild(formDataEl);
                    element.appendChild(extEl);
                  }
                }
          } else if (currentElement.element.type === 'bpmn:ServiceTask' && !this.displayMap.get('common').includes(property)) {
              this.queryKey = '';
              if (element.getElementsByTagName('bpmn:extensionElements').length > 0) {
                var formEl = undefined;
                let extEl = element.getElementsByTagName('camunda:connector')[0];
                if(extEl.getElementsByTagName('camunda:inputOutput').length>0) {
                  formEl = extEl.getElementsByTagName('camunda:inputOutput')[0];
                  var text = '{}';
                  var url = '';
                  const inputs = formEl.getElementsByTagName('camunda:inputParameter')
                  for(let i = 0; i<inputs.length; i++) {
                    var chEl1 = inputs[i];
                    if (chEl1.getAttribute('name') == 'payload') {
                      if (property === 'connectorId') {
                        if((this.entityValueGet('connectorId') !== this.selectedAction)) {
                        text = '{}';
                        url = '';
                        this.selectedAction = this.entityValueGet('connectorId');
                        if(this.selectedAction === 'DOCUMENT') {
                          text = '{ \n' +
                          '        "docDetails": { "offenderBookId" : "#{offenderBookId}"},\n' +
                          '	"templateId" : "",\n' +
                          '	"templateName" : "",\n' +
                          '	"templateType" : ""\n' +
                          '}\n';
                          url = '#{url}/Elite2Web/api/iwp/document/generateCmd';
                      } else if(this.selectedAction === 'EMAIL') {
                          text = '{ \n' +
                          '        "fromId" : "donotreply@elitev4.com",\n' +
                          '        "toId" : "",\n' +
                  '        "subject" : "",\n' +
                  '        "emailType" : "MANUAL",\n' +
                  '        "offenderBookId" : "",\n' +
                  '        "emailTemplate" : "",\n' +
                  '        "body" : ""\n' +
                  '}\n';
                          url = '#{url}/Elite2Web/api/prosmain/postMail';
                      } else if(this.selectedAction === 'SMS') {
                        text = '{ \n' +
                        '        "fromId" : "donotreply@elitev4.com",\n' +
                        '        "toId" : "",\n' +
                '        "emailType" : "MANUAL",\n' +
                '        "offenderBookId" : "",\n' +
                '        "emailTemplate" : "",\n' +
                '        "body" : ""\n' +
                '}\n';
                        url = '#{url}/Elite2Web/api/prosmain/postSms';
                    } else if(this.selectedAction === 'JHUB_SMS_MSG') {
                      text = '{ \n' +
              '        "emailType" : "MANUAL",\n' +
              '        "offenderBookId" : "",\n' +
              '        "emailTemplate" : "",\n' +
              '        "body" : ""\n' +
              '}\n';
                      url = '#{url}/Elite2Web/api/prosmain/postJhubSms';
                    } else if(this.selectedAction === 'CREATECNOTE') {
                          text = '{ \n' +
                                    '	"offenderBookId" : "",\n' +
                                    '	"senderId" : "",\n' +
                                    '	"msgId": "",\n' +
                                    '	"messageText": "",\n' +
                                    '	"sourceName": "",\n' +
                                    '	"workType": "",\n' +
                                    '	"workSubType": ""\n' +
                                    '}\n';
                                    url = '#{url}/Elite2Web/api/osucnote/submitAdhocWorkflowCmd';
                      } else if(this.selectedAction === 'AUTH') {
                        text = '{ \n' +
                          '        "grant_type" : "password",\n' +
                          '        "username" : '+JSON.stringify(JSON.parse(sessionStorage.getItem("langmsgs"))["msgs"]["system-profile.auto-ser-usr"])+',\n' +
                          '        "password" : '+JSON.stringify(JSON.parse(sessionStorage.getItem("langmsgs"))["msgs"]["system-profile.auto-ser-pwd"])+'\n' +
                          '}\n';
                          url = '#{url}/Elite2Web/oauth/token';
                      } else if(this.selectedAction === 'QUEUE_NOTIFY') {
                        text = '{ \n' +
                           '	"serviceBusInput" : "",\n' +
                          '	"queueName" : ""\n' +    
                          '}\n';
                          url = '#{url}/Elite2Web/api/externalsystem/connectExternalSystem';
                      } else if(this.actionCodes.includes(this.selectedAction)){
                        this.actionApi.forEach(obj=>{
                          if(obj.queryKey == this.selectedAction) {
                            this.queryKey = obj.queryKey
                            this.actionUrl = obj.url;
                            this.quickActionParameters = obj.paramList;
                          }
                        })
                        if(property == 'isObj' || property == 'payloadObj' && nextData ) {
                          text = this.entityPropMap.get('payloadObj') ? this.entityPropMap.get('payloadObj') : '';
                        } else {
                          var payloadObj = {};
                          this.quickActionParameters.forEach(obj=>{
                            payloadObj[obj.parameterCode] = '';
                          })
                          // payloadObj['queryKey'] = this.queryKey;
                          text = JSON.stringify(payloadObj);
                        }
                        chEl1.setAttribute("isObj",this.entityPropMap.get('isObj')+'');
                        url = '#{url}/'+this.actionUrl;
                      }
                      } else {
                        break;
                      }
                    }
                    if(this.selectedAction === 'DOCUMENT' && property === 'templateObj') {
                          text = '{ \n' +
                          '        "docDetails": { "offenderBookId" : "#{offenderBookId}"},\n' +
                          '	"templateId" : '+ (this.entityPropMap.get('templateObj')?(this.entityPropMap.get('templateObj') as any)?.templateId:'')+',\n' +
                          '	"templateName" : "'+ (this.entityPropMap.get('templateObj')?(this.entityPropMap.get('templateObj') as any)?.code:'')+'",\n' +
                          '	"templateType" : "'+ (this.entityPropMap.get('templateType')?this.entityPropMap.get('templateType'):'')+'"\n' +
                          '}\n';
                          this.entityPropMap.set('templateName',(this.entityPropMap.get('templateObj')?(this.entityPropMap.get('templateObj') as any)?.code:''));
                          url = '#{url}/Elite2Web/api/iwp/document/generateCmd';
                        } else if(this.selectedAction === 'EMAIL' && (property === 'toId' || property === 'subject' || property === 'body' || property === 'emailTemplate' || property === 'emailOffenderBookId' || property === 'templateInput' || property === 'responseVar')) {
                          if(this.entityPropMap.get('emailType') === 'TEMPLATE') {
                            this.entityPropMap.set('body','');
                            if(!this.entityPropMap.get('emailOffenderBookId')){
                              this.entityPropMap.set('emailOffenderBookId','#{offenderBookId}');
                            }
                          } else if(this.entityPropMap.get('emailType') === 'MANUAL') {
                            this.entityPropMap.set('emailTemplate','');
                            this.entityPropMap.set('emailOffenderBookId','');
                            this.entityPropMap.set('templateInput','');
                          }
                          text = '{ \n' +
                          '        "fromId" : "donotreply@elitev4.com",\n' +
                          '        "toId" : "'+ (this.entityPropMap.get('toId')?this.entityPropMap.get('toId'):'') +'",\n' +
                  '        "subject" : "'+ (this.entityPropMap.get('subject')?this.entityPropMap.get('subject'):'') +'",\n' +
                  '        "emailType" : "'+ (this.entityPropMap.get('emailType')?this.entityPropMap.get('emailType'):'MANUAL') +'",\n' +
                  '        "offenderBookId" : "'+ (this.entityPropMap.get('emailOffenderBookId')?this.entityPropMap.get('emailOffenderBookId'):'') +'",\n' +
                  '        "templateInput" : "'+ (this.entityPropMap.get('templateInput')?this.entityPropMap.get('templateInput'):'') +'",\n' +
                  '        "emailTemplate" : "'+ (this.entityPropMap.get('emailTemplate')?this.entityPropMap.get('emailTemplate'):'') +'",\n' +
                  '        "body" : '+ (this.entityPropMap.get('body')?JSON.stringify(this.entityPropMap.get('body')):'""') +'\n' +
                  '}\n';
                  if(this.entityPropMap.get('emailType') === 'TEMPLATE_ADVANCE') {
                    url = '#{url}/Elite2Web/api/prosmain/sendMail';
                  }else{
                    url = '#{url}/Elite2Web/api/prosmain/postMail';
                  }
                         
                        } else if(this.selectedAction === 'SMS' && (property === 'toId' || property === 'body' || property === 'emailTemplate' || property === 'emailOffenderBookId' || property === 'templateInput' || property === 'responseVar')) {
                          if(this.entityPropMap.get('emailType') === 'TEMPLATE') {
                            this.entityPropMap.set('body','');
                            if(!this.entityPropMap.get('emailOffenderBookId')){
                              this.entityPropMap.set('emailOffenderBookId','#{offenderBookId}');
                            }
                          } else if(this.entityPropMap.get('emailType') === 'MANUAL') {
                            this.entityPropMap.set('emailTemplate','');
                            this.entityPropMap.set('emailOffenderBookId','');
                            this.entityPropMap.set('templateInput','');
                          }
                          text = '{ \n' +
                          '        "fromId" : "donotreply@elitev4.com",\n' +
                          '        "toId" : "'+ (this.entityPropMap.get('toId')?this.entityPropMap.get('toId'):'') +'",\n' +
                  '        "emailType" : "'+ (this.entityPropMap.get('emailType')?this.entityPropMap.get('emailType'):'MANUAL') +'",\n' +
                  '        "offenderBookId" : "'+ (this.entityPropMap.get('emailOffenderBookId')?this.entityPropMap.get('emailOffenderBookId'):'') +'",\n' +
                  '        "templateInput" : "'+ (this.entityPropMap.get('templateInput')?this.entityPropMap.get('templateInput'):'') +'",\n' +
                  '        "emailTemplate" : "'+ (this.entityPropMap.get('emailTemplate')?this.entityPropMap.get('emailTemplate'):'') +'",\n' +
                  '        "body" : '+ (this.entityPropMap.get('body')?JSON.stringify(this.entityPropMap.get('body')):'""') +'\n' +
                  '}\n';
                  if(this.entityPropMap.get('emailType') === 'TEMPLATE_ADVANCE') {
                    url = '#{url}/Elite2Web/api/prosmain/sendSms';
                  }else{
                    url = '#{url}/Elite2Web/api/prosmain/postSms';
                  }
                        } else if(this.selectedAction === 'JHUB_SMS_MSG' && (property === 'body' || property === 'emailTemplate' || property === 'emailOffenderBookId' || property === 'templateInput' || property === 'responseVar')) {
                          if(this.entityPropMap.get('emailType') === 'TEMPLATE') {
                            this.entityPropMap.set('body','');
                            if(!this.entityPropMap.get('emailOffenderBookId')){
                              this.entityPropMap.set('emailOffenderBookId','#{offenderBookId}');
                            }
                          } else if(this.entityPropMap.get('emailType') === 'MANUAL') {
                            this.entityPropMap.set('emailTemplate','');
                            this.entityPropMap.set('emailOffenderBookId','');
                            this.entityPropMap.set('templateInput','');
                          }
                          text = '{ \n' +
                  '        "emailType" : "'+ (this.entityPropMap.get('emailType')?this.entityPropMap.get('emailType'):'MANUAL') +'",\n' +
                  '        "offenderBookId" : "'+ (this.entityPropMap.get('emailOffenderBookId')?this.entityPropMap.get('emailOffenderBookId'):'') +'",\n' +
                  '        "templateInput" : "'+ (this.entityPropMap.get('templateInput')?this.entityPropMap.get('templateInput'):'') +'",\n' +
                  '        "emailTemplate" : "'+ (this.entityPropMap.get('emailTemplate')?this.entityPropMap.get('emailTemplate'):'') +'",\n' +
                  '        "body" : '+ (this.entityPropMap.get('body')?JSON.stringify(this.entityPropMap.get('body')):'""') +'\n' +
                  '}\n';
                  if(this.entityPropMap.get('emailType') === 'TEMPLATE_ADVANCE') {
                    url = '#{url}/Elite2Web/api/prosmain/sendJhubSms';
                  }else{
                    url = '#{url}/Elite2Web/api/prosmain/postJhubSms';
                  }
                        } else if(this.selectedAction === 'CREATECNOTE' && (['offenderBookId','senderId','msgId','messageText','sourceName','workType','workSubType'].includes(property))) {
                          text = '{ \n' +
                                    '	"offenderBookId" : "'+ (this.entityPropMap.get('offenderBookId')?this.entityPropMap.get('offenderBookId'):'') +'",\n' +
                                    '	"senderId" : "'+ (this.entityPropMap.get('senderId')?this.entityPropMap.get('senderId'):'') +'",\n' +
                                    '	"msgId": "'+ (this.entityPropMap.get('msgId')?this.entityPropMap.get('msgId'):'') +'",\n' +
                                    '	"messageText": "'+ (this.entityPropMap.get('messageText')?this.entityPropMap.get('messageText'):'') +'",\n' +
                                    '	"sourceName": "'+ (this.entityPropMap.get('sourceName')?this.entityPropMap.get('sourceName'):'') +'",\n' +
                                    '	"workType": "'+ (this.entityPropMap.get('workType')?this.entityPropMap.get('workType'):'') +'",\n' +
                                    '	"workSubType": "'+ (this.entityPropMap.get('workSubType')?this.entityPropMap.get('workSubType'):'') +'"\n' +
                                    '}\n';
                                    url = '#{url}/Elite2Web/api/osucnote/submitAdhocWorkflowCmd';
                      }
                      else if(this.selectedAction === 'QUEUE_NOTIFY' && (['serviceBusInput','queueName'].includes(property))) {
                        text = '{ \n' +
                           '	"serviceBusInput" : "'+ (this.entityPropMap.get('serviceBusInput')?this.entityPropMap.get('serviceBusInput'):'') +'",\n' +
                          '	"queueName" : "'+ (this.entityPropMap.get('queueName')?this.entityPropMap.get('queueName'):'') +'"\n' +  
                          '}\n';
                          url = '#{url}/Elite2Web/api/externalsystem/connectExternalSystem';
                      }  else if(this.actionCodes.includes(this.selectedAction)){
                        if(property == 'isObj' || property == 'payloadObj' && nextData) {
                          text = this.entityPropMap.get('payloadObj') ? this.entityPropMap.get('payloadObj') : '';
                        } else {
                          var payloadObj = {};
                          this.quickActionParameters.forEach(obj=>{
                            payloadObj[obj.parameterCode] = this.entityPropMap.get( obj.parameterCode)?this.entityPropMap.get( obj.parameterCode):'';
                          })
                          // payloadObj['queryKey'] = this.queryKey;
                          text = JSON.stringify(payloadObj);
                        }
                        url = '#{url}/'+this.actionUrl;
                      }
                      chEl1.setAttribute("isObj", this.entityPropMap.get('isObj')+'');
                      chEl1.textContent = text;
                    } else if (chEl1.getAttribute('name') == 'url') {
                      chEl1.textContent = url;
                    } else if (chEl1.getAttribute('name') == 'method') {
                      chEl1.textContent = 'POST';
                    } else if (chEl1.getAttribute('name') == 'headers') {
                      Array.from(chEl1.getElementsByTagName('camunda:map')).forEach((chEl2: any) => {
                        Array.from(chEl2.getElementsByTagName('camunda:entry')).forEach((chEl3: any) => {
                          if (chEl3.getAttribute('key') == 'QueryKey') {
                            if (this.actionCodes.includes(this.selectedAction)) {
                              this.actionApi.forEach(obj => {
                                if (obj.queryKey == this.selectedAction) {
                                  this.queryKey = obj.queryKey
                                }
                              })
                            }
                            if(!this.queryKey) {
                              this.queryKey = '';
                            }
                            chEl3.textContent = this.queryKey;
                          } else if (chEl3.getAttribute('key') == 'Authorization') {
                            if(this.selectedAction == 'AUTH') {
                              chEl3.textContent = 'Basic ZWxpdGUyLXRydXN0ZWQtY2xpZW50OlNleWxzaWN0b2Vu';
                            } else {
                              chEl3.textContent = '#{authorization}';
                            }
                          }
                        })
                      });
                    }
                  }
                  if(property == 'responseVar'){
                    Array.from(formEl.getElementsByTagName('camunda:outputParameter')).forEach((chEl1: any) => {
                        chEl1.setAttribute('name', data);
                        chEl1.textContent = '#{JSON(response)}';
                      });
                    }
                }
                if(extEl.getElementsByTagName('camunda:connectorId').length>0) {
                  extEl.getElementsByTagName('camunda:connectorId')[0].textContent = 'http-connector';
                }
              } else {
                let extEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:extensionElements');
                let connEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:connector');
                let ioEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:inputOutput');
                let iPayloadEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:inputParameter');
                let iUrlEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:inputParameter');
                let iHeadersEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:inputParameter');
                let iMethodEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:inputParameter');
                let oRespEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:outputParameter');
                let connIdEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:connectorId');
                let mapEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:map');
                let entryAuthEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:entry');
                let queryKeyEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:entry');
                let entryContentEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:entry');

                if(this.selectedAction === 'DOCUMENT' && property === 'templateObj') {
                  text = '{ \n' +
                  '        "docDetails": { "offenderBookId" : "#{offenderBookId}"},\n' +
                  '	"templateId" : '+ (this.entityPropMap.get('templateObj')?(this.entityPropMap.get('templateObj') as any)?.templateId:'')+',\n' +
                  '	"templateName" : "'+ (this.entityPropMap.get('templateObj')?(this.entityPropMap.get('templateObj') as any)?.code:'')+'",\n' +
                  '	"templateType" : "'+ (this.entityPropMap.get('templateType')?this.entityPropMap.get('templateType'):'')+'"\n' +
                  '}\n';
                  this.entityPropMap.set('templateName',(this.entityPropMap.get('templateObj')?(this.entityPropMap.get('templateObj') as any)?.code:''));
                  url = '#{url}/Elite2Web/api/iwp/document/generateCmd';
                } else if(this.selectedAction === 'EMAIL' && (property === 'toId' || property === 'subject' || property === 'body' || property === 'emailTemplate' || property === 'emailOffenderBookId'|| property === 'templateInput' || property === 'responseVar')) {
                  if(this.entityPropMap.get('emailType') === 'TEMPLATE') {
                    this.entityPropMap.set('body','');
                    if(!this.entityPropMap.get('emailOffenderBookId')){
                      this.entityPropMap.set('emailOffenderBookId','#{offenderBookId}');
                    }
                  } else if(this.entityPropMap.get('emailType') === 'MANUAL') {
                    this.entityPropMap.set('emailTemplate','');
                    this.entityPropMap.set('emailOffenderBookId','');
                    this.entityPropMap.set('templateInput','');
                  }
                  text = '{ \n' +
                  '        "fromId" : "donotreply@elitev4.com",\n' +
                  '        "toId" : "'+ (this.entityPropMap.get('toId')?this.entityPropMap.get('toId'):'') +'",\n' +
                  '        "subject" : "'+ (this.entityPropMap.get('subject')?this.entityPropMap.get('subject'):'') +'",\n' +
                  '        "offenderBookId" : "'+ (this.entityPropMap.get('emailOffenderBookId')?this.entityPropMap.get('emailOffenderBookId'):'') +'",\n' +
                  '        "templateInput" : "'+ (this.entityPropMap.get('templateInput')?this.entityPropMap.get('templateInput'):'') +'",\n' +
                  '        "emailType" : "'+ (this.entityPropMap.get('emailType')?this.entityPropMap.get('emailType'):'MANUAL') +'",\n' +
                  '        "emailTemplate" : "'+ (this.entityPropMap.get('emailTemplate')?this.entityPropMap.get('emailTemplate'):'') +'",\n' +
                  '        "body" : '+ (this.entityPropMap.get('body')?JSON.stringify(this.entityPropMap.get('body')):'""') +'\n' +
                  '}\n';
                  if(this.entityPropMap.get('emailType') === 'TEMPLATE_ADVANCE') {
                    url = '#{url}/Elite2Web/api/prosmain/sendMail';
                  }else{
                    url = '#{url}/Elite2Web/api/prosmain/postMail';
                  }
                } else if(this.selectedAction === 'SMS' && (property === 'toId' || property === 'body' || property === 'emailTemplate' || property === 'emailOffenderBookId' || property === 'templateInput' || property === 'responseVar')) {
                  if(this.entityPropMap.get('emailType') === 'TEMPLATE') {
                    this.entityPropMap.set('body','');
                    if(!this.entityPropMap.get('emailOffenderBookId')){
                      this.entityPropMap.set('emailOffenderBookId','#{offenderBookId}');
                    }
                  } else if(this.entityPropMap.get('emailType') === 'MANUAL') {
                    this.entityPropMap.set('emailTemplate','');
                    this.entityPropMap.set('emailOffenderBookId','');
                    this.entityPropMap.set('templateInput','');
                  }
                  text = '{ \n' +
                  '        "fromId" : "donotreply@elitev4.com",\n' +
                  '        "toId" : "'+ (this.entityPropMap.get('toId')?this.entityPropMap.get('toId'):'') +'",\n' +
                  '        "offenderBookId" : "'+ (this.entityPropMap.get('emailOffenderBookId')?this.entityPropMap.get('emailOffenderBookId'):'') +'",\n' +
                  '        "templateInput" : "'+ (this.entityPropMap.get('templateInput')?this.entityPropMap.get('templateInput'):'') +'",\n' +
                  '        "emailType" : "'+ (this.entityPropMap.get('emailType')?this.entityPropMap.get('emailType'):'MANUAL') +'",\n' +
                  '        "emailTemplate" : "'+ (this.entityPropMap.get('emailTemplate')?this.entityPropMap.get('emailTemplate'):'') +'",\n' +
                  '        "body" : '+ (this.entityPropMap.get('body')?JSON.stringify(this.entityPropMap.get('body')):'""') +'\n' +
                  '}\n';
                  if(this.entityPropMap.get('emailType') === 'TEMPLATE_ADVANCE') {
                    url = '#{url}/Elite2Web/api/prosmain/sendSms';
                  }else{
                    url = '#{url}/Elite2Web/api/prosmain/postSms';
                  }
                 // url = '#{url}/Elite2Web/api/prosmain/postMail';
                } else if(this.selectedAction === 'JHUB_SMS_MSG' && (property === 'body' || property === 'emailTemplate' || property === 'emailOffenderBookId' || property === 'templateInput' || property === 'responseVar')) {
                  if(this.entityPropMap.get('emailType') === 'TEMPLATE') {
                    this.entityPropMap.set('body','');
                    if(!this.entityPropMap.get('emailOffenderBookId')){
                      this.entityPropMap.set('emailOffenderBookId','#{offenderBookId}');
                    }
                  } else if(this.entityPropMap.get('emailType') === 'MANUAL') {
                    this.entityPropMap.set('emailTemplate','');
                    this.entityPropMap.set('emailOffenderBookId','');
                    this.entityPropMap.set('templateInput','');
                  }
                  text = '{ \n' +
                  '        "offenderBookId" : "'+ (this.entityPropMap.get('emailOffenderBookId')?this.entityPropMap.get('emailOffenderBookId'):'') +'",\n' +
                  '        "templateInput" : "'+ (this.entityPropMap.get('templateInput')?this.entityPropMap.get('templateInput'):'') +'",\n' +
                  '        "emailType" : "'+ (this.entityPropMap.get('emailType')?this.entityPropMap.get('emailType'):'MANUAL') +'",\n' +
                  '        "emailTemplate" : "'+ (this.entityPropMap.get('emailTemplate')?this.entityPropMap.get('emailTemplate'):'') +'",\n' +
                  '        "body" : '+ (this.entityPropMap.get('body')?JSON.stringify(this.entityPropMap.get('body')):'""') +'\n' +
                  '}\n';
                  if(this.entityPropMap.get('emailType') === 'TEMPLATE_ADVANCE') {
                    url = '#{url}/Elite2Web/api/prosmain/sendJhubSms';
                  }else{
                    url = '#{url}/Elite2Web/api/prosmain/postJhubSms';
                  }
                } else if(this.selectedAction === 'CREATECNOTE' && (['offenderBookId','senderId','msgId','messageText','sourceName','workType','workSubType'].includes(property))) {
                  text = '{ \n' +
                          '	"offenderBookId" : "'+ (this.entityPropMap.get('offenderBookId')?this.entityPropMap.get('offenderBookId'):'') +'",\n' +
                          '	"senderId" : "'+ (this.entityPropMap.get('senderId')?this.entityPropMap.get('senderId'):'') +'",\n' +
                          '	"msgId": "'+ (this.entityPropMap.get('msgId')?this.entityPropMap.get('msgId'):'') +'",\n' +
                          '	"messageText": "'+ (this.entityPropMap.get('messageText')?this.entityPropMap.get('messageText'):'') +'",\n' +
                          '	"sourceName": "'+ (this.entityPropMap.get('sourceName')?this.entityPropMap.get('sourceName'):'') +'",\n' +
                          '	"workType": "'+ (this.entityPropMap.get('workType')?this.entityPropMap.get('workType'):'') +'",\n' +
                          '	"workSubType": "'+ (this.entityPropMap.get('workSubType')?this.entityPropMap.get('workSubType'):'') +'"\n' +
                          '}\n';
                            url = '#{url}/Elite2Web/api/osucnote/submitAdhocWorkflowCmd';
              } else if(this.selectedAction === 'QUEUE_NOTIFY' && (['serviceBusInput','queueName'].includes(property))) {
                text = '{ \n' +
                   '	"message" : "'+ (this.entityPropMap.get('serviceBusInput')?this.entityPropMap.get('serviceBusInput'):'') +'",\n' +
                  '	"queueName" : "'+ (this.entityPropMap.get('queueName')?this.entityPropMap.get('queueName'):'') +'"\n' +  
                  '}\n';
                  url = '#{url}/Elite2Web/api/externalsystem/connectExternalSystem';
              } else if(this.actionCodes.includes(this.selectedAction)){
                  if(property == 'isObj' || property == 'payloadObj' && nextData) {
                    text = this.entityPropMap.get('payloadObj') ? this.entityPropMap.get('payloadObj') : '';
                  } else {
                    var payloadObj = {};
                    this.quickActionParameters.forEach(obj=>{
                      payloadObj[obj.parameterCode] = this.entityPropMap.get( obj.parameterCode)?this.entityPropMap.get( obj.parameterCode):'';
                    })
                    // payloadObj['queryKey'] = this.queryKey;
                    text = JSON.stringify(payloadObj);
                  }
                  url = '#{url}/'+this.actionUrl;
              }

                entryContentEl.setAttribute('key', 'Content-Type');
                let textEl = document.createTextNode('application/json');
                entryContentEl.appendChild(textEl);
                
                entryAuthEl.setAttribute('key', 'Authorization');
                textEl = document.createTextNode('#{authorization}');
                entryAuthEl.appendChild(textEl);

                queryKeyEl.setAttribute('key', 'QueryKey');
                textEl = document.createTextNode(this.queryKey);
                queryKeyEl.appendChild(textEl);

                mapEl.appendChild(entryAuthEl);
                mapEl.appendChild(queryKeyEl);
                mapEl.appendChild(entryContentEl);

                iHeadersEl.setAttribute('name','headers');
                iHeadersEl.appendChild(mapEl);

                iUrlEl.setAttribute('name','url');
                textEl = document.createTextNode(url);
                iUrlEl.appendChild(textEl);


                iMethodEl.setAttribute('name','method');
                textEl = document.createTextNode('POST');
                iMethodEl.appendChild(textEl);


                textEl = document.createTextNode('http-connector');
                connIdEl.appendChild(textEl);

                oRespEl.setAttribute('name','responseVar');
                textEl = document.createTextNode('#{JSON(response)}');
                oRespEl.appendChild(textEl);

                iPayloadEl.setAttribute('name','payload');
                iPayloadEl.setAttribute("isObj",this.entityPropMap.get('isObj')+'');
                textEl = document.createTextNode(text);
                iPayloadEl.appendChild(textEl);

                ioEl.appendChild(iPayloadEl);
                ioEl.appendChild(iUrlEl);
                ioEl.appendChild(iHeadersEl);
                ioEl.appendChild(iMethodEl);
                ioEl.appendChild(oRespEl);
                connEl.appendChild(connIdEl);
                connEl.appendChild(ioEl);
                extEl.appendChild(connEl);
                element.appendChild(extEl);
              }
            } else if('startModuleName' == property && currentElement.element.type === 'bpmn:StartEvent') {
              if (element.getElementsByTagName('bpmn:extensionElements').length > 0) {
                var formEls = undefined;
                let extEl = element.getElementsByTagName('bpmn:extensionElements')[0];
                if (extEl.getElementsByTagName('camunda:formData').length > 0) {
                  formEl = extEl.getElementsByTagName('camunda:formData')[0];
                  let formEls = formEl.getElementsByTagName('camunda:formField');
                  let propNodes = [];
                  for (var i = 0; i < formEls.length; i++) {
                    let formFld = formEls[i];
                    if (!this.startFormVabs.includes(formFld.getAttribute('id'))) {
                      propNodes.push(formFld);
                    }
                  }
                  if (propNodes.length > 0) {
                    for (let i = 0; i < propNodes.length; i++) {
                      formEl.removeChild(propNodes[i]);
                    }
                  }
                // element.removeChild(element.getElementsByTagName('bpmn:extensionElements')[0]);
              }
            }
            } else if (this.startFormVabs?.includes(property) && currentElement.element.type === 'bpmn:StartEvent') {
              var eles = parsedXml.getElementsByTagName('bpmn:userTask');
              var userEles = [].concat(Array.from([element])).concat(Array.from(eles));
              userEles.forEach(element => {
                if (element.getElementsByTagName('bpmn:extensionElements').length > 0) {
                  var formEl = undefined;
                  let extEl = element.getElementsByTagName('bpmn:extensionElements')[0];
                  if(extEl.getElementsByTagName('camunda:formData').length>0) {
                    formEl = extEl.getElementsByTagName('camunda:formData')[0];
                    if(nextData){
                      let formEls = formEl.getElementsByTagName('camunda:formField');
                      let isPropExist  = false;
                      for(var i = 0; i<formEls.length; i++){
                        let formFld = formEls[i];
                        if(formFld.getAttribute('id')== property){
                          isPropExist = true;
                          break;
                        }
                      }
                      if(isPropExist){
                        return;
                      } else {
                        let formFldDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                        formFldDataEl.setAttribute('id', property);
                        formFldDataEl.setAttribute('label', property);
                        formFldDataEl.setAttribute('type', 'string');
                        formEl.appendChild(formFldDataEl);
                      }
                    } else {
                      let formEls = formEl.getElementsByTagName('camunda:formField');
                      let propNode ;
                      for(var i = 0; i<formEls.length; i++){
                        let formFld = formEls[i];
                        if(formFld.getAttribute('id')== property){
                          propNode = formFld;
                          break;
                        }
                      }
                      if(propNode) {
                        formEl.removeChild(propNode);
                      }
                    }
                  }
                } else {
                  if(nextData) {
                    let extEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:extensionElements');
                    let formDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formData');
                    let formFldDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:formField');
                    formFldDataEl.setAttribute('id', property);
                    formFldDataEl.setAttribute('label', property);
                    formFldDataEl.setAttribute('type', 'string');
                    formDataEl.appendChild(formFldDataEl);
                    extEl.appendChild(formDataEl);
                    element.appendChild(extEl);
                  }
                }
              });
            } else if (property === 'start_msg_changed'  && currentElement.element.type === 'bpmn:StartEvent') {
              if (this.startEntityPropMap.size > 0) {
                if (element.getElementsByTagName('bpmn:extensionElements').length > 0) {
                  var formEl = undefined;
                  let extEl = element.getElementsByTagName('bpmn:extensionElements')[0];
                  if (extEl.getElementsByTagName('camunda:formData').length > 0) {
                    formEl = extEl.getElementsByTagName('camunda:formData')[0];
                    this.startEntityPropMap.forEach((value, key) => {
                      value = (value == 'Y' || value == true);

                      if (value) {
                        let formEls = formEl.getElementsByTagName('camunda:formField');
                        let isPropExist = false;
                        for (var i = 0; i < formEls.length; i++) {
                          let formFld = formEls[i];
                          if (formFld.getAttribute('id') == key) {
                            isPropExist = true;
                            break;
                          }
                        }
                        if (isPropExist) {
                          return;
                        } else {
                          let formFldDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn', 'camunda:formField');
                          formFldDataEl.setAttribute('id', key);
                          formFldDataEl.setAttribute('label', key);
                          formFldDataEl.setAttribute('type', 'string');
                          formEl.appendChild(formFldDataEl);
                        }
                      } else {
                        let formEls = formEl.getElementsByTagName('camunda:formField');
                        let propNode;
                        for (var i = 0; i < formEls.length; i++) {
                          let formFld = formEls[i];
                          if (formFld.getAttribute('id') == key) {
                            propNode = formFld;
                            break;
                          }
                        }
                        if (propNode) {
                          formEl.removeChild(propNode);
                        }
                      }
                    });
                  }
                } else {
                  let extEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL', 'bpmn:extensionElements');
                  let formDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn', 'camunda:formData');
                  this.startEntityPropMap.forEach((value, key) => {
                    value = (value == 'Y' || value == true);
                    if (value) {
                      let formFldDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn', 'camunda:formField');
                      formFldDataEl.setAttribute('id', key);
                      formFldDataEl.setAttribute('label', key);
                      formFldDataEl.setAttribute('type', 'string');
                      formDataEl.appendChild(formFldDataEl);
                      extEl.appendChild(formDataEl);
                      element.appendChild(extEl);
                    }
                  });
                }
              }
              if (element.getElementsByTagName('bpmn:messageEventDefinition').length > 0) {
                const msgEls = element.getElementsByTagName('bpmn:messageEventDefinition');
                for(let i =0; i<msgEls.length;i++) {
                  let msgEl = msgEls[i];
                  if(msgEl.getAttribute('messageRef')) {
                    break;  
                  } else {
                    let msgFld = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:message');
                    let msgId = 'Message_'+this.getRandomString(7);
                    let msgName = 'Message_'+this.getRandomString(7);
                    msgFld.setAttribute('name',msgName);
                    msgFld.setAttribute('id',msgId);
                    msgEl.setAttribute('messageRef',msgId);
                    parsedXml.childNodes[0].appendChild(msgFld);
                  }
                }
              }
            } else if (property === 'expression'  && currentElement.element.type === 'bpmn:SequenceFlow') {
              if (element.getElementsByTagName('bpmn:conditionExpression').length > 0) {
                const expEls = element.getElementsByTagName('bpmn:conditionExpression');
                for(let i =0; i<expEls.length;i++) {
                  let expEl = expEls[i];
                  expEl.textContent = nextData;
                }
              } else {
                let expEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:conditionExpression');
                let expText = document.createTextNode(nextData);
                expEl.setAttribute('xsi:type','bpmn:tFormalExpression');
                expEl.appendChild(expText);
                element.appendChild(expEl);

            }
            }  else if (property === 'timerType'  && ['bpmn:StartEvent','bpmn:BoundaryEvent', 'bpmn:IntermediateCatchEvent'].includes(currentElement.element.type)) {
              let timerProperty = '';
                if(nextData === 'TIMECYCLE') {
                  timerProperty = 'bpmn:timeCycle';
                } else if(nextData === 'TIMEDURATION') {
                  timerProperty = 'bpmn:timeDuration';
                } else if(nextData === 'TIMEDATE') {
                  timerProperty = 'bpmn:timeDate';
                }
              const timerEls = element.getElementsByTagName('bpmn:timerEventDefinition');
                for(let i =0; i<timerEls.length;i++) {
                  let timerEl = timerEls[i];
                  const cycleEls = element.getElementsByTagName(timerProperty);
                  if(cycleEls.length> 0) {
                    cycleEls[0].textContent = this.entityPropMap.get('timer');
                  } else {
                    while (timerEl.firstChild) {
                      timerEl.removeChild(timerEl.firstChild);
                    }
                    let cycleEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL',timerProperty);
                    let cycleText = document.createTextNode(this.entityPropMap.get('timer'));
                    cycleEl.setAttribute('xsi:type','bpmn:tFormalExpression');
                    cycleEl.appendChild(cycleText);
                    timerEl.appendChild(cycleEl);
                  }
              }
            }  else if (property === 'timer'  && ['bpmn:StartEvent','bpmn:BoundaryEvent', 'bpmn:IntermediateCatchEvent'].includes(currentElement.element.type)) {
              if(['bpmn:StartEvent'].includes(currentElement.element.type)) {
              //   let extEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL', 'bpmn:extensionElements');
              //   let formDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn', 'camunda:formData');
              //   let formFldDataEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn', 'camunda:formField');
              //   formFldDataEl.setAttribute('id', 'serUrl');
              //   formFldDataEl.setAttribute('label', 'serUrl');
              //   formFldDataEl.setAttribute('type', 'string');
              //   formFldDataEl.setAttribute('defaultValue', JSON.parse(sessionStorage.getItem("langmsgs"))["msgs"]["system-profile.app-ser-url"]+'/')
              //   formDataEl.appendChild(formFldDataEl);
              //   extEl.appendChild(formDataEl);
              //   element.appendChild(extEl);
            let extElm = element.getElementsByTagName('bpmn:extensionElements');
            if(extElm.length > 0) {
            var listenerEl: any = extElm[0].getElementsByTagName('camunda:executionListener');
            if(!(listenerEl.length > 0)) {
            listenerEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:executionListener');
            let scriptEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:script');
            let scriptText = document.createTextNode("execution.setVariable('url'," + JSON.stringify(JSON.parse(sessionStorage.getItem("langmsgs"))["msgs"]["system-profile.app-ser-url"]+ "/")+")");
            scriptEl.setAttributeNS('http://camunda.org/schema/1.0/bpmn','scriptFormat','Javascript');
            scriptEl.appendChild(scriptText);
            listenerEl.appendChild(scriptEl);
            listenerEl.setAttributeNS('http://camunda.org/schema/1.0/bpmn','event','start');
            extElm[0].appendChild(listenerEl);         
          } else {
            listenerEl[0].getElementsByTagName('camunda:script')[0].textContent = "execution.setVariable('url'," + JSON.stringify(JSON.parse(sessionStorage.getItem("langmsgs"))["msgs"]["system-profile.app-ser-url"]+ "/")+")";
          }
        } else {
          if(data){
            let extEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:extensionElements');
            let listenerEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:executionListener');
            let scriptEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:script');
            let scriptText = document.createTextNode("execution.setVariable('url'," + JSON.stringify(JSON.parse(sessionStorage.getItem("langmsgs"))["msgs"]["system-profile.app-ser-url"]+ "/")+")");
            scriptEl.setAttributeNS('http://camunda.org/schema/1.0/bpmn','scriptFormat','Javascript');
            scriptEl.appendChild(scriptText);
            listenerEl.appendChild(scriptEl);
            listenerEl.setAttributeNS('http://camunda.org/schema/1.0/bpmn','event','start');
            extEl.appendChild(listenerEl);
            element.appendChild(extEl);
          }
        }
              }
              if (element.getElementsByTagName('bpmn:timerEventDefinition').length > 0) {
                let timerProperty = '';
                if(this.entityPropMap.get('timerType') === 'TIMECYCLE') {
                  timerProperty = 'bpmn:timeCycle';
                } else if(this.entityPropMap.get('timerType') === 'TIMEDURATION') {
                  timerProperty = 'bpmn:timeDuration';
                } else if(this.entityPropMap.get('timerType') === 'TIMEDATE') {
                  timerProperty = 'bpmn:timeDate';
                }
                const timerEls = element.getElementsByTagName('bpmn:timerEventDefinition');
                for(let i =0; i<timerEls.length;i++) {
                  let timerEl = timerEls[i];
                  const cycleEls = element.getElementsByTagName(timerProperty);
                  if(cycleEls.length> 0) {
                    cycleEls[0].textContent = nextData;
                  } else {
                    while (timerEl.firstChild) {
                      timerEl.removeChild(timerEl.firstChild);
                    }
                    let cycleEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL',timerProperty);
                    let cycleText = document.createTextNode(nextData);
                    cycleEl.setAttribute('xsi:type','bpmn:tFormalExpression');
                    cycleEl.appendChild(cycleText);
                    timerEl.appendChild(cycleEl);
                  }
              }
            }
            } 
            else if (property === 'calledElement' && currentElement.element.type === 'bpmn:CallActivity') {
              if (!(element.getElementsByTagName('bpmn:extensionElements').length > 0)) {
                let scriptEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:extensionElements');
                
                let scriptEl2 = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:in');
                let scriptEl3 = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:out');
                scriptEl2.setAttribute('variables','all');
                
                scriptEl3.setAttribute('variables','all');
                scriptEl.appendChild(scriptEl2);
                scriptEl.appendChild(scriptEl3);

                element.appendChild(scriptEl);
              } 
              element.setAttribute(property, nextData);
            }
            else {
              if(property.includes('camunda:')){
                element.setAttributeNS('http://camunda.org/schema/1.0/bpmn',property, nextData);
              }else {
                element.setAttribute(property, nextData);
              }
              if(['camunda:followUpDate', 'camunda:dueDate', 'camunda:priority'].includes(property ) && !nextData) {
                element.removeAttribute(property);
              }
            }
            var serializedXml = xmlSerializer.serializeToString(parsedXml);
            // serializedXml = serializedXml.replace(new RegExp(currentId,'g'),nextId);
            this.importDiagram(serializedXml, property);
          }
        });
      }
      getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
      }
      isDate(date){
        try {
          if (new Date(date).getTime() == new Date(date).getTime() && +date != NaN) {
             return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
      startEntityValueChange(event, propName) {
          this.startEntityPropMap.set(propName, event);
          this.writeElementData(this.currentElement, propName, event);
      }
      entityValueChange(event, propName) {
        if(propName === 'camunda:decisionRef') {
          this.bpmnModulerService.getDmnFile(event).subscribe(data=>{
            if(data != null){
              const parsedDmn = this.domParser.parseFromString(data,'text/xml');
              const opEles = parsedDmn.getElementsByTagName('output');
              const dmnOutNames = [];
              Array.from(opEles).forEach((ele : any) => {
                dmnOutNames.push(ele.getAttribute('name'));
              });
              this.entityPropMap.set('dmnOutNames', dmnOutNames);
            }
          });
        }

        if(event != null && event != undefined && propName === 'sourceName'){
          this.entityPropMap.set('sourceName', event);
          this.entityPropMap.set('workType', '');
          this.entityPropMap.set('workSubType', '');
          this.oidcnoteService.rgCasenoteTypeRecordGroup(event)
        .subscribe( value => {
          this.caseNoteData= value;
          });
        }

        if(event != null && event != undefined && propName === 'workType'){
          this.entityPropMap.set('workType', event);
          this.entityPropMap.set('workSubType', '');
          this.oidcnoteService.rgCasenoteSubtypeRecordGroup(this.entityPropMap.get('sourceName') ,event)
        .subscribe( value => {
          this.caseNoteSubData= value;

          
          });
         
        }
        if (event != null && event != undefined) {
          this.entityPropMap.set(propName, event);
          if(propName === 'emailType') {
            return;
          }
          if(propName === 'teamselectionType'){
            if(event === 'TEAM_MANNUAL'){
              this.entityPropMap.set('camunda:candidateGroupDynamic', '');
            }else{
              this.entityPropMap.set('camunda:candidateGroupSelection', '');
            }
            //this.entityPropMap.set('camunda:candidateGroups', '');
            return;
          }
          if(propName === 'camunda:candidateGroupDynamic' || propName === 'camunda:candidateGroupSelection' ){
            propName = 'camunda:candidateGroups';
          }

          /* if(propName === 'connectorId') {
            this.selectedAction = event;
          } */
          this.writeElementData(this.currentElement,propName, event);
          
         
        }
      }
      entityValueGet(propName) {
        return this.entityPropMap.get(propName);
      }

      showField(propName) {
        if(this.currentElement && this.currentElement.element) {
          if(this.displayMap.get(this.currentElement.element.type)?.includes(propName) || 
          this.displayMap.get('common')?.includes(propName)) return true;
        }
        return false;

      }
      checkXml(){
        if(this.xmlFlag === true){
          this.bpmnJS.saveXML({ format: true }, (err, xml) => {
            if (err) {
            } else {
            this.xmlText = xml;
            }
          });
          this.hideModular = true;
          this.hideOnXml = true;
        } else {
          this.hideModular = false;
          this.hideOnXml = false;
          this.importDiagram(this.xmlText);
          setTimeout(() => {
            this.resetZoom();
            this.resetZoom();
          }, 10);
        }
      }
      loadDocTemplates(moduleName) {
        if (!moduleName) {
          this.templateList = [];
          
          this.entityPropMap.set('templateType', '');
          this.entityPropMap.set('templateName','');
          return;
        }
        const templateName = this.entityPropMap.get('templateName');
        this.entityPropMap.set('templateName','');
        this.eoffenderService.getTemplateList(moduleName, this.sessionManager.userSessionDetails().id.toUpperCase(), null)
        .subscribe( value => {
          this.templateList= value;
            this.entityPropMap.set('templateName',templateName);
          });
          this.entityPropMap.set('templateType', moduleName);
      }
      
      startModuleChange(event){
        this.entityPropMap.set('startModuleName', event);
        this.module = event.code;
        if(event !== undefined && event.variableList?.length !==0) {
          this.startFormVabs = event.variableList;
        } else {
          this.startFormVabs = [];
        }
        this.writeElementData(this.currentElement, 'startModuleName', '');
      }
      processUpdateList: BpmnProcess[] = [];
      processCommitModel: BpmnProcessCommitBean = new BpmnProcessCommitBean();

      deployBpmn() {
        if (this.bpmnModulerService.bpmnRowData) {
          this.processUpdateList[0] = this.bpmnModulerService.bpmnRowData;
          this.processCommitModel.updateList = [];
          if (this.processUpdateList.length > 0) {
            Array.from(this.processUpdateList).forEach(obj=>{
              obj.bpmn = this.xmlTemp;
              obj.deployUserId=this.sessionManager.getId();
              obj.deployDatetime=DateFormat.getDate();
            })
            this.processCommitModel.updateList = this.processUpdateList;
          }
          const processSaveData = this.processFactory.deployeBpmn(this.processCommitModel);
           processSaveData.subscribe(data => {
            if (data === 1) {
              // this.processExecuteQuery();
              this.disableDeployBtn = true;
              const type = 'success';
              const message = this.translateService.translate('common.addupdateremoverecordsuccess');
              this.show(message, type);
            } else {
              const type = 'warn';
              const message = this.translateService.translate('common.addupdateremoverecordfailed');
              this.show(message, type);
            }
          });
        }
        return true;
      }

      
      showPopUp(data) {
        const popupData = {

          label: this.translateService.translate('The process, %processDesc%, is already associated with this trigger. Do you want to override it.').replace('%processDesc%', data.processDesc),
          yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', popupData, 50).subscribe(result => {
          if (result) {

            this.processFactory.deleteTrigger(data).subscribe(returnData => {
              if (returnData > 0) {
                this.deployBpmn();
              }
            });
          }
        });

      }
      validateDeploy = () => {
        let data = this.bpmnModulerService.bpmnRowData
        this.processFactory.validateDeploy(data).subscribe(returnData => {
          if (returnData.length > 0) {
            this.showPopUp(returnData[0]);
          } else {
            this.deployBpmn();
          }
        }, err => {
          this.show(this.translateService.translate('common.addupdateremoverecordfailed'),'error');
        });

      }

      isDataValid(currentElement: any) {
        return currentElement.element.type == 'bpmn:UserTask';
      }

      listenerFlagCheck(element, data){
        let extElm = element.getElementsByTagName('bpmn:extensionElements');
        if(extElm.length > 0 && data) {
          var listenerEl = extElm[0].getElementsByTagName('camunda:executionListener');
          if(!(listenerEl.length > 0)) {
            listenerEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:executionListener');
            let scriptEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:script');
            let scriptText = document.createTextNode(data);
            scriptEl.setAttributeNS('http://camunda.org/schema/1.0/bpmn','scriptFormat','Javascript');
            scriptEl.appendChild(scriptText);
            listenerEl.appendChild(scriptEl);
            listenerEl.setAttributeNS('http://camunda.org/schema/1.0/bpmn','event','start');
            extElm[0].appendChild(listenerEl);         
          } else {
            listenerEl[0].getElementsByTagName('camunda:script')[0].textContent = data;
          }
        } else {
          if(data){
            let extEl = document.createElementNS('http://www.omg.org/spec/BPMN/20100524/MODEL','bpmn:extensionElements');
            let listenerEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:executionListener');
            let scriptEl = document.createElementNS('http://camunda.org/schema/1.0/bpmn','camunda:script');
            let scriptText = document.createTextNode(data);
            scriptEl.setAttributeNS('http://camunda.org/schema/1.0/bpmn','scriptFormat','Javascript');
            scriptEl.appendChild(scriptText);
            listenerEl.appendChild(scriptEl);
            listenerEl.setAttributeNS('http://camunda.org/schema/1.0/bpmn','event','end');
            extEl.appendChild(listenerEl);
            element.appendChild(extEl);
          }
        }
      }
      removeListeners(element) {
        let extEl = element.getElementsByTagName('bpmn:extensionElements');
        let childEls = extEl[0].getElementsByTagName('camunda:executionListener');
        let removeEls = [];
        if(childEls.length > 0) {
          for ( let childEl of Array.from(childEls)) {
            removeEls.push(childEl);
          }
        }
        removeEls.forEach(obj => {
          extEl[0].removeChild(obj);
        });
        if(!extEl[0].hasChildNodes()) {
          element.removeChild(extEl[0]);
        }
      }
}
