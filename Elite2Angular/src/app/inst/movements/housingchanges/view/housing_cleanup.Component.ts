import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousingCleanUpService } from '@inst/movements/housingchanges/service/housing_cleanup.service';
import { TranslateService } from '@common/translate/translate.service';
@Component({
  selector: 'new',
  templateUrl: './housing_cleanup.component.html',
  styleUrls: []
})
export class HousingCleanupComponent implements OnInit {
    dataCleaned:number;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    msgs: any[] = [];
    disableHousingCleanUpBtn:boolean=true;
    disableCreateAdmitBtn:boolean=true;
    constructor(private router: Router,public HousingCleanupFactory : HousingCleanUpService, public translateService: TranslateService) { }

    ngOnInit() {
        this.checkAgyLocationExist();
    }
    
    checkAgyLocationExist() {
        const locExist = this.HousingCleanupFactory.checkAgyLocationExist().subscribe(exist => {
           if(exist) {
               this.disableHousingCleanUpBtn=true;
           }else {
               this.disableHousingCleanUpBtn=false;
           } 
        });
    }
  cleanData(){
 const isDataCleaned = this.HousingCleanupFactory.cleanUpHousingData().subscribe( result => {
            this.dataCleaned=result;
            
                if (this.dataCleaned === 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('housing.cleanupFailed');
                    this.show();
                } else {
                    this.type = 'success';
                    this.message = this.translateService.translate('housing.cleanupSuccessful');
                    this.show();
                }
        });
  }
  
  assignDefaultLocation(){
      const assignLoc = this.HousingCleanupFactory.assignDefaultLocation().subscribe(result => {
          if(result>0) {
              this.type = 'success';
              this.message = this.translateService.translate('housing.defaultlocationassignment');
              this.show();
          }else if(result==0){
              this.type = 'warn';
              this.message = this.translateService.translate('housing.norecordfoundtoreset');
              this.show();
          }else {
              this.type = 'error';
              this.message = this.translateService.translate('housing.cleanupFailed');
              this.show();
          }
      });
  }
  
  createAndAdmitOffender(){
      const assignLoc = this.HousingCleanupFactory.createAndAdmitOffender().subscribe(result => {
          if(result>0) {
              this.type = 'success';
              this.message = this.translateService.translate('housing.cleanupSuccessful');
              this.show();
          }else if(result==0){
              this.type = 'warn';
              this.message = this.translateService.translate('housing.norecordfoundtoreset');
              this.show();
          }else {
              this.type = 'warn';
              this.message = this.translateService.translate('housing.cleanupFailed');
              this.show();
          }
      });
  }
  
  show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
  }
}