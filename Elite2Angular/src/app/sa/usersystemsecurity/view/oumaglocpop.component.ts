import {
  Component, OnInit, ViewChild
} from '@angular/core';
import {TranslateService} from '@common/translate/translate.service';
import {OumusersService} from '../service/oumusers.service';
import {DialogComponent} from '@ui-components/dialog/dialog.component';
import {CaseLoadAgencyLocations} from '@saadminbeans/CaseLoadAgencyLocations';
import {AgencyLocations} from '@saadminbeans/AgencyLocations';
@Component({
  selector: 'app-oumaglocpop',
  templateUrl: './oumaglocpop.component.html'
})

export class OumaglocpopComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  calColumnDef: any[];
  calData: CaseLoadAgencyLocations[] = [];
  calDataTemp: CaseLoadAgencyLocations[] = [];
  calModel: CaseLoadAgencyLocations = new CaseLoadAgencyLocations();
  agyData: AgencyLocations[] = [];
  data: any;
  agencyModel: AgencyLocations = new AgencyLocations();
  translateLabel: any;
  constructor(private oumusersFactory: OumusersService, public translateService: TranslateService) {
    this.calColumnDef = [];
  }
  ngOnInit() {
    this.translateLabel = JSON.parse(sessionStorage.getItem('i18data'));
    this.data = this.dialog.data;

    if (this.data) {
      this.calModel = new CaseLoadAgencyLocations();
      this.calModel.caseloadId = this.data.caseloadId;
      this.calExecuteQuery();
    }

    this.calColumnDef = [
      {
        fieldName: this.translateService.translate('common.type'), field: 'dspAgencyLocationType',
        datatype: 'text', editable: false, width: 100
      },
      {
        fieldName: this.translateService.translate('oumusers.abbbreviation'), field: 'agyLocId',
        datatype: 'text', editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('name'), field: 'description',
        datatype: 'text', editable: false, width: 250
      }

    ];

  }

  calExecuteQuery() {
    const calResult = this.oumusersFactory.calExecuteQuery(this.calModel);
    calResult.subscribe(calResultList => {
      if (calResultList.length === 0) {
        this.calData = [];
      } else {
        this.calData = calResultList;
      }
    });
  }
  clearData() {
    this.dialog.close(null);
  }

}
