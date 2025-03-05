import { UserSessionManager } from './../../classes/userSessionManager';
import { FormsBuilderBean } from './forms-builder-bean';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DynamicFormsService } from './dynamic-forms.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import * as formio from '@formio/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'forms-renderer',
    templateUrl: './forms-renderer.html',
    styleUrls: ['./forms-renderer.scss']
})
export class FormsRenderer implements OnInit {
    @Input() userFormData: FormsBuilderBean;
    rendData: any;
    dataId: any;
    msglist: any[];
    msgs: any[];
    currentForm: any;
    constructor (private dynamicFormsService: DynamicFormsService,
        private sessionManager: UserSessionManager,private activatedRoute: ActivatedRoute ) {

    }
    submitData = {
        data: {
        }
    }
    refreshForm = new EventEmitter();
    successEmitter = new EventEmitter();
    identifiers = [];
    formOptions = {
        submitMessage: "",
        disableAlerts: true,
        noAlerts: true
      };
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    ngOnInit(): void {
        const sessionManager = this.sessionManager;
        var DelayPlugin = {
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
          
          formio.Formio.registerPlugin(DelayPlugin, 'delay');
          formio.Formio.setProjectUrl(window.origin.toString()+'/Elite2Web/api/');
          formio.Formio.setApiUrl(window.origin.toString()+'/Elite2Web/api/');
          formio.Formio.clearCache();
          
        this.activatedRoute.queryParams.subscribe(params => {
            let formModuleName = params['form'] && params['form'].split('/')[1]; 
                if(formModuleName) {
                    this.dynamicFormsService.getFormDataBasedOnModName(formModuleName).subscribe(data => {
                        if( data.length > 0 ) {
                            this.userFormData = data[0];
                            this.initializeForm();
                        }
                    });
                } else {
                    this.initializeForm();
                }
            });
        }
        initializeForm() {
            this.identifiers = [];
            let identifiersValueMap = {key : 'value'};
            if(this.userFormData.formIdentifier) {
                /* this.dynamicFormsService.getIdentifierData(this.userFormData.formIdentifier)
                .subscribe(data => {
                    // return a map?
                }); */
                this.identifiers = this.userFormData.formIdentifier.split(';');
                for(let identity of this.identifiers) {
                    /* this.rendData.components.push (
                        { key: identity, type: 'hidden', id: 'pk_' + identity + '_' + identifiersValueMap[ identity ] }); */
                        if(identity && identity.toLowerCase().includes('offenderid')) {
                            this.submitData.data[identity] = this.vHeaderBlockModel.offenderId+'';
                            break;
                        } else {
                            this.submitData.data[identity] = identifiersValueMap[ identity ];                    
                        }
                    }
                }
                // this.formTemplateDataSave = this.formData;
                // this.formTemplateData = this.formData;
                // this.userFormData.formJson = this.userFormData.formJson.split('<form_token_type>').join(this.sessionManager.getTokenType()).split('<form_token_id>').join(this.sessionManager.getAccessToken());
                this.rendData = JSON.parse(this.userFormData.formJson);
                
                this.retrieve(this.vHeaderBlockModel.offenderId);
    }
    ready(event){
        this.currentForm = event.formio;
    }
    onChange(event) {
    }
    handleCustomEvent(event) {
        
    }
    onSubmit(event) {
        /* this.dynamicFormsService.getIdentifierData(this.userFormData.formIdentifier)
                .subscribe(data => {
                    // return a map?
                }); */
                var form_identifiers = {};
                if (this.identifiers.some(val => val.toLowerCase() == 'offenderid') ) {
                    form_identifiers['offenderid'] = this.vHeaderBlockModel.offenderId + '';
                } else {
                    this.currentForm.everyComponent((component) => {
                        if (component.component.tags && this.identifiers.some(val => Array.from(component.component.tags).includes(val))) {
                          form_identifiers[component.component.key] = component.getValue();
                        }
                      });
                }
                if(this.submitData.hasOwnProperty("metadata")) {
                    this.submitData["metadata"] = undefined;
                }
        const submissionData = {
            formName : this.userFormData.formName,
            id : this.dataId?this.dataId : 0,
            formInfoJson : JSON.stringify(this.submitData),
            formIdentifier : JSON.stringify(form_identifiers)
        }    
        this.dynamicFormsService.submitFormData(submissionData).subscribe(data => {
            //submit success
            this.show('success','Data Submitted Successfully');
            /* this.submitData = {
                data: {
                }
            }; */
            const submitDataTemp = JSON.parse(JSON.stringify(this.submitData));
            this.successEmitter.emit(' ');
            this.currentForm.emit('submitDone');
            // setTimeout(() => {
                this.refreshForm.emit({
                    form: this.rendData,
                    submission: submitDataTemp
                  });
            // }, 1000);
            
        }); 
    }
    searchMap = new Map();
    searchKeys(event, identity) {
        if(typeof(event) == 'string') {
            this.searchMap.set(identity, event);
        }
    }
    clear() {
        this.searchMap = new Map();
    }
    retrieve(offId) {
        let searchString = '';
        this.submitData = {
            data: {
            }
        };
        if( this.userFormData && 
            this.userFormData.formIdentifier && 
            this.userFormData.formIdentifier.toLowerCase().includes('offenderid') ) {
            searchString = searchString + '"'+'offenderid'+ '"' + ":" + '"'+this.vHeaderBlockModel.offenderId+ '"'+";"
        } else {
            for ( const key of this.searchMap.keys() ) {
                if ( this.searchMap.get(key) ) {
                    searchString = searchString + '"'+key+ '"' + ":" + '"'+this.searchMap.get(key)+ '"'+";";
                }
            }
        }
        const searchObj = {"searchString" : searchString, "formName":this.userFormData.formName};
        this.dynamicFormsService.getFormData(searchObj).subscribe(data=>{
            
            this.dataId = data.id;
            if ( data.formInfoJson ) {
                this.submitData = JSON.parse(data.formInfoJson);
            } else {
                this.submitData = {
                    data: {
                    }
                };
                if(this.identifiers.includes('offenderId')) {
                    this.submitData.data['offenderId'] = this.vHeaderBlockModel.offenderId+'';
                }
            }
        })
    }

    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            // this.ocdalertExecuteQuery();
            this.retrieve(offender);
            this.submitData.data["offenderId"] = this.vHeaderBlockModel.offenderId+'';
        } else {
            // this.alertData = [];
            // this.alertbean = new OffenderAlerts();
        }
    }
    show(type, message) {
        this.msglist = [];
        this.msglist.push({ message: message, type: type });
        this.msgs = [...this.msglist];
    }
}