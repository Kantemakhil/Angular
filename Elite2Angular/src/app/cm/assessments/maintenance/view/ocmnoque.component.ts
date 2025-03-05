import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmnoqueService } from '@cm/assessments/maintenance/service/ocmnoque.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AssessmentResults } from '@cm/assessments/maintenance/beans/AssessmentResults';
import { AssessmentResultsCommitBean } from '@cm/assessments/maintenance/beans/AssessmentResultsCommitBean';
import { Assessments } from '@inst/classification/beans/Assessments';
import { AssessmentsCommitBean } from '@inst/classification/beans/AssessmentsCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { LovService } from '@core/ui-components/lov/lov.service';
import { tr } from 'date-fns/locale';
import { AppConstants } from '@core/classes/appConstants';
// import required bean declarations

@Component({
   selector: 'app-ocmnoque',
   templateUrl: './ocmnoque.component.html',
})

export class OcmnoqueComponent implements OnInit {
   // Variable declaration
   @ViewChild('grid', {static: true}) grid: any;
   @ViewChild('secgrid', {static: true}) secgrid: any;
   @ViewChild('quegrid', {static: true}) quegrid: any;
   @ViewChild('ansgrid', {static: true}) ansgrid: any;
   @ViewChild('resgrid', {static: true}) resgrid: any;
   msgs: any[] = [];
   assessData: Assessments[] = [];
   assessDataForClear: Assessments[] = [];
   assessDataTemp: Assessments[] = [];
   assessModel: Assessments = new Assessments();
   assessSingleSearchModel: Assessments = new Assessments();
   assessIndex = -1;
   assessInsertList: Assessments[] = [];
   assessUpdateList: Assessments[] = [];
   assessDeleteList: Assessments[] = [];
   asssectData: Assessments[] = [];
   asssectModel: Assessments = new Assessments();
   asssectInsertList: Assessments[] = [];
   asssectUpdateList: Assessments[] = [];
   asssectDeleteList: Assessments[] = [];
   assQueModel: Assessments = new Assessments();
   assqueGridData: Assessments[] = [];
   assQueInsertList: Assessments[] = [];
   assQueUpdateList: Assessments[] = [];
   assQueDeleteList: Assessments[] = [];
   assAnsModel: Assessments = new Assessments();
   assansGridData: Assessments[] = [];
   assAnsInsertList: Assessments[] = [];
   assAnsUpdateList: Assessments[] = [];
   assAnsDeleteList: Assessments[] = [];
   assresData: AssessmentResults[] = [];
   assresModel: AssessmentResults = new AssessmentResults();
   assresInsertList: AssessmentResults[] = [];
   assresUpdateList: AssessmentResults[] = [];
   assresDeleteList: AssessmentResults[] = [];
   disableSearchFields: boolean;
   retriveDisabled: boolean;
   clearDisabled: boolean;
   saveDisabled: boolean;
   assesclearDisabled: boolean;
   disableAssesFields: boolean;
   enableAssesGridInsert: boolean;
   enableSecGridInsert: boolean;
   enableQueGridInsert: boolean;
   enableAnsGridInsert: boolean;
   enableResGridInsert: boolean;
   disableQuesCodeLov: boolean;
   disableAnsCodeLov: boolean;
   activeFlag: boolean;
   cellShareFlag: boolean;
   editable = true;
   message = ' Invalid.';
   type = 'error';
   msglist = [];
   assAnsColumnDef: any[];
   assSectColumnDef: any[];
   assessColumnDef: any[];
   assquesColumnDef: any[];
   assResColumnDef: any[];
   sectionLink: string;
   questionLink: string;
   oldCaseLoadType: string;
   assSecIndex = -1;
   assQueIndex = -1;
   assAnsIndex = -1;
   assResIndex = -1;
   tabIndex = 0;
   assessCommitModel: AssessmentsCommitBean = new AssessmentsCommitBean();
   asssectCommitModel: AssessmentsCommitBean = new AssessmentsCommitBean();
   assQueCommitModel: AssessmentsCommitBean = new AssessmentsCommitBean();
   assAnsCommitModel: AssessmentsCommitBean = new AssessmentsCommitBean();
   assresCommitModel: AssessmentResultsCommitBean = new AssessmentResultsCommitBean();
   options: { code: string; description: string; }[];
   screenOptions: { code: string; description: string; }[];
   caseLoadCount: boolean;
   checkAssesRelation: boolean;
   checkAssesSecRelation: boolean;
   checkAssesQuesRelation: boolean;
   checkAssesAnsRelation: boolean;
   checkAssesResRelation: boolean;
   answerCode: any;
   questionCode: any;
   questionType: any;
   selectionGridDelete: boolean = false;
   assesGridDeleteButton:boolean =false;
   questionGridButton:boolean=false;
   answerGridButton:boolean=false;
   resultGridButton:boolean=false;
   caseLoadTitles = { code: this.translateService.translate('ocmnoque.caseLoadLovTitle'), description: 'Description' };
   activeFlagLovTitles = { code: this.translateService.translate('ocmnoque.activeFlag'), description: 'Description' };
   updateFlagLovTitles = { code: this.translateService.translate('ocmnoque.updateFlag'), description: 'Description' };
   screenLovTitles = { description: this.translateService.translate('ocmnoque.screen'), code: 'Code' };
   sectionLovTitles = { code: this.translateService.translate('ocmnoque.sectionCode'), description: 'Description' };
   typeLovTitles = { code: this.translateService.translate('ocmnoque.assessmenttype'), description: 'Description' };
   questionLovTitles = {
      code: this.translateService.translate('ocmnoque.sectionCode'), description: 'Description',
      assessmentType: 'Type'
   };
   bookmarksTitles = { code: this.translateService.translate('common.code') ,description: this.translateService.translate('common.description')};
   assesGridSave: any;
   count: number = 0;
   countTemp: number = 0;
   inclusiveCount: number = 0;
   tempBookMark: string;
   dupCount: number = 0;
   dataCount: Assessments[] = [];;
   constructor(private ocmnoqueFactory: OcmnoqueService, private lovService: LovService,
      public translateService: TranslateService, public sessionManager: UserSessionManager) {
      // TODO initilize data members here..!
      this.assAnsColumnDef = [];
      this.assSectColumnDef = [];
      this.assessColumnDef = [];
      this.assquesColumnDef = [];
      this.assResColumnDef = [];
   }
   ngOnInit() {
      this.assesGridSave = false;
      this.questionType = undefined;
      this.disableSearchFields = false;
      this.retriveDisabled = false;
      this.clearDisabled = true;
      this.saveDisabled = true;
      this.assesclearDisabled = true;
      this.disableAssesFields = true;
      this.enableAssesGridInsert = true;
      this.enableSecGridInsert = false;
      this.enableQueGridInsert = false;
      this.enableAnsGridInsert = false;
      this.enableResGridInsert = false;

      this.disableQuesCodeLov = true;
      this.disableAnsCodeLov = true;
      this.caseLoadCount = false;
      this.checkAssesRelation = true;
      this.checkAssesSecRelation = true;
      this.checkAssesQuesRelation = true;
      this.checkAssesAnsRelation = true;
      this.checkAssesResRelation = true;
      this.options = [
         { code: 'Y', description: 'Active', },
         { code: 'N', description: 'Inactive', },
      ];

      this.screenOptions = [
         { code: 'ASSESS', description: 'Assessments', },
         { code: 'EVAL', description: 'Evaluations', },
         { code: 'BOTH', description: 'Both', },
      ];


      this.assessColumnDef = [
         {
            fieldName: this.translateService.translate('common.code') + '*', field: 'assessmentCode', editable: true,
            datatype: 'text', maxlength: 20, width: 100, cellEditable: this.canAssesCodeEdit
         },
         {
            fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true,
            datatype: 'text', maxlength: 100, uppercase: 'false', width: 150
         },
         {
            fieldName: this.translateService.translate('common.effectivedate'), field: 'effectiveDate', editable: true,
            width: 150, datatype: 'date', cellEditable: this.canEffectiveDateEdit
         },
         {
            fieldName: this.translateService.translate('common.caseload'), field: 'caseloadType', editable: true, width: 150,
            datatype: 'lov', domain: 'CLOAD_TYPE', titles: this.caseLoadTitles
         },
         {
            fieldName: this.translateService.translate('ocmnoque.sequence'), field: 'listSeq', editable: true, width: 150
            , maxValue: '999', strictFP: true, whole: true, datatype: 'number'
         },
         {
            fieldName: this.translateService.translate('ocmnoque.cellSharingAlert'), field: 'cellSharingAlertFlag',
            editable: true, width: 150, datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
            datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
            width: 150, datatype: 'date'
         },
         { fieldName: '', field: 'hideValue', hide: true, nonSavable: this.nonSavable },
      ];

      this.assSectColumnDef = [
         {
            fieldName: this.translateService.translate('ocmnoque.sectionCode') + '*', field: 'assessmentCode', editable: true, width: 150
            , datatype: 'text', maxlength: 20, cellEditable: this.canSecCodeEdit
         },
         {
            fieldName: this.translateService.translate('ocmnoque.sectionDescription') + '*', field: 'description',
            editable: true, width: 150, datatype: 'text', maxlength: 300, uppercase: 'false'
         },
         {
            fieldName: this.translateService.translate('ocmnoque.sequence'), field: 'listSeq', editable: true, width: 150
            , maxValue: '999', strictFP: true, whole: true, datatype: 'number', required: true
         },
         {
            fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
            datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
            width: 150, datatype: 'date'
         },
      ];

      this.assquesColumnDef = [
         {
            fieldName: this.translateService.translate('ocmnoque.questionCode') + '*', field: 'assessmentCode', editable: true, width: 150
            , datatype: 'text', maxlength: 20, cellEditable: this.canQuesCodeEdit
         },
         {
            fieldName: this.translateService.translate('ocmnoque.questionWording') + '*', field: 'description', editable: true, width: 150
            , datatype: 'text', maxlength: 300, uppercase: 'false'
         },
         {
            fieldName: this.translateService.translate('common.type') + '*', field: 'assessmentType', editable: true,
            width: 150, domain: 'ASSESS_TYPE', datatype: 'lov', titles: this.typeLovTitles
         },
         {
            fieldName: this.translateService.translate('ocmnoque.sequence'), field: 'listSeq', editable: true, width: 150
            , maxValue: '999', strictFP: true, whole: true, datatype: 'number'
         },
         {
            fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
            datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
            width: 150, datatype: 'date'
         },
         {
            fieldName: this.translateService.translate('ocmnoque.required'), field: 'requiredFlag', editable: true,
            width: 150,  datatype: 'checkbox'
         },
      ];

      this.assAnsColumnDef = [
         {
            fieldName: this.translateService.translate('ocmnoque.answerCode') + '*', field: 'assessmentCode', editable: true, width: 150
            , datatype: 'text', maxlength: 20, cellEditable: this.canAnsCodeEdit
         },
         {
            fieldName: this.translateService.translate('ocmnoque.bookmarkCondition'), field: 'bookmarkCondition', editable: true, width: 150
            , datatype: 'lov', domain: 'BOOKMRK_COND',
         },
         {
            fieldName: this.translateService.translate('ocmnoque.answerBookmark'), field: 'ansBookMark', editable: true, width: 150,source:'OUMBMARK'
            , datatype: 'lov',link:'ocmnoque/rgBookMarkRecordGroup',titles:this.bookmarksTitles, cellEditable: this.canAssesCodeEditBkMrkCon
         },
         {
            fieldName: this.translateService.translate('ocmnoque.answerWording'), field: 'description', editable: true, width: 150
            , datatype: 'text', maxlength: 300, uppercase: 'false', cellEditable: this.canAnsWording
         },
         {
            fieldName: this.translateService.translate('ocmnoque.min'), field: 'minValue', editable: true, width: 150
            , datatype: 'number', maxValue: '9999', strictFP: true, cellEditable : this.rangeValueEdit
         },
         {
            fieldName: this.translateService.translate('ocmnoque.max'), field: 'maxValue', editable: true, width: 150
            , datatype: 'number', maxValue: '9999', strictFP: true, cellEditable : this.rangeValueEdit
         },
         {
            fieldName: this.translateService.translate('common.score'), field: 'score', editable: true, width: 150
            , maxValue: '9999', strictFP: true, whole: false, datatype: 'number'
         },
         {
            fieldName: this.translateService.translate('ocmnoque.sequence') + '*', field: 'listSeq', editable: true, width: 150
            , maxValue: '999', strictFP: true, whole: true, datatype: 'number'
         },
         {
            fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
            datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
            width: 150, datatype: 'date'
         },
         { fieldName: '', field: 'answerValue', hide: true },
      ];

      this.assResColumnDef = [
         { fieldName: '', field: 'test', hide: true },
         {
            fieldName: this.translateService.translate('ocmnoque.resultcode') + '*',
            field: 'supervisionLevelType', editable: true, width: 150,
            domain: 'SUP_LVL_TYPE', datatype: 'lov', cellEditable: this.canResCodeEdit
         },
         {
            fieldName: this.translateService.translate('ocmnoque.sequence'), field: 'listSeq', editable: true, width: 150
            , maxValue: '999', strictFP: true, whole: true, datatype: 'number'
         },
         {
            fieldName: this.translateService.translate('ocmnoque.cellSharingAlertLvl'), field: 'cellSharingAlertFlag',
            editable: true, width: 150, datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
            datatype: 'checkbox'
         },
         {
            fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
            width: 150, datatype: 'date'
         },
      ];

      const serviceObj = this.ocmnoqueFactory.assessExecuteQuery(this.assessSingleSearchModel);
      serviceObj.subscribe(data => {
         if (data.length > 0) {
            this.assessDataTemp = data;
         }
      });
      this.ocmnoqueexecuteQuery();
      this.ansgrid.requiredOn('description');
      this.ansgrid.requiredOff('minValue');
      this.ansgrid.requiredOff('maxValue');
   }
   /**
    * This function displays the messages
    */
   show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
   }

   canAssesCodeEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }

   canEffectiveDateEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }

   canSecCodeEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }

   canQuesCodeEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }

   canAnsCodeEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }

   canResCodeEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
         return true;
      } else {
         return false;
      }
   }
   canAnsWording = (data: any, index: number, field: string): boolean => {
      if(data.bookmarkCondition === 'BAR'){
         return false;
      } else { 
         return true;
      }
   }

   rangeValueEdit = (data: any, index: number, field: string): boolean => {
      if(!data.bookmarkCondition || data.bookmarkCondition === 'EAW'){
         return false;
      } else { 
         return true;
      }
   }

   isInsertable(effectiveDate?, exipryeDate?) {
      if ((this.assessSingleSearchModel.assessmentCode || this.assessSingleSearchModel.description
         || this.assessSingleSearchModel.effectiveDate || this.assessSingleSearchModel.caseloadType
         || this.assessSingleSearchModel.listSeq || this.assessSingleSearchModel.cellSharingAlertFlag
         || this.activeFlag || this.cellShareFlag || this.assessSingleSearchModel.expiryDate) || this.disableSearchFields) {
         this.clearDisabled = false;
      } else {
         this.clearDisabled = true;
      }
      if (effectiveDate || exipryeDate) {
         this.clearDisabled = false;
      }
   }

   assesChange() {
      if ((this.assessModel.determineSupLevelFlag || this.assessModel.requireApprovalFlag || this.assessModel.calculateTotalFlag
         || this.assessModel.reviewCycleDays || this.assessModel.scheduleCompleteDays || this.assessModel.screenCode) &&
         this.assessModel.assessmentId) {
         this.saveDisabled = false;
         this.assesclearDisabled = false;
      } else {
         this.saveDisabled = true;
         this.assesclearDisabled = true;
      }
   }

   onRowClickassess(event) {
      if (event ) {
         this.assessModel = event;
         this.disableAssesFields = false;
         this.caseLoadCount = false;
         this.questionType = undefined;
         this.saveDisabled = true;
         this.asssectData = [];
         this.questionCode = undefined;
         this.assqueGridData = [];
         this.answerCode = undefined;
         this.assansGridData = [];
         this.assresData = [];
         if(event.createDatetime)
         this.assesGridDeleteButton=true;
         else 
       this.assesGridDeleteButton=false;

         if (this.assessModel.assessmentId) {
            this.oldCaseLoadType = undefined;
            this.enableSecGridInsert = true;
            this.enableResGridInsert = true;
            this.sectionLink = undefined;
            this.sectionLink = '/ocmnoque/assSectLov?assessmentId='
               + this.assessModel.assessmentId;
            this.asssectData = [];
            this.assqueGridData = [];
            this.assansGridData = [];
            this.assresData = [];
            setTimeout(() => {
               this.saveDisabled = true;
               this.assesclearDisabled = true;
            }, 10);
            this.asssectExecuteQuery();
            this.assresExecuteQuery();
            this.validateCaseLoad();
            this.assessKeyDeleteRec();
         }
      } else {
         // this.asssectData = [];
         // this.assqueGridData = [];
         // this.assansGridData = [];
         // this.assresData = [];
         // this.questionCode=undefined;
         // this.answerCode=undefined;
         // this.questionType=undefined;
         this.disableAssesFields = true;
                this.assesGridDeleteButton=false;

         
         
         
      }
   }

   assessKeyDeleteRec() {
      this.checkAssesRelation = true;
      const serviceObj = this.ocmnoqueFactory.assessKeyDeleteRec(this.assessModel.assessmentId);
      serviceObj.subscribe(data => {
         this.checkAssesRelation = data;
      });
   }

   assessSecKeyDeleteRec() {
      this.checkAssesSecRelation = true;
      const serviceObj = this.ocmnoqueFactory.assessKeyDeleteRec(this.asssectModel.assessmentId);
      serviceObj.subscribe(data => {
         this.checkAssesSecRelation = data;
         this.questionCode = undefined;
         this.questionCode = this.asssectModel.assessmentCode;
      });
   }

   assessQuesKeyDeleteRec() {
      this.checkAssesQuesRelation = true;
      const serviceObj = this.ocmnoqueFactory.assessKeyDeleteRec(this.assQueModel.assessmentId);
      serviceObj.subscribe(data => {
         this.checkAssesQuesRelation = data;
         this.answerCode = undefined;
         this.answerCode = this.assQueModel.assessmentCode;
      });
   }

   assessAnsKeyDeleteRec() {
      this.checkAssesAnsRelation = true;
      const serviceObj = this.ocmnoqueFactory.assessKeyDeleteRec(this.assAnsModel.assessmentId);
      serviceObj.subscribe(data => {
         this.checkAssesAnsRelation = data;
      });
   }

   assessResKeyDeleteRec() {
      this.checkAssesResRelation = true;
      const serviceObj = this.ocmnoqueFactory.assessResKeyDeleteRec(this.assresModel);
      serviceObj.subscribe(data => {
         this.checkAssesResRelation = data;
      });
   }

   onAssessGridDelete = () => {
      if(this.assessModel.assessmentCode && this.assessModel.description&& this.assessData){
      if (!this.checkAssesRelation) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocmnoque.canNotDeleteAssessment');
         this.show();
         return false;
      } else if (this.asssectData.length > 0 || this.assresData.length > 0) {
         this.type = 'warn';
         this.message = this.translateService.translate('common.cannotdeletemaster');
         this.show();
         return false;
      }
   }
      return true;
   }

   onSecGridDelete = () => {
      if (this.asssectModel.assessmentCode && this.asssectModel.description && this.asssectModel.listSeq) {
         if (!this.checkAssesSecRelation) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.canNotDeleteSection');
            this.show();
            return false;
         } else if (this.assqueGridData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemaster');
            this.show();
            return false;
         }
      }
      return true;
   }

   onQuesGridDelete = () => {
      if(this.assQueModel.assessmentCode && this.assQueModel.description && this.assQueModel.assessmentType && this.assqueGridData){
      if (!this.checkAssesQuesRelation) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocmnoque.canNotDeleteQuestion');
         this.show();
         return false;
      } else if (this.assansGridData.length > 0) {
         this.type = 'warn';
         this.message = this.translateService.translate('common.cannotdeletemaster');
         this.show();
         return false;
      }
   }
      return true;
   }

   onAnsGridDelete = () => {
      if(this. assAnsModel.assessmentCode && this. assAnsModel.description && this. assAnsModel.listSeq){
      if (!this.checkAssesAnsRelation) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocmnoque.canNotDeleteAnswer');
         this.show();
         return false;
      }
   }
      return true;
   }

   onResGridDelete = () => {
      if (!this.checkAssesResRelation) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocmnoque.canNotDeleteAnswer');
         this.show();
         return false;
      }
      return true;
   }

   validateCaseLoad() {
      const serviceObj = this.ocmnoqueFactory.validateCaseLoad(this.assessModel.assessmentId);
      serviceObj.subscribe(data => {
         this.saveDisabled = true;
         if (data > 0) {
            this.caseLoadCount = true;
         } else {
            this.caseLoadCount = false;
         }
      });
   }
   clear() {
      this.activeFlag = undefined;
      this.cellShareFlag = undefined;
      this.disableSearchFields = false;
      this.retriveDisabled = false;
      this.clearDisabled = true;
      this.disableAssesFields = true;
      this.enableAssesGridInsert = true;
      this.enableSecGridInsert = false;
      this.enableQueGridInsert = false;
      this.enableAnsGridInsert = false;
      this.enableResGridInsert = false;
      this.disableQuesCodeLov = true;
      this.disableAnsCodeLov = true;
      this.assessSingleSearchModel = new Assessments();
      this.assessData = [];
      this.assessDataForClear = [];
      this.assessModel = new Assessments();
      this.asssectData = [];
      this.asssectModel = new Assessments();
      this.assQueModel = new Assessments();
      this.assqueGridData = [];
      this.assAnsModel = new Assessments();
      this.assansGridData = [];
      this.assresData = [];
      this.caseLoadCount = false;
      this.checkAssesRelation = true;
      this.checkAssesSecRelation = true;
      this.checkAssesQuesRelation = true;
      this.checkAssesAnsRelation = true;
      this.checkAssesResRelation = true;
      this.questionCode = undefined;
      this.answerCode = undefined;
      this.assesclearDisabled = true;
      this.saveDisabled = true;
      this.questionType = undefined;
   }

   clearAssesFields() {
      this.assessModel.determineSupLevelFlag = this.assessModel.determineSupLevelFlagTemp;
      this.assessModel.requireApprovalFlag = this.assessModel.requireApprovalFlagTemp;
      this.assessModel.calculateTotalFlag = this.assessModel.calculateTotalFlagTemp;
      this.assessModel.reviewCycleDays = this.assessModel.reviewCycleDaysTemp;
      this.assessModel.scheduleCompleteDays = this.assessModel.scheduleCompleteDaysTemp;
      this.assessModel.screenCode = this.assessModel.screenCodeTemp;
      setTimeout(ele => {
         this.assesclearDisabled = true;
         this.saveDisabled = true;
      }, 5);
   }
   onRowClickassSect(event) {
      this.checkAssesSecRelation = true;
      this.questionType = undefined;
      if (event) {
         this.asssectModel = event;
         if(this.asssectModel.createDatetime){
            this.selectionGridDelete = true;
         }else{
            this.selectionGridDelete = false;
         }
         this.assqueGridData = [];
         this.assansGridData = [];
         if (event.assessmentId) {
            this.enableQueGridInsert = true;
            this.assessSecKeyDeleteRec();
         }
        
      }
      else{
         this.selectionGridDelete = false;
      }
   }
   onRowClickassQues(event) {
      this.checkAssesQuesRelation = true;
      if (event) {
         this.assQueModel = event;
         if(event.createDatetime)
         this.questionGridButton=true;
         else
            this.questionGridButton=false;
         this.assansGridData = [];
         if (event.assessmentId) {
            this.enableAnsGridInsert = true;
            this.assessQuesKeyDeleteRec();
         }
      }else{
         this.questionGridButton=false;
      }
   }

   onRowClickassAns(event) {
      this.checkAssesAnsRelation = true;
      if (event) {
         this. assAnsModel= event;
         if(this.assAnsModel.createDatetime)
         this.answerGridButton=true;
         else
         this.answerGridButton=false;
            if (event.assessmentId) {
               this.assessAnsKeyDeleteRec();
            }
         if (event.bookmarkCondition === 'BAR') {
            this.ansgrid.requiredOff('description');
         }else { 
            this.ansgrid.requiredOn('description');
         }
         if (event.bookmarkCondition === 'BAR') {
            this.ansgrid.requiredOn('minValue');
         } else {
            this.ansgrid.requiredOff('minValue');
         }
         if (event.bookmarkCondition === 'BAR') {
            this.ansgrid.requiredOn('maxValue');
         } else {
            this.ansgrid.requiredOff('maxValue');
         } 
      } else {
         this.answerGridButton = false;
      }
   }

   onRowClickassres(event) {
      this.checkAssesAnsRelation = true;
      if (event) {
         this.assresModel = event;
         if(this.assresModel.createDatetime)
         this.resultGridButton=true;
         else
            this.resultGridButton=false;
         if (event.assessmentId) {
            this.assessAnsKeyDeleteRec();
         }
      }else{
         this.resultGridButton=false;
      }
   }
   questionCodeChange(event) {
      if (event && event.assessmentId) {
         this.asssectModel.assessmentId = event.assessmentId;
         this.assQueExecuteQuery();
      }
   }
   answerCodeChange(event) {
      if (event && event.assessmentId) {
         this.assQueModel.assessmentId = event.assessmentId;
         this.questionType = event.assessmentType;
         this.assAnsExecuteQuery();
      }
   }

   trMsg(msg, astr?) {
      return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
   }

   /**
    *  This function will be executed when commit event is
   * fired
   */
   ocmnoqueSaveAssessForm(event) {
      // TODO declare commit bean and add insert list to that object.
      this.assessInsertList = event.added;
      this.assessUpdateList = event.updated;
      this.assessDeleteList = event.removed;
      this.assessCommitModel.insertList = [];
      this.assessCommitModel.updateList = [];
      this.assessCommitModel.deleteList = [];
      if (this.assessInsertList.length > 0 || this.assessUpdateList.length > 0) {
         for (let i = 0; i < this.assessInsertList.length; i++) {
            if (!this.assessInsertList[i].assessmentCode || !this.assessInsertList[i].assessmentCode.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('common.codemustbeentered');
               this.show();
               return;
            }
            if (!this.assessInsertList[i].description || !this.assessInsertList[i].description.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('common.descriptionmustbeentered');
               this.show();
               return;
            }
            if (!this.assessInsertList[i].screenCode) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.enterScreenCode');
               this.show();
               return;
            }
            this.assessInsertList[i].activeFlag = this.assessInsertList[i].activeFlag ? 'Y' : 'N';
            this.assessInsertList[i].requiredFlag = this.assessInsertList[i].requiredFlag ? 'Y' : 'N';
            this.assessInsertList[i].cellSharingAlertFlag = this.assessInsertList[i].cellSharingAlertFlag ? 'Y' : 'N';
            this.assessInsertList[i].updateAllowedFlag = 'Y';
            this.assessInsertList[i].assessmentClass = 'TYPE';
            this.assessCommitModel.insertList = this.assessInsertList;
         }
         for (let i = 0; i < this.assessUpdateList.length; i++) {
            if (!this.assessUpdateList[i].screenCode) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.enterScreenCode');
               this.show();
               return;
            }
            if (!this.assessUpdateList[i].assessmentCode || !this.assessUpdateList[i].assessmentCode.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('common.codemustbeentered');
               this.show();
               return;
            }
            if (!this.assessUpdateList[i].description || !this.assessUpdateList[i].description.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('common.descriptionmustbeentered');
               this.show();
               return;
            }
            this.assessUpdateList[i].activeFlag = this.assessUpdateList[i].activeFlag ? 'Y' : 'N';
            this.assessUpdateList[i].requiredFlag = this.assessUpdateList[i].requiredFlag ? 'Y' : 'N';
            this.assessUpdateList[i].cellSharingAlertFlag = this.assessUpdateList[i].cellSharingAlertFlag ? 'Y' : 'N';
            this.assessCommitModel.updateList = this.assessUpdateList;
         }
      }
      if (this.assessDeleteList.length > 0) {
         for (let i = 0; i < this.assessDeleteList.length; i++) {
            this.assessDeleteList[i].activeFlag = this.assessDeleteList[i].activeFlag ? 'Y' : 'N';
            this.assessDeleteList[i].requiredFlag = this.assessDeleteList[i].requiredFlag ? 'Y' : 'N';
            this.assessDeleteList[i].cellSharingAlertFlag = this.assessDeleteList[i].cellSharingAlertFlag ? 'Y' : 'N';
            this.assessCommitModel.deleteList = this.assessDeleteList;
         }
      }
      const assessSaveData = this.ocmnoqueFactory.assessCommit(this.assessCommitModel);
      assessSaveData.subscribe(data => {
         if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.ocmnoqueexecuteQuery();
            return;
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            this.ocmnoqueexecuteQuery();
            return;
         }
      });
   }
   // execute query
   ocmnoqueexecuteQuery(effectiveDate?, exipryeDate?) {

      if (effectiveDate) {
         if (effectiveDate.lastValue === '0_/__/____') {
            this.type = 'warn';
            this.message = this.translateService.translate('common.leapyearnotallowed');
            this.show();
            this.clearDisabled = false;
            return;
         }
         if (String(effectiveDate.lastValue).indexOf('_') >= 0 && effectiveDate.value === null) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbeentervalidformat');
            this.show();
            this.clearDisabled = false;
            return;
         }
      }
      if (exipryeDate) {
         if (exipryeDate.lastValue === '0_/__/____') {
            this.type = 'warn';
            this.message = this.translateService.translate('common.leapyearnotallowed');
            this.show();
            this.clearDisabled = false;
            return;
         }
         if (String(exipryeDate.lastValue).indexOf('_') >= 0 && exipryeDate.value === null) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.datemustbeentervalidformat');
            this.show();
            this.clearDisabled = false;
            return;
         }
      }
      const serviceObj = this.ocmnoqueFactory.assessExecuteQuery(this.assessSingleSearchModel);
      serviceObj.subscribe(data => {
         if (data.length === 0) {
            this.assessData = [];
            this.assessSingleSearchModel = new Assessments();
            this.clearDisabled = true;
            this.activeFlag = undefined;
            this.cellShareFlag = undefined;
            this.type = 'warn';
            this.message = this.translateService.translate('common.querycausedReEnter');
            this.show();
            return;
         } else {
            this.disableSearchFields = true;
            this.clearDisabled = false;
            this.retriveDisabled = true;
            this.disableAssesFields = false;
            data.forEach(element => {
               element.cellSharingAlertFlag = element.cellSharingAlertFlag === 'Y' ? true : false;
               element.activeFlag = element.activeFlag === 'Y' ? true : false;
               element.determineSupLevelFlagTemp = element.determineSupLevelFlag;
               element.requireApprovalFlagTemp = element.requireApprovalFlag;
               element.calculateTotalFlagTemp = element.calculateTotalFlag;
               element.reviewCycleDaysTemp = element.reviewCycleDays;
               element.scheduleCompleteDaysTemp = element.scheduleCompleteDays;
               element.screenCodeTemp = element.screenCode;
            });
            this.assessData = data;
            this.assessDataForClear = data;
            this.assessIndex = 0;
         }
      });
   }

   /*
   * This function converts the given date from MM/dd/yyyy to
   * yyyy/MM/dd format, If input data is not as expected
   * format then it will return input value
   */

   asssectExecuteQuery() {
      const asssectResult = this.ocmnoqueFactory.assSectExecuteQuery(this.assessModel.assessmentId);
      asssectResult.subscribe(asssectResultList => {
         if (asssectResultList.length === 0) {
            this.asssectData = [];
            this.disableQuesCodeLov = true;
            this.disableAnsCodeLov = true;
            return;
         } else {
            asssectResultList.forEach(element => {
               element.activeFlag = element.activeFlag === 'Y' ? true : false;
            });
            if (this.assessData && this.assessData.length > 0) {
               this.asssectData = asssectResultList;
               this.assSecIndex = 0;
               this.disableQuesCodeLov = false;
            }
         }
      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   ocmnoqueSaveasssectForm(event) {
      // TODO declare commit bean and add insert list to that object.
      this.assesGridSave = true;
      this.asssectInsertList = event.added;
      this.asssectUpdateList = event.updated;
      this.asssectDeleteList = event.removed;
      this.asssectCommitModel.insertList = [];
      this.asssectCommitModel.updateList = [];
      this.asssectCommitModel.deleteList = [];
      if (this.asssectInsertList.length > 0 || this.asssectUpdateList.length > 0) {
         for (let i = 0; i < this.asssectInsertList.length; i++) {
            if (!this.asssectInsertList[i].assessmentCode || !this.asssectInsertList[i].assessmentCode.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.sectionCodeMustbeentered');
               this.show();
               return;
            }
            if (!this.asssectInsertList[i].description || !this.asssectInsertList[i].description.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.enterSectionDescription');
               this.show();
               return;
            }
            if (!this.asssectInsertList[i].listSeq && this.asssectInsertList[i].listSeq !== 0) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.sequencemustbeentered');
               this.show();
               return;
            }
            if (!this.assessModel.assessmentId) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.canNotCreateRecord');
               this.show();
               return;
            }
            this.asssectInsertList[i].parentAssessmentId = this.assessModel.assessmentId;
            this.asssectInsertList[i].activeFlag = this.asssectInsertList[i].activeFlag ? 'Y' : 'N';
            this.asssectInsertList[i].requiredFlag = this.asssectInsertList[i].requiredFlag ? 'Y' : 'N';
            this.asssectInsertList[i].assessmentClass = 'SECT';
            this.asssectInsertList[i].updateAllowedFlag = 'Y';
            this.asssectInsertList[i].sectScoreOverrideFlag = 'N';
            this.asssectInsertList[i].sectScoreIncludeFlag = 'Y';
            this.asssectCommitModel.insertList = this.asssectInsertList;

         }
         for (let i = 0; i < this.asssectUpdateList.length; i++) {
            if (!this.asssectUpdateList[i].assessmentCode || !this.asssectUpdateList[i].assessmentCode.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.sectionCodeMustbeentered');
               this.show();
               return;
            }
            if (!this.asssectUpdateList[i].description || !this.asssectUpdateList[i].description.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.enterSectionDescription');
               this.show();
               return;
            }
            if (!this.asssectUpdateList[i].listSeq && this.asssectUpdateList[i].listSeq !== 0) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.sequencemustbeentered');
               this.show();
               return;
            }
            this.asssectUpdateList[i].activeFlag = this.asssectUpdateList[i].activeFlag ? 'Y' : 'N';
            this.asssectUpdateList[i].requiredFlag = this.asssectUpdateList[i].requiredFlag ? 'Y' : 'N';
            this.asssectCommitModel.updateList = this.asssectUpdateList;
         }
      }
      if (this.asssectDeleteList.length > 0) {
         for (let i = 0; i < this.asssectDeleteList.length; i++) {
            this.asssectDeleteList[i].activeFlag = this.asssectDeleteList[i].activeFlag ? 'Y' : 'N';
            this.asssectDeleteList[i].requiredFlag = this.asssectDeleteList[i].requiredFlag ? 'Y' : 'N';
            this.asssectCommitModel.deleteList = this.asssectDeleteList;
         }
      }
      const asssectSaveData = this.ocmnoqueFactory.assessCommit(this.asssectCommitModel);
      asssectSaveData.subscribe(data => {
         this.assesGridSave = false;
         if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.lovService.clear(this.sectionLink);
            this.asssectExecuteQuery();
            this.sectionLink = '/ocmnoque/assSectLov?assessmentId='
               + this.assessModel.assessmentId;
            return;
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            this.asssectExecuteQuery();
            return;
         }
      });
   }

   assQueExecuteQuery() {
      const assQueResult = this.ocmnoqueFactory.
         assQueExecuteQuery(this.asssectModel);
      assQueResult.subscribe(assQueResultList => {
         if (assQueResultList.length === 0) {
            this.assqueGridData = [];
            this.disableAnsCodeLov = true;
         } else {
            assQueResultList.forEach(element => {
               element.activeFlag = element.activeFlag === 'Y' ? true : false;
               element.requiredFlag = element.requiredFlag === 'Y' ? true : false;
            });
            if (this.asssectData && this.asssectData.length > 0) {
               this.assqueGridData = assQueResultList;
               this.assQueIndex = 0;
               this.disableAnsCodeLov = false;
            }
         }
         this.questionLink = undefined;
         this.questionLink = '/ocmnoque/assQueLov?assessmentId='
            + this.asssectModel.assessmentId;
      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   ocmnoqueSaveAssQueForm(event) {
      // TODO declare commit bean and add insert list to that object.
      this.assQueInsertList = event.added;
      this.assQueUpdateList = event.updated;
      this.assQueDeleteList = event.removed;
      this.assQueCommitModel.insertList = [];
      this.assQueCommitModel.updateList = [];
      this.assQueCommitModel.deleteList = [];
       if(this.asssectData.length===0){
         this.type = 'warn';
         this.message = this.translateService.translate('ocmnoque.enterSection');
          this.show();
          return;
       }
      if (this.assQueInsertList.length > 0 || this.assQueUpdateList.length > 0) {
         for (let i = 0; i < this.assQueInsertList.length; i++) {
            if (!this.assQueInsertList[i].assessmentCode || !this.assQueInsertList[i].assessmentCode.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.questionCodeMustBeEntered');
               this.show();
               return;
            }
            if (!this.assQueInsertList[i].description || !this.assQueInsertList[i].description.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.questionWordingMustBeEntered');
               this.show();
               return;
            }
            if (!this.asssectModel.assessmentId) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.canNotCreateRecord');
               this.show();
               return;
            }
            this.assQueInsertList[i].parentAssessmentId = this.asssectModel.assessmentId;
            this.assQueInsertList[i].activeFlag = this.assQueInsertList[i].activeFlag ? 'Y' : 'N';
            this.assQueInsertList[i].requiredFlag = this.assQueInsertList[i].requiredFlag ? 'Y' : 'N';
            this.assQueInsertList[i].assessmentClass = 'CAT';
            this.assQueInsertList[i].updateAllowedFlag = 'Y';
            this.assQueCommitModel.insertList = this.assQueInsertList;
         }
         for (let i = 0; i < this.assQueUpdateList.length; i++) {
            if (!this.assQueUpdateList[i].assessmentCode || !this.assQueUpdateList[i].assessmentCode.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.questionCodeMustBeEntered');
               this.show();
               return;
            }
            if (!this.assQueUpdateList[i].description || !this.assQueUpdateList[i].description.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.questionWordingMustBeEntered');
               this.show();
               return;
            }
            this.assQueUpdateList[i].activeFlag = this.assQueUpdateList[i].activeFlag ? 'Y' : 'N';
            this.assQueUpdateList[i].requiredFlag = this.assQueUpdateList[i].requiredFlag ? 'Y' : 'N';
            this.assQueCommitModel.updateList = this.assQueUpdateList;
         }
      }
      if (this.assQueDeleteList.length > 0) {
         for (let i = 0; i < this.assQueDeleteList.length; i++) {
            this.assQueDeleteList[i].activeFlag = this.assQueDeleteList[i].activeFlag ? 'Y' : 'N';
            this.assQueDeleteList[i].requiredFlag = this.assQueDeleteList[i].requiredFlag ? 'Y' : 'N';
            this.assQueCommitModel.deleteList = this.assQueDeleteList;
         }
      }
      const assQueSaveData = this.ocmnoqueFactory.assessCommit(this.assQueCommitModel);
      assQueSaveData.subscribe(data => {
         if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.assQueExecuteQuery();
            this.assessSecKeyDeleteRec();
            this.lovService.clear(this.questionLink);
            this.questionLink = '/ocmnoque/assQueLov?assessmentId='
               + this.asssectModel.assessmentId;
            return;
         } else if (data === 5) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.canNotDeleteQuestion');
            this.show();
            return;
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            this.assQueExecuteQuery();
            return;
         }
      });
   }

   assAnsExecuteQuery() {
      const assans2Result = this.ocmnoqueFactory.
         assAnsExecuteQuery(this.assQueModel);
      assans2Result.subscribe(assans2ResultList => {
         if (assans2ResultList.length === 0) {
            this.assansGridData = [];
         } else {
            assans2ResultList.forEach(element => {
               element.activeFlag = element.activeFlag === 'Y' ? true : false;
            });
            if (this.assqueGridData && this.assqueGridData.length > 0) {
               this.assansGridData = assans2ResultList;
               this.assAnsIndex = 0;
            }
         }
      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   ocmnoqueSaveAssAnsForm(event) {
      if (this.questionType === 'EXCLUSIVE') {
         if (this.assansGridData.length > 0) {
            let dupList = this.assansGridData.filter(X => X.ansBookMark && X.ansBookMark !== null);
            this.dataCount = dupList;
            if (this.dataCount!== null && this.dataCount.length > 0) {
               this.tempBookMark = dupList[0].ansBookMark;
               let dupListOne = dupList.filter(X => this.tempBookMark !== X.ansBookMark);
               this.dupCount = dupListOne.length;
            }
         }
      }
      if (this.assansGridData.length > 1) {
         for (let i = 0; i < this.assansGridData.length; i++) {
            if( this.assansGridData[i].answerValue && Number(this.assansGridData[i].answerValue)>0){
               this.inclusiveCount = (this.inclusiveCount + 1);
            }
         }
      }
      this.assAnsInsertList = event.added;
      this.assAnsUpdateList = event.updated;
      this.assAnsDeleteList = event.removed;
      this.assAnsCommitModel.insertList = [];
      this.assAnsCommitModel.updateList = [];
      this.assAnsCommitModel.deleteList = [];
      if(this.assqueGridData.length===0){
         this.type = 'warn';
         this.message = this.translateService.translate('ocmnoque.enterQuestion');
         this.show();
         return;
      }
      if (this.assAnsInsertList.length > 0 || this.assAnsUpdateList.length > 0) {
         for (let i = 0; i < this.assAnsInsertList.length; i++) {
            if (!this.assAnsInsertList[i].assessmentCode || !this.assAnsInsertList[i].assessmentCode.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.answerCodeMustBeEntered');
               this.show();
               return;
            }
            if (this.assAnsInsertList[i].bookmarkCondition === 'BAR') {
               if (!this.assAnsInsertList[i].minValue || !this.assAnsInsertList[i].maxValue) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocmnoque.pleasefillminmaxvalues');
                  this.show();
                  return;
               }
            }
            if (!this.assAnsInsertList[i].description || !this.assAnsInsertList[i].description.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.answerWordingMustBeEntered');
               this.show();
               return;
            }
            if (!this.assAnsInsertList[i].listSeq && this.assAnsInsertList[i].listSeq !== 0) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.sequencemustbeentered');
               this.show();
               return;
            }
            if (!this.assQueModel.assessmentId) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.canNotCreateRecord');
               this.show();
               return;
            }
            if( this.assAnsInsertList[i].bookmarkCondition === 'BAR' && this.assAnsInsertList[i].minValue >  this.assAnsInsertList[i].maxValue){
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.maxmin');
               this.show();
               return;
            }
            /* if(this.questionType === 'INCLUSIVE' &&  this.inclusiveCount ){
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.onlyonebookmarkanswerforincusive');
               this.show();
               this.inclusiveCount = 0;
               return;
            } 
             if (this.questionType === 'EXCLUSIVE' && this.dataCount && this.dataCount.length !== this.assansGridData.length && this.assAnsInsertList[i].ansBookMark) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.onlyonebookmarkanswerforexclusive');
               this.show();
               this.countTemp = 0;
               this.dataCount = 0;
               return;
            } */

            if (this.questionType === 'EXCLUSIVE' && this.dupCount>0) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.onlyonebookmarkanswerforexclusive');
               this.show();
               this.countTemp = 0;
               return;
            } 
            
            this.assAnsInsertList[i].parentAssessmentId = this.assQueModel.assessmentId;
            this.assAnsInsertList[i].activeFlag = this.assAnsInsertList[i].activeFlag ? 'Y' : 'N';
            this.assAnsInsertList[i].requiredFlag = this.assAnsInsertList[i].requiredFlag ? 'Y' : 'N';
            this.assAnsInsertList[i].updateAllowedFlag = 'Y';
            this.assAnsInsertList[i].assessmentClass = 'IND';
            this.assAnsCommitModel.insertList = this.assAnsInsertList;
         }
         for (let i = 0; i < this.assAnsUpdateList.length; i++) {
            if (!this.assAnsUpdateList[i].assessmentCode || !this.assAnsUpdateList[i].assessmentCode.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.answerCodeMustBeEntered');
               this.show();
               return;
            }
            if (this.assAnsUpdateList[i].bookmarkCondition === 'BAR') {
               if (!this.assAnsUpdateList[i].minValue || !this.assAnsUpdateList[i].maxValue) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocmnoque.pleasefillminmaxvalues');
                  this.show();
                  return;
               }
            }
            if (!this.assAnsUpdateList[i].description || !this.assAnsUpdateList[i].description.trim()) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.answerWordingMustBeEntered');
               this.show();
               return;
            }
            if (!this.assAnsUpdateList[i].listSeq && this.assAnsUpdateList[i].listSeq !== 0) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.sequencemustbeentered');
               this.show();
               return;
            }
         
            if( this.assAnsUpdateList[i].bookmarkCondition === 'BAR' && this.assAnsUpdateList[i].minValue >  this.assAnsUpdateList[i].maxValue){
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.maxmin');
               this.show();
               return;
            }

           /*  if(this.questionType === 'INCLUSIVE' && this.inclusiveCount ){
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.onlyonebookmarkanswerforincusive');
               this.show();
               this.inclusiveCount = 0;
               return;
            } 
              if (this.questionType === 'EXCLUSIVE') {
               if (this.assansGridData.length > 1) {
                  let dupList = this.assansGridData.filter(X => (X.ansBookMark && this.assAnsUpdateList[i]) && X.ansBookMark === this.assAnsUpdateList[i].ansBookMark);
                  this.dataCount = dupList;
               }
            } */
            if (this.questionType === 'EXCLUSIVE' && this.dupCount>0) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.onlyonebookmarkanswerforexclusive');
               this.show();
               this.countTemp = 0;
               return;
            }
            this.assAnsUpdateList[i].activeFlag = this.assAnsUpdateList[i].activeFlag ? 'Y' : 'N';
            this.assAnsUpdateList[i].requiredFlag = this.assAnsUpdateList[i].requiredFlag ? 'Y' : 'N';
            this.assAnsCommitModel.updateList = this.assAnsUpdateList;
         }


      }
      if (this.assAnsDeleteList.length > 0) {
         for (let i = 0; i < this.assAnsDeleteList.length; i++) {
            this.assAnsDeleteList[i].activeFlag = this.assAnsDeleteList[i].activeFlag ? 'Y' : 'N';
            this.assAnsDeleteList[i].requiredFlag = this.assAnsDeleteList[i].requiredFlag ? 'Y' : 'N';
            this.assAnsCommitModel.deleteList = this.assAnsDeleteList;
         }
      }
      const assAnsSaveData = this.ocmnoqueFactory.assessCommit(this.assAnsCommitModel);
      assAnsSaveData.subscribe(data => {
         if (data === 1) {
            this.count = 0;
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.assAnsExecuteQuery();
            this.assessQuesKeyDeleteRec();
            return;
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            this.assAnsExecuteQuery();
            return;
         }
      });
   }
   assresExecuteQuery() {
      const assresResult = this.ocmnoqueFactory.
         assResExecuteQuery(this.assessModel);
      assresResult.subscribe(assresResultList => {
         if (assresResultList.length === 0) {
            this.assresData = [];
         } else {
            assresResultList.forEach(element => {
               element.cellSharingAlertFlag = element.cellSharingAlertFlag === 'Y' ? true : false;
               element.activeFlag = element.activeFlag === 'Y' ? true : false;
            });
            if (this.assessData && this.assessData.length > 0) {
               this.assresData = assresResultList;
            }
         }
      });
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   ocmnoqueSaveassresForm(event) {
      // TODO declare commit bean and add insert list to that object.
      this.assresInsertList = event.added;
      this.assresUpdateList = event.updated;
      this.assresDeleteList = event.removed;
      this.assresCommitModel.insertList = [];
      this.assresCommitModel.updateList = [];
      this.assresCommitModel.deleteList = [];
      for (let i = 0; i < this.assresData.length; i++) {
         for (let j = 0; i < this.assresData.length; i++) {
            if (i !== j && this.assresData[i].supervisionLevelType === this.assresData[j].supervisionLevelType) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.duplicateResCode');
               this.show();
               return;
            }
         }
      }
      if (this.assresInsertList.length > 0 || this.assresUpdateList.length > 0) {
         for (let i = 0; i < this.assresInsertList.length; i++) {
            this.assresInsertList[i].activeFlag = this.assresInsertList[i].activeFlag ? 'Y' : 'N';
            this.assresInsertList[i].cellSharingAlertFlag = this.assresInsertList[i].cellSharingAlertFlag ? 'Y' : 'N';
            this.assresInsertList[i].updateAllowedFlag = 'Y';
            this.assresInsertList[i].assessmentId = this.assessModel.assessmentId;
            this.assresCommitModel.insertList = this.assresInsertList;
            if (!this.assresInsertList[i].supervisionLevelType) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.resultCodeMustBeEntered');
               this.show();
               return;
            }
            if (!this.assessModel.assessmentId) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.canNotCreateRecord');
               this.show();
               return;
            }
         }
         for (let i = 0; i < this.assresUpdateList.length; i++) {
            this.assresUpdateList[i].activeFlag = this.assresUpdateList[i].activeFlag ? 'Y' : 'N';
            this.assresUpdateList[i].cellSharingAlertFlag = this.assresUpdateList[i].cellSharingAlertFlag ? 'Y' : 'N';
            this.assresCommitModel.updateList = this.assresUpdateList;
         }
      }
      if (this.assresDeleteList.length > 0) {
         for (let i = 0; i < this.assresDeleteList.length; i++) {
            this.assresDeleteList[i].activeFlag = this.assresDeleteList[i].activeFlag ? 'Y' : 'N';
            this.assresDeleteList[i].cellSharingAlertFlag = this.assresDeleteList[i].cellSharingAlertFlag ? 'Y' : 'N';
            this.assresCommitModel.deleteList = this.assresDeleteList;
         }
      }
      const assresSaveData = this.ocmnoqueFactory.assResCommit(this.assresCommitModel);
      assresSaveData.subscribe(data => {
         if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.assresExecuteQuery();
            return;
         } else if (data === 2) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.thisresultcodealreadyexistsforthisassessment');
            this.show();
            this.assresExecuteQuery();
            return;
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            this.assresExecuteQuery();
            return;
         }
      });
   }

   validateRowData = (event) => {
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      if (event.field === 'activeFlag') {
         if (event.data.activeFlag) {
            this.grid.setColumnData('expiryDate', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         } else if (!event.data.activeFlag) {
            this.grid.setColumnData('expiryDate', rowIndex,
               DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            rowdata.validated = true;
            return rowdata;
         }
      }
      if (event.field === 'caseloadType') {
         if (event.data.caseloadType && this.caseLoadCount && event.oldValue
            && (!this.oldCaseLoadType || this.oldCaseLoadType === event.oldValue)) {
            this.oldCaseLoadType = event.oldValue;
            this.grid.setColumnData('caseloadType', rowIndex, event.oldValue);
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.canNotChangeCaseload');
            this.show();
            rowdata.validated = true;
            return rowdata;
         }
      }
      if (event.field === 'assessmentCode' && event.data.assessmentCode) {
         for (let i = 0; i < this.assessData.length; i++) {
            for (let j = 0; j < this.assessData.length; j++) {
               if (i !== j && this.assessData[i].assessmentCode === this.assessData[j].assessmentCode) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('ocmnoque.duplicateAssesCode');
                  this.show();
                  this.grid.setColumnData('assessmentCode', rowIndex, undefined);
                  rowdata.validated = true;
                  return rowdata;
               }
            }
         }
         for (let i = 0; i < this.assessDataTemp.length; i++) {
            if (event.data.assessmentCode === this.assessDataTemp[i].assessmentCode) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.duplicateAssesCode');
               this.show();
               this.grid.setColumnData('assessmentCode', rowIndex, undefined);
               rowdata.validated = true;
               return rowdata;
            }
         }
      }
      rowdata.validated = true;
      return rowdata;
   }

   validateSecRowData = (event) => {
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      if (event.field === 'activeFlag') {
         if (event.data.activeFlag) {
            this.secgrid.setColumnData('expiryDate', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         } else if (!event.data.activeFlag) {
            this.secgrid.setColumnData('expiryDate', rowIndex,
               DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            rowdata.validated = true;
            return rowdata;
         }
      }
      if (event.field === 'assessmentCode') {
         for (let i = 0; i < this.asssectData.length; i++) {
            if (i !== rowIndex && event.data.assessmentCode === this.asssectData[i].assessmentCode) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.duplicateAssesCode');
               this.show();
               return;
            }
         }
      }
      rowdata.validated = true;
      return rowdata;
   }

   validateQueRowData = (event) => {
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      if (event.field === 'activeFlag') {
         if (event.data.activeFlag) {
            this.quegrid.setColumnData('expiryDate', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         } else if (!event.data.activeFlag) {
            this.quegrid.setColumnData('expiryDate', rowIndex,
               DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            rowdata.validated = true;
            return rowdata;
         }
      }
      if (event.field === 'assessmentCode') {
         for (let i = 0; i < this.assqueGridData.length; i++) {
            if (i !== rowIndex && event.data.assessmentCode === this.assqueGridData[i].assessmentCode) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.duplicateAssesCode');
               this.show();
               return;
            }
         }

         if (this.assqueGridData[rowIndex] && !this.assqueGridData[rowIndex].createDatetime
            && !this.assqueGridData[rowIndex].assessmentType) {
            const serviceObj = this.ocmnoqueFactory.getDefaultAssessmentType();
            serviceObj.subscribe(data => {
               if (data) {
                  this.quegrid.setColumnData('assessmentType', rowIndex, data);
               }
            });
         }
      }
      rowdata.validated = true;
      return rowdata;
   }

   validateAnsRowData = (event) => {
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      if (event.field === 'ansBookMark') {
         if (this.questionType === 'EXCLUSIVE') {
            if (event.data.ansBookMark) {
               if (this.assansGridData.length > 0) {
                  for (let i = 0; i <= this.assansGridData.length; i++) {
                     this.count = 0;
                     if ((this.assansGridData[i].ansBookMark &&  event.data.ansBookMark) && this.assansGridData[i].ansBookMark !== event.data.ansBookMark ) {
                        this.ansgrid.setColumnData('answerValue', rowIndex,'true');
                        break;
                     } else{
                        this.ansgrid.setColumnData('answerValue', rowIndex, 'false');
                        break;
                     } 
                  }
               }
            }else{
               this.ansgrid.setColumnData('answerValue', rowIndex, 'false');
            }
         }

         if (this.questionType === 'INCLUSIVE') {
            if (event.data.ansBookMark) {
               if (this.assansGridData.length > 0) {
                  for (let i = 0; i < this.assansGridData.length; i++) {
                     this.count = 0;
                     if ((this.assansGridData[i].ansBookMark && event.data.ansBookMark)&& (this.assansGridData[i].assessmentCode !== event.data.assessmentCode) && this.assansGridData[i].ansBookMark === event.data.ansBookMark) {
                        this.count = this.count + 1;
                        this.assansGridData[i].answerValue = '' + this.count;
                        this.ansgrid.setColumnData('answerValue', rowIndex, '' + this.count);
                     } else {
                        this.assansGridData[i].answerValue = '' + this.count;
                        this.ansgrid.setColumnData('answerValue', rowIndex, '' + this.count);
                     }
                  }
               }
            } else {
               this.ansgrid.setColumnData('answerValue', rowIndex, '' + this.count);
            }
         }
      }
      if (event.field === 'activeFlag') {
         if (event.data.activeFlag) {
            this.ansgrid.setColumnData('expiryDate', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         } else if (!event.data.activeFlag) {
            this.ansgrid.setColumnData('expiryDate', rowIndex,
               DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            rowdata.validated = true;
            return rowdata;
         }
      }
      if (event.field === 'assessmentCode') {
         for (let i = 0; i < this.assansGridData.length; i++) {
            if (i !== rowIndex && event.data.assessmentCode === this.assansGridData[i].assessmentCode) {
               this.type = 'warn';
               this.message = this.translateService.translate('ocmnoque.duplicateAssesCode');
               this.show();
               return;
            }
         }
      }
      if (event.field === 'minValue' || event.field === 'maxValue') {
         if ((event.data.minValue !== undefined && event.data.maxValue !== undefined) && (event.data.minValue !== null && event.data.maxValue !== null)) {
            this.ansgrid.setColumnData('description', rowIndex, (event.data.minValue + '-' + event.data.maxValue));
            rowdata.validated = true;
            return rowdata;
         }
      }
      if(event.field === 'bookmarkCondition'){
         if(event.data.bookmarkCondition === 'BAR'){
            this.ansgrid.setColumnData('description', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         }
         if(!event.data.bookmarkCondition){
            this.ansgrid.setColumnData('ansBookMark', rowIndex, undefined);
            this.ansgrid.setColumnData('minValue', rowIndex, undefined);
            this.ansgrid.setColumnData('maxValue', rowIndex, undefined);
            this.ansgrid.setColumnData('description', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         }
         if(event.data.bookmarkCondition){
            this.ansgrid.setColumnData('minValue', rowIndex, undefined);
            this.ansgrid.setColumnData('maxValue', rowIndex, undefined);
            this.ansgrid.setColumnData('description', rowIndex, undefined);
            if (event.data.bookmarkCondition === 'BAR') {
               this.ansgrid.requiredOff('description');
            } else {
               this.ansgrid.requiredOn('description');
            }
   
            if (event.data.bookmarkCondition === 'BAR') {
               this.ansgrid.requiredOn('minValue');
            } else {
               this.ansgrid.requiredOff('minValue');
            }
            if (event.data.bookmarkCondition === 'BAR') {
               this.ansgrid.requiredOn('maxValue');
            } else {
               this.ansgrid.requiredOff('maxValue');
            }
            rowdata.validated = true;
            return rowdata;
         }



      }

      rowdata.validated = true;
      return rowdata;
   }

   validateResRowData = (event) => {
      const rowIndex = event.rowIndex;
      const rowdata = new ValidateRowReturn();
      if (event.field === 'activeFlag') {
         if (event.data.activeFlag) {
            this.resgrid.setColumnData('expiryDate', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
         } else if (!event.data.activeFlag) {
            this.resgrid.setColumnData('expiryDate', rowIndex,
               DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            rowdata.validated = true;
            return rowdata;
         }
      }

      rowdata.validated = true;
      return rowdata;
   }

   onAssessGridInsert = () => {
       this.asssectData = [];
       this.assqueGridData = [];
       this.assansGridData = [];
       this.assresData = [];
       this.assessModel = new Assessments();
      //  this.asssectExecuteQuery();
      //  this.assQueExecuteQuery();
      //  this.assAnsExecuteQuery();
      //  this.assresExecuteQuery();
       this.questionCode = undefined;
       this.answerCode = undefined;
       this.questionType = undefined;
      for (let i = 0; i < this.assessData.length; i++) {
         if (!this.assessData[i].assessmentCode || !this.assessData[i].assessmentCode.trim()) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.codemustbeentered');
            this.show();
            return;
         }
         if (!this.assessData[i].description || !this.assessData[i].description.trim()) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.descriptionmustbeentered');
            this.show();
            return;
         }
      }
      this.assesGridDeleteButton=false;
      return {
         effectiveDate: DateFormat.getDate(), determineSupLevelFlag: 'Y', requireApprovalFlag: 'Y',
         calculateTotalFlag: 'Y', activeFlag: 'Y'
      };
   }

   onSecGridInsert = () => {
      for (let i = 0; i < this.asssectData.length; i++) {
         if (!this.asssectData[i].assessmentCode || !this.asssectData[i].assessmentCode.trim()) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.sectionCodeMustbeentered');
            this.show();
            return;
         }
         if (!this.asssectData[i].description || !this.asssectData[i].description.trim()) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.enterSectionDescription');
            this.show();
            return;
         }
         if (!this.asssectData[i].listSeq && this.asssectData[i].listSeq !== 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.sequencemustbeentered');
            this.show();
            return;
         }
      }
      this.selectionGridDelete = false;
      return {
         activeFlag: 'Y'
      };
   }

   onQueGridInsert = () => {
      for (let i = 0; i < this.assqueGridData.length; i++) {
         if (!this.assqueGridData[i].assessmentCode || !this.assqueGridData[i].assessmentCode.trim()) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.questionCodeMustBeEntered');
            this.show();
            return;
         }
         if (!this.assqueGridData[i].description || !this.assqueGridData[i].description.trim()) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.questionWordingMustBeEntered');
            this.show();
            return;
         }
      }
      this.questionGridButton=false;
      return {
         activeFlag: 'Y'
      };
   }

   onAnsGridInsert = () => {
      for (let i = 0; i < this.assansGridData.length; i++) {
         if (!this.assansGridData[i].assessmentCode || !this.assansGridData[i].assessmentCode.trim()) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.answerCodeMustBeEntered');
            this.show();
            return;
         }
         if (!this.assansGridData[i].description || !this.assansGridData[i].description.trim()) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.answerWordingMustBeEntered');
            this.show();
            return;
         }
         if (!this.assansGridData[i].listSeq && this.assansGridData[i].listSeq !== 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.sequencemustbeentered');
            this.show();
            return;
         }
        
      }
      this.answerGridButton=false;
      return {
         activeFlag: 'Y'
      };
   }

   onResGridInsert = () => {
      for (let i = 0; i < this.assresData.length; i++) {
         if (!this.assresData[i].supervisionLevelType) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocmnoque.resultCodeMustBeEntered');
            this.show();
            return;
         }
      }

      return {
         activeFlag: 'Y'
      };
   }


   /**
     * updation of Details Block
     */
   onButtonSave() {
      this.assessUpdateList = [];
      this.assessCommitModel.updateList = [];
      this.assessCommitModel.insertList = [];
      this.assessCommitModel.deleteList = [];
      if (!this.assessModel.screenCode) {
         this.type = 'warn';
         this.message = this.translateService.translate('ocmnoque.enterScreenCode');
         this.show();
         return;
      }
      this.assessUpdateList.push(this.assessModel);
      for (let i = 0; i < this.assessUpdateList.length; i++) {
         this.assessUpdateList[i].activeFlag = this.assessUpdateList[i].activeFlag ? 'Y' : 'N';
         this.assessUpdateList[i].requiredFlag = this.assessUpdateList[i].requiredFlag ? 'Y' : 'N';
         this.assessUpdateList[i].cellSharingAlertFlag = this.assessUpdateList[i].cellSharingAlertFlag ? 'Y' : 'N';
         this.assessCommitModel.updateList = this.assessUpdateList;
      }
      const saveAssesData = this.ocmnoqueFactory.assessCommit(this.assessCommitModel);
      saveAssesData.subscribe(data => {
         if (data === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.saveDisabled = true;
            this.assesclearDisabled = true;
            return;
         } else {
            this.type = 'warn';
            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
            this.show();
            return;
         }
      });
   }

   onAssessmentsGridClear = () => {
      if (this.assessDataForClear && this.assessDataForClear.length > 0) {
         this.ocmnoqueexecuteQuery();
      } else {
         this.assessData = [];
      }
      return true;
   }

   onSectionsGridClear = () => {
      this.asssectExecuteQuery();
      return true;
   }

   onQuestionsGridClear = () => {
      this.assQueExecuteQuery();
      return true;
   }

   onAnswersGridClear = () => {
      this.count = 0;
      this.assAnsExecuteQuery();
      return true;
   }

   onResultsGridClear = () => {
      this.assresExecuteQuery();
      return true;
   }
   changeScreenCode(event) {
      if (event && event.code) {
         this.grid.setColumnData('hideValue', this.assessData.length - 1, true);
      }
   }

   screenBlur(){
      if(!this.assessModel.screenCode){
         this.assessModel.screenCode = this.assessModel.screenCode === '' ? undefined : '';;
      }

   }


   /**
  * This function is used to not to save when checkbox value has not changed
  */
   nonSavable = (data: any, index: number, field: string): boolean => {
      if (!this.assesGridSave) {
         return false;
      } else {
         return true;
      }
   }

   canAssesCodeEditBkMrkCon = (data: any, index: number, field: string): boolean => {
      if (data.bookmarkCondition) {
         return true;
      } else {
         return false;
      }
   }
}
