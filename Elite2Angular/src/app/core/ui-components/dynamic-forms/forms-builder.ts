import { UserSessionManager } from './../../classes/userSessionManager';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { DynamicFormsService } from './dynamic-forms.service';
import { FormsBuilderBean } from './forms-builder-bean';
// import { Formio } from '@formio/angular';
import * as formio from '@formio/angular';

@Component({
    selector: 'forms-builder',
    templateUrl: './forms-builder.html',
    styleUrls: ['./forms-builder.scss']
})
export class FormsBuilder implements OnInit, AfterViewInit {
    @Input() userFormData: FormsBuilderBean;
    msglist: any[];
    msgs: any[];
    constructor(private dynamicFormsService:DynamicFormsService, private sessionManager: UserSessionManager) { }
    
    public formData: any = {
        components: []
    };
    formName = '';
    screenName = '';
    formTemplateData: any;
    formTemplateDataSave: any;
    ngOnInit(): void {
        if(this.userFormData.formJson){
            const y = JSON.parse(this.userFormData.formJson);
            this.formTemplateData = y;
            this.formTemplateDataSave = y;
        } else {
            let identifiers = [];
            let identifiersValueMap = {key : 'value'};
            if(this.userFormData.formIdentifier) {
                /* this.dynamicFormsService.getIdentifierData(this.userFormData.formIdentifier)
                .subscribe(data => {
                    // return a map?
                }); */
                /* identifiers = this.userFormData.formIdentifier.split(';');
                for(let identity in identifiers) {
                    this.formData.components.push (
                        { key: identity, type: 'hidden', id: 'pk_' + identity});
                } */
                // { key: 'type', type: 'hidden' },
            }
            this.formTemplateDataSave = this.formData;
            this.formTemplateData = this.formData;
        }
    }

    ngAfterViewInit(): void {
        // new formio.Formio.Headers().prototype.set('Authorization', 
        // this.sessionManager.getTokenType() + ' ' + this.sessionManager.getAccessToken());
        const sessionManager = this.sessionManager;
        var NestedFormPlugin = {
            priority: 0,
            preRequest: function(requestArgs) {
                if(requestArgs && requestArgs.opts && requestArgs.opts.header) {
                    requestArgs.opts.header.set('Authorization', 
                    sessionManager.getTokenType() + ' ' + sessionManager.getAccessToken());
                    requestArgs.opts.header.set('Accept', '*/*');           
                }
                if(requestArgs && requestArgs.opts && requestArgs.opts.headers){
                    requestArgs.opts.headers['Authorization'] =  
                    sessionManager.getTokenType() + ' ' + sessionManager.getAccessToken();
                    requestArgs.opts.headers['Accept'] = '*/*';
                }
               
            }
          }
          
        formio.Formio.registerPlugin(NestedFormPlugin, 'nestedForms');
        formio.Formio.setProjectUrl(window.origin.toString()+'/Elite2Web/api/');
        formio.Formio.setApiUrl(window.origin.toString()+'/Elite2Web/api/');
        formio.Formio.clearCache();
    }

    onChange(event){
        this.formTemplateDataSave = event.form;
        const links = document.getElementsByTagName("a");
        for ( let i =0; i < links.length; i++ ) {
            
            if ( links[i].href.includes('https://help.form.io/userguide') ) {
                links[i].href = "http://www.syscon.net";
            }
        }
    }
    onSave(){
        // send data to api
        this.userFormData.formJson = JSON.stringify(this.formTemplateDataSave);

        this.dynamicFormsService.saveFormbuilderData(this.userFormData)
        .subscribe(data => {
            if(data){
                this.show('success','Data Saved Successfully');
            } else {
                this.show('error','Unable to Save Data');
            }
        });
    }

    show(type, message) {
        this.msglist = [];
        this.msglist.push({ message: message, type: type });
        this.msgs = [...this.msglist];
    }
    
}