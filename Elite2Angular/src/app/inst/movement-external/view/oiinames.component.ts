import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { OiinamesService } from '../service/oiinames.service';
import { VNameSearch } from '@commonbeans/VNameSearch';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { Router } from '@angular/router';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { OidbstrnService } from '@inst/movement-external/service/oidbstrn.service';
import { VOffenderAllSchedules } from '@inst/schedules/beans/VOffenderAllSchedules';
import { OidbutabService } from '@inst/movement-external/service/oidbutab.service';
import { OiicmociService } from '@inst/movement-external/service/oiicmoci.service';
import { VCourtEvents } from '@inst/legal-screens/beans/VCourtEvents';
import { OidbsiapService } from '@inst/schedules/service/oidbsiap.service';
import { OidintmvService } from '@inst/movements/service/oidintmv.service';
import { OidehlocService } from '@inst/movements/housingchanges/service/oidehloc.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-oiinames',
    templateUrl: './oiinames.component.html'
})

export class OiinamesComponent implements OnInit, OnDestroy {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    namesrchData: VNameSearch[] = [];
    namesrchDataTemp: VNameSearch[] = [];
    namesrchModel: VNameSearch = new VNameSearch();
    namesrchModelTemp: VNameSearch = new VNameSearch();
    namesrchIndex: number;
    namesrchInsertList: VNameSearch[] = [];
    namesrchUpdatetList: VNameSearch[] = [];
    namesrchDeleteList: VNameSearch[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    onaddfalg = true;
    selectDisable: boolean;
    retriveDisable: boolean;
    oiinamesColumnDefs: any[];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    clearDisable: boolean;
    statusOption: any[] = [];
    livingUnitOption: any[] = [];
    routUrl: string;
    activeFlagOption: any[] = [];
    sysDateTemp: Date;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    tableIndex = -1;
    namesReadOnly: boolean;
    cancelDisable: boolean;
    backButton: boolean;
    shouldRedirect = false;
    @ViewChild('oiinamesForm', {static: true}) form: any;
    constructor(private oiinamesFactory: OiinamesService, public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService, private router: Router,
        private oidbstrnFactory: OidbstrnService,
        private osiosearFactory: OsiosearService,
        private oidbutabFactory: OidbutabService,
        private oiicmociFactory: OiicmociService,
        private oidbsiapFactory: OidbsiapService,
        private oidintmvFactory: OidintmvService,
        private oidehlocFactory: OidehlocService,
        private sessionManager: UserSessionManager) {
    }
    ngOnInit() {
        this.selectDisable = true;
        this.cancelDisable = false;
        this.retriveDisable = false;
        this.namesReadOnly = false;
        this.backButton = false;
        //this.getOptionList();
        this.oiinamesColumnDefs = [
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName',
                link: '/INSDSBVW', displayas: 'href', queryparam: 'offenderIdDisplay', data: 'row',
                editable: false, width: 200, datatype: 'hyperlink', 
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName',
                link: '/INSDSBVW', displayas: 'href', queryparam: 'offenderIdDisplay', data: 'row',
                editable: false, width: 200, datatype: 'hyperlink', 
            },
            {
                fieldName: this.translateService.translate('oiinames.s'), field: 'activeFlag',
                editable: true, width: 200, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay',
                link: '/INSDSBVW', displayas: 'href', queryparam: 'offenderIdDisplay', data: 'row',
                editable: false, width: 200, datatype: 'hyperlink'
            },
            {
                fieldName: this.translateService.translate('system-profile.book-id'), field: 'bookingNo',
                editable: true, width: 150, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate('system-profile.inst-agency'), field: 'agyLocId',
                editable: true, width: 200, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate('oiinames.housinglocation'), field: 'livingUnitDescription',
                editable: true, width: 300, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
        ];
        
        if (this.oiinamesFactory.routUrl) {
            this.routUrl = this.oiinamesFactory.routUrl;
            this.backButton = true;
            this.oiinamesFactory.routUrl = null;
        }

        this.oiinamesFactory.agencyIncidentsModeldataTemp;
        this.oiinamesFactory.ctrEveModelTemp;
        this.oiinamesFactory.offenderRowData;
        this.oiinamesFactory.agencyincidentsDataTemp;
        this.oiinamesFactory.crtEveDataTemp;

        /* const optionList = this.oiinamesFactory.findAgyLocIdList();
        optionList.subscribe(list => {
            list.forEach(listval => {
                this.statusOption.push({ 'id': listval, 'text': listval });
            });
        });

        const optionLivingUintList = this.oiinamesFactory.findLivingUnitsList();
        optionLivingUintList.subscribe(listValue => {
            listValue.forEach(listval => {
                this.livingUnitOption.push({ 'id': listval, 'text': listval });
            });
        }); */
        const serviceObj = this.oiinamesFactory.cgwhenNewFormInstance();
        serviceObj.subscribe(sysDateList => {
            if (sysDateList.length === 0) {
                return;
            } else {
            }
        });
        this.clearDisable = false;
        /* this.form.valueChanges.subscribe(data => {
            const keys = Object.keys(data);
            const count = { i: 0 };
            if (this.namesrchData.length === 0) {
                do {
                    if (!data[keys[count.i]]) {
                        this.clearDisable = true;
                    } else {
                        this.clearDisable = false;
                    }
                    count.i++;
                } while (this.clearDisable && count.i < keys.length);
            }
        }); */
       // setTimeout(() => {
            this.namesrchExecuteQuery();
        //}, 100);
        
    }

    onBack(){
        this.router.navigate([this.routUrl]);
    }
    getOptionList() {
        const optionActiveFlagList = this.oiinamesFactory.findActiveFlagList();
        optionActiveFlagList.subscribe(activeFlagListValue => {
            activeFlagListValue.forEach(element => {
                if (element === 'Y') {
                    element = 'A';
                } else {
                    element = 'I';
                }
                this.activeFlagOption.push({ 'id': element, 'text': element });
            });
        });
    }
    onRowClickagyincpartiesoffender(event,redirect?) {
        // Stop redirection on row clicked... instead apply on cell click (firstName,LastName,PID)
        // if (event && redirect == true) {
        //     this.namesrchModelTemp = event;
        //     this.oiinamesFactory.offenderRowData.push(this.namesrchModelTemp);
        //     this.gettingHeaderData();
        //     this.onOffenderChange();
        // }
        // this.shouldRedirect = true;
    }
    gettingHeaderData() {
        this.namesrchModelTemp.agyLocId=this.sessionManager.currentCaseLoad;
        const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.namesrchModelTemp);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                this.vHeaderBlockModel = list[0];
                if (this.osiosearFactory.selectOffender) {
                    this.osiosearFactory.selectOffender.offenderId = null;
                }
                this.offenderSearchService.selectedOffender = null;
                this.oiinamesFactory.oiinamesflag = true;
                this.oiinamesFactory.agencyIncidentsModeldataTemp;
                this.oiinamesFactory.ctrEveModelTemp;
                this.vHeaderBlockModel.movementReason = this.vHeaderBlockModel.agyLocId;
                this.vHeaderBlockModel.prisonLocation = this.vHeaderBlockModel.livingUnitDescription;
                this.vHeaderBlockModel.status1 = this.vHeaderBlockModel.inOutStatus;
                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                if (this.namesrchModelTemp.activeFlag.localeCompare('A') === 0) {
                    this.vHeaderBlockModel.statusDisplay = 'Active';
                } else {
                    this.vHeaderBlockModel.statusDisplay = 'Inactive';
                }
                this.oiinamesFactory.offsearch = {
                    'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
                    'fname': this.namesrchModelTemp.firstName,
                    'offenderBookId': this.namesrchModelTemp.offenderBookId, 'nbtInst': this.namesrchModelTemp.agyLocId
                };
                if (this.routUrl) {
                    this.router.navigate([this.routUrl]);
                    return;
                }
                if (this.oiinamesFactory.oiiflag) {
                    this.router.navigate(['/OIDINCDE']);
                    return;
                }
                if (!this.oiinamesFactory.oiiflag) {
                    this.oiinamesFactory.oiinamesflag = false;
                    this.router.navigate(['/OWHEADER']);
                    return;
                }
            }
        });
    }
    clearQuery() {
        this.namesrchData = [];
        this.namesrchModelTemp = new VNameSearch();
        this.namesrchModel = new VNameSearch();
        this.onaddfalg = true;
        this.clearDisable = true;
        this.selectDisable = true;
        this.retriveDisable = false;
        this.cancelDisable = false;
        this.namesReadOnly = false;
    }
    // TODO
    // 	 ok() {
    // 	}
    // 	 no() {
    // 	}
    cancel() {
        this.oidbsiapFactory.checkFlag = false;
        this.oidehlocFactory.checkFlag = false;
        if (this.routUrl) {
            this.router.navigate([this.routUrl]);
            return;
        }
        if (this.oiinamesFactory.oiiflag) {
            this.oiinamesFactory.oiinamesflag = true;
            this.router.navigate(['/OIDINCDE']);
        }
        if (!this.oiinamesFactory.oiiflag) {
            this.oiinamesFactory.oiinamesflag = false;
            this.router.navigate(['/home']);
        }
    }
    onOffenderChange() {
        if (this.osiosearFactory.selectOffender) {
            this.osiosearFactory.selectOffender.offenderId = null;
        }
        this.offenderSearchService.selectedOffender = null;
        this.oiinamesFactory.oiinamesflag = true;
        this.oiinamesFactory.agencyIncidentsModeldataTemp;
        this.oiinamesFactory.ctrEveModelTemp;
        this.vHeaderBlockModel.movementReason = this.vHeaderBlockModel.agyLocId;
        this.vHeaderBlockModel.prisonLocation = this.vHeaderBlockModel.livingUnitDescription;
        this.vHeaderBlockModel.status1 = this.vHeaderBlockModel.inOutStatus;
        this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
        if (this.namesrchModelTemp.activeFlag.localeCompare('A') === 0) {
            this.vHeaderBlockModel.statusDisplay = 'Active';
        } else {
            this.vHeaderBlockModel.statusDisplay = 'Inactive';
        }
        this.oiinamesFactory.offsearch = {
            'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
            'fname': this.namesrchModelTemp.firstName,
            'offenderBookId': this.namesrchModelTemp.offenderBookId, 'nbtInst': this.namesrchModelTemp.agyLocId
        };
        if (this.routUrl) {
            this.router.navigate([this.routUrl]);
            return;
        }
        if (this.oiinamesFactory.oiiflag) {
            this.router.navigate(['/OIDINCDE']);
            return;
        }
        if (!this.oiinamesFactory.oiiflag) {
            this.oiinamesFactory.oiinamesflag = false;
            this.router.navigate(['/home']);
            return;
        }

    }

    namesrchExecuteQuery() {
        if (this.namesrchModel.activeFlag) {
            this.namesrchModel.activeFlag = undefined;
        }
        if (this.routUrl === '/OIDINTMV') {
            this.namesrchModel.agyLocId = this.oidintmvFactory.intmovectrlModel.agyLocId;
        }
        if (this.namesrchModel.offenderIdDisplay) {
            for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++) {
                this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
            }
        }
        if(this.sessionManager.currentCaseLoad){
            this.namesrchModel.caseloadId=this.sessionManager.currentCaseLoad;
        }
        const namesrchResult = this.oiinamesFactory.
            namesrchExecuteQuery(this.namesrchModel);
        namesrchResult.subscribe(data => {
            if (data.length === 0) {
                this.namesrchData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                for (let i = 0; i < data.length; i++) {
                    (data[i].activeFlag !== 'Y') ? data[i].activeFlag = 'I' : data[i].activeFlag = 'A';
                }
               // for
                this.namesrchData = data;
                this.onaddfalg = false;
                this.clearDisable = false;
                this.selectDisable = false;
                this.retriveDisable = true;
                this.namesReadOnly = true;
                this.cancelDisable = true;
                this.tableIndex = 0;
            }
        });
    }

    ngOnDestroy() {
        this.oiinamesFactory.oiiflag = false;
        this.oiinamesFactory.oidscmovFlag = false;
        if (this.router.url === this.routUrl && this.router.url === '/OIDBSTRN') {
            this.oidbstrnFactory.nameLovData = this.namesrchModelTemp;
        } else {
            this.oidbstrnFactory.offallschModel = new VOffenderAllSchedules();
            this.oidbstrnFactory.batchUpdModel = new VOffenderAllSchedules();
            this.oidbstrnFactory.offSchRowData = [];
            this.oidbstrnFactory.nameLovData = new VNameSearch();
        }
        if (this.router.url === this.routUrl && this.router.url === '/OIICMOCI') {
            this.oiicmociFactory.nameLovData = this.namesrchModelTemp;
        } else {
            this.oiicmociFactory.crteventsModel = new VCourtEvents();
            this.oiicmociFactory.offschData = [];
        }

        if (this.router.url === this.routUrl && this.router.url === '/OIDSCMOV') {
            this.oiinamesFactory.ctrEveModelTemp;
            this.oiinamesFactory.offsearch;
            this.oiinamesFactory.crtEveDataTemp;
        } else {

        }

        if (this.router.url === this.routUrl && this.router.url === '/OIDBSIAP' && this.oidbsiapFactory.checkFlag) {
            this.oidbsiapFactory.vNameSearch = this.namesrchModelTemp;
        } else {
            this.oidbsiapFactory.vNameSearch = new VNameSearch();
        }
        if (this.router.url === this.routUrl && this.router.url === '/OIDINTMV') {
            this.oidintmvFactory.vNameSearch = this.namesrchModelTemp;
        } else {
            this.oidintmvFactory.vNameSearch = new VNameSearch();
        }
        if (this.router.url === this.routUrl && this.router.url === '/OIDEHLOC' && this.oidehlocFactory.checkFlag) {
            this.oidehlocFactory.nameLovData = this.namesrchModelTemp;
            this.offenderSearchService.selectedOffender = this.oidehlocFactory.vHeaderBlockModel;
        } else {
            if (this.router.url === this.routUrl && this.router.url === '/OIDEHLOC' && !this.oidehlocFactory.checkFlag) {
                this.oidehlocFactory.nameLovData = new VNameSearch();
                this.offenderSearchService.selectedOffender = this.oidehlocFactory.vHeaderBlockModel;
            }
        }
    }
    canNameSearchEdit = (data: any, index: number, field: string): boolean => {
        return this.onaddfalg;
    }
    onGridInsert = () => {
        if (!this.sysDateTemp) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.norowintablesysdual');
            this.show();
            return;
        }
        return {};
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onGridClear = () => {
        this.namesrchData = [];
        this.namesrchModelTemp = new VNameSearch();
    }
    ok(event?) {
        this.namesrchExecuteQuery();
    }

    blurEvent(){
		if (!this.namesrchModel.agyLocId) {
			this.namesrchModel.agyLocId = this.namesrchModel.agyLocId === '' ? undefined : '';
		}
	}

    // TODO
    // 	/**
    // 	 *  This function will be executed when commit event is
    // 	* fired
    // 	*/
    // 	oiinamesSavenamesrchForm(event){
    //// TODO declare commit bean and add insert list to that object.
    // 		this.namesrchinsertList = event.added
    // 		this.namesrchupdateList = event.updated
    // 		this.namesrchdeleteList = event.removed
    // 		this.namesrchCommitModel.insertList = [];
    // 		this.namesrchCommitModel.updateList = [];
    // 		this.namesrchCommitModel.deleteList = [];
    // 		if ( this.namesrchInsertList.length > 0 || this.namesrchalertUpdateList.length > 0 ) {
    // 			 for ( let i = 0; i < this.namesrchInsertList.length; i++ ) {
    // 			}
    // 			 for ( let i = 0; i < this.namesrchUpdateList.length; i++ ) {
    // 			 }
    // 		this.namesrchCommitModel.insertList =this.namesrchInsertList;
    // 		this.namesrchCommitModel.updateList =this.namesrchUpdateList;
    // 		}
    // 		if ( this.namesrchDeleteList.length > 0 ) {
    // 			 for ( let i = 0; i < this.namesrchDeleteList.length; i++ ) {
    // 			 }
    // 		this.namesrchCommitModel.deleteList =this.namesrchDeleteList;
    // 		}
    // 		const namesrchSaveData = this.oiinamesFactory.namesrchCommit( this.namesrchCommitModel );
    // 		namesrchSaveData.subscribe( data => {
    // 		 if ( data === 1 ) {
    // 			this.type = 'info';
    // 			this.message = 'Add/ Update/ Remove record sucess';
    // 			this.show();
    // 		}else{
    // 			this.type = 'warn';
    // 			this.message = 'Add/ Update/ Remove record Failed';
    // 			this.show();
    // 		}
    // 			});
    // 	syspflExecuteQuery() {
    // 				 const syspflResult = oiinamesFactory.
    // 			syspflExecuteQuery(this.syspflModel);
    // 					 syspflResult.subscribe(data => {
    // 					if (syspflResultList.length === 0) {
    // 						this.syspflData = [];
    // 					} else {
    // 						this.syspflData =syspflResultList;
    // 						this.syspflModel = syspflResultList[0];
    // 					}
    // 				});
    // 			}
    //
    // 	nameSrchOnErrorTrigger() {
    // /* Trap errors returning from the server and report in a user
    //   friendly manner*/
    // 		 const errCode = errorCode;
    // 		 const errType = errorType;
    // 		 const serverErr = abs (dbmsErrorCode);
    // 		 const serverMsg = dbmsErrorText;
    // 		 const constraintName;
    // 		 const vAlertNo;
    // 		if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
    // /* Remove recursive errors from the top of the stack */
    // 		while (server_err = 604) {
    // 		  cgte$pop_error_stack (server_err, server_msg);
    // 		}
    // 		  //TODO
    // /* Check and report the generic constraint violations */
    // 		if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
    // 		   throw new Error('form_trigger_failure');
    // 		}
    // 		  //TODO
    // /* Check and report the constraint violations specific to this
    //            block */
    // 		  constraint_name = cgte$strip_constraint (server_msg);
    // 		}
    // 		  //TODO
    // 		 //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
    // 		switch() {
    // 			case ( err_type = 'frm' and err_code = 40202)
    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things
    //     patrick 20/09/2005.  use replace instead of substr and instr.
    //     if the prompt is multi line prompt then it will get displayed as single line prompt upon error.
    //     '*' character won't appear along with the prompt when mandatory value is
    // not entered.replace(replace(get_item_property(system.trigger_item, prompt_text), '*', '')||substr(error_text, 6), chr(10), ' '),
    // null,null,null,null);
    // 		   throw new Error('form_trigger_failure');
    // 			case ( error_code = 40401 or -- no changes to save
    // error_code = 40405 or -- no changes to apply                error_code = 40352 or -- last record of the query retrieved
    //    error_code = 40100 )  -- at first record
    // 		;
    // 			case ( error_code = 41361 or -- cannot navigate out of the current form in enter-query mode.
    // error_code = 41351 or -- cannot navigate out of the current form.
    //  error_code = 41047 or -- cannot navigate out of the current block in enter-query mode.
    //      error_code = 40109 )  -- cannot navigate out of the current block in enter-query mode.
    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
    // 		   throw new Error('form_trigger_failure');
    // 		} else {
    // 		if (! (serverErr >= 20000 &&  serverErr <= 20999) ){
    // /* If error not found, issue default message */
    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
    // 		} else {
    // 		 //-- @@@ GJC 23/05/2006, Added generic lock resource error
    // 		if (serverErr===20951 ){
    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
    // 		} else {
    // 		  this.showErrorForm();
    // 		}
    // 		  //TODO
    // 		   throw new Error('form_trigger_failure');
    // 		}
    // 		  //TODO
    // 		  this.checkBlockErrors();
    // 		  //TODO
    // 	}
    //
    // 	nameSrchPostQueryTrigger() {
    // /* CGFD$DERIVE_NBT_ON_QUERY */
    // /* This calls user trigger(s) to derive the values of any non-table */
    // /* items in the block whose values depend on the base table items   */
    // /* just queried.                                                    */
    // 		  this.cgfdGetNameSrchDrvActive(name_srch.drv_active_flag
    /* mod item being derived
     */// , // name_srch.active_flag    );
    /* in  item value                 */
    // 	}
    //
    // 	nameSrchPreQueryTrigger() {
    // 		 //--@@@ Erin 20-Apr-2006 #1429: Append to code to where clause in PLL
    // 		  block_id    block           = find_block ('name_srch');
    // 		 const defWhere = getBlockProperty('nameSrch',defaultWhere);
    // 		 const vAlertNo;
    // 		  //TODO
    // 		  function add_and (p_where in varchar2)
    // 		  this.is();
    // 		if ((nvl (nvl (length (pWhere), 0), 0) != 0) ){
    // 		  return (p_where || ' and ');
    // 		} else {
    // 		  return (p_where);
    // 		}
    // 		  //TODO
    // 		  return null;
    // 		 //--@@@ Erin 20-Apr-2006 #1326: Query by AGY_LOC_ID (if present)
    // 		if (parameterModel.pAgyLocId !== null ){
    // 		  name_srch.agy_loc_id = parameter.p_agy_loc_id;
    // 		}
    // 		 //--@@@ Erin 20-Apr-2006 #1326: End of Fix
    // 		  //TODO
    // 		  set_block_property (block_id, default_where, def_where);
    // 		  //TODO
    // 		 //--@@@ Erin 20-Apr-2006 #1429: End of Fix
    // 	}
    //
    // 	cg$ctrlOnErrorTrigger() {
    // /* Trap errors returning from the server and report in a user
    //   friendly manner*/
    // 		 const errCode = errorCode;
    // 		 const errType = errorType;
    // 		 const serverErr = abs (dbmsErrorCode);
    // 		 const serverMsg = dbmsErrorText;
    // 		 const constraintName;
    // 		 const vAlertNo;
    // 		if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
    // /* Remove recursive errors from the top of the stack */
    // 		while (server_err = 604) {
    // 		  cgte$pop_error_stack (server_err, server_msg);
    // 		}
    // 		  //TODO
    // /* Check and report the generic constraint violations */
    // 		if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
    // 		   throw new Error('form_trigger_failure');
    // 		}
    // 		  //TODO
    // /* Check and report the constraint violations specific to this
    //            block */
    // 		  constraint_name = cgte$strip_constraint (server_msg);
    // 		}
    // 		  //TODO
    // 		 //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
    // 		switch() {
    // 			case ( err_type = 'frm' and err_code = 40202)
    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgError// @@@ venu 31/08/2005, fixed following things
    //     patrick 20/09/2005.  use replace instead of substr and instr.

    // 		  this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
    // 		   throw new Error('form_trigger_failure');
    // 		} else {
    // 		if (! (serverErr >= 20000 &&  serverErr <= 20999) ){
    // /* If error not found, issue default message */
    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
    // 		} else {
    // 		 //-- @@@ GJC 23/05/2006, Added generic lock resource error
    // 		if (serverErr===20951 ){
    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
    // 		} else {
    // 		  this.showErrorForm();
    // 		}
    // 		  //TODO
    // 		   throw new Error('form_trigger_failure');
    // 		}
    // 		  //TODO
    // 		  this.checkBlockErrors();
    // 		  //TODO
    // 	}
    //
    // 	sysPflOnErrorTrigger() {
    // /* Trap errors returning from the server and report in a user
    //   friendly manner*/
    // 		 const errCode = errorCode;
    // 		 const errType = errorType;
    // 		 const serverErr = abs (dbmsErrorCode);
    // 		 const serverMsg = dbmsErrorText;
    // 		 const constraintName;
    // 		 const vAlertNo;
    // 		if ((errType==='frm' &&  errCode in (40506, 40508, 40509, 40510)) ){
    // /* Remove recursive errors from the top of the stack */
    // 		while (server_err = 604) {
    // 		  cgte$pop_error_stack (server_err, server_msg);
    // 		}
    // 		  //TODO
    // /* Check and report the generic constraint violations */
    // 		if ((cgte$checkConstraintVio (serverErr, serverMsg)) ){
    // 		   throw new Error('form_trigger_failure');
    // 		}
    // 		  //TODO
    // /* Check and report the constraint violations specific to this
    //            block */
    // 		  constraint_name = cgte$strip_constraint (server_msg);
    // 		}
    // 		  //TODO
    // 		 //-- @@@ Venu 22/05/2006, Ergonomics: Modified code to suppress generic oracle error messages.
    // 		switch() {
    // 			case ( err_type = 'frm' and err_code = 40202)
    // 		  v_alert_no =

    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgErrorerror_text|| 'press exit first',null,null,null,null);
    // 		   throw new Error('form_trigger_failure');
    // 		} else {
    // 		if (! (serverErr >= 20000 &&  serverErr <= 20999) ){

    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgErrorerror_type|| '-'|| to_char (error_code)|| ' '|| error_text,null,null,null,null);
    // 		} else {
    // 		 //-- @@@ GJC 23/05/2006, Added generic lock resource error
    // 		if (serverErr===20951 ){
    // 		  v_alert_no =
    // 		  this.displayTheAlertCfgError'error this resource is currently locked by another user.',null,null,null,null);
    // 		} else {
    // 		  this.showErrorForm();
    // 		}
    // 		  //TODO
    // 		   throw new Error('form_trigger_failure');
    // 		}
    // 		  //TODO
    // 		  this.checkBlockErrors();
    // 		  //TODO
    //
    // 	butOffendersWhenButtonPressedTrigger() {
    // 		  //TODO
    // 	}
    //
    // 	butOffendersKeyNextItemTrigger() {
    // 		  //TODO
    //
    // 	butOffendersKeyPrevItemTrigger() {
    // 		  //TODO
    // 	}
    //
    // 	butWorksWhenButtonPressedTrigger() {
    //
    // 	}
    //
    // 	butWorksKeyNextItemTrigger() {
    //
    // 	}
    //
    // 	butWorksKeyPrevItemTrigger() {
    //
    // 	}
    //
    // 	butCalendarWhenButtonPressedTrigger() {
    //
    // 	}
    //
    // 	butCalendarKeyNextItemTrigger() {
    //
    // 	}
    //
    // 	butCalendarKeyPrevItemTrigger() {
    //
    // 	}
    //
    // 	butOffUpdatesWhenButtonPressedTrigger() {
    //
    // 	}
    //
    // 	butOffUpdatesKeyNextItemTrigger() {
    //
    // 	}
    //
    // 	butOffUpdatesKeyPrevItemTrigger() {
    //
    // 	}
    //
    // 	butDetailWhenButtonPressedTrigger() {
    //
    // 	}
    //
    // 	butDetailKeyNextItemTrigger() {
    //
    // 	}
    //
    // 	butDetailKeyPrevItemTrigger() {
    //
    // 	}
    //
    // 	mymenuOnErrorTrigger() {
    //
    // 	}
    //
    // 	oiinamesOnErrorTrigger() {
    // 		 const errCode = errorCode;
    // 		 const errType = errorType;
    // 		if ((errType==='frm' &&  errCode in (41056 )) ){
    // 		;
    // 		}
    // 	}
    //
    // 	oiinamesKeyMenuTrigger() {
    // /*CGBS$TOGGLE_QUERY_MODE */
    // /*This changes the mode of block synchronization so that if it is */
    // /*currently ON, then it is changed to OFF, and vice-versa.        */
    // /*It also queries the dependent blocks as appropriate for the     */
    // /*new mode.                                                  */
    // 		  cgbs$toggle( global.cg$query_mode );
    // 	}
    //
    // 	oiinamesKeyClrblkTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibKillCreateHModel.keyClrblk1 ){
    // 		  applib_kill_create_h.key_clrblk;	// application hook
    // 		}
    // 		if (! modlibKillCreateHModel.keyClrblk2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyClrfrmTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibKillCreateHModel.keyClrfrm1 ){
    // 		  applib_kill_create_h.key_clrfrm;	// application hook
    // 		}
    // 		if (! modlibKillCreateHModel.keyClrfrm2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    //
    // /*CGGN$KEY_CLRFRM */
    // /*Perform the key's standard functionality */
    // 		  this.clearForm();
    // 		if (systemModel.formStatus==='changed' ){
    // 		   throw new Error('form_trigger_failure');
    // 		}
    //
    // /*CGCF$PERFORM_STARTUP */
    // /*Execute the WHEN-NEW-FORM-INSTANCE code that was created by Forms */
    // /*  Generator                                                       */
    // 		  this.cg$whenNewFormInstance();
    // 	}
    //
    // 	oiinamesKeyClrrecTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibKillCreateHModel.keyClrrec1 ){
    // 		  applib_kill_create_h.key_clrrec;	// application hook
    // 		}
    // 		if (! modlibKillCreateHModel.keyClrrec2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyCrerecTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibKillCreateHModel.keyCrerec1 ){
    // 		  applib_kill_create_h.key_crerec;	// application hook
    // 		}
    // 		if (! modlibKillCreateHModel.keyCrerec2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyDuprecTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibKillCreateHModel.keyDuprec1 ){
    // 		  applib_kill_create_h.key_duprec;	// application hook
    // 		}
    // 		if (! modlibKillCreateHModel.keyDuprec2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyDupItemTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibKillCreateHModel.keyDupItem1 ){
    // 		  applib_kill_create_h.key_dup_item;	// application hook
    // 		}
    // 		if (! modlibKillCreateHModel.keyDupItem2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenClearBlockTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibKillCreateHModel.whenClearBlock1 ){
    // 		  applib_kill_create_h.when_clear_block;	// application hook
    // 		}
    // 		if (! modlibKillCreateHModel.whenClearBlock2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenCreateRecordTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibKillCreateHModel.whenCreateRecord1 ){
    // 		  applib_kill_create_h.when_create_record;	// application hook
    // 		}
    // 		if (! modlibKillCreateHModel.whenCreateRecord2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenRemoveRecordTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibKillCreateHModel.whenRemoveRecord1 ){
    // 		  applib_kill_create_h.when_remove_record;	// application hook
    // 		}
    // 		if (! modlibKillCreateHModel.whenRemoveRecord2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyEditTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.keyEdit1 ){
    // 		  applib_item_h.key_edit;	// application hook
    // 		}
    // 		if (! modlibItemHModel.keyEdit2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyListvalTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.keyListval1 ){
    // 		  applib_item_h.key_listval;	// application hook
    // 		}
    // 		if (! modlibItemHModel.keyListval2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostChangeTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.postChange1 ){
    // 		  applib_item_h.post_change;	// application hook
    // 		}
    // 		if (! modlibItemHModel.postChange2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenButtonPressedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.whenButtonPressed1 ){
    // 		  applib_item_h.when_button_pressed;	// application hook
    // 		}
    // 		if (! modlibItemHModel.whenButtonPressed2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenCheckboxChangedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.whenCheckboxChanged1 ){
    // 		  applib_item_h.when_checkbox_changed;	// application hook
    // 		}
    // 		if (! modlibItemHModel.whenCheckboxChanged2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenCustomItemEventTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.wCustomItemEvent1 ){
    // 		  applib_item_h.w_custom_item_event;	// application hook
    // 		}
    // 		if (! modlibItemHModel.wCustomItemEvent2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenImageActivatedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.whenImageActivated1 ){
    // 		  applib_item_h.when_image_activated;	// application hook
    // 		}
    // 		if (! modlibItemHModel.whenImageActivated2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenImagePressedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.whenImagePressed1 ){
    // 		  applib_item_h.when_image_pressed;	// application hook
    // 		}
    // 		if (! modlibItemHModel.whenImagePressed2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenListActivatedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.whenListActivated1 ){
    // 		  applib_item_h.when_list_activated;	// application hook
    // 		}
    // 		if (! modlibItemHModel.whenListActivated2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenRadioChangedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.whenRadioChanged1 ){
    // 		  applib_item_h.when_radio_changed;	// application hook
    // 		}
    // 		if (! modlibItemHModel.whenRadioChanged2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenMouseClickTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibMouseHModel.whenMouseClick1 ){
    // 		  applib_mouse_h.when_mouse_click;	// application hook
    // 		}
    // 		if (! modlibMouseHModel.whenMouseClick2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenMouseDoubleclickTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibMouseHModel.whenMouseDoubClick1 ){
    // 		  applib_mouse_h.when_mouse_doub_click;	// application hook
    // 		}
    // 		if (! modlibMouseHModel.whenMouseDoubClick2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenListChangedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibItemHModel.whenListChanged1 ){
    // 		  applib_item_h.when_list_changed;	// application hook
    // 		}
    // 		if (! modlibItemHModel.whenListChanged2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenMouseEnterTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibMouseHModel.whenMouseEnter1 ){
    // 		  applib_mouse_h.when_mouse_enter;	// application hook
    // 		}
    // 		if (! modlibMouseHModel.whenMouseEnter2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenMouseLeaveTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibMouseHModel.whenMouseLeave1 ){
    // 		  applib_mouse_h.when_mouse_leave;	// application hook
    // 		}
    // 		if (! modlibMouseHModel.whenMouseLeave2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyDownTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyDown1 ){
    // 		  applib_navigate_h.key_down;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyDown2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyExitTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyExit1 ){
    // 		  applib_navigate_h.key_exit;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyExit2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    //
    // 		 //-- new code from triggeradd --
    // 		 //--
    // 		 //-- @@@ Vipul on 28-SEP-2001 : Tracking# 8862 : Added call to procedure
    // 		 //--     in application library to handle coordination of menu and forms
    // 		 //--
    // 		 //--@@@ Erin 29-Mar-2006 Added to erase variable passed form OIDPAWLI
    // 		  global.form_form = null;
    // 		 //--@@@ Erin 29-Mar-2006 End of Code
    //
    // 		  this.undoPostFormInit();
    //
    // 		 //-- end new code --
    // 	}
    //
    // 	oiinamesKeyNxtblkTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyNxtblk1 ){
    // 		  applib_navigate_h.key_nxtblk;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyNxtblk2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyNxtkeyTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyNxtkey1 ){
    // 		  applib_navigate_h.key_nxtkey;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyNxtkey2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyNxtrecTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyNxtrec1 ){
    // 		  applib_navigate_h.key_nxtrec;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyNxtrec2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyNxtsetTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyNxtset1 ){
    // 		  applib_navigate_h.key_nxtset;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyNxtset2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyNextItemTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyNextItem1 ){
    // 		  applib_navigate_h.key_next_item;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyNextItem2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyPrvblkTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyPrvblk1 ){
    // 		  applib_navigate_h.key_prvblk;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyPrvblk2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyPrvrecTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyPrvrec1 ){
    // 		  applib_navigate_h.key_prvrec;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyPrvrec2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyPrevItemTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyPrevItem1 ){
    // 		  applib_navigate_h.key_prev_item;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyPrevItem2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyScrdownTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyScrdown1 ){
    // 		  applib_navigate_h.key_scrdown;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyScrdown2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyScrupTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyScrdown1 ){
    // 		  applib_navigate_h.key_scrup;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyScrup2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyUpTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.keyUp1 ){
    // 		  applib_navigate_h.key_scrup;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.keyUp2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostBlockTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.postBlock1 ){
    // 		  applib_navigate_h.post_block;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.postBlock2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostFormTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.postForm1 ){
    // 		  applib_navigate_h.post_form;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.postForm2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostRecordTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.postRecord1 ){
    // 		  applib_navigate_h.post_record;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.postRecord2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostTextItemTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.postTextItem1 ){
    // 		  applib_navigate_h.post_text_item;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.postTextItem2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPreBlockTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.preBlock1 ){
    // 		  applib_navigate_h.pre_block;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.preBlock2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPreFormTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    // 		 //-- set_window_property(FORMS_MDI_WINDOW,TITLE,
    // 		 //--      get_item_property('CG$CTRL.CG$AT',HINT_TEXT));
    // 		if (modlibNavigateHModel.preForm1 ){
    // 		  applib_navigate_h.pre_form;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.preForm2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPreRecordTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.preRecord1 ){
    // 		  applib_navigate_h.pre_record;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.preRecord2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPreTextItemTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.preTextItem1 ){
    // 		  applib_navigate_h.pre_text_item;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.preTextItem2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenNewRecordInstanceTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.whenNewRecInstance1 ){
    // 		  applib_navigate_h.when_new_rec_instance;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.whenNewRecInstance2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenNewFormInstanceTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    // 		  this.createLibraryGlobals();
    // 		 //--IF MODLIB_Navigate_H.W_NEW_FORM_INSTANCE_1 THEN	-- module hook #1
    // 		  applib_navigate_h.w_new_form_instance;	// application hook
    // /*END IF;
    // I F NOT MODLIB_Navigate_H.W_NEW_FORM_INSTANCE_2 THEN -- call module hook #2
    // 	return;	   -- option to bypass Designer/2000 code
    // END IF; */
    // 		 //-- ---------------------------------------------
    // 		 //---Added for HPQC#639------
    // 		  copy(null, 'global.last_name');
    // 		  copy(null, 'global.first_name');
    // 		  copy(null, 'global.offender_id_display');
    // 		  copy(null, 'global.agy_loc_id');
    // 		  copy(null, 'global.living_unit_description');
    // 		  copy(null, 'global.offender_book_id');
    // 		  copy(null, 'global.offender_id');
    // 		 //---End Added for HPQC#639---
    // 		 //--@@@ Erin 29-Mar-2006 Auto-queries form when called from OIDPAWLI
    // /*IF :global.from_form = 'OIDPAWLI' THEN
    //   IF :parameter.p_agy_loc_id IS NOT NULL THEN
    //       go_block('name_srch');*/
    // 		 //--:system.message_level := '10';
    // 		  this.enterQuery();
    // 		 //--:system.message_level := '0';
    // /*END IF;
    // END IF;* /
    // 		 //--@@@ Erin 29-Mar-2006 End of Code
    //
    // /*CGGN$CALL_GENERATOR_CODE */
    // /*Execute the WHEN-NEW-FORM-INSTANCE code that was created by Forms */
    // /*  Generator                                                       */
    // 		  this.cg$whenNewFormInstance();
    // 	}
    //
    // 	oiinamesWhenNewBlockInstanceTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.wNewBlockInstance1 ){
    // 		  applib_navigate_h.w_new_block_instance;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.wNewBlockInstance2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    //
    // /*CGLY$MANAGE_CANVASES */
    // /*Call procedure to ensure correct canvases are visible */
    // 	}
    //
    // 	oiinamesWhenNewItemInstanceTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibNavigateHModel.wNewItemInstance1 ){
    // 		  applib_navigate_h.w_new_item_instance;	// application hook
    // 		}
    // 		if (! modlibNavigateHModel.wNewItemInstance2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyCqueryTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibQueryHModel.keyCquery1 ){
    // 		  applib_query_h.key_cquery;	// application hook
    // 		}
    // 		if (! modlibQueryHModel.keyCquery2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyEntqryTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibQueryHModel.keyEntqry1 ){
    // 		  applib_query_h.key_entqry;	// application hook
    // 		}
    // 		if (! modlibQueryHModel.keyEntqry2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // /*CGBS$KEY_ENTQRY_FRM */
    // /*Check if query is allowed to avoid unnecessary coordination */
    // 		if ((getBlockProperty( systemModel.triggerBlock, queryAllowed)==='false') ){
    // 		   throw new Error('form_trigger_failure');
    // 		}
    // 		  cgbs$.do_keyqry( system.trigger_block, 'enter_query', system.mode);
    // 	}
    //
    // 	oiinamesKeyExeqryTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibQueryHModel.keyExeqry1 ){
    // 		  applib_query_h.key_exeqry;	// application hook
    // 		}
    // 		if (! modlibQueryHModel.keyExeqry2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // /*CGBS$KEY_EXEQRY_FRM */
    // /*Check if query is allowed to avoid unnecessary coordination */
    // 		if ((getBlockProperty( systemModel.triggerBlock, queryAllowed)==='false') ){
    // 		  message('error query not allowed in this block');
    // 		   throw new Error('form_trigger_failure');
    // 		}
    //
    // 		 //--  CGBS$.DO_KEYQRY( :SYSTEM.TRIGGER_BLOCK, 'EXECUTE_QUERY', :SYSTEM.MODE);
    // 	}
    //
    // 	oiinamesOnCountTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibQueryHModel.onCount1 ){
    // 		  applib_query_h.on_count;	// application hook
    // 		}
    // 		if (! modlibQueryHModel.onCount2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostQueryTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibQueryHModel.postQuery1 ){
    // 		  applib_query_h.post_query;	// application hook
    // 		}
    // 		if (! modlibQueryHModel.postQuery2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPreQueryTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibQueryHModel.preQuery1 ){
    // 		  applib_query_h.pre_query;	// application hook
    // 		}
    // 		if (! modlibQueryHModel.preQuery2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesOnCheckDeleteMasterTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibRelationHModel.onCheckDelMaster1 ){
    // 		  applib_relation_h.on_check_del_master;	// application hook
    // 		}
    // 		if (! modlibRelationHModel.onCheckDelMaster2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesOnClearDetailsTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibRelationHModel.onClearDetails1 ){
    // 		  applib_relation_h.on_clear_details;	// application hook
    // 		}
    // 		if (! modlibRelationHModel.onClearDetails2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesOnPopulateDetailsTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibRelationHModel.onPopulateDetails1 ){
    // 		  applib_relation_h.on_populate_details;	// application hook
    // 		}
    // 		if (! modlibRelationHModel.onPopulateDetails2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyCommitTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.keyCommit1 ){
    // 		  applib_transactional_h.key_commit;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.keyCommit2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyUpdrecTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.keyUpdrec1 ){
    // 		  applib_transactional_h.key_updrec;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.keyUpdrec2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyDelrecTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.keyDelrec1 ){
    // 		  applib_transactional_h.key_delrec;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.keyDelrec2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesOnCommitTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.onCommit1 ){
    // 		  applib_transactional_h.on_commit;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.onCommit2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesOnInsertTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.onInsert1 ){
    // 		  applib_transactional_h.on_insert;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.onInsert2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesOnUpdateTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.onUpdate1 ){
    // 		  applib_transactional_h.on_update;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.onUpdate2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostDeleteTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.postDelete1 ){
    // 		  applib_transactional_h.post_delete;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.postDelete2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostInsertTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.postInsert1 ){
    // 		  applib_transactional_h.post_insert;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.postInsert2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostUpdateTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.postUpdate1 ){
    // 		  applib_transactional_h.post_update;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.postUpdate2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPreCommitTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.preCommit1 ){
    // 		  applib_transactional_h.pre_commit;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.preCommit2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPreDeleteTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.preDelete1 ){
    // 		  applib_transactional_h.pre_delete;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.preDelete2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPreInsertTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.preInsert1 ){
    // 		  applib_transactional_h.pre_insert;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.preInsert2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPreUpdateTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.preUpdate1 ){
    // 		  applib_transactional_h.pre_update;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.preUpdate2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostFormsCommitTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.postFormsCommit1 ){
    // 		  applib_transactional_h.post_forms_commit;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.postFormsCommit2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesPostDatabaseCommitTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibTransactionalHModel.postDatabaseCommit1 ){
    // 		  applib_transactional_h.post_database_commit;	// application hook
    // 		}
    // 		if (! modlibTransactionalHModel.postDatabaseCommit2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenValidateItemTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibValidationHModel.whenValidateItem1 ){
    // 		  applib_validation_h.when_validate_item;	// application hook
    // 		}
    // 		if (! modlibValidationHModel.whenValidateItem2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenValidateRecordTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Application Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibValidationHModel.whenValidateRecord1 ){
    // 		  applib_validation_h.when_validate_record;	// application hook
    // 		}
    // 		if (! modlibValidationHModel.whenValidateRecord2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesKeyHelpTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Event Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibVariousHModel.keyHelp1 ){
    // 		  applib_various_h.key_help;	// application hook
    // 		}
    // 		if (! modlibVariousHModel.keyHelp2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    //
    // /*CGHP$CALL_HELP_FORM */
    // /*Call the help system after setting globals with current block and */
    // /*  item                                                            */
    // 		;
    // 	}
    //
    // 	oiinamesKeyPrintTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Event Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibVariousHModel.keyPrint1 ){
    // 		  applib_various_h.key_print;	// application hook
    // 		}
    // 		if (! modlibVariousHModel.keyPrint2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenWindowActivatedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Event Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibWindowHModel.whenWindowActivated1 ){
    // 		  applib_window_h.when_window_activated;	// application hook
    // 		}
    // 		if (! modlibWindowHModel.whenWindowActivated2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenWindowClosedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Event Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibWindowHModel.whenWindowClosed1 ){
    // 		  applib_window_h.when_window_closed;	// application hook
    // 		}
    // 		if (! modlibWindowHModel.whenWindowClosed2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenWindowResizedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Event Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibWindowHModel.whenWindowResized1 ){
    // 		  applib_window_h.when_window_resized;	// application hook
    // 		}
    // 		if (! modlibWindowHModel.whenWindowResized2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesWhenWindowDeactivatedTrigger() {
    // 		 //-- ---------------------------------------------
    // 		 //-- 		Event Hooks
    // 		 //-- ---------------------------------------------
    //
    // 		if (modlibWindowHModel.wWindowDeactivated1 ){
    // 		  applib_window_h.w_window_deactivated;	// application hook
    // 		}
    // 		if (! modlibWindowHModel.wWindowDeactivated2 ){
    // 		  return;	   // option to bypass designer/2000 code
    // 		}
    // 		 //-- ---------------------------------------------
    // 	}
    //
    // 	oiinamesTrigger65Trigger() {
    // 		  applib_navigate_h.pre_text_item;	// application hook
    // 	}
    //
    // 	oiinamesTrigger66Trigger() {
    // 		  applib_navigate_h.post_text_item;	// application hook
    // 	}

}
