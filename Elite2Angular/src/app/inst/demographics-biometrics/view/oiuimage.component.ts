import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiuimageService } from '@common/offender-records/service/oiuimage.service';
import { ImageOriginals } from '@commonbeans/ImageOriginals';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Router } from '@angular/router';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from '@commonbeans/Images';
import { ImagesCommitBean } from '@common/beans/ImagesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OidrpitmService } from '@inst/property/service/oidrpitm.service';
import { OiiptranService } from '@inst/property/service/oiiptran.service';
import { OcuoicinService } from '@inst/incidents-oic/service/ocuoicin.service';
import { OumpersoService } from '@sa/usersystemsecurity/service/oumperso.service';
import { OsipsearService } from '@inst/visits-management/service/osipsear.service';
import { OidviresService } from '@inst/visits-management/service/oidvires.service';
import { OidreleaService } from '@inst/movement-external/service/oidrelea.service';
import { OidvisitService } from '@inst/visits-management/service/oidvisit.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ImageOriginalsCommitBean } from '@common/beans/ImageOriginalsCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OidpidenService } from '@inst/demographics-biometrics/service/oidpiden.service';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-oiuimage',
    templateUrl: './oiuimage.component.html'
})

export class OiuimageComponent implements OnInit {
    
    imagesModel: Images = new Images();
    imageoriginalsModel : ImageOriginals = new ImageOriginals();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    @ViewChild("camera") camera: any;
    @ViewChild('imgGrid') imgGrid: any;
    imagesColumnDef: any[];
    link: string;
    imagesData: Images[] = [];
    imageoriginalsData: ImageOriginals[] = [];
    selectedImageIndex: number;
    image: string;
    selected = -1;
    target: any;
    imagesInsertList: Images[] = [];
    imagesUpdateList: Images[] = [];
    imagesDeleteList: Images[] = [];
    imagesCommitModel: ImagesCommitBean = new ImagesCommitBean();
    imageOriginalCommitbean: ImageOriginalsCommitBean = new ImageOriginalsCommitBean() ;
    msgs: any[] = [];
    exportButtonDisabled:boolean = false;
    importButtonDisabled:boolean = false;
    enableInsert:boolean = false;
    
    constructor(private oiuimageFactory: OiuimageService,
            public sessionManager: UserSessionManager,
            private offenderSearchService: OffenderSearchService,
            private router: Router, private osiosearFactory: OsiosearService, public translateService: TranslateService,
            private oidrpitmFactory: OidrpitmService, private oiiptranFactory: OiiptranService,
            private ocuoicinFactory: OcuoicinService, private oumpersoFactory: OumpersoService, private osipsearFactory: OsipsearService,
            private oidviresFactory: OidviresService, private oidreleaFactory: OidreleaService, private oidvisitFactory: OidvisitService,
            private dialogService: DialogService, private oidpidenFactory: OidpidenService, private activatedRoute: ActivatedRoute, 
            private injectOffenderService: InjectOffenderService) {
            this.imagesColumnDef = [];
            //this.imagesPropertyColumnDef = [];

        }
        ngOnInit() {
            
            this.injectOffenderService.injectOffenderInService(this.activatedRoute);
            this.imagesData = [];
            this.image = null;
            this.importButtonDisabled = true;
            this.exportButtonDisabled = true;
            
            this.imagesColumnDef = [
                                        {
                                            fieldName: this.translateService.translate('oiuimage.imagetype'),
                                            field: 'orientationType', datatype: 'lov', required:true,
                                            editable: true, width: 150,
                                            domain: 'IMAGE_VIEW', optionWidth: 200
                                        },
                                        {
                                            fieldName: this.translateService.translate('oiuimage.imageid'), field: 'imageId', datatype: 'number',
                                            editable: false, width: 150
                                        },
                                        {
                                            fieldName: this.translateService.translate('oiuimage.capturedate'), field: 'captureDate',
                                            editable: false, width: 150
                                        },
                                        {
                                            fieldName: this.translateService.translate('oiuimage.default'), field: 'activeFlag', datatype: 'checkbox',
                                            editable: true, width: 150
                                            
                                        },
                                        {
                                            fieldName: this.translateService.translate('oiuimage.imagefile'), field: 'imageFile', datatype: 'text',
                                            editable: false, width: 150, hide: true
                                        }
                                        
                                
                                    ];
            
            if(this.offenderSearchService.selectedOffender) {
                this.enableInsert = true;
                this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
                this.imagesModel = new Images();
                this.imagesModel.imageObjectId = this.vHeaderBlockModel.offenderBookId;
                this.imagesModel.imageObjectType = 'OFF_BKG';
                this.imagesModel.imageViewType = 'FACE';
                this.imagesModel.imageObjectSeq = null;
                this.imagesModel.orientationType = null;
                this.oiuimageexecuteQuery();
            } else {
                this.enableInsert = false;
            }
            
        }
        
        onOffenderChange(offender) {
            if(offender) {
                this.image = null;
                this.enableInsert = true;
                this.imagesModel = new Images();
                this.vHeaderBlockModel = offender;
                this.imagesModel.imageObjectId = this.vHeaderBlockModel.offenderBookId;
                this.imagesModel.imageObjectType = 'OFF_BKG';
                this.imagesModel.imageViewType = 'FACE';
                this.imagesModel.imageObjectSeq = null;
                this.imagesModel.orientationType = null;
                this.oiuimageexecuteQuery();
            } else {
                this.image = null;
                this.enableInsert = false;
                this.imagesModel = new Images();
                this.vHeaderBlockModel = null;
            }
            
        }
        
        
        onGridValidate = (event) => {
            
            const rowdata = new ValidateRowReturn();
            const index = event.rowIndex;
            if (event.field === 'activeFlag' && !(event.newValue) !== !(event.oldValue)) {
                if (event.newValue) {
                    const indexRowData = {index : -1};
                    this.imagesData.forEach(ele => {
                        indexRowData.index++;
                        if (indexRowData.index !== index && ele.activeFlag) {
                            this.imgGrid.setColumnData('activeFlag', indexRowData.index, false);
                        }
                    });
                }
            }
            rowdata.validated = true;
            return rowdata;
        }
        
        onCaptureImageclick(camera) {

            let selectedRow = this.imgGrid.gridOptions.api.getSelectedNodes();
            this.selectedImageIndex = selectedRow[0].rowIndex;

           /* if (this.router.url === '/OIDPIDEN' && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG'
            || this.router.url === '/OIDOICUS' || this.router.url === '/OUMPERSO' || this.router.url === '/OSIPSEAR'
             || this.router.url === '/OIDVIRES' || this.router.url === '/OIDVISIT') {
                if (!this.imagesData[this.selectedImageIndex].orientationType) {
                    this.show('oiuimage.imagetypemust');
                    return;
                }

             }*/
            // imagesModel
            try {
            
                    const dialogData = {onCloseClick: this.onCloseClick};
                    console.log(dialogData);
                    this.dialogService.openLinkDialog('/imagecapturedialog', dialogData, 80).subscribe(result => {
                        if (result) {
                        this.onImageCapture(result);
                        }
                    });
               
            } catch (e) {
                
            }

        }
        onCloseClick = () => {
            if (this.oiuimageFactory.cameraCompoent) {
            try {
                this.oiuimageFactory.cameraCompoent.stop();
              } catch (e) {
                console.error('Error Occured while stoping S4-Camera : \n' + e.message );
                console.error(e.stack);
              }
            }
            const image = this.oiuimageFactory.image;
            this.oiuimageFactory.image = null;
            if (image) {
                return image;
            } else {
                return {isCloseable: true};
            }

        }

        
        onImageCapture(obj) {
            let image = obj.base64Image;
            this.imagesData[this.selectedImageIndex]['imageFile'] = obj.imageFile;
            if (image) {
              this.image =  image;
              this.imagesData[this.selectedImageIndex]['imageFull'] = this.image;
              if (!this.imagesData[this.selectedImageIndex].imageId) {
                  this.getNextImageId();
              } else {
                  if (!this.imgGrid.updatedMap.has(this.selectedImageIndex)) {
                      this.imgGrid.updatedMap.set(this.selectedImageIndex, this.imagesData[this.selectedImageIndex]);
                  } 
              }
              this.imgGrid.setColumnData('activeFlag', this.selectedImageIndex, true);
              this.imgGrid.btnSavebtnDisable = this.imgGrid.isSaveDisabled();
            }
        }
        
        getNextImageId() {
            const imageIdService = this.oiuimageFactory.getNextImageId();
            imageIdService.subscribe(imageId => {
                if (imageId && typeof imageId !== 'object') {
                    this.imgGrid.setColumnData('imageId', this.selectedImageIndex, imageId);
                }
            });
        }
        
        onImageGridInsert = () => {
            this.image = null;
            this.imagesModel = new Images();
            this.importButtonDisabled = false;
            this.exportButtonDisabled = false;
            return {};
        }
        
        onImport(event) {
            if (event && event.target && event.target.files && event.target.files[0]) {
                const fileLength = event.target.files[0].size;
                console.log(fileLength)
                this.imagesData[this.selectedImageIndex]['imageFile'] = event.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]); // read file as data url
                reader.onload = (events) => { // called once readAsDataURL is completed
                    this.target = events.currentTarget;
                    this.image = this.target.result;  // events.currentTarget.result;
                    this.imagesData[this.selectedImageIndex]['imageFull'] = this.image;
                    this.imgGrid.btnSavebtnDisable = false;
                    
                };
            }
        }

        
        OnImageImport(fileImport) {

            let selectedRow = this.imgGrid.gridOptions.api.getSelectedNodes();
            this.selectedImageIndex = selectedRow[0].rowIndex;

            /*if (this.router.url === '/OIDPIDEN' && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG'
            || this.router.url === '/OIDOICUS' || this.router.url === '/OUMPERSO' || this.router.url === '/OSIPSEAR'
             || this.router.url === '/OIDVIRES' || this.router.url === '/OIDVISIT') {
                if (!this.imagesData[this.selectedImageIndex].orientationType) {
                    this.show('oiuimage.imagetypemust');
                    return;
                }
            }*/

            //this.cancelbutton = false;
            if (this.selectedImageIndex !== -1 && this.imagesData[this.selectedImageIndex]===undefined ||(this.imagesData && this.imagesData[this.selectedImageIndex] && !this.imagesData[this.selectedImageIndex].orientationType)) {
                this.show('oiuimage.imagetypemust');
                return;
            }
            fileImport.value = '';
            fileImport.click();
            if (!this.imagesData[this.selectedImageIndex].imageId) {
                this.getNextImageId();
               
            } else {
                if (!this.imgGrid.updatedMap.has(this.selectedImageIndex)) {
                    this.imgGrid.updatedMap.set(this.selectedImageIndex, this.imagesData[this.selectedImageIndex]);
                }
            }
            this.imgGrid.setColumnData('activeFlag', this.selectedImageIndex, true);
        }

        
        oiuimageexecuteQuery() {
            //this.image = null;
            this.imagesModel.captureDate = null;
            this.imagesModel.imageObjectId = this.vHeaderBlockModel.offenderBookId;
            this.imagesModel.imageObjectType = 'OFF_BKG';
            this.imagesModel.imageViewType = 'FACE';
            const serviceObj = this.oiuimageFactory.imagesExecuteQuery(this.imagesModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.imagesData = [];
                }
                if (data.length > 0) {
                    data.forEach(element => {
                        if (this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_IDM') {
                            element['bodyPartCode'] = this.osiosearFactory.imagesDataTemp.bodyPartCode;
                            element['markType'] = this.osiosearFactory.imagesDataTemp.markType;
                        }
                        if (this.oidrpitmFactory.imagesDataTemp.imageObjectType === 'PPTY') {
                            element['pptyDescription'] = this.oidrpitmFactory.imagesDataTemp.pptyDescription;
                        }
                        if (this.oiiptranFactory.imagesDataTemp.imageObjectType === 'PPTY') {
                            element['pptyDescription'] = this.oiiptranFactory.imagesDataTemp.imageViewType;
                        }
                        
                        if (element.captureDate) {
                            const dateTime = DateFormat.format(DateFormat.getDate(element.captureDate)) + ' ' +
                             (element.captureDate + '').split('T')[1];
                            element.captureDate = dateTime;
                        }
                        if(element.imageFull){
                            //element['imageFile'] = this.oiuimageFactory.dataURLtoFile(element.imageFull, element.orientationType);
                        }
                        element['activeFlag'] = (element['activeFlag'] === 'N') ? false : true;
                        /*if (this.dialog.data.modelName === 'OIDSTGID' ) {
                            element['markType'] = element.imageViewType;
                        }*/
                    });
                    this.imagesData = data;
                    this.selected = 0;
                    //this.cancelbutton = true;
                    //this.screenModuleName = 'OIUIMAGE';
                    /*const exportcheckUserRole = this.oiuimageFactory.checkUserRole(this.screenModuleName);
                    exportcheckUserRole.subscribe(exbuttonEnabled => {
                        if (exbuttonEnabled === 1) {
                           this.exportButton = false;
                        } else {
                            this.exportButton = true;
                        }

                    });*/
                    // this.exportButton = false;
                    this.importButtonDisabled = true;
                    this.exportButtonDisabled = true;
                    this.imagesModel = this.imagesData[0];
                    this.oiuimagimageoriginalsExecuteQuery();
                }
            });
        }
        
        get BASE64IMAGE(): string {
            return 'data:image/JPEG;base64,';
        }

        get BASE64PNG(): string {
            return 'data:image/PNG;base64,';
        }
        
        oiuimagimageoriginalsExecuteQuery() {
            this.imageoriginalsModel = new ImageOriginals();
            this.image = null;
            this.imageoriginalsModel.imageId = this.imagesModel.imageId;
            const imageoriginalsResult = this.oiuimageFactory.imageOriginalsExecuteQuery(this.imageoriginalsModel);
            imageoriginalsResult.subscribe(data => {
                if (data.length === 0) {
                    this.imageoriginalsData = [];
                } else {
                    this.imageoriginalsData = data;
                    //this.cancelbutton = true;
                    if (this.imageoriginalsData[0].imageFull) {
                        this.image = this.BASE64IMAGE + this.imageoriginalsData[0].imageFull;
                        this.imagesData[this.selectedImageIndex]['imageFull'] = this.image;
                    }
                }
            });
        }
        
        
        onRowClickimages(event) {
            if (event) {
                this.image = null;
                this.imagesModel = new Images();
                this.imagesModel = event;
                this.selectedImageIndex = this.imagesData.indexOf(this.imagesModel);
            }
            /*if (this.dialog.data.modelName === 'OIDSTGID') {
                if (event.imageFull) {
                    this.image = event.imageFull;
                } else {
                    this.oiuimagimageoriginalsExecuteQuery();
                }
                return;
            }*/
            //event.imageFull = null;
            if (event  && event.captureDate) {
                if(!event.imageFull) {
                    this.oiuimagimageoriginalsExecuteQuery();
                } else {
                    this.image = event.imageFull;
                }
                
                if (this.imagesModel.imageId) {
                    this.exportButtonDisabled = true;
                    this.importButtonDisabled = true;
                }
            } else if(event && !event.captureDate) {
                this.image = event.imageFull;
                this.exportButtonDisabled = false;
                this.importButtonDisabled = false;
            }
        }
        
        
        oiuimageSaveimagesForm(event) {
            
            const validMark = {valid: false};
            this.imagesData.forEach(ele => {
                if (ele.activeFlag) {
                    validMark.valid = true;
                }
            });
            this.imagesInsertList = event.added;
            this.imagesUpdateList = event.updated;
            this.imagesDeleteList = event.removed;
            this.imagesCommitModel.insertList = [];
            this.imagesCommitModel.updateList = [];
            this.imagesCommitModel.deleteList = [];

            let formData: FormData = new FormData();
            let insertFiles = [];
            let updateFiles = [];

            if (this.imagesInsertList.length > 0) {
                for (let i = 0; i < this.imagesInsertList.length; i++) {
                    
                    /*if (this.router.url === '/OIDPIDEN' && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG'
                        || this.router.url === '/OIDOICUS' || this.router.url === '/OUMPERSO' || this.router.url === '/OSIPSEAR'
                            || this.router.url === '/OIDVIRES' || this.router.url === '/OIDVISIT') {
                        if (!this.imagesInsertList[i].orientationType) {
                            this.show(this.translateService.translate('oiuimage.imagetypemust'), 'warn');
                            return;
                        }
                    }*/
                    let imgString = this.imagesInsertList[i]['imageFull'];
                    let size = new Blob([imgString]).size;
                    // if(size > 1900000){
                    //     this.show(this.translateService.translate('oiuimage.largeimage'), 'warn');
                    //     return;
                    // }

                    if (!this.imagesInsertList[i]['imageFull']) {
                        this.show(this.translateService.translate('oiuimage.importanimage'), 'warn');
                        return;
                    }
                    if (!this.imagesInsertList[i].orientationType) {
                        this.show(this.translateService.translate('oiuimage.imagetypemust'), 'warn');
                        return;
                    }
                    /*if (this.router.url === '/OIDRPITM') {
                        this.imagesInsertList[i].imageObjectType = this.oidrpitmFactory.imagesDataTemp.imageObjectType;
                        this.imagesInsertList[i].imageObjectId = this.oidrpitmFactory.imagesDataTemp.imageObjectId;
                        this.imagesInsertList[i].imageObjectSeq = this.oidrpitmFactory.imagesDataTemp.imageObjectSeq;
                        if (this.oidrpitmFactory.imagesDataTemp.orientationType) {
                            this.imagesInsertList[i].orientationType = this.oidrpitmFactory.imagesDataTemp.orientationType;
                        }
                        this.imagesInsertList[i].imageViewType = this.oidrpitmFactory.imagesDataTemp.imageViewType;

                    }*/

                    /*if (this.router.url === '/OIIPTRAN') {
                        this.imagesInsertList[i].imageObjectType = this.oiiptranFactory.imagesDataTemp.imageObjectType;
                        this.imagesInsertList[i].imageObjectId = this.oiiptranFactory.imagesDataTemp.imageObjectId;
                        this.imagesInsertList[i].imageObjectSeq = this.oiiptranFactory.imagesDataTemp.imageObjectSeq;
                        if (this.orientationType) {
                            this.imagesInsertList[i].orientationType = this.orientationType;
                        }
                        this.imagesInsertList[i].imageViewType = this.imageViewType;
                    }*/
                    /*
                    if (this.router.url === '/OIDOICUS') {
                        this.imagesInsertList[i].imageObjectType = this.ocuoicinFactory.imagesDataTemp.imageObjectType;
                        this.imagesInsertList[i].imageObjectId = this.ocuoicinFactory.imagesDataTemp.imageObjectId;
                        this.imagesInsertList[i].imageObjectSeq = this.ocuoicinFactory.imagesDataTemp.imageObjectSeq;
                        if (this.ocuoicinFactory.imagesDataTemp.orientationType) {
                            this.imagesInsertList[i].orientationType = this.ocuoicinFactory.imagesDataTemp.orientationType;
                        }
                        this.imagesInsertList[i].imageViewType = this.ocuoicinFactory.imagesDataTemp.imageViewType;
                    }*/
                    /*
                    if (this.router.url === '/OUMPERSO') {
                        this.imagesInsertList[i].imageObjectType = this.oumpersoFactory.imagesDataTemp.imageObjectType;
                        this.imagesInsertList[i].imageObjectId = this.oumpersoFactory.imagesDataTemp.imageObjectId;
                        this.imagesInsertList[i].imageObjectSeq = this.oumpersoFactory.imagesDataTemp.imageObjectSeq;
                        if (this.oumpersoFactory.imagesDataTemp.orientationType) {
                            this.imagesInsertList[i].orientationType = this.oumpersoFactory.imagesDataTemp.orientationType;
                        }
                        this.imagesInsertList[i].imageViewType = this.oumpersoFactory.imagesDataTemp.imageViewType;
                    }*/
                    /*
                    if (this.router.url === '/OSIPSEAR') {
                        this.imagesInsertList[i].imageObjectType = this.osipsearFactory.imagesDataTemp.imageObjectType;
                        this.imagesInsertList[i].imageObjectId = this.osipsearFactory.imagesDataTemp.imageObjectId;
                        this.imagesInsertList[i].imageObjectSeq = this.osipsearFactory.imagesDataTemp.imageObjectSeq;
                        if (this.osipsearFactory.imagesDataTemp.orientationType) {
                            this.imagesInsertList[i].orientationType = this.osipsearFactory.imagesDataTemp.orientationType;
                        }
                        this.imagesInsertList[i].imageViewType = this.osipsearFactory.imagesDataTemp.imageViewType;

                    }
                    if (this.router.url === '/OIDVIRES') {
                        this.imagesInsertList[i].imageObjectType = this.oidviresFactory.imagesDataTemp.imageObjectType;
                        this.imagesInsertList[i].imageObjectId = this.oidviresFactory.imagesDataTemp.imageObjectId;
                        this.imagesInsertList[i].imageObjectSeq = this.oidviresFactory.imagesDataTemp.imageObjectSeq;
                        if (this.oidviresFactory.imagesDataTemp.orientationType) {
                            this.imagesInsertList[i].orientationType = this.oidviresFactory.imagesDataTemp.orientationType;
                        }
                        this.imagesInsertList[i].imageViewType = this.oidviresFactory.imagesDataTemp.imageViewType;

                    }*/
                    /*
                    if (this.router.url === '/OIDVISIT') {
                        this.imagesInsertList[i].imageObjectType = this.oidvisitFactory.imagesDataTemp.imageObjectType;
                        this.imagesInsertList[i].imageObjectId = this.oidvisitFactory.imagesDataTemp.imageObjectId;
                        this.imagesInsertList[i].imageObjectSeq = this.oidvisitFactory.imagesDataTemp.imageObjectSeq;
                        if (this.oidvisitFactory.imagesDataTemp.orientationType) {
                            this.imagesInsertList[i].orientationType = this.oidvisitFactory.imagesDataTemp.orientationType;
                        }
                        this.imagesInsertList[i].imageViewType = this.oidvisitFactory.imagesDataTemp.imageViewType;

                    }
                    if (this.router.url === '/OIDPIDEN') {
                    this.imagesInsertList[i].imageObjectType = this.osiosearFactory.imagesDataTemp.imageObjectType;
                    this.imagesInsertList[i].imageObjectId = this.osiosearFactory.imagesDataTemp.imageObjectId;
                    this.imagesInsertList[i].imageObjectSeq = this.osiosearFactory.imagesDataTemp.imageObjectSeq;
                    if (this.imagesInsertList[i].orientationType) {
                        this.imagesInsertList[i].orientationType = this.imagesInsertList[i].orientationType;
                    } else {
                        this.imagesInsertList[i].orientationType = this.imagesInsertList[i].orientationType;
                    }
                    this.imagesInsertList[i].imageViewType = this.osiosearFactory.imagesDataTemp.imageViewType;
                }*/
                /*if (this.dialog.data.modelName === 'OIDSTGID') {
                    this.imagesInsertList[i].imageObjectType = this.dialog.data.objType;
                    this.imagesInsertList[i].imageObjectId = this.dialog.data.stgId;
                    this.imagesInsertList[i].imageObjectSeq = this.dialog.data.identifierSeq;
                    if (this.imagesModel.orientationType) {
                        this.imagesInsertList[i].orientationType = this.dialog.data.orientationType;
                    }
                    this.imagesInsertList[i].imageViewType = this.dialog.data.imageType;

                }*/
                   // this.imagesInsertList[i].activeFlag = 'Y';
                    this.imagesInsertList[i].imageObjectId  = this.vHeaderBlockModel.offenderBookId;
                    this.imagesInsertList[i].imageObjectType = 'OFF_BKG';
                    this.imagesInsertList[i].imageViewType = 'FACE';
                    this.imagesInsertList[i].captureDate = DateFormat.getDate();
                    if ( this.imagesInsertList[i]['imageFull']) {
                        if (String(this.imagesInsertList[i]['imageFull']).toLowerCase().startsWith(this.BASE64IMAGE.toLowerCase())) {
                            this.imagesInsertList[i].imageThumbnail = this.imagesInsertList[i]['imageFull']
                            .slice(this.BASE64IMAGE.length, this.imagesInsertList[i]['imageFull'].length);
                        } else {
                            this.imagesInsertList[i].imageThumbnail = this.imagesInsertList[i]['imageFull']
                            .slice(this.BASE64PNG.length, this.imagesInsertList[i]['imageFull'].length);
                        }
                        delete this.imagesInsertList[i]['imageFull'];
                        delete this.imagesInsertList[i]['imageThumbnail'];
                    }
                    if (this.imagesInsertList[i].activeFlag) {
                        this.imagesInsertList[i].activeFlag = 'Y';
                    } else {
                        this.imagesInsertList[i].activeFlag = 'N';
                    }

                    // let imgID = this.imagesInsertList[i]['imageId'];
                    let imgIDval = this.imagesInsertList[i]['imageFile'];
                    // imgIDval['uniqueID'] = imgID;
                    insertFiles.push(imgIDval)
                    //formData.append(this.imagesInsertList[i]['imageId'].toString(), this.imagesInsertList[i]['imageFile']);
                    delete this.imagesInsertList[i]['imageFile'];
                    
                }

                this.imagesCommitModel.insertList = this.imagesInsertList;
            }
            /*if (this.router.url === '/OIDPIDEN' && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG' ||
                this.router.url === '/OIDPIDEN' && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_IDM'
                || this.router.url === '/OIDOICUS' || this.router.url === '/OUMPERSO' || this.router.url === '/OSIPSEAR'
                || this.router.url === '/OIDVIRES' || this.router.url === '/OIDVISIT') {
                if (!validMark.valid && this.imagesData.length > 0) {
                    this.show('oiuimage.pleasemark');
                    return;
                }
            }*/
            if (this.imagesUpdateList.length > 0) {
                for (let i = 0; i < this.imagesUpdateList.length; i++) {
                    let element = this.imagesUpdateList[i];
                    let imgString = element['imageFull'];
                    let size = new Blob([imgString]).size;
                    // if(size > 1900000){
                    //     this.show(this.translateService.translate('oiuimage.largeimage'), 'warn');
                    //     return;
                    // }

                    if (!element.orientationType) {
                        this.show(this.translateService.translate('oiuimage.imagetypemust'), 'warn');
                        return;
                    }
                    element.activeFlag = element.activeFlag ? 'Y' : 'N';
                    element.captureDate = DateFormat.parse(element.captureDate + ''.split(' ')[0]);
                    delete element['imageFull'];

                    // let imgID = this.imagesUpdateList[i]['imageId'];
                    // let imgIDval = this.imagesUpdateList[i]['imageFile'];
                    // imgIDval['uniqueID'] = imgID;
                    // updateFiles.push(imgIDval);
                    //formData.append(this.imagesUpdateList[i]['imageId'].toString(), this.imagesUpdateList[i]['imageFile']);
                    delete this.imagesUpdateList[i]['imageFile'];
                    delete this.imagesUpdateList[i]['imageThumbnail'];

                }
                this.imagesCommitModel.updateList = this.imagesUpdateList;
            }

            if (this.imagesDeleteList.length > 0) {
                this.imagesDeleteList.forEach(element => {
                    element.captureDate = DateFormat.parse(element.captureDate + ''.split(' ')[0]);
                    delete element['imageFull'];
                    delete element['imageThumbnail'];
                });
                this.imagesCommitModel.deleteList = this.imagesDeleteList;
            }
            
            
            formData.append('jsonData', JSON.stringify(this.imagesCommitModel));
            
            insertFiles.forEach((file) => { formData.append('insertImages', file); });
            //updateFiles.forEach((file) => { formData.append('updateImages', file); });
            const imagesSaveData = this.oiuimageFactory.upload(formData);

            imagesSaveData.subscribe(data => {
                if (data === 1) {
                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                    /* if (this.imagesCommitModel.insertList.length > 0 || this.imagesCommitModel.deleteList.length > 0)  {
                     this.imageOriginalCommitbean.insertList = [];
                     this.imageOriginalCommitbean.updateList = [];
                     this.imageOriginalCommitbean.deleteList = [];
                     this.imagesCommitModel.insertList.forEach((ele,index) => {
                        const imageOriginal =  new ImageOriginals();
                        imageOriginal.imageId = ele.imageId;
                        // imageOriginal.imageOriginals = insertFiles[index]//ele.imageThumbnail,
                        imageOriginal.imageFull = '';
                        this.imageOriginalCommitbean.updateList.push(imageOriginal);
                    });
                    this.imagesCommitModel.deleteList.forEach(ele => {
                        const imageOriginal =  new ImageOriginals();
                        imageOriginal.imageId = ele.imageId;
                        imageOriginal.imageFull = '';
                        this.imageOriginalCommitbean.deleteList.push(imageOriginal);
                    });
                    this.oiuimageFactory.imageOriginalsUpdateImageOriginals(this.imageOriginalCommitbean)
                    .subscribe(originalData => {
                        if (originalData === 1) {
                            this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                            this.show('common.addupdateremoverecordsuccess', 'success');
                            this.oiuimageexecuteQuery();
                        } else {
                            this.show('common.addupdateremoverecordfailed', 'warn');
                            this.oiuimageexecuteQuery();
                        }
                    });
                } 
                else {
                    this.show('common.addupdateremoverecordsuccess', 'success');
                    this.oiuimageexecuteQuery();
                } */
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.oiuimageexecuteQuery();

                } 
                else {
                    this.show('common.addupdateremoverecordfailed', 'warn');
                    this.oiuimageexecuteQuery();
                }
            });
        }
        show(vldmsg, type?) {
            type = type ? type : 'warn';
            vldmsg = this.translateService.translate(vldmsg);
            const msgval = [{ message: vldmsg, type: type }];
            this.msgs = [...msgval];
        }   

        imgGridGridClear=()=>{
            this.image = null;
            this.imagesModel = new Images();
            this.oiuimageexecuteQuery();
            return true;
        }

        onImageGridDelete = (selectedRecord) => {
            if (this.imagesData && this.imagesData.length == 1) {
                this.image = null;
                this.imagesModel = new Images();
            }
            return true;
        }
        
}

