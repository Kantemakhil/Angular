import { ProgramPaySettingsBean } from './ProgramPaySettingsBean';


export class ProgramPaySettingsCommitBean  {

    private _insertList: Array<ProgramPaySettingsBean>;
    private _deleteList: Array<ProgramPaySettingsBean>;
    private _updateList: Array<ProgramPaySettingsBean>;
    


    get insertList(): Array<ProgramPaySettingsBean> { return this._insertList; }

    set insertList(pinsertList: Array<ProgramPaySettingsBean>) { this._insertList = pinsertList; }

    get deleteList(): Array<ProgramPaySettingsBean> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ProgramPaySettingsBean>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ProgramPaySettingsBean> { return this._updateList; }

    set updateList(pupdateList: Array<ProgramPaySettingsBean>) { this._updateList = pupdateList; }
    
       toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
