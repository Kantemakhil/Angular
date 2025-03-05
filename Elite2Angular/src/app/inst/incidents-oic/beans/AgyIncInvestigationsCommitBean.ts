import {BaseModel} from '@commonbeans/BaseModel';
import { AgyIncInvestigations } from '@instoicbeans/AgyIncInvestigations';
import { AgyIncInvStatements } from '@instoicbeans/AgyIncInvStatements';

export class AgyIncInvestigationsCommitBean extends BaseModel {
private _insertList: Array<AgyIncInvestigations>;
  private _deleteList: Array<AgyIncInvestigations>;
  private _updateList: Array<AgyIncInvestigations>;
  private _insertListInv: Array<AgyIncInvStatements>;
  private _updateListInv: Array<AgyIncInvStatements>;

  get insertListInv(): Array<AgyIncInvStatements> { return this._insertListInv; }

  set insertListInv(pinsertListInv: Array<AgyIncInvStatements>) { this._insertListInv = pinsertListInv; }

  get updateListInv(): Array<AgyIncInvStatements> { return this._updateListInv; }

  set updateListInv(pupdateListInv: Array<AgyIncInvStatements>) { this._updateListInv = pupdateListInv; }

  get insertList(): Array<AgyIncInvestigations> { return this._insertList; }

  set insertList(pinsertList: Array<AgyIncInvestigations>) { this._insertList = pinsertList; }

  get deleteList(): Array<AgyIncInvestigations> { return this._deleteList; }

  set deleteList(pdeleteList: Array<AgyIncInvestigations>) { this._deleteList = pdeleteList; }

  get updateList(): Array<AgyIncInvestigations> { return this._updateList; }

  set updateList(pupdateList: Array<AgyIncInvestigations>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList,
      'insertListInv': this._insertListInv,
      'updateListInv': this._updateListInv
    };
  }
}
