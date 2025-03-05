import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Observable } from 'rxjs';
import { HttpService } from '@core/service/http.service';

@Injectable({providedIn: 'root'})
export class OiuimageService {
    /* This is to store image */
    image: any;
    /* This is to store camera compoent */
    cameraCompoent: any;
    constructor(private http: HttpService, private httpClient: HttpClient, private sessionManager: UserSessionManager) { }
    /** This is description of the imagesExecuteQuery function*/
    imagesExecuteQuery(obj) {
        return this.http.post('oiuimage/imagesExecuteQuery', obj);
    }
    /** This is description of the imagesCommit function*/
    imagesCommit(obj) {
        return this.http.post('oiuimage/imagesCommit', obj);
    }
    /** This is description of the imageOriginalsExecuteQuery function*/
    imageOriginalsExecuteQuery(obj) {
        return this.http.post('oiuimage/imageOriginalsExecuteQuery', obj);
    }
    /** This is description of the imageOriginalsCommit function*/
    imageOriginalsCommit(obj) {
        return this.http.post('oiuimage/imageOriginalsCommit', obj);
    }
    /** This is description of the imagePropertiesExecuteQuery function*/
    imagePropertiesExecuteQuery(obj) {
        return this.http.post('oiuimage/imagePropertiesExecuteQuery', obj);
    }
    /** This is description of the imagePropertiesCommit function*/
    imagePropertiesCommit(obj) {
        return this.http.post('oiuimage/imagePropertiesCommit', obj);
    }
    /** This is description of the sysPflExecuteQuery function*/
    sysPflExecuteQuery(obj) {
        return this.http.post('oiuimage/sysPflExecuteQuery', obj);
    }
    /** This is description of the staffMembersExecuteQuery function*/
    staffMembersExecuteQuery(obj) {
        return this.http.post('oiuimage/staffMembersExecuteQuery', obj);
    }
    /** This is description of the staffMembersCommit function*/
    staffMembersCommit(obj) {
        return this.http.post('oiuimage/staffMembersCommit', obj);
    }
    /** This is description of the personsExecuteQuery function*/
    personsExecuteQuery(obj) {
        return this.http.post('oiuimage/personsExecuteQuery', obj);
    }
    /** This is description of the rgReportRecordGroup function*/
    rgReportRecordGroup() {
        return this.http.get('oiuimage/rgReportRecordGroup');
    }
    /** This is description of the rgImageViewTypeRecordGroup function*/
    rgImageViewTypeRecordGroup() {
        return this.http.get('oiuimage/rgImageViewTypeRecordGroup');
    }
    /** This is description of the rgDummyImageViewTypeRecordGroup function*/
    rgDummyImageViewTypeRecordGroup() {
        return this.http.get('oiuimage/rgDummyImageViewTypeRecordGroup');
    }
    /** This is description of the rgImagePropertiesRecordGroup function*/
    rgImagePropertiesRecordGroup() {
        return this.http.get('oiuimage/rgImagePropertiesRecordGroup');
    }

    imageOriginalsUpdateImageOriginals(obj) {
        return this.http.post('oiuimage/imageOriginalsUpdateImageOriginals', obj);
    }

    getNextImageId() {
        return this.http.get('oiuimage/getNextImageId');
    }
    getCode(code) {
        return this.http.get('/oiuimage/getCode?code=' + code);
    }
 getPropertyTypeDescription(code) {
        return this.http.get('/oiuimage/getPropertyTypeDescription?code=' + code);
    }
    allowDelete() {
        return this.http.get('oiuimage/allowDelete');
    }
    checkUserRole(moduleName) {
        return this.http.get('oiuimage/checkUserRole?moduleName=' + moduleName);
    }

    upload(formData):Observable<any> { 
        const httpOptions = {
			headers: new HttpHeaders({
			  'Authorization': this.sessionManager.getTokenType()
			  + ' ' + this.sessionManager.getAccessToken() ,
			  'Accept' : '*/*'
			})
	    };
        return this.httpClient.post(this.getBaseUrl()+'/Elite2Web/api/oiuimage/imagesCommit', formData, httpOptions);
    }

    getBaseUrl(){
        var baseUrl = window.location.origin;
        if (!window.location.origin) {
            baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        return baseUrl;
    }
    
    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[arr.length - 1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

}
