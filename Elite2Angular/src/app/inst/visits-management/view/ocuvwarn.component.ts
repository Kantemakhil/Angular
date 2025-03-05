import {
      Component,
      OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuvwarnService } from '../service/ocuvwarn.service';
import { OffenderRestrictions } from '@inst/visits-management/beans/OffenderRestrictions';
import { VisitorRestrictions } from '@inst/visits-management/beans/VisitorRestrictions';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OidvisitService } from '../service/oidvisit.service';

@Component({
      selector: 'app-ocuvwarn',
      templateUrl: './ocuvwarn.component.html'
})

export class OcuvwarnComponent implements OnInit {
      visitorNameTempBan: string;
      visitorNameTemp: string;
      gAgeLimit: number;
      offenderrestrictionModelTemp: OffenderRestrictions = new OffenderRestrictions();
      //  Variable declaration
      @ViewChild('dialog', {static: true}) dialog: DialogComponent;
      actionName: string;
      lovModel: any[];
      msgs: any[] = [];
      nameOfLovPage: string;
      listToCompare: any[] = [];

      offenderrestrictionData: OffenderRestrictions[] = [];
      offenderrestrictionDataTemp: OffenderRestrictions[] = [];
      offenderrestrictionModel: OffenderRestrictions = new OffenderRestrictions();
      offenderrestrictionIndex = 0;
      visitorrestrictionsData: VisitorRestrictions[] = [];
      visitorrestrictionsDataTemp: VisitorRestrictions[] = [];
      visitorrestrictionsModel: VisitorRestrictions = new VisitorRestrictions();
      visitorrestrictionsIndex: number;
      minDate: Date;
      display: boolean;
      errorMessage: string;
      headerMessage: string;
      disabled: boolean;
      editable = true;
      offenderRestrictionColumnDef: any[];
      visitorRestrictionsColumnDef: any[];
      visitorRestrictionsReadOnly = false;
      visitorNameReadOnly = false;
      offenderRestrictionReadOnly = false;
      offenderNameReadOnly = false;
      visitorName: any;
      constructor(private ocuvwarnFactory: OcuvwarnService, public translateService: TranslateService,private oidvisitFactory: OidvisitService) {
            this.offenderRestrictionColumnDef = [];
            this.visitorRestrictionsColumnDef = [];
      }
      ngOnInit() {
            this.gAgeLimit = 0;
            const systemProfileAge = this.oidvisitFactory.getProfileValues('CLIENT', 'VISIT_AGE');
            systemProfileAge.subscribe(visitorDetilsResultData => {
                  if (visitorDetilsResultData) {
                        this.gAgeLimit = visitorDetilsResultData.profileValue;
                  }
            });
            this.offenderrestrictionModel = new OffenderRestrictions();
            this.offenderrestrictionModel.personId = this.dialog.data.personId;
            this.offenderrestrictionModel.visitDate = this.dialog.data.visitDate;
            this.offenderrestrictionModel.offenderBookId = this.dialog.data.offenderBookId;
            if (this.dialog.data.inVoke === 'VISITOR') {
                  this.getPersonDetails();
            } else {
                  this.getOffenderRetstictions();
            }



            this.offenderRestrictionColumnDef = [
                  { fieldName: '', field: 'restrictionDesc', editable: false, width: 150 },
                  { fieldName: '', field: 'restrictionDate', editable: false, width: 150 },
            ];
            this.visitorRestrictionsColumnDef = [
                  { fieldName: '', field: 'restrictionDate', editable: false, width: 150 },
                  { fieldName: '', field: 'nbtRestrictionDesc', editable: false, width: 150 },
                  { fieldName: '', field: 'nbtGlobalRestriction', editable: false, width: 150 },
            ];
      }
      getPersonDetails() {

            const ppersonDetails = this.ocuvwarnFactory.getPersonNames(this.offenderrestrictionModel);
            ppersonDetails.subscribe(result => {
                  if (result.length === 0) {
                        this.offenderrestrictionModelTemp = new OffenderRestrictions();
                        this.visitorNameTemp = undefined;
                  } else {
                        this.offenderrestrictionModelTemp = result;
                         this.visitorNameTemp = undefined;
                        this.visitorNameTemp = this.translateService.translate('ocuvwarn.visitor') + '  ' + result.lastName + ', '
                         + result.firstName + ' ' +
                        this.translateService.translate('ocuvwarn.hasanactive');
                              this.visitorNameTempBan = this.visitorNameTemp;
                  }
                        this.getVisitorRetstictions();
            });
      }
      getVisitorRetstictions() {
            const populateDetails = this.ocuvwarnFactory.populateVisitorDetails(this.offenderrestrictionModel);
            populateDetails.subscribe(visitorDetilsResultData => {
                  if (!visitorDetilsResultData || visitorDetilsResultData.length === 0) {
                        this.offenderrestrictionData = [];
                        this.visitorNameTempBan = undefined;
                        if (this.dialog.data.age !== null && this.dialog.data.age < this.gAgeLimit) {
                              this.visitorNameTemp = undefined;
                              this.visitorNameTemp = this.translateService.translate('ocuvwarn.visitor') + '  ' +
                              this.offenderrestrictionModelTemp.lastName + ', ' +
                                    this.offenderrestrictionModelTemp.firstName + ' ' +
                                     this.translateService.translate('ocuvwarn.isunderage') + this.gAgeLimit;
                              this.visitorNameTempBan = this.visitorNameTemp;
                        }
                  } else {
                        for (let i = 0; i < visitorDetilsResultData.length; i++) {
                              if (visitorDetilsResultData[i].description === 'GLOBAL RESTRICTION') {
                              visitorDetilsResultData[i].description = 'Global Restriction';
                              } else {
                                    visitorDetilsResultData[i].description = '';
                              }
                        }
                        this.offenderrestrictionData = visitorDetilsResultData;
                        if (this.dialog.data.age !== null && this.dialog.data.age < this.gAgeLimit) {
                              this.visitorNameTemp = undefined;
                              this.visitorNameTemp = this.translateService.translate('ocuvwarn.visitor') + '  ' +
                               this.offenderrestrictionModelTemp.lastName +
                               ', ' + this.offenderrestrictionModelTemp.firstName + ' ' +
                                this.translateService.translate('ocuvwarn.isunderage') + this.gAgeLimit;
                              this.visitorName = this.visitorNameTemp;
                        }
                  }
            });

      }
      onYesButtonclick() {
            this.dialog.close(true);
      }
      onNoButtonclick() {
            this.dialog.close(false);
      }
      onRowClickvisitorrestrictions(event) {
      }
      allowNumbers(event) {
      }
      onButYesclick() {
      }
      onButNoclick() {
      }
      onRowClickoffenderrestriction(event) {
      }
      ok() {
      }
      no() {
      }
      cancel() {
      }
      onOffenderChange(offender) {
      }
      offenderrestrictionExecuteQuery() {
            if (this.visitorNameTemp) {
                  this.offenderrestrictionModel.sealFlag = this.visitorNameTemp;
            }
            const offenderrestrictionResult = this.ocuvwarnFactory.offenderRestrictionExecuteQuery(this.offenderrestrictionModel);
            offenderrestrictionResult.subscribe(data => {
                  if (data.length === 0) {
                        this.offenderrestrictionData = [];
                  } else {
                        for (let i = 0; i < data.length; i++) {
                              data[i].restrictionDate = data[i].effectiveDate;
                              data[i].description = data[i].restrictionDesc;
                        }
                        this.offenderrestrictionData = data;
                  }
                  this.visitorName = this.offenderrestrictionData[0].sealFlag;
            });
      }
      getOffenderRetstictions() {
            this.getOffenderNames(this.dialog.data.offenderId);
      }
      getOffenderNames(event) {
            const offenderNamesResult = this.ocuvwarnFactory.getOffenderNames(event);
            offenderNamesResult.subscribe(dataOffName => {
                  if (!dataOffName || dataOffName.length === 0) {
                  } else {
                        this.visitorNameTemp = undefined;
                        this.visitorNameTemp = this.translateService.translate('ocuvwarn.offender') + '   ' +
                        dataOffName.lastName + ', ' + dataOffName.firstName +
                              '   ' + this.translateService.translate('ocuvwarn.hasanactive');
                  }
                  this.offenderrestrictionExecuteQuery();
            });
      }
      }
