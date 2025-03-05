import { LoginService } from '@common/login/service/login.service';
import { OumcamtaskService } from './../service/oumcamtask.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { TaskUsers } from './../beans/TaskUsers';
import {
    Component, OnInit, ViewChild, OnDestroy
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { FieldsSettingsModel, NodeKeyPressEventArgs, NodeClickEventArgs } from '@syncfusion/ej2-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { InjectOffenderService } from '@core/service/inject-offender.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { SelectEventArgs } from '@syncfusion/ej2-angular-lists';
import { UiCustomizeService } from '@core/service/ui-customize.service';
import { LoaderService } from '@core/loader/loader.service';
import { TimeFormat } from '@core/ui-components/time/timeFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { IncidentSearchService } from '@inst/incidents-oic/service/incident-search.service';
import { Images } from '@common/beans/Images';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';


@Component({
    selector: 'app-oumcamtask',
    templateUrl: './oumcamtask.component.html',
    styleUrls: ['./oumcamtask.component.css']
})

export class OumcamtaskComponent implements OnInit, OnDestroy {
    msgs: any[] = [];
    @ViewChild('blogRTE') public rteObj: RichTextEditorComponent;
    @ViewChild('list')
    listviewInstance: any;
    @ViewChild('tree')
    public tree: TreeViewComponent;
    msglist: any[];
    message: any;
    type: any;
    HistoryPlaceHolder = "";
    DescPlaceHolder = "";
    userName: string;
    assignee = "";
    nodeList: any[] = [];
    previosNodeList: any[] = [];
    presentNodeList: any[] = [];
    previousNode: any[] = [];
    showCliam = false;
    showUser = false;
    showUnCliam = false;
    formName = "OCDCCASE"
    formEnable = false;
    assignDataList: any[] = [];
    taskUsersList: TaskUsers[] = [];
    disableCompleteButton = true;
    taskUserDetails = new TaskUsers();
    taskUserData = new TaskUsers();
    taskActionData = new TaskUsers();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    public field: FieldsSettingsModel = { dataSource: this.nodeList, id: 'nodeId', text: 'nodeName', child: 'subChild', hasChildren: 'hasChild', selected: 'isSelected', iconCss: 'icon', expanded: 'isExpaneded' };
    interval: any;
    selectedNodes: any;
    selectedNodeName: any;
    refrehTime: number;
    formData: Map<string, object>;
    image: any;
    imageShow = false;
    selectedTabIndex: any;
    selectedItemIndex = 0;
    diagram: string;
    activityId: string;
    clickOnList: boolean;
    lastClickedObj: TaskUsers;
    pageRefresh = false;
    objExist: boolean;
    diagramDisabled = true;
    previousImage: number;
    messageView = false;
    taskView = false;
    childNodeExist = false;
    tempNodeObj: any;
    elementExist: boolean;
    taskExist: boolean;
    taskNodeExist: boolean;
    removedTaskExist: boolean;
    actionElementExist
    claimProcess = false;
    processEvent = false;
    pageEvent = false;
    unClaimProcess = false;
    completeProcess = false;
    isApproveSection = false;
    nodeExist = false;
    myTaskColor = '#F29F05';
    teamTaskColor = '#054BA6';
    disbaleButtonSection = true;
    tempTaskObj : any;
    caseLoadWarn = '';
    imageModel: Images = new Images();
    moduleMap: Map<string, string> = new Map<string, string>();
    removedTasks: Map<string, string> = new Map<string, string>();
    claimedTask: Map<string, string> = new Map<string, string>();
    unClaimedTask: Map<string, string> = new Map<string, string>();
    constructor(private oumsypflFactory: OumsypflService, public translateService: TranslateService,
        private oumcamtaskService: OumcamtaskService, public sessionManager: UserSessionManager,
        public dialogService: DialogService, private injectOffenderService: InjectOffenderService,
        private uiCustomizeService: UiCustomizeService, private loaderService: LoaderService, private loginService: LoginService,
        private offenderSearchService: OffenderSearchService,
        private incidentService: IncidentSearchService,
        private osiosearchService: OsiosearService) {

    }
    ngOnInit() {
        this.refrehTime = 1000;
        this.userName = this.sessionManager.getId();
        if (this.uiCustomizeService && this.uiCustomizeService.taskManagementConfig && this.uiCustomizeService.taskManagementConfig.refreshTime) {
            this.refrehTime = 1000 * this.uiCustomizeService.taskManagementConfig.refreshTime;
            if (this.uiCustomizeService.taskManagementConfig.myTaskColor) {
                this.myTaskColor = this.uiCustomizeService.taskManagementConfig.myTaskColor;
            }
            if (this.uiCustomizeService.taskManagementConfig.teamTaskColor) {
                this.teamTaskColor = this.uiCustomizeService.taskManagementConfig.teamTaskColor;
            }

        }
        if (document.getElementsByTagName('mat-sidenav')[0]['style'].visibility === 'visible') {
            document.getElementsByClassName('s4-sidenav-button')[0].dispatchEvent(new Event('click'));
        }
        const serviceObject = this.oumcamtaskService.
            getModulesData();
        serviceObject.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(ele => {
                    this.moduleMap.set(ele.code, ele.description);
                });
            }
        });
        this.interval = setInterval(() => {
            this.pageRefresh = true;
            this.taskListExecuteQuery(false);


        }, this.refrehTime);
        this.taskListExecuteQuery(true);

    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    asIsOrder(a, b) {
        return 1;
    }


    taskListExecuteQuery(displayLoader) {
        if (!this.processEvent) {
            const result = this.oumcamtaskService.getTaskList(this.userName, displayLoader);
            result.subscribe(data => {
                this.pageRefresh = false;
                if (!this.processEvent) {
                    if (data && data.length > 0) {
                        this.messageView = false;
                        this.taskView = true;
                        this.loginService.userTaskCount = data[0].taskCount;
                        this.loginService.teamTaskCount = data[1].taskCount;
                        if (data && !this.checkNodeList(this.previosNodeList, data)) {
                            if (this.removedTasks && this.removedTasks.size > 0) {
                                this.removeCompleteApproveTask(data);
                            }
                            if (this.claimedTask && this.claimedTask.size > 0) {
                                this.removeClaimUncalimTasks('2', '1', data, this.claimedTask);
                            }
                            if (this.unClaimedTask && this.unClaimedTask.size > 0) {
                                this.removeClaimUncalimTasks('1', '2', data, this.unClaimedTask);
                            }

                            this.nodeList = data;
                            this.field.dataSource = this.nodeList;
                            this.previosNodeList = JSON.parse(JSON.stringify(this.nodeList));
                            this.removedTasks.clear();
                            this.claimedTask.clear();
                            this.unClaimedTask.clear();
                            if (this.tree) {
                                this.tree.fields.dataSource = this.nodeList;
                            }

                            this.selectedNodeClick();


                        }

                    } else {
                        this.taskView = false;
                        this.messageView = true;

                    }

                } 

            })
        }

    }





    checkNodeList(data1, data2) {
        this.presentNodeList = JSON.parse(JSON.stringify(data2));
        this.previousNode = JSON.parse(JSON.stringify(data1));
        if (this.previousNode.length > 0 && this.presentNodeList.length > 0) {
            if ((JSON.stringify(this.previousNode[0].subChild) === JSON.stringify(this.presentNodeList[0].subChild)) && (JSON.stringify(this.previousNode[1].subChild) === JSON.stringify(this.presentNodeList[1].subChild))) {
                return true;
            } else {
                return false;
                
            }
        }
        return false;
    }

    assigneeUser(event) {
        if (event) {
            this.taskActionData = event;
        } else {
            this.taskActionData = JSON.parse(JSON.stringify(this.taskUserData));
        }
        this.claimedTask.set(this.taskActionData.taskId, this.taskActionData.content);
        this.claimProcess = true;
        this.processEvent = true;
        this.pageEvent = true;
        if (!this.taskActionData.assignee) {
            this.taskActionData.assignee = this.userName;
            const result = this.oumcamtaskService.setAssignee(this.taskActionData);
            result.subscribe(data => {
                if (data) {
                    this.assignDataList = [];
                    this.claimProcess = false;
                    this.showCliam = false;
                    this.showUser = false;
                    this.showUnCliam = false;
                    this.disableCompleteButton = true;
                    this.disbaleButtonSection = true;
                    this.caseLoadWarn = '';
                    this.image = null;
                    this.formEnable = false;
                    this.imageShow = false;
                    this.previousImage = null;
                    this.pageEvent = false;
                    this.setNodedata('2', '1')

                }

            })
        }

    }
    removeCompleteApproveTask(data) {
        this.removedTasks.forEach((value: string, key: string) => {
            data.forEach((obj, index) => {
                obj.subChild.forEach((element, indexs) => {
                    if (element.nodeName == value) {
                        this.removedTaskExist=false;
                        element.childData.forEach((obj, index) => {
                            if (obj.taskId === key) {
                                element.childData.splice(index, 1);
                                this.removedTaskExist=true;
                            }

                        })
                        if(this.removedTaskExist){
                            if (element.count === 1) {
                                obj.subChild.splice(indexs, 1);
                            } else {
                                element.count = element.childData.length;
                            }
                            obj.taskCount = obj.taskCount - 1;
                        }

                    }
                })

            })
            
        })
        

    }

    removeClaimUncalimTasks(node1, node2, data, map) {
        map.forEach((value: string, key: string) => {
            data.forEach(obj => {
                this.actionElementExist = false;
                if (obj.nodeId.toString() == node1) {
                      obj.subChild.forEach((element, indexs) => {
                        if (element.nodeName == value) {
                            this.taskNodeExist = false;
                            element.childData.forEach((child, index) => {
                                if (child.taskId == key) {
                                    this.tempNodeObj = child;
                                    this.taskNodeExist = true;
                                    element.childData.splice(index, 1);
                                }
                                
                            })
                            if(this.taskNodeExist){
                                if (element.count === 1) {
                                    obj.subChild.splice(indexs, 1);
                                } else {
                                    element.count = element.childData.length;
                                }
                                obj.taskCount = obj.taskCount - 1;
                            }
                        }
                    })

                   
                }
            })
            if (node2 && node2 === '1' && this.tempNodeObj) {
                this.tempNodeObj.assignee = this.userName;
            } else {
                if (this.tempNodeObj) {
                    this.tempNodeObj.assignee = null;
                }
            }

            if (this.taskNodeExist) {
                data.forEach((obj, index) => {
                    if (obj.nodeId.toString() == node2) {
                        this.actionElementExist = false;
                        if (obj.subChild && obj.subChild.length > 0) {
                            obj.subChild.forEach((element, index) => {
                                if (element.nodeName == value) {
                                    this.tempNodeObj.parentNodeId = Number(node2);
                                    element.childData.push(this.tempNodeObj);
                                    element.count = element.childData.length;
                                    this.actionElementExist = true;
                                }
                            })
                        } 
                        if (!this.actionElementExist) {
                        this.tempNodeObj.count = 1;
                        this.tempNodeObj.parentNodeId = Number(node2);
                         this.tempNodeObj.childData =[];
                         this.tempTaskObj=JSON.parse(JSON.stringify(this.tempNodeObj));
                         this.tempNodeObj.childData.push(JSON.parse(JSON.stringify(this.tempTaskObj)));
                         this.tempNodeObj.nodeId = this.nodeList[0].maxNode+1;
                          this.nodeList[0].maxNode=this.nodeList[0].maxNode+1;
                          obj.subChild.push(JSON.parse(JSON.stringify(this.tempNodeObj)));
                        }
                        obj.taskCount = obj.taskCount + 1;
                        this.taskNodeExist=false;
                    }
                })

            }
        })



    }

    setNodedata(node1, node2) {
        this.nodeList.forEach(obj => {
            this.elementExist = false;
            if (obj.nodeId.toString() == node1) {
                obj.subChild.forEach((element, indexs) => {
                    if (element.nodeName == this.taskActionData.content) {
                        this.taskExist = false;
                           element.childData.forEach((child, index) => {
                            if (child.taskId == this.taskActionData.taskId) {
                                this.tempNodeObj = child;
                                this.taskExist = true;
                                element.childData.splice(index, 1);

                            }
                        })
                        if(this.taskExist){
                            if (element.count === 1) {
                                obj.subChild.splice(indexs, 1);
                            } else {
                                element.count = element.childData.length;
                            }
                            obj.taskCount = obj.taskCount - 1;
                        }
                    }
                })

            }
        })
        if (node2 && node2 === '1' && this.tempNodeObj) {
            this.tempNodeObj.assignee = this.userName;
        } else {
            if (this.tempNodeObj) {
                this.tempNodeObj.assignee = null;
            }
        }
            this.nodeList.forEach(obj => {
                if (node2 && obj.nodeId.toString() == node2) {
                    this.elementExist = false;
                    if (obj.subChild && obj.subChild.length > 0) {
                        obj.subChild.forEach((element, index) => {
                            if (element.nodeName == this.taskActionData.content) {
                                this.tempNodeObj.parentNodeId = Number(node2);
                                element.childData.push(this.tempNodeObj);
                                element.count = element.childData.length;
                                this.elementExist = true;
                            }
                        })
                    } 
                    if (!this.elementExist) {
                        this.tempNodeObj.count = 1;
                        this.tempNodeObj.parentNodeId = Number(node2);
                        this.taskUsersList = [];
                        this.tempNodeObj.childData =[];
                       this.tempTaskObj=JSON.parse(JSON.stringify(this.tempNodeObj));
                       this.tempNodeObj.childData.push(JSON.parse(JSON.stringify(this.tempTaskObj)));
                       this.tempNodeObj.nodeId = this.nodeList[0].maxNodeId+1;
                       this.nodeList[0].maxNodeId=this.nodeList[0].maxNodeId+1;
                       obj.subChild.push(JSON.parse(JSON.stringify(this.tempNodeObj)));
                    }
                    this.taskExist = false;
                    obj.taskCount = obj.taskCount + 1;
    
                }
            })
        
        this.tree.fields.dataSource = [];
        this.loginService.userTaskCount = this.nodeList[0].taskCount;
        this.loginService.teamTaskCount = this.nodeList[1].taskCount;

        if (this.nodeList[0].taskCount === 0 && this.nodeList[1].taskCount === 0) {
            this.taskView = false;
            this.messageView = true;
            this.processEvent = false;

        } else {
            if (this.tree) {
                this.assignDataList = [];
                this.listviewInstance.refresh();
                this.nodeList.forEach(obj => {
                    obj.isExpaneded = true;
                })
                this.field.dataSource = JSON.parse(JSON.stringify(this.nodeList));
                this.tree.fields.dataSource = JSON.parse(JSON.stringify(this.nodeList));
                this.tree.refresh();
                this.previosNodeList = JSON.parse(JSON.stringify(this.nodeList));
                
                this.selectedNodeClick();
            }
        }

    }



    selectedNodeClick() {
        this.nodeExist = false;
        this.nodeList.forEach(obj => {
            obj.nodeId = obj.nodeId.toString();
            obj.isExpaneded = true;
            if (this.selectedNodes && this.selectedNodes !== 0) {
                if (obj.subChild && obj.subChild.length > 0) {
                    obj.subChild.forEach(element => {
                        element.hasChild = false;
                        element.isSelected = false;
                        if (obj.nodeId == this.selectedNodes && element.nodeName == this.selectedNodeName) {
                            if (this.tree.selectedNodes && this.tree.selectedNodes[0]) {
                                this.tree.selectedNodes[0] = element.nodeId.toString();
                            }
                            this.nodeExist = true;
                            element.isSelected = true;
                            this.nodeclicked(null);

                        }

                    })

                } else {
                    this.processEvent = false;
                }
            }
        })
        if (!this.nodeExist) {
            this.assignDataList = [];
            this.processEvent = false;
        }
    }
    onRejectClick = () => {
        this.taskActionData = JSON.parse(JSON.stringify(this.taskUserData));
        this.processEvent = true;
        this.pageEvent = true;
        this.dialogService.openLinkDialog('/TASKREJECT', this.taskActionData, 80).subscribe(result => {
            this.pageEvent = false;
            if (result) {
                this.assignDataList = [];
                this.showCliam = false;
                this.showUser = false;
                this.showUnCliam = false;
                this.disableCompleteButton = true;
                this.disbaleButtonSection = true;
                this.caseLoadWarn = '';
                this.image = null;
                this.formEnable = false;
                this.imageShow = false;
                this.previousImage = null;
                this.taskUserData = new TaskUsers();
                this.setNodedata('1', null);
            } else {
                this.processEvent = false;
            }
        });
    }
    completeTask(event) {
        if (event) {
            this.taskActionData = event;
        } else {
            this.taskActionData = JSON.parse(JSON.stringify(this.taskUserData));
        }

        this.removedTasks.set(this.taskActionData.taskId, this.taskActionData.content);
        this.completeProcess = true;
        this.processEvent = true;
        this.pageEvent = true;
        if (this.taskActionData.assignee) {
            const result = this.oumcamtaskService.completeTask(this.taskActionData);
            result.subscribe(data => {
                if (data && data === 1) {
                    this.completeProcess = false;
                    this.assignDataList = [];
                    this.showCliam = false;
                    this.showUser = false;
                    this.showUnCliam = false;
                    this.disableCompleteButton = true;
                    this.disbaleButtonSection = true;
                    this.caseLoadWarn = '';
                    this.image = null;
                    this.formEnable = false;
                    this.imageShow = false;
                    this.previousImage = null;
                    this.pageEvent = false;
                    this.setNodedata('1', null);

                }

            })
        }

    }

    approveTask() {
        this.taskUserData.actionButton = "A";
        this.completeTask(null);
    }
    unClaim(event) {
        this.unClaimProcess = true;
        this.processEvent = true;
        this.pageEvent = true;
        if (event) {
            this.taskActionData = event;
        } else {
            this.taskActionData = JSON.parse(JSON.stringify(this.taskUserData));
        }
        this.unClaimedTask.set(this.taskActionData.taskId, this.taskActionData.content);
        if (this.taskActionData.assignee) {
            const result = this.oumcamtaskService.unClaim(this.taskActionData);
            result.subscribe(data => {
                if (data) {
                    this.unClaimProcess = false;
                    this.assignDataList = [];
                    this.showCliam = false;
                    this.showUser = false;
                    this.showUnCliam = false;
                    this.disableCompleteButton = true;
                    this.disbaleButtonSection = true;
                    this.caseLoadWarn = '';
                    this.selectedItemIndex = 0;
                    this.image = null;
                    this.formEnable = false;
                    this.imageShow = false;
                    this.previousImage = null;
                    this.pageEvent = false;
                    this.setNodedata('1', '2');
                }

            })

        }
    }

    onSelect(args: SelectEventArgs) {
        if (!this.pageEvent) {
            this.assignee = "";
            this.showCliam = false;
            this.showUnCliam = false;
            this.formEnable = false;
            this.disableCompleteButton = true;
            this.disbaleButtonSection = true;
            this.caseLoadWarn = '';
            let selectedIndex = 0;
            if (!this.childNodeExist) {
                this.taskUserData = new TaskUsers();
                this.imageShow = false;
                this.image = null;
                this.previousImage = null;
            } else {
                this.imageShow = true;
            }
            this.clickOnList = true;
            if (args) {
                selectedIndex = args.index;
                this.listSelect(selectedIndex);

            } else if (args == null) {

                setTimeout(() => {
                    if (this.assignDataList && this.assignDataList.length > 0) {
                        if (this.taskUserData) {
                            this.assignDataList.forEach((obj, index) => {
                                if (obj.taskId == this.taskUserData.taskId) {
                                    this.selectedItemIndex = index;
                                }
                            })
                            if (this.listviewInstance.liCollection && this.listviewInstance.liCollection[this.selectedItemIndex]) {
                                this.listviewInstance.liCollection[this.selectedItemIndex].className = 'e-list-item e-level-1 e-active';
                                this.listSelect(this.selectedItemIndex);
                            } else {
                                this.listviewInstance.liCollection[0].className = 'e-list-item e-level-1 e-active';
                                this.listSelect(0);
                            }
                        } else {
                            this.listviewInstance.liCollection[0].className = 'e-list-item e-level-1 e-active';
                            this.listSelect(0);
                        }
                    } else {
                        this.listSelect(0);
                    }
                }, 0)
            }

        }

    }


    listSelect(selectedIndex) {
        this.assignDataList.forEach((obj, index) => {
            if (obj.taskId == this.taskUserData.taskId) {
                this.objExist = true;
            }
        })
        this.showCliam = false;
        this.showUnCliam = false;
        if (this.offenderSearchService.selectedOffender) {
            this.disbaleButtonSection = true;
            this.caseLoadWarn = '';
        } else {
            this.disbaleButtonSection = false;
        }
        this.disableCompleteButton = true;

        this.assignDataList.forEach((obj, index) => {
            if (selectedIndex === index) {
                if (this.taskUserData) {
                    if (this.taskUserData.taskId !== obj.taskId) {
                        this.taskUserData = obj;
                    }
                } else {
                    this.taskUserData = obj;
                }
                this.assignee = obj.assignee
                if (obj.processInstanceId) {
                    this.diagramDisabled = false;
                } else {
                    this.diagramDisabled = true;
                }
                if (obj.offenderId) {
                    this.imageShow = true;
                } else {
                    this.imageShow = false;
                }

                if (this.selectedTabIndex === 1) {
                    this.getDiagram();
                }
                if (obj.offenderId) {

                    if (this.offenderSearchService.selectedOffender && this.offenderSearchService.selectedOffender.offenderId === obj.offenderId) {
                        this.vHeaderBlockModel=this.offenderSearchService.selectedOffender;
                    } else {
                        this.updateOffenderInContext(obj.offenderId, obj.sourceName);

                    }

                } else {
                    this.disbaleButtonSection = true;
                }

                if (this.previousImage) {
                    if (!this.taskUserData.imageId || (this.taskUserData.imageId && !(this.previousImage == this.taskUserData.imageId))) {
                        this.image = this.taskUserData.imageThumbnail ? 'data:image/JPEG;base64,' + this.taskUserData.imageThumbnail : null;
                    }
                } else {
                    this.image = this.taskUserData.imageThumbnail ? 'data:image/JPEG;base64,' + this.taskUserData.imageThumbnail : null;
                }

                this.previousImage = this.taskUserData.imageId;
                this.pageRefresh = false;
                if (this.taskUserData.sourceName) {
                    this.formEnable = true;
                }
                if (!obj.assignee) {
                    this.assignee = "Claim";
                    this.showCliam = true;
                    this.showUser = false;
                    this.showUnCliam = false;
                    this.disableCompleteButton = true;
                } else {
                    this.showCliam = false;
                    this.showUser = true;
                    this.showUnCliam = true;
                    this.disableCompleteButton = false;
                }


            }
        })
        this.claimProcess = false;
        this.unClaimProcess = false;
        this.completeProcess = false;
        this.processEvent = false;

    }


    updateOffenderInContext(offenderid, sourceName) {
        if (offenderid) {
            let offbkGlobal;
            let vHead = new VHeaderBlock();
            vHead.offenderId = offenderid;
            vHead.agyLocId = this.sessionManager.currentCaseLoad;
            if(sourceName === 'OIDMPITM' ) {
                offbkGlobal = this.oumcamtaskService.offbkgVPHeadGlobalQuery(vHead);
            } else {
                offbkGlobal = this.oumcamtaskService.offbkgGlobalQuery(vHead);
            }
            offbkGlobal.subscribe(list => {
                if (list.length > 0) {
                    this.vHeaderBlockModel = list[0];
                    if (list[0].imageId != null) {
                        this.imageModel.imageId = list[0].imageId;
                        this.oumcamtaskService.imageExecuteQuery(this.imageModel).subscribe(imageData => {
                            this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                        });
                    }
                    //this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                    this.disbaleButtonSection = true;
                    this.caseLoadWarn = '';
                } else {
                    this.vHeaderBlockModel=null;
                    //this.offenderSearchService.selectedOffender = undefined;
                    this.disbaleButtonSection = false;
                    this.caseLoadWarn = this.translateService.translate('oumcamtask.caseloadwarning');
                    this.caseLoadWarn = String(this.caseLoadWarn).replace('caseloadId', this.sessionManager.currentCaseLoad);
                }
            });

        }
    }


    public nodeclicked(args: NodeKeyPressEventArgs | NodeClickEventArgs) {
        this.assignDataList = [];
        this.assignee = "";
        this.showCliam = false;
        this.showUnCliam = false;
        this.disableCompleteButton = true;
        this.disbaleButtonSection = true;
        this.clickOnList = false;
        this.childNodeExist = false;
        this.pageEvent = false;
        if (args) {
            this.taskUserData = new TaskUsers();
            this.selectedItemIndex = 0;
        }
        if (this.tree.selectedNodes && this.tree.selectedNodes.length > 0) {
            this.nodeList.forEach(obj => {
                obj.subChild.forEach(element => {
                    element.isSelected = false;
                    if (element.nodeId == this.tree.selectedNodes) {
                        this.childNodeExist = true;
                        element.isSelected = true;
                        element.childData.forEach(parent => {
                            if (parent.nodeName == element.nodeName && parent.taskId) {
                                this.taskUserDetails = new TaskUsers();
                                this.taskUserDetails.content = parent.nodeName;
                                this.taskUserDetails.taskId = parent.taskId;
                                this.taskUserDetails.assignee = parent.assignee;
                                this.taskUserDetails.sourceName = parent.sourceName;
                                this.taskUserDetails.offenderName = parent.offenderName;
                                this.taskUserDetails.comment = parent.comment;
                                this.taskUserDetails.imageThumbnail = parent.imageThumbnail;
                                this.taskUserDetails.imageId = parent.imageId;
                                this.taskUserDetails.offenderId = parent.offenderId;
                                this.taskUserDetails.offenderIdDisplay = parent.offenderIdDisplay;
                                this.taskUserDetails.isApprovButton = parent.isApprovButton;
                                this.taskUserDetails.nodeId = parent.nodeId;
                                this.taskUserDetails.parentNodeId = element.nodeId;
                                this.taskUserDetails.userTaskId = parent.userTaskId;
                                this.taskUserDetails.descriptionMapper = parent.descriptionMapper;
                                this.taskUserDetails.agencyIncidentId = parent.agencyIncidentId;
                                if (this.taskUserDetails.agencyIncidentId) {
                                    this.taskUserDetails.offenderName = this.taskUserDetails.content;
                                }
                                if (this.moduleMap && this.moduleMap.get(parent.sourceName)) {
                                    this.taskUserDetails.moduleDescription = this.moduleMap.get(parent.sourceName);
                                }
                                this.taskUserDetails.createDate = DateFormat.format(DateFormat.getDate(parent.createDate));
                                this.taskUserDetails.time = TimeFormat.format(DateFormat.getDate(parent.createDate));
                                this.taskUserDetails.processInstanceId = parent.processInstanceId;
                                if(parent.dueDate != null) {
                                    this.taskUserDetails.dueDate = DateFormat.format(DateFormat.getDate(parent.dueDate));
                                }
                                if(parent.followUpDate != null) {
                                    this.taskUserDetails.followUpDate = DateFormat.format(DateFormat.getDate(parent.followUpDate));
                                }
                                this.assignDataList.push(this.taskUserDetails);
                            }
                        })
                        this.selectedNodes = obj.nodeId;
                        this.selectedNodeName = element.nodeName;
                    }
                })


            })
            setTimeout(() => {
                this.onSelect(null);
            }, 0)

        }




    }






    public onSplitterResize(): void {
        this.rteObj.refresh();
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    onFormLaunhClick = (event) => {

        this.dialogService.openLinkDialog('/TASKFORMDIALOG', this.taskUserData, 90, 90).subscribe(result => {

        });

    }
    whenTabChangedTrigger(event) {
        this.selectedTabIndex = event.index;
        if (this.selectedTabIndex === 1) {
            this.getDiagram();
        }

    }

    getDiagram() {
        this.diagram = '';
        this.activityId = '';
        if (this.taskUserData.processInstanceId) {
            const result = this.oumcamtaskService.getDiagarm(this.taskUserData.processInstanceId);
            result.subscribe(data => {
                if (data) {
                    if (data.bpmn) {
                        this.diagram = data.bpmn;
                    }
                    if (data.activityId) {
                        this.activityId = data.activityId;
                    }

                }
            });

        }
    }

    onRejectDialogClose(event) {
        if (event) {
            this.taskListExecuteQuery(true);
        }

    }

    onFormClick = () => {
        if (this.taskUserData.offenderId) {
            if (this.vHeaderBlockModel) {
                this.offenderSearchService.selectedOffender=this.vHeaderBlockModel;
                return true;
            } else {
                this.message = this.translateService.translate('oumcamtask.caseloaderror');
                this.message = String(this.message).replace('caseload', this.sessionManager.currentCaseLoad);
                this.show(this.message, 'info');
                return false;
            }
        } else {
            if (this.taskUserData.agencyIncidentId) {
                this.incidentService.setAgencyIncidentId(Number(this.taskUserData.agencyIncidentId));
            }
            return true;
        }
    }


}
