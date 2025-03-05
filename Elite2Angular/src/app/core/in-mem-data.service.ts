import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({providedIn: 'root'})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const offenders = [{
            id: 1,
            offenderId: '123456',
            lastName: 'SMYTHE',
            firstName: 'WILLIAM',
            middleName: '',
            birthDate: '1985-07-23',
            age: 32,
            gender: 'Male',
            offAlerts: 'XVM',
            offenderBookId: '2015-023453',
            offenderBookDate: '2015-04-18',
            prisonLocation: 'SDC - Syscon Detention Center',
            statusDisplay: 'ACTIVE',
            inOutStatus: 'IN',
            statusReason: 'NEW',
            offSupLevel: '',
            image: 'http://ww3.hdnux.com/photos/43/52/61/9350214/12/1024x1024.jpg'
        },
        {
            id: 2,
            offenderId: '0001022568',
            lastName: 'DARCY',
            firstName: 'JILL',
            middleName: '',
            birthDate: '1982-03-03',
            age: 35,
            gender: 'Female',
            offAlerts: '',
            offenderBookId: '0000022066',
            offenderBookDate: '2015-02-20',
            prisonLocation: 'ITAG [A&D]',
            statusDisplay: 'Active',
            inOutStatus: 'IN',
            statusReason: 'NEW',
            offSupLevel: 'Unclass',
            image: ''
        },
        {
            id: 3,
            offenderId: '0000023456',
            lastName: 'SMITH',
            firstName: 'BOB',
            middleName: '',
            birthDate: '1965-12-31',
            age: 52,
            gender: 'Male',
            offAlerts: 'K',
            offenderBookId: '0000021543',
            offenderBookDate: '2015-06-13',
            prisonLocation: 'Syscon Jail',
            statusDisplay: 'Inactive',
            inOutStatus: 'OUT',
            statusReason: 'BAIL',
            offSupLevel: 'Unclass',
            image: ''
        },
        {
            id: 3,
            offenderId: '0000023456',
            lastName: 'SMITH',
            firstName: 'DOUG',
            middleName: '',
            birthDate: '1965-12-31',
            age: 52,
            gender: 'Male',
            offAlerts: 'K',
            offenderBookId: '0000021543',
            offenderBookDate: '2015-06-13',
            prisonLocation: 'Syscon Jail',
            statusDisplay: 'Inactive',
            inOutStatus: 'OUT',
            statusReason: 'BAIL',
            offSupLevel: 'Unclass',
            image: ''
        },
        {
            id: 3,
            offenderId: '0000023456',
            lastName: 'SMITH',
            firstName: 'WILLIAM',
            middleName: '',
            birthDate: '1965-12-31',
            age: 52,
            gender: 'Male',
            offAlerts: 'K',
            offenderBookId: '0000021543',
            offenderBookDate: '2015-06-13',
            prisonLocation: 'Syscon Jail',
            statusDisplay: 'Inactive',
            inOutStatus: 'OUT',
            statusReason: 'BAIL',
            offSupLevel: 'Unclass',
            image: ''
        },
        {
            id: 3,
            offenderId: '0000023456',
            lastName: 'SMITH',
            firstName: 'RICHARD',
            middleName: '',
            birthDate: '1965-12-31',
            age: 52,
            gender: 'Male',
            offAlerts: 'K',
            offenderBookId: '0000021543',
            offenderBookDate: '2015-06-13',
            prisonLocation: 'Syscon Jail',
            statusDisplay: 'Inactive',
            inOutStatus: 'OUT',
            statusReason: 'BAIL',
            offSupLevel: 'Unclass',
            image: ''
        }
        ];

        const getReferenceDomainCodes = [
            { id: '1', domain: 'GENDER', code: 'M', description: 'Male', parent: '' },
            { id: '2', domain: 'GENDER', code: 'F', description: 'Female', parent: '' },
            { id: '3', domain: 'GENDER', code: 'TG', description: 'TransGender', parent: '' },

            { id: '4', domain: 'STATE', code: 'AP', description: 'Andra Pradesh adfadfaf', parent: 'IN' },
            { id: '5', domain: 'STATE', code: 'TG', description: 'Telangana', parent: 'IN' },
            { id: '6', domain: 'STATE', code: 'CA', description: 'California', parent: 'USA' },
            { id: '7', domain: 'STATE', code: 'FL', description: 'Florida', parent: 'USA' },
            { id: '8', domain: 'STATE', code: 'TX', description: 'Texas', parent: 'USA' },

            { id: '9', domain: 'COUNTRY', code: 'IN', description: 'India', parent: '' },
            { id: '10', domain: 'COUNTRY', code: 'USA', description: 'United States', parent: '' },
        ];

        const nameType = [
            { id: '1', code: 'N', text: 'Name' },
            { id: '2', code: 'F', text: 'First Name' },
            { id: '3', code: 'L', text: 'Last Name' }
        ];
        const oidincdeagencyIncidentsExecuteQuery = [{
            id:0,
            incidentId: '4826',
            incidentDate: '04-07-2018',
            time1: 1145,
            incidentType: 'Disturbance',
            facility: 'Syscon Jail',
            location: 'ITAG-A&D',
            reportedby: 'Donnan,Dave',
            time2: 1142,
            createdby: 'Dolan,dave',
            locked:true
        },{
            id:1,
            incidentId: '4486',
            incidentDate: '05-06-2017',
            time1: 1130,
            incidentType: 'Trouble',
            facility: 'Test Location',
            location: 'SDCT',
            reportedby: 'Mick,Dave',
            time2: 1010,
            createdby: 'Smith,Dough',
            locked:false

        }
        ];

        return { offenders, getReferenceDomainCodes, nameType,oidincdeagencyIncidentsExecuteQuery };
    }

}
