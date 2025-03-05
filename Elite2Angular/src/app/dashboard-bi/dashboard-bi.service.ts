import { catchError } from 'rxjs/operators';
import { Subject, Observable, throwError } from 'rxjs';
import { InsightBeans } from './beans/insightBeans';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { HttpService } from '@core/service/http.service';
import * as CryptoJS from 'crypto-js';
import { TranslateService } from '@common/translate/translate.service';

@Injectable({
  providedIn: "root",
})
export class DashboardBiService {
  public sharedBiUrl: any;
  private header: HttpHeaders;
  formData = new InsightBeans();
  public environment = "enterprise";
  public token = "";
  public adminToken = "";
  public dashboards: any;
  public toggle = new Subject();
  public datasources: any;
  public baseUrl: any;
  public dashboardServerApiUrl: string;
  encrypted: CryptoJS.lib.WordArray;
  insightUserGroups: string;
  InsightRoolUrl: any;
  siteIdentifier: string;
  insightUserId: string;
  embedSecret: string;
  userEmail: string;
  userAuthEmail: string;
  isCreateAccess: boolean = false;
  boldBIUserId: number;
  msglist: any[];
  msgs: any[];
  constructor(
      private http: HttpClient,
      private httpService: HttpService,
      public translateService: TranslateService,
  ) {
    
  }
  getUserToken(): Observable<any>{
    if (this.environment == "enterprise") {
      this.baseUrl = this.InsightRoolUrl + "/" + this.siteIdentifier;
      this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/" + this.siteIdentifier;
    } else {
        this.baseUrl = this.InsightRoolUrl;
        this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/";
    }
    return this.httpService.get('oumsyset/getInsSecrToken?emailId=' + this.userEmail);
  }
  getAdminToken(email?: string): Observable<any>{
    if (this.environment == "enterprise") {
      this.baseUrl = this.InsightRoolUrl + "/" + this.siteIdentifier;
      this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/" + this.siteIdentifier;
    } else {
        this.baseUrl = this.InsightRoolUrl;
        this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/";
    }
    return this.httpService.get('oumsyset/getInsSecrToken?emailId=' + email);
  }
  getBiUser(email, token: string): Observable<any>{
    if (this.environment == "enterprise") {
      this.baseUrl = this.InsightRoolUrl + "/" + this.siteIdentifier;
      this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/" + this.siteIdentifier;
    } else {
        this.baseUrl = this.InsightRoolUrl;
        this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/";
    }
    this.header = new HttpHeaders();
    this.header = this.header.append("Access-Control-Allow", "*");
    this.header = this.header.append("Access-Control-Allow-Origin", "*");
    this.header = this.header.append("Authorization", "bearer " + token);
    return this.http.get(this.dashboardServerApiUrl + '/' + this.insightUserId + '/' + email,
      {headers: this.header}).pipe((res) => {
        return <any>res;
      });
  }
  getUserGroups(id, token: string): Observable<any>{
    this.header = new HttpHeaders();
    this.header = this.header.append("Access-Control-Allow", "*");
    this.header = this.header.append("Access-Control-Allow-Origin", "*");
    this.header = this.header.append("Authorization", "bearer " + token);
    return this.http.get(
      this.dashboardServerApiUrl + '/'+ this.insightUserId +'/'+ id +'/groups', { headers: this.header }).pipe((res) => {
      return <any>res;
    });
  }
  getUserPermissions(id, token: string): Observable<any>{
    this.header = new HttpHeaders();
    this.header = this.header.append("Access-Control-Allow", "*");
    this.header = this.header.append("Access-Control-Allow-Origin", "*");
    this.header = this.header.append("Authorization", "bearer " + token);
    return this.http.get(
      this.dashboardServerApiUrl + '/v4.0/permissions/users/' + id, { headers: this.header }).pipe((res) => {
      return <any>res;
    });
  }
  getDashboards(token: string) {
    if (this.environment == "enterprise") {
      this.baseUrl = this.InsightRoolUrl + "/" + this.siteIdentifier;
      this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/" + this.siteIdentifier;
    } else {
        this.baseUrl = this.InsightRoolUrl;
        this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/";
    }
    this.header = new HttpHeaders();
    this.header = this.header.append("Access-Control-Allow-Origin", "*");
    this.header = this.header.append("Authorization", "bearer " + token);
    return this.http
      .get(
        this.dashboardServerApiUrl + '/v4.0/items?ItemType=Dashboard', {
        headers: this.header,
      })
      .pipe((res) => {
        return <any>res;
      });
  }
  getDataSources(token: string) {
    if (this.environment == "enterprise") {
      this.baseUrl = this.InsightRoolUrl + "/" + this.siteIdentifier;
      this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/" + this.siteIdentifier;
    } else {
        this.baseUrl = this.InsightRoolUrl;
        this.dashboardServerApiUrl = this.InsightRoolUrl + "/api/";
    }
    this.header = new HttpHeaders();
    this.header = this.header.append("Access-Control-Allow-Origin", "*");
    this.header = this.header.append("Authorization", "bearer " + token);
    return this.http
      .get(
        this.dashboardServerApiUrl + '/v4.0/items?ItemType=Datasource', {
        headers: this.header,
      })
      .pipe((res) => {
        return <any>res;
      });
  }
  getInsightUserMail(obj) {
    return this.httpService.get('userinfo/getemail')
    .pipe((res) => {
      return <any>res;
    });
  }

  //The set method is use for encrypt the value.
  set(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }
  //The get method is use for decrypt the value.
  getDecrypt(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  getDecryptBase64(keys, value){
    const encrypted = decodeURIComponent(value);
    var iv = decodeURIComponent(keys);
    const encrypted2 = CryptoJS.enc.Base64.parse(encrypted);
    var ive = CryptoJS.enc.Base64.parse(iv);

    var secretOne = "CLICKBANKINFS";
    var secretTwo = CryptoJS.SHA1(secretOne);
    var secretThree = secretTwo.toString().substring(0,32);
    var decrypted = CryptoJS.AES.decrypt(encrypted, secretThree, { 
            iv: ive,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  getInsDashboardId(obj) {
    return this.httpService.post('ouminsdb/getInsDashboardId', obj);
  }
  getInsSecrToken(email?: string) {
    return this.httpService.get('oumsyset/getInsSecrToken?emailId=' + email);
  }
  show(type, message) {
    this.msglist = [];
    this.msglist.push({ message: message, type: type });
    this.msgs = [...this.msglist];
  }
}
