import { BaseModel } from '@commonbeans/BaseModel';
import { CourseActivityProfiles } from '@cm/programsservices/maintenance/beans/CourseActivityProfiles';
export class CourseActivityProfilesCommitBean extends BaseModel {
    private _insertList: Array<CourseActivityProfiles>;
    private _deleteList: Array<CourseActivityProfiles>;
    private _updateList: Array<CourseActivityProfiles>;
    private _sealFlag: string;

    get insertList(): Array<CourseActivityProfiles> { return this._insertList; }

    set insertList(pinsertList: Array<CourseActivityProfiles>) { this._insertList = pinsertList; }

    get deleteList(): Array<CourseActivityProfiles> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CourseActivityProfiles>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CourseActivityProfiles> { return this._updateList; }

    set updateList(pupdateList: Array<CourseActivityProfiles>) { this._updateList = pupdateList; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'sealFlag': this._sealFlag,
        };
    }
}