import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidsublcService } from '../service/oidsublc.service';
import { AgencyLocationCounts } from '@automatedbeans/AgencyLocationCounts';
import { AgencyLocationCountsCommitBean } from '@automatedbeans/AgencyLocationCountsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
//    import required bean declarations

@Component({
    selector: 'app-oidsublc',
    templateUrl: './oidsublc.component.html'
})

export class OidsublcComponent implements OnInit {
    //    Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    subloccntData: AgencyLocationCounts[] = [];
    subloccntDataTemp: AgencyLocationCounts[] = [];
    subloccntModel: AgencyLocationCounts = new AgencyLocationCounts();
    subloccntIndex = 0;
    subloccntInsertList: AgencyLocationCounts[] = [];
    subloccntUpdateList: AgencyLocationCounts[] = [];
    subloccntDeleteList: AgencyLocationCounts[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    subSamplColumnDef: any[];
    subTestColumnDef: any[];
    rpOtherOccupantsColumnDef: any[];
    personsReadOnly = false;
    rpOtherOccupantsReadOnly = false;
    subSamplReadOnly = false;
    subTestReadOnly = false;
    sysPflReadOnly = false;
    subLocCntReadOnly = false;
    cgfkAgylocidRg: any[] = [];
    cgfkCounttypesRg: any[] = [];
    cgfkSchtimeRg: any[] = [];
    cgfkHousinglevel1Rg: any[] = [];
    cgfkHousinglevel2Rg: any[] = [];
    cgfkHousinglevel3Rg: any[] = [];
    cgfkInitloccodeRg: any[] = [];
    cgfkConductedbyRg: any[] = [];
    cgfkConductedby1Rg: any[] = [];
    cfgkRecountcodeRg: any[] = [];
    subloccntCommitModel: AgencyLocationCountsCommitBean = new AgencyLocationCountsCommitBean();
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    agyLocId: any;
    agyLocIdLink: string;
    agyLocTitles = {
        'description': 'Description', 'agyLocId': 'Location Code',
        'housingLev1Code': 'Count Type', 'housingLev3Code': 'Scheduled Time'
    };
    housinglev1Titles = { 'description': 'Description', 'code': 'Housing Level1' };
    conductedByTitles = { 'description': 'User Id', 'firstName': 'First Name', 'lastName': 'Last Name' };
    reasonTitles = { 'description': 'Description', 'code': 'Re Count Reason Code' };
    agyLocIdMap: Map<string, string> = new Map<string, string>();
    housingLevel1Name: string;
    housingLevel2Name: string;
    housingLevel3Name: string;
    housLevel1Link: any;
    housLevel2Link: any;
    housLevel3Link: any;
    housingLevel1Map: Map<string, string> = new Map<string, string>();
    housingLevel2Map: Map<string, string> = new Map<string, string>();
    housingLevel3Map: Map<string, string> = new Map<string, string>();
    intLocLink: any;
    submitMsg: any;
    scheduledTime: any;
    countType: any;
    submitTime: any;
    subLocBlockReadonly: boolean;
    enableResubBlock: boolean;
    reConductedByUserid: any;
    clearBtnDisabled: boolean;
    conductedByUseridMap: Map<string, string> = new Map<string, string>();
    intLocReadonly: boolean;
    houselevel1Readonly: boolean;
    intLocMap: Map<string, string> = new Map<string, string>();
    conductedByUseridValue: any;
    houseLevelOneReadonly: boolean;
    houseLevelTwoReadonly: boolean;
    houseLevelThreeReadonly: boolean;
    submitBtnDisabled: boolean;
    countTypeCodeId:number;
    constructor(private oidsublcFactory: OidsublcService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager) {
        //    TODO initilize data members here..!
        this.subSamplColumnDef = [];
        this.subTestColumnDef = [];
        this.rpOtherOccupantsColumnDef = [];
    }
    ngOnInit() {
        this.conductedByUseridValue = this.sessionManager && this.sessionManager.getStaffDetail() && this.sessionManager.getStaffDetail().staffId;
        this.reConductedByUserid = this.conductedByUseridValue;
        this.clearBtnDisabled = true;
        this.subLocBlockReadonly = false;
        this.enableResubBlock = false;
        this.submitBtnDisabled = false;
        this.housingLevel1Name = undefined;
        this.housingLevel2Name = undefined;
        this.housingLevel3Name = undefined;
        this.intLocReadonly = true;
        this.houselevel1Readonly = false;
        this.houseLevelOneReadonly = true;
        this.houseLevelTwoReadonly = true;
        this.houseLevelThreeReadonly = true;
        this.submitMsg = this.translateService.translate('oidsublc.submitmsg');
        this.housLevel1Link = 'test';
        const user = this.sessionManager.getId();
        const sessionId = this.sessionManager.randomid;
        this.agyLocIdLink = '/oidsublc/cgfkAgyLocIdRecordGroup?sessionId=' + sessionId + '&caseloadId=' + this.sessionManager.currentCaseLoad;

        const cgfkAgylocidServiceObj = this.oidsublcFactory.cgfkAgylocidRecordGroup(sessionId, this.sessionManager.currentCaseLoad);
        cgfkAgylocidServiceObj.subscribe(cgfkAgylocidList => {
            if (cgfkAgylocidList.length === 0) {
                this.cgfkAgylocidRg = [];
                this.type = 'warn';
                this.message = this.translateService.translate('oidsublc.thereisnoactivecounts');
                this.show();
                this.subLocBlockReadonly = true;
                this.subLocBlockReadonly = true;
                this.subLocBlockReadonly = true;
                this.submitBtnDisabled = true;
                this.clearBtnDisabled = true;
                this.conductedByUseridValue = undefined;
                this.subloccntModel.enteredByUserid = undefined;
                this.subloccntModel.dateSubmitted = undefined;
                this.submitTime = undefined;
            } else {
                for (let i = 0; i < cgfkAgylocidList.length; i++) {
                    this.countTypeCodeId = cgfkAgylocidList[i].code;
                    this.cgfkAgylocidRg.push({
                        'text': cgfkAgylocidList[i].code + ' - ' +
                            cgfkAgylocidList[i].description, 'id': cgfkAgylocidList[i].code
                    });
                    this.agyLocIdMap.set(cgfkAgylocidList[i].housingLev2Code, cgfkAgylocidList[i].agyLocId + '-' +
                        cgfkAgylocidList[i].housingLev1Code + '-' + cgfkAgylocidList[i].housingLev3Code);
                        // this.agyLocId = cgfkAgylocidList[0].code;
                        // this.countType = cgfkAgylocidList[0].housingLev1Code;
                        // this.scheduledTime = cgfkAgylocidList[0].housingLev3Code;
                }
                // this.oidsublcFactory.getDefaultAgyLoc(this.sessionManager.currentCaseLoad).subscribe(data => {
                //     if (data) {
                //         this.agyLocId = data.countTypeId && data.countTypeId.toString();
                //         this.countType = data.countTypeCode;
                //         this.scheduledTime = data.scheduledTime;
                //     }
                // });
            }
        });

        const cgfkConductedbyServiceObj = this.oidsublcFactory.
            cgfkConductedbyRecordGroup();
        cgfkConductedbyServiceObj.subscribe(cgfkConductedbyList => {
            if (cgfkConductedbyList.length === 0) {
                this.cgfkConductedbyRg = [];
            } else {
                for (let i = 0; i < cgfkConductedbyList.length; i++) {
                    this.cgfkConductedbyRg.push({
                        'text': cgfkConductedbyList[i].code + ' - ' +
                            cgfkConductedbyList[i].description, 'id': cgfkConductedbyList[i].code
                    });
                    this.conductedByUseridMap.set(cgfkConductedbyList[i].code, cgfkConductedbyList[i].description);
                }
            }
        });
    }
    /**
	 *  This function will be executed to display messages
	 */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    subloccntExecuteQuery() {
        const subloccntResult = this.oidsublcFactory.
            subLocCntExecuteQuery(this.subloccntModel);
        subloccntResult.subscribe(subloccntResultList => {
            if (subloccntResultList.length === 0) {
                this.subloccntData = [];
            } else {
                this.subloccntData = subloccntResultList;
                this.subloccntModel = subloccntResultList[0];
            }
        });
    }
    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    oidsublcSavesubloccntForm() {
        if (this.enableResubBlock) {
            return;
        }
        if (!this.agyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.locationmust');
            this.show();
            return;
        }
        if (!this.subloccntModel.internalLocation && !this.subloccntModel.housingLev1Code) {
            this.type = 'warn';
            this.message = this.translateService.translate(this.housingLevel1Name + ' must be entered.');
            this.show();
            return;
         }
         if (!this.houseLevelTwoReadonly && !this.subloccntModel.housingLev2Code) {
            this.message = this.translateService.translate(this.housingLevel2Name + ' must be entered.');
            this.show();
            return;
         }
         if (!this.houseLevelThreeReadonly && !this.subloccntModel.housingLev3Code) {
            this.message = this.translateService.translate(this.housingLevel3Name + ' must be entered.');
            this.show();
            return;
        }
        if (!this.conductedByUseridValue) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.conductedbymustbe');
            this.show();
            return;
        }
        if (!this.subloccntModel.reportedCount) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.countmustbe');
            this.show();
            return;
        }
        this.subloccntCommitModel.insertList = [];
        this.subloccntCommitModel.updateList = [];
        this.subloccntCommitModel.deleteList = [];
        this.subloccntUpdateList = [];
        this.subloccntModel.countTypeId = this.agyLocId;

        if (this.subloccntModel.housingLev1Code || this.subloccntModel.internalLocation) {
            if (this.subloccntModel.housingLev1Code) {
                this.subloccntModel.livingUnitId1 = Number(this.housingLevel1Map.get(this.subloccntModel.housingLev1Code));
            }
            if (this.subloccntModel.housingLev2Code) {
                this.subloccntModel.livingUnitId2 = Number(this.housingLevel2Map.get(this.subloccntModel.housingLev2Code));
            }
            if (this.subloccntModel.housingLev3Code) {
                this.subloccntModel.livingUnitId3 = Number(this.housingLevel3Map.get(this.subloccntModel.housingLev3Code));
            }
            if (this.subloccntModel.internalLocation) {
                this.subloccntModel.internalLocationId = Number(this.intLocMap.get(this.subloccntModel.internalLocation));
            }
            if (this.conductedByUseridValue) {
                this.subloccntModel.conductedByUserid = this.conductedByUseridMap.get(this.conductedByUseridValue);
            }
            this.subloccntUpdateList.push(this.subloccntModel);
            this.subloccntCommitModel.updateList = this.subloccntUpdateList;
        } else {
            return;
        }
        const subloccntSaveData = this.oidsublcFactory.subLocCntCommit(this.subloccntCommitModel);
        subloccntSaveData.subscribe(data => {
            if (data === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidsublc.submitcountvalidation');
                this.show();
            } else if (data === 1) {
                this.submitMsg = this.translateService.translate('oidsublc.submitmsgchanged');
                this.enableResubBlock = true;

                this.subLocBlockReadonly = true;
                this.houseLevelOneReadonly = true;
                this.houseLevelTwoReadonly = true;
                this.houseLevelThreeReadonly = true;
                this.intLocReadonly = true;
                this.subLocBlockReadonly = true;
                this.subLocBlockReadonly = true;
                this.submitBtnDisabled = true;
                this.clearBtnDisabled = true;

                this.subLocBlockReadonly = true;
                this.houselevel1Readonly = true;
                this.intLocReadonly = true;
            } else if (data === 3) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidsublc.countvalidation');
                this.show();
            } else if (data === 4) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.clearResubmissionForm();
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidsublcSaveResubloccntForm() {
        this.subloccntUpdateList = [];
        this.subloccntCommitModel.updateList = [];
        if (this.reConductedByUserid) {
            this.subloccntModel.conductedByUserid = this.conductedByUseridMap.get(this.reConductedByUserid);
        }
        if (!this.subloccntModel.conductedByUserid) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.conductedbymustbe');
            this.show();
            return;
        }
        if (!this.subloccntModel.recountRsnCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.Recountreasonmustbe');
            this.show();
            return;
        }
        if (!this.subloccntModel.recountTotal) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.countmustbe');
            this.show();
            return;
        }
        this.subloccntUpdateList.push(this.subloccntModel);
        this.subloccntCommitModel.updateList = this.subloccntUpdateList;
        const subloccntSaveData = this.oidsublcFactory.reSubLocCntCommit(this.subloccntCommitModel);
        subloccntSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.enableResubBlock = false;
                this.subLocBlockReadonly = false;
                this.houselevel1Readonly = false;
                // this.intLocReadonly = false;
                var recountRsnCode = this.subloccntModel.recountRsnCode;
                this.subloccntModel = new AgencyLocationCounts();
                this.subloccntModel.recountRsnCode = recountRsnCode;
                this.subloccntModel.reportedCount = undefined;
                this.subloccntModel.enteredByUserid = this.sessionManager.getId();
                this.subloccntModel.dateSubmitted = DateFormat.getDate();
                this.agyLocId = undefined;
                this.submitMsg = this.translateService.translate('oidsublc.submitmsg');
                this.countType = undefined;
                this.scheduledTime = undefined;
                this.subLocBlockReadonly = false;
                this.subLocBlockReadonly = false;
                this.subLocBlockReadonly = false;
                this.submitBtnDisabled = false;
                this.clearBtnDisabled = false;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    /**
      *  This function will be executed when Clear event is
      * fired
      */
    clearResubmissionForm() {
        this.intLocLink = 'test';
        this.housLevel3Link = 'test';
        this.housLevel2Link = 'test';
        this.housLevel1Link = 'test';
        this.agyLocIdLink = 'test';
        this.subLocBlockReadonly = false;
        this.subloccntModel = new AgencyLocationCounts();
        this.conductedByUseridValue = undefined;
        this.conductedByUseridValue = this.sessionManager && this.sessionManager.getStaffDetail() && this.sessionManager.getStaffDetail().staffId;
        this.reConductedByUserid = this.conductedByUseridValue;
        this.subloccntModel.enteredByUserid = this.sessionManager.getId();
        this.subloccntModel.dateSubmitted = DateFormat.getDate();
        this.subloccntModel.reportedCount = undefined;
        const agyLocId = this.subloccntModel.agyLocId === undefined ? '' : undefined;
        this.subloccntModel.agyLocId = agyLocId;

        const housingLev1Code = this.subloccntModel.housingLev1Code === undefined ? '' : undefined;
        this.subloccntModel.housingLev1Code = housingLev1Code;

        const housingLev2Code = this.subloccntModel.housingLev2Code === undefined ? '' : undefined;
        this.subloccntModel.housingLev2Code = housingLev2Code;

        const housingLev3Code = this.subloccntModel.housingLev3Code === undefined ? '' : undefined;
        this.subloccntModel.housingLev3Code = housingLev3Code;

        const internalLocation = this.subloccntModel.internalLocation === undefined ? '' : undefined;
        this.subloccntModel.internalLocation = internalLocation;

        const conductedByUserid = this.subloccntModel.conductedByUserid === undefined ? '' : undefined;
        this.subloccntModel.conductedByUserid = conductedByUserid;
        if (this.enableResubBlock) {
            this.subloccntCommitModel.insertList = [];
            this.subloccntCommitModel.updateList = [];
            this.subloccntCommitModel.deleteList = [];
            this.subloccntModel.countTypeId = this.agyLocId;
            this.subloccntDeleteList.push(this.subloccntModel);
            this.subloccntCommitModel.deleteList = this.subloccntDeleteList;
            const subloccntSaveData = this.oidsublcFactory.reSubLocCntCommit(this.subloccntCommitModel);
            subloccntSaveData.subscribe(data => {
                this.enableResubBlock = false;
                this.agyLocId = undefined;
                this.countType = undefined;
                this.scheduledTime = undefined;
                this.submitMsg = this.translateService.translate('oidsublc.submitmsg');
                this.clearBtnDisabled = false;
                this.intLocReadonly = false;
                this.houselevel1Readonly = false;
                this.subLocBlockReadonly = false;
                this.subLocBlockReadonly = false;
                this.subLocBlockReadonly = false;
                this.submitBtnDisabled = false;
            });
        } else {
            this.enableResubBlock = false;
            this.agyLocId = undefined;
            this.countType = undefined;
            this.scheduledTime = undefined;
            this.submitMsg = this.translateService.translate('oidsublc.submitmsg');
            this.clearBtnDisabled = false;
            this.intLocReadonly = false;
            this.houselevel1Readonly = false;
            this.subLocBlockReadonly = false;
            this.subLocBlockReadonly = false;
            this.subLocBlockReadonly = false;
            this.submitBtnDisabled = false;
        }
    }

    clearResubmission() {
      this.subloccntModel.recountRsnCode = undefined;
      this.subloccntModel.commentText = undefined;
      this.subloccntModel.recountTotal = undefined;
    }
    /**
     *  This function will be executed when we change the count filed in submit count block
     *
     */
    onKeyPressEvent(event) {
        if (event) {
            this.clearBtnDisabled = false;
        }
    }
    /**
     *  This function will be executed when we change the location field
    *
    */
    butAgyLocIdWhenButtonPressedTrigger(event) {
        if (event && this.agyLocId) {
            this.clearBtnDisabled = false;
            this.subloccntModel.housingLev1Code = undefined;
            this.subloccntModel.housingLev2Code = undefined;
            this.subloccntModel.housingLev3Code = undefined;
            this.subloccntModel.agyLocId = undefined;
            this.subloccntModel.agyLocId = event.agyLocId;
            this.countType = event.housingLev1Code;
            if(event.housingLev3Code === 'NA'){
                this.scheduledTime = "";
            } else {
                this.scheduledTime = event.housingLev3Code;
            }
            const getData = this.oidsublcFactory.getHousingLevels(this.subloccntModel.agyLocId);
            getData.subscribe(lableNames => {
                if (lableNames) {
                    this.housingLevel1Name = lableNames.housingLev1Code;
                    this.housingLevel2Name = lableNames.housingLev2Code;
                    this.housingLevel3Name = lableNames.housingLev3Code;
                } else {
                }
            });
            this.housLevel1Link = '/oidsublc/cgfkHousingLevel1RecordGroup?countTypeCodeId=' + event.code;
            const cgfkHousinglevel1ServiceObj = this.oidsublcFactory.cgfkHousinglevel1RecordGroup(event.code);
            cgfkHousinglevel1ServiceObj.subscribe(cgfkHousinglevel1List => {
                if (cgfkHousinglevel1List.length === 0) {
                    this.cgfkHousinglevel1Rg = [];
                    this.houseLevelOneReadonly = true;
                    this.houseLevelTwoReadonly = true;
                    this.houseLevelThreeReadonly = true;
                } else {
                    this.houseLevelOneReadonly = false;
                    this.houseLevelTwoReadonly = true;
                    this.houseLevelThreeReadonly = true;
                    for (let i = 0; i < cgfkHousinglevel1List.length; i++) {
                        this.cgfkHousinglevel1Rg.push({
                            'text': cgfkHousinglevel1List[i].code + ' - ' +
                                cgfkHousinglevel1List[i].description, 'id': cgfkHousinglevel1List[i].code
                        });
                        this.housingLevel1Map.set(cgfkHousinglevel1List[i].code, cgfkHousinglevel1List[i].livingUnitId);
                    }
                }
            });
            this.intLocLink = '/oidsublc/cgfkInitLocCodeRecordGroup?countTypeCodeId=' +event.code;
            const cgfkInitloccodeServiceObj = this.oidsublcFactory.
                cgfkInitloccodeRecordGroup(event.code);
            cgfkInitloccodeServiceObj.subscribe(cgfkInitloccodeList => {
                if (cgfkInitloccodeList.length === 0) {
                    this.cgfkInitloccodeRg = [];
                    this.intLocReadonly = true;
                } else {
                    this.intLocReadonly = false;
                    for (let i = 0; i < cgfkInitloccodeList.length; i++) {
                        this.cgfkInitloccodeRg.push({
                            'text': cgfkInitloccodeList[i].code + ' - ' +
                                cgfkInitloccodeList[i].description, 'id': cgfkInitloccodeList[i].code
                        });
                        this.intLocMap.set(cgfkInitloccodeList[i].code, cgfkInitloccodeList[i].internalLocationId);
                    }
                }
            });
        } else {
            this.housLevel1Link = 'test';
            this.intLocLink = 'test';
            this.countType = undefined;
            this.scheduledTime = undefined;
            this.houseLevelOneReadonly = true;
            this.houseLevelTwoReadonly = true;
            this.houseLevelThreeReadonly = true;
            this.intLocReadonly = true;
        }
    }
    /**
    *  This function will be executed when we click on the HousingLevel3 field
    *
    */
    houseLev1Event() {
        if (this.subloccntModel.internalLocation) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.cannnotselect') + ' ' + this.housingLevel1Name + ' ' +
                this.translateService.translate('oidsublc.whenintlocpopulated');
            this.show();
            return;
        }
    }
    /**
     *  This function will be executed when we change the HousingLevel1 field
    *
    */
    butHouseLev1CodeWhenButtonPressedTrigger(event) {
        if (event) {
            // this.intLocReadonly = true;
            this.clearBtnDisabled = false;
            this.subloccntModel.housingLev1Code = event.code;
            const livingUnitId = this.housingLevel1Map.get(this.subloccntModel.housingLev1Code);
            this.housLevel2Link = '/oidsublc/cgfkHousingLevel2RecordGroup?countTypeCodeId=' + (+this.countTypeCodeId)
                + ' &livingUnitId=' + livingUnitId;
            const cgfkHousinglevel2ServiceObj = this.oidsublcFactory.
                cgfkHousinglevel2RecordGroup(+this.countTypeCodeId, livingUnitId);
            cgfkHousinglevel2ServiceObj.subscribe(cgfkHousinglevel2List => {
                if (cgfkHousinglevel2List.length === 0) {
                    this.cgfkHousinglevel2Rg = [];
                    this.houseLevelTwoReadonly = true;
                    this.houseLevelThreeReadonly = true;
                } else {
                    this.houseLevelTwoReadonly = false;
                    this.houseLevelThreeReadonly = true;
                    for (let i = 0; i < cgfkHousinglevel2List.length; i++) {
                        this.cgfkHousinglevel2Rg.push({
                            'text': cgfkHousinglevel2List[i].code + ' - ' +
                                cgfkHousinglevel2List[i].description, 'id': cgfkHousinglevel2List[i].code
                        });
                        this.housingLevel2Map.set(cgfkHousinglevel2List[i].code, cgfkHousinglevel2List[i].livingUnitId);
                    }
                }
            });
        } else {
            // this.intLocReadonly = false;
            this.houseLevelTwoReadonly = true;
            this.houseLevelThreeReadonly = true;
            this.subloccntModel.housingLev2Code = undefined;
            this.subloccntModel.housingLev3Code = undefined;
        }
    }
    /**
    *  This function will be executed when we click on the HousingLevel2 field
    *
    */
    houseLev2Event() {
        if (this.enableResubBlock || this.subloccntModel.internalLocation) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.cannnotselect') + ' ' + this.housingLevel2Name + ' ' +
                this.translateService.translate('oidsublc.whenintlocpopulated');
            this.show();
            return;
        }
        if (this.housingLevel2Map.size === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.listofvalues');
            this.show();
        }
    }
    /**
     *  This function will be executed when we change the HousingLevel2 field
    *
    */
    butHouseLev2CodeWhenButtonPressedTrigger(event) {
        if (event) {
            if (this.subloccntModel.housingLev2Code) {
                this.clearBtnDisabled = false;
                this.subloccntModel.housingLev2Code = event;
                const livingUnitId = this.housingLevel2Map.get(this.subloccntModel.housingLev2Code);
                this.housLevel3Link = '/oidsublc/cgfkHousingLevel3RecordGroup?countTypeCodeId=' +
                    (+this.countTypeCodeId) + ' &livingUnitId=' + livingUnitId;
                const cgfkHousinglevel3ServiceObj = this.oidsublcFactory.
                    cgfkHousinglevel3RecordGroup(+this.countTypeCodeId, livingUnitId);
                cgfkHousinglevel3ServiceObj.subscribe(cgfkHousinglevel3List => {
                    if (cgfkHousinglevel3List.length === 0) {
                        this.cgfkHousinglevel2Rg = [];
                        this.houseLevelThreeReadonly = true;
                    } else {
                        this.houseLevelThreeReadonly = false;
                        for (let i = 0; i < cgfkHousinglevel3List.length; i++) {
                            this.cgfkHousinglevel2Rg.push({
                                'text': cgfkHousinglevel3List[i].code + ' - ' +
                                    cgfkHousinglevel3List[i].description, 'id': cgfkHousinglevel3List[i].code
                            });
                            this.housingLevel3Map.set(cgfkHousinglevel3List[i].code, cgfkHousinglevel3List[i].livingUnitId);
                        }
                    }
                });
            }
        } else {
            this.subloccntModel.housingLev3Code = undefined;
        }
    }
    /**
     *  This function will be executed when we click on the HousingLevel3 field
     *
     */
    houseLev3Event() {
        if (this.enableResubBlock || this.subloccntModel.internalLocation) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.cannnotselect') + ' ' + this.housingLevel3Name +
                ' ' + this.translateService.translate('oidsublc.whenintlocpopulated');
            this.show();
            return;
        }
        if (this.housingLevel3Map.size === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.listofvalues');
            this.show();
        }
    }
    /**
     *  This function will be executed when we change the HousingLevel3 field
    *
    */
    butHouseLev3CodeWhenButtonPressedTrigger(event) {
        if (event) {
            this.clearBtnDisabled = false;
        }
    }

    butInternalLocationWhenButtonPressedTrigger(event) {
        if (event) {
            this.subloccntModel.internalLocation = event.code;
            this.houselevel1Readonly = true;
            this.clearBtnDisabled = false;
        } else {
            this.houselevel1Readonly = false;
        }
    }
    internalLocEvent() {
        if (this.subloccntModel.housingLev1Code) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.cannotselectintLoc');
            this.show();
        } else if (this.cgfkInitloccodeRg.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.listofvalues');
            this.show();
            return;
        } else if (this.enableResubBlock) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidsublc.cannotselectintLoc');
            this.show();
        }
    }
    /**
     *  This function will be executed when we change the conductedByUserId field
    *
    */
    conductedByUseridWhenValidateItemTrigger(event) {
        if (event) {
            this.clearBtnDisabled = false;
            // this.subloccntModel.conductedByUserid = event.code;
            this.conductedByUseridValue = event.code;
            if (event.description === '') {
                this.subloccntModel.enteredByUserid = undefined;
                this.subloccntModel.dateSubmitted = undefined;
                this.submitTime = undefined;
            } else {
                this.subloccntModel.enteredByUserid = this.sessionManager.getId();
                this.subloccntModel.dateSubmitted = DateFormat.getDate();
                this.submitTime = DateFormat.getDate();
            }
        } else {
            this.subloccntModel.enteredByUserid = undefined;
            this.subloccntModel.dateSubmitted = undefined;
            this.submitTime = undefined;
        }
    }
    recountRsnCodeChange(event) {
        
    }
}
