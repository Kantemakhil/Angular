import { DateAdapter } from '@angular/material/core';
import {
    Component, OnInit,ViewChild
} from '@angular/core';
import { Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { TranslateService } from '@common/translate/translate.service';
import { OcdaliasService } from '@inst/demographics-biometrics/service/ocdalias.service';
import { Offenders } from '@commonbeans/Offenders';
import { OffenderIdentifier } from '@instdemographicsbeans/OffenderIdentifier';
import { OffendersCommitBean } from '@instdemographicsbeans/OffendersCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderIdentifiersCommitBean } from '@instdemographicsbeans/OffenderIdentifiersCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OidmbrdtService } from '@inst/securitythreatgroups/service/oidmbrdt.service';

@Component( {
    selector: 'app-ocdalias',
    templateUrl: './ocdalias.component.html'
} )

export class OcdaliasComponent implements OnInit, OnDestroy {
    returnDelFlag: Boolean;
    gridOptions: GridOptions;
    index: number;
    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offnameData: Offenders[] = [];
    offnameDataTemp: Offenders[] = [];
    offnameModel: Offenders = new Offenders();
    offnameModelTemp: Offenders = new Offenders();
    offnameIndex = 0;
    offAliasIndex = -1;
    offnameInsertList: Offenders[] = [];
    offnameUpdatetList: Offenders[] = [];
    offnameDeleteList: Offenders[] = [];
    offidData: OffenderIdentifier[] = [];
    offidDataTemp: OffenderIdentifier[] = [];
    offidModel: OffenderIdentifier = new OffenderIdentifier();
    selectedIdenti: OffenderIdentifier = new OffenderIdentifier();
    offnameCommitModel: OffendersCommitBean = new OffendersCommitBean();
    offidIndex = -1;
    offidInsertList: OffenderIdentifier[] = [];
    offidUpdatetList: OffenderIdentifier[] = [];
    offidDeleteList: OffenderIdentifier[] = [];
    offidallData: OffenderIdentifier[] = [];
    offidallDataTemp: OffenderIdentifier[] = [];
    offidallModel: OffenderIdentifier = new OffenderIdentifier();
    offidallIndex = 0;
    offidallInsertList: OffenderIdentifier[] = [];
    offidallUpdatetList: OffenderIdentifier[] = [];
    offidallDeleteList: OffenderIdentifier[] = [];
    reqnameIndex = 0;
    offbkg1Index = 0;
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    disabledIdentifiers: boolean;
    showDisabled: boolean;
    editable = true;
    aliasColumnDefs: any[] = [];
    identColumnDefs: any[] = [];
    allIdentColumnDefs: any[] = [];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    selectedOffender: Offenders = new Offenders();
    totalVal = 0;
    aliasFlag = false;
    indexValIdentifier = -1;
    changeWorkingNameObj: VHeaderBlock = new VHeaderBlock();
    totalValIdentifier = -1;
    vHeaderBlockModel: VHeaderBlock;
    birthDate: any;
    age: any;
    birthDateValue: any;
    offenderObj: Offenders = new Offenders();
    newOffenderObj: Offenders = new Offenders();
    isshowing = false;
    indexVal: number;
    VHeaderBlockOffenderTemp: VHeaderBlock = new VHeaderBlock();
    VHeaderBlockTemp: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    offenderID: number;
    checkedColumn = false;
    beginDateTemp: any;
    raceTypeRg: any[];
    identifierFlag = false;
    offIdentifiersDelListData: OffenderIdentifier[] = [];
    offenderDelListData: Offenders[] = [];
    offenderIdList: any[] = [];
    offenderTemp: Offenders;
    count = 1;
    disable: boolean;
    workFlag:boolean;
    disableShow: boolean;
    identifersTypeLOV: any[] = [];
    offnameModelDuplicate: Offenders;
    checkFlag: boolean;
    offidCommitModel: OffenderIdentifiersCommitBean = new OffenderIdentifiersCommitBean();
    identifierName: any;
    gender: any;
    check: any;
    id: any;
    rowindex: any;
    idLength: any;
    flag: false;
    aliasInsert: boolean;
    identInsert: boolean;
    offAllIndentifierTemp: any[] = [];
    vAgeFrom: number;
    vAgeTo: number;
    ageLimitFlag: boolean;
    field:any;
    ch:number=0;
    countCheck=0;
    birthDateValid: boolean;
    backBtn = false;
    notAllowChars = ["0","1","2","3","4","5","6","7","8","9","`","~","!","@","#","$","%","^","&","*","(",")","_","+","=","{","[","}","]","|",
    "<",">",",",".","?","/",":",";",'"',"\\"];
    @ViewChild('aliases') aliases: any;
    indentDelete: boolean;
    constructor( private ocdaliasFactory: OcdaliasService, private router: Router,
        public translateService: TranslateService, private dateAdapter: DateAdapter<Date>,
        private renderer: Renderer2, private offenderSearchService: OffenderSearchService,
         private sessionManager: UserSessionManager, public dialogService: DialogService,
         private oidmbrdtFactory: OidmbrdtService ) {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }
    ngOnInit() {
        if (this.oidmbrdtFactory.viewBtnFlag) {
            this.backBtn = true;
        }
        this.birthDateValid = true;
        this.ageLimitFlag = true;
        this.disable = true;
        this.disableShow = true;
        this.disabled = false;
        this.disabledIdentifiers = false;
        this.isshowing = false;
        this.identifierName = this.translateService.translate( 'ocdalias.identifiers' );
        this.aliasColumnDefs = [
            {
                fieldName: this.translateService.translate( 'system-profile.name-last' ) + '*', id: 'aliaslname', field: 'lastName',
                editable: true, datatype: 'text', maxlength: 35, required: true, width: 150, cellEditable: this.canAliasEdit, uppercase: 'false', restrictCharacters : this.notAllowChars
            },
            {
                fieldName: this.translateService.translate( 'system-profile.name-given-1' ), id: 'aliasFName', field: 'firstName',
                editable: true, datatype: 'text', maxlength: 35, width: 150, cellEditable: this.canAliasEdit, uppercase: 'false', restrictCharacters : this.notAllowChars
            },
            {
                fieldName: this.translateService.translate( 'system-profile.name-given-2' ), id: 'aliasMName', field: 'middleName',
                editable: true, datatype: 'text', maxlength: 35, width: 150, cellEditable: this.canAliasEdit, uppercase: 'false', restrictCharacters : this.notAllowChars
            },
            {
                fieldName: this.translateService.translate( 'ocdalias.secondmiddlename' ), id: 'aliasSMName', field: 'secondMiddleName',
                editable: true, datatype: 'text', maxlength: 35, width: 150, cellEditable: this.canAliasEdit,uppercase: 'false', restrictCharacters : this.notAllowChars
            },
            {
                fieldName: this.translateService.translate( 'ocdalias.suffix' ), id: 'aliasSuffix', field: 'suffix', datatype: 'lov',
                domain: 'SUFFIX', editable: true, width: 130, optionWidth: 300, titles: { description: 'Description',code: 'Code'},
                cellEditable: this.canCellEditable
            },
            {
                fieldName: this.translateService.translate( 'system-profile.birth-date' ) + '*', id: 'aliasDob', field: 'birthDate',
                editable: true, datatype: 'date', width: 150, cellEditable: this.canBirthDateEdit
            },
            {
                fieldName: this.translateService.translate( 'common.age' ), field: 'age', id: 'aliasAge', datatype: 'number',
                editable: false, width: 85, cellEditable: this.canAgeEditable
            },
            {
                fieldName: this.translateService.translate( 'ocdalias.sex' ) + '*', id: 'aliasSexCode', field: 'sexCode',
                datatype: 'lov', domain: 'SEX', editable: true, width: 120, optionWidth: 300, cellEditable: this.canCellEditable
            },
            {
                fieldName: this.translateService.translate( 'ocdalias.gender' ) , id: 'aliasGenderCode', field: 'genderCode',
                datatype: 'lov', domain: 'GENDER', editable: true, width: 120, optionWidth: 300, cellEditable: this.canCellEditable
            },
            {
                fieldName: this.translateService.translate( 'system-profile.pers-id-race' ), id: 'aliasRaceCode', field: 'raceCode',
                editable: true, datatype: 'lov', domain: 'ETHNICITY', width: 150 , optionWidth: 300, cellEditable: this.canCellEditable
            },
            {
                fieldName: this.translateService.translate( 'ocdalias.nametype' ), id: 'aliasNameType', field: 'aliasNameType',
                editable: true, datatype: 'lov', domain: 'NAME_TYPE', width: 150, optionWidth: 300, cellEditable: this.canCellEditable
            },
            {
                fieldName: this.translateService.translate( 'ocdalias.workingname' ), id: 'aliasColCheck', field: 'aliasColEditCheck',
                editable: true, datatype: 'checkbox', width: 150, optionWidth: 300, //cellEditable: this.canCellEditable
            },
        ];
        this.identColumnDefs = [
            {
                fieldName: this.translateService.translate( 'common.type' ) + '*', id: 'aliasIdType', field: 'identifierType',
                datatype: 'lov', domain: 'ID_TYPE', editable: 'true', required: true, width: 300, optionWidth: 400,cellEditable: this.canIndentifiersCellEditable
            },
            {
                fieldName: this.translateService.translate( 'common.number' ) + '*', id: 'aliasId', field: 'identifier',
                editable: 'true', datatype: 'text', maxlength: 20, required: true, width: 300, mask: this.getMask,cellEditable: this.canIndentifiersCellEditable
            },
            {
                fieldName: this.translateService.translate( 'common.comments' ), id: 'aliasComment', field: 'issuedAuthorityText',
                editable: true, datatype: 'text', maxlength: 240, uppercase: 'false', width: 300,cellEditable: this.canIndentifiersCellEditable
            },
            {
                fieldName: this.translateService.translate( 'common.verify' ), id: 'aliasVerify', field: 'verifiedFlag1',
                editable: true, datatype: 'checkbox', width: 300,cellEditable: this.canIndentifiersCellEditable
            },
        ];
        this.allIdentColumnDefs = [
            {
                fieldName: this.translateService.translate( 'common.type' ), id: 'allaliasIdType', field: 'identifierType',
                datatype: 'lov', domain: 'ID_TYPE', editable: false, required: true, width: 300, optionWidth: 400
            },
            {
                fieldName: this.translateService.translate( 'common.number' ), id: 'allaliasId', field: 'identifier',
                editable: false, datatype: 'text', maxlength: 20, required: true, width: 300, mask: this.getMask
            },
            {
                fieldName: this.translateService.translate( 'common.comment' ), id: 'allaliasComment', field: 'issuedAuthorityText',
                editable: false, datatype: 'text', maxlength: 240, width: 300
            },
            {
                fieldName: this.translateService.translate( 'common.verify' ), id: 'allaliasVerify', field: 'verifiedFlag1',
                editable: false, datatype: 'checkbox', width: 300
            },
        ];
        if ( !this.vHeaderBlockModel ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
        }
        const sysProfService = this.ocdaliasFactory.vsRangeCursor().subscribe(sysData => {
            if (sysData) {
                this.vAgeFrom = 0;
                this.vAgeTo = 0;
                this.vAgeFrom = Number(sysData.profileValue);
                this.vAgeTo = Number(sysData.profileValue2);
            }

        });
    }

    /**
     * This function loads the data into the header
     */
    onOffenderChange( offender ) {
        this.vHeaderBlockModel = offender;
        if ( offender ) {
            this.checkFlag = true;
            this.disable = true;
            this.populateDetails();
            this.offidData = [];
            this.identifierName = this.translateService.translate( 'ocdalias.identifiers' );
            this.disableShow = false;
        } else {
            this.offnameData = [];
            this.offidData = [];
            this.identifierName = this.translateService.translate( 'ocdalias.identifiers' );
            this.disableShow = true;
            this.birthDateValid = true;
        }
    }

    /**
     * This function loads the data into the Master Record
     */
    populateDetails() {
        this.indexVal = 0;
        this.isshowing = false;
        if (this.vHeaderBlockModel) {
            if ( !this.vHeaderBlockModel.rootOffenderId ) {
                this.id = this.vHeaderBlockModel.offenderIdDisplay;
                this.vHeaderBlockModel.rootOffenderId = this.id;
            }
        }
        if ( this.vHeaderBlockModel.rootOffenderId === undefined ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
        } else {
            this.disabled = false;
        }
        this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
        this.offenderObj.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
        if ( this.offenderObj.rootOffenderId !== undefined && this.offenderObj.rootOffenderId > 0 ) {
            const aliasServiceObj = this.ocdaliasFactory.offNameExecuteQuery( this.offenderObj );
            aliasServiceObj.subscribe( ExData => {
                this.offnameData = [];
                this.offnameModel = new Offenders();
                if ( ExData ) {
                    this.check = (ExData.length === 1) ? false : true;
                    this.rowindex = ExData.length;
                    for ( let i = 0; i < ExData.length; i++ ) {
                        if ( ExData[i].aliasColEditCheck === true ) {
                            this.offnameModelTemp = ExData[i];
                            const genDes = this.ocdaliasFactory.getGenderDescription();
                            genDes.subscribe( res => {
                                if ( res ) {
                                    const sexCode = this.offnameModelTemp.sexCode;
                                    for ( let j = 0; j < res.length; j++ ) {
                                        if (  sexCode === res[j].code ) {
                                            this.vHeaderBlockModel.sex = res[j].description;
                                        }
                                    }
                                }
                            } );
                        }
                    }
                    this.aliasInsert = true;
                    this.offnameData = ExData;
                    this.offAliasIndex = 0;
                    this.offnameIndex = this.offnameData.length;
                } else {
                    this.aliasInsert = true;
                    this.offnameData = [];
                    this.type = 'info';
                    this.message = this.translateService.translate( 'common.querycaused' );
                    this.show();
                    return;
                }
            } );
        }
    }


    /**
    * This function loads the data from Master Record to its child records
    */
    ocdaliasPopulateDetails() {
        const serviceObj = this.ocdaliasFactory.offIdExecuteQuery( this.offnameModel );
        serviceObj.subscribe( data => {
            this.offidData = [];
            for ( let i = 0; i < data.length; i++ ) {
                data[i].verifiedFlag1 = data[i].verifiedFlag === 'Y' ? true : false;
            }
            if ( data ) {
                this.idLength = data.length;
                this.offidIndex = 0;
                this.offidData = data;
                this.totalValIdentifier = this.offidData.length;
                this.offidDataTemp = data;
            } else {
                this.totalValIdentifier = this.offidData.length;
                this.indexValIdentifier = 0;
                this.offidDataTemp = data;
                this.idLength = data.length;
            }
        } );
        this.offAllIndentifierTemp = [];
         this.offenderTemp = new Offenders();
         this.offenderTemp.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            const serviceOffObj = this.ocdaliasFactory.offIdAllExecuteQuery( this.offenderTemp );
            serviceOffObj.subscribe(offData => {
                if (offData !== undefined) {
                    for (let i = 0; i < offData.length; i++) {
                   this.offAllIndentifierTemp.push({
                        'identifier':
                        offData[i].identifier, 'identifierType': offData[i].identifierType
                    });
                    }
                }
            });
    }

    isEqualValue(value1, value2){
        const val1 = (value1 !== null && value1 !== undefined) ? value1.toLowerCase() : '';
        const val2 = (value2 !== null && value2 !== undefined) ? value2.toLowerCase() : '';           
        return val1.trim() === val2.trim();
      
    }

    /**
     * This function is to perform aliases insert, update, delete
     */
    saveAliases( event ) {
        this.offnameInsertList = [];
        this.offnameUpdatetList = [];
        this.offnameDeleteList = [];
        this.offnameInsertList = event.added;
        this.offnameUpdatetList = event.updated;
        this.offnameDeleteList = event.removed;
        this.offnameCommitModel.insertList = [];
        this.offnameCommitModel.updateList = [];
        this.offnameCommitModel.deleteList = [];
        for ( let x = 0; x < this.offnameData.length; x++ ) {
            for ( let y = x+1; y < this.offnameData.length; y++ ) {
                if ( x !== y ) {
                    if ( this.isEqualValue( this.offnameData[x].lastName ,this.offnameData[y].lastName) &&
                        this.isEqualValue(this.offnameData[x].middleName , this.offnameData[y].middleName) &&
                        this.isEqualValue(this.offnameData[x].firstName , this.offnameData[y].firstName)&&
                        this.isEqualValue(this.offnameData[x].secondMiddleName , this.offnameData[y].secondMiddleName) &&
                        this.isEqualValue(this.offnameData[x].suffix , this.offnameData[y].suffix)
                        && (DateFormat.compareDate(DateFormat.getDate(this.offnameData[x].birthDate), DateFormat.getDate(this.offnameData[y].birthDate)) === 0)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'ocdalias.duplicated' );
                        this.show();
                        return;
                    }
                }
            }
        }

        if ( this.offnameInsertList.length > 0 ) {
            for ( let i = 0; i < this.offnameInsertList.length; i++ ) {
                this.offnameInsertList[i].rootOffenderId = this.offenderObj.rootOffenderId;
                this.offnameInsertList[i].offenderIdDisplay = this.offenderObj.offenderIdDisplay;
                this.offnameInsertList[i].aliasOffenderId = this.offenderObj.rootOffenderId;
                this.offnameInsertList[i].createDateTime = DateFormat.getDate();
                this.offnameInsertList[i].createDate = DateFormat.getDate();
                if ( this.offnameInsertList[i].rootOffenderId === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.offenderglobalsearch' );
                    this.show();
                    return;
                }
                if ( this.offnameInsertList[i].lastName === null || this.offnameInsertList[i].lastName === undefined
                    || this.offnameInsertList[i].lastName === '' || this.offnameInsertList[i].lastName.replace(/\s/g, '').length === 0 ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.lastnamemustbeentered' );
                    this.show();
                    return;
                }
                if ( this.offnameInsertList[i].birthDate === null || this.offnameInsertList[i].birthDate === undefined ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.birthdatemustbeselect' );
                    this.show();
                    return;
                }
                    if ((DateFormat.compareDate( this.offnameInsertList[i].birthDate, DateFormat.getDate())) === 1 ||
                    (DateFormat.compareDate( this.offnameInsertList[i].birthDate, DateFormat.getDate())) === 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.birthdatemustbeless' );
                    this.show();
                    return;
                }
                if ( this.offnameInsertList[i].sexCode === null || this.offnameInsertList[i].sexCode === undefined
                    || this.offnameInsertList[i].sexCode === '' ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.sexmustbeselect' );
                    this.show();
                    return;
                }
                if ( !this.offnameInsertList[i].createUserId ) {
                    this.offnameInsertList[i].createUserId = this.sessionManager.getId();
                }
            }
            this.offnameCommitModel.insertList = this.offnameInsertList;
        }
        if ( this.offnameUpdatetList.length > 0 ) {
            for ( let i = 0; i < this.offnameUpdatetList.length; i++ ) {
                this.offnameUpdatetList[i].modifyUserId = this.sessionManager.getId();
                this.offnameUpdatetList[i].modifyDateTime = DateFormat.getDate();
                if ( this.offnameUpdatetList[i].sexCode === null || this.offnameUpdatetList[i].sexCode === undefined
                    || this.offnameUpdatetList[i].sexCode === '' ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.sexmustbeselect' );
                    this.show();
                    return;
                }
            }
            this.offnameCommitModel.updateList = this.offnameUpdatetList;
        }
        this.offnameCommitModel.deleteList = this.offnameDeleteList;
        if (!this.ageLimitFlag) {
            const data = {
                label: this.translateService.translate('ocucoffe.datelimit'), yesBtn: true, noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                if (typeof result === 'boolean' && result) {
                    this.ageLimitFlag = true;
                    this.offNameCommit();
                } else {
                    this.ageLimitFlag = false;
                }
            });
        } else {
            this.offNameCommit();
        }
    }
    offNameCommit() {
        let checkFlag:boolean=true;
        for ( let i = 0; i < this.offnameData.length; i++ ) {
            if(this.offnameData[i].aliasColEditCheck){
                checkFlag=false;
            }
        }
        if(checkFlag){
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdalias.oneworkingNamemust' );
            this.show();
            return;
        }
        this.offnameCommitModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offnameCommitModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
        const offnameSaveData = this.ocdaliasFactory.offNameCommit( this.offnameCommitModel );
        offnameSaveData.subscribe( offnameSaveResult => {
            if (offnameSaveResult.liReturn === 1) {
                this.workFlag=false;
                this.disable = true;
                if(offnameSaveResult.vHeaderBlock !== undefined && offnameSaveResult.vHeaderBlock !== null) {
                    this.VHeaderBlockTemp = offnameSaveResult.vHeaderBlock;
                    this.vHeaderBlockModel.lastName = this.VHeaderBlockTemp.lastName;
                    this.vHeaderBlockModel.firstName = this.VHeaderBlockTemp.firstName;
                    this.vHeaderBlockModel.middleName = this.VHeaderBlockTemp.middleName;
                    if(this.vHeaderBlockModel.lastName && this.vHeaderBlockModel.firstName && this.vHeaderBlockModel.middleName){
                        this.vHeaderBlockModel.offenderFullName = this.vHeaderBlockModel.lastName + ', ' + this.vHeaderBlockModel.firstName +
                        ' ' + this.vHeaderBlockModel.middleName;
                    }else if(this.vHeaderBlockModel.lastName && this.vHeaderBlockModel.firstName){
                        this.vHeaderBlockModel.offenderFullName = this.vHeaderBlockModel.lastName + ', ' + this.vHeaderBlockModel.firstName;
                    }else {
                        this.vHeaderBlockModel.offenderFullName = this.vHeaderBlockModel.lastName;
                    }
                    this.vHeaderBlockModel.suffix = this.VHeaderBlockTemp.suffix;
                    this.vHeaderBlockModel.offenderId = this.VHeaderBlockTemp.offenderId;
                    this.VHeaderBlockTemp.age = this.selectedOffender.age;
                    if ( this.VHeaderBlockTemp.age === null ) {
                        this.VHeaderBlockTemp.age = this.selectedOffender.age;
                    }
                    this.vHeaderBlockModel.age = this.VHeaderBlockTemp.age;
                    this.vHeaderBlockModel.gender = this.VHeaderBlockTemp.gender;
                    this.vHeaderBlockModel.sex = this.VHeaderBlockTemp.sex;
                    if ( this.VHeaderBlockTemp.birthDate !== undefined && this.VHeaderBlockTemp.birthDate !== null ) {
                        this.VHeaderBlockTemp.birthDate = this.VHeaderBlockTemp.birthDate;
                    }
                    this.vHeaderBlockModel.birthDate = DateFormat.getDate( this.VHeaderBlockTemp.birthDate );
                    this.selectedOffender.aliasColEditCheck = true;
                    this.checkedColumn = true;
                } 
                this.populateDetails();
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.show();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
                this.populateDetails();
                this.disable = true;
            }
        } );
    }

    /**
     * This function is to perform identifiers insert, update, delete
     */
    saveIdentifier( event ) {
        this.offidInsertList = event.added;
        this.offidUpdatetList = event.updated;
        this.offidDeleteList = event.removed;
        this.offidCommitModel.insertList = [];
        this.offidCommitModel.deleteList = [];
        this.offidCommitModel.updateList = [];
        /**
         * This function will check whether identifier type and number is duplicated for all the alias records under offender
         */
        for (let i = 0; i <  this.offidInsertList.length; i++) {
            if(this.offAllIndentifierTemp.length > 0){
               const offIden = this.offAllIndentifierTemp.find(idenType =>
                    (idenType.identifierType === this.offidInsertList[i].identifierType &&
                        idenType.identifier === this.offidInsertList[i].identifier));
                   if (offIden !== undefined && offIden !== null) {
                       this.type = 'warn';
                       this.message = this.translateService.translate('ocdalias.rowexistswithsamerootoffenderid' );
                        this.show();
                        return;
                }
                }
        }
          /**
         * This function will check whether identifier type and number is duplicated for all the alias records under offender
         */
         for (let i = 0; i <  this.offidUpdatetList.length; i++) {
            if (this.offidData.length > 0) {
                const updCount = { repeat: 0, invalid: false };
                this.offidData.forEach(element => {
                    if ((this.offidUpdatetList[i].identifierType === element.identifierType) &&
                        (this.offidUpdatetList[i].identifier === element.identifier)) {
                        updCount.repeat++;
                    }
                    if (updCount.repeat > 1) {
                        updCount.invalid = true;
                        return;
                    }
                });
                if (updCount.invalid) {
                       this.type = 'warn';
                       this.message = this.translateService.translate( 'ocdalias.rowexistswithsamerootoffenderid' );
                       this.show();
                        return;
                      }
                }
        }
        /*
        * this verifies table row contains insert data,if contains show a validation message
        */
        for ( let i = 0; i < this.offidData.length; i++ ) {
            for ( let j = 0; j < this.offidData.length; j++ ) {
                if ( i !== j ) {
                    if ( this.offidData[i].identifierType === this.offidData[j].identifierType &&
                        this.offidData[i].identifier === this.offidData[j].identifier ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'ocdalias.rowexistswithsamerootoffenderid' );
                        this.show();
                        return;
                    }
                }
            }
        }
        for ( let i = 0; i < this.offidData.length; i++ ) {
            if ( this.offidData[i].identifierType === 'SSN' && this.offidData[i].identifier === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.ssnvalidationnum' );
                this.show();
                return;
            }
            if ( this.offidData[i].identifierType === 'SSN' && ( this.offidData[i].identifier.length < 9
                || this.offidData[i].identifier === '' ) ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.ssnvalidationnum' );
                this.show();
                return;
            }
            if ( this.offidData[i].identifierType === 'SSN' && this.offidData[i].identifier.length > 11 ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.ssnvalidation' );
                this.show();
                return;
            }
            if ( this.offidData[i].identifierType === 'SSN' &&  this.offidData[i].identifier.split(' ').length > 1 ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.ssnvalidationnum' );
                this.show();
                return;
            }
            if ( this.offidData[i].identifierType === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.typemustbeentered' );
                this.show();
                return;
            }
            if ( this.offidData[i].identifier === undefined || this.offidData[i].identifier === '' ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.numbermustbeentered' );
                this.show();
                return;
            }

            if(this.offidData[i].identifier){
                this.offidData[i].identifier=this.offidData[i].identifier.trim();
                if(this.offidData[i].identifier === ''){
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'common.numbermustbeentered' );
                    this.show();
                    return;  
                }
            }
            if ( this.offidData[i].verifiedFlag1 === true ) {
                this.offidData[i].verifiedFlag = 'Y';
            }
            if ( !this.offidData[i].verifiedFlag1 || this.offidData[i].verifiedFlag1 === false) {
                this.offidData[i].verifiedFlag = 'N';
            }
            if ( !this.offidData[i].offenderId ) {
                this.offidData[i].offenderId = this.offnameModel.offenderId;
            }
            if ( !this.offidData[i].offenderId ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.savealiasesfirst' );
                this.show();
                return;
            }
        }

        if ( this.offidInsertList.length > 0 || this.offidUpdatetList.length > 0 ) {
            for ( let i = 0; i < this.offidInsertList.length; i++ ) {
                this.offidInsertList[i].offenderId = this.selectedOffender.offenderId;
                this.offidInsertList[i].rootOffenderId = this.selectedOffender.rootOffenderId;
                this.offidInsertList[i].createDateTime = DateFormat.getDate();
                if ( !this.offidInsertList[i].offenderId ) {
                    this.type = 'warn';
                    this.message = this.translateService.translate( 'ocdalias.savealiasesfirst' );
                    this.show();
                    return;
                }
                if ( this.offidInsertList[i].createUserId === undefined ) {
                    this.offidInsertList[i].createUserId = this.sessionManager.getId();
                    this.offidInsertList[i].modifyUserId = this.sessionManager.getId();
                }
            }
            this.offidCommitModel.insertList = this.offidInsertList;
            for ( let i = 0; i < this.offidUpdatetList.length; i++ ) {
                this.offidUpdatetList[i].modifyUserId = this.sessionManager.getId();
                this.offidUpdatetList[i].modifyDateTime = DateFormat.getDate();
            }
            this.offidCommitModel.updateList = this.offidUpdatetList;
        }
        if ( this.offidDeleteList.length > 0 ) {
            let j = 0;
            for ( let i = 0; i < this.offidDeleteList.length; i++ ) {
                if ( this.offidDeleteList[i].identifierType !== null && this.offidDeleteList[i].identifierType !== undefined &&
                    this.offidDeleteList[i].identifier !== null && this.offidDeleteList[i].identifier !== undefined
                    && this.offidDeleteList[i].offenderIdSeq !== null && this.offidDeleteList[i].offenderIdSeq !== undefined ) {
                    j = j + 1;
                }
            }
            if ( j = this.offidDeleteList.length ) {
                this.offidCommitModel.deleteList = this.offidDeleteList;
            } else {
                this.type = 'error';
                this.message = this.translateService.translate( 'common.recordnotdeleted' );
                this.show();
                return;
            }
        }
        const offidSaveData = this.ocdaliasFactory.offidCommit( this.offidCommitModel );
        offidSaveData.subscribe( data => {
            if ( data === 1 ) {
                this.ocdaliasPopulateDetails();
                this.type = 'success';
                this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                this.offidData = data;
                this.show();
            } else {
                this.ocdaliasPopulateDetails();
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                this.show();
            }
        } );
    }

    /**
     * This function loads the row data of aliases
     */
    onRowClickoffname( event ) {
        if (event) {
            const preDeleteOffenderObj = this.ocdaliasFactory.offNameOnCheckDeleteMasteroffIdCur( this.selectedOffender );
            preDeleteOffenderObj.subscribe( data => {
                if (data > 0) {
                    this.returnDelFlag = false;
                } else {
                    this.returnDelFlag =  true;
                }
            });
            this.identInsert = true;
            this.selectedOffender = event;
            this.isshowing = false;
            this.disabledIdentifiers = false;
            this.identifierName = this.translateService.translate('ocdalias.identifiers');
            this.indexVal = this.offnameData.indexOf(event.data);
            this.totalVal = this.offnameData.length;
            this.offnameModel = event;
            if (this.offnameModel.rootOffenderId > 0 && this.offnameModel.rootOffenderId !== null) {
                if (this.offnameModel.birthDate !== null && this.offnameModel.birthDate !== undefined) {
                    this.offnameModel.birthDate = DateFormat.getDate(this.offnameModel.birthDate);
                    this.disable = false;
                    this.ocdaliasPopulateDetails();
                }
                this.offidData = [];
            }
        }
    }

    /**
     * This function loads the row data of identifiers
     */
    onRowClickoffid( event ) {
        if (event) {
            this.selectedIdenti = event;
            this.indentDelete = event.domainAccess === 'Y';
            this.identifierFlag = true;
            this.indexValIdentifier = this.offidData.indexOf( event.data );
            this.totalValIdentifier = this.offidData.length;
            this.offidModel = event.data;
        }else{
            this.indentDelete = false;
        }
    }

    /**
     * This function shows data on clicking 'Show All Id' Button
     */
    onShowAllclick() {
        this.isshowing = true;
        this.disabledIdentifiers = true;
        this.identifierName = this.translateService.translate( 'ocdalias.allidentifiers' );
        this.offenderTemp = new Offenders();
        this.offenderTemp.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;

        const identifierServiceObj1 = this.ocdaliasFactory.offIdAllExecuteQuery( this.offenderTemp );
        identifierServiceObj1.subscribe( offData => {
            if ( offData !== undefined && offData.length>0) {
                for ( let i = 0; i < offData.length; i++ ) {
                    offData[i].verifiedFlag1 = offData[i].verifiedFlag === 'Y' ? true : false;
                }
                this.offidData = offData;
            }
        } );
    }

    onGridClear = () => {
        this.ageLimitFlag = true;
        this.birthDateValid = true;
        this.populateDetails();
        return true;
    }
    /**
     * This function auto generates the date, gender.
     * Used to show validation messages,when click on Add button more than once with out giving mandatory fields
     */

    onGridInsert = () => {
        this.disable = true;
        this.workFlag=true;
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.rootOffenderId === undefined ) {
            this.offnameData = [];
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return;
        }
        if (!this.ageLimitFlag) {
            this.openDateLimitDialog();
            return false;
         }
         if (!this.birthDateValid) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.birthdatemustbeless');
            this.show();
            return false;
        }
        for ( let i = 0; i < this.offnameData.length; i++ ) {
            if ( !this.offnameData[i].lastName || this.offnameData[i].lastName.replace(/\s/g, '').length === 0 ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.lastnamemustbeentered' );
                this.show();
                return;
            }
            if ( !this.offnameData[i].birthDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.birthdatemustbeselect' );
                this.show();
                return;
            }
            if ( !this.offnameData[i].sexCode ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.sexmustbeselect' );
                this.show();
                return;
            }

        }
        for ( let x = 0; x < this.offnameData.length; x++ ) {
            for ( let y = x+1; y < this.offnameData.length; y++ ) {
                if ( x !== y ) {
                    if ( this.isEqualValue( this.offnameData[x].lastName ,this.offnameData[y].lastName) &&
                    this.isEqualValue(this.offnameData[x].middleName , this.offnameData[y].middleName) &&
                    this.isEqualValue(this.offnameData[x].firstName , this.offnameData[y].firstName)&&
                    this.isEqualValue(this.offnameData[x].secondMiddleName , this.offnameData[y].secondMiddleName) &&
                    this.isEqualValue(this.offnameData[x].suffix , this.offnameData[y].suffix)
                        && (DateFormat.compareDate(DateFormat.getDate(this.offnameData[x].birthDate), DateFormat.getDate(this.offnameData[y].birthDate)) === 0)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'ocdalias.duplicated' );
                        this.show();
                        return;
                    }
                }
            }
        }
        this.offnameModel = new Offenders();
        this.ocdaliasPopulateDetails();
        return {
            birthDate: DateFormat.getDate( this.offnameModelTemp.birthDate ), age: this.offnameModelTemp.age
        };
    }

    /**
     * This function validates the delete offenders
     */
    onGridDelete = () => {
           if (this.selectedOffender !== this.offnameData[this.offnameData.length - 1]) {
            if ( !this.offnameData[this.offnameData.length - 1].lastName ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.lastnamemustbeentered' );
                this.show();
                return false;
            }
            if ( !this.offnameData[this.offnameData.length - 1].birthDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.birthdatemustbeselect' );
                this.show();
                return false;
            }
            if ( !this.offnameData[this.offnameData.length - 1].sexCode ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.gendermustbeselect' );
                this.show();
                return false;
            }
        }

        if ( this.offnameModel.aliasColEditCheck === true ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdalias.youcannotdeletethisrecord' );
            this.show();
            return false;
        }  else if ( this.offidData.length > 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdalias.cannotdeleteoffender' );
            this.show();
            return false;
        } else if ( this.vHeaderBlockModel.rootOffenderId === this.offnameModel.offenderId ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'ocdalias.cannotdeleteoriginalnameassignedtothisoffender' );
            this.show();
            return false;
        } else {
            if (!this.returnDelFlag) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.cannotdeleteoffender' );
                this.show();
            }
            return this.returnDelFlag;
        }

    }
    /*
    * This is event is fired and do the validations when click on Add button in Grid in Identifier Block.
    */
    onGridIdentInsert = () => {

        for ( let i = 0; i < this.offidData.length; i++ ) {
            if ( !this.offidData[i].identifierType ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.typemustbeentered' );
                this.show();
                return null;
            }
            if ( !this.offidData[i].identifier || this.offidData[i].identifier === '' ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.numbermustbeentered' );
                this.show();
                return null;
            }
            if ( this.offidData[i].identifierType === 'SSN' && this.offidData[i].identifier === undefined ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.ssnvalidationnum' );
                this.show();
                return null;
            }
            if ( this.offidData[i].identifierType === 'SSN' && ( this.offidData[i].identifier.length < 9
                || this.offidData[i].identifier === '' ) ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.ssnvalidationnum' );
                this.show();
                return null;
            }
            if ( this.offidData[i].identifierType === 'SSN' && this.offidData[i].identifier.length > 11 ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.ssnvalidation' );
                this.show();
                return null;
            }
            if ( this.offidData[i].identifierType === 'SSN' &&  this.offidData[i].identifier.split(' ').length > 1 ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'ocdalias.ssnvalidationnum' );
                this.show();
                return null;
            }
        }
        for ( let i = 0; i < this.offidData.length; i++ ) {
            for ( let j = 0; j < this.offidData.length; j++ ) {
                if ( i !== j ) {
                    if ( this.offidData[i].identifierType === this.offidData[j].identifierType &&
                        this.offidData[i].identifier === this.offidData[j].identifier ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'ocdalias.rowexistswithsamerootoffenderid' );
                        this.show();
                        return;
                    }
                }

            }
        }
        if ( !this.vHeaderBlockModel || this.vHeaderBlockModel.rootOffenderId === undefined ) {
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
            return null;
        }
        if ( !this.offnameModel.offenderId ) {
            this.message = this.translateService.translate( 'ocdalias.selectalias' );
            this.show();
            return null;
        }
        return {};
    }
    /*
    * This is event is fired and do the validations when click on Remove button in Grid in Identifier Block.
    */
    onGridIdentDelete = () => {
        // for ( let i = 0; i < this.offidData.length; i++ ) {
            if (this.offidData[this.offidData.length - 1] !== this.selectedIdenti) {
            if ( !this.offidData[this.offidData.length - 1].identifierType ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.typemustbeentered' );
                this.show();
                return false;
            } else if ( !this.offidData[this.offidData.length - 1].identifier ) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.numbermustbeentered' );
                this.show();
                return false;
            }
         }
        {
            return true;
        }
    }

    /**
     * This function auto generates the age based on date
     */
    ageGenerator = ( event ) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.ageLimitFlag = true;
        this.field=event.field;
         if ( event.field === 'birthDate' && event.oldValue !== event.newValue ) {
            const birthDate = DateFormat.getDate( event.data.birthDate );
            this.birthDateValid = true;
            if ((DateFormat.compareDate(birthDate, DateFormat.getDate())) === 1 ||
            (DateFormat.compareDate(birthDate, DateFormat.getDate())) === 0) {
                this.birthDateValid = false;
                this.type = 'warn';
                this.message = this.translateService.translate('common.birthdatemustbeless');
                this.show();
                this.age = 0;
                rowdata.validated = true;
                rowdata.data = { age: this.age ? this.age : 0 };
            } else {
                this.age = DateFormat.getDate().getFullYear() - birthDate.getFullYear();
                const month = DateFormat.getDate().getMonth() - birthDate.getMonth();
                if ( month < 0 || ( month === 0 && DateFormat.getDate().getDate() < birthDate.getDate() ) ) {
                    this.age--;
                }
                    if (this.age > 0 && (this.vAgeFrom <= this.age && this.age <= this.vAgeTo)) {
                    } else {
                        if ((DateFormat.compareDate(birthDate, DateFormat.getDate())) !== 0) {
                            const data = {
                                label: this.translateService.translate('ocucoffe.datelimit'), yesBtn: true, noBtn: true
                            };
                            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                                if (typeof result === 'boolean' && result) {
                                    this.ageLimitFlag = true;
                                } else {
                                    this.ageLimitFlag = false;
                                }
                            });
                        }
                    }
                rowdata.validated = true;
                rowdata.data = { age: this.age ? this.age : 0 };
            }
            rowdata.validated = true;
            return rowdata;
        } else {
            rowdata.validated = true;
            return rowdata;
        }
    }
    updatedProperty(event){
        
         let index:number=0;
         
        if(this.workFlag && this.ch==1){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalias.notenterbefore');
            this.show();
            this.ch=0;
            return;   
        }
        if(this.workFlag && event.updated.offenderId && event.updated.aliasColEditCheck ){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalias.notenterbefore');
            this.show();
            if(event.updated.aliasColEditCheck){
                index=this.offnameData.indexOf(event.updated);
            } else{
                index=-1;
                return;
            }
            this.ch=1;
            this.aliases.setColumnData('aliasColEditCheck',index,false);
            return;
        }
        if(this.workFlag && event.updated.offenderId && !event.updated.aliasColEditCheck ){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalias.notenterbefore');
            this.show();
            if(!event.updated.aliasColEditCheck){
                index=this.offnameData.indexOf(event.updated);
            } else{
                index=-1;
                return;
            }
            this.ch=1
            this.aliases.setColumnData('aliasColEditCheck',index,true);
            return;
        }
        if(this.workFlag && this.field=="aliasColEditCheck"){
            this.type = 'warn';
            this.message = this.translateService.translate('ocdalias.notenterbefore');
            this.show();
            if(event.updated.aliasColEditCheck){
                index=this.offnameData.indexOf(event.updated);
            } else{
                index=-1;
                return;
            }
            this.aliases.setColumnData('aliasColEditCheck',index,false);
            return;  
        }
        if(!this.workFlag && this.field=="aliasColEditCheck"){
            if(event.updated.aliasColEditCheck){
                index=this.offnameData.indexOf(event.updated);
            } else{
                index=-1;
                return;
            }
            if(!this.countCheck){
                // this.countCheck++;
                for(let i=0;i<this.offnameData.length;i++){
                    if(!(i==index)){
                        this.aliases.setColumnData('aliasColEditCheck',i,false);
                    }
                   }
            }
        }
    }
    clearedProperty(event){
        this.countCheck=0;
        this.workFlag=false;
    }
    
   
    onButCloseclick() {
        this.isshowing = false;
        this.disabledIdentifiers = false;
        this.identifierName = this.translateService.translate( 'ocdalias.identifiers' );
        this.offidData = this.offidDataTemp;
        if ( this.offidData.length === 0 ) {
            this.offidData.push( new OffenderIdentifier() );
        }
    }

    /**
     * This function displays the ssn format
     */
    getMask = ( index, col, data ) => {
        if ( data['identifierType'] === 'SSN' ) {
            return {
                mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
                placeholderChar: ' '
            };
        }
    }


    ngOnDestroy() {
        this.translateService = null;
        this.oidmbrdtFactory.viewBtnFlag = false;
    }

    /**
     * This function displays the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }
    /**
     * event is fired when try to edit the some fields in the grid.
     */
    canCellEditable = (data: any, index: number, field: string): boolean => {
        if (!this.birthDateValid) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.birthdatemustbeless');
            this.show();
            return false;
        } else if (!this.ageLimitFlag) {
            this.openDateLimitDialog();
            return false;
         } else {
             return true;
         }
    }
    /**
     * event is fired when try to edit the age field in the grid.
     */
    canAgeEditable = (data: any, index: number, field: string): boolean => {
        if (!this.birthDateValid) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.birthdatemustbeless');
            this.show();
            return false;
        }
        if (!this.ageLimitFlag) {
            this.openDateLimitDialog();
            return false;
         } else {
             return false;
         }

    }
    /**
     * event is fired when try to edit the some fields in the grid.
     */
    canAliasEdit = ( data: any, index: number, field: string, originalIndex: number ): boolean => {
        if (!this.birthDateValid) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.birthdatemustbeless');
            this.show();
            return false;
        }
        if (!this.ageLimitFlag) {
           this.openDateLimitDialog();
           return false;
        } else if ( this.offnameIndex <= originalIndex ) {
            return true;
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.fieldisprotectedagainstupdate' );
            this.show();
            return false;
        }

    }
    /**
     * event is fired when try to edit the Birt Date field in the grid.
     */
    canBirthDateEdit = (data: any, index: number, field: string, originalIndex: number): boolean => {
        if ( this.offnameIndex <= originalIndex ) {
            return true;
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.fieldisprotectedagainstupdate' );
            this.show();
            return false;
        }
    }
    openDateLimitDialog() {
        const datatemp = {
            label: this.translateService.translate('ocucoffe.datelimit'), yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', datatemp, 30).subscribe(result => {
            if (typeof result === 'boolean' && result) {
                this.ageLimitFlag = true;
            } else {
                this.ageLimitFlag = false;
            }
        });
    }
   
    onbackBtnClick = () => {
        if (this.oidmbrdtFactory.viewBtnFlag) {
            this.oidmbrdtFactory.viewBtnFlag = false;
            this.backBtn = false;
            this.router.navigate(['/OIDMBRDT']);
        }
    }

    canIndentifiersCellEditable = (data: any, index: number, field: string): boolean => {
        if(data.createDateTime){
            return data.domainAccess == 'Y';
        }else{
            return true;
        }
    }
}
