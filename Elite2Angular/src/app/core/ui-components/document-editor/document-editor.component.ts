import { UserSessionManager } from '@core/classes/userSessionManager';
import { OumdtempService } from '@sa/admin/integratedwordprocessing/service/oumdtemp.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Fileupload } from '@common/beans/Fileupload';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { HttpService } from '@core/service/http.service';
import { CustomToolbarItemModel, DocumentEditorContainerComponent, ToolbarService, DocumentEditorSettingsModel, DocumentEditorKeyDownEventArgs } from '@syncfusion/ej2-angular-documenteditor';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { TitleBar } from './title-bar';
import { DocumentService } from './document.service';
import { SelectEventArgs } from '@syncfusion/ej2-lists';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { DataManager, Query } from "@syncfusion/ej2-data";
import { TooltipComponent, TooltipEventArgs } from '@syncfusion/ej2-angular-popups';
import { UiCustomizeService } from '@core/service/ui-customize.service';
import * as moment from 'moment';
import { TranslateService } from '@common/translate/translate.service';
import { OumbmarkService } from '@sa/admin/integratedwordprocessing/service/oumbmark.service';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SaveConfirmationComponent } from '../save-confirmation/save-confirmation.component';


var docEditorClassRef;

@Component({
  selector: 's4-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToolbarService]
})
export class DocEditorComponent implements OnInit, OnDestroy {
  
  listPlaceholder = 'Filter Bookmarks'
  isParentListActive:boolean = true;
  defaultSelectedParentObj = {
    childData : [],
    index : 0,
    id: null
  };
  screenID: any;
  actionMode: any;
  templateName: any;
  titleBar: any;
  msgs: any[];
  bookmarksData : { [key: string]: Object }[] = [];
  showBookmarks = false;
  bookmarksDataOrig: any[] = [];
  currentUser: string;
  isRestrictEditing: boolean;
  autoSaveTime: Date;
  isDocumentSaved:boolean = true;
  fileIntervalId: any;
  templateIntervalId: any;
  isPaste: boolean;
  saveintervalTime:number = 5000; // Autosaves files every 5000 ms DEFAULT
  storedInfo: any;
  continueWithoutSaving:boolean = false;
    public settings: DocumentEditorSettingsModel = { optimizeSfdt: false }; 
  languageId: any;
  constructor(private http: HttpService, private httpCli: HttpClient, public translateService: TranslateService,
    private eoffenderService: EoffenderService, private offenderSearchService: OffenderSearchService,
    private activatedRoute: ActivatedRoute, private documentService: DocumentService,
    private oumdtempFactory: OumdtempService, private sessionManager: UserSessionManager,
    private uiCustomizeService: UiCustomizeService, private oumbmarkService: OumbmarkService,
    public oumsysetService: OumsysetService, public SaveConfirmationDialog: MatDialog) {
    this.storedInfo = JSON.parse(localStorage.getItem('storedInfo'));
    localStorage.removeItem('storedInfo');
  }

  @ViewChild('listview')
  listObj: ListViewComponent;
  @ViewChild('textbox') textboxEle: any;

  @ViewChild('tooltip')
  public tooltipControl: TooltipComponent;
  @ViewChild('documenteditor_default', { static: true }) container: DocumentEditorContainerComponent;
  public saveBtn: CustomToolbarItemModel = {
    prefixIcon: "e-de-ctnr-lock",
    tooltipText: "Save File",
    text: "Save File",
    id: "save"
  };
  public printBtn: CustomToolbarItemModel = {
    prefixIcon: "e-de-ctnr-print",
    tooltipText: "Print File",
    text: "Print File",
    id: "print"
  };
  docURI: string;

  public items = [this.saveBtn, this.printBtn, 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'Comments', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'Separator', 'Find', 'Separator', 'LocalClipboard'];
  public fields: object = { tooltip: "category", groupBy: 'category' };
  public showPane: boolean;

  enableFormFields: boolean = false;
  
  ngOnInit(): void {
    this.getEliteDocInfo();
    if (this.translateService.translate('oumdtemp.autosavetime')
      && parseInt(this.translateService.translate('oumdtemp.autosavetime')) > 0) {
      this.saveintervalTime = parseInt(this.translateService.translate('oumdtemp.autosavetime'));
    }  
    // process the ui conf -- start
    this.showPane = this.uiCustomizeService.docConfig.showPropPane;
    if(this.uiCustomizeService.docConfig.showRestrictEditing) {
      this.items.push('RestrictEditing');
    }
    // process the ui conf -- end
    this.currentUser = this.sessionManager.getId();
    this.oumbmarkexecuteQuery();
    if (document.getElementsByTagName('mat-sidenav')[0]['style'].visibility === 'visible') {
      document.getElementsByClassName('s4-sidenav-button')[0].dispatchEvent(new Event('click'));
    }

    if (this.storedInfo) {
      this.screenID = this.storedInfo.currentScreen;
      this.actionMode = this.storedInfo.mode;
      this.languageId=this.storedInfo.languageId;

    }
    else {
      this.screenID = this.documentService.currentScreen;
      this.actionMode = this.documentService.mode;
      this.languageId=this.eoffenderService.languageId;
    }
    
    this.handleFormFields();

    if (this.actionMode == 'RESTRICT') {
      this.isRestrictEditing = true;
    }
    else {
      this.isRestrictEditing = false;
    }

    if (this.screenID === 'OUMDTEMP') {
      if (this.isRestrictEditing) {
        this.showBookmarks = false;
      }
      else {
        this.showBookmarks = true;
      }
      this.loadTemplate();
    }
    else if (this.actionMode === 'GENERATE') {
      this.showBookmarks = false;
      this.generateFile();
    }
    else {
      this.showBookmarks = false;
      this.loadFile();
    }
    docEditorClassRef = this;
    let href = window.location.href;
    window.history.pushState(null, null, href);
    // this fn is for handle the history back
    window.onpopstate = function (e) {
      let loc = window.location.href;
      let screen = loc.split('/#/')[1];
      if(docEditorClassRef && docEditorClassRef.continueWithoutSaving){
        if(screen == 'EDITDOC'){
          window.history.back();
        }
      }
      else if(docEditorClassRef && !docEditorClassRef.isDocumentSaved){
        window.history.pushState(null, null, href);
        docEditorClassRef.closeDoc()
      }
      else{
        if(screen == 'EDITDOC'){
          window.history.back();
        }
      }
    };

  }

  handleFormFields(){
    this.activatedRoute.data.subscribe((response: any) => {
      if (response && response.configData && response.configData.settingValue && JSON.parse(response.configData.settingValue).length > 0) {
        let rowData = JSON.parse(response.configData.settingValue)
        for (let i = 0; i < rowData.length; i++) {
          if (rowData[i].KEY_CODE == "ENABLE_FORM_FIELDS" && rowData[i].VALUE == "Y") {
            this.enableFormFields = true;
          }
        }
      }
    });
    if(this.enableFormFields && this.screenID == 'OUMDTEMP'){
      this.items.push('FormFields')
    }
  }

// this fn is for close tab or browser
  doBeforeUnload(e) {
    if (!this.isDocumentSaved) {
      return false;
    }
    return true;
  }

  getEliteDocInfo() {
    let addPayload = {
        settingProviderCode: "ELITE_DOC",
        settingType: "EliteDoc"
    };
    this.oumsysetService.loadJsonData(addPayload).subscribe((result) => {
        const rowData = JSON.parse(result.settingValue);
        if (rowData && rowData.length > 0) {
            for (let i = 0; i < rowData.length; i++) {
                if (rowData[i].KEY_CODE == "AUTOSAVE_TIME" && rowData[i].VALUE) {
                    this.saveintervalTime = parseInt(rowData[i].VALUE);
                }
            }
        }
    });
}

  onSelect(args: SelectEventArgs): void {
    let fieldName: any = args.data['bookmarkName'];
    this.insertField(fieldName);
  }

  insertField(fieldName: any): void {
    // let fileName: any = fieldName.replace(/\n/g, '').replace(/\r/g, '').replace(/\r\n/g, '');
    // let fieldCode: any = 'MERGEFIELD  ' + fileName + '  \\* MERGEFORMAT ';
    this.container.documentEditor.editor.insertText('{{' + fieldName + '}}');
    this.container.documentEditor.focusIn();
  }

  generateFile() {
    var file: any;
    this.documentService.isSyncDocument = true;
    this.documentService.generatedDocBlob.text().then(data => {
      file = data;
      this.container.documentEditor.open(data);
      let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
      this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true, this.screenID, this.enableFormFields);
      this.container.documentEditor.documentName = this.documentService.generatedDocName ? this.documentService.generatedDocName : 'tempDoc';
      // this.container.documentEditor.documentName = this.documentName + " " + this.firstName + " " + this.lastName;
      this.titleBar.updateDocumentTitle(this.actionMode);
    });
  }

  onCreate(): void {
    this.container.documentEditor.currentUser = this.currentUser;
    this.container.documentEditor.spellChecker.languageID =this.languageId;//LCID of "en-us";
    this.container.documentEditor.spellChecker.removeUnderline = false;
    this.container.documentEditor.spellChecker.allowSpellCheckAndSuggestion = true;
    this.container.documentEditor.spellChecker.enableOptimizedSpellCheck = true;

    this.container.setDefaultCharacterFormat({fontSize: 10});

    document.getElementById("listview")?.addEventListener("dragstart", function (event) {
      let title = (event.target as any).getAttribute('title');
      event.dataTransfer.setData("Text", (event.target as any).innerText);
      event.dataTransfer.setData("Title", title);
      (event.target as any).classList.add('de-drag-target');

    });

    this.container.documentEditor.element.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    this.container.documentEditor.element.addEventListener("drop", (e) => {
      var text = e.dataTransfer.getData('Text');
      let title = e.dataTransfer.getData('Title');
      let listObj = (document.getElementById("listview") as any).ej2_instances[0];
      if(!this.isParentListActive){
        text = listObj.curDSJSON.bookmarkName + '.' + text;
        title = listObj.curDSJSON.bookmarkName + '.' + title;
      }
      this.container.documentEditor.selection.select({ x: e.offsetX, y: e.offsetY, extend: false });
      this.insertField(title);
    });

    document.addEventListener("dragend", (event) => {
      if ((event.target as any).classList.contains('de-drag-target')) {
        (event.target as any).classList.remove('de-drag-target');
      }
    });
    
    var context = this;
    this.container.documentEditor.keyDown = (args: DocumentEditorKeyDownEventArgs): void => {
      var keyCode = args.event.which || args.event.keyCode;
      var isCtrlKey = (args.event.ctrlKey || args.event.metaKey) ? true : ((keyCode === 17) ? true : false);
     
      if (isCtrlKey && keyCode === 86) {
        
        if (context.templateIntervalId) {
          clearInterval(context.templateIntervalId);
        }
        if (context.fileIntervalId) {
          clearInterval(context.fileIntervalId);
        }
        context.isPaste = true;
      }
      if (isCtrlKey && keyCode === 83) {
        args.isHandled = true;
        args.event.preventDefault();
      }
  }

  }

  onDocumentChange(): void {
    this.isDocumentSaved = true;
    if (!isNullOrUndefined(this.titleBar)) {
      this.titleBar.updateDocumentTitle(this.screenID);
    }
    this.container.documentEditor.focusIn();
    if(this.isRestrictEditing){
      this.container.toolbar.enableItems(0, false);
    }
  }

  onContentChange(e?:any) {
    this.isDocumentSaved = false;
    if (!this.isRestrictEditing && this.isPaste && this.actionMode != 'GENERATE') {
      this.templateIntervalId = setInterval( () => {
        this.saveFile(true,false);
      }, this.saveintervalTime);
      this.isPaste = false;
    }
  }


  startAutoSaveForGeneratedDoc(){
    this.templateIntervalId = setInterval( () => {
      this.saveFile(true,false);
    }, this.saveintervalTime);
  }
  
  loadTemplate() {
    if (this.storedInfo) {
      this.getTemplateToProceed(this.storedInfo.event)
      return;
    }
    this.templateSendToEditor();
  }

  getTemplateToProceed(ev) {
    let templateId = ev.templateId;
    const documentStatus = this.oumdtempFactory.viewTemplate(templateId);
        documentStatus.subscribe(result => {
          this.documentService.templateDoc = result;
          this.documentService.templateName = ev.templateName;
          this.documentService.templateType = ev.objectType;
          this.documentService.templateId = templateId;
          this.templateSendToEditor();
        }, error => {
            console.log("error")
        });
  }

  templateSendToEditor() {
    let file = this.documentService.templateDoc;
    this.documentService.isSyncDocument = true;
    if (!file) {
      let data = "{\"sections\":[{\"blocks\":[{\"inlines\":[{\"text\":\"\"}]}]}]}";
      this.container.documentEditor.open(data);
      let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
      this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true, this.screenID, this.enableFormFields);
      this.container.documentEditor.documentName = this.documentService.templateName;
      this.titleBar.updateDocumentTitle(this.screenID);
    } else {
      file.text().then(data => {
        if (!data) {
          data = "{\"sections\":[{\"blocks\":[{\"inlines\":[{\"text\":\"\"}]}]}]}";
        } else {
          // Remove below if condition when converting to Non text based email templates
          if (this.documentService.templateType === 'EMAIL') {
            const textArr = [];
            const dataObjs = data.split('\r\n');
            dataObjs.forEach(obj => {
              if (obj) {
                textArr.push('{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{"bidi":false},"text":"' + obj + '"}]}');
              }
            });
            data = '{"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false},"blocks":[' + textArr + '],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"evenHeader":{},"evenFooter":{},"firstPageHeader":{},"firstPageFooter":{}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"#00000000","boldBidi":false,"italicBidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{},"bidi":false,"keepLinesTogether":false,"keepWithNext":false},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"compatibilityMode":"Word2013","styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{},"next":"Normal"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":12,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{}},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[]}';
          }
        }
        this.container.documentEditor.open(data);
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true, this.screenID, this.enableFormFields);
        this.container.documentEditor.documentName = this.documentService.templateName;
        this.titleBar.updateDocumentTitle(this.screenID);
        if (!this.isRestrictEditing) {
          this.templateIntervalId = setInterval(() => {
            this.saveFile(true,false);
          }, this.saveintervalTime);
        }
      });
    }
  }

  loadFile() {
    if (this.storedInfo) {
      this.getDocumentToProceed(this.storedInfo.event)
      return;
    }
    this.documentSendToEditor();
  }


  getDocumentToProceed(ev) {
    let documentId = ev.documentId;
    const documentStatus = this.eoffenderService.viewDocument(documentId);
    documentStatus.subscribe(result => {
      this.documentService.docName = ev.documentName;
      this.documentService.docType = ev.documentType;
      this.documentService.docStatus = ev.status;
      this.offenderSearchService.selectedOffender = this.storedInfo.selectedOffender;
      this.documentService.docObjectType = this.storedInfo.screen;
      this.documentService.templateList = this.storedInfo.templateList;

      this.documentService.templateDoc = result;
      this.documentService.templateName = ev.templateName;
      this.documentService.templateType = ev.objectType;
      this.documentService.templateId = documentId;
      this.documentService.docId = documentId;
      this.documentSendToEditor();
    }, error => {
      console.log("error")
    });
  }


  documentSendToEditor() {
    let data = this.documentService.templateDoc;
    this.documentService.isSyncDocument = true;
    data.text().then(data => {
      this.container.documentEditor.open(data);
      let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
      this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true, this.screenID, this.enableFormFields);
      this.container.documentEditor.documentName = this.documentService.docName;
      this.titleBar.updateDocumentTitle(this.screenID);
      if (!this.isRestrictEditing) {
        this.fileIntervalId = setInterval(() => {
          this.saveFile(true,false);
        }, this.saveintervalTime);
      }
    });
  }

  closeDoc() {
    if (this.isDocumentSaved) {
      this.proceedClose();
    }
    else {
      let saveConfirmationMsg = this.translateService.translate('oumdtemp.datalostmsg');
      const dialogRef = this.SaveConfirmationDialog.open(SaveConfirmationComponent, {
        width: 'auto',
        data: { headerMsg: 'Save Confirmation' , bodyMsg: saveConfirmationMsg },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'save'){
          this.saveFile(false,true);
        }
        else if(result == 'donot-save'){
          this.continueWithoutSaving = true;
          this.proceedClose();
        }
        else if(result == 'cancel'){}
        else{}
      });

    }
  }

  proceedClose(){
    if (this.storedInfo) {
      let msg = this.translateService.translate('oumdtemp.docclosemsg');
      this.show('success', msg);
      window.close();
    }
    else {
      window.history.back();
      var elem = document.getElementById("s4MainBody");
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }

  

  renameDocName(){
    let docTitleEle = (<HTMLInputElement>document.getElementById('documenteditor_title_name'));
    let docTitleEleVal = docTitleEle.value;
    if(this.screenID == 'OUMDTEMP'){
      this.documentService.templateName = docTitleEleVal;
    }
    else{
      this.documentService.docName = docTitleEleVal;
    }
    this.onContentChange();
  }

  blobToFile(theBlob: Blob): FormData {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.lastModified = new Date();
    b.name = 'Syscon WorkSpace Setup (26).docx';
    b.__proto__ = File.prototype
    let formData: FormData = new FormData();
    formData.append('files', theBlob);
    return formData;
  }

  show(type, message) {
    const msglist = [];
    msglist.push({ message: message, type: type });
    this.msgs = [...msglist];
  }

  saveFile(isautoSave: boolean, closeEditorAfterSave: boolean) {
    if (this.screenID === 'OUMDTEMP') {
      let saveFormat: any = 'Sfdt';
      // Remove below if condition when converting to Non text based email templates
      if (this.documentService.templateType === 'EMAIL') {
        saveFormat = 'Txt';
      }
 this.container.documentEditor.saveAsBlob(saveFormat).then((exportedDocument: Blob) => {
        const selectedFilesNew = [];
        var b: any = exportedDocument;
        b.lastModifiedDate = new Date();
        b.name = this.documentService.templateName + ".docx";
        b.__proto__ = File.prototype
        selectedFilesNew.push(b);
        const fileupRow = new Fileupload();
        fileupRow.templateId = this.documentService.templateId;
        fileupRow.fileTypeLabel = "Docx File";
        fileupRow.image = "assets/icons/eoff_icons/word_file_25x25.png";
        fileupRow.status = "NEW";
        fileupRow.templateName = this.documentService.templateName;
        // fileupRow.templateUri = '41'
        const fileupRowData = []
        fileupRowData.push(fileupRow);
        // let file = this.blobToFile(exportedDocument).get('files');
        /* var b: any = exportedDocument;
        b.lastModifiedDate = new Date();
        b.name = this.documentService.templateName;
        b.__proto__ = File.prototype
        selectedFilesNew.push(b); */
        this.oumdtempFactory.pushTemplateFileToStorage(selectedFilesNew, fileupRowData, undefined, this.offenderSearchService.selectedOffender, null, 'N')
          .subscribe((resultCount:any) => {
            if (resultCount > 0) {
              //localStorage.setItem('modified', 'true');
              this.isDocumentSaved = true;
              if (isautoSave) {
                this.titleBar.updateAutoSaveTime(moment(new Date()).format('MM/DD/YYYY hh:mm A'));
              } else {
                this.show('success', 'Document saved successfully');
              }
            } else {
              this.show('error', 'Unable to save the document');
            }
          })
      });
    }
    else {
      let docName;
      if (this.documentService.docName) {
        docName = this.documentService.docName.trim();
      }
      if (docName == '' || docName == undefined) {
        let msg = this.translateService.translate('ocdalert.docnameblank');
        this.show('error', msg);
        return;
      }
      else if (docName.length > 250) {
        let msg = this.translateService.translate('eoffender.docnamelengthexceed');
        this.show('error', msg);
        return;
      }
      this.container.documentEditor.saveAsBlob('Sfdt').then((exportedDocument: Blob) => {
        const fileupRow = new Fileupload();
        fileupRow.documentId = this.actionMode == 'GENERATE' ? 0 : this.documentService.docId;
        fileupRow.documentName = this.documentService.docName;
        fileupRow.documentType = this.documentService.docType;
        fileupRow.fileName = this.documentService.docName + '.docx';
        fileupRow.fileTypeLabel = "Docx File"
        fileupRow.image = "assets/icons/eoff_icons/word_file_25x25.png"
        fileupRow.status = this.documentService.docStatus;
        this.documentService.templateList?.forEach(element => {
          if (this.documentService.templateName == element.code) {
            fileupRow.templateUri = element.templateId;
          }
        });
        const fileupRowData = []
        fileupRowData.push(fileupRow);
        const selectedFilesNew = [];
        // let file = this.blobToFile(exportedDocument).get('files');
        var b: any = exportedDocument;
        b.lastModifiedDate = new Date();
        b.name = this.documentService.docName + '.docx';
        b.__proto__ = File.prototype
        selectedFilesNew.push(b);
        const objectType = this.documentService.docObjectType;
        this.eoffenderService.saveDocFie(selectedFilesNew, fileupRowData, undefined, this.offenderSearchService.selectedOffender, objectType, this.eoffenderService.objectId)
          .subscribe((ID:any) => {
            if (ID > 0) {
              this.isDocumentSaved = true;
              if (isautoSave) {
                this.titleBar.updateAutoSaveTime(moment(new Date()).format('MM/DD/YYYY hh:mm A'));
              } else {
                this.show('success', 'Document saved successfully');
                if (this.actionMode == 'GENERATE') {
                  this.actionMode = 'EDIT';
                  if (!closeEditorAfterSave) {
                    this.startAutoSaveForGeneratedDoc();
                  }
                  else{
                    this.proceedClose();
                  }
                }
                this.documentService.docId = ID;
              }
            } else {
              this.show('error', 'Unable to save the document');
            }
          })
      });
    }
  }

  public onToolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'save':
        //Disable image toolbar item.
        this.container.toolbar.enableItems(4, false);
        // this.container.toolbar.enableDisableToolBarItem;
        this.saveFile(false,false);
        break;
      case 'print':
        //Disable image toolbar item.
        this.container.toolbar.enableItems(4, false);
        // this.container.toolbar.enableDisableToolBarItem;
        this.printFile();
        break;
    }
  };

  oumbmarkexecuteQuery() {
    const serviceObj = this.oumdtempFactory.rgBmListRecordGroup();
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.bookmarksData = [];
        return;
      } else {
        this.bookmarksData = data;
        this.bookmarksData = this.prepareBookmarksData(data);
      // main = compositeArr.concat(textArr, binaryArr);
       // this.bookmarksData = data.filter(obj=>obj.bookmarkType=='COMP').concat(data.filter(obj=>!(obj.bookmarkType=='COMP')));
        // this.bookmarksData.forEach(obj => {
        //   obj.text = obj.bookmarkName;
        //   obj.id = obj.bookmarkName;
        //   obj.category = obj.bookmarkType;
        //   if(obj.bookmarkType=='COMP') {
        //     obj.text = obj.bookmarkName;
        //     obj.child = [{ }];
        //     obj.htmlAttributes = { draggable: false, display: 'flex', title: obj.description };
        //   }else {
        //   obj.htmlAttributes = { draggable: true, display: 'flex', title: obj.description };
        //   }
        // });
      }
      //this.bookmarksDataOrig = this.bookmarksData;
    });
  }


  prepareBookmarksData(data) {
    let preparedData = [];
    for (let i= 0; i < data.length; i++) {
      if (data[i].bookmarkType == 'COMP') {
       // let compObj = {};
       data[i]['id'] = data[i].bookmarkType + i;
       data[i]['text'] = data[i].bookmarkName;
       data[i]['category'] = data[i].bookmarkType;
       data[i]['htmlAttributes'] = { draggable: false, display: 'flex', title: data[i].bookmarkName },
       preparedData.push(data[i])
      }
      else if (data[i].bookmarkType == 'TEXT') {
        //let textObj = {};
        data[i]['id'] = data[i].bookmarkType + i;
        data[i]['text'] = data[i].bookmarkName;
        data[i]['category'] = data[i].bookmarkType;  
        data[i]['htmlAttributes'] = { draggable: true, display: 'flex', title: data[i].bookmarkName },
        preparedData.push(data[i])
      }
      else if (data[i].bookmarkType == 'BINARY') {
       // let binaryObj = {};
       data[i]['id'] = data[i].bookmarkType + i;
       data[i]['text'] = data[i].bookmarkName;
       data[i]['category'] = data[i].bookmarkType;
       data[i]['htmlAttributes'] = { draggable: true, display: 'flex', title: data[i].bookmarkName },
       preparedData.push(data[i])
      }
    }
    preparedData.sort(function(a, b){
      if(a.bookmarkType == "COMP" || b.bookmarkType == "COMP"){
         return -1;
      }
      return 1;
    });
    return preparedData;
  }

  backToMainList(ev){
    let backBtn = document.getElementsByClassName('e-icon-back')[0];
    if(backBtn){
      const display = window.getComputedStyle(backBtn).display;
      if(display == "none"){
         this.isParentListActive = true;
         this.listPlaceholder = 'Filter bookmarks';
         document.getElementById('listview').classList.remove('child-no-content');
         if(ev == undefined){
           this.onkeyup();
         }
      }
      else{
        this.isParentListActive = false;
        this.listPlaceholder = 'Filter in selected bookmarks';
      }
    }
  }

  onkeyup(event?) {
    document.getElementById('listview').classList.remove('child-no-content');
    let value = this.textboxEle.nativeElement.value;
    let listObj = (document.getElementById("listview") as any).ej2_instances[0];
    if(this.isParentListActive){
      let data = new DataManager(this.bookmarksData).executeLocal(new Query().where("text", "startswith", value, true));
      if (!value) {
        listObj.dataSource = this.bookmarksData.slice();
      } else {
        listObj.dataSource = data;
      }
      listObj.dataBind();
    }
    else{
      let data = new DataManager(this.defaultSelectedParentObj.childData).executeLocal(new Query().where("text", "startswith", value, true));
      if (!value) {
        listObj.localData[this.defaultSelectedParentObj.index].child = this.defaultSelectedParentObj.childData.slice();
      } 
      else if(data.length == 0){
        document.getElementById('listview').classList.add('child-no-content');
        return;
      }
      else {
        listObj.localData[this.defaultSelectedParentObj.index].child = data;
      }
      listObj.refresh();
      document.getElementById(this.defaultSelectedParentObj.id).click();
      
    }
    
  }



onParentSelect(args: SelectEventArgs) {
  let e = (args.event as any)
  let mouseClick = true;
  if(e.clientX == 0 && e.clientY == 0){
    mouseClick = false;
  }

  if (args.data['bookmarkType'] == 'COMP') {
    if(args.data['child'] == undefined){
      this.oumbmarkService.getOutParams(args.data).subscribe(data => {
        if (data && data.length) {
          let params = [];
          data.forEach(child => {
            var x = {
              'description': child.parameterDesc,
              'text': child.parameterName,
              'id': child.parameterName,
              'htmlAttributes': { draggable: true, display: 'flex', title: child.parameterName, disabled: true }
            };
            params.push(x);
          });
          
          for(let z=0;z<this.listObj.localData.length;z++){
              if(this.listObj.localData[z].id == args.data['id']){
                this.listObj.localData[z].child = params;
                this.listObj.refresh();
                this.defaultSelectedParentObj.index = z;
                this.defaultSelectedParentObj.childData = params;
                this.defaultSelectedParentObj.id = args.item.id;
                document.getElementById(args.item.id).click();
                break;
              }
          } 
        }
      })
    }
    else if(args.data['child'].length == 0){
        //console.log("onParentSelect - Parent have no child")
    }
    else{
      if (mouseClick) {
        let listObj = (document.getElementById("listview") as any).ej2_instances[0];
        let initialChildData = this.defaultSelectedParentObj.childData;
        let currentChildData = listObj.localData[this.defaultSelectedParentObj.index]['child'];
        if (initialChildData.length > currentChildData.length) {
            let parentId = this.defaultSelectedParentObj.id;
            this.resetChildList();
            document.getElementById(parentId).click();
        }
      }
    }
  }
}


resetChildList(){
  let arr = this.listObj.localData;
  for(let i=0;i<arr.length;i++){
    if(this.listObj.localData[i].child){
      delete this.listObj.localData[i].child;
    } 
  }
  this.defaultSelectedParentObj = {
    childData : [],
    index : 0,
    id: null
  };
  this.listObj.refresh();
}

onBeforeRender(args: TooltipEventArgs) {
  this.tooltipControl.content = 'Loading...';
  this.tooltipControl.dataBind();
  const serviceObj = this.oumdtempFactory.rgBmListRecordGroup();
  serviceObj.subscribe(result => {
    for (let i: number = 0; i < result.length; i++) {
        if (result[i].bookmarkName === args.target.getAttribute('data-content')) {
            this.tooltipControl.content = result[i].description;
        }
    }
    this.tooltipControl.dataBind();
  });
}


  public printFile(): void {
    let sfdtData = this.container.documentEditor.serialize();
    console.log(sfdtData)
    //Open the document in preview document editor.
    this.container.documentEditor.open(sfdtData);
    //Print the document content.
    this.container.documentEditor.print();
  }



ngOnDestroy() {
  docEditorClassRef = null;
  if (this.templateIntervalId) {
    clearInterval(this.templateIntervalId);
  }
  if (this.fileIntervalId) {
    clearInterval(this.fileIntervalId);
  }
}
}
