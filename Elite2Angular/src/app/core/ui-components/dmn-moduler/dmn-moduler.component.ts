import { DmnProcess } from './../../../sa/recordmaintenance/beans/DmnProcess';
import { DmnModulerService } from './dmn-moduler.service';
import { Component, Input, Output, EventEmitter, AfterContentInit, OnChanges, OnDestroy, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import * as DmnJS from 'dmn-js/dist/dmn-modeler.production.min.js';
import { HttpService } from '@core/service/http.service';
import { Router } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '../datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { DmnProcessCommitBean } from '@sa/recordmaintenance/beans/DmnProcessCommitBean';
import { DmnmainService } from '@sa/recordmaintenance/service/dmnmain.service';

@Component( {
    selector: 'app-dmnmoduler',
    templateUrl: './dmn-moduler.component.html',
    styleUrls: ['./dmn-moduler.component.css']
} )
export class DmnModulerComponent implements AfterContentInit, OnChanges, OnDestroy  {

    private dmnJS: DmnJS;
    xmlFlag: boolean = false;
    hideModular: boolean = false;
    hideOnXml: boolean = false;
    xmlText:string;
    msgs: { message: any; type: any; }[];
    // retrieve DOM element reference
    @ViewChild('ref', { static: true }) private el: ElementRef;
  
    @Output() private importDone: EventEmitter<any> = new EventEmitter();
  
    @Input() private url: string;

    @Input() private xmlData: string;

    @Input() public hideSave: boolean;
    @ViewChild('sidebar', {static:true}) sidebar: SidebarComponent;

    xmlNew; string;
    newDmn:string;
  dmnName: any;
  disableDeployBtn: boolean = true;
  dmnUpdateList: DmnProcess[] = [];
  dmnCommitModel: DmnProcessCommitBean = new DmnProcessCommitBean();
  xmlTemp: any;
    constructor(private http: HttpService,private router: Router,
      public translateService: TranslateService, public sessionManager: UserSessionManager, 
      private eoffenderService: EoffenderService,private dmnModulerService: DmnModulerService,
      private dmnmainService :DmnmainService) {
        if(this.dmnModulerService.dmnRowData && this.dmnModulerService.dmnRowData.definitionDesc){
          this.dmnName=this.dmnModulerService.dmnRowData.definitionDesc;
        }
        if (document.getElementsByTagName('mat-sidenav')[0]['style'].visibility === 'visible') {
          document.getElementsByClassName('s4-sidenav-button')[0].dispatchEvent(new Event('click'));
        }
      this.dmnJS = new DmnJS();
    }
  
    ngAfterContentInit(): void {
      this.dmnJS.attachTo(this.el.nativeElement);
      if (this.dmnModulerService.dmnRowData && this.dmnModulerService.dmnRowData.dmn) {
        this.importDiagram(this.dmnModulerService.dmnRowData.dmn);
      } else {
        this.createNewDmn();
      }
      if(this.dmnModulerService.dmnRowData.bpmnRowData.deployFlag == 'Y') {
        this.disableDeployBtn = false;
      }

    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes.xmlData) {
        this.importDiagram(changes.xmlData.currentValue);
      }
    }
  
    ngOnDestroy(): void {
      this.dmnJS.destroy();
  
      
    }


    checkXml(){
      if(this.xmlFlag === true){
        this.dmnJS.saveXML({ format: true }, (err, xml) => {
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
      
      }
    }

    zoomIn(){
      this.dmnJS.get('zoomScroll').stepZoom(1);
    }
    zoomOut(){
      this.dmnJS.get('zoomScroll').stepZoom(-1);
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
      this.dmnJS.get('zoomScroll').reset (); 
    }
    onExitBtnClick(){
      this.router.navigate(['/DMNMAIN']);
    }

    
    

    

    createNewDmn(){
      //this.importDiagram('');
     const dmnId = this.dmnModulerService.dmnRowData.definitionDesc?.trim().replace(/ +/g,'_');
      this.newDmn='<?xml version="1.0" encoding="UTF-8"?>'+
      ' <definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="Definitions_0bap84s" name="'+dmnId +'" namespace="http://camunda.org/schema/1.0/dmn">'+
        ' <decision id="'+dmnId +'" name="'+dmnId +'">'+
         ' <decisionTable id="DecisionTable_'+this.getRandomString(7)+'">'+
            ' <input id="Input_1">'+
              ' <inputExpression id="InputExpression_1" typeRef="string">'+
               ' <text></text>'+
              '  </inputExpression>'+
            ' </input>'+
            ' <output id="Output_1" typeRef="string" />'+
          ' </decisionTable>'+
        ' </decision>'+
        ' <dmndi:DMNDI>'+
          ' <dmndi:DMNDiagram>'+
            ' <dmndi:DMNShape dmnElementRef="'+dmnId +'">'+
              ' <dc:Bounds height="80" width="180" x="160" y="100" />'+
            ' </dmndi:DMNShape>'+
          ' </dmndi:DMNDiagram>'+
        '</dmndi:DMNDI>'+
      '</definitions>'+
      '';

      this.importDiagram(this.newDmn);

    }

    getRandomString(length) {
      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      return result;
    }


    saveDmn(isDeploy ?: boolean) {
      this.dmnJS.saveXML({ format: true }, (err, xml) => {
        if (err) {
        } else {
          this.saveDmnData(xml,isDeploy);
        }
      });
    }

    saveDmnData(xml,isDeploy ?: boolean){
      const dmnDetails=new DmnProcess;
      const dmnComitt=new DmnProcessCommitBean();
      dmnComitt.updateList=[];
      if(this.dmnModulerService.dmnRowData){
        dmnDetails.definitionKey=this.dmnModulerService.dmnRowData.definitionKey;
        dmnDetails.definitionDesc=this.dmnModulerService.dmnRowData.definitionDesc;
        dmnDetails.dmn=xml;
        this.xmlTemp = xml;
      dmnDetails.decisionId=this.dmnModulerService.dmnRowData.decisionId;
      dmnDetails.deployeId=this.dmnModulerService.dmnRowData.deployeId;
      if(this.dmnModulerService.dmnRowData.createDatetime == undefined || this.dmnModulerService.dmnRowData.createDatetime == null) {
        dmnDetails.createDatetime=DateFormat.getDate();
      } else {
        dmnDetails.createDatetime= this.dmnModulerService.dmnRowData.createDatetime;
      }
      dmnDetails.category= this.dmnModulerService.dmnRowData.category;
      dmnDetails.createUserId= this.sessionManager.getId();
      dmnDetails.modifyDatetime=DateFormat.getDate();
      dmnDetails.modifyUserId= this.sessionManager.getId();
      dmnDetails.defVersion= this.dmnModulerService.dmnRowData.defVersion;
      }
      dmnComitt.updateList.push(dmnDetails);
      const result = this.dmnModulerService.saveDmn(dmnComitt);
      result.subscribe(data => {
          if (data) {
            if(data === 1){
              if(!isDeploy) {
                this.show('common.addupdateremoverecordsuccess', 'success');
              }
              this.dmnModulerService.getDmnDataByDmnDesc(this.dmnModulerService.dmnRowData).subscribe(data => {
                if(data.length > 0) {
                  this.dmnModulerService.dmnRowData = data[0];
                  this.disableDeployBtn = false;
                  if(isDeploy) {
                    this.deployDmn();
                  }
                }
              });
            }else{
              this.show('common.addupdateremoverecordfailed');
            }
              }
              
          

      }) 

    }

    deployDmn() {
      if (this.dmnModulerService.dmnRowData ) {
        this.dmnUpdateList[0] = this.dmnModulerService.dmnRowData ;
        this.dmnCommitModel.updateList = [];
        if (this.dmnUpdateList.length > 0) {
          Array.from(this.dmnUpdateList).forEach(obj=>{
            obj.dmn = this.xmlTemp;
            obj.deployUserId=this.sessionManager.getId();
            obj.deployDatetime=DateFormat.getDate();
          })
          this.dmnCommitModel.updateList = this.dmnUpdateList;
        }
        const dmnSaveData = this.dmnmainService.deployeDmn(this.dmnCommitModel);
        dmnSaveData.subscribe(data => {
          if (data === 1) {
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
    show(vldmsg, type?) {
      type = type ? type : 'warn';
      vldmsg = this.translateService.translate(vldmsg);
      const msgval = [{ message: vldmsg, type: type }];
      this.msgs = [...msgval];
  }

      importDiagram(xml,property?: any) {
       
        this.dmnJS.importXML(xml, function(err) {
          if (err) {
            console.error(err);
          }
        });
      }
    
      
}