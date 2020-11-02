import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private _http: HttpClient) {
    console.log('service running');
  }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQB3A_Fs2AoBfDTgTdaF5Tgfiuc7h_WYjX7Xa-gLqQmluDTJav2L3c8mDqdO19Wp2P6ueCofsAmadEoK_mQ'
    });

    return this._http.get(url, {headers});
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases')
      .pipe( map( data => data['albums'].items));
  }

  getArtistas(termino: string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe( map(data => data['artists'].items));
  }

  getArtist(id: string){
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?market=ES`)
      .pipe( map(data => data['tracks']));
  }
}
