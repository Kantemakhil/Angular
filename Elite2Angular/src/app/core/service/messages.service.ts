import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessagesService {

    private messagesSource = new Subject<any>();
    addMessageObservable = this.messagesSource.asObservable();

    addMessage(message: string, type: string) {
        this.messagesSource.next({message: message, type: type});
    }
}
