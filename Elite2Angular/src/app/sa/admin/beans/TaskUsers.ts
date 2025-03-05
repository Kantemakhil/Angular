import { BaseModel } from '@commonbeans/BaseModel';
export class TaskUsers extends BaseModel {
    private _nodeId: number;
    private _parentNodeId: number;
    private _nodeName: string;
    private _count: number;
    private _hasChild: boolean;
    private _content: string;
    private _createDate: string;
    private _subChild: Array<TaskUsers>;
    private _description: string;
    private _assignee: string;
    private _taskId: string;
    private _sourceName: string;
    private _childData: Array<TaskUsers>;
    private _comment: string;
    private _offenderBookId: number;
    private _offenderId: number;
    private _descriptionMapper: Map<string,object>;
    private _offenderName: string;
    private _imageThumbnail: any;
    private _offenderIdDisplay:string;

    private  _processInstanceId :string ;
    private _imageId: number;
    private _time : string;
    private _isApprovButton: boolean;
    private _actionButton : string;
    private _userTaskId: string;

    private _moduleDescription: string;

    private _agencyIncidentId:number;
    private _maxNodeId: number;

    private _dueDate: string;
    private _followUpDate: string;


    set time(ptime: string) { this._time = ptime; }
    get time(): string { return this._time; }

    set offenderName(poffenderName: string) { this._offenderName = poffenderName; }
    get offenderName(): string { return this._offenderName; }


    get descriptionMapper(): Map<string,object> { return this._descriptionMapper; }

    set descriptionMapper(pdescriptionMapper: Map<string,object>) { this._descriptionMapper = pdescriptionMapper; }
    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get comment(): string { return this._comment; }

    set comment(pcomment: string) { this._comment = pcomment; }
    get sourceName(): string { return this._sourceName; }

    set sourceName(psourceName: string) { this._sourceName = psourceName; }

    get description(): string { return this._description; }

    set description(pdescription: string) { this._description = pdescription; }
    get taskId(): string { return this._taskId; }

    set taskId(ptaskId: string) { this._taskId = ptaskId; }

    get assignee(): string { return this._assignee; }

    set assignee(passignee: string) { this._assignee = passignee; }

    get subChild(): Array<TaskUsers> { return this._subChild; }

    set subChild(psubChild: Array<TaskUsers>) { this._subChild = psubChild; }

    get createDate(): string { return this._createDate; }

    set createDate(pcreateDate: string) { this._createDate = pcreateDate; }

    get content(): string { return this._content; }

    set content(pcontent: string) { this._content = pcontent; }

    get nodeId(): number { return this.nodeId; }

    set nodeId(pnodeId: number) { this._nodeId = pnodeId; }

    get parentNodeId(): number { return this._parentNodeId; }

    set parentNodeId(parentNodeId: number) { this._parentNodeId = parentNodeId; }

    get count(): number { return this._count; }

    set pcount(pcount: number) { this._count = pcount; }

    get nodeName(): string { return this._nodeName; }

    set nodeName(pnodeName: string) { this._nodeName = pnodeName; }

    get hasChild(): boolean { return this._hasChild; }

    set hasChild(phasChild: boolean) { this._hasChild = phasChild; }


    get childData(): Array<TaskUsers> { return this._childData; }

    set childData(pchildData: Array<TaskUsers>) { this._childData = pchildData; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get offenderBookId(): number { return this._offenderBookId; }

    get imageThumbnail(): any { return this._imageThumbnail; }

    set imageThumbnail(pimageThumbnail: any) { this._imageThumbnail = pimageThumbnail; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }

    set offenderIdDisplay( poffenderIdDisplay: string ) { this._offenderIdDisplay = poffenderIdDisplay; }

    get processInstanceId(): string { return this._processInstanceId; }

    set processInstanceId( pprocessInstanceId: string ) { this._processInstanceId = pprocessInstanceId; }

    get imageId(): number { return this._imageId; }

    set imageId(pimageId: number) { this._imageId = pimageId; }

    get isApprovButton(): boolean { return this._isApprovButton; }

    set isApprovButton(pisApprovButton: boolean) { this._isApprovButton = pisApprovButton; }
    get actionButton(): string { return this._actionButton; }

    set actionButton( pactionButton: string ) { this._actionButton = pactionButton; }
    get userTaskId(): string { return this._userTaskId; }

    set userTaskId(puserTaskId: string) { this._userTaskId = puserTaskId; }

    get moduleDescription(): string { return this._moduleDescription; }

    set moduleDescription(pmoduleDescription: string) { this._moduleDescription = pmoduleDescription; }

    get agencyIncidentId(): number { return this._agencyIncidentId; }

    set agencyIncidentId(pagencyIncidentId: number) { this._agencyIncidentId = pagencyIncidentId; }

    get maxNodeId(): number { return this._maxNodeId; }

    set maxNodeId(pmaxNodeId: number) { this._maxNodeId = pmaxNodeId; }

    get dueDate(): string { return this._dueDate; }
    set dueDate(pdueDate: string) { this._dueDate = pdueDate; }

    get followUpDate(): string { return this._followUpDate; }
    set followUpDate(pfollowUpDate: string) { this._followUpDate = pfollowUpDate; }
    

    toJSON(): any {
        return {
            'nodeId': this._nodeId,
            'parentNodeId': this._parentNodeId,
            'nodeName': this._nodeName,
            'count': this._count,
            'hasChild': this._hasChild,
            'content': this._content,
            'createDate': this._createDate,
            'subChild': this._subChild,
            'assignee': this._assignee,
            'taskId': this._taskId,
            'description': this._description,
            'sourceName': this._sourceName,
            'childData': this._childData,
            'comment': this._comment,
            'offenderBookId': this._offenderBookId,
            'offenderId': this._offenderId,
            'descriptionMapper':this._descriptionMapper,
            'offenderName':this._offenderName,
            'imageThumbnail':this._imageThumbnail,
            'offenderIdDisplay':this._offenderIdDisplay,
            'processInstanceId':this._processInstanceId,
            'imageId':this._imageId,
            'time' : this._time,
            'isApprovButton':this._isApprovButton,
            'actionButton':this._actionButton,
            'userTaskId':this._userTaskId,
            'moduleDescription':this._moduleDescription,
            'agencyIncidentId':this._agencyIncidentId,
            'maxNodeId':this._maxNodeId,
            'dueDate':this._dueDate,
            'followUpDate': this._followUpDate
        };
    }











}