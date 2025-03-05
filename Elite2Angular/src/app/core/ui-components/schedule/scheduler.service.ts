import { Injectable } from '@angular/core';

import { HttpService } from '@core/service/http.service';
@Injectable({providedIn: 'root'})
export class SchedulerService {
    backBtnFlag: boolean;
    constructor(private http: HttpService) { }
    getData(obj) {
        return this.http.post('calsch/getEventData', obj);

       /*let schdules = [
        {
          Id: 1,
          Subject: 'APP', // type
          subType : 'HOME', // subType
          Location: 'APC', // to Location
          StartTime: new Date(2022, 7, 20, 9, 30), // start date and time - year,month,date,hour,min
          EndTime: new Date(2022, 7, 20, 11, 0),   // end date and time - year,month,date,hour,min
          CategoryColor: '#1aaa55', // color of schedule in parent calendar
          staffName : 'staff 1',
          Description : 'comment for schedule 1' // comment
        }, {
          Id: 2,
          Subject: 'APP',
          subType : 'WAP',
          Location: 'CTC',
          StartTime: new Date(2022, 7, 25, 14, 0),
          EndTime: new Date(2022, 7, 25, 16, 0),
          CategoryColor: '#357cd2',
          staffName : 'staff 2',
          Description : 'comment for schedule 2'
        }, {
          Id: 3,
          Subject: 'INST',
          subType : 'VISIT',
          Location: 'CC',
          StartTime: new Date(2022, 7, 28, 10, 30),
          EndTime: new Date(2022, 7, 28, 11, 0),
          CategoryColor: '#7fa900',
          staffName : 'staff 3',
          Description : 'In every 3 days',
          RecurrenceRule: 'FREQ=DAILY;INTERVAL=3;UNTIL=20221022;',
        },  
        {
          Id: 4,
          Subject: 'SUBSTANCE',
          subType : 'TESTING',
          Location: 'CO101',
          StartTime: new Date(2022, 7, 15, 12, 0),
          EndTime: new Date(2022, 7, 15, 14, 0),
          CategoryColor: '#357cd2',
          staffName : 'All team',
          Description : 'Scrum meeting',
          RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1',
        },
        {
          Id: 5,
          Subject: 'APP',
          subType : 'WAP',
          Location: 'CO102',
          StartTime: new Date(2022, 8, 19, 14, 0),
          EndTime: new Date(2022, 8, 19, 15, 0),
          CategoryColor: '#357cd2',
          staffName : 'All team',
          Description : 'Project demo',
          RecurrenceRule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=MO;",
        }
       ];
       return of(schdules)*/
    }
    

    updateViewClickData(obj) {
      return this.http.post('calsch/updateViewClickData', obj);
   }
    }






