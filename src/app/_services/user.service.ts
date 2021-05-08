import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const API_URL = 'http://devimatch-env.eba-yjx2kj8u.eu-central-1.elasticbeanstalk.com/';
const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(id: number): Observable<any> {
    return this.http.get(API_URL + 'user/' + id, { responseType: 'text' });
  }

  getPlayerBoard(id: any): Observable<any> {
    return this.http.get(API_URL + 'player/' + id, { responseType: 'text' });
  }

  getTrainerBoard(id: number): Observable<any> {
    return this.http.get(API_URL + 'trainer/' + id, { responseType: 'text' });
  }

  getOwnerBoard(id: number): Observable<any> {
    return this.http.get(API_URL + 'owner/' + id + '/trainers/schedule', { responseType: 'text' });
  }

  getPlayersForOwner(id: number): Observable<any> {
    return this.http.get(API_URL + 'owner/' + id + '/players', { responseType: 'text' });
  }

  getPlayersStatusForOwner(id: any): Observable<any> {
    return this.http.get(API_URL + 'owner/' + id + '/players/status', { responseType: 'text' });
  }

  getTrainersForOwner(id: number): Observable<any> {
    return this.http.get(API_URL + 'owner/' + id + '/trainers', { responseType: 'text' });
  }

  getAllLocations(): Observable<any> {
    return this.http.get(API_URL + 'location', { responseType: 'text' });
  }

  createSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(API_URL + 'owner/schedule' , schedule);
  }

  addPackage(apackage: any): Observable<any> {
    return this.http.post<any>(API_URL + 'owner/package' , apackage);
  }
}
