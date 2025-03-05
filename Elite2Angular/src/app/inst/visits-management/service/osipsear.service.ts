import { Injectable } from '@angular/core';


import { HttpService } from '@core/service/http.service';
import { Images } from '@common/beans/Images';

@Injectable({providedIn: 'root'})
export class OsipsearService {
	imagesDataTemp = new Images();
	constructor(private http: HttpService) {}
	/** This is description of the personsExecuteQuery function*/
	personsExecuteQuery(obj) {
		return this.http.post('osipsear/personsExecuteQuery', obj);
	}
	/** This is description of the perAddrExecuteQuery function*/
	perAddrExecuteQuery(obj) {
		return this.http.post('osipsear/perAddrExecuteQuery', obj);
	}
	/** This is description of the perIdentExecuteQuery function*/
	perIdentExecuteQuery(obj) {
		return this.http.post('osipsear/perIdentExecuteQuery', obj);
	}
	/** This is description of the perIdentCommit function*/
	perIdentCommit(obj) {
		return this.http.post('osipsear/perIdentCommit', obj);
	}
	/** This is description of the imageExecuteQuery function*/
	imageExecuteQuery(obj) {
		return this.http.post('osipsear/imageExecuteQuery', obj);
	}
	/** This is description of the perInfoExecuteQuery function*/
	perInfoExecuteQuery(obj) {
		return this.http.post('osipsear/perInfoExecuteQuery', obj);
	}
	/** This is description of the perInfoCommit function*/
	perInfoCommit(obj) {
		return this.http.post('osipsear/perInfoCommit', obj);
	}
	/** This is description of the perEmpExecuteQuery function*/
	perEmpExecuteQuery(obj) {
		return this.http.post('osipsear/perEmpExecuteQuery', obj);
	}
	/** This is description of the perEmpCommit function*/
	perEmpCommit(obj) {
		return this.http.post('osipsear/perEmpCommit', obj);
	}
	/** This is description of the psPersonNameExecuteQuery function*/
	psPersonNameExecuteQuery(obj) {
		return this.http.post('osipsear/psPersonNameExecuteQuery', obj);
	}
	/** This is description of the psPersonNameCommit function*/
	psPersonNameCommit(obj) {
		return this.http.post('osipsear/psPersonNameCommit',obj);
	}
	/** This is description of the rgLanguageCodeRecordGroup function*/
	rgLanguageCodeRecordGroup(obj) {
		return this.http.get( 'osipsear/rgLanguageCodeRecordGroup');
	}
	/** This is description of the rgMaritalStatusRecordGroup function*/
	rgMaritalStatusRecordGroup(obj) {
		return this.http.get( 'osipsear/rgMaritalStatusRecordGroup');
	}
	/** This is description of the rgSexCodeRecordGroup function*/
	rgSexCodeRecordGroup(obj) {
		return this.http.get( 'osipsear/rgSexCodeRecordGroup');
	}
	/** This is description of the rgSearchTypeRecordGroup function*/
	rgSearchTypeRecordGroup(obj) {
		return this.http.get( 'osipsear/rgSearchTypeRecordGroup');
	}
	/** This is description of the rgIdentifierTypeRecordGroup function*/
	rgIdentifierTypeRecordGroup(obj) {
		return this.http.get( 'osipsear/rgIdentifierTypeRecordGroup');
	}

	 /** This is description of the personsExecuteQuery function*/
	 personsExecuteQuery1( obj ) {
        return this.http.post( 'osipsear/personsExecuteQuery1', obj );
    }
    /** This is description of the personsCommit function*/
    personsCommit( obj ) {
        return this.http.post( 'osipsear/personsCommit', obj );
    }
    /** This is description of the rgSexCodeRecordGroup function*/
    rgSexCodeRecordGroup1(  ) {
        return this.http.get( 'osipsear/rgSexCodeRecordGroup1' );
    }

	/** This is description of the profilesExecuteQuery function*/
    profilesExecuteQuery(obj) {
        return this.http.post('osipsear/profilesExecuteQuery', obj);
    }
    /** This is description of the profilesCommit function*/
    profilesCommit(obj) {
        return this.http.post('osipsear/profilesCommit', obj);
    }
    /** This is description of the rgProfileCodeRecordGroup function*/
    rgProfileCodeRecordGroup() {
        return this.http.get( 'osipsear/rgProfileCodeRecordGroup');
    }
    insertProfilesTypes(personId) {
        return this.http.get( 'osipsear/insertProfilesTypes?personId=' + personId);
    }
}
