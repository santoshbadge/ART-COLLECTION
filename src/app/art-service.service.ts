import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtServiceService {  

  constructor(private httpClient: HttpClient) { }

  getArtData(url: string) {
    return this.httpClient.get(url)
  }

  getImageURL(url: string) {
    return this.httpClient.get(url);
  }
}
