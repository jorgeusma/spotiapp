import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private _spotify: SpotifyService) {

    this.loading = true;
    this.error = false;

    this._spotify.getNewReleases().subscribe((data: any) => {
      console.log(data)
      this.nuevasCanciones = data;
      this.loading = false;
    }, (err) => {
      this.loading = false;
      this.error = true;
      this.errorMessage = err.error.error.message; 
      console.log(err.error.error.message);
    });
  }

}
