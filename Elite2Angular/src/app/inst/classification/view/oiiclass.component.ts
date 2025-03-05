import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiiclassService } from '../service/oiiclass.service';
import { OiiclassClassInquiry } from '@inst/classification/beans/OiiclassClassInquiry';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';
import { OffenderAssessments } from '../beans/OffenderAssessments';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from '@common/beans/Images';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';


@Component({
    selector: 'app-oiiclass',
    templateUrl: './oiiclass.component.html',
    styleUrls: []
})

export class OiiclassComponent implements OnInit {
    // Variable declaration
    // actionName : string;
    // lovModel : any[];
    msgs: any[] = [];
    // nameOfLovPage : string;
    // listToCompare : any[] = [];
    // sysprofData : SystemProfiles [] = [];
    // sysprofDataTemp : SystemProfiles[] = [];
    // // TODO angular.copy(this.sysprofData, thissysprofDataTemp);
    // sysprofModel : SystemProfiles = new SystemProfiles();
    // sysprofIndex : number = 0;
    // sysprofInsertList : SystemProfiles[] = [];
    // sysprofUpdatetList : SystemProfiles[] = [];
    // sysprofDeleteList : SystemProfiles[] = [];
    // livunitData : LivingUnits [] = [];
    // livunitDataTemp : LivingUnits[] = [];
    // // TODO angular.copy(this.livunitData, thislivunitDataTemp);
    // livunitModel : LivingUnits = new LivingUnits();
    // livunitIndex : number = 0;
    // livunitInsertList : LivingUnits[] = [];
    // livunitUpdatetList : LivingUnits[] = [];
    // livunitDeleteList : LivingUnits[] = [];
    oiiclassData: any[] = []; // OiiclassClassInquiry [] = [];
    // oiiclassDataTemp : OiiclassClassInquiry[] = [];
    // // TODO angular.copy(this.oiiclassData, thisoiiclassDataTemp);
    // oiiclassModel : OiiclassClassInquiry = new OiiclassClassInquiry();
    // oiiclassIndex : number = 0;
    // oiiclassInsertList : OiiclassClassInquiry[] = [];
    // oiiclassUpdatetList : OiiclassClassInquiry[] = [];
    // oiiclassDeleteList : OiiclassClassInquiry[] = [];
    // minDate : date;
    // display : boolean;
    // errorMessage : string;
    // headerMessage : string;
    // disabled : boolean;
    // editable : boolean = true;
    oiiclassColumnDef: any[] = [];
    // livUnitReadOnly : boolean = false;
    // oiiclassReadOnly : boolean = false;
    // cgfkSearchtypeRg : any[] = [];
    // cgfkAssessmenttypeRg : any[] = [];
    // cgfkAgylocidRg : any[] = [];
    // cgfkHousinglevel1Rg : any[] = [];
    // cgfkHousinglevel2Rg : any[] = [];
    // cgfkHousinglevel3Rg : any[] = [];
    dateFlag: boolean;
    levelOneCode: string;
    levelTwoCode: string;
    levelThreeCode: string;
    oiiclassProcedureModel: OiiclassClassInquiry = new OiiclassClassInquiry();
    assessTitle = { 'description': 'Assessment Type' };
    facilityTitle = { 'code': 'Agency Location', 'contactName': 'Description' };
    level1Title = { 'description': 'Housing Level 1' };
    level2Title = { 'description': 'Housing Level 2' };
    level3Title = { 'description': 'Housing Level 3' };
    searchTitle = { 'description': 'Search Type' };
    levelOneLink = 'None';
    levelTwoLink = 'None';
    LevelThreeLink = 'None';
    facilityLink = 'oiiclass/cgfkAgyLocIdRecordGroup';
    clearFlag = true;
    searchFlag: boolean = false;
    disableFlag: boolean = false;
    @ViewChild('oiiclassForm', { static: true }) form: any;
    showHousingLevels: boolean;
    communityEnable: any;
    offenderassessmentsModel: OffenderAssessments;
    vHeaderBlockModel: any;
    imageModel: Images = new Images();
    offenderId: any;
    assessmentsDisable: boolean;
    searchParam: OiiclassClassInquiry;

    constructor(private oiiclassFactory: OiiclassService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private osiosearchService: OsiosearService,
        public offenderSearchService: OffenderSearchService,
        private router: Router) {
    }

    ngOnInit() {
        this.assessmentsDisable = true;
        if (this.sessionManager.currentCaseLoadType === "COMM") {
            this.showHousingLevels = false;
            this.communityEnable = false;
        }
        else {
            this.showHousingLevels = true;
            this.communityEnable = true;
        }
        this.oiiclassProcedureModel = new OiiclassClassInquiry();

        if (this.oiiclassFactory.backButton) {
            this.searchParam = this.oiiclassFactory.searchParam;
            this.oiiclassProcedureModel.pSearchType = this.searchParam.pSearchType;
            this.oiiclassProcedureModel.pAssessmentId = this.searchParam.pAssessmentId;
            this.oiiclassProcedureModel.pFromDate = this.searchParam.pFromDate;
            this.oiiclassProcedureModel.pToDate = this.searchParam.pToDate;
            this.oiiclassProcedureModel.pAgyLocId = this.searchParam.pAgyLocId;
            if (this.sessionManager.currentCaseLoadType === 'INST') {
                this.levelOneCode = this.searchParam['levelOneCode'];
                this.levelTwoCode = this.searchParam['levelTwoCode'];
                this.levelThreeCode = this.searchParam['levelThreeCode'];
                this.oiiclassExecuteQuery();
            } else {
                this.oiiclassExecuteQuery();
            }
            this.oiiclassFactory.searchParam = {};
        }
        this.oiiclassColumnDef = [
            { fieldName: this.trMsg('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.trMsg('system-profile.book-id'), field: 'bookingNo', editable: false, width: 150 },
            { fieldName: this.trMsg('oiiclass.name'), field: 'offenderName', editable: false, width: 150 },
            { fieldName: this.trMsg('oiiclass.location'), field: 'location', editable: false, width: 150 },
            { fieldName: this.trMsg('oiiclass.currentlevel'), field: 'currentLevel', editable: false, width: 150 },
            { fieldName: this.trMsg('oiiclass.assessemnttype'), field: 'assessmentType', editable: false, width: 150 },
            { fieldName: this.trMsg('oiiclass.scheduleddate'), field: 'scheduleDate', datatype: 'date', editable: false, width: 150 },
            { fieldName: this.trMsg('oiiclass.primaryofficer'), field: 'primaryOfficer', editable: false, width: 150, hide: this.communityEnable },

        ];

        /* this.form.valueChanges.subscribe(data => {
             this.searchFlag = false;
             if (this.oiiclassData.length > 0) {
                 this.oiiclassData = [];

           }
              this.setClearFlag(data);
         });*/


        // TODO all initializations here
        //     var serviceObj;
        // const cgfkSearchtypeServiceObj = this.oiiclassFactory.
        //                     oiiclasscgfkSearchtypeRecordGroup();
        // cgfkSearchtypeServiceObj.subscribe(cgfkSearchtypeList=> {
        //         if (cgfkSearchtypelist.length === 0) {
        //              this.cgfkSearchtypeRg = [];
        //          } else {
        //         for (let i = 0; i < cgfkSearchtypelist.length; i++) {
        //         this.cgfkSearchtypeRg.push({ 'text':cgfkSearchtypelist[i].code + " - "+ 
        //                         cgfkSearchtypelist[i].description, 'id': cgfkSearchtypelist[i].code });
        //     }
        //     }
        // });
        // const cgfkAssessmenttypeServiceObj = this.oiiclassFactory.
        //                     oiiclasscgfkAssessmenttypeRecordGroup();
        // cgfkAssessmenttypeServiceObj.subscribe(cgfkAssessmenttypeList=> {
        //         if (cgfkAssessmenttypelist.length === 0) {
        //              this.cgfkAssessmenttypeRg = [];
        //          } else {
        //         for (let i = 0; i < cgfkAssessmenttypelist.length; i++) {
        //         this.cgfkAssessmenttypeRg.push({ 'text':cgfkAssessmenttypelist[i].code + " - "+ 
        //                         cgfkAssessmenttypelist[i].description, 'id': cgfkAssessmenttypelist[i].code });
        //     }
        //     }
        // });
        // const cgfkAgylocidServiceObj = this.oiiclassFactory.
        //                     oiiclasscgfkAgylocidRecordGroup();
        // cgfkAgylocidServiceObj.subscribe(cgfkAgylocidList=> {
        //         if (cgfkAgylocidlist.length === 0) {
        //              this.cgfkAgylocidRg = [];
        //          } else {
        //         for (let i = 0; i < cgfkAgylocidlist.length; i++) {
        //         this.cgfkAgylocidRg.push({ 'text':cgfkAgylocidlist[i].code + " - "+ 
        //                         cgfkAgylocidlist[i].description, 'id': cgfkAgylocidlist[i].code });
        //     }
        //     }
        // });
        // const cgfkHousinglevel1ServiceObj = this.oiiclassFactory.
        //                     oiiclasscgfkHousinglevel1RecordGroup();
        // cgfkHousinglevel1ServiceObj.subscribe(cgfkHousinglevel1List=> {
        //         if (cgfkHousinglevel1list.length === 0) {
        //              this.cgfkHousinglevel1Rg = [];
        //          } else {
        //         for (let i = 0; i < cgfkHousinglevel1list.length; i++) {
        //         this.cgfkHousinglevel1Rg.push({ 'text':cgfkHousinglevel1list[i].code + " - "+ 
        //                         cgfkHousinglevel1list[i].description, 'id': cgfkHousinglevel1list[i].code });
        //     }
        //     }
        // });
        // const cgfkHousinglevel2ServiceObj = this.oiiclassFactory.
        //                     oiiclasscgfkHousinglevel2RecordGroup();
        // cgfkHousinglevel2ServiceObj.subscribe(cgfkHousinglevel2List=> {
        //         if (cgfkHousinglevel2list.length === 0) {
        //              this.cgfkHousinglevel2Rg = [];
        //          } else {
        //         for (let i = 0; i < cgfkHousinglevel2list.length; i++) {
        //         this.cgfkHousinglevel2Rg.push({ 'text':cgfkHousinglevel2list[i].code + " - "+ 
        //                         cgfkHousinglevel2list[i].description, 'id': cgfkHousinglevel2list[i].code });
        //     }
        //     }
        // });
        // const cgfkHousinglevel3ServiceObj = this.oiiclassFactory.
        //                     oiiclasscgfkHousinglevel3RecordGroup();
        // cgfkHousinglevel3ServiceObj.subscribe(cgfkHousinglevel3List=> {
        //         if (cgfkHousinglevel3list.length === 0) {
        //              this.cgfkHousinglevel3Rg = [];
        //          } else {
        //         for (let i = 0; i < cgfkHousinglevel3list.length; i++) {
        //         this.cgfkHousinglevel3Rg.push({ 'text':cgfkHousinglevel3list[i].code + " - "+ 
        //                         cgfkHousinglevel3list[i].description, 'id': cgfkHousinglevel3list[i].code });
        //     }
        //     }
        // });
    }
    onFacilityChange() {
        if (this.oiiclassProcedureModel.pAgyLocId) {
            this.levelOneLink = 'oiiclass/cgfkHousingLevel1RecordGroup?agyLocId=' + this.oiiclassProcedureModel.pAgyLocId;
        } else {
            this.levelOneLink = null;
        }
    }
    onLevelOneChange() {
        if (this.oiiclassProcedureModel.pAgyLocId && this.levelOneCode) {
            this.levelTwoLink = 'oiiclass/cgfkHousingLevel2RecordGroup?agyLocId=' + this.oiiclassProcedureModel.pAgyLocId +
                '&livingUnitId=' + this.levelOneCode;
        } else {
            this.levelTwoLink = null;
        }
    }
    onLevelTwoChange() {
        if (this.oiiclassProcedureModel.pAgyLocId && this.levelOneCode && this.levelTwoCode) {
            this.LevelThreeLink = 'oiiclass/cgfkHousingLevel2RecordGroup?agyLocId=' + this.oiiclassProcedureModel.pAgyLocId +
                '&livingUnitId=' + this.levelTwoCode;
        } else {
            this.LevelThreeLink = null;
        }
    }
    onSearchTypeChange() {
        if (this.oiiclassProcedureModel.pSearchType) {
            if (this.oiiclassProcedureModel.pSearchType === 'OVERDUE' && this.sessionManager.currentCaseLoadType === 'INST') {
                this.oiiclassProcedureModel.pFromDate = undefined;
                this.oiiclassProcedureModel.pToDate = undefined;
                this.dateFlag = true;
                this.oiiclassFactory.backButton = false;
            } else {
                this.dateFlag = false;
                if (!this.oiiclassFactory.backButton) {
                    this.oiiclassProcedureModel.pFromDate = DateFormat.getDate();
                }
                this.oiiclassFactory.backButton = false;
            }
        } else {
            this.dateFlag = false;
            this.oiiclassFactory.backButton = false;
        }

    }
    onRowClickoiiclass(event) {
        if (event && event.offenderIdDisplay) {
            this.oiiclassProcedureModel.offenderIdDisplay = event.offenderIdDisplay;
            this.assessmentsDisable = false;
        }
        else {
            this.assessmentsDisable = true;
        }
    }
    ok() {
        if (!this.oiiclassProcedureModel.pSearchType) {
            this.show('oiiclass.selectTypeval');
            return;
        }

        if (this.oiiclassProcedureModel.pToDate && this.oiiclassProcedureModel.pFromDate &&
            DateFormat.compareDate(this.oiiclassProcedureModel.pToDate, this.oiiclassProcedureModel.pFromDate) <= 0) {
            this.show('oiiclass.todateval');
            return;
        }
        this.oiiclassExecuteQuery();
        //this.searchFlag = true;
    }
    no() {
    }

    dateBlur() {
        if (!this.oiiclassProcedureModel.pToDate) {
            this.oiiclassProcedureModel.pToDate = this.oiiclassProcedureModel.pToDate === null ? undefined : null
        }

        if (!this.oiiclassProcedureModel.pFromDate) {
            this.oiiclassProcedureModel.pFromDate = this.oiiclassProcedureModel.pFromDate === null ? undefined : null
        }
    }

    lovBlur() {
        if (!this.oiiclassProcedureModel.pSearchType) {
            this.oiiclassProcedureModel.pSearchType = this.oiiclassProcedureModel.pSearchType === undefined ? '' : undefined;
        }
        if (!this.oiiclassProcedureModel.pAgyLocId) {
            this.oiiclassProcedureModel.pAgyLocId = this.oiiclassProcedureModel.pAgyLocId === undefined ? '' : undefined;
        }
        if (!this.levelOneCode) {
            this.levelOneCode = this.levelOneCode === undefined ? '' : undefined;
        }
        if (!this.levelTwoCode) {
            this.levelTwoCode = this.levelTwoCode === undefined ? '' : undefined;
        }
        if (!this.levelThreeCode) {
            this.levelThreeCode = this.levelThreeCode === undefined ? '' : undefined;
        }
    }

    setClearFlag(results) {
        const validKeys = { keys: [], valid: true, inc: 0 };
        validKeys.keys = Object.keys(results);
        do {
            if (results[validKeys.keys[validKeys.inc]]) {
                this.clearFlag = false;
                validKeys.valid = false;
            } else {
                validKeys.inc++;
                this.clearFlag = true;
            }
        }
        while (validKeys.valid && validKeys.inc < validKeys.keys.length);
    }

    cancel() {
        this.oiiclassProcedureModel.pSearchType = this.oiiclassProcedureModel.pSearchType === undefined ? '' : undefined;
        this.oiiclassProcedureModel.pAgyLocId = this.oiiclassProcedureModel.pAgyLocId === undefined ? '' : undefined;
        this.levelOneCode = this.levelOneCode === undefined ? '' : undefined;
        this.levelTwoCode = this.levelTwoCode === undefined ? '' : undefined;
        this.levelThreeCode = this.levelThreeCode === undefined ? '' : undefined;
        this.oiiclassProcedureModel = new OiiclassClassInquiry();
        this.oiiclassData = [];
        this.disableFlag = false;
        this.searchFlag = false;
        this.assessmentsDisable = true;


    }
    onOffenderChange(offender) {
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    sysprofExecuteQuery() {
        //      const sysprofResult = oiiclassFactory.
        // sysprofExecuteQuery(this.sysprofModel);
        //          sysprofResult.subscribe(data => {
        //         if (sysprofResultList.length === 0) {
        //             this.sysprofData = [];
        //         } else {
        //             this.sysprofData =sysprofResultList;
        //             this.sysprofModel = sysprofResultList[0];
        //         }
        //     });
    }
    livunitExecuteQuery() {
        //      const livunitResult = oiiclassFactory.
        // livunitExecuteQuery(this.livunitModel);
        //          livunitResult.subscribe(data => {
        //         if (livunitResultList.length === 0) {
        //             this.livunitData = [];
        //         } else {
        //             this.livunitData =livunitResultList;
        //             this.livunitModel = livunitResultList[0];
        //         }
        //     });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oiiclassSavelivunitForm(event) {
        // TODO declare commit bean and add insert list to that object.
        // this.livunitinsertList = event.added
        // this.livunitupdateList = event.updated
        // this.livunitdeleteList = event.removed
        // this.livunitCommitModel.insertList = [];
        // this.livunitCommitModel.updateList = [];
        // this.livunitCommitModel.deleteList = [];
        // if ( this.livunitInsertList.length > 0 || this.livunitalertUpdateList.length > 0 ) {
        //      for ( let i = 0; i < this.livunitInsertList.length; i++ ) {
        //     if(this.livunitModel.nbtDueForReason != undefined || 
        //         this.livunitModel.nbtDueForReason!= null){
        //         return;
        //     }
        //     }
        //      for ( let i = 0; i < this.livunitUpdateList.length; i++ ) {
        //      }
        // this.livunitCommitModel.insertList =this.livunitInsertList;
        // this.livunitCommitModel.updateList =this.livunitUpdateList;
        // }
        // if ( this.livunitDeleteList.length > 0 ) {
        //      for ( let i = 0; i < this.livunitDeleteList.length; i++ ) {
        //      }
        // this.livunitCommitModel.deleteList =this.livunitDeleteList;
        // }
        // const livunitSaveData = this.oiiclassFactory.livunitCommit( this.livunitCommitModel );
        // livunitSaveData.subscribe( data => {
        //  if ( data === 1 ) {
        //     this.type = 'info';
        //     this.message = 'Add/ Update/ Remove record sucess';
        //     this.show();
        // }else{
        //     this.type = 'warn';
        //     this.message = 'Add/ Update/ Remove record Failed';
        //     this.show(); 
        // }
        //     }); 
    }
    oiiclassExecuteQuery() {
        this.oiiclassProcedureModel.pCaseload = this.sessionManager.currentCaseLoad;
        this.oiiclassProcedureModel.caseloadType = this.sessionManager['userSession'].caseLoadType;

        if (this.oiiclassProcedureModel.pAgyLocId && this.levelOneCode) {
            this.oiiclassProcedureModel.pLocation = this.oiiclassProcedureModel.pAgyLocId;
            if (this.levelOneCode) {
                this.oiiclassProcedureModel.pLocation = this.oiiclassProcedureModel.pLocation + '-' + this.levelOneCode;
                if (this.levelTwoCode) {
                    this.oiiclassProcedureModel.pLocation = this.oiiclassProcedureModel.pLocation + '-' + this.levelTwoCode;
                    if (this.levelThreeCode) {
                        this.oiiclassProcedureModel.pLocation = this.oiiclassProcedureModel.pLocation + '-' + this.levelThreeCode;
                    }
                }
            }
        }
        this.oiiclassProcedureModel.pAgyLocId === "" ? undefined : this.oiiclassProcedureModel.pAgyLocId;
        const oiiclassResult = this.oiiclassFactory.
            oiiclassExecuteQuery(this.oiiclassProcedureModel);
        oiiclassResult.subscribe(oiiclassResultList => {
            if (oiiclassResultList.length === 0) {
                this.assessmentsDisable = true;
                this.oiiclassData = [];
                this.show('common.querycaused');
                this.disableFlag = false;
                this.searchFlag = false
            } else {
                this.oiiclassData = oiiclassResultList;
                this.disableFlag = true;
                this.searchFlag = true
                this.assessmentsDisable = false;

            }
        });
    }

    clearDisableFun() {
        if (this.oiiclassProcedureModel.pSearchType ||
            this.oiiclassProcedureModel.pAssessmentId ||
            this.oiiclassProcedureModel.pToDate ||
            this.oiiclassProcedureModel.pFromDate ||
            this.oiiclassProcedureModel.pAgyLocId) {
            return false;
        }
        return true;
    }

    onAssbutLaunchClick = () => {
        let vHead = new VHeaderBlock();
        vHead.offenderIdDisplay = this.oiiclassProcedureModel.offenderIdDisplay;
        vHead.offenderBookId = this.oiiclassProcedureModel.offenderBookID;
        vHead.agyLocId = this.sessionManager.currentCaseLoad;
        const offbkGlobal = this.osiosearchService.offbkgGlobalQuery(vHead);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                this.vHeaderBlockModel = list[0];
                if (list[0].imageId != null) {
                    this.imageModel.imageId = list[0].imageId;
                    this.osiosearchService.imageExecuteQuery(this.imageModel).subscribe(imageData => {
                        this.vHeaderBlockModel.image = 'data:image/JPEG;base64,' + imageData[0].imageThumbnail;
                    });
                }
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                this.oiiclassFactory.backButton = true;
                this.oiiclassFactory.searchParam = {};
                this.oiiclassFactory.searchParam['pSearchType'] = this.oiiclassProcedureModel.pSearchType;
                this.oiiclassFactory.searchParam['levelOneCode'] = this.levelOneCode;
                this.oiiclassFactory.searchParam['levelTwoCode'] = this.levelTwoCode;
                this.oiiclassFactory.searchParam['levelThreeCode'] = this.levelThreeCode;
                this.oiiclassFactory.searchParam['pAssessmentId'] = this.oiiclassProcedureModel.pAssessmentId;
                this.oiiclassFactory.searchParam['pFromDate'] = this.oiiclassProcedureModel.pFromDate;
                this.oiiclassFactory.searchParam['pToDate'] = this.oiiclassProcedureModel.pToDate;
                this.oiiclassFactory.searchParam['pAgyLocId'] = this.oiiclassProcedureModel.pAgyLocId;
                this.router.navigate(['/OCDNOQUE']);
            }
        });

    }
    //     butSearchWhenButtonPressedTrigger() {
    //          //TODO  this.searchResult();
    //     }

    //     butPrintWhenButtonPressedTrigger() {
    //          //--Commented by Nirmal for #469 on 01-Jul-2010, print button having null canvas;
    // /*Declare
    // l_session_id                              CLASSIFICATION_INQUIRY_TMP.SESSION_ID%TYPE;    
    // l_search_type                              VARCHAR2(100);
    // l_assessment_id             assessments.assessment_id%TYPE;
    // l_from_date                 DATE;
    // l_to_date                   DATE;
    // l_agy_loc_id               living_units.agy_loc_id%TYPE;
    // l_living_unit_1            AGENCY_LOCATIONS.HOUSING_LEV_1_CODE%TYPE;
    // l_living_unit_2            AGENCY_LOCATIONS.HOUSING_LEV_2_CODE%TYPE;
    // l_living_unit_3            AGENCY_LOCATIONS.HOUSING_LEV_3_CODE%TYPE;
    // l_location                                  CLASSIFICATION_INQUIRY_TMP.LOCATION%TYPE;
    // l_off_id_dis                       CLASSIFICATION_INQUIRY_TMP.offender_id_display%type;
    // l_off_name                             CLASSIFICATION_INQUIRY_TMP.offender_name%type;
    // l_cur_level                              CLASSIFICATION_INQUIRY_TMP.current_level%type ;


    // Begin

    // --search_result;


    //     l_session_id := :SYS_PROF.NBT_SESSION_ID;

    //     l_search_type := :liv_unit.NBT_DUE_FOR_REASON;

    //     IF :liv_unit.NBT_ASSESSMENT_TYPE IS NOT NULL THEN 
    //            l_assessment_id := :liv_unit.NBT_ASSESSMENT_ID;
    //     ELSE
    //          l_assessment_id := '';
    //     END IF;

    //     IF :liv_unit.NBT_DT_FROM IS NOT NULL THEN 
    //        l_from_date := :liv_unit.NBT_DT_FROM;
    //     ELSE
    //          l_from_date := '';
    //     END IF;

    //         IF :liv_unit.NBT_DT_TO IS NOT NULL THEN 
    //        l_to_date := :liv_unit.NBT_DT_TO;
    //     ELSE
    //          l_to_date := '';
    //     END IF;

    //     IF :liv_unit.AGY_LOC_ID IS NOT NULL THEN
    //         l_agy_loc_id := :liv_unit.AGY_LOC_ID;
    //       IF    :liv_unit.NBT_LEVEL_1_CODE IS NOT NULL THEN
    //           l_living_unit_1 := :liv_unit.NBT_LEVEL_1_CODE;
    //             IF :liv_unit.NBT_LEVEL_2_CODE IS NOT NULL THEN
    //                 l_living_unit_2 := :liv_unit.NBT_LEVEL_2_CODE;
    //                 IF :liv_unit.NBT_LEVEL_3_CODE IS NOT NULL THEN
    //                       l_living_unit_3 := :liv_unit.NBT_LEVEL_3_CODE;
    //                         l_location := l_agy_loc_id||'-'||l_living_unit_1||'-'||l_living_unit_2||'-'||l_living_unit_3;
    //           ELSE
    //                 l_location := l_agy_loc_id||'-'||l_living_unit_1||'-'||l_living_unit_2;
    //           END IF;
    //             ELSE 
    //                       l_location := l_agy_loc_id||'-'||l_living_unit_1;
    //             END IF;
    //         ELSE  l_location := l_agy_loc_id;
    //         END IF;
    //         ELSE l_location := '';
    //         END IF;

    //        l_off_id_dis := :global.off_id_dis ;
    //        l_off_name := :global.off_name;
    //        l_cur_level := :global.cur_level ;


    //     print_list(l_session_id,
    //                          l_search_type,
    //                          l_assessment_id,
    //                          l_from_date,
    //                          l_to_date,
    //                          l_location,
    //                          l_agy_loc_id,
    //                          l_off_id_dis,
    //                          l_off_name,
    //                          l_cur_level);
    // End; */
    //         ;
    //     }

    //     nbtDueForReasonPostChangeTrigger() {
    //           //TODO lvdate     date     = to_date(to_char(sysdate,'mm/dd/yyyy'),'mm/dd/yyyy');
    //           //TODO 
    //           //TODO 
    //           //TODO 
    //          //TODO  this.cg$defaultAgy();
    //           //TODO 
    //         if (nameIn('livUnitModel.nbtDueForReason')==='overdue' ){
    //           //TODO set_item_property('liv_unit.nbt_dt_from', enabled, property_false);
    //           //TODO set_item_property('liv_unit.nbt_dt_to', enabled, property_false);
    //         if (livUnitModel.nbtDtFrom !== null ){
    //           //TODO liv_unit.nbt_dt_from = '';
    //         }
    //         if (livUnitModel.nbtDtTo !== null ){
    //           //TODO liv_unit.nbt_dt_to = '';
    //         }
    //           //TODO 
    //         } else {
    //           //TODO set_item_property('liv_unit.nbt_dt_from', enabled, property_true);
    //           //TODO set_item_property('liv_unit.nbt_dt_to', enabled, property_true);
    //           //TODO set_item_property('liv_unit.nbt_dt_from', navigable, property_true);
    //           //TODO set_item_property('liv_unit.nbt_dt_to', navigable, property_true);
    //           //TODO liv_unit.nbt_dt_from = lvdate;
    //          //--:liv_unit.nbt_dt_to := lvDate;
    //         }
    //           //TODO 
    //     }

    //     butSaerchTypeWhenButtonPressedTrigger() {
    //           //TODO go_item('liv_unit.nbt_due_for_reason');
    //           //TODO do_key('list_values');
    //     }

    //     butAssTypeWhenButtonPressedTrigger() {
    //           //TODO go_item('liv_unit.nbt_assessment_type');
    //           //TODO do_key('list_values');
    //     }

    //     nbtDtFromPostChangeTrigger() {
    //           //TODO lvdate     date = to_date(to_char(to_date(name_in('liv_unit.nbt_dt_from')),'mm/dd/yyyy'),'mm/dd/yyyy');
    //           //TODO liv_unit.nbt_dt_from = lvdate;
    //           //TODO 
    //         if (livUnitModel.nbtDtTo !== null &&  livUnitModel.nbtDtFrom !== null ){
    //         if (livUnitModel.nbtDtFrom > livUnitModel.nbtDtTo ){
    //           //TODO message('fromdate must be less than todate.');
    //            throw new Error('form_trigger_failure');
    //         }
    //         }
    //           //TODO 
    //     }

    //     nbtDtFromKeyListvalTrigger() {
    //          //TODO  this.displayCalendar();
    //     }

    //     nbtDtToPostChangeTrigger() {
    //          //--lvDate     DATE := TO_DATE(TO_CHAR(TO_DATE(NAME_IN('LIV_UNIT.NBT_DT_TO')),'MM/DD/YYYY'),'MM/DD/YYYY');
    //           //TODO lvdate        date;
    //          const lTest;
    //          //--Jason 30-08-2007 for track # 4137
    //           //TODO l_test =     to_char(to_date(name_in('liv_unit.nbt_dt_to')),'mm/dd/yyyy');
    //           //TODO 
    //         if (substr(lTest,7,2)==='00' ){
    //           //TODO l_test = substr(l_test,1,6)||'20'||substr(l_test,9,2);
    //         }
    //           //TODO 
    //           //TODO lvdate = to_date(l_test,'mm/dd/yyyy');
    //           //TODO 
    //           //TODO liv_unit.nbt_dt_to = lvdate;
    //           //TODO 
    //         if (livUnitModel.nbtDtTo !== null &&  livUnitModel.nbtDtFrom !== null ){
    //         if (livUnitModel.nbtDtTo < livUnitModel.nbtDtFrom ){
    //           //TODO message('todate must be greater than fromdate.');
    //            throw new Error('form_trigger_failure');
    //         }
    //         }
    //           //TODO 
    //     }

    //     nbtDtToKeyListvalTrigger() {
    //          //TODO  this.displayCalendar();
    //     }

    //     agyLocIdPostChangeTrigger() {
    //         if (livUnitModel.agyLocId !== null ){
    //           //TODO copy('', 'liv_unit.nbt_level_1_code');
    //           //TODO copy('', 'liv_unit.nbt_level_2_code');
    //           //TODO copy('', 'liv_unit.nbt_level_3_code');
    //           //TODO 
    //         }
    //     }

    //     butAgyLocWhenButtonPressedTrigger() {
    //           //TODO go_item('liv_unit.agy_loc_id');
    //           //TODO do_key('list_values');
    //     }

    //     nbtLevel1CodePostChangeTrigger() {
    //         if (livUnitModel.nbtLevel1Code !== null ){
    //           //TODO copy('', 'liv_unit.nbt_level_2_code');
    //           //TODO copy('', 'liv_unit.nbt_level_3_code');
    //         }
    //     }

    //     butHl1WhenButtonPressedTrigger() {
    //           //TODO go_item('liv_unit.nbt_level_1_code');
    //           //TODO do_key('list_values');
    //     }

    //     nbtLevel2CodePostChangeTrigger() {
    //         if (livUnitModel.nbtLevel2Code !== null ){
    //           //TODO copy('', 'liv_unit.nbt_level_3_code');
    //         }
    //     }

    //     butHl2WhenButtonPressedTrigger() {
    //           //TODO go_item('liv_unit.nbt_level_2_code');
    //           //TODO do_key('list_values');
    //     }

    //     butHl3WhenButtonPressedTrigger() {
    //           //TODO go_item('liv_unit.nbt_level_3_code');
    //           //TODO do_key('list_values');
    //     }

    //     livUnitOnErrorTrigger() {
    // /* CGTE$BLK_LEVEL_ERROR_TRAP */
    // /* Trap errors returning from the server and report in a user */
    // /*   friendly manner                                          */
    //          const errCode = errorCode;
    //          const errType = errorType;
    //          const serverErr = abs(dbmsErrorCode);
    //          const serverMsg = dbmsErrorText;
    //          const constraintName;
    //         if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510) ) ){
    //           //TODO 
    // /* Remove recursive errors from the top of the stack */
    //         while (server_err = 604) {
    //           //TODO cgte$pop_error_stack(server_err, server_msg);
    //         }
    //           //TODO 
    // /* Check and report the generic constraint violations */
    //         if (( cgte$checkConstraintVio(serverErr, serverMsg) ) ){
    //            throw new Error('form_trigger_failure');
    //         }
    //           //TODO 
    // /* Check and report the constraint violations specific to this
    //          block */
    //           //TODO constraint_name = cgte$strip_constraint(server_msg);
    //           //TODO 
    // /* FK - Parent key not found */
    //         if ((serverErr===2291) ){
    //         if ((constraintName==='crtMvTmpLivUnitF1') ){
    //           //TODO message('error this from housing location does not exist');
    //         } else {
    //           //TODO message(server_msg);
    //         }
    //            throw new Error('form_trigger_failure');
    //         }
    //           //TODO 
    // /* FK - Child record found */
    //         if ((serverErr===2292) ){
    //         if ((errCode===40510) ){
    //           //TODO message(server_msg);
    //         } else if ( (errCode===40509) ){
    //           //TODO message(server_msg);
    //            throw new Error('form_trigger_failure');
    //         }
    //         }
    //           //TODO 
    // /* If error not found, issue default message */
    //         if ((errType==='frm' &&  errCode in (10205,41810,40501,40212))  ){
    //         ;
    //         } else {
    //           //TODO message(err_type||'-'||to_char(err_code)||' '||error_text,no_acknowledge);
    //            throw new Error('form_trigger_failure');
    //         }
    //     }

    //     livUnitWhenNewBlockInstanceTrigger() {
    //          const vCurItem = :system.cursorItem;
    //           //TODO go_block('oiiclass'); //added by nirmal for #469
    //          //TODO  this.clearBlock();
    //           //TODO go_item(    v_cur_item );
    //           //TODO 
    //     }

    //     scheduleDateKeyListvalTrigger() {
    //          //TODO  this.displayCalendar();
    //     }

    //     oiiclassPostQueryTrigger() {
    //          const lvIdFlag;
    //          //TODO  this.lvDays            number();
    //           //TODO 
    //           //TODO lv_id_flag = get_profile_value('client', 'id_display');
    //           //TODO 
    //         if (lvIdFlag==='y' ){
    //           //TODO 
    //           //TODO 
    //           //TODO copy(upper(lpad(ltrim(name_in('oiiclass.offender_id_display'),'0'),10,'0')),'oiiclass.nbt_offender_id_display');
    //           //TODO 
    //           //TODO 
    //         }
    //           //TODO 
    //     }

    //     oiiclassKeyEntqryTrigger() {
    //          //TODO  this.enterQuery();
    //     }

    //     oiiclassPreQueryTrigger() {
    //          //--commented by Nirmal for #469 on 01-Jul-2010
    // /*:class_in_tmp.nbt_offender_id_display := UPPER(LPAD(LTRIM(NAME_IN('class_in_tmp.offender_id_display'),'0'),10,'0'));

    // IF :CLASS_IN_TMP.OFFENDER_ID_DISPLAY IS NOT NULL THEN
    //     :GLOBAL.OFF_ID_DIS := :CLASS_IN_TMP.OFFENDER_ID_DISPLAY;
    // ELSE 
    //         :GLOBAL.OFF_ID_DIS := '';
    // END IF;
    // IF :CLASS_IN_TMP.OFFENDER_NAME IS NOT NULL THEN
    //   :GLOBAL.OFF_NAME := :CLASS_IN_TMP.OFFENDER_NAME;
    // ELSE
    //     :GLOBAL.OFF_NAME := '';
    // END IF;
    // IF   :CLASS_IN_TMP.CURRENT_LEVEL IS NOT NULL THEN
    //     :GLOBAL.CUR_LEVEL := :CLASS_IN_TMP.CURRENT_LEVEL;
    // ELSE
    //     :GLOBAL.CUR_LEVEL := '';
    // END IF; */
    //          //--added by nirmal for #469 on 01-Jul-2010
    //           //TODO oiiclass.offender_id_display = upper(lpad(ltrim(name_in('oiiclass.offender_id_display'),'0'),10,'0'));
    //           //TODO 
    //         if (oiiclassModel.offenderIdDisplay !== null ){
    //           //TODO global.off_id_dis = oiiclass.offender_id_display;
    //         } else {
    //           //TODO global.off_id_dis = '';
    //         }
    //         if (oiiclassModel.offenderName !== null ){
    //           //TODO global.off_name = oiiclass.offender_name;
    //         } else {
    //           //TODO global.off_name = '';
    //         }
    //         if (  oiiclassModel.currentLevel !== null ){
    //           //TODO global.cur_level = oiiclass.current_level;
    //         } else {
    //           //TODO global.cur_level = '';
    //         }
    //     }

    //     butOffendersWhenButtonPressedTrigger() {
    //           //TODO 
    //     }

    //     butOffendersKeyNextItemTrigger() {
    //           //TODO 
    //     }

    //     butOffendersKeyPrevItemTrigger() {
    //           //TODO 
    //     }

    //     butWorksWhenButtonPressedTrigger() {
    //           //TODO 
    //     }

    //     butWorksKeyNextItemTrigger() {
    //           //TODO 
    //     }

    //     butWorksKeyPrevItemTrigger() {
    //           //TODO 
    //     }

    //     butCalendarWhenButtonPressedTrigger() {
    //           //TODO 
    //     }

    //     butCalendarKeyNextItemTrigger() {
    //           //TODO 
    //     }

    //     butCalendarKeyPrevItemTrigger() {
    //           //TODO 
    //     }

    //     butOffUpdatesWhenButtonPressedTrigger() {
    //           //TODO 
    //     }

    //     butOffUpdatesKeyNextItemTrigger() {
    //           //TODO 
    //     }

    //     butOffUpdatesKeyPrevItemTrigger() {
    //           //TODO 
    //     }

    //     butDetailWhenButtonPressedTrigger() {
    //           //TODO 
    //     }

    //     butDetailKeyNextItemTrigger() {
    //           //TODO 
    //     }

    //     butDetailKeyPrevItemTrigger() {
    //           //TODO 
    //     }

    //     mymenuOnErrorTrigger() {
    //           //TODO 
    //     }

    //     oiiclassKeyClrblkTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO applib_kill_create_h.key_clrblk;    // application hook
    //           //TODO 
    //          //TODO  this.clearBlock();
    //           //TODO 
    //         if (systemModel.triggerBlock==='livUnit' ){
    //          //TODO  this.clearBlock();
    //           //TODO go_block('oiiclass'); //added by nirmal for #469
    //          //TODO  this.clearBlock();
    //           //TODO go_block('liv_unit');
    //         }
    //     }

    //     oiiclassKeyClrfrmTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_kill_create_h.key_clrfrm;    // application hook
    //           //TODO 
    //          //TODO  this.clearForm();
    //     }

    //     oiiclassKeyClrrecTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_kill_create_h.key_clrrec;    // application hook
    //           //TODO 
    //          //TODO  this.clearRecord();
    //           //TODO 
    //         if (systemModel.triggerBlock==='livUnit' ){
    //          //TODO  this.clearRecord();
    //           //TODO go_block('oiiclass'); //added by nirmal #469 on 01-jul-2010
    //          //TODO  this.clearBlock();
    //           //TODO go_block('liv_unit');
    //         }
    //     }

    //     oiiclassKeyCrerecTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_kill_create_h.key_crerec;    // application hook
    //           //TODO 
    //          //TODO  this.createRecord();
    //     }

    //     oiiclassKeyDuprecTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_kill_create_h.key_duprec;    // application hook
    //           //TODO 
    //          //TODO  this.duplicateRecord();
    //     }

    //     oiiclassKeyDupItemTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_kill_create_h.key_dup_item;    // application hook
    //           //TODO 
    //          //TODO  this.duplicateItem();
    //     }

    //     oiiclassWhenClearBlockTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_kill_create_h.when_clear_block;    // application hook
    //     }

    //     oiiclassWhenCreateRecordTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_kill_create_h.when_create_record;    // application hook
    //     }

    //     oiiclassWhenRemoveRecordTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_kill_create_h.when_remove_record;    // application hook
    //     }

    //     oiiclassKeyEditTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.key_edit;    // application hook
    //           //TODO 
    //          //TODO  this.editTextitem();
    //     }

    //     oiiclassKeyListvalTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.key_listval;    // application hook
    //           //TODO 
    //          //TODO  this.listValues();
    //           //TODO 
    //           //TODO next_item ;
    //     }

    //     oiiclassPostChangeTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.post_change;    // application hook
    //     }

    //     oiiclassWhenButtonPressedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.when_button_pressed;    // application hook
    //     }

    //     oiiclassWhenCheckboxChangedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.when_checkbox_changed;    // application hook
    //     }

    //     oiiclassWhenCustomItemEventTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.w_custom_item_event;    // application hook
    //     }

    //     oiiclassWhenImageActivatedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.when_image_activated;    // application hook
    //     }

    //     oiiclassWhenImagePressedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.when_image_pressed;    // application hook
    //     }

    //     oiiclassWhenListActivatedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.when_list_activated;    // application hook
    //     }

    //     oiiclassWhenListChangedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.when_list_changed;    // application hook
    //     }

    //     oiiclassWhenRadioChangedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_item_h.when_radio_changed;    // application hook
    //     }

    //     oiiclassWhenMouseClickTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_mouse_h.when_mouse_click;    // application hook
    //     }

    //     oiiclassWhenMouseDoubleclickTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_mouse_h.when_mouse_doub_click;    // application hook
    //           //TODO 
    //         if (systemModel.triggerItem in ('toolbarModel.up', 'toolbarModel.down') ){
    //         if (globalModel.mouseAc==='up' ){
    //           //TODO first_record ;
    //         } else {
    //           //TODO last_record ;
    //         }
    //         }
    //     }

    //     oiiclassWhenMouseEnterTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_mouse_h.when_mouse_enter;    // application hook
    //     }

    //     oiiclassWhenMouseLeaveTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_mouse_h.when_mouse_leave;    // application hook
    //     }

    //     oiiclassKeyDownTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.key_down;    // application hook
    //           //TODO 
    //          //TODO  this.down();
    //     }

    //     oiiclassKeyExitTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.key_exit;    // application hook
    //           //TODO 
    //           //TODO 
    //           //TODO 
    //          //TODO  this.exitForm();
    //     }

    //     oiiclassKeyNxtblkTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.key_nxtblk;    // application hook
    //           //TODO 
    //          //TODO  this.nextBlock();
    //     }

    //     oiiclassKeyNxtkeyTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.key_nxtkey;    // application hook
    //           //TODO 
    //          //TODO  this.nextKey();
    //     }

    //     oiiclassKeyNxtrecTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO copy ('dn', 'global.mouse_ac') ;
    //           //TODO 
    //           //TODO applib_navigate_h.key_nxtrec;    // application hook
    //           //TODO 
    //          //TODO  this.nextRecord();
    //     }

    //     oiiclassKeyNxtsetTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.key_nxtset;    // application hook
    //           //TODO 
    //          //TODO  this.nextSet();
    //     }

    //     oiiclassKeyNextItemTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.key_next_item;    // application hook
    //           //TODO 
    //          //TODO  this.nextItem();
    //     }

    //     oiiclassKeyPrvblkTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.key_prvblk;    // application hook
    //           //TODO 
    //          //TODO  this.previousBlock();
    //     }

    //     oiiclassKeyPrvrecTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO copy ('up', 'global.mouse_ac') ;
    //           //TODO 
    //           //TODO applib_navigate_h.key_prvrec;    // application hook
    //           //TODO 
    //          //TODO  this.previousRecord();
    //     }

    //     oiiclassKeyPrevItemTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.key_prev_item;    // application hook
    //           //TODO 
    //          //TODO  this.previousItem();
    //     }

    //     oiiclassKeyScrdownTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO copy ('dn', 'global.mouse_ac') ;
    //           //TODO 
    //           //TODO applib_navigate_h.key_scrdown;    // application hook
    //           //TODO 
    //          //TODO  this.scrollDown();
    //     }

    //     oiiclassKeyScrupTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO copy ('up', 'global.mouse_ac') ;
    //           //TODO 
    //           //TODO applib_navigate_h.key_scrup;    // application hook
    //           //TODO 
    //          //TODO  this.scrollUp();
    //     }

    //     oiiclassKeyUpTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.key_scrup;    // application hook
    //           //TODO 
    //          //TODO  this.up();
    //     }

    //     oiiclassPostBlockTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.post_block;    // application hook
    //     }

    //     oiiclassPostFormTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.post_form;    // application hook
    //     }

    //     oiiclassPostRecordTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.post_record;    // application hook
    //     }

    //     oiiclassPostTextItemTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.post_text_item;    // application hook
    //     }

    //     oiiclassPreBlockTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.pre_block;    // application hook
    //     }

    //     oiiclassPreFormTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.pre_form;    // application hook
    //           //TODO 
    //         ;
    //           //TODO 
    //         ;
    //           //TODO 
    //          //TODO  this.lblOffId                                            systemProfiles.profileValue%type();
    //           //TODO doc_lbl_item      item          = find_item ('sys_prof.nbt_profile_value');
    //          //--off_id_item                 item                    := find_item('CLASS_IN_TMP.OFFENDER_ID_DISPLAY'); --Commented by nirmal for #469
    //           //TODO off_id_item                 item                    = find_item('oiiclass.offender_id_display'); //added by nirmal
    //           //TODO 
    //          //TODO  this.lblBookNo                                            systemProfiles.profileValue%type();
    //           //TODO doc_lbl_item1     item          = find_item ('sys_prof.nbt_profile_value1');
    //          //--book_no_item        item                      := find_item('CLASS_IN_TMP.BOOKING_NO'); --Commented by nirmal for #469
    //           //TODO book_no_item        item                      = find_item('oiiclass.booking_no'); //added by nirmal
    //           //TODO 
    //           //TODO 
    //           //TODO 
    //           //TODO get_off_id_label(lbl_off_id);
    //           //TODO set_item_property('oiiclass.nbt_offender_id_display',prompt_text,lbl_off_id);
    //           //TODO 
    //           //TODO 
    // /*
    //     COPY (lbl_off_id, 'SYS_PROF.NBT_PROFILE_VALUE');    
    //     set_item_property (doc_lbl_item, height, .15);
    //   set_item_property (doc_lbl_item, position, get_item_property (off_id_item, x_pos), (TO_NUMBER (get_item_property (off_id_item, y_pos)) - .15));
    // */
    //           //TODO 
    //          //--set_item_property('CLASS_IN_TMP.BOOKING_NO',prompt_text,GET_PROFILE_VALUE('LABEL','BOOK_ID')); --Commented by nirmal for #469
    //           //TODO set_item_property('oiiclass.booking_no',prompt_text,get_profile_value('label','book_id'));  //added by nirmal form for #469
    //          //-- Jason 30-08-2007 add for Track # 4137 fix.
    //           //TODO set_item_property('liv_unit.agy_loc_id', prompt_text, get_profile_value('label','inst_agency'));
    //           //TODO 
    // /*
    //     lbl_book_no := GET_PROFILE_VALUE('LABEL','BOOK_ID');
    //     COPY (lbl_book_no, 'SYS_PROF.NBT_PROFILE_VALUE1');    
    //     set_item_property (doc_lbl_item1, height, .15);
    //   set_item_property (doc_lbl_item1, position, get_item_property (book_no_item, x_pos), (TO_NUMBER (get_item_property (book_no_item, y_pos)) - .15));
    // */
    //           //TODO 
    //     }

    //     oiiclassPreRecordTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.pre_record;    // application hook
    //     }

    //     oiiclassPreTextItemTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.pre_text_item;    // application hook
    //     }

    //     oiiclassWhenNewRecordInstanceTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.when_new_rec_instance;    // application hook
    //     }

    //     oiiclassWhenNewFormInstanceTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //          //TODO  this.createFormGlobals();
    //           //TODO 
    //          //TODO  this.createLibraryGlobals();
    //           //TODO 
    //          //TODO  this.createApplibGlobals();
    //           //TODO 
    //           //TODO applib_navigate_h.w_new_form_instance;    // application hook
    //           //TODO 
    //           //TODO copy ('up', 'global.mouse_ac') ;
    //           //TODO copy (null,  'global.off_id_dis');
    //           //TODO copy (null,  'global.off_name');
    //           //TODO copy (null,  'global.cur_level');
    //           //TODO 
    //           //TODO 
    //           //TODO 
    //           //TODO 
    //         if (tagSecurityModel.getGroupPrivilege(systemModel.currentForm)==='q' ){
    //           //TODO set_block_property('liv_unit',insert_allowed,property_true);
    //           //TODO set_block_property('liv_unit',update_allowed,property_true);
    //           //TODO set_form_property(system.current_form,validation,property_true);
    //         }
    //           //TODO 
    //          //--SET_ITEM_PROPERTY('SYS_PROF.BUT_PRINT', ENABLED, PROPERTY_FALSE);
    //     }

    //     oiiclassWhenNewBlockInstanceTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.w_new_block_instance;    // application hook
    //     }

    //     oiiclassWhenNewItemInstanceTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_navigate_h.w_new_item_instance;    // application hook
    //     }

    //     oiiclassKeyCqueryTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_query_h.key_cquery;    // application hook
    //     }

    //     oiiclassKeyEntqryTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_query_h.key_entqry;    // application hook
    //           //TODO 
    //          //--ENTER_QUERY;
    //     }

    //     oiiclassKeyExeqryTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_query_h.key_exeqry;    // application hook
    //           //TODO 
    //          //--EXECUTE_QUERY;
    //         if (livUnitModel.nbtDueForReason !== null ){
    //          //TODO  this.searchResult();
    //         } else {
    //           //TODO message('please select search type first.');
    //            throw new Error('form_trigger_failure');
    //         }
    //     }

    //     oiiclassOnCountTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_query_h.on_count;    // application hook
    //     }

    //     oiiclassPostQueryTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_query_h.post_query;    // application hook
    //     }

    //     oiiclassPreQueryTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_query_h.pre_query;    // application hook
    //     }

    //     oiiclassOnPopulateDetailsTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_relation_h.on_populate_details;    // application hook
    //     }

    //     oiiclassOnCheckDeleteMasterTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_relation_h.on_check_del_master;    // application hook
    //     }

    //     oiiclassKeyCommitTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.key_commit;    // application hook
    //           //TODO 
    //          //TODO  this.commit();
    //     }

    //     oiiclassKeyUpdrecTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.key_updrec;    // application hook
    //           //TODO 
    //          //TODO  this.lockRecord();
    //     }

    //     oiiclassOnLockTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.on_lock;    // application hook
    //           //TODO 
    //          //TODO  this.lockRecord();
    //     }

    //     oiiclassOnCommitTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.on_commit;    // application hook
    //           //TODO 
    //           //TODO 
    //          //TODO  this.commit();
    //     }

    //     oiiclassOnInsertTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.on_insert;    // application hook
    //           //TODO 
    //          //TODO  this.insertRecord();
    //     }

    //     oiiclassOnUpdateTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.on_update;    // application hook
    //           //TODO 
    //          //TODO  this.updateRecord();
    //     }

    //     oiiclassPostDeleteTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.post_delete;    // application hook
    //     }

    //     oiiclassPostInsertTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.post_insert;    // application hook
    //     }

    //     oiiclassPostUpdateTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.post_update;    // application hook
    //     }

    //     oiiclassPreCommitTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.pre_commit;    // application hook
    //     }

    //     oiiclassPreDeleteTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.pre_delete;    // application hook
    //     }

    //     oiiclassPreInsertTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.pre_insert;    // application hook
    //     }

    //     oiiclassPreUpdateTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.pre_update;    // application hook
    //     }

    //     oiiclassPostFormsCommitTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.post_forms_commit;    // application hook
    //     }

    //     oiiclassPostDatabaseCommitTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_transactional_h.post_database_commit;    // application hook
    //     }

    //     oiiclassOnErrorTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_validation_h.on_error;    // application hook
    //     }

    //     oiiclassWhenValidateItemTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_validation_h.when_validate_item;    // application hook
    //     }

    //     oiiclassWhenValidateRecordTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Application Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_validation_h.when_validate_record;    // application hook
    //     }

    //     oiiclassKeyHelpTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Event Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_various_h.key_help;    // application hook
    //     }

    //     oiiclassOnMessageTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Event Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_various_h.on_message;    // application hook
    //           //TODO 
    //         if (messageCode===40400 ){
    //          const alNo;
    //           //TODO set_alert_property('cfg_information', alert_message_text, message_text );
    //           //TODO al_no = show_alert('cfg_information');
    //           //TODO end ;
    //         } else {
    //           //TODO message (message_type||'-'||to_char(message_code)||' '||message_text) ;
    //         }
    //     }

    //     oiiclassKeyPrintTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Event Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_various_h.key_print;    // application hook
    //           //TODO 
    //          //TODO  this.print();
    //     }

    //     oiiclassWhenTimerExpiredTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Event Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_various_h.when_timer_expired;    // application hook
    //     }

    //     oiiclassWhenWindowActivatedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Event Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_window_h.when_window_activated;    // application hook
    //     }

    //     oiiclassWhenWindowClosedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Event Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_window_h.when_window_closed;    // application hook
    //     }

    //     oiiclassWhenWindowResizedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Event Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_window_h.when_window_resized;    // application hook
    //     }

    //     oiiclassWhenWindowDeactivatedTrigger() {
    //          //-- ---------------------------------------------
    //          //--         Event Hooks
    //          //-- ---------------------------------------------
    //           //TODO 
    //           //TODO applib_window_h.w_window_deactivated;    // application hook
    //     }
    //     /*
    //      * This function executed when cgte$checkConstraintVio
    //     * fired
    //     */
    //     cgte$checkConstraintVio() {
    // /* CGTE$CHECK_CONSTRAINT_VIO */
    //           //TODO function cgte$check_constraint_vio(
    //          const pServerErr;
    //          const pServerMsg;
    //          //TODO  this.is();
    //           //TODO 
    // /* Check and report Primary/Unique Key, Check Constraint and User */
    // /* Defined Constraint violations                                  */
    //           //TODO 
    //          const constraintName;
    //           //TODO 
    // /* Check if the error code is one we are interested in */
    //         if (( ! (pServerErr in  (1, 2290) ||  (pServerErr >= 20000 &&  pServerErr <= 20999) ) ) ){
    //           //TODO return( false );
    //         }
    //           //TODO 
    // /* Deal with user defined errors */
    //         if ((pServerErr >= 20000 &&  pServerErr <= 20999) ){
    //           //TODO message('error '||cgte$strip_first_error(p_server_msg));
    //           //TODO return( true );
    //         }
    //           //TODO 
    // /* Deal with Primary/Unique Key and Check Constraint violations */
    //           //TODO constraint_name = cgte$strip_constraint(p_server_msg);
    //           //TODO message(p_server_msg);
    //           //TODO 
    //           //TODO return( true );
    //     }

    //     /*
    //      * This function executed when msgAlert
    //     * fired
    //     */
    //     msgAlert() {
    //           //TODO errm in varchar2,           // message
    //           //TODO errt in varchar2,           // message type
    //           //TODO rftf in boolean )        // raise form_trigger_failure ?
    //          //TODO  this.is();
    //          //--
    //          //-- Work Variables
    //          //--
    //           //TODO alert_is      alert;
    //          const alertButton;
    //           //TODO 
    //           //TODO 
    //         if ((errt==='f') ){
    //           //TODO alert_is = find_alert('cfg_system_error');
    //         } else if ( (errt==='e'){
    //           //TODO alert_is = find_alert('cfg_error');
    //         } else if ( (errt==='w'){
    //           //TODO alert_is = find_alert('cfg_warning_a');
    //         } else if ( (errt==='i'){
    //           //TODO alert_is = find_alert('cfg_information');
    //         } else {
    //           //TODO message(errm);
    //           //TODO 
    //         if ((errt in ('f','e','w','i')) ){
    //           //TODO set_alert_property(alert_is,alert_message_text,errm);
    //           //TODO alert_button = show_alert(alert_is);
    //           //TODO 
    //         if ((rftf) ){
    //            throw new Error('form_trigger_failure');
    //         }
    //           //TODO 
    //           //TODO 
    //     }

    //     /*
    //      * This function executed when createLibraryGlobals
    //     * fired
    //     */
    //     createLibraryGlobals() {
    //           //TODO global.library_version = '11.2.1.0';
    // /*
    //             VERSION HISTORY       
    // -------------------------------------------------------------------------------------------------------------------
    // DATE            AUTHOR            VERSION                 DESCRIPTION 
    // -------------------------------------------------------------------------------------------------------------------
    // 10-Jul-2013  Niko Chu      11.2.1.0         Initial version 
    // */ 
    //     }

    //     /*
    //      * This function executed when cg$defaultAgy
    //     * fired
    //     */
    //     cg$defaultAgy() {
    //           //TODO 
    //          //TODO  this.lAgyLocId        agencyLocations.agyLocId%type();
    //          //TODO  this.lDescription        agencyLocations.description%type();
    //           //TODO 
    //           //TODO 
    //           //TODO this.defaultAgyLoc(global.caseload_id,l_agy_loc_id,l_description);
    //         if (lAgyLocId !== null &&  lDescription !== null ){
    //           //TODO liv_unit.agy_loc_id = l_agy_loc_id;
    //           //TODO liv_unit.nbt_description = l_description;
    //         }
    //           //TODO 
    //     }

    //     /*
    //      * This function executed when printList
    //     * fired
    //     */
    //     printList() {
    //          //--commented by Nirmal for #469 on 01-Jul-2010 print button having null canvas and table CLASSIFICATION_INQUIRY_TMP is not in use now.
    // /*PROCEDURE PRINT_LIST (p_session_id  CLASSIFICATION_INQUIRY_TMP.session_id%TYPE,
    //                                             p_search_type  VARCHAR2,
    //                                             p_ass_id          assessments.assessment_id%type,
    //                                             p_fromdate   DATE,
    //                                             p_todate     DATE,
    //                                             p_location   CLASSIFICATION_INQUIRY_TMP.LOCATION%type,
    //                                             p_agy_loc_id  agency_locations.agy_loc_id%type,
    //                                             p_off_id_display  CLASSIFICATION_INQUIRY_TMP.offender_id_display%type,
    //                                             p_off_name    CLASSIFICATION_INQUIRY_TMP.offender_name%type,
    //                                             p_cur_level CLASSIFICATION_INQUIRY_TMP.current_level%type)IS

    //    v_alert_no         NUMBER (3);
    //    dp                 VARCHAR2 (40);
    //    cp                 VARCHAR2 (40)                      := 1;
    //    dn                 VARCHAR2 (40);
    //    p_caseload_id      VARCHAR2 (12)                      := NAME_IN ('GLOBAL.CASELOAD_ID');
    //    p_stock_id         VARCHAR2 (12)                      := NAME_IN ('GLOBAL.CANTEEN_ID');
    //    p_print_format     VARCHAR2 (50);
    //    print_format       VARCHAR2 (50);
    //    param              VARCHAR2 (1000);
    //    hrep               report_object;
    //    lv_pl_id           paramlist;
    //    vcrep              VARCHAR2 (200);
    //    rep_status         VARCHAR2 (200);
    //    jobid              VARCHAR2 (10);
    //    lv_filename        VARCHAR2 (255);
    //    lv_printer_path    VARCHAR2 (255);

    //    lv_repserver       system_profiles.profile_value%TYPE;
    //    lv_webserver       system_profiles.profile_value%TYPE;
    //    lv_reportserver    system_profiles.profile_value%TYPE;
    //    lv_webserver_dir   system_profiles.profile_value%TYPE;
    //    row_sales_maint    sales_maintenances%ROWTYPE;
    //    lv_set_role        VARCHAR2(1)                        := 'N';

    //    lv_role_pwd      system_profiles.profile_value%TYPE;
    //    lv_decrypt_pwd     VARCHAR2(32);   

    //    -- Cursor to determine if role based security is implimented.
    //    CURSOR role_cur
    //    IS
    //       SELECT profile_value
    //         FROM system_profiles
    //        WHERE profile_type = 'CLIENT'
    //          AND profile_code = 'ROLE_BASE';

    //       CURSOR sales_setting_cur
    //    IS
    //       SELECT *
    //         FROM sales_maintenances
    //        WHERE caseload_id = p_caseload_id
    //          AND stock_loc_id = p_stock_id;

    //    CURSOR role_pwd
    //    IS
    //      SELECT profile_value
    //        FROM system_profiles
    //       WHERE profile_type = 'SYS'
    //         AND profile_code = 'ROLE_PSWD';   

    // BEGIN

    //    OPEN sales_setting_cur;
    //    FETCH sales_setting_cur INTO row_sales_maint;
    //    CLOSE sales_setting_cur;

    //    lv_filename := get_application_property (username) || TO_CHAR (SYSDATE, 'YYYYMMDDHHMISS') || '.rrpa';
    //    lv_webserver_dir := get_profile_value ('CLIENT', 'REPORT_DIR');

    //    lv_webserver := get_profile_value('CLIENT', 'ORAWEB');
    //    IF lv_webserver IS NOT NULL THEN
    //      lv_repserver := get_profile_value('CLIENT', 'REPSERVER');
    //      lv_reportserver := NVL(get_profile_value('CLIENT', 'ORAREP'), lv_webserver);
    //    ELSE
    //      tool_env.getvar('ORAWEB', lv_webserver);
    //      tool_env.getvar('REPSERVER', lv_repserver);
    //      tool_env.getvar('ORAREP',lv_reportserver);
    //      lv_reportserver := nvl(lv_reportserver,lv_webserver); 
    //    END IF;

    //    lv_pl_id := get_parameter_list ('tmpdata');

    //    IF NOT id_null (lv_pl_id) THEN
    //       destroy_parameter_list (lv_pl_id);
    //    END IF;

    //    lv_pl_id := create_parameter_list ('tmpdata');

    // --MESSAGE('FROM_DATE IS: '||p_fromdate); pause;   
    // --MESSAGE('TO_DATE IS: '||p_todate); pause;

    //    add_parameter(lv_pl_id, 'SESSION_ID', text_parameter, p_session_id);
    //    add_parameter(lv_pl_id, 'SEARCH_TYPE', text_parameter, p_search_type);
    //    add_parameter(lv_pl_id, 'ASSESSMENT_ID', text_parameter, p_ass_id);
    //    add_parameter(lv_pl_id, 'FROM_DATE', text_parameter, to_char(p_fromdate, 'MM/DD/YYYY'));
    //    add_parameter(lv_pl_id, 'TO_DATE', text_parameter, to_char(p_todate, 'MM/DD/YYYY'));
    //    add_parameter(lv_pl_id, 'UNIT_LOCATION', text_parameter, p_location);
    //    add_parameter(lv_pl_id, 'AGY_LOC_ID', text_parameter, p_agy_loc_id);
    //    add_parameter(lv_pl_id, 'OFF_ID_DISPLAY', text_parameter, p_off_id_display);
    //    add_parameter(lv_pl_id, 'OFF_NAME', text_parameter, p_off_name);
    //    add_parameter(lv_pl_id, 'CUR_LEVEL', text_parameter, p_cur_level);


    //    hrep := find_report_object ('REPORTS');

    //    set_report_object_property (hrep, report_filename, 'OIRCLASS');
    //    set_report_object_property (hrep, report_execution_mode, batch);
    //    set_report_object_property (hrep, report_comm_mode, synchronous);

    //    set_report_object_property (hrep, report_destype, file);
    //    set_report_object_property (hrep, report_desformat, 'PDF');
    //    set_report_object_property (hrep, report_desname, lv_webserver_dir || lv_filename);
    //    set_report_object_property (hrep, report_server, lv_repserver);
    //    set_report_object_property (hrep, report_other, param);

    //    OPEN role_cur;
    //    FETCH role_cur INTO lv_set_role;
    //    CLOSE role_cur;

    //    IF lv_set_role = 'Y'
    //    THEN
    //       BEGIN
    //       OPEN role_pwd;
    //       FETCH role_pwd INTO lv_role_pwd;
    //       CLOSE role_pwd;
    //         IF lv_role_pwd is null then
    //             MESSAGE('Role-based security password not defined. Contact Administrator.');
    //             RAISE FORM_TRIGGER_FAILURE;
    //           END IF;
    //       END;

    //       lv_decrypt_pwd := decryption('2DECRYPTAPASSWRD', lv_role_pwd );
    //       set_report_object_property(hrep, report_other, 'role=TAG_USER/'||lv_decrypt_pwd);

    //       --set_role(lv_param_1, lv_param_2);
    //    END IF;

    //    vcrep := run_report_object (hrep, lv_pl_id);
    //    jobid := SUBSTR (vcrep, LENGTH (lv_repserver) + 2);

    //    BEGIN
    //       rep_status := report_object_status (vcrep);
    //    END;

    //    WHILE rep_status IN ('RUNNING', 'OPENING_REPORT', 'ENQUEUED')
    //    LOOP
    //       rep_status := report_object_status (vcrep);
    //    END LOOP;

    // --   IF rep_status <> 'FINISHED' THEN
    // --      message ('Report failed with error message ' || rep_status);
    // --   END IF;

    //    IF rep_status = 'FINISHED' THEN
    //       web.show_document ('http://' || lv_reportserver || '/report/' || lv_filename);
    //    ELSE
    //       message ('Report failed with error message ' || rep_status);
    //    END IF;
    // EXCEPTION
    //    WHEN OTHERS THEN
    //       set_alert_property ('CFG_ERROR', alert_message_text, 'Other error in Print_list: ' || SQLERRM);
    //       v_alert_no := show_alert ('CFG_ERROR');
    // END; */
    //           //TODO 
    //         ;
    //     }

    //     /*
    //      * This function executed when searchResult
    //     * fired
    //     */
    //     searchResult() {
    //          //--added by Nirmal for #469 on 1-Jul-2010
    //          const lvEnd;
    //           //TODO 
    //         if (livUnitModel.nbtAssessmentType = null ){
    //           //TODO liv_unit.nbt_assessment_id = null;
    //         }
    //           //TODO 
    //         if (livUnitModel.agyLocId = null ){
    //           //TODO liv_unit.nbt_level_1_code = '';
    //           //TODO liv_unit.nbt_level_2_code = '';
    //           //TODO liv_unit.nbt_level_3_code = '';
    //         } else if ( livUnitModel.nbtLevel1Code is null ){
    //           //TODO liv_unit.nbt_level_2_code = '';
    //           //TODO liv_unit.nbt_level_3_code = '';
    //         } else if ( livUnitModel.nbtLevel2Code is null ){
    //           //TODO liv_unit.nbt_level_3_code = '';
    //           //TODO 
    //           //TODO 
    //           //TODO get_location ;
    //           //TODO 
    //           //TODO go_block('oiiclass');
    //          //TODO  this.executeQuery();
    //          //--ended here by nirmal
    //           //TODO 
    //           //TODO 
    //           //TODO 
    //           //TODO global.sub_query = 'n';
    //     }

    //     /*
    //      * This function executed when getLocation
    //     * fired
    //     */
    //     getLocation() {
    //          //--added by Nirmal for #469 on 01-Jul-2010
    //           //TODO lv_agy_loc_id               living_units.agy_loc_id%type;
    //           //TODO lv_living_unit_1            agency_locations.housing_lev_1_code%type;
    //           //TODO lv_living_unit_2            agency_locations.housing_lev_2_code%type;
    //           //TODO lv_living_unit_3            agency_locations.housing_lev_3_code%type;
    //           //TODO 
    //         if (livUnitModel.agyLocId !== null ){
    //           //TODO lv_agy_loc_id = liv_unit.agy_loc_id;
    //         if (livUnitModel.nbtLevel1Code !== null ){
    //           //TODO lv_living_unit_1 = liv_unit.nbt_level_1_code;
    //         if (livUnitModel.nbtLevel2Code !== null ){
    //           //TODO lv_living_unit_2 = liv_unit.nbt_level_2_code;
    //         if (livUnitModel.nbtLevel3Code !== null ){
    //           //TODO lv_living_unit_3 = liv_unit.nbt_level_3_code;
    //           //TODO global.lv_location  = lv_agy_loc_id||'-'||lv_living_unit_1||'-'||lv_living_unit_2||'-'||lv_living_unit_3;
    //           //TODO 
    //         } else {
    //           //TODO global.lv_location  = lv_agy_loc_id||'-'||lv_living_unit_1||'-'||lv_living_unit_2 ;
    //           //TODO 
    //         }
    //         } else {
    //           //TODO global.lv_location  = lv_agy_loc_id||'-'||lv_living_unit_1 ;
    //         }
    //         } else {
    //           //TODO global.lv_location = lv_agy_loc_id;
    //         }
    //         } else {
    //           //TODO global.lv_location  = '';
    //         }
    //     }

    //     /*
    //      * This function executed when createLibraryGlobalsBak
    //     * fired
    //     */
    //     createLibraryGlobalsBak() {
    //          //TODO  this.is();
    //           //TODO 
    //           //TODO global.library_version = '10.02.1.6';
    //           //TODO 
    //           //TODO 
    // /* NAME        : OIICLASS
    //    DESCRIPTION : CLASSIFICATION INQUIRY

    //                                                 VERSION HISTORY
    // --------------------------------------------------------------------------------------------------
    // DATE           AUTHOR        VERSION                     DESCRIPTION
    // --------------------------------------------------------------------------------------------------
    // 01-Jul-2010         Nirmal            10.02.1.6                    Issue#469 Performance issue, changed from table based form to Procedure based form    
    // 03-Mar-2009         Sarah             10.02.1.5                    Tr#8458: 
    //                                             - Passed the form through the API
    //                                             - Extended the length of offender_name to 110
    // 31-AUG-2007         JASON            10.02.1.4                    Issue No.  4137 : fixed : Use of cloumn name misleading  
    //                                             1) The Location prompt in the Search Parameters block  
    //                                                display value defined against System Profile LABEL/INST_AGENCY
    //                                             2) Prompts for Booking Number in the results block to be justified 
    //                                                to the left side of the field
    //                                             3) The To Date in the Parameters block correctly translate entry of 
    //                                                06/22/07 - display 06/22/2007 
    //                                             issue No.  4351 : Fixed :  Pop-up error message 'You cannot update 
    //                                             this record' when click on Search
    // 30-AUG-2007         NIKO                10.02.1.3                    Issue No.  4354 : fixed : DOC# field in results block should be increased to accommodate 10 characters 
    //                                                                                         1. Move the Schedule date, Assessment Type, Current level to the right (aligned with the side of the frame).
    //                                                                                         2. Increase character space in DOC# field
    //                                                                                         3. Add rows to utilize empty space on boittom of the form
    //                                                                                         4. Correctly allign the labels 
    // 29-AUG-2007         NIKO                10.02.1.2                    BUG FIXED
    //                                                                                       Incorrect position of DOC#& [BKG_ID] labels - labels should be aligned to the left and should be in the middle of the fields
    //                                                                                         The color of the Search Button (top block) should be per standard - not white       
    // 18-MAY-2007         NIKO                10.02.1.1                    Recompiled and modified for 10Gr2
    // 25-JUL-2006    NANCY      6.04.4.1 NVSTDOC  FORM CREATED WITH PEER REVIEW
    // 03-AUG-2006         NANCY            6.04.4.2 NVSTDOC  GUI FIX BASE ON STANDARD
    // 17-AUG-2006         NANCY            6.04.4.4 NVSTDOC    TR# 748/749:DATE FORMAT ISSUE FOR FROM_DT AND TO_DT;
    //                                                                                         NO ENTER-QUERY/EXECUTE_QUERY MODE FOR SEARCH SCREEN;
    // 21-AUG-2006    NANCY            6.04.4.5 NVSTDOC  'Q' ONLY USER SHOULD BE ABLE TO USE THE SCREEN AS WELL;
    //                                                                                         CLEAR BLOCK ISSUE.   
    //                                                                                         RESULT BLOCK FIELDS SHOULD BE WHITE
    //                                                                                         F8 SHOULD WORK SAME AS THE SEARCH BUTTON.
    // 23-AUG-2006    NANCY            6.04.4.6 NVSTDOC    TR#785,786,790,799,810:
    //                                                                                         -NDOC# SHOULD BE LEADING WITH '0' WHEN SYSTEM PROFILE 'CLIENT, ID_DISPLAY'
    //                                                                                         SET TO YES
    //                                                                                         -ENTER QUERYABLE FOR THE RESULT BLOCK
    //                                                                                         -WITHOUT RECORD RETRIVED, DISABLE THE PRINT REPORT BUTTON
    //                                                                                         -DESIGN CHANGE, NO 'INT' ASSESS-CODE WILL SET FOR DUE FOR INITIAL        
    // 23-AUG-2006    NANCY            6.04.4.7 NVSTDOC    REMOVE THE FILTER OF 'TRN' 'OUT' 'CRT' FOR AGY_LOC_ID        
    // 23-AUG-2006         NANCY            6.04.4.8 NVSTDOC  RECOMPILED        
    // 28-AUG-2006         NANCY            6.04.4.9 NVSTDOC  NUMBER OF ISSUES HAVE BEEN FIXED BASED ON QA TEST.
    //                                                                                         TR#785,831,862,833,834,836,839,842,845,847.    
    // 05-SEP-2006    NANCY            6.04.4.10 NVSTDOC NUMBER OF ISSUES HAVE BEEN FIXED BASED ON DESIGN CHANGED:
    //                                                                                         TR#906,890,889,840,839,834            
    // 05-SEP-2006    NANCY      6.04.4.11 NVSTDOC SOME CHANGED MADE FOR PREVIOUS VERSION            
    // 06-SEP-2006    NANCY      6.04.4.12 NVSTDOC NAVIFATION ISSUE AND CLEAR THE CRITERIA BLOCK WHEN NEW BLOCK INSTANCE        
    // 07-SEP-2006         NANCY      6.04.4.13 NVSTDOC CHANGED BACK THE CLEAR BLOCK                                                     
    // 12-SEP-2006    NANCY            6.04.4.14 NVSTDOC    TR#1018: - AGY_LOC_ID LOV FILTER BY ACTIVE AND INST TYPE
    //                                                                                                          - RESULT SHOULD ONLY RETIEVE ASSIGN WITHIN THE USER CASELOAD                                                                                                                                                                                                                                            
    // 20-NOV-2006    NANCY            6.04.4.15 NVSTDOC    TR#1078, 2009:
    //                                                                                         - ASSESSMENT DESCRIPTION FIELD SIZE CHANGED TO 500
    //                                                                                         - CAN NOT EXIT FORM                                                                                                         
    // 08-JAN-2007     MEETA             6.04.4.16                    TR# 1076 COMPARE ASSESSMENT_ID AND NOT ASSESSMENT DESCRIPTION                                               
    // 11-JAN-2007        MEETA                6.04.4.17                    TR# 1076 DISPLAY ALL RECORDS WHEN NO ASSESSMENT TYPE IS SELECTED

    // */
    //     }

}
