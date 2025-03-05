import { HttpService } from "@core/service/http.service";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class OumsysetService {
  constructor(private http: HttpService) {}

  loadColDef() {
    const datatypes = [
      {
        fieldName: "Key Desc",
        field: "KEY_DESC",
        dataType: "text",
        required: false,
        editable: false,
        uppercase: 'false'
      },
      {
        fieldName: "Key Code",
        field: "KEY_CODE",
        dataType: "text",
        required: false,
        editable: false,
        uppercase: 'false'
      },
      {
        fieldName: "Value",
        field: "VALUE",
        dataType: "text",
        required: true,
        editable: true,
        uppercase: 'false'
      },
      {
        fieldName: "",
        field: "TEMP",
        dataType: "text",
        editable: false
      },
    ];
    return of(datatypes);
  }
  loadLanPgColDef() {
    const lanPgConfigColDef = [
      {
        fieldName: "Key Code",
        field: "KEY_CODE",
        dataType: 'text',
        required: false,
        editable: false,
        hide: false,
        uppercase: 'false'
      },
      {
        fieldName: "Key Desc",
        field: "KEY_DESC",
        dataType: 'text',
        required: false,
        editable: false,
        hide: false,
        uppercase: 'false'
      },
      {
        fieldName: "Value",
        field: "VALUE",
        dataType: 'lov',
        required: true,
        editable: true,
        hide: false,
        source: '',
        link: 'ouminsdb/insightModDashboard?KEY_CODE=',
        uppercase: 'false'
      }
    ];
    return of(lanPgConfigColDef);
  }
  loadIntegColDef() {
    const integDataTypes = [
      {
        fieldName: "Key Code",
        field: "KEY_CODE",
        dataType: "text",
        required: false,
        editable: false,
        uppercase: 'false'
      },
      {
        fieldName: "Key Desc",
        field: "KEY_DESC",
        dataType: "text",
        required: false,
        editable: false,
        uppercase: 'false'
      },
      {
        fieldName: "Connection Url",
        field: "CONNECTION_URL",
        dataType: "text",
        required: true,
        editable: true,
        uppercase: 'false'
      },
      {
        fieldName: "Queue Name",
        field: "QUEUE_NAME",
        dataType: "text",
        required: true,
        editable: true,
        uppercase: 'false'
      },
    ];
    return of(integDataTypes);
  }
  loadPhnMaskColDef() {
    // return this.http.post("oumsyset/getSysSettingData", data);
    const datatypes = [
      {
        fieldName: "Code",
        field: "maskingCode",
        dataType: "text",
        required: true,
        editable: false,
      },
      {
        fieldName: "Description",
        field: "maskingDescription",
        dataType: "text",
        required: true,
        editable: false,
      },
      {
        fieldName: "Mask Format",
        field: "maskFormat",
        dataType: "text",
        required: true,
        editable: true,
      },
      {
        fieldName: "Sequence",
        field: "sequence",
        dataType: 'number',
        required: true,
        editable: true,
      },
      {
        fieldName: "Active",
        field: "formatStatus",
        dataType: "checkbox",
        required: false,
        editable: true,
      },
      {
        fieldName: "Expiry Date",
        field: "expiryDate",
        dataType: "date",
        required: false,
        editable: false,
      },
    ];
    return of(datatypes);
  }

  incedentReportingColDef() {
    // return this.http.post("oumsyset/getSysSettingData", data);
    const datatypes = [
      {
        fieldName: "Key Code",
        field: "KEY_CODE",
        dataType: "text",
        required: true,
        editable: false,
        hide: false,
        uppercase: 'false'
      },
      {
        fieldName: "Key Desc",
        field: "KEY_DESC",
        dataType: "text",
        required: true,
        editable: false,
        hide: false,
        uppercase: 'false'
      },
      {
        fieldName: "Value",
        field: "VALUE",
        dataType: "text",
        required: true,
        editable: true,
        hide: false,
        uppercase: 'false'
      },
    ];
    return of(datatypes);
  }
  

  loadJsonData(data) {
    return this.http.post("oumsyset/getSysSettingData", data);
  }
  getSysSettingPageData(data) {
    return this.http.post("oumsyset/getSysSettingPageData", data);
  }
  loadLanPgConfigJsonData(data) {
    return this.http.get('ouminsdb/insightModDashboard?KEY_CODE='+data);
  }
  updateRowData(data){
    return this.http.post("oumsyset/updateSysSettingData", data);
  }
  getSelectedProvider(settingType) {
    return this.http.post("oumsyset/getSelectedProvider", settingType);
  }
  getPhoneFormates() {
    return this.http.get('oumsyset/getPhoneFormates');
  }
  getCountryList(domain,moduleName){
		return this.http.get('getReferenceDomainCodes?domain=' + domain + '&moduleName=' + moduleName);
	}

  emailSmsTestFooterColDef() {
    // return this.http.post("oumsyset/getSysSettingData", data);
    const datatypes = [
      {
        fieldName: "Key Code",
        field: "KEY_CODE",
        dataType: "text",
        required: true,
        editable: false,
        hide: false,
        uppercase: 'false'
      },
      {
        fieldName: "Key Desc",
        field: "KEY_DESC",
        dataType: "text",
        required: true,
        editable: false,
        hide: false,
        uppercase: 'false'
      },
      {
        fieldName: "Value",
        field: "VALUE",
        dataType: "text",
        required: true,
        editable: true,
        hide: false,
        uppercase: 'false'
      },
    ];
    return of(datatypes);
  }


  viewAuditLogColDef() {
    const datatypes = [
      {
        fieldName: "Key Code",
        field: "KEY_CODE",
        dataType: "text",
        required: true,
        editable: false,
        hide: false,
        uppercase: 'false'
      },
      {
        fieldName: "Key Desc",
        field: "KEY_DESC",
        dataType: "text",
        required: true,
        editable: false,
        hide: false,
        uppercase: 'false'
      },
      {
        fieldName: "Value",
        field: "VALUE",
        dataType: "text",
        required: true,
        editable: true,
        hide: false,
        uppercase: 'false'
      },
    ];
    return of(datatypes);
  }
  
}
