import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl: string = environment.apiUrl;

    constructor(public http: HttpClient) {
    }

    public sendOTP(data) {
        return this.http.post(`${this.apiUrl}/send-otp`, data);
    }

    public startSession(data) {
        return this.http.post(`${this.apiUrl}/session`, data);
    }

    public deleteSession() {
        return this.http.delete(`${this.apiUrl}/session`);
    }

    public getAllPeople() {
        return this.http.get(`${this.apiUrl}/people`);
    }

    public getMe() {
        return this.http.get(`${this.apiUrl}/people/me`);
    }

    public getPerson(id) {
        return this.http.get(`${this.apiUrl}/people/${id}`);
    }

    public postPoke(data) {
        return this.http.post(`${this.apiUrl}/pokes`, data);
    }

    public deletePoke(id) {
        return this.http.delete(`${this.apiUrl}/pokes/${id}`);
    }

    public getPersonPokes(id) {
        return this.http.get(`${this.apiUrl}/pokes/person/${id}`);
    }

    public getRandomPoke() {
        return this.http.get(`${this.apiUrl}/pokes/random`);
    }

    public voteForPoke(id, data) {
        return this.http.post(`${this.apiUrl}/votes/poke/${id}`, data);
    }

    public unVoteForPoke(id) {
        return this.http.delete(`${this.apiUrl}/votes/poke/${id}`);
    }
}
