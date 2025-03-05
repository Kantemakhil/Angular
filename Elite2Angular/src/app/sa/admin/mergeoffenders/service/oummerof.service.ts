import { Injectable } from '@angular/core';
import { VNameSearch } from '@common/beans/VNameSearch';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { HttpService } from '@core/service/http.service';
import { MergeTransactionBean } from '@sa/recordmaintenance/beans/MergeTransactionBean';


@Injectable()
export class OummerofService {
	nameLovData: VNameSearch = new VNameSearch();
    voffbkgModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    checkFlag: boolean;
	mrgprocModel:MergeTransactionBean;
	constructor(private http: HttpService) {}
	/** This is description of the offBooksExecuteQuery function*/
	offBooksExecuteQuery(obj) {
		return this.http.post('oummerof/offBooksExecuteQuery',obj);
	}
	/** This is description of the offBooks2ExecuteQuery function*/
	offBooks2ExecuteQuery(obj) {
		return this.http.post('oummerof/offBooks2ExecuteQuery',obj);
	}
	vOffBkgExecuteQuery(obj) {
        return this.http.post('oummerof/vOffBkgExecuteQuery', obj);
	}
	manualCreateRequest(obj) {
        return this.http.post('oummerof/manualCreateRequest', obj);
	}
	chkOffendersForTransfer(obj) {
        return this.http.post('oummerof/chkOffendersForTransfer', obj);
    }
	getNewOffId(offBookId){
		return this.http.get('oummerof/getNewOffId?offBookId=' + offBookId);
	}
	//copied from oumtrnbk(5 meth)
	mrgProcExecuteQuery(obj) {
        return this.http.post('oummerof/mrgProcExecuteQuery', obj);
    }
    /** This is description of the mrgProcCommit function*/
    mrgProcCommit(obj) {
        return this.http.post('oummerof/mrgProcCommit', obj);
    }
    chkOffendersForTransfer1(obj) {
        return this.http.post('oummerof/chkOffendersForTransfer1', obj);
    }
    processTransferTransaction(obj) {
        return this.http.post('oummerof/processTransferTransaction', obj);
    }
    mrgProcExecuteQueryRet(obj) {
        return this.http.post('oummerof/mrgProcExecuteQueryRet', obj);
    }   
}
