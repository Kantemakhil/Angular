import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { TimeFormat } from '@core/ui-components/time/timeFormat';
import { OiuimageService } from '../service/oiuimage.service';
import { ImageOriginals } from '@commonbeans/ImageOriginals';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Router } from '@angular/router';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { Renderer2 } from '@angular/core';
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
import { ImageProperties } from '@commonbeans/ImageProperties';
import { ImagePropertiesCommitBean } from '@common/beans/ImagePropertiesCommitBean';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ImageOriginalsCommitBean } from '@common/beans/ImageOriginalsCommitBean';
import { ValidateRowReturn } from '@ui-components/alpine-grid/alpine-grid.component';
import { OidpidenService } from '@inst/demographics-biometrics/service/oidpiden.service';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { OidmpitmService } from '@inst/property/service/oidmpitm.service';
import { ManageAppBarService } from "@core/service/manage-app-bar.service";



@Component({
    selector: 'app-oiuimagedialog',
    templateUrl: './oiuimagedialog.component.html'
})

export class OiuimagedialogComponent implements OnInit {
    screenModuleName: string;
    orientationType: string;
    imageViewType: string;
    imageOriginalCommitbean: ImageOriginalsCommitBean = new ImageOriginalsCommitBean() ;
    selectedImageIndex: number;
    // Variable declaration
    @ViewChild("camera", {static: true}) camera: any;
    @ViewChild("dialog", {static: true}) dialog: any;
    @ViewChild('imgGrid', {static: true}) imgGrid: any;
    msgs: any[] = [];
    imagesData: Images[] = [];
    imagesDataTemp: Images[] = [];
    imagesModel: Images = new Images();
    imagesTempModel: Images = new Images();
    imagesInsertList: Images[] = [];
    imagesUpdateList: Images[] = [];
    imagesDeleteList: Images[] = [];
    imagesCommitModel: ImagesCommitBean = new ImagesCommitBean();
    imageoriginalsData: ImageOriginals[] = [];
    imageoriginalsDataTemp: ImageOriginals[] = [];
    imageoriginalsModel: ImageOriginals = new ImageOriginals();
    imageoriginalsInsertList: ImageOriginals[] = [];
    imageoriginalsUpdatetList: ImageOriginals[] = [];
    imageoriginalsDeleteList: ImageOriginals[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    imagepropertiesData: ImageProperties[] = [];
    imagepropertiesModel: ImageProperties = new ImageProperties();
    imagepropertiesCommitModel: ImagePropertiesCommitBean = new ImagePropertiesCommitBean();
    imagepropertiesInsertList: ImageProperties[] = [];
    imagepropertiesUpdatetList: ImageProperties[] = [];
    imagepropertiesDeleteList: ImageProperties[] = [];
    editable: boolean;
    imagesColumnDef: any[];
    imagesPropertyColumnDef: any[];
    offCntPerReadOnly: boolean;
    perAddrReadOnly: boolean;
    perIdentReadOnly: boolean;
    perInfoReadOnly: boolean;
    perEmpReadOnly: boolean;
    ctlOffCaseNotesReadOnly: boolean;
    offenderCaseNotesReadOnly: boolean;
    ctlBlockReadOnly: boolean;
    offPrgObligationsReadOnly: boolean;
    ctlOffPrgObliReadOnly: boolean;
    offProgramProfilesReadOnly: boolean;
    ctlOffPrgProReadOnly: boolean;
    vOffAuthVisReadOnly: boolean;
    contactsReadOnly: boolean;
    offCaseNoteReadOnly: boolean;
    amendNoteReadOnly: boolean;
    personsReadOnly: boolean;
    offCaseNrReadOnly: boolean;
    profilesReadOnly: boolean;
    target: any;
    addprop:boolean=false;
    srchCtrlReadOnly: boolean;
    teamsReadOnly: boolean;
    butCtrlReadOnly: boolean;
    updCtrlReadOnly: boolean;
    offPrgOblHtyReadOnly: boolean;
    crtMvTmpReadOnly: boolean;
    bedAhReadOnly: boolean;
    offNotesReadOnly: boolean;
    cntlReadOnly: boolean;
    vOffBkgReadOnly: boolean;
    sysPflReadOnly: boolean;
    offenderGrievancesReadOnly: boolean;
    offenderGrievanceTxnsReadOnly: boolean;
    agencyCountsReadOnly: boolean;
    subRemCntReadOnly: boolean;
    resBlReadOnly: boolean;
    offVisitRestReadOnly: boolean;
    offAuthVisitorsReadOnly: boolean;
    imageVisitReadOnly: boolean;
    offAuthVisitOffReadOnly: boolean;
    imagesOffReadOnly: boolean;
    nbtQueryBlkReadOnly: boolean;
    visitingGroupsReadOnly: boolean;
    visitingMembersReadOnly: boolean;
    grieInqReadOnly: boolean;
    grieDetReadOnly: boolean;
    histCntInqReadOnly: boolean;
    agencyLocationCountsReadOnly: boolean;
    cg$ctrlReadOnly: boolean;
    rollListReadOnly: boolean;
    estCtrlReadOnly: boolean;
    imagesReadOnly: boolean;
    imageOriginalsReadOnly: boolean;
    imagePropertiesReadOnly: boolean;
    ctrlReadOnly: boolean;
    buttonReadOnly: boolean;
    staffMembersReadOnly: boolean;
    stgDetailReadOnly: boolean;
    rgreportRg: any[] = [];
    rgimageviewtypeRg: any[] = [];
    rgdummyimageviewtypeRg: any[] = [];
    rgimagepropertiesRg: any[] = [];
    image: string;
    selected = -1;
    url: string;
    insertFlag: boolean;
    importButtondisabled: boolean;
    buttondisabled: boolean;
    titleschanges: string;
    link: string;
    headerChange: boolean;
    showInmateHeader = true;
    headerType = '';
    pSearchType: string;
    updateFlag: boolean;
    deleteFlag: boolean;
    exportButton: boolean;
    freezeButton: boolean;
    lovproperty: boolean;
    cancelbutton: boolean;
    imgprptiesSelect = -1;
    isStarVisiable = '';
    securityThreatScreen: any[] = [];
    stgGroup: any;
    PersonSearchDialog: string[];
    constructor(private oiuimageFactory: OiuimageService,
        private renderer: Renderer2, public sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService,private appbarService: ManageAppBarService,
        private router: Router, private osiosearFactory: OsiosearService, public translateService: TranslateService,
        private oidrpitmFactory: OidrpitmService, private oiiptranFactory: OiiptranService,
        private ocuoicinFactory: OcuoicinService, private oumpersoFactory: OumpersoService, private osipsearFactory: OsipsearService,
        private oidviresFactory: OidviresService, private oidreleaFactory: OidreleaService, private oidvisitFactory: OidvisitService,
        private dialogService: DialogService,private oidmpitmFactory: OidmpitmService, private oidpidenFactory: OidpidenService, private injectOffenderService :InjectOffenderService) {
        this.imagesColumnDef = [];
        this.imagesPropertyColumnDef = [];

    }
    ngOnInit() {
        const checkUserRole = this.oiuimageFactory.allowDelete();
        checkUserRole.subscribe(deleteAllowed => {
            if (deleteAllowed === 1) {
                // this.deleteFlag = true;
             }
            //  else {
            // //     this.deleteFlag = false;
            // // }

        });
        const personScreen = ['/OUMPERSO'];
        const staffScreen = ['/OIDVIRES', '/OIDVISIT', '/OSIPSEAR', '/OCDPERSO'];
        this.PersonSearchDialog = ['/OCMFAPRO', '/OCDOFACC', '/OTMFOPRO', '/OCDOOBLI',
                                   '/OTDAGJTR', '/OTDMGJTR', '/OTDCLOSE', '/OTDDISBU',
                                   '/OTDRDTFU', '/OIDOMAIL', '/OCDPERSO', '/OCUOCCUP',
                                   '/OIDDPROP', '/OCUAVISN', '/OMUVREST' , '/OIVCTMNG'];
        this.securityThreatScreen = ['/OIDSTGID'];
        const usrl = this.router.url;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.imagesModel = this.osiosearFactory.imagesDataTemp;
        if (usrl.includes('/OIDRPITM')) {
            this.imagesModel = this.oidrpitmFactory.imagesDataTemp;
            this.insertFlag = true;
            this.updateFlag = true;
            this.deleteFlag = true;
            this.importButtondisabled = false;
            this.buttondisabled = true;
            // this.cancelbutton = false;
        }
        if (usrl.includes('/OIIPTRAN')) {
            this.imagesModel = this.oiiptranFactory.imagesDataTemp;
            this.imagesModel.screenName = 'OIIPTRAN';
            this.insertFlag = true;
            this.updateFlag = true;
            this.deleteFlag = true;
            this.importButtondisabled = false;
            this.buttondisabled = true;
            this.cancelbutton = false;
            const pptycode = this.oiuimageFactory.getCode(this.imagesModel.imageViewType);
            pptycode.subscribe(code => {
                if (code && code.length > 0) {
                    this.imageViewType = code;
                    this.orientationType = code;
                }
            });

        }
        if (usrl.includes('/OIDMPITM')) {

            this.imagesModel = this.oidmpitmFactory.imagesDataTemp;

            this.imagesModel.screenName = 'OIDMPITM';

            this.insertFlag = true;

            this.updateFlag = true;

            this.deleteFlag = true;

            this.importButtondisabled = false;

            this.buttondisabled = true;

            this.cancelbutton = false;

            this.imagesModel.imageObjectId = this.dialog.data.offenderBookId;
            
            if(this.dialog.data.propertyContainerId ){
                this.imagesModel.imageObjectType = 'PPTY_CONT';
                this.imagesModel.imageObjectSeq = null;
                this.imagesModel.imageObjectId = this.dialog.data.propertyContainerId;
                this.imagesModel.pptyDescription = this.dialog.data.containerDescription;
                this.imagesModel.imageViewType = null;
                this.imagesModel.orientationType = null;
                this.oidmpitmFactory.imagesDataTemp.pptyDescription=this.imagesModel.pptyDescription;
                this.oidmpitmFactory.imagesDataTemp.imageObjectType = 'PPTY_CONT';
                this.oidmpitmFactory.imagesDataTemp.imageViewType = null;
                this.oidmpitmFactory.imagesDataTemp.imageObjectSeq = this.imagesModel.imageObjectSeq;
                this.oidmpitmFactory.imagesDataTemp.orientationType = null;
            }else{

               
            this.imagesModel.pptyDescription = this.dialog.data.pptyDescription;

            this.imagesModel.imageObjectType = 'PPTY';

            this.imagesModel.imageViewType = this.dialog.data.propertyType;

            this.imagesModel.imageObjectSeq = this.dialog.data.propertyItemSeq;

            this.imagesModel.orientationType = this.dialog.data.propertyType;

            const pptydes = this.oiuimageFactory.getPropertyTypeDescription(this.dialog.data.propertyType);

            pptydes.subscribe(data => {

                if (data && data.length > 0) {

                    this.oidmpitmFactory.imagesDataTemp.pptyDescription = data;

                    this.imagesModel.pptyDescription = data;

                }

            });

        }

            //this.imagesModel.modelName = this.dialog.data.modelName;

            // const pptycode = this.oiuimageFactory.getCode(this.imagesModel.imageViewType);

            // pptycode.subscribe(code => {

            //     if (code && code.length > 0) {

            //         this.imageViewType = code;

            //         this.orientationType = code;

            //     }

            // });



        }

        if (usrl.includes('/OIDOICUS')) {
            this.isStarVisiable = '*';
            this.imagesModel = this.ocuoicinFactory.imagesDataTemp;
            this.insertFlag = true;
            this.updateFlag = true;
            this.deleteFlag = true;
            this.importButtondisabled = false;
            this.exportButton = true;
            this.buttondisabled = true;
            // this.cancelbutton = false;
            this.link = 'oiuimage/getImageOicCodeDescription';

        }
        if (usrl.includes('/OUMPERSO')) {
            this.isStarVisiable = '*';
            this.imagesTempModel = new Images();
            this.imagesModel = this.oumpersoFactory.imagesDataTemp;
            this.imagesTempModel = this.oumpersoFactory.imagesDataTemp;
            this.insertFlag = true;
            this.updateFlag = true;
            this.deleteFlag = true;
            this.importButtondisabled = false;
            this.buttondisabled = true;
            this.showInmateHeader = false;
            // this.cancelbutton = false;

        }
        if (usrl.includes('/OSIPSEAR')) {
            this.isStarVisiable = '*';
            this.imagesTempModel = new Images();
            this.imagesModel = this.osipsearFactory.imagesDataTemp;
            this.imagesTempModel = this.osipsearFactory.imagesDataTemp;
            this.insertFlag = true;
            this.updateFlag = true;
            this.deleteFlag = true;
            this.importButtondisabled = false;
            this.buttondisabled = true;
            this.showInmateHeader = false;
             this.cancelbutton = true;

        }
            if(this.PersonSearchDialog.includes(usrl)){
            this.isStarVisiable = '*';
            this.imagesTempModel = new Images();
            this.imagesModel = this.osipsearFactory.imagesDataTemp;
            this.imagesTempModel = this.osipsearFactory.imagesDataTemp;
            this.insertFlag = true;
            this.updateFlag = true;
            this.deleteFlag = true;
            this.importButtondisabled = false;
            this.buttondisabled = true;
            this.showInmateHeader = false;
             this.cancelbutton = true;

        }
        if (usrl.includes('/OIDVIRES')) {
            this.isStarVisiable = '*';
            this.imagesTempModel = new Images();
            this.imagesModel = this.oidviresFactory.imagesDataTemp;
            this.imagesTempModel = this.oidviresFactory.imagesDataTemp;
            this.insertFlag = true;
            this.updateFlag = true;
            this.deleteFlag = true;
            this.importButtondisabled = false;
            this.buttondisabled = true;
            this.showInmateHeader = false;
            // this.cancelbutton = false;

        }
        if (usrl.includes('/OIDVISIT')) {
            this.isStarVisiable = '*';
            this.imagesTempModel = new Images();
            this.imagesModel = this.oidvisitFactory.imagesDataTemp;
            this.imagesTempModel = this.oidvisitFactory.imagesDataTemp;
            this.pSearchType = 'I';
            const reqData = { pSearchType: 'I', pPersonId: this.imagesTempModel.personId };
            this.osipsearFactory.personsExecuteQuery(reqData).subscribe(person => {
                if (person && person.length > 0) {
                    this.imagesTempModel.birthDate = person[0].birthDate;
                }
            });
            this.insertFlag = true;
            this.updateFlag = true;
            this.deleteFlag = true;
            this.importButtondisabled = false;
            this.buttondisabled = true;
            this.showInmateHeader = false;
            // this.cancelbutton = false;

        }

        if (usrl.includes('/OIDRELEA')) {
            this.imagesTempModel = new Images();
            this.imagesModel = this.oidreleaFactory.imagesDataTemp;
            this.insertFlag = false;
            this.importButtondisabled = false;
            this.buttondisabled = true;
            // this.cancelbutton = true;
            // this.showInmateHeader = false;

        }


        if (this.router.url === '/home' || this.router.url.includes('/OSIOSEAR')) {
            this.insertFlag = false;
            this.importButtondisabled = true;
            this.buttondisabled = true;
            this.updateFlag = false;
            this.deleteFlag = false;
            // this.cancelbutton = true;
        } else if (this.router.url.includes('/OIDPIDEN')) {
            this.imagesModel = new Images();
            this.imagesModel = this.osiosearFactory.imagesDataTemp;
            this.insertFlag = true;
            this.updateFlag = true;
            this.deleteFlag = true;
            this.importButtondisabled = true;
            this.exportButton = true;
            this.buttondisabled = true;
            //  this.cancelbutton = true;
        } else if(this.router.url.includes('/OSIHRSUM')) {
            this.imagesModel = new Images();
            this.imagesModel = this.osiosearFactory.imagesDataTemp;
            this.insertFlag = false;
            this.updateFlag = false;
            this.deleteFlag = false;
            this.importButtondisabled = true;
            this.exportButton = true;
            this.buttondisabled = true;

        } else{
            this.insertFlag = true;
            
        }
        if (personScreen.includes(this.router.url)) {
            this.headerType = 'STAFF';
            this.importButtondisabled = false;
            // this.cancelbutton = true;

        } else if (staffScreen.includes(this.router.url)) {
            this.headerType = 'PERSON';
            this.importButtondisabled = false;
            // this.cancelbutton = true;
        } else if (this.isSecurityThreatGroup) {
            this.headerType = 'SECURITY_THREAT_GROUPS';
            if (this.dialog.data.modelName === 'OIDSTGID') {
                this.showInmateHeader = false;
                this.imagesModel = new Images();
                this.imagesModel.imageObjectId = this.dialog.data.stgId;
                this.imagesModel.imageObjectSeq = this.dialog.data.identifierSeq;
                this.imagesModel.imageObjectType = this.dialog.data.objType;
                this.imagesModel.modelName = this.dialog.data.modelName;
                this.updateFlag = true;
                this.importButtondisabled = false;
                this.deleteFlag = true;
            }
        }
        this.oiuimageexecuteQuery();
        this.oiuimagimageoriginalsExecuteQuery();

        const imagesColumnDefTemp = [
            {
                fieldName: this.translateService.translate('oiuimage.imagetype') + this.isStarVisiable,
                field: 'orientationType', datatype: 'lov', editable: true, width: 150,
                domain: this.link ? undefined : 'IMAGE_VIEW',
                hide: this.isFieldVisiable('orientationType'), link: this.link ? this.link : undefined, cellEditable: this.canActiveFlagEdit
            },
            {
                fieldName: this.translateService.translate('oiuimage.imagetype'), field: 'markType', datatype: 'text',
                editable: false, width: 150,
                hide: this.isFieldVisiable('markType')
            },
            {
                fieldName: this.translateService.translate('oiuimage.bodypart'), field: 'bodyPartCode', datatype: 'text',
                editable: false, width: 150,
                hide: this.isFieldVisiable('bodyPartCode')
            },
            {
                fieldName: this.translateService.translate('oiuimage.imageid'), field: 'imageId', datatype: 'number',
                editable: false, width: 150,
                hide: this.isFieldVisiable('imageId')
            },
            {
                fieldName: this.translateService.translate('oiuimage.capturedate'), field: 'captureDate',
                editable: false, width: 150,
                hide: this.isFieldVisiable('captureDate'), datatype: 'dateTime',
            },
            {
                fieldName: this.translateService.translate('oiuimage.default'), field: 'activeFlag', datatype: 'checkbox',
                editable: true, width: 150,
                hide: this.isFieldVisiable('activeFlag') || !this.updateFlag, cellEditable: this.canActiveFlagEdit
            },
            {
                fieldName: this.translateService.translate('oiuimage.default'), field: 'activeFlag', datatype: 'checkbox',
                editable: false, width: 150,
                hide: this.updateFlag
            },
            {
                fieldName: this.translateService.translate('oiuimage.imageobject'), field: 'imageObjectId', datatype: 'text',
                editable: true, width: 150,
                hide: this.isFieldVisiable('imageObjectId')
            },
            {
                fieldName: this.translateService.translate('oiuimage.propertytype'), field: 'pptyDescription', datatype: 'text',
                editable: true, width: 150,
                hide: this.isFieldVisiable('pptyDescription'), cellEditable: this.canActiveFlagEdit
            },
            {
                fieldName: this.translateService.translate('oiuimage.containerdesc'), field: 'pptyDescription', datatype: 'text',
                editable: true, width: 150,
                hide: this.isFieldVisiable('containerDescription'), cellEditable: this.canActiveFlagEdit
            },
            {
                fieldName: this.translateService.translate('oiuimage.viewtype'), field: 'imageViewType', datatype: 'text',
                editable: true, width: 150,
                hide: this.isFieldVisiable('imageViewType')
            },
            {
                fieldName: this.translateService.translate('oiuimage.imageobjectseq'), field: 'imageObjectSeq', datatype: 'text',
                editable: true, width: 150,
                hide: this.isFieldVisiable('imageObjectSeq')
            },
            {
                fieldName: this.translateService.translate('oiuimage.imagefile'), field: 'imageFile', datatype: 'text',
                editable: false, width: 150, hide: true
            }

        ];
        if (this.router.url.includes('/OIDRPITM') || this.router.url.includes('/OIIPTRAN') || this.router.url.includes('/OIDMPITM')) {
            const tempColumn = [];
            tempColumn.push(imagesColumnDefTemp[7]);
            imagesColumnDefTemp.forEach(element => {
                if (imagesColumnDefTemp.indexOf(element) !== 7) {
                    tempColumn.push(element);
                }
            });
            this.imagesColumnDef = tempColumn;
        } else {
            this.imagesColumnDef = imagesColumnDefTemp;
        }

            
        
        const titles = {description: 'Description'};
        this.imagesPropertyColumnDef = [
            // { fieldName: '', field: 'property', editable: true, width: 150, domain: 'IMAGE_PROP', datatype: 'lov', titles: titles },
            { fieldName: '',
            field: 'property', datatype: 'lov',
           editable: true, width: 150,
           domain: 'IMAGE_PROP',
            cellEditable: this.canActiveFlagEdit}
        ];
        this.lovEnableFun();
    }

    get isSecurityThreatGroup(): boolean {
        return this.securityThreatScreen.includes('/' + this.dialog.data.modelName);
    }

    isFieldVisiable(field: string) {
        const osiosearFieldList = ['orientationType', 'imageId', 'captureDate', 'activeFlag'];
        const oidpidenFieldList = this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_IDM' ?
            ['markType', 'bodyPartCode', 'imageId', 'captureDate', 'activeFlag'] :
            osiosearFieldList;
        const oidrpitmFieldList = ['pptyDescription', 'imageId', 'captureDate','containerDescription'];
        const oidstgidFieldList = ['markType', 'imageId', 'captureDate', 'activeFlag'];
        if ((this.router.url.includes('/OSIOSEAR') || this.router.url === '/home') && osiosearFieldList.includes(field)) {
            this.titleschanges = this.translateService.translate('oiuimage.imageface');
            // this.isStarVisiable = '';
            return false;
        }
        if (this.router.url.includes('/OIDPIDEN') && oidpidenFieldList.includes(field)
            && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG') {
            this.titleschanges = this.translateService.translate('oiuimage.imageface');
            return false;
        }
        if (this.router.url.includes('/OSIHRSUM') && oidpidenFieldList.includes(field)
            && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG') {
            this.titleschanges = this.translateService.translate('oiuimage.imageface');
            return false;
        }
        if (this.router.url.includes('/OIDPIDEN') && oidpidenFieldList.includes(field)) {
            this.titleschanges = this.translateService.translate('oiuimage.imageidentifymarks');
            return false;
        }
        if ((this.router.url.includes('/OIDRPITM') || this.router.url.includes('/OIIPTRAN') || this.router.url.includes('/OIDMPITM')) && oidrpitmFieldList.includes(field)) {
            if(this.router.url.includes('/OIDMPITM')){
                if(this.dialog.data.propertyContainerId){
                    this.titleschanges = this.translateService.translate('oiuimage.containerImage');
                 }else{
                    this.titleschanges = this.translateService.translate('oiuimage.imageproperty');
                 }
                if(field == 'pptyDescription'){
                    if(this.dialog.data.propertyContainerId){
                        return true;
                    }
                    return false;
                }
                
                if(field == 'containerDescription'){
                 if(this.dialog.data.propertyContainerId){
                     return false;
                 }
                 
                 return true;
             }
             
             return false;
            }else{
                this.titleschanges = this.translateService.translate('oiuimage.imageproperty');
                if(field == 'containerDescription'){
                    return true;
                }
                return false;
            }
           
           
        }
        if(field == 'activeFlag' && this.dialog.data.propertyContainerId){
                return false;
        }
        if ((this.router.url.includes('/OIDOICUS')) && osiosearFieldList.includes(field)) {
            this.titleschanges = this.translateService.translate('oiuimage.imageoic');
            return false;
        }
        if ((this.router.url.includes('/OUMPERSO')) && osiosearFieldList.includes(field)) {
            this.titleschanges = this.translateService.translate('oiuimage.imagestaff');
            return false;
        }
        if ((this.router.url.includes('/OSIPSEAR')) && osiosearFieldList.includes(field)) {
            this.titleschanges = this.translateService.translate('oiuimage.imageidentifiers');
            return false;
        }
        if(this.PersonSearchDialog.includes(this.router.url) && osiosearFieldList.includes(field)) {
            this.titleschanges = this.translateService.translate('oiuimage.imageidentifiers');
            return false;
        }
        if ((this.router.url.includes('/OIDVIRES')) && osiosearFieldList.includes(field)) {
            this.titleschanges = this.translateService.translate('oiuimage.imagevisitors');
            return false;
        }
        if ((this.router.url.includes('/OIDRELEA')) && osiosearFieldList.includes(field)) {
            this.titleschanges = this.translateService.translate('oiuimage.imageface');
            this.insertFlag = false;
            return false;
        }
        if ((this.router.url.includes('/OIDVISIT')) && osiosearFieldList.includes(field)) {
            this.titleschanges = this.translateService.translate('oiuimage.imagevisitors');
            // this.isStarVisiable = '*';
            return false;
        }
        if (this.isSecurityThreatGroup) {
            this.stgGroup = this.dialog.data.stgGroup;
            if (this.dialog.data.modelName === 'OIDSTGID' && oidstgidFieldList.includes(field)) {
                this.titleschanges = this.translateService.translate('oiuimage.imagingstgidentifiers');
                return false;
            }
        }
        return true;
    }
    get BASE64IMAGE(): string {
        return 'data:image/JPEG;base64,';
    }

    get BASE64PNG(): string {
        return 'data:image/PNG;base64,';
    }
    onRowClickimages(event) {
        if (event) {
            this.imagesModel = new Images();
            this.imagesModel = event;
            this.selectedImageIndex = this.imagesData.indexOf(this.imagesModel);
            this.imgGrid.gridOptions.api.forEachNode(node=>{
                if(node.selected){
                    this.selectedImageIndex =node.rowIndex;
                }
            }
            )
            if(this.imagesData[this.selectedImageIndex]['imageFull']){
                this.image=this.imagesData[this.selectedImageIndex]['imageFull'];
            }else{
                this.image=null;
            }
            if (this.imagesModel.imageId) {
                this.exportButton = false;
                
                this.importButtondisabled = true;
                if (this.imagesModel.createDatetime) {
                    this.cancelbutton = true;
                } else {
                    this.cancelbutton = false;
                }
                this.imagepropertiesExecuteQuery();
            } else {
                this.imagesModel.imageFlag='Y';
                this.exportButton = true;
                this.screenModuleName = 'OIMAGE_CAP';
                const importcheckUserRole = this.oiuimageFactory.checkUserRole(this.screenModuleName);
                importcheckUserRole.subscribe(imbuttonEnabled => {
                    if (imbuttonEnabled === 1) {
                        this.importButtondisabled = false;
                    } else {
                        this.importButtondisabled = true;
                    }

                });
                this.cancelbutton = true;
            }
        }
        if (this.dialog.data.modelName === 'OIDSTGID') {
            if (event && event.imageFull) {
                this.image = event.imageFull;
            } else {
                this.oiuimagimageoriginalsExecuteQuery();
            }
            return;
        }
        // event.imageFull = null;
        if (event && !event.imageFull && event.captureDate) {
        this.oiuimagimageoriginalsExecuteQuery();
        } else {
            // this.image = null;
        }
    }

    onOffenderChange(offender) {
        this.imagesModel = new Images();
        this.vHeaderBlockModel = offender;
    }


    oiuimageexecuteQuery() {
        //this.image = null;
    
        this.imagesModel.captureDate = null;
        if(['/OSIPSEAR','/OIDVISIT' , '/OIDVIRES' , '/OSIHRSUM'].includes(this.router.url) ){
            this.imagesModel.imageObjectId = this.dialog.data.imageObjectId;
        }
        else if (this.router.url == '/OIDMPITM' && this.dialog.data.propertyContainerId == null) { 
            this.imagesModel.imageObjectSeq = this.dialog.data.propertyItemSeq;
            this.imagesModel.imageObjectId = this.vHeaderBlockModel.offenderBookId;
        }
        else if (this.dialog.data.propertyContainerId) { 
            this.imagesModel.imageObjectId = this.dialog.data.propertyContainerId;
        }
        else {
            if (this.PersonSearchDialog.includes(this.router.url)) {
                this.imagesTempModel = new Images();
                this.imagesModel = this.osipsearFactory.imagesDataTemp;
                this.imagesTempModel = this.osipsearFactory.imagesDataTemp;
            } else {
                this.imagesModel.imageObjectId = this.vHeaderBlockModel.offenderBookId;
            }
        }
    
        if (this.dialog.data.imageObjectType) { 
            this.imagesModel.imageObjectType = this.dialog.data.imageObjectType;
        }
        
        this.imagesModel.imageViewType = this.dialog.data.imageViewType;

        if (this.dialog.data.modelName) {
            this.imagesModel.modelName = this.dialog.data.modelName;
        }
        

        const serviceObj = this.oiuimageFactory.imagesExecuteQuery(this.imagesModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.imagesData = [];
                this.importButtondisabled = true;
                this.exportButton = true;
                this.cancelbutton = true;
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
                    if (this.imagesModel.imageObjectType === 'PPTY') {

                        element['pptyDescription'] = this.dialog.data.pptyDescription;

                    }
                    if (this.imagesModel.imageObjectType === 'PPTY_CONT') {

                        element['pptyDescription'] = this.dialog.data.containerDescription;

                    }
                    element['activeFlag'] = (element['activeFlag'] === 'N') ? false : true;
                    if (this.dialog.data.modelName === 'OIDSTGID' ) {
                        element['markType'] = element.imageViewType;
                    }
                });
                data.forEach(element => {
                    if (element.captureDate) {
                        //  const dateTime = DateFormat.parse(DateFormat.format(DateFormat.getDate(element.captureDate)) + ' ' +
                        //       (element.captureDate + '').split('T')[0]);
                        const datearr = element.captureDate.split('T');
                        const serDate = new Date(datearr[0] + ' ' + datearr[1]);
                        element.captureDate = serDate;
                     // element.captureDate = dateTime;
                    }
                });
                this.imagesData = data;
                this.lovEnableFun();
                this.selected = 0;
                this.cancelbutton = true;
                this.screenModuleName = 'OIUIMAGE';
                const exportcheckUserRole = this.oiuimageFactory.checkUserRole(this.screenModuleName);
                exportcheckUserRole.subscribe(exbuttonEnabled => {
                    if (exbuttonEnabled === 1) {
                        this.exportButton = false;
                    } else {
                        this.exportButton = true;
                    }

                });
                // this.exportButton = false;
                this.imagesModel = this.imagesData[0];
            }
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        });
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
                this.cancelbutton = true;
                if (this.imageoriginalsData[0].imageFull) {
                    this.image = this.BASE64IMAGE + this.imageoriginalsData[0].imageFull;
                    this.imagesData[this.selectedImageIndex]['imageFull'] = this.image;
                }
            }
        });
    }
    imagepropertiesExecuteQuery() {
        this.imagepropertiesModel.imageId = this.imagesModel.imageId;
        const imagepropertiesResult = this.oiuimageFactory.imagePropertiesExecuteQuery(this.imagepropertiesModel);
        imagepropertiesResult.subscribe(data => {
            if (data.length === 0) {
                this.imagepropertiesData = [];
            } else {
                this.imagepropertiesData = data;
                this.imagepropertiesModel = data[0];
                this.imgprptiesSelect = 0;
            }
        });
    }
    onRowClickimageproperties(event) {
    }
    allowNumbers(event) {
    }
    onReportsclick() {
    }
    onCaptureImageclick(camera) {

        let selectedRow = this.imgGrid.gridOptions.api.getSelectedNodes();
        this.selectedImageIndex = selectedRow[0].rowIndex;

        if (this.router.url.includes('/OIDPIDEN') && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG'||this.router.url.includes('/OSIHRSUM')
         || this.router.url.includes('/OIDOICUS') || this.router.url.includes('/OUMPERSO') || this.router.url.includes('/OSIPSEAR')
         || this.router.url.includes('/OIDVIRES') || this.router.url.includes('/OIDVISIT') || this.PersonSearchDialog.includes(this.router.url)) {
            if (!this.imagesData[this.selectedImageIndex].orientationType) {
                this.show('oiuimage.imagetypemust');
                return;
            }

         }
        // imagesModel
        try {
        // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // const isCam = navigator.mediaDevices.getUserMedia({ video: true });
            // isCam.catch( ele => {
            //     this.show(ele.message);
            // });
            // isCam.then(ele => {
        //         ele.getTracks().forEach(track => track.stop());
                const dialogData = {onCloseClick: this.onCloseClick};
                this.dialogService.openLinkDialog('/imagecapturedialog', dialogData, 80).subscribe(result => {
                    if (result) {
                    this.onImageCapture(result);
                    }
                });

            // },
            // reject => {
            //     this.show(reject.message);
            //     
            // });


        // }
    } catch (e) {
        
    }

    }
    OnImageImport(fileImport) {
        let selectedRow = this.imgGrid.gridOptions.api.getSelectedNodes();
        this.selectedImageIndex = selectedRow[0].rowIndex;
        if (this.router.url.includes('/OIDPIDEN') && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG' ||
        this.router.url.includes('/OIDOICUS') ||
        this.router.url.includes('/OUMPERSO') || 
        this.router.url.includes('/OSIPSEAR') ||
        this.PersonSearchDialog.includes(this.router.url)||
        this.router.url.includes('/OIDVIRES') ||
        this.router.url.includes('/OIDVISIT')) {
            if (!this.imagesData[this.selectedImageIndex].orientationType) {
                this.show('oiuimage.imagetypemust');
                return;
            }
        }
        this.cancelbutton = false;
        fileImport.value = '';
        fileImport.click();
        if (!this.imagesData[this.selectedImageIndex].imageId) {
        this.getNextImageId();
        }
        this.imgGrid.setColumnData('activeFlag', this.selectedImageIndex, true);
        this.imgGrid.setColumnData('captureDate', this.selectedImageIndex, DateFormat.getDate());
    }
    getNextImageId() {
        const imageIdService = this.oiuimageFactory.getNextImageId();
        imageIdService.subscribe(imageId => {
            if (imageId && typeof imageId !== 'object') {
                this.imgGrid.setColumnData('imageId', this.selectedImageIndex, imageId);
            }
        });
    }
    onExportImageclick() {
        if (this.image) {
            const offender = this.offenderSearchService.selectedOffender;
            if (this.dialog.data.modelName !== 'OIDSTGID') {
                if (!offender && !offender.offenderBookId) {
                    return;
                }
            }
            const lname = this.showInmateHeader ? offender.lastName : '';
            const fname = this.showInmateHeader ? offender.firstName : '';
            const offId = this.showInmateHeader ? offender.offenderIdDisplay : '';
            const imgId = this.imagesModel.imageId;
            let title = ` ${lname}_${fname}_${offId}_IMG${imgId}`;
            if (this.dialog.data.modelName === 'OIDSTGID') {
                title = ` Image Id :${imgId}`;
            }
             const exportData = {title: title, imageFull: this.image};
            this.dialogService.openLinkDialog('/oiuimageexportscreen', exportData, 80).subscribe(data => {


            });
        }
    }

    onFreezeImageclick() {
        this.camera.capture();
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

    onHideShowGridclick() {
    }
    onCancelclick() {
        this.image = null;
        this.imagesData[this.selectedImageIndex]['imageFull'] = this.image;
    }
    ok() {
    }
    no() {
    }
    cancel() {
        this.dialog.close(null);
        this.appbarService.manageIcon(true);
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



    onImageGridInsert = () => {
        this.image = null;
        this.imagesModel = new Images();
        if (!this.imagesModel.imageId) {
            this.imagepropertiesData = [];
        }
        for (let i = 0; i < this.imagesData.length; i++) {
            if (
            this.router.url.includes('/OIDPIDEN') && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG' ||
            this.router.url.includes('/OSIHRSUM') ||
            this.router.url.includes('/OIDOICUS') ||
            this.router.url.includes('/OUMPERSO') ||
            this.router.url.includes('/OSIPSEAR') ||
            this.PersonSearchDialog.includes(this.router.url)||
            this.router.url.includes('/OIDVIRES') ||
            this.router.url.includes('/OIDVISIT')) {
                if (!this.imagesData[i].orientationType) {
                    this.show(this.translateService.translate('oiuimage.imagetypemust'), 'warn');
                    return;
                }
            }
            if (!this.imagesData[i].imageId) {
                this.show('oiuimage.cannotnew', 'warn');
                return;
            }
        }
        this.imagesModel.imageFlag='Y';
        if (this.dialog.data.modelName === 'OIDSTGID') {
            this.osiosearFactory.imagesDataTemp.markType = this.dialog.data.imageType;
        }
        if (this.router.url.includes("/OIDMPITM")) {
          return {
            markType: this.osiosearFactory.imagesDataTemp.markType,
            bodyPartCode: this.osiosearFactory.imagesDataTemp.bodyPartCode,

            pptyDescription: this.router.url.includes("/OIDMPITM")
              ? this.oidmpitmFactory.imagesDataTemp.pptyDescription
              : this.oidmpitmFactory.imagesDataTemp.pptyDescription,
          };
        }
       
        return {
          markType: this.osiosearFactory.imagesDataTemp.markType,
          bodyPartCode: this.osiosearFactory.imagesDataTemp.bodyPartCode,
          pptyDescription: this.router.url.includes("/OIIPTRAN")
            ? this.oiiptranFactory.imagesDataTemp.orientationType
            : this.oidrpitmFactory.imagesDataTemp.pptyDescription,
        };

    }
    onImageGridDelete = (data) => {
        if (this.imagepropertiesData.length > 0) {
            this.show(this.translateService.translate('oiuimage.cannotdelete'), 'warn');
            return false;
        } else {
            if (this.imagesData && this.imagesData.length == 1) {
                this.image = null;
                this.imagesModel = new Images();
            }
            if (this.router.url.includes('/OIDPIDEN') && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG' ||this.router.url.includes('/OSIHRSUM')||
                this.router.url.includes('/OIDPIDEN') && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_IDM'
                || this.router.url.includes('/OIDOICUS') || this.router.url.includes('/OUMPERSO') || this.router.url.includes('/OSIPSEAR')
                || this.router.url.includes('/OIDVIRES') || this.router.url.includes('/OIDVISIT')) {
                if (data[0].activeFlag && this.imagesData.length > 1) {
                    this.show('oiuimage.pleasemark');
                }
            }
            return true;
        }
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    oiuimagePopulateDetails() {
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
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
                if (this.router.url.includes('/OIDPIDEN') && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG'||this.router.url.includes('/OSIHRSUM')
            || this.router.url.includes('/OIDOICUS') || this.router.url.includes('/OUMPERSO') || this.router.url.includes('/OSIPSEAR') 
            ||this.PersonSearchDialog.includes(this.router.url)
             || this.router.url.includes('/OIDVIRES') || this.router.url.includes('/OIDVISIT')) {
                if (!this.imagesInsertList[i].orientationType) {
                    this.show(this.translateService.translate('oiuimage.imagetypemust'), 'warn');
                    return;
                }
            }
                if (!this.image) {
                    this.show(this.translateService.translate('oiuimage.importanimage'), 'warn');
                    return;
                }

                let imgString = this.imagesInsertList[i]['imageFull'];
                let size = new Blob([imgString]).size;
                // if (size > 1900000) {
                //     this.show(this.translateService.translate('oiuimage.largeimage'), 'warn');
                //     return;
                // }

                if (this.router.url.includes('/OIDRPITM')) {
                    this.imagesInsertList[i].imageObjectType = this.oidrpitmFactory.imagesDataTemp.imageObjectType;
                    this.imagesInsertList[i].imageObjectId = this.oidrpitmFactory.imagesDataTemp.imageObjectId;
                    this.imagesInsertList[i].imageObjectSeq = this.oidrpitmFactory.imagesDataTemp.imageObjectSeq;
                    if (this.oidrpitmFactory.imagesDataTemp.orientationType) {
                        this.imagesInsertList[i].orientationType = this.oidrpitmFactory.imagesDataTemp.orientationType;
                    }
                    this.imagesInsertList[i].imageViewType = this.oidrpitmFactory.imagesDataTemp.imageViewType;

                }

                if (this.router.url.includes('/OIIPTRAN')) {
                    this.imagesInsertList[i].imageObjectType = this.oiiptranFactory.imagesDataTemp.imageObjectType;
                    this.imagesInsertList[i].imageObjectId = this.oiiptranFactory.imagesDataTemp.imageObjectId;
                    this.imagesInsertList[i].imageObjectSeq = this.oiiptranFactory.imagesDataTemp.imageObjectSeq;
                    if (this.orientationType) {
                        this.imagesInsertList[i].orientationType = this.orientationType;
                    }
                    this.imagesInsertList[i].imageViewType = this.imageViewType;
                }
                if (this.router.url.includes('/OIDMPITM')) {

                     //this.imagesInsertList[i].imageObjectType = 'PPTY';

                    // this.imagesInsertList[i].imageObjectId = this.dialog.data.offenderBookId;

                    // this.imagesInsertList[i].imageObjectSeq = this.dialog.data.propertyItemSeq;

                    this.imagesInsertList[i].imageObjectType = this.oidmpitmFactory.imagesDataTemp.imageObjectType;

                    this.imagesInsertList[i].imageObjectId = this.oidmpitmFactory.imagesDataTemp.imageObjectId;

                    this.imagesInsertList[i].imageObjectSeq = this.oidmpitmFactory.imagesDataTemp.imageObjectSeq;;

                    if (this.orientationType) {

                        this.imagesInsertList[i].orientationType = this.dialog.data.propertyType;

                    }

                    this.imagesInsertList[i].imageViewType = this.dialog.data.propertyType;

                }

                if (this.router.url.includes('/OIDOICUS')) {
                    this.imagesInsertList[i].imageObjectType = this.ocuoicinFactory.imagesDataTemp.imageObjectType;
                    this.imagesInsertList[i].imageObjectId = this.ocuoicinFactory.imagesDataTemp.imageObjectId;
                    this.imagesInsertList[i].imageObjectSeq = this.ocuoicinFactory.imagesDataTemp.imageObjectSeq;
                    if (this.ocuoicinFactory.imagesDataTemp.orientationType) {
                        this.imagesInsertList[i].orientationType = this.ocuoicinFactory.imagesDataTemp.orientationType;
                    }
                    this.imagesInsertList[i].imageViewType = this.ocuoicinFactory.imagesDataTemp.imageViewType;
                }
                if (this.router.url.includes('/OUMPERSO')) {
                    this.imagesInsertList[i].imageObjectType = this.oumpersoFactory.imagesDataTemp.imageObjectType;
                    this.imagesInsertList[i].imageObjectId = this.oumpersoFactory.imagesDataTemp.imageObjectId;
                    this.imagesInsertList[i].imageObjectSeq = this.oumpersoFactory.imagesDataTemp.imageObjectSeq;
                    if (this.oumpersoFactory.imagesDataTemp.orientationType) {
                        this.imagesInsertList[i].orientationType = this.oumpersoFactory.imagesDataTemp.orientationType;
                    }
                    this.imagesInsertList[i].imageViewType = this.oumpersoFactory.imagesDataTemp.imageViewType;
                }
                if (this.router.url.includes('/OSIPSEAR')) {
                    this.imagesInsertList[i].imageObjectType = this.osipsearFactory.imagesDataTemp.imageObjectType;
                    this.imagesInsertList[i].imageObjectId = this.osipsearFactory.imagesDataTemp.imageObjectId;
                    this.imagesInsertList[i].imageObjectSeq = this.osipsearFactory.imagesDataTemp.imageObjectSeq;
                    if (this.osipsearFactory.imagesDataTemp.orientationType) {
                        this.imagesInsertList[i].orientationType = this.osipsearFactory.imagesDataTemp.orientationType;
                    }
                    this.imagesInsertList[i].imageViewType = this.osipsearFactory.imagesDataTemp.imageViewType;

                }
                if (this.router.url.includes('/OIDVIRES')) {
                    this.imagesInsertList[i].imageObjectType = this.oidviresFactory.imagesDataTemp.imageObjectType;
                    this.imagesInsertList[i].imageObjectId = this.oidviresFactory.imagesDataTemp.imageObjectId;
                    this.imagesInsertList[i].imageObjectSeq = this.oidviresFactory.imagesDataTemp.imageObjectSeq;
                    if (this.oidviresFactory.imagesDataTemp.orientationType) {
                        this.imagesInsertList[i].orientationType = this.oidviresFactory.imagesDataTemp.orientationType;
                    }
                    this.imagesInsertList[i].imageViewType = this.oidviresFactory.imagesDataTemp.imageViewType;

                }

                if (this.router.url.includes('/OIDVISIT')) {
                    this.imagesInsertList[i].imageObjectType = this.oidvisitFactory.imagesDataTemp.imageObjectType;
                    this.imagesInsertList[i].imageObjectId = this.oidvisitFactory.imagesDataTemp.imageObjectId;
                    this.imagesInsertList[i].imageObjectSeq = this.oidvisitFactory.imagesDataTemp.imageObjectSeq;
                    if (this.oidvisitFactory.imagesDataTemp.orientationType) {
                        this.imagesInsertList[i].orientationType = this.oidvisitFactory.imagesDataTemp.orientationType;
                    }
                    this.imagesInsertList[i].imageViewType = this.oidvisitFactory.imagesDataTemp.imageViewType;

                }
                if (this.router.url.includes('/OIDPIDEN')) {
                this.imagesInsertList[i].imageObjectType = this.osiosearFactory.imagesDataTemp.imageObjectType;
                this.imagesInsertList[i].imageObjectId = this.osiosearFactory.imagesDataTemp.imageObjectId;
                this.imagesInsertList[i].imageObjectSeq = this.osiosearFactory.imagesDataTemp.imageObjectSeq;
                if (this.imagesInsertList[i].orientationType) {
                    this.imagesInsertList[i].orientationType = this.imagesInsertList[i].orientationType;
                } else {
                    this.imagesInsertList[i].orientationType = this.imagesInsertList[i].orientationType;
                }
                this.imagesInsertList[i].imageViewType = this.osiosearFactory.imagesDataTemp.imageViewType;
            }
            if (this.router.url.includes('/OSIHRSUM')){
                this.imagesInsertList[i].imageObjectType = this.osiosearFactory.imagesDataTemp.imageObjectType;
                this.imagesInsertList[i].imageObjectId = this.osiosearFactory.imagesDataTemp.imageObjectId;
                this.imagesInsertList[i].imageObjectSeq = this.osiosearFactory.imagesDataTemp.imageObjectSeq;
                if (this.imagesInsertList[i].orientationType) {
                    this.imagesInsertList[i].orientationType = this.imagesInsertList[i].orientationType;
                } else {
                    this.imagesInsertList[i].orientationType = this.imagesInsertList[i].orientationType;
                }
                this.imagesInsertList[i].imageViewType = this.osiosearFactory.imagesDataTemp.imageViewType;

            }
            if (this.dialog.data.modelName === 'OIDSTGID') {
                this.imagesInsertList[i].imageObjectType = this.dialog.data.objType;
                this.imagesInsertList[i].imageObjectId = this.dialog.data.stgId;
                this.imagesInsertList[i].imageObjectSeq = this.dialog.data.identifierSeq;
                if (this.imagesModel.orientationType) {
                    this.imagesInsertList[i].orientationType = this.dialog.data.orientationType;
                }
                this.imagesInsertList[i].imageViewType = this.dialog.data.imageType;

            }
                if(this.PersonSearchDialog.includes(this.router.url)){
                this.imagesInsertList[i].imageObjectType = this.osipsearFactory.imagesDataTemp.imageObjectType;
                this.imagesInsertList[i].imageObjectId = this.osipsearFactory.imagesDataTemp.imageObjectId;
                this.imagesInsertList[i].imageObjectSeq = this.osipsearFactory.imagesDataTemp.imageObjectSeq;
                if (this.osipsearFactory.imagesDataTemp.orientationType) {
                    this.imagesInsertList[i].orientationType = this.osipsearFactory.imagesDataTemp.orientationType;
                }
                this.imagesInsertList[i].imageViewType = this.osipsearFactory.imagesDataTemp.imageViewType;
            }
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

        if (this.router.url.includes('/OIDPIDEN') && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_BKG' ||
        this.router.url.includes('/OSIHRSUM')||
        this.router.url.includes('/OIDPIDEN') && this.osiosearFactory.imagesDataTemp.imageObjectType === 'OFF_IDM' ||
        this.router.url.includes('/OIDOICUS') ||
        this.router.url.includes('/OUMPERSO') ||
        this.router.url.includes('/OSIPSEAR') ||
        this.router.url.includes('/OIDVIRES') ||
        this.router.url.includes('/OIDVISIT')) {
            if (!validMark.valid && this.imagesData.length > 0) {
                this.show('oiuimage.pleasemark');
                return;
            }
        }
        if (this.imagesUpdateList.length > 0) {
            for (let i = 0; i < this.imagesUpdateList.length; i++) {
                let element = this.imagesUpdateList[i];
                let imgString = element['imageFull'];
                let size = new Blob([imgString]).size;
                // if(size > 1900000){
                //     this.show(this.translateService.translate('oiuimage.largeimage'), 'warn');
                //     return;
                // }

                if (!element.orientationType && !this.dialog.data.propertyContainerId) {
                    this.show(this.translateService.translate('oiuimage.imagetypemust'), 'warn');
                    return;
                }
                element.activeFlag = element.activeFlag ? 'Y' : 'N';
                //element.captureDate = DateFormat.parse(element.captureDate + ''.split(' ')[0]);
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
                const date = element.captureDate;
                const time = TimeFormat.format(element.captureDate);
                const timedateN = TimeFormat.parse(time, date);
                element.captureDate = timedateN;
                delete element['imageFull'];
                delete element['imageThumbnail'];
            });
            this.imagesCommitModel.deleteList = this.imagesDeleteList;
        }

        formData.append('jsonData', JSON.stringify(this.imagesCommitModel));
        // console.log(files)
        insertFiles.forEach((file) => { formData.append('insertImages', file); });
        updateFiles.forEach((file) => { formData.append('updateImages', file); });
        const imagesSaveData = this.oiuimageFactory.upload(formData);

        imagesSaveData.subscribe(data => {
            if (data === 1) {

                // if (this.router.url.includes('/OIDMPITM')){
                //     this.imagesModel = this.oidmpitmFactory.imagesDataTemp;
                // } else if (this.router.url.includes('/OIDRPITM')){
                //     this.imagesModel = this.oidrpitmFactory.imagesDataTemp;
                // } else if (this.router.url.includes('/OIDPIDEN') || this.router.url.includes('/OSIHRSUM')){
                //     this.imagesModel = this.osiosearFactory.imagesDataTemp;
                // } else if (this.router.url.includes('/OIIPTRAN')){
                //     this.imagesModel = this.oiiptranFactory.imagesDataTemp;
                // } else if (this.router.url.includes('/OIDOICUS')){
                //     this.imagesModel = this.ocuoicinFactory.imagesDataTemp;
                // } else if (this.router.url.includes('/OUMPERSO')){
                //     this.imagesModel = this.oumpersoFactory.imagesDataTemp;
                // } else if (this.router.url.includes('/OSIPSEAR')){
                //     this.imagesModel = this.osipsearFactory.imagesDataTemp;
                // } else if (this.router.url.includes('/OIDVIRES')){
                //     this.imagesModel = this.oidviresFactory.imagesDataTemp;
                // } else if (this.router.url.includes('/OIDVISIT')){
                //     this.imagesModel = this.oidvisitFactory.imagesDataTemp;
                // }else if(this.PersonSearchDialog.includes(this.router.url)){
                //     this.imagesModel = this.osipsearFactory.imagesDataTemp;
                // }


                // if (this.imagesCommitModel.insertList.length > 0 || this.imagesCommitModel.deleteList.length > 0) {
                //     this.imageOriginalCommitbean.insertList = [];
                //     this.imageOriginalCommitbean.updateList = [];
                //     this.imageOriginalCommitbean.deleteList = [];
                //     this.imagesCommitModel.insertList.forEach(ele => {
                //         const imageOriginal = new ImageOriginals();
                //         imageOriginal.imageId = ele.imageId;
                //         imageOriginal.imageOriginals = ele.imageThumbnail,
                //         imageOriginal.imageFull = '';
                //         this.imageOriginalCommitbean.updateList.push(imageOriginal);
                //     });
                //     this.imagesCommitModel.deleteList.forEach(ele => {
                //         const imageOriginal = new ImageOriginals();
                //         imageOriginal.imageId = ele.imageId;
                //         imageOriginal.imageFull = '';
                //         this.imageOriginalCommitbean.deleteList.push(imageOriginal);
                //     });
                //     this.oiuimageFactory.imageOriginalsUpdateImageOriginals(this.imageOriginalCommitbean)
                //         .subscribe(originalData => {

                //             if (originalData === 1 && 
                //                !this.PersonSearchDialog.includes(this.router.url)
                //                 ){
                //                 if (this.vHeaderBlockModel) {
                //                     this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                //                 }
                //                 this.show('common.addupdateremoverecordsuccess', 'success');
                //                 this.oiuimageexecuteQuery();
                //             } 
                //             else if (originalData === 1 && 
                //                 this.PersonSearchDialog.includes(this.router.url)
                //                 ){
                //                 this.show('common.addupdateremoverecordsuccess', 'success');
                //                 this.oiuimageexecuteQuery();
                //             }
                //             else {
                //                 this.show('common.addupdateremoverecordfailed', 'warn');
                //                 return false;
                //             }
                //         });
                // } 
                // else {
                //     this.show('common.addupdateremoverecordsuccess', 'success');
                //     this.oiuimageexecuteQuery();
                // }
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.oiuimageexecuteQuery();
            } 
            else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.oiuimageexecuteQuery();
            }
        });
    }


    lovEnableFun() {
        if(this.router.url.includes('/OIDPIDEN') && this.imagesModel.imageObjectType === 'OFF_BKG'&&  this.imagesData.length > 0){
             this.addprop=true;
         }

    }


    oiuimageSaveimagepropertiesForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.imagepropertiesInsertList = event.added;
        this.imagepropertiesUpdatetList = event.updated;
        this.imagepropertiesDeleteList = event.removed;
        this.imagepropertiesCommitModel.insertList = [];
        this.imagepropertiesCommitModel.updateList = [];
        this.imagepropertiesCommitModel.deleteList = [];
        if (event.added.length > 0) {
            const validation = { isValid: true };
            event.added.forEach(element => {
                if (!element.property) {
                    this.show('oiuimage.nochangestosave', 'warn');
                    validation.isValid = false;
                }
            });
            if (!validation.isValid) {
                return;
            }
        }
        if (this.imagepropertiesInsertList.length > 0) {
            for (let i = 0; i < this.imagepropertiesInsertList.length; i++) {
                if (this.imagesModel.imageId) {
                    this.imagepropertiesInsertList[i].imageId = this.imagesModel.imageId;
                    this.imagepropertiesInsertList[i].createDatetime = DateFormat.getDate();
                    this.imagepropertiesInsertList[i].modifyDatetime = DateFormat.getDate();
                }

            }
            this.imagepropertiesCommitModel.insertList = this.imagepropertiesInsertList;
        }
        if (this.imagepropertiesUpdatetList.length > 0) {
            for (let i = 0; i < this.imagepropertiesUpdatetList.length; i++) {
            }
            this.imagepropertiesCommitModel.updateList = this.imagepropertiesUpdatetList;
        }



        if (this.imagepropertiesDeleteList.length > 0) {
            for (let i = 0; i < this.imagepropertiesDeleteList.length; i++) {
            }
            this.imagepropertiesCommitModel.deleteList = this.imagepropertiesDeleteList;
        }
        const imagepropertiesSaveData = this.oiuimageFactory.imagePropertiesCommit(this.imagepropertiesCommitModel);
        imagepropertiesSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.imagepropertiesExecuteQuery();
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.imagepropertiesExecuteQuery();
            }
        });
    }
    onImagePropertiesGridInsert = () => {
        for (let i = 0; i < this.imagepropertiesData.length; i++) {
            if (!this.imagepropertiesData[i].property) {
                this.show('oiuimage.recordmustbe', 'warn');
                return;
            }
        }
        return {};
    }
    canActiveFlagEdit = (data: any, index: number, field: string) => {
        if (field === 'activeFlag') {
            const validUrl = ['/OIDPIDEN', '/OSIHRSUM', '/OIDRPITM', '/OIIPTRAN', '/OIDMPITM', '/OIDOICUS', '/OUMPERSO', '/OSIPSEAR', '/OIDVIRES', '/OIDVISIT','/OIVCTMNG'];
            if (validUrl.includes(this.router.url) && data && data.createDatetime && !data.activeFlag) {
                return true;
            }
        } else {
            const validUrl = ['/OIDPIDEN', '/OSIHRSUM', '/OIDOICUS', '/OUMPERSO', '/OSIPSEAR', '/OIDVIRES', '/OIDVISIT'];
            //Below code is added for jira issue wise
            var stringUrl = this.router.url;
            if (stringUrl.includes('?')) {
                const index = stringUrl.indexOf('?');
                stringUrl = stringUrl.substring(0, index);
            }
            if (validUrl.includes(stringUrl)) {
                return data.createDatetime ? false : true;
            }
            if (this.PersonSearchDialog.includes(stringUrl)) {
                return data.createDatetime ? false : true;
            }
        }
        return false;
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
    onImgGridClear = () => {
        this.image = null;
        this.imagesModel.imageFlag=null;
        return true;
    }


    get importButtondisabledCase() {
        if (!this.imagesModel.imageFlag || this.imagesModel.createDatetime) {            
              return true;
        }       
        return false;
  }
   
  get exportButtonCase() {
    if (this.imagesModel.createDatetime) {            
          return false;
    }       
    return true;
}
  
}

