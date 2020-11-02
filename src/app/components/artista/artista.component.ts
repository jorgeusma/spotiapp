import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {

  artist: any = {};
  loading: boolean;
  topTracks: any[] = [];

  constructor( private _router: ActivatedRoute, private _spotify: SpotifyService ) {
    this._router.params.subscribe( params => {
      console.log(params['id']);
      this.loading = true;
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string){
    this._spotify.getArtist(id).subscribe(data => {
      this.artist = data;
      this.loading = false
    });
  }

  getTopTracks(id: string){
    this._spotify.getTopTracks(id)
          .subscribe(data => {
            console.log(data)
            this.topTracks = data;
          });
  }


}
