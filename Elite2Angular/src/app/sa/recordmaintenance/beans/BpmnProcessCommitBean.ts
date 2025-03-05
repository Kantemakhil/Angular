import { BpmnProcess } from './BpmnProcess';

export class BpmnProcessCommitBean {
    private _insertList: Array<BpmnProcess>;
    private _deleteList: Array<BpmnProcess>;
    private _updateList: Array<BpmnProcess>;
    private _sourceModule: string;

    get insertList(): Array<BpmnProcess> { return this._insertList; }

    set insertList(pinsertList: Array<BpmnProcess>) { this._insertList = pinsertList; }

    get deleteList(): Array<BpmnProcess> { return this._deleteList; }

    set deleteList(pdeleteList: Array<BpmnProcess>) { this._deleteList = pdeleteList; }

    get updateList(): Array<BpmnProcess> { return this._updateList; }

    set updateList(pupdateList: Array<BpmnProcess>) { this._updateList = pupdateList; }

    get sourceModule(): string { return  this._sourceModule; }
    set sourceModule(psourceModule: string) { this._sourceModule = psourceModule; }
    

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'sourceModule':this._sourceModule
        };
    }
}
