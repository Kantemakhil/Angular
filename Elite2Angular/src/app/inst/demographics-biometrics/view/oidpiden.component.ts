import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { OidpidenService } from '../service/oidpiden.service';
import { OffenderPhysicalAttributes } from '@commonbeans/OffenderPhysicalAttributes';
import { OffenderPhysicalAttributesCommitBean } from '@commonbeans/OffenderPhysicalAttributesCommitBean';
import { Offenders } from '@commonbeans/Offenders';
import { OffenderProfileDetails } from '@commonbeans/OffenderProfileDetails';
import { OffenderProfileDetailsCommitBean } from '@commonbeans/OffenderProfileDetailsCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderIdentifyingMark } from '@instdemographicsbeans/OffenderIdentifyingMark';
import { OffenderIdentifyingMarksCommitBean } from '@instdemographicsbeans/OffenderIdentifyingMarksCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OffendersCommitBean } from '@instdemographicsbeans/OffendersCommitBean';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Images } from '@commonbeans/Images';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { Router } from '@angular/router';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OidmbrdtService } from '@inst/securitythreatgroups/service/oidmbrdt.service';
import { OnDestroy } from '@angular/core';
import {InjectOffenderService} from '@core/service/inject-offender.service';

@Component( {
    selector: 'app-oidpiden',
    templateUrl: './oidpiden.component.html',
    styleUrls: ['./oidpiden.component.scss']
} )

export class OidpidenComponent implements OnInit, OnDestroy {
    @ViewChild('physicalMarksGrid') physicalMarksGrid: any;
    offpaCommitModel: OffenderPhysicalAttributesCommitBean = new OffenderPhysicalAttributesCommitBean();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    msgs: any[] = [];
    translateLabel: any;
    offpaData: OffenderPhysicalAttributes[] = [];
    offpaModel: OffenderPhysicalAttributes = new OffenderPhysicalAttributes();
    offpaInsertList: OffenderPhysicalAttributes[];
    offpaUpdatetList: OffenderPhysicalAttributes[] = [];
    offpaDeleteList: OffenderPhysicalAttributes[] = [];
    offraceData: Offenders[] = [];
    offraceModel: Offenders = new Offenders();
    offraceCommitModel: OffendersCommitBean = new OffendersCommitBean();
    offraceInsertList: Offenders[] = [];
    offraceUpdatetList: Offenders[] = [];
    offraceDeleteList: Offenders[] = [];
    offpdData: OffenderProfileDetails[] = [];
    offpdModel: OffenderProfileDetails = new OffenderProfileDetails();
    offpdInsertList: OffenderProfileDetails[] = [];
    offpdUpdateList: OffenderProfileDetails[] = [];
    offpdDeleteList: OffenderProfileDetails[] = [];
    offpdCommitModel: OffenderProfileDetailsCommitBean = new OffenderProfileDetailsCommitBean();
    offimData: OffenderIdentifyingMark[] = [];
    offimModel: OffenderIdentifyingMark = new OffenderIdentifyingMark();
    imgModel: Images = new Images();
    imgData: Images[] = [];
    offimInsertList: OffenderIdentifyingMark[] = [];
    offimUpdatetList: OffenderIdentifyingMark[] = [];
    offimDeleteList: OffenderIdentifyingMark[] = [];
    offimCommitModel: OffenderIdentifyingMarksCommitBean = new OffenderIdentifyingMarksCommitBean();
    rgprofileRg: any[] = [];
    rgracecodeRg: any[] = [];
    offpdDataColumnDefs: any[];
    offimDataColumnDefs: any[];
    disable: boolean;
    image: any;
    linkDetails: any;
    profileType: any;
    index = -1;
    butPmInsert: boolean;
    removeBtn: boolean;
    imageFlag = false;
    profileCategory: any;
    heightFtReadOnly: boolean;
    heightInReadOnly: boolean;
    heightCmReadOnly: boolean;
    weightLbsReadOnly: boolean;
    weightKgReadOnly: boolean;
    raceCodeReadOnly: boolean;
    checkCentimeterValue: boolean;
    selected = -1;
    faceCameraButon: boolean;
    gridCamerabutton: boolean;
    backBtn = false;
    disableFlag: boolean;
    isDisabled:boolean;
    offpaModelData: OffenderPhysicalAttributes = new OffenderPhysicalAttributes();
    offraceModelTemp: Offenders = new Offenders();

    constructor( private oidpidenFactory: OidpidenService, private offenderSearchService: OffenderSearchService,
        private osiosearFactory: OsiosearService,
                public translateService: TranslateService, private sessionManager: UserSessionManager, private router: Router,
                private dialogService: DialogService, private oidmbrdtFactory: OidmbrdtService, private injectOffenderService: InjectOffenderService ) {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }
    ngOnInit() {
        if (this.oidmbrdtFactory.viewBtnFlag) {
            this.backBtn = true;
        }
        this.faceCameraButon = true;
        this.gridCamerabutton = true;
        this.disable = true;
        this.disableFlag = true;
        this.heightFtReadOnly = true;
        this.heightInReadOnly = true;
        this.heightCmReadOnly = true;
        this.weightLbsReadOnly = true;
        this.weightKgReadOnly = true;
        this.raceCodeReadOnly = true;
        this.checkCentimeterValue = true;
        this.isDisabled= true;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.translateLabel = JSON.parse( sessionStorage.getItem( 'i18data' ) );
        this.offimDataColumnDefs = [
            {
                fieldName: this.translateService.translate( 'common.type' ) + '*', field: 'markType', datatype: 'lov',
                domain: 'MARK_TYPE', editable: true, width: 200, optionWidth: 300, titles: {code: 'Code', description: 'Description'}
            },
            {
                fieldName: this.translateService.translate( 'oidpiden.side' ), field: 'sideCode', datatype: 'lov',
                domain: 'SIDE', editable: true, width: 200, optionWidth: 300, titles: {code: 'Code', description: 'Description'}
            },
            {
                fieldName: this.translateService.translate( 'oidpiden.bodypart' ) + '*', field: 'bodyPartCode', datatype: 'lov',
                domain: 'BODY_PART', editable: true, width: 200, optionWidth: 300, titles: {code: 'Code', description: 'Description'}
            },
            {
                fieldName: this.translateService.translate( 'oidpiden.orientation' ), field: 'partOrientationCode', datatype: 'lov',
                domain: 'PART_ORIENT', editable: true, width: 200, optionWidth: 300, titles: {code: 'Code', description: 'Description'}
            },
            {
                fieldName: this.translateService.translate( 'common.comment' ), field: 'commentText', editable: true,
                width: 200, maxlength: 240 , datatype: 'text',uppercase: 'false'
            },
           
            {
                fieldName: this.translateService.translate('housingview.image'),
                field: 'imageUrl', editable: true, width: 100, datatype: 'hyperlink', link: '/propertyimagedialog', displayas: 'image', modal: true,
                data: 'row', dialogWidth: '30%', styleClass: 'thumbImg'
            },
            {
                fieldName: '',
                field: 'cameraLaunchButton', editable: false, width: 220, datatype: 'hyperlink', link: '/oiuimagedialog', displayas: 'image', modal: true,
                data: 'row', dialogWidth: '20%', updateField: 'row',onLaunchClick: this.onGridImageClick
            },
        ];

        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        this.oidpidenpaExecuteQuery();
        this.offraceExecuteQuery();
    }


    onOffenderChange(offender) {
        if (offender) {
            this.vHeaderBlockModel = offender;
            this.removeBtn = (this.vHeaderBlockModel.statusDisplay === 'Inactive') ? false : true;
             this.offimModel = new OffenderIdentifyingMark();
             this.imgModel = new Images();
             this.offimModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.oidpidencheckProfileDetails();
            this.oidpidenPdExecuteQuery();
            this.oidpidenpaExecuteQuery();
            this.oidpidenImageExecuteQuery() ;
            this.oidpidenimExecuteQuery();
             this.offraceExecuteQuery();
             this.disableFlag = true;
             
             this.heightFtReadOnly = false;
             this.heightInReadOnly = false;
             this.heightCmReadOnly = false;
             this.weightLbsReadOnly = false;
             this.weightKgReadOnly = false;
             this.raceCodeReadOnly = false;
             this.checkCentimeterValue = false;
             this.faceCameraButon = false;
             this.isDisabled= true;
        } else {
            this.vHeaderBlockModel = offender;
            this.offpaData = [];
            this.offimData = [];
            this.offpdData = [];
            this.offpaModel = new OffenderPhysicalAttributes();
            this.offimModel = new OffenderIdentifyingMark();
            this.imgModel = new Images();
            this.offraceModel = new Offenders();
            this.disableFlag = true;
            this.faceCameraButon = true;
            this.gridCamerabutton = true;

            this.heightFtReadOnly = true;
            this.heightInReadOnly = true;
            this.heightCmReadOnly = true;
            this.weightLbsReadOnly = true;
            this.weightKgReadOnly = true;
            this.raceCodeReadOnly = true;
            this.checkCentimeterValue = true;
        }
    }
    save(offpdModel) {
        const serviceObj1 = this.oidpidenFactory.rgProfileRecordGroup(this.offpdModel.profileType);
   serviceObj1.subscribe(res => {
           if (res.length === 0) {
                return;
            } else {
           for (let i = 0; i < res.length; i++) {
           this.rgprofileRg.push({ 'label': res[i].id + ' - ' +
                            res[i].name, 'value': res[i].name });
       }
       }
   });
    }
    onRowClickoffpd(event) {
        this.offpdModel = new OffenderProfileDetails();
        this.offpdModel = event;
        this.save(this.offpdModel);
    }
   onRowClickoffim(event) {
        this.offimModel = new OffenderIdentifyingMark;
        this.offimModel = event;
   }
     oidpidencheckProfileDetails () {
       if (this.vHeaderBlockModel) {
           this.vHeaderBlockModel.activeFlag = 'Y';
           this.offpdModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
          this.offpdModel.caseloadType = 'INST';
          this.profileCategory = 'PA';
           const serviceObj2 = this.oidpidenFactory.checkProfileDetails(this.offpdModel.offenderBookId,
                                                          this.offpdModel.caseloadType, this.profileCategory);
           serviceObj2.subscribe(res => {
            // this.oidpidenPdExecuteQuery();
                   if (res.length === 0) {
                        return;
                    } else {
                        return res;
               }
           });
       } else {
        this.vHeaderBlockModel.activeFlag = 'N';
       }

}
    onFingerPrintclick() {
    }

    clearAttributes() {
        this.oidpidenpaExecuteQuery();
        this.offraceExecuteQuery();
    }

    centemeter()    {
        if (this.vHeaderBlockModel.offenderBookId != null ) {
        if ( String(this.offpaModel.heightCm).length > 3 || this.offpaModel.heightCm < 0) {
            this.checkCentimeterValue = true;
            return;
        } else {
            this.checkCentimeterValue = false;
        }
        if (this.offpaModel.heightIn === null) {
            this.offpaModel.heightIn = 0;
        }
        if (this.offpaModel.heightFt === null) {
            this.offpaModel.heightFt = 0;
        }
        if (this.offpaModel.heightCm === null) {
            this.offpaModel.heightCm = 0;
            this.offpaModel.heightFt = 0;
            this.offpaModel.heightIn = 0;
        }
        if (this.offpaModel.heightCm === 0) {
            this.offpaModel.heightCm = 0;
            this.offpaModel.heightFt = 0;
            this.offpaModel.heightIn = 0;
        }
        if (this.offpaModel.heightCm > 0) {
            if (this.offpaModel.heightCm >= 30) {
                const feet =  Math.round( this.offpaModel.heightCm / 30.48);
                const remCm = this.offpaModel.heightCm - (feet * 30.48);
                const inch =  Math.round(0.393701 * remCm);
                this.offpaModel.heightIn = inch ;
                this.offpaModel.heightFt = feet;
                if ( (this.offpaModel.heightCm - (feet * 30.48)) < -1 ) {
                    this.offpaModel.heightFt = feet - 1;
                    const remCm = this.offpaModel.heightCm - ((feet - 1 ) * 30.48);
                    const inch =  Math.round((0.393701 * remCm));
                    this.offpaModel.heightIn = Math.round( inch );
                }
            }
            if (this.offpaModel.heightCm < 30) {
                const remCm = this.offpaModel.heightCm;
                const inch =  Math.round(( remCm / 2.54 ));
                this.offpaModel.heightFt = 0;
                this.offpaModel.heightIn = inch;
            }
        }
        }

        }

    inches()  {
        if (this.vHeaderBlockModel.offenderBookId != null ) {
        if ( this.offpaModel.heightIn < 0) {
            this.offpaModel.heightIn = 0;
            this.type = 'warn';
            this.message = this.translateService.translate( 'oidpiden.mustbepossitiveinteger' );
            this.show();
            return;
        }
        if (( !this.offpaModel.heightIn || this.offpaModel.heightIn === 0) && this.offpaModel.heightFt === 0 ) {
            this.offpaModel.heightFt = 0;
            this.offpaModel.heightIn = 0;
        }
        if ( this.offpaModel.heightFt >= 0 && this.offpaModel.heightIn > 0  ) {
            if (this.offpaModel.heightIn >= 12) {
                const feet = Math.round((this.offpaModel.heightIn / 12));
                const inch = this.offpaModel.heightIn % 12;
                this.offpaModel.heightFt = this.offpaModel.heightFt + feet;
                this.offpaModel.heightIn = inch;
            } else if ( this.offpaModel.heightFt === 0 && this.offpaModel.heightIn < 12 ) {
                this.offpaModel.heightFt = 0;
                this.offpaModel.heightCm = Math.round(((this.offpaModel.heightIn * 2.54)));
                return;
            }
            const inchCm = this.offpaModel.heightIn * 2.54;
            const feetCm = this.offpaModel.heightFt * 30.48;
            this.offpaModel.heightCm = Math.round(inchCm + feetCm);
        }
     }

   }
   /**
    *Below event is called when click on any fields in the Physical Attributes block
    *it throws some validations when codition does not satisfy
    */
   checkValidValues() {
   }
    feets() {
        if ( this.vHeaderBlockModel.offenderBookId != null ) {
            if ( this.offpaModel.heightFt < 0 ) {
                this.offpaModel.heightFt = 0;
                this.type = 'warn';
                this.message = this.translateService.translate( 'oidpiden.mustbepossitiveinteger' );
                this.show();
                return;
            }
            if ( !this.offpaModel.heightIn || this.offpaModel.heightIn === 0 || this.offpaModel.heightFt === 0 ) {
                this.offpaModel.heightIn = 0;
                this.offpaModel.heightCm = 0;
            }
            if ( this.offpaModel.heightFt > 0 && ( !this.offpaModel.heightIn || this.offpaModel.heightIn === 0 ) ) {
                this.offpaModel.heightIn = 0;
                this.offpaModel.heightCm = this.offpaModel.heightFt * 30.48;
            }
            if ( this.offpaModel.heightFt > 0 && this.offpaModel.heightIn >= 0 ) {
                const inchCm = this.offpaModel.heightIn * 2.54;
                const feetCm = this.offpaModel.heightFt * 30.48;
                this.offpaModel.heightCm = Math.round( inchCm + feetCm );
            }
        }

        }

    convertToKg( event ) {
        if ( this.vHeaderBlockModel.offenderBookId != null ) {
            if ( this.offpaModel.weightKg <= 453 ) {
                const kg = this.offpaModel.weightKg;
                const lb = parseFloat(( kg / 0.45359237 ).toFixed( 4 ) );
                if ( lb != null && lb !== undefined && lb > 0 ) {
                    this.offpaModel.weightLbs = Math.round( lb );
                    if ( this.offpaModel.weightKg === this.offpaModel.weightKg ) {
                    } else {
                        this.offpaModel.weightLbs = Math.round( lb );
                    }
                }
            }   else {
                this.msgs = [];
                this.type = 'warn';
                this.message = this.translateService.translate( 'oidpiden.weightinkglessthan454' );
                this.show();
                this.offpaModel.weightLbs = undefined;
                this.offpaModel.weightKg = undefined;
                return;
            }
        }

    }
    convertToPounds( event ) {
        if ( this.vHeaderBlockModel.offenderBookId != null ) {
            const lb = this.offpaModel.weightLbs;
            const kg = parseFloat(( lb * 0.45359237 ).toFixed( 4 ) );
            if ( kg != null && kg !== undefined && kg > 0 ) {
                this.offpaModel.weightKg = Math.round( kg );
                if ( this.offpaModel.weightLbs === this.offpaModel.weightLbs ) {
                } else {
                    this.offpaModel.weightKg = Math.round( kg );
                }
            }
        }

      }


    oidpidenpaExecuteQuery() {
        if ( this.vHeaderBlockModel ) {
        this.offpaModel = new OffenderPhysicalAttributes();
        this.offpaModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        if ( this.vHeaderBlockModel.offenderBookId != null ) {
                 const offpaResult = this.oidpidenFactory.offPaExecuteQuery(this.offpaModel);
                     offpaResult.subscribe(offpaResultList => {
                        this.offpaModel = new OffenderPhysicalAttributes();
                        this.offpaModelData = new OffenderPhysicalAttributes();
                    if (offpaResultList.length === 0) {
                        this.offpaData = [];
                    } else {
                        this.offpaData = offpaResultList;
                        this.offpaModel = offpaResultList[0];
                        this.offpaModelData = JSON.parse(JSON.stringify(offpaResultList[0]));

                    }
                    // this.oidpidenImageExecuteQuery() ;
                });
            }
        }
    }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   oidpidenSaveoffpaForm() {
      this.offpaInsertList = [];
      this.offpaDeleteList = [];
      this.offpaModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
       this.offpaInsertList.push(this.offpaModel);
       this.offpaCommitModel.insertList = this.offpaInsertList;
       const offpaSaveData = this.oidpidenFactory.
               offPaCommit(this.offpaCommitModel);
               offpaSaveData.subscribe(res => {
                   if ( res === 1) {
                    this.isDisabled = false;
                       this.oidpidenSaveoffraceForm();
                       this.oidpidenpaExecuteQuery();
                   } else {
                        this.type = 'error';
                        this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                        this.show();
                   }
           });
           
       }

   /**
    *  This function will be deleted when commit the event is
   * fired
   */
   oidpidenDeleteoffpaRecord() {
        this.offpaDeleteList = [];
      this.offpaModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
      this.offpaDeleteList.push(this.offpaModel);
      this.offpaCommitModel.deleteList = this.offpaDeleteList;
       const offpaDeleteData = this.oidpidenFactory.
           offPaCommit(this.offpaCommitModel);
               offpaDeleteData.subscribe(res => {
                   if (res === 1) {
                      this.type = 'success';
                        this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                        this.show();
                        this.oidpidenpaExecuteQuery();
                   } else {
                        this.type = 'error';
                        this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                        this.show();
                   }
           });
       }

       oidpidenSaveoffpdForm() {
           this.offpdUpdateList = this.offpdData;
           for ( let i = 0; i < this.offpdUpdateList.length ; i++) {
               this.offpdUpdateList[i].modifyDatetime = DateFormat.getDate();
               this.offpdUpdateList[i].modifyUserId  = this.sessionManager.getId();
           }
      this.offpdCommitModel.updateList = [];
       this.offpdCommitModel.updateList = this.offpdUpdateList;
       const offpdSaveData = this.oidpidenFactory.
               offPdCommit(this.offpdCommitModel);
               offpdSaveData.subscribe(offpdSaveResult => {
                     if (offpdSaveResult === 1) {
                      this.type = 'success';
                        this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
                        this.show();
                        this.oidpidenPdExecuteQuery();
                   } else {
                        this.type = 'error';
                        this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
                        this.show();
                   }
           });
       }

   offraceExecuteQuery() {
       if ( this.vHeaderBlockModel) {
    this.offraceModel = new Offenders();
       this.offraceModel.offenderId = this.vHeaderBlockModel.offenderId;
                const offraceResult = this.oidpidenFactory.
           offRaceExecuteQuery(this.offraceModel);
                    offraceResult.subscribe(offraceResultList => {
                        this.offraceModel = new Offenders();
                        this.offraceModelTemp = new Offenders();
                   if (offraceResultList.length === 0) {
                       this.offraceData = [];
                       this.disable = true;
                   } else {
                       this.offraceData = offraceResultList;
                       this.offraceModel = offraceResultList[0];
                       this.offraceModelTemp = JSON.parse(JSON.stringify(offraceResultList[0]));
                       this.disable = false;
                   }
               });
       }
   }
   /**
    *  This function will be executed when commit event is
   * fired
   */
   oidpidenSaveoffraceForm() {
       this.offraceModel.offenderId = this.vHeaderBlockModel.offenderId;
       this.offraceModel.modifyDateTime = DateFormat.getDate();
       this.offraceModel.modifyUserId = this.sessionManager.getId();
       
       // TODO declare commit bean and add insert list to that object.
       this.offraceInsertList = [];
       this.offraceDeleteList = [];
       this.offraceUpdatetList = [];
       this.offraceCommitModel.updateList = [];
       this.offraceUpdatetList.push( this.offraceModel );
       this.offraceCommitModel.updateList = this.offraceUpdatetList;
       const offraceSaveData = this.oidpidenFactory.offRaceCommit( this.offraceCommitModel );
       offraceSaveData.subscribe( offraceSaveResult => {
           if ( offraceSaveResult === 1 ) {
               this.type = 'success';
               this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
               this.show();
               this.offraceExecuteQuery();
           } else {
               this.type = 'error';
               this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
               this.show();
           }
       } );
       }
 /**
    *  This block executes for Physical Attributes
   * fired
   */
   oidpidenPdExecuteQuery() {
       if ( this.vHeaderBlockModel ) {
       this.offpdModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
       if ( this.offpdModel.offenderBookId ) {
           const offpdResult = this.oidpidenFactory.offPdExecuteQuery( this.offpdModel );
           offpdResult.subscribe( offpdResultList => {
               if ( offpdResultList.length === 0 ) {
                   this.offpdData = [];
                   this.butPmInsert = true;
                   this.gridCamerabutton = true;
                   this.offimData = [];
                   this.offimModel = new OffenderIdentifyingMark();
                   this.disableFlag = true;
               } else {
                   this.offpdData = offpdResultList.filter(item => !( (item.profileCode === "" || item.profileCode == null) && item.activeFlag === 'N'));
                   this.offpdData.forEach(e =>{
                       e.profileCodeTemp = e.profileCode;
                   });
                   this.butPmInsert = true;
                   this.gridCamerabutton = false;
                   this.disableFlag = true;
               }
            //    this.oidpidenpaExecuteQuery();
           } );
       }
       }
       }
        /**
    *  This block executes for Images
   * fired
   */
       oidpidenImageExecuteQuery() {
           this.imgModel  = new Images();
            this.imgModel.imageObjectId = this.vHeaderBlockModel.offenderBookId;
        if ( this.imgModel.imageObjectId ) {
            this.imgData = undefined;
            const offpdResult1 = this.osiosearFactory.imageExecuteQuery( this.imgModel );
            offpdResult1.subscribe( offpdResultList1 => {
                if ( offpdResultList1.length >= 0 ) {
                    this.imgData = [];
                    this.imgData = offpdResultList1;
                    this.imgModel = offpdResultList1[0];
                    // this.oidpidenimExecuteQuery();

                }
            } );
        }

        }
   /**
    *  This block executes for Physical Marks
   * fired
   */
   oidpidenimExecuteQuery() {
       this.offimModel  = new OffenderIdentifyingMark();
       this.offimModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
       if (this.vHeaderBlockModel.offenderBookId != null) {
           this.imgModel = (this.imgModel) ? this.imgModel : new Images();
            this.imgModel.imageObjectType = 'OFF_IDM';
           const offimResult = this.oidpidenFactory.offImExecuteQuery(this.offimModel, this.imgModel.imageObjectType);
           offimResult.subscribe(offimResultList => {
               if (offimResultList.length === 0) {
                   this.offimData = [];
               } else {
                    offimResultList.forEach(element => {
                    element.imageFlag = (element.imageFlag === 'Y') ? true : false;
                    element.cameraLaunchButton = 'assets/icons/eoff_icons/add_a_photo_black_24x24.png';
                    if(element.images && element.images.length > 0){
                        element.images.forEach(obj=>{
                            if(obj.activeFlag === 'Y'){
                                element.imageUrl = 'data:image/png;base64,' +obj.imageThumbnail;
                            }
                        })

                    }
                });
                   this.offimData = offimResultList;
                    this.offimModel = offimResultList;
                   this.selected = 0;
               }
           });
       }
   }
   onGridImgDelete  = () => {
    if (this.offimModel.imageFlag) {
        this.type = 'warn';
        this.message = this.translateService.translate( 'oidpiden.cannotdeletephysicalmarksuntillimages' );
        this.show();
        return false;

    } else {
        return true;
    }
}   /**
    *  This function will be executed when commit event is
   * fired
   */
   oidpidenSaveoffimForm( event ) {
       if ( this.vHeaderBlockModel.offenderBookId === undefined || this.vHeaderBlockModel === null ) {
           this.offimData = [];
           this.message = this.translateLabel.pleaseselectthevalidoffender;
           this.show();
           return;
       }
       this.offimInsertList = event.added;
       this.offimUpdatetList = event.updated;
       this.offimDeleteList = event.removed;
       this.offimCommitModel.insertList = [];
       this.offimCommitModel.updateList = [];
       this.offimCommitModel.deleteList = [];
       if ( this.offimInsertList.length > 0 || this.offimUpdatetList.length > 0 ) {
           for ( let i = 0; i < this.offimInsertList.length; i++ ) {
               this.offimInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
               if ( this.offimInsertList[i].markType === undefined ||
                 this.offimInsertList[i].markType === null || this.offimInsertList[i].markType === '' ) {
                   this.type = 'warn';
                    this.message = this.translateService.translate( 'oidpiden.marktypemust' );
                    this.show();
                   return;
               }
               if ( this.offimInsertList[i].bodyPartCode === undefined ||
                 this.offimInsertList[i].bodyPartCode === null || this.offimInsertList[i].bodyPartCode === '' ) {
                   this.type = 'warn';
                   this.message = this.translateService.translate( 'oidpiden.bodypartrequired' );
                   this.show();
                   return;
               }
           }
           for ( let i = 0; i < this.offimUpdatetList.length; i++ ) {
               this.offimUpdatetList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
               if ( this.offimUpdatetList[i].markType === undefined ||
                this.offimUpdatetList[i].markType === null || this.offimUpdatetList[i].markType === '' ) {
                  this.type = 'warn';
                   this.message = this.translateService.translate( 'oidpiden.marktypemust' );
                   this.show();
                  return;
              }
              if ( this.offimUpdatetList[i].bodyPartCode === undefined ||
                this.offimUpdatetList[i].bodyPartCode === null || this.offimUpdatetList[i].bodyPartCode === '' ) {
                  this.type = 'warn';
                  this.message = this.translateService.translate( 'oidpiden.bodypartrequired' );
                  this.show();
                  return;
              }
           }
       }
       if ( this.offimDeleteList.length > 0 ) {
           for ( let i = 0; i < this.offimDeleteList.length; i++ ) {
               if (this.vHeaderBlockModel.statusDisplay === 'Inactive') {
                   this.type = 'warn';
                   this.message = this.translateService.translate( 'oidpiden.cantdeletephysicalmarks' );
                   this.show();
                   return;
               }
               this.offimDeleteList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
           }
       }
       this.offimCommitModel.insertList = this.offimInsertList;
       this.offimCommitModel.updateList = this.offimUpdatetList;
       this.offimCommitModel.deleteList = this.offimDeleteList;
       const offimSaveData = this.oidpidenFactory.offImCommit( this.offimCommitModel );
       offimSaveData.subscribe( offimSaveResult => {
           if ( offimSaveResult === 1 ) {
               this.type = 'success';
               this.message = this.translateService.translate( 'common.addupdateremoverecordsuccess' );
               this.offimData = offimSaveResult;
               this.show();
               this.oidpidenimExecuteQuery();
           } else {
               this.type = 'error';
               this.message = this.translateService.translate( 'common.addupdateremoverecordfailed' );
               this.offimData = offimSaveResult;
               this.show();
               this.oidpidenimExecuteQuery();
           }
       } );

       }

   onPmInsert = () =>  {
       if ( !this.vHeaderBlockModel ) {
           this.offimData = [];
           this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
           this.show();
           return;
       }
       for ( let i = 0; i < this.offimData.length; i++ ) {
           if ( this.offimData[i].markType === undefined ||
               this.offimData[i].markType === null || this.offimData[i].markType === '' ) {
               this.type = 'warn';
               this.message = this.translateService.translate( 'oidpiden.marktypemust' );
               this.show();
               return null;
           }
           if ( this.offimData[i].bodyPartCode === undefined ||
               this.offimData[i].bodyPartCode === null || this.offimData[i].bodyPartCode === '' ) {
               this.type = 'warn';
               this.message = this.translateService.translate( 'oidpiden.bodypartrequired' );
               this.show();
               return null;
           }
       }
       return {};
   }
   onRowSelect( event ) {
       for ( let i = 0; i < this.offpdData.length; i++ ) {
           if ( this.offpdData[i].profileCode === event.innerValue ) {
               this.index = i;
               return;
           }
       }
   }
   oidpidenClearoffpd() {
       this.offpdData[this.index].profileCode = '';
       this.disableFlag = true;
       this.oidpidenPdExecuteQuery();
   }
       show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];
    }
    CallFormImage() {
        if(this.faceCameraButon == true){
           return false;
        }
        this.faceCameraButon = true;
        if (this.vHeaderBlockModel.offenderBookId) {
            const captureImageData = this.osiosearFactory.captureImageProcedure();
            captureImageData.subscribe(captureImage => {
            if (captureImage === 'OIUIMAGE') {
                if(this.vHeaderBlockModel.offenderBookId && this.osiosearFactory.imagesDataTemp){
                    this.osiosearFactory.imagesDataTemp.imageObjectId = this.vHeaderBlockModel.offenderBookId;
                    this.osiosearFactory.imagesDataTemp.imageObjectType = 'OFF_BKG';
                    this.osiosearFactory.imagesDataTemp.imageViewType = 'FACE';
                    this.osiosearFactory.imagesDataTemp.imageObjectSeq = null;
                    this.osiosearFactory.imagesDataTemp.orientationType = null;
                }
               
                this.dialogService.openLinkDialog('/oiuimagedialog', this.osiosearFactory.imagesDataTemp, 80).subscribe(result => {
                    this.faceCameraButon = false;
                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                });
            } else {
            }
        });

        }
    }
    onGridImageClick = () => {
        this.gridCamerabutton = true;
        if (this.offimData.length === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpiden.pleasecreate');
            this.show();
            this.gridCamerabutton = false;
            return;
        }
            if (this.physicalMarksGrid.addedMap.size !== 0 || this.physicalMarksGrid.updatedMap.size !== 0 ||
              this.physicalMarksGrid.removedMap.size !== 0) {
              this.type = 'warn';
              this.message = this.translateService.translate('oidpiden.pleasesave');
              this.show();
              this.gridCamerabutton = false;
              return false;
            }
        this.offimModel.imageObjectType = 'OFF_IDM';
        if (this.offimModel.markType) {
            const captureImageData = this.oidpidenFactory.checkImage(this.offimModel.imageObjectType, this.offimModel.offenderBookId,
            this.offimModel.markType, this.offimModel.bodyPartCode, this.offimModel.idMarkSeq);
            captureImageData.subscribe(imageFlag => {
                if(!this.osiosearFactory.imagesDataTemp){
                    this.osiosearFactory.imagesDataTemp = new Images();
                }
            if (imageFlag === 'Y') {
                this.osiosearFactory.imagesDataTemp.imageObjectType = 'OFF_IDM';
                this.osiosearFactory.imagesDataTemp.imageViewType = this.offimModel.markType;
                this.osiosearFactory.imagesDataTemp.imageObjectId = this.offimModel.offenderBookId;
                this.osiosearFactory.imagesDataTemp.markType = this.offimModel.nbtMarkTypeDesc;
                this.osiosearFactory.imagesDataTemp.bodyPartCode = this.offimModel.nbtBodyPartDesc;
                this.osiosearFactory.imagesDataTemp.imageObjectSeq = this.offimModel.idMarkSeq;
                this.osiosearFactory.imagesDataTemp.orientationType = this.offimModel.bodyPartCode;
            } else {
                
                this.osiosearFactory.imagesDataTemp.imageObjectType = 'OFF_IDM';
                this.osiosearFactory.imagesDataTemp.imageViewType = this.offimModel.markType;
                this.osiosearFactory.imagesDataTemp.imageObjectId = this.offimModel.offenderBookId;
                this.osiosearFactory.imagesDataTemp.markType = this.offimModel.nbtMarkTypeDesc;
                this.osiosearFactory.imagesDataTemp.bodyPartCode = this.offimModel.nbtBodyPartDesc;
                this.osiosearFactory.imagesDataTemp.imageObjectSeq = this.offimModel.idMarkSeq;
                this.osiosearFactory.imagesDataTemp.orientationType = this.offimModel.bodyPartCode;
            }
            this.dialogService.openLinkDialog('/oiuimagedialog', this.osiosearFactory.imagesDataTemp, 80).subscribe(result => {
                this.oidpidenimExecuteQuery();
                this.gridCamerabutton = false;
                                });
        });

        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('oidpiden.pleasecreate');
            this.show();
            this.gridCamerabutton = false;
            return;

        }

        }
        onbackBtnClick = () => {
            if (this.oidmbrdtFactory.viewBtnFlag) {
              this.oidmbrdtFactory.viewBtnFlag = false;
              this.backBtn = false;
              this.router.navigate(['/OIDMBRDT']);
            }
          }
          ngOnDestroy() {
            this.oidmbrdtFactory.viewBtnFlag = false;
          }
     raceCodeBlur() {
        if (!this.offraceModel.raceCode) {
            this.offraceModel.raceCode = this.offraceModel.raceCode === '' ? undefined : '';
        }
    }
    allLovBlur() {
        this.offpdData.forEach(data => {
            if (!data.profileCode) {
                data.profileCode = data.profileCode === '' ? undefined : '';
            }
        });
    }

    onAllLovChange(event,index) {
        if (event) {
            if(this.offpdData[index].profileCodeTemp !== event.code){
                this.disableFlag = false;
            }
        }
    }

    get isDisable() { 
        if ((JSON.stringify(this.offpaModel) != JSON.stringify(this.offpaModelData)) || 
        this.offraceModel.raceCode != this.offraceModelTemp.raceCode) {
            return false;
        } 
        return true;
    }

}

