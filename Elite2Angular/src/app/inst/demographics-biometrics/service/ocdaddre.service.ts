import { Injectable } from '@angular/core';


import { HttpService } from '../../../core/service/http.service';

@Injectable({providedIn: 'root'})
export class OcdaddreService {
    constructor( private http: HttpService ) { }
    /** This is description of the vAddExecuteQuery function*/
    vAddExecuteQuery( obj ) {
        return this.http.post( 'ocdaddre/vAddExecuteQuery', obj );
    }
    /** This is description of the addrExecuteQuery function*/
    addrExecuteQuery( obj ) {
        return this.http.post( '/ocdaddre/addrExecuteQuery', obj );
    }
    /** This is description of the addrCommit function*/
    addrCommit( obj ) {
        return this.http.post( '/ocdaddre/addrCommit', obj );
    }
    /** This is description of the addrUsageExecuteQuery function*/
    addrUsageExecuteQuery( obj ) {
        return this.http.post( '/ocdaddre/addrUsageExecuteQuery', obj );
    }
    /** This is description of the addrUsageCommit function*/
    addrusageCommit( obj ) {
        return this.http.post( '/ocdaddre/addrUsageCommit', obj );
    }
    /** This is description of the phoneAddrExecuteQuery function*/
    phoneAddrExecuteQuery( obj ) {
        return this.http.post( '/ocdaddre/phoneAddrExecuteQuery', obj );
    }
    /** This is description of the phoneAddrCommit function*/
    phoneAddrCommit( obj ) {
        return this.http.post( '/ocdaddre/phoneAddrCommit', obj );
    }
    /** This is description of the phoneGlobalExecuteQuery function*/
    phoneGlobalExecuteQuery( obj ) {
        return this.http.post( '/ocdaddre/phoneGlobalExecuteQuery', obj );
    }
    /** This is description of the phoneGlobalCommit function*/
    phoneGlobalCommit( obj ) {
        return this.http.post( '/ocdaddre/phoneGlobalCommit', obj );
    }
    /** This is description of the emailExecuteQuery function*/
    emailExecuteQuery( obj ) {
        return this.http.post( '/ocdaddre/emailExecuteQuery', obj );
    }
    /** This is description of the emailCommit function*/
    emailCommit( obj ) {
        return this.http.post( '/ocdaddre/emailCommit', obj );
    }
    /** This is description of the rgTownRecordGroup function*/
    rgTownRecordGroup() {
        return this.http.get( '/ocdaddre/rgTownRecordGroup' );
    }
    /** This is description of the rgCountryRecordGroup function*/
    rgCountryRecordGroup() {
        return this.http.get( '/ocdaddre/rgCountryRecordGroup' );
    }
    /** This is description of the rgSdirRecordGroup function*/
    rgSdirRecordGroup() {
        return this.http.get( '/ocdaddre/rgSdirRecordGroup' );
    }
    /** This is description of the rgStateRecordGroup function*/
    rgStateRecordGroup() {
        return this.http.get( '/ocdaddre/rgStateRecordGroup' );
    }
    /** This is description of the rgAddressTypeRecordGroup function*/
    rgAddressTypeRecordGroup() {
        return this.http.get( '/ocdaddre/rgAddressTypeRecordGroup' );
    }
    /** This is description of the rgPhoneTypeRecordGroup function*/
    rgPhoneTypeRecordGroup() {
        return this.http.get( '/ocdaddre/rgPhoneTypeRecordGroup' );
    }
    /** This is description of the offBkgOnCheckDeleteMasterv_add_cur function*/
    offBkgOnCheckDeleteMasterv_add_cur( obj ) {
        return this.http.get( 'ocdaddreOffbkgoncheckdeletemastervAddCur' );
    }
    /** This is description of the offBkgOnCheckDeleteMasterphone_global_cur function*/
    offBkgOnCheckDeleteMasterphone_global_cur( obj ) {
        return this.http.get( 'ocdaddre/offBkgOnCheckDeleteMasterphoneGlobalCur' );
    }
    /** This is description of the offBkgOnCheckDeleteMasteremail_cur function*/
    offBkgOnCheckDeleteMasteremail_cur( obj ) {
        return this.http.get( 'ocdaddre/offBkgOnCheckDeleteMasteremailCur' );
    }
    /** This is description of the offBkgOnCheckDeleteMasteraddr_cur function*/
    offBkgOnCheckDeleteMasteraddr_cur( obj ) {
        return this.http.get( 'ocdaddre/offBkgOnCheckDeleteMasteraddrCur' );
    }
    /** This is description of the vAddOnCheckDeleteMasteraddr_cur function*/
    vAddOnCheckDeleteMasteraddr_cur( obj ) {
        return this.http.get( 'ocdaddre/vAddOnCheckDeleteMasteraddrCur' );
    }
    /** This is description of the nbtCityKeyListvalget_city_description_c function*/
    nbtCityKeyListvalget_city_description_c( obj ) {
        return this.http.post( 'ocdaddre/nbtCityKeyListvalgetCityDescription', obj );
    }
    /** This is description of the addrOnCheckDeleteMasterphone_addr_cur function*/
    addrOnCheckDeleteMasterphone_addr_cur( obj ) {
        return this.http.get( 'ocdaddre/addrOnCheckDeleteMasterphoneAddrCur' );
    }
    /** This is description of the addrOnCheckDeleteMasteraddr_usage_cur function*/
    addrOnCheckDeleteMasteraddr_usage_cur( obj ) {
        return this.http.get( 'ocdaddre/addrOnCheckDeleteMasteraddrUsageCur' );
    }
    /** This is description of the addrWhenCreateRecordget_country_cur (p_domain reference_domains.domain%type) function*/
    addrWhenCreateRecordget_country_cur( obj ) {
        return this.http.post( 'ocdaddre/addrWhenCreateRecordgetCountryCur', obj );
    }
    /** This is description of the ocdaddreKeyDelrec function*/
    ocdaddreKeyDelrec( obj ) {
        return this.http.get( 'ocdaddreOcdaddrekeydelrec' );
    }
    /** This is description of the ocdaddreOnDelete function*/
    ocdaddreOnDelete( obj ) {
        return this.http.get( 'ocdaddreOcdaddreondelete' );
    }
    /** This is description of the createFormGlobals function*/
    createFormGlobals( obj ) {
        return this.http.get( 'ocdaddre/createFormGlobals' );
    }
    /** This is description of the addressTypecheckActiveTypeCur function*/
    addressTypecheckActiveTypeCur( obj ) {
        return this.http.get( 'ocdaddre/addressTypecheckActiveTypeCur' );
    }
    /** This is description of the validateCityInfogetCityDescription function*/
    validateCityInfogetCityDescription( obj ) {
        return this.http.post( 'ocdaddre/validateCityInfogetCityDescription', obj );
    }
    /** This is description of the validateCityInfogetCityCode function*/
    validateCityInfogetCityCode( obj ) {
        return this.http.post( 'ocdaddre/validateCityInfogetCityCode', obj );
    }
    /** This is description of the checkHdcAddressActivecheckHdcAddressCur function*/
    checkHdcAddressActivecheckHdcAddressCur( obj ) {
        return this.http.get( 'ocdaddre/checkHdcAddressActivecheckHdcAddressCur' );
    }
    /** This is description of the checkHdcAddressActive function*/
    checkHdcAddressActive( obj ) {
        return this.http.get( 'ocdaddre/checkHdcAddressActive' );
    }
    /** This is description of the checkHdcAddressExistcheckHdcAddressCur function*/
    checkHdcAddressExistcheckHdcAddressCur( obj ) {
        return this.http.get( 'ocdaddre/checkHdcAddressExistcheckHdcAddressCur' );
    }
    /** This is description of the keyDeleteRecord function*/
    keyDeleteRecord( obj ) {
        return this.http.get( 'ocdaddreKeydeleterecord' );
    }

    /** This is description of the vAddressAndPhoneExecuteQuery function*/
    vAddressAndPhoneExecuteQuery( obj ) {
        return this.http.post( 'ocdaddre/vAddressAndPhoneExecuteQuery', obj);
    }
}
