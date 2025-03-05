import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { DocumentEditor, FormatType } from '@syncfusion/ej2-angular-documenteditor';
import { Button } from '@syncfusion/ej2-angular-buttons';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
/**
 * Represents document editor title bar.
 */
export class TitleBar {
    private tileBarDiv: HTMLElement;
    private documentTitle: HTMLElement;
    private documentTitleContentEditor: HTMLElement;
    private export: DropDownButton;
    private print: Button;
    private open: Button;
    private documentEditor: DocumentEditor;
    private isRtl: boolean;
    fullscreen: any;
    backBtn: any;
    autoSaveTime: HTMLElement;
    screenName: string;
    protectionPassword = '123';
    isEnableFormFields: boolean = false;

    constructor(
        element: HTMLElement, 
        docEditor: DocumentEditor, 
        isShareNeeded: Boolean,
        screenName:any,
        isEnableFormFields: boolean,
        isRtl?: boolean) {
        this.isRtl = isRtl;
        //initializes title bar elements.
        this.tileBarDiv = element;
        this.screenName = screenName;
        this.isEnableFormFields = isEnableFormFields;
        this.documentEditor = docEditor;
        this.initializeTitleBar(isShareNeeded);
        this.wireEvents();
    }
    private initializeTitleBar = (isShareNeeded: Boolean): void => {
        let downloadText: string;
        let downloadToolTip: string;
        let printText: string;
        let printToolTip: string;
        let openText: string;
        let documentTileText: string;
        let fullscreenText: string;
        let backBtnText: string;
        if (!this.isRtl) {
            downloadText = 'Download';
            downloadToolTip = 'Download this document.';
            printText = 'Print';
            printToolTip = 'Print this document (Ctrl+P).';
            openText = 'Open';
            documentTileText = 'Document Name. Click or tap to rename this document.';
            fullscreenText = 'Fullscreen';
            backBtnText = 'Back';
        } else {
            downloadText = 'تحميل';
            downloadToolTip = 'تحميل هذا المستند';
            printText = 'طباعه';
            printToolTip = 'طباعه هذا المستند (Ctrl + P)';
            openText = 'فتح';
            documentTileText = 'اسم المستند. انقر أو اضغط لأعاده تسميه هذا المستند';
        }
        // tslint:disable-next-line:max-line-length
        this.documentTitle = createElement('input', { id: 'documenteditor_title_name', styles: 'border: none;' });
        this.documentTitle.setAttribute('title', 'Double click to edit document name');
        this.autoSaveTime = createElement('label', { id: 'autoSaveTime_title_name', styles: 'margin: 0 0 0 70px;' });
        let iconCss: string = 'e-de-padding-right';
        let btnFloatStyle: string = 'float:right;';
        let titleCss: string = '';
        if (this.isRtl) {
            iconCss = 'e-de-padding-right-rtl';
            btnFloatStyle = 'float:left;';
            titleCss = 'float:right;';
        }
        // tslint:disable-next-line:max-line-length
        this.documentTitleContentEditor = createElement('div', { id: 'documenteditor_title_contentEditor', className: 'single-line', styles: titleCss });
        this.documentTitleContentEditor.appendChild(this.documentTitle);
        this.documentTitleContentEditor.appendChild(this.autoSaveTime);
        this.tileBarDiv.appendChild(this.documentTitleContentEditor);
        let btnStyles: string = btnFloatStyle + 'background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;'
            + 'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;'
            + 'margin-top: 2px;';
        // tslint:disable-next-line:max-line-length
        this.print = this.addButton('e-de-icon-Print ' + iconCss, printText, btnStyles, 'de-print', printToolTip, false) as Button;
        this.print.element.style.display = 'none';
        this.open = this.addButton('e-de-icon-Open ' + iconCss, openText, btnStyles, 'de-open', documentTileText, false) as Button;
        this.backBtn = this.addButton('e-icons e-de-ctnr-BackBtn ' + iconCss, '', btnStyles, 'de-backBtn', backBtnText, false) as Button;
        this.fullscreen = this.addButton('e-icons e-de-ctnr-Fullscreen ' + iconCss, '', btnStyles, 'de-fullscreen', fullscreenText, false) as Button;
        let items: ItemModel[] = [
            { text: 'Microsoft Word (.docx)', id: 'word' }
        ];
        // tslint:disable-next-line:max-line-length
        this.export = this.addButton('e-icons e-de-ctnr-Download ' + iconCss, downloadText, btnStyles, 'documenteditor-share', downloadToolTip, true, items) as DropDownButton;
        if (!isShareNeeded) {
            this.export.element.style.display = 'none';
        } else {
            this.open.element.style.display = 'none';
        } 
        
       
        console.log('isFormfieldEnbled-->'+ this.isEnableFormFields);
        if (this.isEnableFormFields) {
            if (this.screenName == 'OUMDTEMP') {
                console.log('Protection Removed');
                //stop the document protection
                this.documentEditor.editor.stopProtection(this.protectionPassword);
            }
            else {
                console.log('Protection apply');
                //enforce protection
                this.documentEditor.editor.enforceProtection(this.protectionPassword, 'FormFieldsOnly');
            }
        }

    }
    private setTooltipForPopup(): void {
        // tslint:disable-next-line:max-line-length
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[0].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
    }


    public enableEditingTitle(docTitleEle) {
        let typing = false;
        this.documentTitle.addEventListener('keypress', (event) => {
            if (typing) {
                return true;
            }
            event.preventDefault();
        });
        this.documentTitle.addEventListener('dblclick', (event) => {
            typing = true;
            docTitleEle.classList.add("title-focus-in");
        });
        this.documentTitle.addEventListener('focusout', (event) => {
            typing = false;
            docTitleEle.classList.remove("title-focus-in");
            document.getElementById('ejs-documenteditor-rename-doc').click(); 
        });
    }

    public disableEditingTitle(docTitleEle){
        docTitleEle.disabled = true;
        docTitleEle.classList.add("title-disable");
        this.documentTitle.removeAttribute('title');
    }

    private wireEvents = (): void => {
        this.print.element.addEventListener('click', this.onPrint);
        this.fullscreen.element.addEventListener('click', this.onFullscreen);
        this.backBtn.element.addEventListener('click', this.onBackBtn);
        this.open.element.addEventListener('click', (e: Event) => {
            if ((e.target as HTMLInputElement).id === 'de-open') {
                let fileUpload: HTMLInputElement = document.getElementById('uploadfileButton') as HTMLInputElement;
                fileUpload.value = '';
                fileUpload.click();
            }
        });  
    }
    
    // Updates document title.
    public updateDocumentTitle = (mode): void => {
        let titleEle = (<HTMLInputElement>document.getElementById('documenteditor_title_name'));
        if (this.documentEditor.documentName === '') {
            this.documentEditor.documentName = 'Untitled';
        }
        titleEle.value = this.documentEditor.documentName;
        titleEle.addEventListener('paste', e => e.preventDefault());
        if(mode == 'GENERATE'){
            this.enableEditingTitle(titleEle);
        }
        else{
            this.disableEditingTitle(titleEle);
        }
    }

    public updateAutoSaveTime = (time): void => {
        this.autoSaveTime.textContent = 'Auto saved on ' + time;
    }

    // tslint:disable-next-line:max-line-length
    private addButton(iconClass: string, btnText: string, styles: string, id: string, tooltipText: string, isDropDown: boolean, items?: ItemModel[]): Button | DropDownButton {
        let button: HTMLButtonElement = createElement('button', { id: id, styles: styles }) as HTMLButtonElement;
        this.tileBarDiv.appendChild(button);
        button.setAttribute('title', tooltipText);
        if (isDropDown) {
            // tslint:disable-next-line:max-line-length
            let dropButton: DropDownButton = new DropDownButton({ select: this.onExportClick, items: items, iconCss: iconClass, cssClass: 'e-caret-hide', content: btnText, open: (): void => { this.setTooltipForPopup(); } }, button);
            return dropButton;
        } else {
            let ejButton: Button = new Button({ iconCss: iconClass, content: btnText }, button);
            return ejButton;
        }
    }
    
    private onPrint = (): void => {
        this.documentEditor.print();
    }


    private onBackBtn = (): void => {
       document.getElementById('ejs-documenteditor-custom-back').click();
    }

    private onFullscreen = (): void => {
        /* const event = new KeyboardEvent("keypress",{
        "key": "F11"
        }); */
        var elem = document.getElementById("s4MainBody");

        if (!document.fullscreenElement) {
            elem.requestFullscreen();
             //elem.style.height = '100%';
        } else {
            document.exitFullscreen();
            // elem.style.height = '495px';

        }
    }
    private onExportClick = (args: MenuEventArgs): void => {
        let value: string = args.item.id;
        switch (value) {
            case 'word':
                this.save('Docx');
                break;
        }
    }
    private save = (format: string): void => {
        // tslint:disable-next-line:max-line-length
        this.documentEditor.save(this.documentEditor.documentName === '' ? 'sample' : this.documentEditor.documentName, format as FormatType);
    }
}