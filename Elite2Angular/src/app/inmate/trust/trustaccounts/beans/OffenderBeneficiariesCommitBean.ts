import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderBeneficiaries } from '@inmate/trust/trustaccounts/beans/OffenderBeneficiaries';
import { OffFeeBillTransactions } from  '@cf/deductions/beans/OffFeeBillTransactions';
import { offBillingStatements } from '@cf/offendertransactions/beans/offBillingStatements';


export class OffenderBeneficiariesCommitBean extends BaseModel{
    
    private _insertList: Array<OffenderBeneficiaries>;
    private _updateList: Array<OffenderBeneficiaries>;
    private _deleteList: Array<OffenderBeneficiaries>;
    private _offFeeBillupdateList: Array<OffFeeBillTransactions>;
    private _stmtInsertList: Array<offBillingStatements>;
    
    get insertList(): Array<OffenderBeneficiaries> { return this._insertList; }    
    set insertList( insert: Array<OffenderBeneficiaries> ) { this._insertList = insert; }
    
    get updateList(): Array<OffenderBeneficiaries> { return this._updateList; }    
    set updateList( update: Array<OffenderBeneficiaries> ) { this._updateList = update; }
    
    get deleteList(): Array<OffenderBeneficiaries> { return this._deleteList; }
    set deleteList( pdeleteList: Array<OffenderBeneficiaries> ) { this._deleteList = pdeleteList; }

    get offFeeBillupdateList(): Array<OffFeeBillTransactions> { return this._offFeeBillupdateList; }
    set offFeeBillupdateList(pupdateList: Array<OffFeeBillTransactions>) { this._offFeeBillupdateList = pupdateList; }

    get stmtInsertList(): Array<offBillingStatements> { return this._stmtInsertList; }
    set stmtInsertList(pstmtInsertList: Array<offBillingStatements>) { this._stmtInsertList = pstmtInsertList; }

toJSON(): any {
    return {
        'insertList': this._insertList,
        'updateList': this._updateList,
        'deleteList': this._deleteList,
        'offFeeBillupdateList': this._offFeeBillupdateList,
        'stmtInsertList': this._stmtInsertList,
    };
}
}