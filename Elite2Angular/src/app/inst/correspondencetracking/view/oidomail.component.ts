import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OidomailService } from '../servie/oidomail.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { OffenderMailLog } from '../beans/OffenderMailLog';
import { OffenderMailRestrictions } from '../beans/OffenderMailRestrictions';
import { OffenderMailLogCommitBean } from '../beans/OffenderMailLogCommitBean';
import { OffenderMailRestrictionsCommitBean } from '../beans/OffenderMailRestrictionsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { OidomailCommitBean } from '../beans/OidomailCommitBean';

@Component({
  selector: 'app-oidomail',
  templateUrl: './oidomail.component.html'
})
export class OidomailComponent implements OnInit {
  @ViewChild('mailLogGrid', { static: true }) mailLogGrid: any;
  @ViewChild('offMailRestrictGrid', { static: true }) offMailRestrictGrid: any;
  type: string;
  vldmsg: string;
  offenderMailLogModel: OffenderMailLog = new OffenderMailLog();
  offenderMailLogInsertList: OffenderMailLog[] = [];
  offenderMailLogUpdatetList: OffenderMailLog[] = [];
  offenderMailLogDeleteList: OffenderMailLog[] = [];
  offenderMailRestrictionModel: OffenderMailRestrictions = new OffenderMailRestrictions();
  offenderMailRestrictionsInsertList: OffenderMailRestrictions[] = [];
  offenderMailRestrictionsUpdatetList: OffenderMailRestrictions[] = [];
  offenderMailRestrictionsDeleteList: OffenderMailRestrictions[] = [];
  msgs: any[] = [];
  mailLogColumnDef: any[] = [];
  offMailRestrictGridColumnDef: any[];
  mailLogData: OffenderMailLog[] = [];
  mailLogDataTemp: OffenderMailLog[] = [];
  mailLogInsert: boolean = false;
  mailLogDelete: boolean = false;
  mailLogSelected: number = -1;
  offMailRestrictGridData: OffenderMailRestrictions[] = [];
  offMailRestrictGridDataTemp: OffenderMailRestrictions[] = [];
  offMailInsert: boolean = false;
  offMailDelete: boolean = false;
  offMailSelected: number = -1;
  vHeaderBlock: VHeaderBlock = new VHeaderBlock();
  offMailLogCommitBean: OffenderMailLogCommitBean = new OffenderMailLogCommitBean();
  offMailRestrictionCommitBean: OffenderMailRestrictionsCommitBean = new OffenderMailRestrictionsCommitBean();
  oidomailCommitBean: OidomailCommitBean = new OidomailCommitBean();
  commentTextTemp: string;
  offMailRestrictionModel: OffenderMailRestrictions = new OffenderMailRestrictions();
  commentTemp: string;


  constructor(public translateService: TranslateService,
    private dialogService: DialogService, private oidomailService: OidomailService) {
  }
  ngOnInit() {
    this.mailLogColumnDef = [
      {
        fieldName: this.translateService.translate('oidomail.date'), field: 'logDate', datatype: 'date', editable: true, width: 150, required: true,
        cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('oidomail.sentreceived'), field: 'inoutMailType', datatype: 'lov', editable: true, width: 150,
        domain: 'SENT_RECIVED', required: true, cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('oidomail.contacttype'), field: 'contactType', datatype: 'lov', editable: true, width: 150,
        domain: 'CONTACT_TYPE', required: true, cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('oidomail.contactname'), field: 'contactName', datatype: 'text', editable: false, width: 150,
        required: true
      },
      {
        fieldName: '', field: 'button', displayas: 'image', datatype: 'hyperlink', editable: false, width: 100,
        data: 'row', updateField: 'row', modal: true, dialogWidth: 100, height: 90, onLaunchClick: this.osipserdialogClick
      },
      {
        fieldName: this.translateService.translate('oidomail.contactaddress'), field: 'contactAddress', datatype: 'text',
        editable: false, width: 150, required: true
      },
      {
        fieldName: this.translateService.translate('oidomail.mailtype'), field: 'mailType', datatype: 'lov', editable: true, width: 150, required: true,
        domain: 'MAIL_TYPE', cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('oidomail.restrictions'), field: 'alertCode', datatype: 'text', editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('oidomail.status'), field: 'statusCode', datatype: 'lov', editable: true, width: 150, required: true,
        domain: 'MAIL_STAT'
      },
      {
        fieldName: '', field: 'personId', hide: true
      },
      {
        fieldName: '', field: 'corporateId', hide: true
      },
      {
        fieldName: '', field: 'mailAddressId', hide: true
      },
      {
        fieldName: '', field: 'commentTextTemp', hide: true
      },
      {
        fieldName: '', field: 'commentText', hide: true
      }
    ];

    this.offMailRestrictGridColumnDef = [
      {
        fieldName: this.translateService.translate('oidomail.contacttype'), field: 'contactType', datatype: 'lov',
        editable: true, width: 150, required: true, domain: 'CONTACT_TYPE', cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('oidomail.contactname'), field: 'contactName', datatype: 'text',
        editable: false, width: 150, required: true
      },
      {
        fieldName: '', field: 'button', displayas: 'image', datatype: 'hyperlink', editable: false, width: 100,
        data: 'row', updateField: 'row', modal: true, dialogWidth: 100, height: 90, onLaunchClick: this.onContactClick
      },
      {
        fieldName: this.translateService.translate('oidomail.contactaddress'), field: 'contactAddress', datatype: 'text',
        editable: false, width: 150, required: true
      },
      {
        fieldName: this.translateService.translate('oidomail.startdate'), field: 'startDate', datatype: 'date',
        editable: true, width: 150, required: true, cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('oidomail.active'), field: 'activeFlag', datatype: 'checkbox', editable: true, width: 150,
      },
      {
        fieldName: this.translateService.translate('oidomail.enddate'), field: 'endDate', datatype: 'date', width: 150, editable: false
      },
      {
        fieldName: this.translateService.translate('oidomail.restrictiontype'), field: 'restrictionType', datatype: 'lov',
        editable: true, width: 150, required: true, domain: 'MAIL_RST_TYP', cellEditable: this.canCellEdit
      },
      {
        fieldName: '', field: 'restrictioAddressId', hide: true
      },
      {
        fieldName: '', field: 'personId', hide: true
      },
      {
        fieldName: '', field: 'corporateId', hide: true
      },
      {
        fieldName: '', field: 'commentTemp', hide: true
      },
      {
        fieldName: '', field: 'commentText', hide: true
      }
    ];
  }

  osipserdialogClick = (event) => {
    let link = undefined;
    if (event) {
      if (!event.contactType) {
        this.show(this.translateService.translate('oidomail.pleaseentercontacttype'));
        return;
      } else if (!['PER', 'CORP'].includes(event.contactType)) {
        this.show(this.translateService.translate('oidomail.pleaseenteranyoneofthecontacttype'));
        return;
      }
      if (event.contactType === 'PER') {
        link = '/osipserdialog';
      } else if (event.contactType === 'CORP') {
        link = '/OUMAGENCDIALOG';
        event['mode'] = 'A';
      }
      if (link) {
        this.dialogService.openLinkDialog(link, event, 90).subscribe(result => {
          if (result) {
            const node = this.mailLogGrid.gridOptions.api.getSelectedNodes().length && this.mailLogGrid.gridOptions.api.getSelectedNodes()[0];
            const rowIndex = node.rowIndex;
            if (link === '/osipserdialog') {
              this.mailLogGrid.setColumnData('contactName', rowIndex, result.personName);
              this.mailLogGrid.setColumnData('personId', rowIndex, result.personId);
              this.mailLogGrid.setColumnData('corporateId', rowIndex, undefined);
              if (result.address) {
                this.mailLogGrid.setColumnData('mailAddressId', rowIndex, result.address.addressId);
                let address = '';
                if (result.address.suiteNumber) {
                  address = address + result.address.suiteNumber + ' ';
                }
                if (result.address.streetAddress) {
                  address = address + result.address.streetAddress + ' ';
                }
                if (result.address.cityName) {
                  address = address + result.address.cityName + ' ';
                }
                if(result.address.provStateDesc) {
                  address = address + result.address.provStateDesc + ' ';
                }
                if (result.address.zipPostalCode) {
                  address = address + result.address.zipPostalCode + ' ';
                }
                if (result.address.country) {
                  address = address + result.address.country + ' ';
                }
                this.mailLogGrid.setColumnData('contactAddress', rowIndex, address);
              }
            } else {
              this.mailLogGrid.setColumnData('contactName', rowIndex, result.corporateName);
              this.mailLogGrid.setColumnData('personId', rowIndex, undefined);
              this.mailLogGrid.setColumnData('corporateId', rowIndex, result.corporateId);
              if (result.addrData) {
                this.mailLogGrid.setColumnData('mailAddressId', rowIndex, result.addrData.addressId);
                let address = '';
                if (result.addrData.suiteNumber) {
                  address = address + result.addrData.suiteNumber + ' ';
                }
                if (result.addrData.streetAddress) {
                  address = address + result.addrData.streetAddress + ' ';
                }
                if (result.addrData.cityName) {
                  address = address + result.addrData.cityName + ' ';
                }
                if(result.addrData.provStateDesc) {
                  address = address + result.addrData.provStateDesc + ' ';
                }
                if (result.addrData.zipPostalCode) {
                  address = address + result.addrData.zipPostalCode + ' ';
                }
                if (result.addrData.country) {
                  address = address + result.addrData.country + ' ';
                }
                this.mailLogGrid.setColumnData('contactAddress', rowIndex, address);
              }
            }
          }
        });
      }
    }
  }

  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }

  commentChange() {
    const node = this.mailLogGrid.gridOptions.api.getSelectedNodes().length && this.mailLogGrid.gridOptions.api.getSelectedNodes()[0];
    const rowIndex = node.rowIndex;
    if (this.commentTextTemp != this.offenderMailLogModel.commentText) {
      this.mailLogGrid.setColumnData('commentTextTemp', rowIndex, this.offenderMailLogModel.commentText);
    }

  }
  onChange() {
    const node = this.offMailRestrictGrid.gridOptions.api.getSelectedNodes().length && this.offMailRestrictGrid.gridOptions.api.getSelectedNodes()[0];
    const rowIndex = node.rowIndex;
    if (this.commentTemp != this.offMailRestrictionModel.commentText) {
      this.offMailRestrictGrid.setColumnData('commentTemp', rowIndex, this.offMailRestrictionModel.commentText);
    }

  }

  get saveDisable() {
    if (this.mailLogGrid && (this.mailLogGrid.addedMap.size > 0 ||
      this.mailLogGrid.updatedMap.size > 0 || this.mailLogGrid.removedMap.size > 0)) {
      return false;
    }

    if (this.offMailRestrictGrid && (this.offMailRestrictGrid.addedMap.size > 0 ||
      this.offMailRestrictGrid.updatedMap.size > 0 || this.offMailRestrictGrid.removedMap.size > 0)) {
      return false;
    }
    return true;
  }

  onOffenderChange(event) {
    this.vHeaderBlock = new VHeaderBlock();
    this.offenderMailLogModel = new OffenderMailLog();
    this.offMailRestrictionModel = new OffenderMailRestrictions();
    this.commentTemp = undefined;
    this.commentTextTemp = undefined;
    this.mailLogData = [];
    this.offMailRestrictGridData = [];
    this.mailLogInsert = false;
    this.offMailInsert = false;
    this.mailLogDelete = false;
    this.offMailDelete = false;
    if (event) {
      this.vHeaderBlock = event;
      if (this.vHeaderBlock.offenderBookId) {
        this.mailLogInsert = true;
        this.offMailInsert = true;
        this.getOffenderMailLogsData();
        this.getOffenderMailResrtrictions();
      }
    }
  }

  getOffenderMailLogsData() {
    this.oidomailService.getOffenderMailLogsData(this.vHeaderBlock.offenderBookId).subscribe(data => {
      if (data && data.length > 0) {
        data.forEach(e => {
          e['commentTextTemp'] = e.commentText;
        });
        this.mailLogData = data;
        this.mailLogDataTemp = JSON.parse(JSON.stringify(this.mailLogData));
        this.mailLogSelected = 0;
      } else {
        this.mailLogData = [];
        this.mailLogDataTemp = [];
        this.offenderMailLogModel = new OffenderMailLog();
        this.commentTextTemp = undefined;
        this.mailLogSelected = -1;
      }
    });
  }

  getOffenderMailResrtrictions() {
    this.oidomailService.getOffenderMailResrtrictions(this.vHeaderBlock.offenderBookId).subscribe(data => {
      if (data && data.length > 0) {
        data.forEach(element => {
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
          element['commentTemp'] = element.commentText;
        });
        this.offMailRestrictGridData = data;
        this.offMailRestrictGridDataTemp = JSON.parse(JSON.stringify(this.offMailRestrictGridData));
        this.offMailSelected = 0;
      } else {
        this.offMailRestrictGridData = [];
        this.offMailRestrictGridDataTemp = [];
        this.offMailRestrictionModel = new OffenderMailRestrictions();
        this.commentTemp = undefined;
        this.offMailSelected = -1;
      }
    });
  }

  onRowClickmailLog(event) {
    if (event) {
      this.offenderMailLogModel = event;
      this.commentTextTemp = this.offenderMailLogModel.commentText ? JSON.stringify(this.offenderMailLogModel.commentText) : '';
      this.mailLogDelete = this.offenderMailLogModel.createDatetime ? true : false;
    } else {
      this.offenderMailLogModel = new OffenderMailLog();
      this.mailLogDelete = false;
      this.commentTextTemp = '';
    }
  }

  onMailLogInsert = () => {
    return { button: 'assets/icons/eoff_icons/person_search_black_24dp.png' };
  }

  onMailLogValidate = (event) => {
    const rowdata = new ValidateRowReturn();
    if (event) {
      if (event.field === 'contactType') {
        this.mailLogGrid.setColumnData('contactName', event.rowIndex, undefined);
        this.mailLogGrid.setColumnData('contactAddress', event.rowIndex, undefined);
        this.mailLogGrid.setColumnData('alertCode', event.rowIndex, undefined);
        this.mailLogGrid.setColumnData('personId', event.rowIndex, undefined);
        this.mailLogGrid.setColumnData('corporateId', event.rowIndex, undefined);
        this.mailLogGrid.setColumnData('mailAddressId', event.rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      }
      if (event.field === 'mailAddressId') {
        if (event.data.personId || event.data.corporateId) {
          if (this.offMailRestrictGridDataTemp && this.offMailRestrictGridDataTemp.length > 0) {
            let count = 0;
            for (let e of this.offMailRestrictGridDataTemp) {
              if (event.data.contactType === 'PER' && e.contactType === 'PER' && e.activeFlag) {
                if (e.personId === event.data.personId || e.restrictioAddressId === event.data.mailAddressId) {
                  count++;
                }
              }
              if (event.data.contactType === 'CORP' && e.contactType === 'CORP' && e.activeFlag) {
                if (e.corporateId === event.data.corporateId || e.restrictioAddressId === event.data.mailAddressId) {
                  count++
                }
              }
            }
            if (count > 0) {
              this.mailLogGrid.setColumnData('alertCode', event.rowIndex, this.translateService.translate('oidomail.restriction'));
            } else {
              this.mailLogGrid.setColumnData('alertCode', event.rowIndex, undefined);
            }
            rowdata.validated = true;
            return rowdata;
          }
        } else {
          this.mailLogGrid.setColumnData('alertCode', event.rowIndex, undefined);
          rowdata.validated = true;
          return rowdata;
        }

      }
    }
    rowdata.validated = true;
    return rowdata;

  }

  onRowClickOffMailRestrict(event) {
    if (event) {
      this.offMailRestrictionModel = event;
      this.commentTemp = this.offMailRestrictionModel.commentText ? JSON.stringify(this.offMailRestrictionModel.commentText) : '';
      this.mailLogDelete = this.offMailRestrictionModel.createDatetime ? true : false;
    } else {
      this.offMailRestrictionModel = new OffenderMailRestrictions();
      this.offMailDelete = false;
      this.commentTemp = '';
    }

  }

  validateoffMailGrid = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event) {
      if (event.field === 'contactType') {
        this.offMailRestrictGrid.setColumnData('contactName', event.rowIndex, undefined);
        this.offMailRestrictGrid.setColumnData('contactAddress', event.rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      }
      if (event.field === 'activeFlag') {
        if (event.data.activeFlag) {
          this.offMailRestrictGrid.setColumnData('endDate', rowIndex, undefined);
          rowdata.validated = true;
          return rowdata;
        } else if (!event.data.activeFlag) {
          this.offMailRestrictGrid.setColumnData('endDate', rowIndex,
            DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
          rowdata.validated = true;
          return rowdata;
        }
      }

    }
    rowdata.validated = true;
    return rowdata;

  }

  onoffMailInsert = () => {
    return { button: 'assets/icons/eoff_icons/person_search_black_24dp.png', startDate: DateFormat.getDate(), activeFlag: true };
  }

  onGlobalSave(event) {
    this.oidomailCommitBean = new OidomailCommitBean();
    const mailLogEvent = { added: [], updated: [], removed: [], offNadAdded: [] };
    const mailRestrictEvent = { added: [], updated: [], removed: [], offNadAdded: [] };
    if (this.mailLogGrid) {
      this.mailLogGrid.addedMap.forEach((value, keys) => { mailLogEvent.added.push(value); });
      this.mailLogGrid.updatedMap.forEach((value, keys) => { mailLogEvent.updated.push(value); });
      this.mailLogGrid.removedMap.forEach((value, keys) => { mailLogEvent.removed.push(value); });
    }
    if (this.offMailRestrictGrid) {
      this.offMailRestrictGrid.addedMap.forEach((value, keys) => { mailRestrictEvent.added.push(value); });
      this.offMailRestrictGrid.updatedMap.forEach((value, keys) => { mailRestrictEvent.updated.push(value); });
      this.offMailRestrictGrid.removedMap.forEach((value, keys) => { mailRestrictEvent.removed.push(value); });
    }
    if (this.mailLogDataCommit(mailLogEvent) && this.offenderMailRestrictionsDataCommit(mailRestrictEvent)) {
      const serviceObj = this.oidomailService.oidomailCommonSave(this.oidomailCommitBean);
      serviceObj.subscribe(data => {
        if (data && data === 1) {
          this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
          this.getOffenderMailLogsData();
          this.getOffenderMailResrtrictions();
        } else {
          this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
        }
      });
    }

  }

  mailLogDataCommit(event) {
    this.offMailLogCommitBean = new OffenderMailLogCommitBean();
    this.offenderMailLogInsertList = [];
    this.offenderMailLogUpdatetList = [];
    this.offenderMailLogDeleteList = [];
    this.offenderMailLogInsertList = event.added;
    this.offenderMailLogUpdatetList = event.updated;
    this.offenderMailLogDeleteList = event.removed;
    if (this.offenderMailLogInsertList.length > 0) {
      for (let i = 0; i < this.offenderMailLogInsertList.length; i++) {
        if (!this.offenderMailLogInsertList[i].logDate) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.datemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (DateFormat.compareDate(DateFormat.getDate(this.offenderMailLogInsertList[i].logDate), DateFormat.getDate()) === 1) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.dateshouldnotbefuture');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogInsertList[i].inoutMailType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.sentreceivedmustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogInsertList[i].contactType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contacttypemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogInsertList[i].contactName) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contactnamemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogInsertList[i].contactAddress) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contactaddressmustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogInsertList[i].mailType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.mailtypemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogInsertList[i].statusCode) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.statusmustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        this.offenderMailLogInsertList[i].offenderBookId = this.vHeaderBlock.offenderBookId;
        this.offenderMailLogInsertList[i].commentText = this.offenderMailLogInsertList[i]['commentTextTemp'];
      }
      this.offMailLogCommitBean.insertList = this.offenderMailLogInsertList;
    }
    if (this.offenderMailLogUpdatetList.length > 0) {
      for (let i = 0; i < this.offenderMailLogUpdatetList.length; i++) {
        if (!this.offenderMailLogUpdatetList[i].logDate) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.datemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (DateFormat.compareDate(DateFormat.getDate(this.offenderMailLogUpdatetList[i].logDate), DateFormat.getDate()) === 1) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.dateshouldnotbefuture');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogUpdatetList[i].inoutMailType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.sentreceivedmustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogUpdatetList[i].contactType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contacttypemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogUpdatetList[i].contactName) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contactnamemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogUpdatetList[i].contactAddress) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contactaddressmustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogUpdatetList[i].mailType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.mailtypemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailLogUpdatetList[i].statusCode) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.statusmustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        this.offenderMailLogUpdatetList[i].commentText = this.offenderMailLogUpdatetList[i]['commentTextTemp'];
      }
      this.offMailLogCommitBean.updateList = this.offenderMailLogUpdatetList;
    }
    if (this.offenderMailLogDeleteList && this.offenderMailLogDeleteList.length > 0) {
      this.offMailLogCommitBean.deleteList = this.offenderMailLogDeleteList;
    }
    this.oidomailCommitBean.offenderMailLogCommitBean = this.offMailLogCommitBean;
    return true;
  }

  offenderMailRestrictionsDataCommit(event) {
    if (!this.mailValidations()) {
      return;
    }
    this.offMailRestrictionCommitBean = new OffenderMailRestrictionsCommitBean();
    this.offenderMailRestrictionsInsertList = [];
    this.offenderMailRestrictionsUpdatetList = [];
    this.offenderMailRestrictionsDeleteList = [];
    this.offenderMailRestrictionsInsertList = event.added;
    this.offenderMailRestrictionsUpdatetList = event.updated;
    this.offenderMailRestrictionsDeleteList = event.removed;
    if (this.offenderMailRestrictionsInsertList.length > 0) {
      for (let i = 0; i < this.offenderMailRestrictionsInsertList.length; i++) {
        if (!this.offenderMailRestrictionsInsertList[i].contactType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contacttypemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailRestrictionsInsertList[i].contactName) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contactnamemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailRestrictionsInsertList[i].contactAddress) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contactaddressmustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailRestrictionsInsertList[i].startDate) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.startdatemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (DateFormat.compareDate(DateFormat.getDate(this.offenderMailRestrictionsInsertList[i].startDate), DateFormat.getDate()) === 1) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.startdateshouldnotbefuture');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailRestrictionsInsertList[i].restrictionType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.restrictiontypemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        this.offenderMailRestrictionsInsertList[i].offenderBookId = this.vHeaderBlock.offenderBookId;
        this.offenderMailRestrictionsInsertList[i].commentText = this.offenderMailRestrictionsInsertList[i]['commentTemp'];
        this.offenderMailRestrictionsInsertList[i].activeFlag = this.offenderMailRestrictionsInsertList[i].activeFlag ? 'Y' : 'N';
      }

      this.offMailRestrictionCommitBean.insertList = this.offenderMailRestrictionsInsertList;
    }
    if (this.offenderMailRestrictionsUpdatetList.length > 0) {
      for (let i = 0; i < this.offenderMailRestrictionsUpdatetList.length; i++) {
        if (!this.offenderMailRestrictionsUpdatetList[i].contactType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contacttypemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailRestrictionsUpdatetList[i].contactName) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contactnamemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailRestrictionsUpdatetList[i].contactAddress) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.contactaddressmustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailRestrictionsUpdatetList[i].startDate) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.startdatemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (DateFormat.compareDate(DateFormat.getDate(this.offenderMailRestrictionsUpdatetList[i].startDate), DateFormat.getDate()) === 1) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.startdateshouldnotbefuture');
          this.show(this.vldmsg, this.type);
          return false;
        }
        if (!this.offenderMailRestrictionsUpdatetList[i].restrictionType) {
          this.type = 'warn';
          this.vldmsg = this.translateService.translate('oidomail.restrictiontypemustbeentered');
          this.show(this.vldmsg, this.type);
          return false;
        }
        this.offenderMailRestrictionsUpdatetList[i].commentText = this.offenderMailRestrictionsUpdatetList[i]['commentTemp'];
        this.offenderMailRestrictionsUpdatetList[i].activeFlag = this.offenderMailRestrictionsUpdatetList[i].activeFlag ? 'Y' : 'N';
      }
      this.offMailRestrictionCommitBean.updateList = this.offenderMailRestrictionsUpdatetList;
    }
    if (this.offenderMailRestrictionsDeleteList && this.offenderMailRestrictionsDeleteList.length > 0) {
      this.offMailRestrictionCommitBean.deleteList = this.offenderMailRestrictionsDeleteList;
    }
    this.oidomailCommitBean.offenderMailRestrictionCommitBean = this.offMailRestrictionCommitBean;
    return true;
  }

  onContactClick = (event) => {
    let link = undefined;
    if (event) {
      if (!event.contactType) {
        this.show(this.translateService.translate('oidomail.pleaseentercontacttype'));
        return;
      } else if (!['PER', 'CORP'].includes(event.contactType)) {
        this.show(this.translateService.translate('oidomail.pleaseenteranyoneofthecontacttype'));
        return;
      }
      if (event.contactType === 'PER') {
        link = '/osipserdialog';
      } else if (event.contactType === 'CORP') {
        link = '/OUMAGENCDIALOG';
        event['mode'] = 'A';
      }
      if (link) {
        this.dialogService.openLinkDialog(link, event, 90).subscribe(result => {
          if (result) {
            const node = this.offMailRestrictGrid.gridOptions.api.getSelectedNodes().length && this.offMailRestrictGrid.gridOptions.api.getSelectedNodes()[0];
            const rowIndex = node.rowIndex;
            if (link === '/osipserdialog') {
              this.offMailRestrictGrid.setColumnData('contactName', rowIndex, result.personName);
              this.offMailRestrictGrid.setColumnData('personId', rowIndex, result.personId);
              this.offMailRestrictGrid.setColumnData('corporateId', rowIndex, undefined);
              if (result.address) {
                this.offMailRestrictGrid.setColumnData('restrictioAddressId', rowIndex, result.address.addressId);
                let address = '';
                if (result.address.suiteNumber) {
                  address = address + result.address.suiteNumber + ' ';
                }
                if (result.address.streetAddress) {
                  address = address + result.address.streetAddress + ' ';
                }
                if (result.address.cityName) {
                  address = address + result.address.cityName + ' ';
                }
                if(result.address.provStateDesc) {
                  address = address + result.address.provStateDesc + ' ';
                }
                if (result.address.zipPostalCode) {
                  address = address + result.address.zipPostalCode + ' ';
                }
                if (result.address.country) {
                  address = address + result.address.country + ' ';
                }
                this.offMailRestrictGrid.setColumnData('contactAddress', rowIndex, address);
              }
            } else {
              this.offMailRestrictGrid.setColumnData('contactName', rowIndex, result.corporateName);
              this.offMailRestrictGrid.setColumnData('personId', rowIndex, undefined);
              this.offMailRestrictGrid.setColumnData('corporateId', rowIndex, result.corporateId);
              if (result.addrData) {
                this.offMailRestrictGrid.setColumnData('restrictioAddressId', rowIndex, result.addrData.addressId);
                let address = '';
                if (result.addrData.suiteNumber) {
                  address = address + result.addrData.suiteNumber + ' ';
                }
                if (result.addrData.streetAddress) {
                  address = address + result.addrData.streetAddress + ' ';
                }
                if (result.addrData.cityName) {
                  address = address + result.addrData.cityName + ' ';
                }
                if(result.addrData.provStateDesc) {
                  address = address + result.addrData.provStateDesc + ' ';
                }
                if (result.addrData.zipPostalCode) {
                  address = address + result.addrData.zipPostalCode + ' ';
                }
                if (result.addrData.country) {
                  address = address + result.addrData.country + ' ';
                }
                this.offMailRestrictGrid.setColumnData('contactAddress', rowIndex, address);
              }
            }
          }
        });
      }
    }
  }
  mailValidations() {
    const is = { valid: true };
    let personList = this.offMailRestrictGridData.filter(e => e.contactType === 'PER');
    let corpList = this.offMailRestrictGridData.filter(e => e.contactType === 'CORP');
    for (let i = 0; i < personList.length - 1; i++) {
      for (let j = i + 1; j < personList.length; j++) {
        if (personList[i].personId === personList[j].personId &&
          personList[i].restrictioAddressId === personList[j].restrictioAddressId &&
          personList[i].activeFlag && personList[j].activeFlag &&
          personList[i].restrictionType === personList[j].restrictionType) {
          this.show('oidomail.rowalreadyexists');
          is.valid = false;
          return is.valid;
        }
      }
    }
    for (let i = 0; i < corpList.length - 1; i++) {
      for (let j = i + 1; j < corpList.length; j++) {
        if (corpList[i].corporateId === corpList[j].corporateId &&
          corpList[i].restrictioAddressId === corpList[j].restrictioAddressId &&
          corpList[i].activeFlag && corpList[j].activeFlag &&
          corpList[i].restrictionType === corpList[j].restrictionType) {
          this.show('oidomail.rowalreadyexists');
          is.valid = false;
          return is.valid;
        }
      }
    }
    return is.valid;
  }

  canCellEdit = (data: any, index: number, field: string): boolean => {
    if (field === 'restrictionType') {
      if (data.activeFlag) {
        return true;
      } else {
        return false;
      }
    }
    if (data.createDatetime) {
      return false;
    }
    return true;

  }
  cellHighlight = (cell,row) => {
    if(cell && cell == "alertCode"){
        return true;
    }
    return false;
  }
}
