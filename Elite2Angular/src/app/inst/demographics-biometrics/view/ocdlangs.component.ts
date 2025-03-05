import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdlangsService } from '../service/ocdlangs.service';
import { OffenderLanguages } from '@instdemographicsbeans/OffenderLanguages';
import { OffenderLanguagesCommitBean } from '@instdemographicsbeans/OffenderLanguagesCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
    selector: 'app-ocdlangs',
    templateUrl: './ocdlangs.component.html'
})

export class OcdlangsComponent implements OnInit {
    interpreterRequestedFlagTemp: any;
    speakLangCodeTemp: any;
    writeLanguageCodeTemp: any;
    @ViewChild('grid', { static: true }) grid: any;
    msgs: any[] = [];
    offprimlangData: OffenderLanguages[] = [];
    offprimlangDataTemp: OffenderLanguages[] = [];
    offprimlangModel: OffenderLanguages = new OffenderLanguages();
    offprimlangModelTemp: OffenderLanguages = new OffenderLanguages();
    offprimlangIndex: number;
    offprimlangInsertList: OffenderLanguages[] = [];
    offprimlangUpdatetList: OffenderLanguages[] = [];
    offprimlangDeleteList: OffenderLanguages[] = [];
    preflangwriteData: OffenderLanguages[] = [];
    preflangwriteDataTemp: OffenderLanguages[] = [];
    preflangwriteModel: OffenderLanguages = new OffenderLanguages();
    preflangwriteModelTemp: OffenderLanguages = new OffenderLanguages();
    preflangwriteCommitModel: OffenderLanguagesCommitBean = new OffenderLanguagesCommitBean();
    preflangwriteIndex: number;
    preflangwriteInsertList: OffenderLanguages[] = [];
    preflangwriteUpdatetList: OffenderLanguages[] = [];
    preflangwriteDeleteList: OffenderLanguages[] = [];
    preflangspeakData: OffenderLanguages[] = [];
    preflangspeakDataTemp: OffenderLanguages[] = [];
    preflangspeakModel: OffenderLanguages = new OffenderLanguages();
    preflangspeakIndex: number;
    preflangspeakInsertList: OffenderLanguages[] = [];
    preflangspeakUpdatetList: OffenderLanguages[] = [];
    preflangspeakDeleteList: OffenderLanguages[] = [];
    offseclangData: OffenderLanguages[] = [];
    offseclangDataTemp: OffenderLanguages[] = [];
    offseclangModel: OffenderLanguages = new OffenderLanguages();
    offseclangIndex = -1;
    offseclangInsertList: OffenderLanguages[] = [];
    offseclangUpdateList: OffenderLanguages[] = [];
    offseclangDeleteList: OffenderLanguages[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled = false;
    editable: boolean;
    offSecLangColumnDef: any[];
    defaultValues: OffenderLanguages = new OffenderLanguages();
    rgpreflangRg: any[] = [];
    rgseclangRg: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offprimlangCommitModel: OffenderLanguagesCommitBean = new OffenderLanguagesCommitBean();
    offseclangCommitModel: OffenderLanguagesCommitBean = new OffenderLanguagesCommitBean();
    preflangwriteModelTempDsbl: OffenderLanguages = new OffenderLanguages();
    preflangwriteModelTempDsblOne: OffenderLanguages = new OffenderLanguages();
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    prefLangRemoveFlag: boolean;
    writeLangCode: any;
    speakLangCode: any;
    engPrefBlockDis: boolean;
    duplicateCount: number;
    linkFlag: boolean;
    engCompBlockSave: boolean;
    prefLangBlockSave: boolean;
    secLangInsert: boolean;
    prefLangLink: any;
    enableDelbtn: boolean;
    readSkillTemp: any;
    writeSkillTemp: any;
    speakSkillTemp: any;
    numeracySkillTemp: any;
    commentTextTemp: any;
    disCount: any;
    constructor(private ocdlangsFactory: OcdlangsService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService) {
        this.offSecLangColumnDef = [];
    }
    ngOnInit() {
        this.interpreterRequestedFlagTemp = null;
        this.speakLangCodeTemp = null;
        this.writeLanguageCodeTemp = null;
        this.disCount = 1;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.engPrefBlockDis = true;
        this.engCompBlockSave = true;
        this.prefLangBlockSave = true;
        this.linkFlag = false;
        //        this.offseclangData = [];
        //        this.offseclangData.push(new OffenderLanguages());
        //        this.offseclangData[0].readSkill = 'true';
        //        this.offseclangData[0].writeSkill = 'true';
        //        this.offseclangData[0].speakSkill = 'true';
        this.prefLangRemoveFlag = false;
        this.writeLangCode = this.writeLangCode ? this.writeLangCode : '';
        this.speakLangCode = this.speakLangCode ? this.speakLangCode : '';
        // const linkUrl = 'ocdlangs/rgSecLangRecordGroup?langCode=' + this.writeLangCode + '&langCode1=' + this.speakLangCode;
        this.prefLangLink = 'ocdlangs/rgPrefLangRecordGroup';
        this.offSecLangColumnDef = [
            {
                fieldName: this.translateService.translate('ocdlangs.language') + '*', field: 'languageCodeTemp',
                domain:"LANG", datatype: 'lov', editable: true, width: 350, cellEditable: this.canLangCellEdit
            },
            {
                fieldName: this.translateService.translate('ocdlangs.read'), field: 'readSkill',
                datatype: 'checkbox', cellEditable: this.canCellEdit, editable: true, width: 200
            },
            {
                fieldName: this.translateService.translate('ocdlangs.write'), field: 'writeSkill',
                datatype: 'checkbox', cellEditable: this.canCellEdit, editable: true, width: 200
            },
            {
                fieldName: this.translateService.translate('ocdlangs.speak'), field: 'speakSkill',
                datatype: 'checkbox', cellEditable: this.canCellEdit, editable: true, width: 200
            },
        ];
        /**
         * Below service call is used to get values from DB.
         * This is used to set default values when No data in Preferred Language Block
         */
        const rglangskillsServiceObj = this.ocdlangsFactory.getPreferredDefault();
        rglangskillsServiceObj.subscribe(rglangskillsList => {
            if (rglangskillsList.length === 0) {
            } else {
                this.defaultValues.languageCode = rglangskillsList.code;
                this.defaultValues.languageType = rglangskillsList.description;
            }
        });
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
        }
    }
    /**
     * event is fired when click on row in search block
     * param offender
     */
    onOffenderChange(offender) {
        if (offender) {
            this.vHeaderBlockModel = offender;
            this.engPrefBlockDis = false;
            this.offprimlangModel = new OffenderLanguages();
            this.preflangwriteModel = new OffenderLanguages();
            this.offprimlangModelTemp = new OffenderLanguages();
            this.preflangwriteModelTemp = new OffenderLanguages();
            this.offprimlangModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.preflangwriteModelTemp.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offprimlangExecuteQuery();
            this.preflangwriteExecuteQuery();
            this.preflangspeakExecuteQuery();
            this.offseclangExecuteQuery();

        } else {
            this.preflangwriteModel.languageCode = undefined;
            this.preflangspeakModel.languageCode = undefined;
            this.preflangspeakModel.interpreterRequestedFlag = undefined;
            this.offprimlangModel = new OffenderLanguages();
            this.preflangwriteModel = new OffenderLanguages();
            this.offseclangData = [];
           // this.offseclangData.push(new OffenderLanguages());
            //this.offseclangData[0].readSkill = 'true';
           // this.offseclangData[0].writeSkill = 'true';
           // this.offseclangData[0].speakSkill = 'true';
            this.engPrefBlockDis = true;
            this.vHeaderBlockModel = offender;
            this.engCompBlockSave = true;
            this.secLangInsert = false;
            this.prefLangBlockSave = true;
            this.speakLangCodeTemp = null;
            this.writeLanguageCodeTemp = null;
            this.interpreterRequestedFlagTemp = undefined;
        }
    }
    /**
     * Event is fired when try to edit the Language* field in the grid.
     */
    canLangCellEdit = (data: any, index: number, field: string): boolean => {
        if (!this.vHeaderBlockModel.offenderBookId) {
            return false;
        } else if (this.preflangwriteData.length === 0 || this.preflangspeakData.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * event is fired when try to edit the fields in Grid(Block is Secondary Languages)
     * when there is no data in this.vHeaderBlockModel we can't edit the data in Grid.
     */
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (!this.vHeaderBlockModel.offenderBookId) {
            return false;
        } else {
            return true;
        }
    }
    writeLangChange() {
        if (this.linkFlag) {
            if (this.preflangwriteModelTemp.languageCode) {
                this.writeLangCode = this.preflangwriteModelTemp.languageCode;
            } else {
                this.writeLangCode = '';
            }
            if (this.offprimlangModelTemp.languageCode) {
                this.speakLangCode = this.offprimlangModelTemp.languageCode;
            } else {
                this.speakLangCode = '';
            }
            // const linkUrl = 'ocdlangs/rgSecLangRecordGroup?langCode=' + this.writeLangCode + '&langCode1=' + this.speakLangCode;
            // this.offSecLangColumnDef[0].link = linkUrl;
            this.grid.prepareAgColumnDef();
        }

    }
    /**
     * This event is fired and get the data from DB for English Comprehension block when vHeaderBlockModel has data.
     * param offprimlangModelTemp
     */
    offprimlangExecuteQuery() {
        const offprimlangResult = this.ocdlangsFactory.
            offPrimLangExecuteQuery(this.offprimlangModelTemp);
        offprimlangResult.subscribe(data => {
            if (data.length === 0) {
                this.offprimlangData = [];
                this.offprimlangModel = new OffenderLanguages();
                this.engCompBlockSave = true;
                this.disCount++;
            } else {
                this.offprimlangData = [];
                this.offprimlangData = data;
                this.offprimlangModel = new OffenderLanguages();
                this.offprimlangModel = this.offprimlangData[0];
                this.engCompBlockSave = true;
                this.readSkillTemp = this.offprimlangModel.readSkill;
                this.writeSkillTemp = this.offprimlangModel.writeSkill;
                this.speakSkillTemp = this.offprimlangModel.speakSkill;
                this.numeracySkillTemp = this.offprimlangModel.numeracySkill;
                this.commentTextTemp = this.offprimlangModel.commentText;
                this.disCount++;
            }
        });
    }
    /**
    *  This function will be executed when click on save in English Comprehension block.
    * used to insert,update and delete the data in OFFENDER_LANGUAGES TABLE.
    */
    ocdlangsSaveoffprimlangForm() {
        this.offprimlangInsertList = [];
        this.offprimlangUpdatetList = [];
        this.offprimlangDeleteList = [];
        if (!this.engCompBlockSave) {
            if (!this.offprimlangModel.offenderBookId && !this.offprimlangModel.languageCode && !this.offprimlangModel.languageType) {
                this.offprimlangModel.languageCode = 'ENG';
                this.offprimlangModel.languageType = 'PRIM';
                this.offprimlangModel.preferedWriteFlag = 'N';
                this.offprimlangModel.preferedSpeakFlag = 'N';
                this.offprimlangModel.interpreterRequestedFlag = 'N';
                this.offprimlangModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offprimlangInsertList.push(this.offprimlangModel);
            } else if (!this.offprimlangModel.commentText && !this.offprimlangModel.readSkill && !this.offprimlangModel.writeSkill
                && !this.offprimlangModel.speakSkill && !this.offprimlangModel.numeracySkill) {
                this.offprimlangDeleteList.push(this.offprimlangModel);
            } else {
                this.offprimlangUpdatetList.push(this.offprimlangModel);
            }
            this.offprimlangCommitModel.updateList = [];
            this.offprimlangCommitModel.insertList = [];
            this.offprimlangCommitModel.deleteList = [];
            this.offprimlangCommitModel.insertList = this.offprimlangInsertList;
            this.offprimlangCommitModel.updateList = this.offprimlangUpdatetList;
            this.offprimlangCommitModel.deleteList = this.offprimlangDeleteList;
            const offnameSaveData = this.ocdlangsFactory.offPrimLangCommit(this.offprimlangCommitModel);
            offnameSaveData.subscribe(data => {
                if (data === 0) {
                    this.type = 'error';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                } else {
                    this.type = 'success';
                    this.engCompBlockSave = true;
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    return;
                }
            });
        }
    }
    /**
     * event is fired when click on Remove in English Comprehension block.
     * used to remove the data.
     */
    clearOffprimlangForm() {
        this.offprimlangModel.readSkill = undefined;
        this.offprimlangModel.writeSkill = undefined;
        this.offprimlangModel.speakSkill = undefined;
        this.offprimlangModel.numeracySkill = undefined;
        this.offprimlangModel.commentText = undefined;
    }
    /**
     * event is fired when click on Remove in Preferred Language block.
     * used to remove the data.
     */
    clearpreflangwriteForm() {
        this.prefLangRemoveFlag = true;
        this.preflangwriteModel.languageCode = this.preflangwriteModel.languageCode === undefined ? '' : undefined;
        this.preflangspeakModel.languageCode = this.preflangspeakModel.languageCode === undefined ? '' : undefined;
        this.preflangspeakModel.interpreterRequestedFlag = undefined;
        this.offseclangExecuteQuery();
    }
    /**
     * Used to set the default values when click on any field in Preferred Language block.
     *  default values are getting from getPreferredDefault service call.
     */
    setDefaultValues() {
        // this.disabled = false;
        // if (this.vHeaderBlockModel.offenderBookId) {
        //     if (this.preflangwriteModel.languageCode || this.preflangspeakModel.languageCode) {
        //         this.disabled = true;
        //     }
        //     if (!this.disabled) {
        //         if (!this.preflangwriteModel.languageCode) {
        //             this.disabled = true;
        //             this.preflangwriteModel.languageCode = this.defaultValues.languageCode;
        //         }
        //         if (!this.preflangspeakModel.languageCode) {
        //             this.disabled = true;
        //             this.preflangspeakModel.languageCode = this.defaultValues.languageCode;
        //         }
        //     }
        // } 
    }
    /**
     * event is fired when foxus lost the any field in Preferred Language Block.
     */
    validatePrefLangBlock() {
        if (!this.preflangwriteModel.languageCode) {
            this.preflangwriteModel.languageCode = this.preflangwriteModel.languageCode === undefined ? '' : undefined;
        }
        if (!this.preflangspeakModel.languageCode) {
            this.preflangspeakModel.languageCode = this.preflangspeakModel.languageCode === undefined ? '' : undefined;
        }
    }
    /**
     * event is fired when foxus lost the any field in English Comprehension Block.
     */
    validateEnglishCompBlock() {
        if (!this.offprimlangModel.readSkill) {
            this.offprimlangModel.readSkill = this.offprimlangModel.readSkill === undefined ? '' : undefined;
        }
        if (!this.offprimlangModel.writeSkill) {
            this.offprimlangModel.writeSkill = this.offprimlangModel.writeSkill === undefined ? '' : undefined;
        }
        if (!this.offprimlangModel.speakSkill) {
            this.offprimlangModel.speakSkill = this.offprimlangModel.speakSkill === undefined ? '' : undefined;
        }
        if (!this.offprimlangModel.numeracySkill) {
            this.offprimlangModel.numeracySkill = this.offprimlangModel.numeracySkill === undefined ? '' : undefined;
        }
    }
    /*
   * This method is used to show popup messages.
   */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    /**
     * This event is fired and get the data from DB for Preferred Language block when vHeaderBlockModel has data.
     * param preflangwriteModelTemp
     */
    preflangwriteExecuteQuery() {
        const preflangwriteResult = this.ocdlangsFactory.
            prefLangWriteExecuteQuery(this.preflangwriteModelTemp);
        preflangwriteResult.subscribe(data => {
            if (data.length === 0) {
                this.preflangwriteData = [];
                this.preflangwriteModel = new OffenderLanguages();
                this.prefLangBlockSave = true;
                this.secLangInsert = false;
            } else {
                this.secLangInsert = true;
                this.linkFlag = true;
                this.preflangwriteData = [];
                this.preflangwriteData = data;
                this.preflangwriteModel = new OffenderLanguages();
                this.preflangwriteModel = this.preflangwriteData[0];
                this.preflangwriteModelTemp.languageCode = this.preflangwriteModel.languageCode;
                this.writeLanguageCodeTemp = this.preflangwriteModel.languageCode;
                this.preflangwriteModelTempDsbl.languageCode=this.preflangwriteModel.languageCode;
                this.writeLangChange();
            }
        });
    }
    /**
    *  This function will be executed when click on save in Preferred Language block.
    * used to insert,update and delete the data in OFFENDER_LANGUAGES TABLE.
    * shows some validation when mandatory fields not provided.
    */
    ocdlangsSavepreflangwriteForm() {
        this.preflangwriteCommitModel.insertList = [];
        this.preflangwriteCommitModel.updateList = [];
        this.preflangwriteCommitModel.deleteList = [];
        this.preflangwriteInsertList = [];
        this.preflangwriteUpdatetList = [];
        this.preflangwriteDeleteList = [];
        if (!this.preflangwriteModel.languageCode || this.preflangwriteModel.languageCode === '' ||this.preflangwriteModel.languageCode === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdlangs.preferredlanguagewrittenmustbeentered');
            this.show();
            return;
        }
        if (!this.preflangspeakModel.languageCode || this.preflangspeakModel.languageCode === '' ||this.preflangspeakModel.languageCode === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('ocdlangs.preferredlanguagespokenmustbeentered');
            this.show();
            return;
        }
        if (!this.prefLangBlockSave) {
            if (!this.prefLangRemoveFlag) {
                if (!this.preflangwriteModel.languageCode || this.preflangwriteModel.languageCode === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdlangs.preferredlanguagewrittenmustbeentered');
                    this.show();
                    return;
                }
                if (!this.preflangspeakModel.languageCode || this.preflangspeakModel.languageCode === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdlangs.preferredlanguagespokenmustbeentered');
                    this.show();
                    return;
                }
            }
            if (!this.preflangwriteModel.offenderBookId && !this.preflangwriteModel.languageType) {
                this.preflangwriteModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.preflangwriteModel.languageType = 'PREF_WRITE';
                this.preflangwriteModel.preferedWriteFlag = 'Y';
                this.preflangwriteModel.readSkill = 'N';
                this.preflangwriteModel.writeSkill = 'N';
                this.preflangwriteModel.speakSkill = 'N';
                this.preflangwriteModel.preferedSpeakFlag = 'N';
                this.preflangwriteModel.interpreterRequestedFlag = 'N';
                this.preflangwriteInsertList.push(this.preflangwriteModel);
            } else if (!this.preflangwriteModel.languageCode && this.prefLangRemoveFlag) {
                this.preflangwriteDeleteList.push(this.preflangwriteModel);
            } else {
                this.preflangwriteUpdatetList.push(this.preflangwriteModel);
            }
            if (!this.preflangspeakModel.offenderBookId && !this.preflangspeakModel.languageType) {
                this.preflangspeakModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.preflangspeakModel.languageType = 'PREF_SPEAK';
                this.preflangspeakModel.preferedWriteFlag = 'N';
                this.preflangspeakModel.preferedSpeakFlag = 'Y';
                this.preflangspeakModel.readSkill = 'N';
                this.preflangspeakModel.writeSkill = 'N';
                this.preflangspeakModel.speakSkill = 'N';
                if (this.preflangspeakModel.interpreterRequestedFlag) {
                    this.preflangspeakModel.interpreterRequestedFlag = 'Y';
                } else {
                    this.preflangspeakModel.interpreterRequestedFlag = 'N';
                }
                this.preflangwriteInsertList.push(this.preflangspeakModel);

            } else if (!this.preflangspeakModel.languageCode && this.prefLangRemoveFlag) {
                this.preflangwriteDeleteList.push(this.preflangspeakModel);
            } else {
                if (this.preflangspeakModel.interpreterRequestedFlag) {
                    this.preflangspeakModel.interpreterRequestedFlag = 'Y';
                } else {
                    this.preflangspeakModel.interpreterRequestedFlag = 'N';
                }
                this.preflangwriteUpdatetList.push(this.preflangspeakModel);
            }
            this.preflangwriteCommitModel.insertList = this.preflangwriteInsertList;
            this.preflangwriteCommitModel.updateList = this.preflangwriteUpdatetList;
            this.preflangwriteCommitModel.deleteList = this.preflangwriteDeleteList;
            this.prefLangCommitQuery();
        }

    }
    prefLangCommitQuery() {
        const preflangwriteSaveData = this.ocdlangsFactory.prefLangWriteCommit(this.preflangwriteCommitModel);
        preflangwriteSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.prefLangRemoveFlag = false;
                // this.preflangwriteModel = new OffenderLanguages();
                // this.preflangspeakModel = new OffenderLanguages();
                this.preflangwriteExecuteQuery();
                this.preflangspeakExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    /**
     * This event is fired and get the data from DB for Preferred Language block when vHeaderBlockModel has data.
     * param preflangwriteModelTemp
     */
    preflangspeakExecuteQuery() {
        const preflangspeakResult = this.ocdlangsFactory.
            prefLangSpeakExecuteQuery(this.preflangwriteModelTemp);
        preflangspeakResult.subscribe(preflangspeakResultList => {
            if (preflangspeakResultList.length === 0) {
                this.preflangspeakData = [];
                this.preflangspeakModel = new OffenderLanguages();
                this.prefLangBlockSave = true;
            } else {
                for (let i = 0; i < preflangspeakResultList.length; i++) {
                    if (preflangspeakResultList[i].interpreterRequestedFlag === 'N') {
                        const intReqFlag = false;
                        preflangspeakResultList[i].interpreterRequestedFlag = intReqFlag;
                    } else {
                        const intReqFlagTemp = true;
                        preflangspeakResultList[i].interpreterRequestedFlag = intReqFlagTemp;
                    }

                }
                this.preflangspeakData = [];
                this.linkFlag = true;
                this.preflangspeakData = preflangspeakResultList;
                this.preflangspeakModel = new OffenderLanguages();
                this.preflangspeakModel = this.preflangspeakData[0];
                this.offprimlangModelTemp.languageCode = this.preflangspeakModel.languageCode;
                this.speakLangCodeTemp = this.preflangspeakModel.languageCode;
                this.interpreterRequestedFlagTemp = this.preflangspeakModel.interpreterRequestedFlag;
                this.preflangwriteModelTempDsblOne.languageCode=this.preflangspeakModel.languageCode;
                this.preflangwriteModelTempDsblOne.interpreterRequestedFlag=this.preflangspeakModel.interpreterRequestedFlag;
                this.writeLangChange();
            }
        });
    }
    get prefLangBlockSaveOne() {
        const temp = this.preflangwriteModel.languageCode ? this.preflangwriteModel.languageCode : null;
        const temp1 = this.preflangspeakModel.languageCode ? this.preflangspeakModel.languageCode : null;
        if (this.writeLanguageCodeTemp != temp ||
            this.speakLangCodeTemp != temp1 ||
            this.interpreterRequestedFlagTemp != this.preflangspeakModel.interpreterRequestedFlag) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * event is fired when select the values from LOV in English Comprehension block fields.
     * Save button will be enable.
     */
    engReadValueChange() {
        const temp = this.offprimlangModel.readSkill ? this.offprimlangModel.readSkill : null;
        const temp1 = this.offprimlangModel.writeSkill ? this.offprimlangModel.writeSkill : null;
        const temp2 = this.offprimlangModel.speakSkill ? this.offprimlangModel.speakSkill : null;
        const temp3 = this.offprimlangModel.numeracySkill ? this.offprimlangModel.numeracySkill : null;
        const temp4 = this.offprimlangModel.commentText === "" ? null : this.offprimlangModel.commentText;
        if (this.vHeaderBlockModel.offenderBookId) {
            if (this.readSkillTemp !== temp ||
                this.writeSkillTemp !== temp1 ||
                this.speakSkillTemp !== temp2 ||
                this.numeracySkillTemp !== temp3 ||
                this.commentTextTemp !== temp4) {

                this.engCompBlockSave = false;
            } else {
                this.engCompBlockSave = true;
            }
        }
    }
    /**
     * event is fired when select the values from LOV in Preferred Language block fields.
     * Save button will be enable.
     */
    prefLangValueChange() {
        if (this.vHeaderBlockModel.offenderBookId) {
               
            if (this.preflangspeakModel.languageCode || this.preflangwriteModel.languageCode) {
                if (!this.disabled) {
                    if (!this.preflangwriteModel.languageCode) {
                        this.preflangwriteModel.languageCode = null;
                    }
                    if (!this.preflangspeakModel.languageCode) {
                        this.preflangspeakModel.languageCode = null;
                    }
                }
                this.prefLangBlockSave = false;
            } else {
                this.prefLangBlockSave = false;
            }
        }
    }
    /**
     * event is fired when insert the data in Comment in English Comprehension block and save button will be enable
     */
    commentValueChange() {
        if (this.vHeaderBlockModel.offenderBookId) {
            if (this.offprimlangModel.commentText) {
                this.engCompBlockSave = false;
            } else {
                this.engCompBlockSave = false;
            }
        }
    }
    /**
     * event is fired when click on Add button in grid in the block Secondary Languages.
     */
    onSecLangInsert = () => {
        if (this.preflangwriteData.length === 0 || this.preflangspeakData.length === 0) {
            return false;
        }
        if (this.offseclangData.length > 0) {
            if (!this.offseclangData[this.offseclangData.length - 1].languageCodeTemp) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidshlog.enterorremoved');
                this.show();
                return;
            }
        }
        return { readSkill: true, writeSkill: true, speakSkill: true };
    }
    /**
     * This event is fired and get the data from DB for Secondary Languages block when vHeaderBlockModel has data.
     * param offprimlangModelTemp
     */
    offseclangExecuteQuery() {
        const offseclangResult = this.ocdlangsFactory.
            offSecLangExecuteQuery(this.offprimlangModelTemp);
        offseclangResult.subscribe(offseclangResultList => {
            //            if (offseclangResultList.length === 0) {
            //                this.offseclangData = [];
            //                this.offseclangData.push(new OffenderLanguages());
            //                this.offseclangData[0].readSkill = 'true';
            //                this.offseclangData[0].writeSkill = 'true';
            //                this.offseclangData[0].speakSkill = 'true';
            //            } else {
            this.offseclangData = [];
            for (let i = 0; i < offseclangResultList.length; i++) {
                if (offseclangResultList[i].readSkill && offseclangResultList[i].readSkill === 'Y') {
                    offseclangResultList[i].readSkill = true;
                } else {
                    offseclangResultList[i].readSkill = false;
                }
                if (offseclangResultList[i].writeSkill && offseclangResultList[i].writeSkill === 'Y') {
                    offseclangResultList[i].writeSkill = true;
                } else {
                    offseclangResultList[i].writeSkill = false;
                }
                if (offseclangResultList[i].speakSkill && offseclangResultList[i].speakSkill === 'Y') {
                    offseclangResultList[i].speakSkill = true;
                } else {
                    offseclangResultList[i].speakSkill = false;
                }
            }
            this.offseclangData = offseclangResultList;
            this.offseclangModel = offseclangResultList[0];
            this.offseclangIndex = 0;
            //            }
        });
    }
    /**
    *  This function will be executed when click on save in Secondary Languages block.
    * used to insert,update and delete the data in OFFENDER_LANGUAGES TABLE.
    * it shows some validations when mandatory field does not give or try to insert or update duplicate language.
    */
    ocdlangsSaveoffseclangForm(event) {
        this.duplicateCount = 0;
        this.offseclangInsertList = [];
        this.offseclangUpdateList = [];
        this.offseclangDeleteList = [];
        this.offseclangInsertList = event.added;
        this.offseclangDeleteList = event.removed;
        for (let i = 0; i < event.updated.length; i++) {
            if (!event.updated[i].offenderBookId) {
                this.offseclangInsertList = event.updated;

            } else {
                this.offseclangUpdateList = event.updated;
            }
        }
        this.offseclangCommitModel.insertList = [];
        this.offseclangCommitModel.updateList = [];
        this.offseclangCommitModel.deleteList = [];
        if (this.offseclangInsertList.length > 0 || this.offseclangUpdateList.length > 0) {
            for (let i = 0; i < this.offseclangInsertList.length; i++) {
                if (!this.offseclangInsertList[i].languageCodeTemp) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('ocdlangs.languagemustbeentered');
                    this.show();
                    return;
                }
                this.offseclangInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offseclangInsertList[i].languageType = 'SEC';
                this.offseclangInsertList[i].preferedWriteFlag = 'N';
                this.offseclangInsertList[i].preferedSpeakFlag = 'N';
                this.offseclangInsertList[i].interpreterRequestedFlag = 'N';
                if (this.offseclangInsertList[i].readSkill) {
                    this.offseclangInsertList[i].readSkill = 'Y';
                } else {
                    this.offseclangInsertList[i].readSkill = 'N';
                }
                if (this.offseclangInsertList[i].writeSkill) {
                    this.offseclangInsertList[i].writeSkill = 'Y';
                } else {
                    this.offseclangInsertList[i].writeSkill = 'N';
                }
                if (this.offseclangInsertList[i].speakSkill) {
                    this.offseclangInsertList[i].speakSkill = 'Y';
                } else {
                    this.offseclangInsertList[i].speakSkill = 'N';
                }


            }
            for (let i = 0; i < this.offseclangUpdateList.length; i++) {
                if (this.offseclangUpdateList[i].readSkill) {
                    this.offseclangUpdateList[i].readSkill = 'Y';
                } else {
                    this.offseclangUpdateList[i].readSkill = 'N';
                }
                if (this.offseclangUpdateList[i].writeSkill) {
                    this.offseclangUpdateList[i].writeSkill = 'Y';
                } else {
                    this.offseclangUpdateList[i].writeSkill = 'N';
                }
                if (this.offseclangUpdateList[i].speakSkill) {
                    this.offseclangUpdateList[i].speakSkill = 'Y';
                } else {
                    this.offseclangUpdateList[i].speakSkill = 'N';
                }
            }
            for (let i = 0; i < this.offseclangData.length; i++) {
                for (let j = 0; j < this.offseclangData.length; j++) {
                    if (i !== j && this.offseclangData[i].languageCodeTemp === this.offseclangData[j].languageCodeTemp) {
                        this.duplicateCount++;
                        if (this.duplicateCount > 1) {
                            this.type = 'warn';
                            this.message = this.translateService.translate('ocdlangs.secondarylanguagealreadyexists');
                            this.show();
                            return;
                        }
                    }
                }
            }
        }
        if (this.offseclangDeleteList.length > 0) {
            for (let i = 0; i < this.offseclangDeleteList.length; i++) {
                this.offseclangDeleteList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
            }
        }
        this.offseclangCommitModel.insertList = this.offseclangInsertList;
        this.offseclangCommitModel.updateList = this.offseclangUpdateList;
        this.offseclangCommitModel.deleteList = this.offseclangDeleteList;
        const offseclangSaveData = this.ocdlangsFactory.offSecLangCommit(this.offseclangCommitModel);
        offseclangSaveData.subscribe(data => {
            if (data === 1) {
                this.duplicateCount = 0;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offseclangExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    engCompBlockRemoveOne() {
        if (this.offprimlangModel.readSkill || this.offprimlangModel.writeSkill || this.offprimlangModel.speakSkill
            || this.offprimlangModel.numeracySkill || this.offprimlangModel.commentText) {
            return false;
        }
        return true;
    }
    prefLangBlockRemoveOne() {
        if (this.preflangwriteModel.languageCode || this.preflangspeakModel.languageCode) {
            return false;
        }
        return true;
    }
    onRowClickOffSec(event) {
        if (event) {
            if (!event.createDatetime) {
                this.enableDelbtn = true;
            } else {
                this.enableDelbtn = false;
            }
        }
    }

    prefLangBlockSaveFun() {
        if ((this.preflangwriteModel.languageCode != this.preflangwriteModelTempDsbl.languageCode) ||
            (this.preflangspeakModel.languageCode != this.preflangwriteModelTempDsblOne.languageCode) ||
             (this.preflangwriteModelTempDsblOne.interpreterRequestedFlag!=this.preflangspeakModel.interpreterRequestedFlag)) {
            return false;
        } else {
            return true;
        }
    }

}
