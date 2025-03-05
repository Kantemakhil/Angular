export class DynamicGridUtils {
    translateService: any;
    mainColDefData: any;
    formIdentifiers: any;
    screenName: any;
    dataId = 0;
    jsonRowData: any;
    dynamicFormService: any;

    loadColdef(gridName) {
        let datatypeData = {};
        this.mainColDefData.forEach(gridDef => {
            if(gridDef.grid_name == gridName, gridDef.module_name == this.screenName){
                datatypeData = gridDef.config_json;
            }
        })
        // const datatypeData = this.mainColDefData && this.mainColDefData[gridName] && JSON.parse(this.mainColDefData[gridName]);
        const colDefData = [];
        this.prepareColDef(datatypeData).forEach(key => colDefData.push(key));
        return colDefData;
    }

    prepareColDef(coldefJson) {
        let colDefs = [];
        coldefJson.forEach(type => {
            if(type.dataType === 'lov' && type.source === 'link') {
                let lovRendered = 'description';
                if (type.field == 'court') {
                    lovRendered = 'code'
                }
                colDefs.push({datatype:type.dataType,lovRender: lovRendered, source:type.sourceType,suppressMenu: true, link:type.url, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required, parentFields: type.parentFields})
            } 
            else if(type.dataType === 'lov' && type.source === 'domain') {
                colDefs.push({datatype:type.dataType, domain:type.url,suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required})
            }
            else if(type.dataType === 'text') {
                colDefs.push({datatype:type.dataType, wrapText:true, width:80,suppressMenu: true, hide: type.hide, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required })
            }
            else if(type.dataType === 'number') {
                colDefs.push({datatype:type.dataType,width:40,suppressMenu: true, hide: type.hide, field: type.field,fieldName:this.translateService.translate(type.fieldName), editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required })
            }
            else if(type.dataType === 'launchbutton') {
                colDefs.push({datatype:type.dataType, width:100, parentField: type.parentField,suppressMenu: true, field:type.field,fieldName:'', required: type.required, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%'})
            }
            else if(type.dataType === 'hyperlink') {
                    
                    colDefs.push({datatype:'hyperlink',width:50,displayas: 'image',suppressMenu: true, parentField: type.parentField, required: type.required,fieldName:'', field:type.field, link: type.link, updateField: 'row', modal: true, data: 'row', dialogWidth: '80%'})
            }
            else if(type.dataType === 'date' && type.field === 'orderedDate') {
                colDefs.push({datatype:type.dataType, field:type.field,fieldName:this.translateService.translate(type.fieldName),  width:100, suppressMenu: true, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required })
            }
            else if(type.dataType === 'date') {
                colDefs.push({datatype:type.dataType,suppressMenu: true, field:type.field,fieldName:this.translateService.translate(type.fieldName),  editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required })
            } 
            else if(type.dataType === 'checkbox') {
                colDefs.push({datatype:type.dataType, width:40, field: type.field,fieldName:this.translateService.translate(type.fieldName),suppressMenu: true, editable: ![undefined,null,0].includes(type.editable)?type.editable:true, required: type.required})
            }
        });
        return colDefs;
      }

    loadGridData(rowData) {
        const retData = {
            formName : this.screenName,
            id : this.dataId?this.dataId : 0,
            searchString : JSON.stringify(this.formIdentifiers)
        }
        this.dynamicFormService.loadData(retData).subscribe((data: any) => {
            if (data && data.formInfoJson) {
                this.jsonRowData = JSON.parse(data.formInfoJson).jsonRowData;
                rowData = JSON.parse(data.formInfoJson).jsonRowData;
                this.dataId = data.id;
            }
        });
    }

    saveGridData() {
        let finalObj = {
            'jsonRowData': this.jsonRowData
        };
        var submitData = finalObj;
        const submissionData = {
            formName : this.screenName,
            id : this.dataId?this.dataId : 0,
            formInfoJson : JSON.stringify(submitData),
            formIdentifier : JSON.stringify(this.formIdentifiers)
        }    
        this.dynamicFormService.saveData(submissionData).subscribe(data => {
            if(data){
                //submit success
            }
        }); 
    }

    validateData() {}
}