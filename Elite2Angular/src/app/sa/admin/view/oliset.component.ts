import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Images } from "@commonbeans/Images";
import { TranslateService } from "@common/translate/translate.service";
import { OlisetService } from "../service/oliset.service";
import { UserSessionManager } from "@core/classes/userSessionManager";
import { OmsModules } from "../../usersystemsecurity/beans/OmsModules";
import { SystemLable } from "@sa/admin/beans/SystemLable";
import { SystemLableCommitBean } from "@sa/admin/beans/SystemLableCommitBean";
import { ModulePrivileges } from "../../usersystemsecurity/beans/ModulePrivileges";
import { RoleInaccessibleRefCodes } from "@sa/admin/beans/RoleInaccessibleRefCodes";
import { RoleInaccessibleRefCodesCommitBean } from "@sa/admin/beans/RoleInaccessibleRefCodesCommitBean";
import { DateFormat } from "@core/ui-components/datepicker/dateFormat";
import { OmsModulesCommitBean } from "@sa/admin/beans/OmsModulesCommitBean";
// import required bean declarations

@Component({
  selector: "app-oumsyslab",
  templateUrl: "./oliset.component.html",
})
export class OlisetComponent implements OnInit {
  selectedImageIndex: number;
  selectedTabIndex: number;
  modprivModel: SystemLable = new SystemLable();
  target: any;
  loginImage: string;
  loginBackground: string;
  headerimage: string;
  actionName: string;
  @ViewChild("grid", { static: true }) grid: any;
  lovModel: any[];
  msgs: any[] = [];
  msglist = [];
  loginSavedisabled: boolean = true;
  headSavedisabled: boolean = true;
  loginBgSavedisabled: boolean = true;
  LoginId: number;
  headerId: number;
  loginBackgroundId: number;
  imagesData: Images[] = [];
  type = "error";
  message = " Invalid.";
  tableIndex = 0;
  imageoriginalsData: Images[] = [];
  imagesModel: Images = new Images();
  imagesHModel: Images = new Images();
  imagesLoginBgHModel: Images = new Images();
  inactiveImageModel: Images = new Images();
  imagesExecuteModel: Images = new Images();
  nameOfLovPage: string;
  LginTitle: any;
  headerTitle: any;
  listToCompare: any[] = [];
  rleinarcData: OmsModules[] = [];
  rleinarcDataTemp: OmsModules[] = [];
  rleinarcModel: OmsModules = new OmsModules();
  rleinarcIndex: number;
  rleinarcInsertList: OmsModules[] = [];
  rleinarcUpdatetList: OmsModules[] = [];
  rleinarcDeleteList: OmsModules[] = [];
  modprivData: SystemLable[] = [];
  modprivHeaderData: SystemLable[] = [];
  cancelbutton: boolean;
  importButtondisabled: boolean;
  updateLabelData: SystemLable[] = [];
  LabelCommitBean: SystemLableCommitBean = new SystemLableCommitBean();
  modprivDataTemp: ModulePrivileges[] = [];
  modprivIndex: number;
  modprivInsertList: ModulePrivileges[] = [];
  modprivUpdatetList: ModulePrivileges[] = [];
  modprivDeleteList: ModulePrivileges[] = [];
  rleinarc1Index: number;
  systemlabelColumnDef: any[];
  systemHlabelColumnDef: any[];
  modPrivColumnDef: any[];
  rleInarcReadOnly: boolean;
  modPrivReadOnly: boolean;
  rleInarc1ReadOnly: boolean;
  rleinarcCommitModel: OmsModulesCommitBean = new OmsModulesCommitBean();
  rleinarcRircCommitModel: RoleInaccessibleRefCodesCommitBean =
    new RoleInaccessibleRefCodesCommitBean();
  rleinarcRircModel: RoleInaccessibleRefCodes = new RoleInaccessibleRefCodes();
  rleinarcRircData: RoleInaccessibleRefCodes[] = [];
  rleinarcRircDataTemp: RoleInaccessibleRefCodes[] = [];
  rleinarcRircInsertList: RoleInaccessibleRefCodes[] = [];
  rleinarcRircUpdatetList: RoleInaccessibleRefCodes[] = [];
  rleinarcRirc1DeleteList: RoleInaccessibleRefCodes[] = [];
  modulesColumnDef: any[];
  importLogoColumnDef: any[];
  profileBtnDisable: boolean;
  labelBtnDisable: boolean;
  importLogoData: Images[] = [];
  modulesIndex: number;
  rleinarcRircEnableDelete: boolean;
  doaminTitle = { code: this.translateService.translate("oumresta.domain") };
  moduleTitle = {
    code: this.translateService.translate("oumresta.moduleName"),
    newCode: this.translateService.translate("common.description"),
  };
  codeTitles = {
    code: this.translateService.translate("common.code"),
    description: this.translateService.translate("common.description"),
  };
  constructor(
    private oumrestaFactory: OlisetService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager
  ) {
    this.systemlabelColumnDef = [];
    this.modPrivColumnDef = [];
    this.modulesColumnDef = [];
  }
  ngOnInit() {
    this.systemlabelColumnDef = [
      //{
      // fieldName: this.translateService.translate('oumsylab.labelId'), field: 'labelId', editable: true, width: 150,
      // datatype: 'number', link: 'oumresta/cgfkRleInarc1DomainRecordGroup', titles: this.doaminTitle, cellEditable: this.canAlertEdit
      //},
      {
        fieldName: this.translateService.translate("oumsylab.moduleName"),
        field: "moduleName",
        editable: true,
        width: 150,
        datatype: "text",
        titles: this.doaminTitle,
      },
      {
        fieldName: this.translateService.translate("oumsylab.msgKey"),
        field: "msgKey",
        editable: true,
        width: 150,
        datatype: "text",
        titles: this.doaminTitle,
      },
      {
        fieldName: this.translateService.translate("oumsylab.msgValue"),
        field: "msgValue",
        editable: true,
        width: 150,
        datatype: "text",
        titles: this.doaminTitle,
        uppercase: "false",
      },
      {
        fieldName: this.translateService.translate("oumsylab.msgType"),
        field: "msgType",
        editable: true,
        width: 150,
        datatype: "text",
        uppercase: "false",
      },
    ];

    this.systemHlabelColumnDef = [
      //{
      //fieldName: this.translateService.translate('oumsylab.labelId'), field: 'labelId', editable: true, width: 150,
      //datatype: 'number', link: 'oumresta/cgfkRleInarc1DomainRecordGroup', titles: this.doaminTitle, cellEditable: this.canAlertEdit
      //},
      {
        fieldName: this.translateService.translate("oumsylab.moduleName"),
        field: "moduleName",
        editable: true,
        width: 150,
        datatype: "text",
        titles: this.doaminTitle,
      },
      {
        fieldName: this.translateService.translate("oumsylab.msgKey"),
        field: "msgKey",
        editable: true,
        width: 150,
        datatype: "text",
        titles: this.doaminTitle,
      },
      {
        fieldName: this.translateService.translate("oumsylab.msgValue"),
        field: "msgValue",
        editable: true,
        width: 150,
        datatype: "text",
        titles: this.doaminTitle,
        uppercase: "false",
        tooltip: true,
      },
      {
        fieldName: this.translateService.translate("oumsylab.msgType"),
        field: "msgType",
        editable: true,
        width: 150,
        datatype: "text",
        uppercase: "false",
      },
    ];
    this.imagesExecuteQuery();

    this.loginLabelExecuteQuery();

    this.headerLabelExecuteQuery();

    //      this.executeLogoImage();
  }

  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }

  get BASE64IMAGE(): string {
    return "data:image/JPEG;base64,";
  }

  get BASE64PNG(): string {
    return "data:image/PNG;base64,";
  }

  loginLabelExecuteQuery() {
    this.modprivModel.moduleName = "LOGIN";
    const serviceObj = this.oumrestaFactory.loginLabelExecuteQuery(
      this.modprivModel
    );
    serviceObj.subscribe((data) => {
      if (data.length === 0) {
        this.modprivData = [];
        this.modprivHeaderData = [];
      } else {
        this.modprivData = data;
        this.modulesIndex = 0;
      }
    });
  }

  headerLabelExecuteQuery() {
    this.modprivModel.moduleName = "LOGIN";
    const serviceObj = this.oumrestaFactory.headerLabelExecuteQuery(
      this.modprivModel
    );
    serviceObj.subscribe((data) => {
      if (data.length === 0) {
        this.modprivHeaderData = [];
      } else {
        this.modprivHeaderData = data;
        this.modulesIndex = 0;
      }
    });
  }

  updatePropertyCommit(event) {
    this.updateLabelData = event.updated;
    this.LabelCommitBean.updateList = [];
    if (this.updateLabelData.length > 0) {
    }
    this.LabelCommitBean.updateList = this.updateLabelData;
    const serviceObj = this.oumrestaFactory.updateSystemlabel(
      this.LabelCommitBean
    );

    serviceObj.subscribe((data) => {
      if (data == 1) {
        this.type = "success";
        this.message = this.translateService.translate(
          "common.addupdateremoverecordsuccess"
        );
        this.show();
        this.loginLabelExecuteQuery();
        this.headerLabelExecuteQuery();
      }
    });
  }

  imagesExecuteQuery() {
    if (this.imagesExecuteModel.imageId) {
      this.imagesExecuteModel.activeFlag = "Y";
    } else {
      this.imagesExecuteModel.imageObjectId = 1;
      this.imagesExecuteModel.imageObjectType = "LOGO";
      this.imagesExecuteModel.activeFlag = "Y";
    }
    const service = this.oumrestaFactory.imagesExecuteQuery(
      this.imagesExecuteModel
    );
    service.subscribe((observer) => {
      if (observer.length === 0) {
        this.imageoriginalsData = [];
      } else {
        this.imageoriginalsData = observer;
        //this.cancelbutton = true;
        for (let i = 0; i < this.imageoriginalsData.length; i++) {
          if (this.imageoriginalsData[i].imageObjectSeq == 1 && this.imageoriginalsData[i].imageThumbnail) {
            this.loginImage = this.BASE64IMAGE + this.imageoriginalsData[i].imageThumbnail;
            this.imageoriginalsData[i]["imageFull"] = this.loginImage;
            this.LoginId = this.imageoriginalsData[i].imageId;
          }
          if (this.imageoriginalsData[i].imageObjectSeq == 2 && this.imageoriginalsData[i].imageThumbnail) {
            this.headerimage = this.BASE64IMAGE + this.imageoriginalsData[i].imageThumbnail;
            this.imageoriginalsData[i]["imageFull"] = this.headerimage;
            this.headerId = this.imageoriginalsData[i].imageId;
          }
          if (this.imageoriginalsData[i].imageObjectSeq == 3 && this.imageoriginalsData[i].imageThumbnail) {
            this.loginBackground = this.BASE64IMAGE + this.imageoriginalsData[i].imageThumbnail;
            this.imageoriginalsData[i]["imageFull"] = this.loginBackground;
            this.loginBackgroundId = this.imageoriginalsData[i].imageId;
          }
        }
      }
    });
  }

  OnImageImport(fileImport) {
    this.cancelbutton = false;
    fileImport.value = "";
    fileImport.click();
    this.imagesModel.imageObjectType = "LOGO";
    this.imagesModel.imageViewType = "LOGO";
    this.imagesModel.imageObjectId = 1;
    this.imagesModel.imageObjectSeq = 1;
    this.imagesModel.activeFlag = "Y";
    this.imagesModel.captureDate = DateFormat.getDate();
    this.imagesModel.previousImageId = this.LoginId;
    if (!this.imagesModel.imageId) {
      this.getNextImageId();
    }
  }

  OnImageHImport(fileHImport) {
    this.cancelbutton = false;
    fileHImport.value = "";
    fileHImport.click();
    this.imagesHModel.imageObjectType = "LOGO";
    this.imagesHModel.imageViewType = "LOGO";
    this.imagesHModel.imageObjectId = 1;
    this.imagesHModel.imageObjectSeq = 2;
    this.imagesHModel.activeFlag = "Y";
    this.imagesHModel.captureDate = DateFormat.getDate();
    this.imagesHModel.previousImageId = this.headerId;
    if (!this.imagesHModel.imageId) {
      this.getNextHImageId();
    }
  }
  OnLoginBgImport(fileLoginBgImport) {
    this.cancelbutton = false;
    fileLoginBgImport.value = "";
    fileLoginBgImport.click();
    this.imagesLoginBgHModel.imageObjectType = "LOGO";
    this.imagesLoginBgHModel.imageViewType = "LOGO";
    this.imagesLoginBgHModel.imageObjectId = 1;
    this.imagesLoginBgHModel.imageObjectSeq = 3;
    this.imagesLoginBgHModel.activeFlag = "Y";
    this.imagesLoginBgHModel.captureDate = DateFormat.getDate();
    this.imagesLoginBgHModel.previousImageId = this.loginBackgroundId;
    if (!this.imagesLoginBgHModel.imageId) {
      this.getLoginBgImageId();
    }
  }
  onLoginBgHImport(event) {
    if (event && event.target && event.target.files && event.target.files[0]){
      const URL = window.URL || window.webkitURL;
      const ImgDimen = new Image();
      const filesToUpload = (event.target.files);
      ImgDimen.src = URL.createObjectURL(filesToUpload[0]);
      ImgDimen.onload = (e: any) => {
        const height = e.target.height;
        const width = e.target.width;
        const ratio = this.getAspectRatio(width, height);
        if(height === width || ratio == '4:3') {
          this.type = "warn";
          this.message = this.translateService.translate("oliset.requiedSizeNotMatched");
          this.show();
          this.loginBgSavedisabled = true;
          return;
        }
      }
    }
    if (event && event.target && event.target.files && event.target.files[0]) {
      const fileLength = event.target.files[0].size;
      if (fileLength > 0x7fffffff) {
        this.type = "warn";
        this.message = "File to Big" + event.target.files[0].name;
        this.show();
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (events) => {
        // called once readAsDataURL is completed
        this.target = events.currentTarget;
        this.loginBackground = this.target.result; // events.currentTarget.result;
        this.imagesLoginBgHModel["imageFull"] = this.loginBackground;
      };
    }
    if (this.extensionImage(event.target.files[0].name)) {
        if(event.target.files[0].name.includes('.png') || event.target.files[0].name.includes('.jpeg') || event.target.files[0].name.includes('.bmp') || event.target.files[0].name.includes('.tiff')){
            this.type = "warn";
            this.message = this.translateService.translate("oliset.checkjpg");
            this.show();
            this.loginBgSavedisabled = true;
            return;
        }
        
    }
    this.loginBgSavedisabled = false;
  }

  getNextImageId() {
    const imageIdService = this.oumrestaFactory.getNextImageId();
    imageIdService.subscribe((imageId) => {
      if (imageId && typeof imageId !== "object") {
        this.imagesModel.imageId = imageId;
      }
    });
  }
  getNextHImageId() {
    const imageIdService = this.oumrestaFactory.getNextImageId();
    imageIdService.subscribe((imageId) => {
      if (imageId && typeof imageId !== "object") {
        this.imagesHModel.imageId = imageId;
      }
    });
  }
  getLoginBgImageId() {
    const imageIdService = this.oumrestaFactory.getNextImageId();
    imageIdService.subscribe((imageId) => {
      if (imageId && typeof imageId !== "object") {
        this.imagesLoginBgHModel.imageId = imageId;
      }
    });
  }
  onLoginImport(event) {
    if (event && event.target && event.target.files && event.target.files[0]){
      const URL = window.URL || window.webkitURL;
      const ImgDimen = new Image();
      const filesToUpload = (event.target.files);
      ImgDimen.src = URL.createObjectURL(filesToUpload[0]);
      ImgDimen.onload = (e: any) => {
        const height = e.target.height;
        const width = e.target.width;
        if(!(height === width)) {
          this.type = "warn";
          this.message = this.translateService.translate("oliset.requiedSizeNotMatched");
          this.show();
          this.loginSavedisabled = true;
          return;
        }
      }
    }
    if (event && event.target && event.target.files && event.target.files[0]) {
      const fileLength = event.target.files[0].size;
      if (fileLength > 0x7fffffff) {
        this.type = "warn";
        this.message = "File to Big" + event.target.files[0].name;
        this.show();
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (events) => {
        // called once readAsDataURL is completed
        this.target = events.currentTarget;
        this.loginImage = this.target.result; // events.currentTarget.result;
        this.imagesModel["imageFull"] = this.loginImage;
      };
    }
    if (this.extensionImage(event.target.files[0].name)) {
        if(event.target.files[0].name.includes('.jpg') || event.target.files[0].name.includes('.jpeg') || event.target.files[0].name.includes('.bmp') || event.target.files[0].name.includes('.tiff')){
            this.type = "warn";
            this.message = this.translateService.translate("oliset.checkpng");
            this.show();
            this.loginSavedisabled = true;
            return;
        }
    }
    this.loginSavedisabled = false;
  }
  onHeaderImport(event) {
    if (event && event.target && event.target.files && event.target.files[0]){
      const URL = window.URL || window.webkitURL;
      const ImgDimen = new Image();
      const filesToUpload = (event.target.files);
      ImgDimen.src = URL.createObjectURL(filesToUpload[0]);
      ImgDimen.onload = (e: any) => {
        const height = e.target.height;
        const width = e.target.width;
        if((width > 176) || (height > 44)) {
          this.type = "warn";
          this.message = this.translateService.translate("oliset.requiedSizeNotMatched");
          this.show();
          this.headSavedisabled = true;
          return false;
        }
      }
    }
    if (event && event.target && event.target.files && event.target.files[0]) {
      const fileLength = event.target.files[0].size;
      if (fileLength > 0x7fffffff) {
        this.type = "warn";
        this.message = "File to Big" + event.target.files[0].name;
        this.show();
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (events) => {
        // called once readAsDataURL is completed
        this.target = events.currentTarget;
        this.headerimage = this.target.result; // events.currentTarget.result;
        this.imagesHModel["imageFull"] = this.headerimage;
      };
    }
    if (this.extensionImage(event.target.files[0].name)) {
        if(event.target.files[0].name.includes('.jpg') || event.target.files[0].name.includes('.jpeg') || event.target.files[0].name.includes('.bmp') || event.target.files[0].name.includes('.tiff')){
            this.type = "warn";
            this.message = this.translateService.translate("oliset.checkpng");
            this.show();
            this.headSavedisabled = true;
            return;
        }
    }
    this.headSavedisabled = false;
  }
  insertContainerImg() {
    if (this.imagesModel["imageFull"]) {
      if (
        String(this.imagesModel["imageFull"])
          .toLowerCase()
          .startsWith(this.BASE64IMAGE.toLowerCase())
      ) {
        this.imagesModel.imageThumbnail = this.imagesModel["imageFull"].slice(
          this.BASE64IMAGE.length,
          this.imagesModel["imageFull"].length
        );
      } else {
        this.imagesModel.imageThumbnail = this.imagesModel["imageFull"].slice(
          this.BASE64PNG.length,
          this.imagesModel["imageFull"].length.length
        );
      }
    }
    const service = this.oumrestaFactory.insertContainerImg(this.imagesModel);
    service.subscribe((observer) => {
      if (observer == 1 || observer == 10) {
        this.type = "success";
        this.message = this.translateService.translate("oliset.logosuccess");
        this.show();
        this.loginSavedisabled = true;
      }
    });
  }

  extensionImage(fileName) {
    var lastDotPosition = fileName.lastIndexOf(".");
    var documentType = fileName.substr(lastDotPosition, fileName.length);
    return documentType;
  }
  getAspectRatio(width, height) {
    var ratio = width / height;
    return ( Math.abs( ratio - 4 / 3 ) < Math.abs( ratio - 16 / 9 ) ) ? '4:3' : '16:9';
  }
  insertContainerHImg() {
    if (this.imagesHModel["imageFull"]) {
      if (
        String(this.imagesHModel["imageFull"])
          .toLowerCase()
          .startsWith(this.BASE64IMAGE.toLowerCase())
      ) {
        this.imagesHModel.imageThumbnail = this.imagesHModel["imageFull"].slice(
          this.BASE64IMAGE.length,
          this.imagesHModel["imageFull"].length
        );
      } else {
        this.imagesHModel.imageThumbnail = this.imagesHModel["imageFull"].slice(
          this.BASE64PNG.length,
          this.imagesHModel["imageFull"].length.length
        );
      }
    }
    const service = this.oumrestaFactory.insertContainerImg(this.imagesHModel);
    service.subscribe((observer) => {
      if (observer == 1 || observer == 10) {
        this.type = "success";
        this.message = this.translateService.translate("oliset.logosuccess");
        this.show();
        this.headSavedisabled = true;
      }
    });
  }
  insertContainerBgImg() {
    if (this.imagesLoginBgHModel["imageFull"]) {
      if (
        String(this.imagesLoginBgHModel["imageFull"])
          .toLowerCase()
          .startsWith(this.BASE64IMAGE.toLowerCase())
      ) {
        this.imagesLoginBgHModel.imageThumbnail = this.imagesLoginBgHModel["imageFull"].slice(
          this.BASE64IMAGE.length,
          this.imagesLoginBgHModel["imageFull"].length
        );
      } else {
        this.imagesLoginBgHModel.imageThumbnail = this.imagesLoginBgHModel["imageFull"].slice(
          this.BASE64PNG.length,
          this.imagesLoginBgHModel["imageFull"].length.length
        );
      }
    }
    const service = this.oumrestaFactory.insertContainerImg(this.imagesLoginBgHModel);
    service.subscribe((observer) => {
      if (observer == 1 || observer == 10) {
        this.type = "success";
        this.message = this.translateService.translate("oliset.logosuccess");
        this.show();
        this.loginBgSavedisabled = true;
      }
    });
  }
}
