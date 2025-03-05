import {
    Component,
    OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OcdchgsuService } from '../../../inst/legal/service/ocdchgsu.service';

@Component( {
    selector: 'grid-lov-dialog',
    templateUrl: './grid-lov-dialog.html'
} )

export class GridLovDialog implements OnInit {
    consecutiveLov: any;
    consToLineCoumndef:any[];
    disabled:boolean;
    msglist=[];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    public selected=-1;
    consToLineData = [];
    statutes = [];
    selectedRecord:any = {};
    isDeletable:boolean=false;
  @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    constructor(public translateService: TranslateService, private OcdchgsuFactory: OcdchgsuService) {
    
}
    ngOnInit(){
        this.populateStatutes();
        if ( this.dialog.data ) {
            if(this.dialog.data.consecutiveToLine==undefined && this.dialog.data.consecutiveToLine==null) {
                this.isDeletable = false;
            } else {
                this.isDeletable = true;
            }
        }
        this.disabled = false;
        this.consToLineCoumndef = this.prepareColDef(this.dialog.data.___displayFields);
        this.populateConsToLine();
    }


    populateStatutes(){
        this.OcdchgsuFactory.getAllStatutes().subscribe(
            (res) => {
                this.statutes = res;
        });
    }
    
    prepareColDef(coldefJson) {
        let colDefs = [];
        coldefJson.forEach(type => {
                colDefs.push({datatype:'text', wrapText: true, hide: false, field:type, editable: false, maxWidth: 500})
        });
        return colDefs;
      }
    populateConsToLine(){
        // let url =  this.dialog.data.___lovUrl;
        // Object.keys(this.dialog.data).forEach(obj=>{
        //     url = url.replace(':'+obj,this.dialog.data[obj]);
        // })
        // this.lovService.getOptions(url).subscribe(opts => {
        //     // this.consToLineData.splice(0, this.consToLineData.length, opts);
        //     this.consToLineData = opts;
        // });

        this.OcdchgsuFactory.getAllOffences().subscribe(
            (res) => {
                this.consToLineData = res;
        })
    }
    onDialogRowClickEvent(event) {
        this.selectedRecord = event;
       
    }
    
    processSelectedData() {
        if(!this.selectedRecord) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'Please select a record');
            this.show();
        } else {
            var opObj = {...this.selectedRecord};
            // 
            // this.dialog.data.___parentField?.forEach(element => {
            //     
            //     opObj[element] = this.selectedRecord[element]
            // });
            let actCode = this.getCodeFromAct(opObj.act)
            opObj["act"] =  actCode;
            this.dialog.close(opObj);
        }
        
        
        /*if(this.dialog.data.consecutiveToLine==undefined && this.dialog.data.consecutiveToLine==null) {
            this.dialog.close({consecutiveToLine:this.selectedRecord.consecutiveToLine
         });
        }else {
            this.dialog.close(null);
            return;
        }*/
    }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
        }
    
    cancel(): void {
        this.dialog.close(null);
      }


      getCodeFromAct(act){
        for(let i=0;i<this.statutes.length;i++){
           if(this.statutes[i].description == act){
               return this.statutes[i].code;
           }
        }
        return null;
      }

 }
