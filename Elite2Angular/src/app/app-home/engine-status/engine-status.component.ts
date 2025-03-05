import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { EngineStatusService } from '@core/service/engine-status.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
  selector: 'engine-status',
  templateUrl: './engine-status.component.html',
  styleUrls: ['./engine-status.component.scss']
})


export class EngineStatusComponent implements OnInit, OnDestroy {

  @ViewChild('dialog', {static: false}) dialog: DialogComponent;
  systemStatusData = [];
  systemStatusColDefs = [];
  engineStatusSubscription:any;

  constructor(public translate: TranslateService,public engineStatusService: EngineStatusService) { }

  ngOnInit() {
    this.systemStatusColDefs = [
      { 
        fieldName: this.translate.translate('ouisysst.service'), 
        field: 'service', editable: false, width: 150 
      },
      { 
        fieldName: this.translate.translate('ouisysst.status'), 
        field: 'status', editable: false, width: 150, datatype: 'hyperlink', 
        displayas: 'image', onLaunchClick: this.statusLaunch,
        modal: true, data: 'row', updateField: 'row',
      },
      { 
        fieldName: this.translate.translate('ouisysst.lastStatusChange'), 
        field: 'lastStatusChange', editable: false, width: 150 
      }
    ];

    this.getData();
  }


  exit(){
    this.dialog.close(null);
  }

  statusLaunch = (data) => {
  }

  getData(){
    let systemStatusData = [];
    this.engineStatusSubscription = this.engineStatusService.enginesStatus$.subscribe(res => {
      if (res && this.engineStatusService.isObject(res) && Object.keys(res).length > 0) {
          for (const [key, value] of Object.entries(res)) {

            const myArray = key.split("Engine");
            let firstWord = myArray[0].charAt(0).toUpperCase() + myArray[0].slice(1);
            if(firstWord == 'Sentence'){
               firstWord = firstWord + ' Calculation';
            } 
            let myKey = firstWord +' Engine';
            let obj = {
              service: myKey,
              lastStatusChange: '',
              status: ''
            };
            obj.status = value == 'U' ? 'assets/icons/online.png' : 'assets/icons/offline.png';
            var currentdate = new Date(); 
            var hours = currentdate.getHours();
            var minutes = currentdate.getMinutes();
            
            let h = hours < 10 ? '0'+ hours : hours;
            let m = minutes < 10 ? '0'+ minutes : minutes;
           
            var ampm = hours >= 12 ? 'PM' : 'AM';

            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                +  h + ":"  
                + m + "  " 
                + ampm;

            obj.lastStatusChange = datetime;
            systemStatusData.push(obj);
          }
          this.systemStatusData = systemStatusData[0]['service'] == 'Automation Engine' ? systemStatusData.reverse(): systemStatusData;
      }       
    })


    
  }


  ngOnDestroy() {
    if(this.engineStatusSubscription){
        this.engineStatusSubscription.unsubscribe();
    }
  }

}

