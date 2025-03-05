import { Component, OnInit, Injectable, Input } from '@angular/core';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DatePipe } from '@angular/common';

@Component( {
    templateUrl: './housing_allocation.component.html',
    providers: [],
    styleUrls: ['./housing_allocation.component.scss'],
    selector: 'housing-allocation'
} )

@Injectable({providedIn: 'root'})
export class HousingAllocationComponent implements OnInit {
    
    private innerOffender: any = {};
    offenderName:string='';
    dob:string;
    ishideStatus:boolean;
   

    @Input() offenderDetails = new VHeaderBlock();
 
    constructor(public translateService: TranslateService) {
    }
    ngOnInit(){
    }
    
    get offender(): any {
        return this.innerOffender;
    }

    @Input()
    set offender(v: any) {
        this.offenderName= v.firstName+" "+v.lastName;
        if (this.innerOffender !== v) {
            if (v) {
                if (v.birthDate && (v.birthDate instanceof Date)) {
                    v.birthDate = DateFormat.getDate(v.birthDate);
                    const datePipe = new DatePipe('en-US');
                    this.dob = datePipe.transform( v.birthDate, 'dd/MM/yyyy');
                }
                this.innerOffender = v;
                if(this.innerOffender.activeFlag =='Y'){
                    this.ishideStatus=false;
                   
                }else{
                   
                    this.ishideStatus=true;
                }
            } else {
                this.innerOffender = {};
            }
        }
    }
}