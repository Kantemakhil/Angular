import {BaseModel} from '@commonbeans/BaseModel';
import { AgyIncInvStatements } from '@instoicbeans/AgyIncInvStatements';

export class AgyIncInvStatementsCommitBean extends BaseModel {
private _insertList: Array<AgyIncInvStatements>;
  private _deleteList: Array<AgyIncInvStatements>;
  private _updateList: Array<AgyIncInvStatements>;

  get insertList(): Array<AgyIncInvStatements> { return this._insertList; }

  set insertList(pinsertList: Array<AgyIncInvStatements>) { this._insertList = pinsertList; }

  get deleteList(): Array<AgyIncInvStatements> { return this._deleteList; }

  set deleteList(pdeleteList: Array<AgyIncInvStatements>) { this._deleteList = pdeleteList; }

  get updateList(): Array<AgyIncInvStatements> { return this._updateList; }

  set updateList(pupdateList: Array<AgyIncInvStatements>) { this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }

}
