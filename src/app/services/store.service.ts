import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class StoreService {

    public curMessage: BehaviorSubject<string> = new BehaviorSubject(null);
    public errMsg: Subject<any> = new Subject<any>();
    public needUserUpdate: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isOffline: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
