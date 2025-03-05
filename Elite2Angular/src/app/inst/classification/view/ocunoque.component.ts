import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { TranslateService } from '@common/translate/translate.service';
import { AppConstants } from '@core/classes/appConstants';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { InjectOffenderService } from '@core/service/inject-offender.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { Assessments } from '@inst/classification/beans/Assessments';
import { AssessmentsCommitBean } from '@inst/classification/beans/AssessmentsCommitBean';
import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OcdnoqueService } from '../service/ocdnoque.service';

@Component({
    selector: 'app-ocunoque',
    templateUrl: './ocunoque.component.html',
    styleUrls: ['./ocunoque.component.scss']
})

export class OcunoqueComponent implements OnInit {
    @ViewChild('grid', { static: true }) grid: any;
    @ViewChild('gridone', { static: true }) gridone: any;

    assessCommentTemp: string;
    noOfAnsweredQues: any;
    previousIndexFlag: any;
    editablecheck: boolean;
    gridupdate = false;
    supervisionLevelType: any;
    score: any;
    index: number;
    questionsList: Assessments[] = [];
    answersList: Assessments[] = [];
    answersListTemp: Assessments[] = [];
    answersListTemp1: Assessments[] = [];
    assessCommitModel: Assessments = new Assessments();
    maxScore: any;
    totalScore: number;
    answersModifyModel: Assessments = new Assessments();
    offAssesModel: OffenderAssessments = new OffenderAssessments();
    answersOffAssesData: OffenderAssessments[] = [];
    hint: string;
    assessIndex = -1;
    assessIndexTemp = -1;
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    nameOfLovPage: string;
    listToCompare: any[] = [];
    assessData: Assessments[] = [];
    assessDataTemp: Assessments[] = [];
    assessModel: Assessments = new Assessments();
    assessModelCommentText: OffenderAssessments = new OffenderAssessments();
    assessInsertList: Assessments[] = [];
    assessUpdatetList: Assessments[] = [];
    assessDeleteList: Assessments[] = [];
    assessQuesData: Assessments[] = [];
    assessQuesDataTemp: Assessments[] = [];
    assessQuestionModel: Assessments = new Assessments();
    assessQuestionIndex = -1;
    assessQuestionIndexTemp = -1;
    assess1InsertList: Assessments[] = [];
    assess1UpdatetList: Assessments[] = [];
    assess1DeleteList: Assessments[] = [];
    answersData: Assessments[] = [];
    answersModifyData: Assessments[] = [];
    answersDataTemp: Assessments[] = [];
    answersModel: Assessments = new Assessments();
    answerModelTemp: Assessments = new Assessments();
    answersIndex = -1;
    answersInsertList: OffenderAssessments[] = [];
    assesmentList: Assessments[] = [];
    answersUpdatetList: Assessments[] = [];
    answersDeleteList: Assessments[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean = true;
    assess1ColumnDef: any[];
    assessColumnDef: any[];
    answersColumnDef: any[];
    assessReadOnly: boolean;
    nbtCommentBlkReadOnly: boolean;
    assess1ReadOnly: boolean;
    answersReadOnly: boolean;
    rgrankRg: any[] = [];
    commentText: String;
    answersCommitModel: AssessmentsCommitBean = new AssessmentsCommitBean();
    assessHeavyBeanlist: AssessmentsCommitBean = new AssessmentsCommitBean();
    selectedSection: string;
    saveBtnDis = true;
    checkEdit = true;
    exitFlag: boolean;
    resultFlag: any;
    tempSeq: number;
    answersUpdatetListTemp: Assessments[] = [];
    count: number = 0;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    sectionCode: string;
    enforceFlagClickButton: Boolean = false;
    answersDataList: any;
    dateUpdate: boolean;
    answersUpdateTemp: any;
    constructor(private ocdnoqueFactory: OcdnoqueService, private injectOffenderService: InjectOffenderService,
        public translateService: TranslateService, private router: Router,
        private sessionManager: UserSessionManager, public dialogService: DialogService) {
        this.assess1ColumnDef = [];
        this.answersColumnDef = [];
    }
    ngOnInit() {

        this.count = 0;
        this.resultFlag = undefined;
        if (this.dialog.data.reqFlag === true) {
            //this.checkEdit = true;
            this.gridupdate = true;
        } else {
            // this.checkEdit = false;
            this.gridupdate = false;
        }
        if (this.dialog.data.assessmentStatus === 'Draft') {
            this.checkEdit = true;
        } else {
            this.checkEdit = false;
        }
        this.tempSeq = this.dialog.data.assessmentSeq;
        this.vHeaderBlockModel.offenderId = this.dialog.data['offenderId'];
        this.saveBtnDis = true;
        this.assess1ColumnDef = [
            {
                // fieldName: this.translateService.translate('osiosear.number'), field: 'listSeq',
                fieldName: "No:", field: 'listSeq', wrapText: true,
                editable: false, width: 40,
            },
            {
                fieldName: this.translateService.translate('ocunoque.question'), field: 'description',
                editable: false, wrapText: true, datatype: 'text', width: 400, tooltip: true,
            },
            {
                fieldName: this.translateService.translate('Required'), field: 'requiredFlag',
                editable: false, datatype: 'checkbox', width: 150
            },
        ];
        // this.assessColumnDef = [
        //     {
        //         fieldName: this.translateService.translate('common.description'), field: 'description',
        //         editable: false, width: 650
        //     },
        // ]; 
        this.answersColumnDef = [
            {
                fieldName: this.translateService.translate('ocunoque.wording'), field: 'description',
                editable: false, width: 400, tooltip: true, wrapText: true
            },
            {
                fieldName: this.translateService.translate('common.btnSelect'), field: 'answers',
                datatype: 'checkbox', width: 100, cellEditable: this.checkEdititable //,
            },
            {
                fieldName: this.translateService.translate('ocunoque.notes'), field: 'assessComment', datatype: 'text',
                editable: false, uppercase: 'false', wrapText: true, styleClass: 'cell-flow-wrap', width: 60
            },
            {
                fieldName: this.translateService.translate(''), field: 'edit', displayas: 'image',
                editable: true, width: 150, datatype: 'hyperlink', modal: true, data: 'row', updateField: 'row',
                onLaunchClick: this.queryLaunchClick
            },
            {
                fieldName: this.translateService.translate('Bookmark Value'), field: 'bookmarkValue', datatype: 'text',
                editable: false, uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('Bookmark Status'), field: 'bookmarkStatus', datatype: 'text',
                editable: false, uppercase: 'false'
            },

        ];
        this.assessCommitExecuteQuery();
        this.getCommentText();
    }

    checkEdititable = (data: any, index: number, field: string): boolean => {
        if (this.dialog.data.assessmentStatus === 'Submitted') {
            return false;
        }
        else if ((data.answers === 'Y' || data.answers === true) && data['editBtn']) {
            return false;
        } else if (!data.answers || data.answers === 'N' || data.answers === false) {
            return true;
        } else {
            return true;
        }
    }

    onSelectedCode(e) {
        this.onRowClickassess(e);
    }
    onRowClickassess(event) {
        this.assessIndexTemp = this.assessData.indexOf(event);
        this.assessModel = new Assessments();
        this.assessModel = event;
        this.assessQuestionsPopulateDetails();
    }
    allowNumbers(event) {
    }
    onRowQuesClick(event) {
        if (event) {
            this.previousIndexFlag = false;
            this.assessQuestionIndexTemp = this.assessQuesData.indexOf(event);
            this.assessQuestionModel = new Assessments();
            this.assessQuestionModel = event;
            if (this.assessQuestionModel.assessmentType === 'EXCLUSIVE') {
                this.hint = 'Select one only';
            } else if (this.assessQuestionModel.assessmentType === 'INCLUSIVE') {
                this.hint = 'Select one or more';
            }
            this.assessAnswersPopulateDetails();
        }
    }
    onRowClickanswers(event) {
    }
    onButSumclick = () => {
        this.dialog.close(null);
        this.router.navigate(['/OIIBOOKS']);
        return true;
    }
    queryLaunchClick = (data) => {
        if (this.dialog.data.assessmentStatus !== 'Submitted' && data && (data.answers === 'Y' || data.answers)) {
            this.dialogService.openLinkDialog('/OCUNOQUEDIALOG', data, 80).subscribe(result => {
                if (result) {
                    const index = this.answersData.indexOf(data);
                    this.grid.setColumnData('assessComment', index, result);
                }
            });
        }

    }


    onButPreviousQuestionclick() {
        this.previousIndexFlag = true;
        if (this.assessQuestionIndexTemp > 0) {
            if (this.assessQuestionIndex === this.assessQuestionIndexTemp - 1) {
                this.assessQuestionIndex = -1;
            }
            this.assessQuestionIndex = this.assessQuestionIndexTemp - 1;
            if(this.assessQuestionIndex === this.assessQuestionIndexTemp - 1 && this.assessQuestionIndexTemp ===  this.gridone.paginationPageSize){
                this.gridone.onBtPrevious();
            }
        } else {
            if (this.assessIndexTemp > 0) {
                this.assessQuestionIndex = 0; 
                this.assessIndex = this.assessIndexTemp - 1;
                if (this.assessData) {
                    this.selectedSection = this.assessData[this.assessIndex].assessmentCode;
                }
            } else {
                this.assessIndex = (this.assessData.length - 1);
                if (this.assessData) {
                    this.selectedSection = this.assessData[this.assessIndex].assessmentCode;
                }
                this.assessQuestionIndex = (this.assessQuesData.length - 1);
            }
        }
    }
    onButNextQuestionclick() {
        if (this.assessQuestionIndexTemp < (this.assessQuesData.length - 1)) {
            this.assessQuestionIndex = this.assessQuestionIndexTemp + 1;
            if (this.assessQuesData.length > this.gridone.paginationPageSize && this.gridone.paginationPageSize === this.assessQuestionIndex) {
                this.gridone.onBtNext();
            }
        } else {
            if (this.assessIndexTemp < (this.assessData.length - 1)) {
                this.assessIndex = this.assessIndexTemp + 1;
                if (this.assessData) {
                    //this.selectedSection = this.assessData[this.assessIndex].assessmentCode; //commented @Naveen
                }
            } else {
                this.assessIndex = 0;
                if (this.assessData) {
                    //this.selectedSection = this.assessData[this.assessIndex].assessmentCode; //commented @Naveen
                }
            }
        }

        let scoreCount = 0;
        for (let index = 0; index < this.assessHeavyBeanlist.assesAnsList.length; index++) {
            if (this.assessHeavyBeanlist.assesAnsList[index].assCodeTemp === this.selectedSection) {
                if (this.assessHeavyBeanlist.assesAnsList[index].answers !== 'N' && this.assessHeavyBeanlist.assesAnsList[index].answers) {
                    scoreCount = scoreCount + Number(this.assessHeavyBeanlist.assesAnsList[index].score);
                }
            }
        }
        if (this.assessQuestionIndexTemp === (this.assessQuesData.length - 1)) {
            if (this.assessQuesData[this.assessQuestionIndexTemp].assSecNoti && this.assessQuesData[this.assessQuestionIndexTemp].assSecNoti.length > 0) {
                for (let i = 0; i < this.assessQuesData[this.assessQuestionIndexTemp].assSecNoti.length; i++) {
                    if (scoreCount >= this.assessQuesData[this.assessQuestionIndexTemp].assSecNoti[i].minScore && scoreCount <= this.assessQuesData[this.assessQuestionIndexTemp].assSecNoti[i].maxScore) {
                        this.selectedSection = this.assessQuesData[this.assessQuestionIndexTemp].assSecNoti[i].assCodeTemp;
                        break;
                    } else if (this.assessQuestionIndexTemp === (this.assessQuesData.length - 1)) {
                        if (this.assessData[this.assessData.length - 1].assessmentCode === this.selectedSection) {
                            this.selectedSection = this.assessData[this.assessIndex].assessmentCode;
                        } else if (this.assessData) {
                            this.assessIndex = this.assessIndexTemp + 1;
                            this.selectedSection = this.assessData[this.assessIndex].assessmentCode;
                        }
                    }
                }
            } else {
                if (this.assessData[this.assessData.length - 1].assessmentCode === this.selectedSection) {
                    this.selectedSection = this.assessData[this.assessIndex].assessmentCode;
                } else if (this.assessData) {
                    this.assessIndex = this.assessIndexTemp + 1;
                    this.selectedSection = this.assessData[this.assessIndex].assessmentCode;
                }

            }
        } else {
            if (this.assessIndexTemp < (this.assessData.length - 1)) {
                this.assessIndex = this.assessIndexTemp;
                if (this.assessData) {
                    this.selectedSection = this.assessData[this.assessIndex].assessmentCode;
                }
            }
        }
    }

    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    /**
        * This function loads the data into the Master Record and its child records
        */
    assessCommitExecuteQuery() {
        if (this.dialog.data.reqFlag === true) {
            this.editablecheck = true;
            this.gridupdate = true;
        } else {
            this.editablecheck = false;
            this.gridupdate = false;
        }
        this.assessCommitModel = new Assessments();
        this.assessCommitModel.assessmentId = this.dialog.data.assessmentTypeId;
        this.assessCommitModel.offenderBookId = this.dialog.data.offenderBookId;
        this.assessCommitModel.assessmentSeq = this.dialog.data.assessmentSeq;
        if (this.assessCommitModel.assessmentId != null || this.assessCommitModel.offenderBookId != null) {
            const serviceObj = this.ocdnoqueFactory.assessCommitExecuteQuery(this.assessCommitModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                } else {
                    if (this.dialog.data.assessmentStatus === 'Draft') {
                        this.saveBtnDis = false;
                    }
                    data.assesQuestList.forEach(ele => {
                        ele.requiredFlag = ele.requiredFlag === 'Y' ? true : false;
                    });
                    /* else{
                        data.assesQuestList.forEach(ele => {
                            ele.requiredFlag = undefined;
                            data.assesAnsList.forEach(el => {
                                if (el.parentAssessmentId === ele.assessmentId && el.requiredFlag ==='Y') {
                                    ele.requiredFlag = true;
                                }
                            });
                        });
                    } */
                    this.assessHeavyBeanlist = data;
                    this.enforceFlagClickButton = data.enforceFlag

                    this.answersUpdatetListTemp = JSON.parse(JSON.stringify(this.assessHeavyBeanlist.assesAnsList));
                    this.answersDataList = JSON.parse(JSON.stringify(this.assessHeavyBeanlist.assesAnsList));
                    /*  this.assessHeavyBeanlist.assesAnsList.forEach(e => {
                         if (e.answers === 'Y') {
                             this.answersListTemp.push(e);
                         }
                     }); */
                    this.assessHeavyBeanlist.assesQuestList.forEach(e => {
                        this.assessHeavyBeanlist.assesAnsList.forEach(dataval => {
                            dataval['edit'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
                            if (e.assessmentId === dataval.parentAssessmentId) {
                                if (dataval !== undefined && dataval.bookmarkCondition === AppConstants.EAW && dataval.answerValue !== AppConstants.EMPTYDATA) {
                                    var actResult = dataval.description;
                                    if (dataval.answerValue && actResult && actResult.trim() ===  dataval.answerValue) {
                                        dataval.bookmarkStatus = this.translateService.translate('ocmnoque.answeredbybookmark');
                                        dataval.bookmarkValue = dataval.answerValue;
                                        dataval.answers = AppConstants.YFLAG;
                                        dataval.sealFlag = AppConstants.YFLAG;
                                    }else{
                                        dataval.bookmarkStatus = this.translateService.translate('ocmnoque.nomatchingbookmark');
                                    }
                                } else if (dataval !== undefined && (dataval.bookmarkCondition && dataval.answerValue === AppConstants.EMPTYDATA)) {
                                    dataval.bookmarkStatus = this.translateService.translate('ocmnoque.nomatchingbookmark');
                                    dataval.bookmarkValue = "";
                                    dataval.sealFlag = AppConstants.NFLAG;
                                }
                                else if (dataval !== undefined && dataval.bookmarkCondition === AppConstants.BAR) {
                                    const dataAge = dataval.description.split(/[ -]+/);
                                    if (dataval.age !== 0 && dataval.age >= Number(dataAge[0]) && dataval.age <= Number(dataAge[1])) {
                                        dataval.bookmarkStatus = this.translateService.translate('ocmnoque.answeredbybookmark');
                                        dataval.bookmarkValue = (dataval.age).toString();
                                        dataval.answers = AppConstants.YFLAG;
                                        dataval.sealFlag = AppConstants.YFLAG;
                                    } else {
                                        dataval.bookmarkStatus = this.translateService.translate('ocmnoque.nomatchingbookmark');
                                        dataval.bookmarkValue = undefined;
                                        dataval.sealFlag = AppConstants.NFLAG;
                                    }
                                }
                                if((!dataval.bookmarkCondition && !dataval.ansBookMark) || (dataval.bookmarkCondition && !dataval.ansBookMark)){
                                    dataval.bookmarkStatus = undefined;
                                }
                            }
                        });
                    });
                    this.assessPopulateDetails();
                }
            });
        }
    }
    onQuickActionsGridInsert = () => {
        return {
            edit: 'assets/icons/eoff_icons/edit_24x24_sm.png'
        };
    }


    assessPopulateDetails() {
        this.assessDataTemp = [];
        if (this.assessHeavyBeanlist.assesList) {
            for (const dataval of this.assessHeavyBeanlist.assesList) {
                if (this.assessCommitModel.assessmentId === dataval.parentAssessmentId) {
                    this.assessDataTemp.push(dataval);
                }
            }
            this.assessIndex = 0;
            this.assessDataTemp.forEach(el => {
                el.code = el.assessmentCode;
            });
            this.assessData = this.assessDataTemp;
            if (this.assessData) {
                this.selectedSection = this.assessData[this.assessIndex].assessmentCode;
            }
            // this.assessIndex = 0;
            this.assessModel = this.assessData[this.assessIndex];
            this.assessQuestionsPopulateDetails();
        }
    }

    assessQuestionsPopulateDetails() {
        this.index = 0;
        this.assessQuesDataTemp = [];
        if (this.assessHeavyBeanlist.assesQuestList) {
            this.questionsList = this.assessHeavyBeanlist.assesQuestList;
            for (const dataval of this.assessHeavyBeanlist.assesQuestList) {
                if (this.assessModel.assessmentId === dataval.parentAssessmentId) {
                    this.index = this.index + 1;
                    dataval.listSeq = this.index;
                    this.assessQuesDataTemp.push(dataval);
                }
            }
            this.assessQuesData = this.assessQuesDataTemp;
            if (this.previousIndexFlag) {
                this.assessQuestionIndex = this.assessQuesData.length - 1;
                setTimeout(() => {
                    this.gridone.onBtLast();
                }, 5);
            } else {
                this.assessQuestionIndex = 0;
            }
            this.assessQuestionModel = this.assessQuesData[0];
            this.assessAnswersPopulateDetails();
        }
    }

    assessAnswersPopulateDetails() {
        this.answersDataTemp = [];
        if (this.assessHeavyBeanlist.assesAnsList) {
            if(this.answersListTemp1.length>0){
            this.assessHeavyBeanlist.assesAnsList.forEach(data => {
                this.answersListTemp1.forEach(obj => {
                    if (data.assessmentId === obj.assessmentId) {
                        data.answers=obj.answers;
                    }
                })

            })
        }
            this.assessHeavyBeanlist.assesQuestList.forEach(e => {
                this.assessHeavyBeanlist.assesAnsList.forEach(dataval => {
                    dataval['edit'] = 'assets/icons/eoff_icons/edit_24x24_sm.png';
                    if (e.assessmentId === dataval.parentAssessmentId) {
                        if (dataval.answers === AppConstants.YFLAG) {
                            let ind = !this.answersListTemp1 ? -1 : this.answersListTemp1.findIndex(i => i.assessmentId === dataval.assessmentId);
                            ind === -1 ? this.answersListTemp1.push(dataval) : this.answersListTemp1[ind] = dataval;
                        }
                        if (this.assessQuestionModel.assessmentId === e.assessmentId) {
                            this.answersDataTemp.push(dataval);
                        }
                    }
                });
            });
            if (this.answersDataTemp.length > 0) {
                this.answersDataTemp.forEach(e => {
                    if (e.answers && e.sealFlag === 'Y') {//&& e.bookmarkStatus
                        e['editBtn'] = true;
                        this.answersListTemp.push(e);
                        this.answersListTemp1.push(e);// = this.answersDataTemp;
                    } else {
                        e['editBtn'] = false;
                    }
                });
            }
        }
        this.answersData = this.answersDataTemp;
        this.answersIndex = 0;
        this.answersModel = this.answersData[0];
    }

    /*
    *  Get assessment comment text
    */
    getCommentText() {
        this.assessModelCommentText = new OffenderAssessments();
        this.assessModelCommentText = this.dialog.data;
        this.assessModelCommentText.offenderBookId = this.dialog.data.offenderBookId;
        this.assessModelCommentText.assessmentSeq = this.dialog.data.assessmentSeq;
        this.assessModelCommentText.assessmentTypeId = this.dialog.data.assessmentTypeId;
        this.assessModelCommentText.assessmentDate = this.dialog.data.assessmentDate;
        const serviceObj = this.ocdnoqueFactory.getCommentText(this.assessModelCommentText);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.assessModelCommentText.assessCommentText = null;
                this.assessModelCommentText.assessmentSeq = this.dialog.data.assessmentSeq;
            } else {
                // this.commentText = data.assessCommentText;
                this.assessModelCommentText.assessCommentText = data.assessCommentText;
                this.assessModelCommentText.assessmentSeq = this.dialog.data.assessmentSeq;
                this.maxScore = data.score;
            }
        });
    }

    /**
    * This function will be executed when commit event is
    * fired
    */
    saveAnswers(event) {
        // if (event.updated.length === 0) {
        //     this.type = 'info';
        //     this.message = this.translateService.translate('ocunoque.youmustansweratleastone');
        //     this.show();
        //     return;
        // }
        this.ocunoqueSaveanswersForm(event);

    }

    ocunoqueSaveanswersForm(data) {

        this.totalScore = 0;
        this.dateUpdate=false;
        /*  if (this.answersDataTemp.length === 0) {
             this.type = 'warn';
             this.message = this.translateService.translate('ocunoque.youmustansweratleastone');
             this.show();
             return;
         } */
        if (data !== 'Draft') {
            if (this.questionsList.length > 0) {
                for (let i = 0; i < this.questionsList.length; i++) {
                    if (this.questionsList[i].requiredFlag && (this.questionsList[i].requiredFlag === 'Y' || String(this.questionsList[i].requiredFlag) === 'true')) 
                    {
                        if (this.answersListTemp1.length > 0) {
                            let manData = this.answersListTemp1.filter(e => (e.parentAssessmentId === this.questionsList[i].assessmentId) && e.answers);
                            if (!manData || manData.length === 0 || manData === null) {
                                this.type = 'warn';
                                this.message = this.translateService.translate('ocunoque.needtoanswer');
                                this.show();
                                return;
                            }
                        }
                      
                      /* for(let j = 0; j < this.answersListTemp1.length; j++){
                        const answersflag = this.answersListTemp1[j].answers
                        if (answersflag === 'true' || answersflag === 'Y' || (answersflag !== 'false' && answersflag!== 'N') && answersflag) {
                            if(this.answersListTemp1[i].score === null || this.answersListTemp1[i].score === undefined ){
                                this.type = 'warn';
                                this.message = this.translateService.translate('ocunoque.supervisionscorenotfoundforthisscore');
                                this.show();
                                return;
                            }
                        }
                    }  */
                    }                    
                }
            }
        }
        this.noOfAnsweredQues = 0;
        this.answersListTemp1.forEach(ele => {
            ele.offenderBookId = this.questionsList[0].offenderBookId;
        });
        this.answersList = this.answersListTemp1;
        for (let j = 0; j < this.questionsList.length; j++) {
            for (let i = 0; i < this.answersList.length; i++) {
                if (this.questionsList[j].assessmentId === this.answersList[i].parentAssessmentId) {
                    if (this.answersList[i].answers && (this.answersList[i].answers === 'Y' ||
                        String(this.answersList[i].answers) === 'true')) {
                        this.noOfAnsweredQues = this.noOfAnsweredQues + 1;
                        i = this.answersList.length;
                    }
                }
            }
        }
        if (this.noOfAnsweredQues === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocunoque.youmustansweratleastone');
            this.show();
            return;
        }
        for (let i = 0; i < this.answersList.length; i++) {
            this.answersList[i].createDate = DateFormat.getDate();
            this.answersList[i].createUserId = this.sessionManager.getId();
            const answersflag = this.answersList[i].answers;
            if (answersflag === 'true' || answersflag === 'Y' || (answersflag !== 'false' && answersflag!== 'N') && answersflag) {
                this.totalScore = this.totalScore + this.answersList[i].score;
            }
        }
            if (!this.enforceFlagClickButton&&this.totalScore > this.maxScore) {
                this.totalScore = 0;
            }
        setTimeout(() => {
            ; //sleep for 1ms
        }, 1);
        this.answersDataList= JSON.parse(JSON.stringify(this.answersList)); 
        this.answersUpdateTemp= JSON.parse(JSON.stringify(this.answersUpdatetListTemp)); 
        if (this.answersUpdateTemp.length > 0 && this.answersList.length>0 &&  data === 'Draft') {
                this.answersDataList.forEach(obj=>{
                    obj.answers=obj.answers?'Y':'N';
                    this.answersUpdateTemp.forEach(tempObj=>{
                        if(!tempObj.answers){
                            tempObj.answers='N';
                        }
                        if (tempObj.assessmentId === obj.assessmentId && tempObj.answers!=obj.answers) {
                           this.dateUpdate=true;
                    }
                })

            })
            if (!this.dateUpdate) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocunoque.nodataismodifiedtosave');
                this.show();
                this.count = 0;
                return;
            }
        }


        this.answersCommitModel.assesQuestList = this.questionsList;
        this.answersCommitModel.assesAnsList = this.answersList;
       
        this.assessModelCommentText.assessmentSeq = this.tempSeq;
        
        
        /*
         *  confirmation dialauge for finding any unanswered questions
         */
        if (this.questionsList.length > this.noOfAnsweredQues && data !== 'Draft') {
            const warnData = {
                label: this.translateService.translate('ocunoque.areyousureyouwanttosave'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', warnData, 50).subscribe(result => {
                if (result) {
                    this.assessModelCommentText.assessmentStatus = data === 'Draft' ? 'Draft' : 'Submitted';
                    this.answersCommitModel.offAssesModel = this.assessModelCommentText;
                    if (this.answersCommitModel.offAssesModel.assessmentStatus === 'Submitted') {
                        this.answersCommitModel.offAssesModel.assessmentDate = DateFormat.getDate();
                        if(this.answersCommitModel.offAssesModel.assessmentDate){
                            const nextReviewDate = this.answersCommitModel.offAssesModel.assessmentDate.getTime() + (24 * 60 * 60 * 1000 * this.dialog.data.reviewCycleDays);
                            this.answersCommitModel.offAssesModel.nextReviewDate = DateFormat.getDate(nextReviewDate);
                        }
                    }
                    
                    const answersSaveData = this.ocdnoqueFactory.answersCommit(this.answersCommitModel);
                    answersSaveData.subscribe(saveData => {
                        if (saveData === 1) {
                            this.resultFlag = 1;
                            this.saveBtnDis = true;
                            this.type = 'success';
                            this.tempSeq = undefined;
                            this.count = 0;
                            this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                            this.show();
                            this.dialog.close({ resultFlag: this.resultFlag });
                        } else if (saveData === 101) {
                            this.type = 'warn';
                            this.message = 'ocunoque.youmustansweratleastonequestion';
                            this.show();
                        } else if (saveData === 289) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocunoque.supervisionscorenotfoundforthisscore');
                            this.show();
                        } else if (saveData === 3) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocunoque.nodataismodifiedtosave');
                            this.show();
                        } else {
                            this.type = 'warn';
                            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                            this.show();
                        }
                        if (this.exitFlag) {
                            this.dialog.close({ score: undefined, resultFlag: this.resultFlag });
                        }
                    });

                } else {
                }
            });
        } else {
            this.assessModelCommentText.assessmentStatus = data === 'Draft' ? 'Draft' : 'Submitted';
            this.answersCommitModel.offAssesModel = this.assessModelCommentText;
            if (this.answersCommitModel.offAssesModel.assessmentStatus === 'Submitted') {
                this.answersCommitModel.offAssesModel.assessmentDate = DateFormat.getDate();
            }
           
            const answersSaveData = this.ocdnoqueFactory.answersCommit(this.answersCommitModel);
            answersSaveData.subscribe(data => {
                if (data === 1) {
                    this.resultFlag = 1;
                    this.saveBtnDis = true;
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.count = 0;
                    this.dialog.close({ resultFlag: this.resultFlag });
                    this.tempSeq = undefined;
                } else if (data === 101) {
                    this.type = 'warn';
                    this.message = 'ocunoque.youmustansweratleastonequestion';
                    this.show();
                } else if (data === 289) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocunoque.supervisionscorenotfoundforthisscore');
                    this.show();
                } else if (data === 3) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocunoque.nodataismodifiedtosave');
                    this.show();
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                }
                if (this.exitFlag) {
                    this.dialog.close({ score: undefined, resultFlag: this.resultFlag });
                }
            });
        }
    }
    /**
         * To display the messages
         */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }

    onExitFormclick(isExit?: boolean) {
        if (isExit) {
            this.dialog.close({ score: undefined, resultFlag: this.resultFlag });
            this.assessModelCommentText.assessmentStatus = undefined;
            return;
        }
        if (this.assessModelCommentText.assessmentTypeId != null || this.assessModelCommentText.offenderBookId != null) {
            const serviceScorObj = this.ocdnoqueFactory.getAssessmentScore(this.assessModelCommentText);
            serviceScorObj.subscribe(data => {
                if (!data.hasProperty('length') || data.length === 0) {
                } else {
                    this.score = data.score;
                    this.supervisionLevelType = data.supervisionLevelType;
                    this.dialog.close({ score: this.score, supervisionLevelType: this.supervisionLevelType, resultFlag: this.resultFlag });
                }
            });
        } else {
            this.dialog.close({ score: undefined, resultFlag: this.resultFlag });
        }
    }

    /*
    * this method is called when checkBox is changed.
    */
    whenCheckBoxChange = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = this.answersData.indexOf(event.data);
        if (event.field === 'answers' && event.newValue !== event.oldValue) {
            if (event.data) {
                if (event.data.answers) {
                    for (let i = 0; i < this.answersData.length; i++) {
                    }
                    rowdata.validated = true;
                }
                return rowdata;
            }
            return rowdata;
        }
    }

    canAnswersEdit = (data: any, index: number, field: string): boolean => {
        for (let i = 0; i < this.answersData.length; i++) {
            if (index !== i && this.hint === 'Select one only') {
                this.grid.setColumnData('answers', i, undefined);
                // this.answersData[i]['answers'] = undefined;
            }
        }
        return true;
    }

    canAssessCommentEdit = (data: any, index: number, field: string): boolean => {
        if (data.answers) {
            return true;
        } else {
            return false;
        }
    }

    validateRowEvent = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'answers' && event.newValue === false && event.data['editBtn']) {
            this.type = 'warn';
            this.message = this.translateService.translate('Prevented for updating.');
            //this.show();
            this.checkEdit = false;
            return;
        } else if (event.field === 'answers' && event.data.answers && this.hint === 'Select one only') {
            let dupList = this.answersData.filter(x => x['editBtn'] === true);
            if (dupList.length > 0) {
                this.answersData.forEach(e => {
                    if (e.parentAssessmentId === event.data.parentAssessmentId && !e['editBtn']) {
                        e.answers = undefined;
                        this.checkEdit = true;
                    }
                });
            }
        }
        if (event.field === 'answers' && event.newValue === true) {
            for (let i = 0; i < this.answersData.length; i++) {
                if (index !== i && this.hint === 'Select one only') {
                    this.grid.setColumnData('answers', i, false);
                    this.grid.setColumnData('assessComment', i, undefined);
                    // this.answersData[i]['answers'] = undefined; 
                } else {
                    this.grid.setColumnData('answers', index, event.data.answers);
                    if (this.answersListTemp && this.answersListTemp.length > 0) {
                        let ind = this.answersListTemp.findIndex(i => i.assessmentId === event.data.assessmentId)
                        if (ind !== -1) {
                            this.answersListTemp[ind] = event.data;
                        } else {
                            this.answersListTemp.push(event.data);
                        }
                    } else {
                        this.answersListTemp.push(event.data);
                    }
                }
            }
        }
        if (event.field === 'answers' && !event.newValue) {
            let ind = this.answersListTemp.findIndex(i => i.assessmentId === event.data.assessmentId);
            ind === -1 ? this.answersListTemp : this.answersListTemp.splice(ind, 1);
            //ind === -1 ? this.answersListTemp : this.answersListTemp[ind] = event.data;

        }
        // this.answersListTemp1.push(event.data)
        let ind = !this.answersListTemp1 ? -1 : this.answersListTemp1.findIndex(i => i.assessmentId === event.data.assessmentId);
        ind === -1 ? this.answersListTemp1.push(event.data) : this.answersListTemp1[ind] = event.data;
        rowdata.validated = true;
        return rowdata;
    }
    onSaveDraft(data: string) {
        //this.assessModelCommentText.assessmentStatus = 'Submitted';
        this.exitFlag = true;
        this.ocunoqueSaveanswersForm(data);
        this.onExitFormclick();
    }

    onClearAnswerGrid = (event) => {
        if(event.currentData && event.currentData.length > 0){
     this.assessHeavyBeanlist.assesAnsList.forEach(obj=>{
    if(event.currentData[0].parentAssessmentId == obj.parentAssessmentId){
         this.answersUpdatetListTemp.forEach(tempObj=>{
         if(tempObj.assessmentId == obj.assessmentId){
            obj.answers=tempObj.answers;
          }
      })
     }
      })

      this.answersListTemp1.forEach(tempObj=>{
        if(event.currentData[0].parentAssessmentId == tempObj.parentAssessmentId){
            this.assessHeavyBeanlist.assesAnsList.forEach(obj=>{
             if(tempObj.assessmentId == obj.assessmentId){
                tempObj.answers=obj.answers;
              }
          })
         }
          })

      
      this.answersData = JSON.parse(JSON.stringify(this.answersDataTemp)); 
        }
    }
}

