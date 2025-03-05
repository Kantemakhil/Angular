import { BaseModel } from '@common/beans/BaseModel';
import { StaffMemberRoles } from './StaffMemberRoles';

export class UserCreation extends BaseModel {
    private _userType: string;
    private _mailId: string;
    private _userName: string;
    private _passWord: string;
    private _defaultTableSpace: string;
    private _tempTableSpace: string;
    private _passWordRepeat: string;
    private _lastName: string;
    private _firstName: string;
    private _personnelType: string;
    private _status: string;
    private _grantUserName: string;
    private _assignedCaseloadId: string;
    private _insightUserFlag:string;
    private _insightsGropId:Array<string>;

    
    private _caseLoadList: Array<any>;
    private _roleAccessList: Array<StaffMemberRoles>;

    get userType(): string { return this._userType; }
    set userType(puserType: string) { this._userType = puserType; }

    get mailId(): string { return this._mailId; }
    set mailId(pmailId: string) { this._mailId = pmailId; }

    get assignedCaseloadId(): string { return this._assignedCaseloadId; }

    set assignedCaseloadId(passignedCaseloadId: string) { this._assignedCaseloadId = passignedCaseloadId; }
    get roleAccessList(): Array<StaffMemberRoles> { return this._roleAccessList; }
    set roleAccessList(proleAccessList: Array<StaffMemberRoles>) { this._roleAccessList = proleAccessList; }

    get caseLoadList(): Array<any> { return this._caseLoadList; }

    set caseLoadList(pcaseLoadList: Array<any>) { this._caseLoadList = pcaseLoadList; }

    get grantUserName(): string { return this._grantUserName; }

    set grantUserName(pgrantUserName: string) { this._grantUserName = pgrantUserName; }

    get status(): string { return this._status; }

    set status(pstatus: string) { this._status = pstatus; }

    get lastName(): string { return this._lastName; }

    set lastName(plastName: string) { this._lastName = plastName; }

    get firstName(): string { return this._firstName; }

    set firstName(pfirstName: string) { this._firstName = pfirstName; }

    get personnelType(): string { return this._personnelType; }

    set personnelType(ppersonnelType: string) { this._personnelType = ppersonnelType; }

    get userName(): string { return this._userName; }

    set userName(puserName: string) { this._userName = puserName; }


    get passWord(): string { return this._passWord; }

    set passWord(ppassWord: string) { this._passWord = ppassWord; }

    get passWordRepeat(): string { return this._passWordRepeat; }

    set passWordRepeat(ppassWordRepeat: string) { this._passWordRepeat = ppassWordRepeat; }

    get defaultTableSpace(): string { return this._defaultTableSpace; }

    set defaultTableSpace(pdefaultTableSpace: string) { this._defaultTableSpace = pdefaultTableSpace; }

    get tempTableSpace(): string { return this._tempTableSpace; }

    set tempTableSpace(ptempTableSpace: string) { this._tempTableSpace = ptempTableSpace; }

    get insightUserFlag(): string { return this._insightUserFlag; }

    set insightUserFlag(pinsightUserFlag: string) { this._insightUserFlag = pinsightUserFlag; }

    get insightsGropId(): Array<string> { return this._insightsGropId; }
    set insightsGropId(pinsightsGropId: Array<string>) { this._insightsGropId = pinsightsGropId; }

    toJSON(): any {
        return {
            'userType': this._userType,
            'mailId': this.mailId,
            'userName': this._userName,
            'passWord': this._passWord,
            'defaultTableSpace': this._defaultTableSpace,
            'tempTableSpace': this._tempTableSpace,
            'passWordRepeat': this._passWordRepeat,
            'personnelType': this._personnelType,
            'firstName': this._firstName,
            'lastName': this._lastName,
            'status': this._status,
            'grantUserName': this._grantUserName,
            'caseLoadList': this._caseLoadList,
            'roleAccessList': this._roleAccessList,
            'assignedCaseloadId':this._assignedCaseloadId,
            'insightUserFlag':this._insightUserFlag,
            'insightsGropId':this._insightsGropId
        };
    }

}