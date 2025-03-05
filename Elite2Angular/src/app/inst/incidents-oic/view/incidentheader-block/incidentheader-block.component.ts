import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
@Component( {
    selector: 's4-incidentheader-block',
    templateUrl: './incidentheader-block.component.html',
    styleUrls: []
} )
export class IncidentHeaderBlockComponent implements OnInit {

    private innerIncident: any = {};
    caseLoadId: string;
    @Input() link = "/OIDINCDE";
    reportLink: string;
    disableAlert = true;
    time: Date;
    locationFlag:boolean;
    constructor( public translateService: TranslateService, private sessionManager: UserSessionManager) { }

    ngOnInit() {
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.locationFlag= this.sessionManager.currentCaseLoadType === "COMM" ?false:true;
    }

    get incident(): any {
        return this.innerIncident;
    }

    @Input()
    set incident( v: any ) {
        if ( this.innerIncident !== v ) {
            if ( v ) {
                if ( v.incidentDate && !( v.incidentDate instanceof Date ) ) {
                    v.incidentDate = DateFormat.getDate( v.incidentDate );

                }
                if ( v.reportDate && !( v.reportDate instanceof Date ) ) {
                    v.reportDate = DateFormat.getDate( v.reportDate );
                }
                if ( v.incidentTime && !( v.incidentTime instanceof Date ) ) {
                    v.incidentTime = DateFormat.getDate( v.incidentTime );
                    const strTimeValue = v.incidentTime.getHours() + ':' + v.incidentTime.getMinutes();
                    v.incidentTime = TimeFormat.parse( strTimeValue, v.incidentTime );
                }
                if ( v.reportTime && !( v.reportTime instanceof Date ) ) {
                    v.reportTime = DateFormat.getDate( v.reportTime );
                    const strTimeValue = v.reportTime.getHours() + ':' + v.reportTime.getMinutes();
                    v.reportTime = TimeFormat.parse( strTimeValue, v.reportTime );
                }
                if(v.reportStaffIdAsCode){
                    v.reportStaffIdAsCode = this.addSpace(v.reportStaffIdAsCode);
                }
                if(v.createUserId && v.createStaffName){
                    v.createStaffName = this.addSpace(v.createStaffName);
                }
                this.innerIncident = v;
                if ( !this.innerIncident.agencyIncidentId ) {
                    this.disableAlert = true;
                } else
                    this.disableAlert = false;
            }
        } else {
            this.innerIncident = {};
            this.disableAlert = true;
        }
    }

    addSpace(text) {
        let result = text.indexOf(",");
        if (result > 0) {
            let arr = text.split(',');
            let newText = arr[0].trim() + ', ' + arr[1].trim();
            return newText;
        }
        return text;
    }

}

