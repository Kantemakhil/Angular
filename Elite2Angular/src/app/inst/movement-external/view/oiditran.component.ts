import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiditranService } from '../service/oiditran.service';
import { VOffExm } from '@commonbeans/VOffExm';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffenderExternalMovementsCommitBean } from '@commonbeans/OffenderExternalMovementsCommitBean';
import { OffenderExternalMovements } from '@commonbeans/OffenderExternalMovements';
import { OffenderBookingsCommitBean } from '@instdemographicsbeans/OffenderBookingsCommitBean';
import { OffenderBookings } from '@instdemographicsbeans/OffenderBookings';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { BedAssignmentHistories } from '@inst/demographics-biometrics/beans/BedAssignmentHistories';
import { Offenders } from '@common/beans/Offenders';
@Component({
    selector: 'app-oiditran',
    templateUrl: './oiditran.component.html'
})

export class OiditranComponent implements OnInit {
    @ViewChild('offEmGrid', { static: true }) offEmGrid: any;
    //  Variable declaration
    actionName: string;
    type: string;
    message: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offemData: VOffExm[] = [];
    offemDataTemp: VOffExm[] = [];
    offemModel: VOffExm = new VOffExm();
    offemIndex = 0;
    offemInsertList: OffenderExternalMovements[] = [];
    offemUpdatetList: OffenderExternalMovements[] = [];
    offemDeleteList: OffenderExternalMovements[] = [];
    offemCommitModel: OffenderExternalMovementsCommitBean = new OffenderExternalMovementsCommitBean();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offPiColumnDef: any[];
    offEmColumnDef: any[];
    itmTxReadOnly = false;
    offPiReadOnly = false;
    sysPflReadOnly = false;
    admBlkReadOnly = false;
    offEmReadOnly = false;
    moversnlovRg: any[] = [];
    cgfkOffemtoagylocidRg: any[] = [];
    msglist: any[] = [];
    caseloadId: string;
    currentDate: Date;
    currentTime: any;
    location: any;
    modalData: any;
    livUnitDesc: any;
    livUnitCode: any;
    descriptionData: any[] = [];
    offemGridIndex = 1;
    statusOption: any[] = [];
    toAgyLocOption: any[] = [];
    offbkgsCommitModel: OffenderBookingsCommitBean = new OffenderBookingsCommitBean();
    offBkgUpdatetList: OffenderBookings[] = [];
    offBkgModel: OffenderBookings = new OffenderBookings();
    livUnitId: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    agyLocMap: Map<string, string> = new Map<string, string>();
    facilityTitles = { 'description': 'Agency', 'code': 'AgyLocId', 'dspDescription': 'Bed Location' };

    availableBeds:number;
    allowFinalSave: boolean = true;
    crtmvtmpDeleteListTemp: BedAssignmentHistories[] = [];
    commintList: BedAssignmentHistories[] = [];
    offendersList :Offenders[]=[];
    constructor(private oiditranFactory: OiditranService,
        public sessionManager: UserSessionManager,
        public translateService: TranslateService,
        public osiosearFactory: OsiosearService,
        private offenderSearchService: OffenderSearchService,
        public dialogService: DialogService,       
        ) {
        this.offPiColumnDef = [];
        this.offEmColumnDef = [];
    }
    ngOnInit() {
        this.currentDate = DateFormat.getDate();
        this.currentTime = DateFormat.getDate();
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.disabled = true;
        this.offemExecuteQuery();
        this.offEmColumnDef = [
            {
                fieldName: this.translateService.translate('oiditran.confirmid'), field: 'conformFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            { fieldName: this.translateService.translate('common.id'), field: 'offenderIdDisplay', editable: false, width: 130 },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.date'), field: 'movementDate',
                editable: false, width: 130, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.time'), field: 'movementTime',
                editable: false, width: 130, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate('oiditran.from'), field: 'fromAgyLocId',
                datatype: 'text', options: this.statusOption,
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oiditran.to'), field: 'toAgyLocId',
                datatype: 'text', options: this.toAgyLocOption,
                editable: false, width: 130
            },
            {
                fieldName: this.translateService.translate('oiditran.movementreason'), field: 'movementReasonCode',
                editable: true, width: 150, domain: 'MOVE_RSN',
                datatype: 'lov', codeTitle: 'Reason Code',
                optionWidth: '350'
            },
            { fieldName: this.translateService.translate('oiditran.bedlocation'), field: 'dspDescription', editable: false, width: 150 },
            {
                fieldName: '', field: 'button', editable: true, width: 150, displayas: 'image', datatype:'hyperlink', /* link: '/OIDARHPL', */
                data: 'row', updateField: 'row', modal: true, dialogWidth: '80%', height: 'auto',onLaunchClick: this.onLivingUnitCLick
            },
            /*{
                fieldName: '', field: 'button', editable: true, width: 150, datatype: 'launchbutton', link: '/omuavbed',
                data: 'row', updateField: 'row', modal: true, dialogWidth: '70%', height: 'auto'
            },*/
            { fieldName: this.translateService.translate('common.comment'), field: 'dspCommentText', editable: true, width: 150,datatype:'text', maxlength: 240 },
            { fieldName: '', field: 'livingUnitId', hide: true },
            { fieldName: '', field: 'availBedCount', hide: true },


        ];
        const moversnlovServiceObj = this.oiditranFactory.moveRsnLovRecordGroup();
        moversnlovServiceObj.subscribe(moversnlovList => {
            if (moversnlovList.length === 0) {
                this.moversnlovRg = [];
            } else {
                for (let i = 0; i < moversnlovList.length; i++) {
                    this.moversnlovRg.push({
                        'text': moversnlovList[i].code + ' - ' +
                            moversnlovList[i].description, 'id': moversnlovList[i].code
                    });
                }
            }
        });
        const caseloadServiceObj = this.oiditranFactory.getCountOfAgyInCase(this.caseloadId);
        caseloadServiceObj.subscribe(result => {
            if (result === 0) {
                this.moversnlovRg = [];
            } else {
                if (result.code !== null) {
                    this.location = result.code;
                    if (result.livUnitCode !== null) {
                        this.livUnitCode = result.livUnitCode;
                    }
                    if (result.dspDescription !== null) {
                        this.livUnitDesc = result.dspDescription;
                    }
                    this.livUnitId = result.livUnitId;
                    if (this.location) {
                        this.modalData = { agyLocId: this.location };
                        this.disabled = false;
                    }
                } else {
                    this.location = undefined;
                    this.livUnitCode = undefined;
                    this.livUnitDesc = undefined;
                }
            }
        });
        const cgfkOffemtoagylocidServiceObj = this.oiditranFactory.cgfkOffemtoagylocidRecordGroup(this.caseloadId);
        cgfkOffemtoagylocidServiceObj.subscribe(cgfkOffemtoagylocidList => {
            if (cgfkOffemtoagylocidList.length === 0) {
                this.cgfkOffemtoagylocidRg = [];
            } else {
                for (let i = 0; i < cgfkOffemtoagylocidList.length; i++) {
                    this.cgfkOffemtoagylocidRg.push({
                        'agyLocId': cgfkOffemtoagylocidList[i].agyLocId, 'code': cgfkOffemtoagylocidList[i].code,
                        'dspDescription': cgfkOffemtoagylocidList[i].dspDescription, 'livUnitId': cgfkOffemtoagylocidList[i].livUnitId,
                        'livUnitCode': cgfkOffemtoagylocidList[i].livUnitCode
                    });
                    this.agyLocMap.set(cgfkOffemtoagylocidList[i].code, cgfkOffemtoagylocidList[i].livUnitId + ',' +
                        cgfkOffemtoagylocidList[i].livUnitCode + ',' + cgfkOffemtoagylocidList[i].dspDescription);
                }
                // this.location = this.cgfkOffemtoagylocidRg[0].code;
                // if (this.cgfkOffemtoagylocidRg[0].livUnitCode !== null) {
                // this.livUnitCode = this.cgfkOffemtoagylocidRg[0].livUnitCode;
                // }
                // if (this.cgfkOffemtoagylocidRg[0].dspDescription !== null) {
                // this.livUnitDesc = this.cgfkOffemtoagylocidRg[0].dspDescription;
                // }
                // this.livUnitId = this.cgfkOffemtoagylocidRg[0].livUnitId;
                // if (this.location) {
                //     this.modalData = { agyLocId: this.location };
                //     this.disabled = false;
                // }
            }
        });

        const optionList = this.oiditranFactory.cgfkOffEmDspDescriptionAgyLocIdRecordGroup();
        optionList.subscribe(list => {
            list.forEach(listval => {
                this.statusOption.push({ 'id': listval.code, 'text': listval.code });
            });
        });

        const agyLocIdList = this.oiditranFactory.findToAgyLocIdList();
        agyLocIdList.subscribe(list => {
            list.forEach(listval => {
                this.toAgyLocOption.push({ 'id': listval, 'text': listval });
            });
        });
    }


    onLivingUnitCLick = (event) => {
        this.dialogService.openLinkDialog('/omuavbed', this.offemModel,80).subscribe(result => {
            if (result) {
                const rowIndex=this.offemData.indexOf(event);
                this.offEmGrid.setColumnData('dspDescription', rowIndex, result.dspDescription);
                this.offEmGrid.setColumnData('livingUnitId', rowIndex, result.livingUnitId);
                this.livUnitId = result.livingUnitId;
                this.oiditranFactory.noOfBedAvailableInTheGivenLocation(this.livUnitId).subscribe(data => {
                    this.offEmGrid.setColumnData('availBedCount', rowIndex, data);
                    this.availableBeds = data;
                });       
            }
        });
    }

    onButFacilityclick() {
        if (this.location) {
            const data = this.agyLocMap.get(this.location).split(',');
            if (data[1] !== 'null') {
                this.livUnitCode = data[1];
            }
            if (data[2] !== 'null') {
                this.livUnitDesc = data[2];
            }
            this.livUnitId = data[0];
            this.offemExecuteQuery();
            this.modalData = { agyLocId: this.location };
            this.disabled = false;
        } else {
            this.offemExecuteQuery();
            this.disabled = true;
            this.livUnitCode = undefined;
            this.livUnitDesc = undefined;
        }
    }
    setAgencyLocation(event) {
        if (event) {
            const data = this.agyLocMap.get(event.code).split(',');
            this.location = event.code;
            if (data[0] !== 'null') {
                this.livUnitCode = data[0];
            }
            if (data[1] !== 'null') {
                this.livUnitDesc = data[1];
            }
            this.livUnitId = data[0];
            this.modalData = { agyLocId: this.location };
            if (this.location) {
                this.disabled = false;
            }
        }
        this.offemExecuteQuery();
    }

    setBedLocation(event) {
        if (event) {
            this.livUnitDesc = event.dspDescription;
            this.livUnitId = event.livingUnitId;
            this.descriptionData = event.dspDescription.split('-');
            this.livUnitCode = this.descriptionData[this.descriptionData.length - 1];
        }
    }
    
    
    /**validate grid row function***/
    
    bedEvent = (event) => {
        const rowIndex = event.rowIndex;
        if (event.data.livingUnitId) {
        // this.livUnitId = event.data.livingUnitId;
        }
        const rowdata = new ValidateRowReturn();
        if (event.field === 'conformFlag') {
            this.getAvailBedForLocations();
           if(event.data.dspDescription ==null){
            if (event.newValue) {
                if (DateFormat.compareDate(DateFormat.getDate(this.offemModel.movementDate),
                    DateFormat.getDate(this.currentDate)) === 1) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oiditran.currentdatemustbeless');
                    this.show();
                    rowdata.validated = true;
                    rowdata.data = { conformFlag: false };
                    return;
                }
                if (this.currentDate > DateFormat.getDate()) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiditran.admdatecanntbeearliar');
                    this.show();
                    rowdata.validated = true;
                    rowdata.data = { conformFlag: false };
                    return;
                }
                if (this.currentTime > DateFormat.getDate().getTime()) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiditran.admtimecanntbeearliar');
                    this.show();
                    rowdata.validated = true;
                    rowdata.data = { conformFlag: false };
                    return;
                }
                if (!this.location) {
                    this.type = 'info';
                    this.message = this.translateService.translate('oiditran.selectinst');
                    this.show();
                    rowdata.validated = true;
                    return;
                }
                rowdata.data = { dspDescription: this.livUnitDesc };
                rowdata.validated = true;
                return rowdata;
            }
        }
        }
        rowdata.validated = true;
        return rowdata;
    }

    allowNumbers(event) {
    }
    onButSelectclick() {
    }
    onRowClickoffem(event) {
        if (event) {
            this.offemModel = event;
            if (this.offemModel.reportingDate) {
                this.offemModel.reportingDate = DateFormat.getDate(this.offemModel.reportingDate);
            }
            if (this.offemModel.reportingTime) {
                this.offemModel.reportingTime = DateFormat.getDate(this.offemModel.reportingTime);
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
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    offemExecuteQuery() {
        const offemResult = this.oiditranFactory.
            offEmExecuteQuery(this.caseloadId);
        offemResult.subscribe(offemResultList => {
            if (offemResultList.length === 0) {
                this.offemData = [];
            } else {
                
                for (let i = 0; i < offemResultList.length; i++) {
                    offemResultList[i].button = 'assets/icons/eoff_icons/person_search_black_24dp.png';
                    if (this.location) {
                        offemResultList[i].agyLocId = this.location;
                    } else {
                        offemResultList[i].agyLocId = this.location;
                    }
                    offemResultList[i].livingUnitId = null;

                }
                this.offemData = offemResultList;
                this.offemModel = this.offemData[0];
                if (this.offemModel.reportingDate) {
                    this.offemModel.reportingDate = DateFormat.getDate(this.offemModel.reportingDate);
                }

            }
        });
    }
    getAvailBedForLocations() {
        this.oiditranFactory.noOfBedAvailableInTheGivenLocation(this.livUnitId).subscribe(data => {
            this.availableBeds = data;
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oiditranSaveoffemForm(event) {
        this.offemUpdatetList = [];
        this.offemInsertList = [];
        this.offemCommitModel.insertList = [];
        this.offemCommitModel.updateList = [];
        this.offemCommitModel.deleteList = [];
        for (let i = 0; i < event.updated.length; i++) {
            if (event.updated[i].conformFlag) {
                this.offemUpdatetList.push(event.updated[i]);
                this.offemInsertList.push(event.updated[i]);
            }
        }
        
        if ( this.availableBeds != null && this.offemUpdatetList.length > this.availableBeds) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiditran.nobedavailableforselectedlocation');
            this.show();
            return;
        } 

        if (this.currentDate > DateFormat.getDate()) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiditran.admdatecanntbeearliar');
            this.show();
            this.offemUpdatetList = [];
            return;
        }
        if (this.currentTime > DateFormat.getDate().getTime()) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiditran.admtimecanntbeearliar');
            this.show();
            return;
        }

        if (this.offemUpdatetList.length === 0) {
            this.type = 'info';
            this.message = this.translateService.translate('oiditran.norecordscommittedindb');
            this.show();
            return;
        }
        if (this.offemUpdatetList.length > 0) {
            for (let i = 0; i < this.offemUpdatetList.length; i++) {
                this.offemUpdatetList[i].createUserId = this.sessionManager.getId();
                if (!this.offemUpdatetList[i].livingUnitId) {
                    this.offemUpdatetList[i].livingUnitId = Number(this.livUnitId);
                }
                if (!this.offemUpdatetList[i].dspDescription) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiditran.bedlocationmustbeentered');
                    this.show();
                    return;
                }
                if (this.offemUpdatetList[i].availBedCount < 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiditran.nobedavailableforselectedlocation');
                    this.allowFinalSave= false;

                    this.show();
                    return;
                }

                if (DateFormat.compareDate(DateFormat.getDate(this.offemUpdatetList[i].movementDate),
                    (DateFormat.getDate(this.currentDate))) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiditran.currentdatemustbeless');
                    this.show();
                    return;
                }
                if (DateFormat.getDate(this.offemUpdatetList[i].movementTime).getTime() > this.currentTime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oiditran.currentdatemustbeless');
                    this.show();
                    return;
                }
            }

        }
        this.offbkgsCommitModel.updateList = [];
        this.offBkgUpdatetList = [];
        for (let i = 0; i < this.offemInsertList.length; i++) {
            this.offemInsertList[i].dspDescription = this.location;
            this.offemInsertList[i].movementDate = DateFormat.getDate(DateFormat.getDate(this.offemInsertList[i].movementDate)
                .setHours(12, 0, 0));
            this.offemInsertList[i].reportingDate = null;
            this.offBkgModel.agyLocId = this.location;
        }
        this.offemCommitModel.insertList = this.offemInsertList;
        this.offemCommitModel.updateList = this.offemUpdatetList;

        if(this.allowFinalSave){
            this.saveData();
           }

      
    }
    saveData() {
        const warnData = [];
        this.offemCommitModel.updateList.forEach(wrn => {
            warnData.push(wrn);
        });
        // this.offemCommitModel.insertList.forEach(wrn => {
        //     warnData.push(wrn);
        // });
        this.crtmvtmpDeleteListTemp = warnData;
        const conflictObj = this.oiditranFactory.checkNonIndGangConficts(warnData);
			conflictObj.subscribe(data => {
				if (data && data.length > 0) {
					this.internalNonAssocationPopupByIndAndGangUpdate(JSON.parse(JSON.stringify(warnData)), data, 0)
				}
			});
    }
    internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i) {
        
		var msg = null;
		var msgGang = null;

		if (i == nonAssList.length && this.crtmvtmpDeleteListTemp && this.crtmvtmpDeleteListTemp.length != 0) {
			this.callWarningScreen(this.crtmvtmpDeleteListTemp, 0);
		}
		var name;
		var id;
		var one = this.translateService.translate('oidpwait.bulkAsignForAccreditedProgram');
		//Both individual And gang Details data 
		if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByInd && nonAssList[i].offenderNonAssociationsByInd.length > 0 &&
			nonAssList[i].offenderNonAssociationsByGang && nonAssList[i].offenderNonAssociationsByGang.length > 0) {
			// individual details
			nonAssList[i].offenderNonAssociationsByInd.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msg) {
							name = nonAssList[i].offenderName;
							id = nonAssList[i].offenderIdDisplay;
							msg = "Individual Non-Association Conflics " + '\n';
						}
						msg = msg + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// gang details 
			nonAssList[i].offenderNonAssociationsByGang.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msgGang) {
							msgGang = "Gang Non-Association Conflics" + '\n';
						}
						msgGang = msgGang + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// both ind and Gang
			if (msg != null && msgGang != null) {
				msg = 'Offender ' + name + ' (ID: ' + id + ') ' + one + '\n\n' + msg + "\n" + msgGang;
				msg = msg + '  \n\n ' + this.translateService.translate('ociscata.doyouwanttoproceed');
				const data = {
					label: this.translateService.translate(msg), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					proceedBtnDisabled: true
				};

				this.firstPopup(bulkAssignList, nonAssList, data, i);

			}

		}

		// individual details
		else if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByInd && nonAssList[i].offenderNonAssociationsByInd.length > 0) {

			nonAssList[i].offenderNonAssociationsByInd.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msg) {
							name = nonAssList[i].offenderName;
							id = nonAssList[i].offenderIdDisplay;
							msg = "Individual Non-Association Conflics " + '\n';
						}
						msg = msg + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// for ind only 
			if (msg != null) {
				msg = 'Offender ' + name + ' (ID: ' + id + ') ' + one + '\n\n' + msg + '\n\n' + this.translateService.translate('ociscata.doyouwanttoproceed');
				const data = {
					label: this.translateService.translate(msg), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					proceedBtnDisabled: true
				};

				this.firstPopup(bulkAssignList, nonAssList, data, i);

			}
		}
		// Gang details 
		else if (bulkAssignList.length > 1 && nonAssList[i].offenderNonAssociationsByGang && nonAssList[i].offenderNonAssociationsByGang.length > 0) {
			nonAssList[i].offenderNonAssociationsByGang.forEach(element => {
				bulkAssignList.forEach(obj => {
					if (obj.offenderBookId == element.offenderBookId) {
						if (!msgGang) {
							name = nonAssList[i].offenderName;
							id = nonAssList[i].offenderIdDisplay;
							msgGang = "Gang Non-Association Conflics \n";
						}
						msgGang = msgGang + element.lastName + "," + element.firstName + " (ID: " + element.offenderIdDisplay + ") \n";
					}
				});
			});
			// for gang details 
			if (msgGang != null) {
				msgGang = 'Offender ' + name + ' (ID: ' + id + ') ' + one + '\n' + msgGang + '  \n\n ' + this.translateService.translate('ociscata.doyouwanttoproceed');
				const data = {
					label: this.translateService.translate(msgGang), yesBtn: true, proceedWithNoConflictsBtn: false, cancelBtn: true,
					proceedBtnDisabled: true
				};
				this.firstPopup(bulkAssignList, nonAssList, data, i);

			}
		}

		else {
			i++;
			this.internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i);
		}
    }
    firstPopup(bulkAssignList: any, nonAssList: any, data: { label: string; yesBtn: boolean; proceedWithNoConflictsBtn: boolean; cancelBtn: boolean; proceedBtnDisabled: boolean; }, i: any) {
        this.dialogService.openLinkDialog('/OCUNAWRN', data, 30).subscribe(result => {
			if (result) {
				i++;
				this.internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i);

			} else {
				this.secondPopup(bulkAssignList, nonAssList, data, i);

			}
		});
    }
    callWarningScreen(data, seq) {
        
        this.commintList = [];
        this.commintList = JSON.parse(JSON.stringify(data));
        const commitData = data[seq];
        if (commitData && !commitData.fromLaunchButton) {
            if (seq < (this.offemCommitModel.insertList.length + this.offemCommitModel.updateList.length)) {
                const bedData = {
                    offenderBookId: null,
                    agyLocId: null,                   
                     livingUnitId: null,
                     dspDescription: null,
                     offenderId: null
                };

                bedData.offenderBookId = commitData.offenderbookid ? commitData.offenderbookid : commitData.offenderBookId;
                bedData.livingUnitId = commitData.livingUnitId ? commitData.livingUnitId : this.livUnitId;
                bedData.agyLocId = this.offemData[0].agyLocId;
                bedData.offenderId = commitData.offenderId;
                bedData.dspDescription =this.livUnitDesc


                this.oiditranFactory.checkAllConficts(bedData).subscribe(result => {
                    if (result.warningMsg && result.warningMsg !== 'null') {
                        result.warningMsg = result.warningMsg.replaceAll('omuavbed.selectedOffender', this.translateService.translate('omuavbed.selectedOffender'));
                        result.warningMsg = result.warningMsg.replaceAll('omuavbed.housedinsameunit', this.translateService.translate('omuavbed.housedinsameunit'));
                        
                        const dialogData = {
                            warningMsg: result.warningMsg, warningPrompt: result.warningPrompt,
                            yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/OCUWARNG', dialogData, 80).subscribe(dialogResult => {
                            if (dialogResult) {
                                this.callWarningScreen(data, seq + 1);
                            } else {
                                const bedInsertList = [];
                                const bedUpdateList = [];
                                const dataList = [];
                                this.commintList = [];
                                data = JSON.parse(JSON.stringify(data));
                                data.forEach(element => {
                                    if(element.offenderBookId != data[seq].offenderBookId) {
                                        dataList.push(element);
                                    }
                                });
                                JSON.parse(JSON.stringify(this.offemCommitModel.insertList)).forEach(element => {
                                    if(element.offenderBookId != data[seq].offenderBookId) {
                                        bedInsertList.push(element);
                                    }
                                });
                                JSON.parse(JSON.stringify(this.offemCommitModel.updateList)).forEach(element => {
                                    if(element.offenderBookId != data[seq].offenderBookId) {
                                        bedUpdateList.push(element);
                                    }
                                });
                                
                                data = [];
                                this.offemCommitModel.insertList = [];
                                this.offemCommitModel.updateList = []
                                if(dataList.length > 0) {
                                    data = dataList
                                }
                                if(bedInsertList.length > 0) {
                                    this.offemCommitModel.insertList = bedInsertList;
                                }
                                if(bedUpdateList.length > 0) {
                                    this.offemCommitModel.updateList = bedUpdateList;
                                }
                                this.commintList = JSON.parse(JSON.stringify(data));
                                if(data.length > seq) {
                                    this.callWarningScreen(data, seq);
                                } else if(this.commintList.length > 0){
                                    this.oidcholoCommit();
                                } else {
                                    return;
                                }
                            }
                        });
                    } else {
                        if ((seq + 1) === (this.offemCommitModel.insertList.length + this.offemCommitModel.updateList.length)) {
                            this.oidcholoCommit();
                        } else {
                            this.callWarningScreen(data, seq + 1);
                        }
                    }
                });
            } else {
                this.oidcholoCommit();
            }
        } else {
            if (commitData) {
            this.callWarningScreen(data, seq + 1);
            } else {
                this.oidcholoCommit();
            }
        }
    }
    oidcholoCommit() {
        const offemSaveData = this.oiditranFactory.offEmCommit(this.offemCommitModel);
        offemSaveData.subscribe(data => {
            if (data === 1) {
                this.offemExecuteQuery();
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                    this.offbkgGlobalQuery();
            } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });   
     }

    admDateWhenValidateItemTrigger() {
        if (this.currentDate > DateFormat.getDate()) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiditran.admdatecanntbeearliar');
            this.show();
        }
    }

    admTimeWhenValidateItemTrigger() {
        if (this.currentTime > DateFormat.getDate().getTime()) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiditran.admtimecanntbeearliar');
            this.show();
        }
    }
    onGridTermClear = () => {
        this.availableBeds=undefined;
        this.offemExecuteQuery();
        return true;
    }
    
    agencyBlur() {
        if (!this.location) {
            this.location = this.location === '' ? undefined : '';
        }
    }

    offbkgGlobalQuery() {
		this.vHeaderBlockModel = new VHeaderBlock();
		this.vHeaderBlockModel.offenderIdDisplay = this.offemCommitModel.insertList[0].offIdDisplay;
		this.vHeaderBlockModel.offenderBookId = this.offemCommitModel.insertList[0].offenderBookId;
		this.vHeaderBlockModel.agyLocId = this.offemCommitModel.insertList[0].fromAgyLocId;
		const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
		offbkGlobal.subscribe(list => {
			if (list.length > 0) {
				this.vHeaderBlockModel = list[0];
				this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
			}
		});
	}

    secondPopup(bulkAssignList, nonAssList, data, i) {
		const offDetails = {
			label: 'This action will un-select ' + bulkAssignList[i].offenderName + '(ID: ' + bulkAssignList[i].offenderIdDisplay + '),' + this.translateService.translate('oidcholo.removeFromList')+'\n\n'+this.translateService.translate('ociscata.doyouwanttoproceed')
			, yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', offDetails, 50).subscribe(results => {
			if (results) {
				for (let k = 0; k < nonAssList.length; k++) {
					if (k !== i && ((nonAssList[k].offenderNonAssociationsByInd && nonAssList[k].offenderNonAssociationsByInd.length > 0)
						|| (nonAssList[k].offenderNonAssociationsByInd && nonAssList[k].offenderNonAssociationsByInd.length > 0))) {

						if (nonAssList[k].offenderNonAssociationsByInd && nonAssList[k].offenderNonAssociationsByInd.length > 0) {
							this.offendersList = [];
							for (let m = 0; m < nonAssList[k].offenderNonAssociationsByInd.length; m++) {
								if (nonAssList[k].offenderNonAssociationsByInd[m].offenderBookId !== nonAssList[i].offenderBookId) {
									this.offendersList.push(nonAssList[k].offenderNonAssociationsByInd[m]);
								}
							}
							nonAssList[k].offenderNonAssociationsByInd = this.offendersList;
						}

						if (nonAssList[k].offenderNonAssociationsByGang && nonAssList[k].offenderNonAssociationsByGang.length > 0) {
							this.offendersList = [];
							for (let m = 0; m < nonAssList[k].offenderNonAssociationsByGang.length; m++) {
								if (nonAssList[k].offenderNonAssociationsByGang[m].offenderBookId !== nonAssList[i].offenderBookId) {
									this.offendersList.push(nonAssList[k].offenderNonAssociationsByGang[m]);
								}
							}
							nonAssList[k].offenderNonAssociationsByGang = this.offendersList;
						}
					}
				}

				this.crtmvtmpDeleteListTemp = JSON.parse(JSON.stringify(this.crtmvtmpDeleteListTemp)).filter((element) => (element.offenderBookId != nonAssList[i].offenderBookId));
				i++;
				this.internalNonAssocationPopupByIndAndGangUpdate(bulkAssignList, nonAssList, i);
			}
			else {
				this.firstPopup(bulkAssignList, nonAssList, data, i);
			}
		});

	}
   
}
