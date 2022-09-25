import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtServiceService } from './art-service.service';
import { ArtCollection } from './art.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Art Collection';
  artData: any;
  baseiiifURL: any;
  apiLink: any = [];
  finalGalleryData: ArtCollection[];
  unSubscribeArt: Subscription;
  page = 1;
  count = 0;
  perPage = 8;
  nextURL: string;
  prevURL: string;
  filterList: any = [];
  finalFilterList: any = [];

  url = 'https://api.artic.edu/api/v1/artworks?limit=8';
  constructor(private artService: ArtServiceService) {
  }

  /* Ng Oninit Lifecycle hook */
  ngOnInit(): void {
    this.fetchData(this.url);
  }

  /* Function to fetch image details from service and create a list of objects with required properties*/
  fetchData(url: string) {
    this.unSubscribeArt = this.artService.getArtData(url).subscribe(
      (data: any) => {
        if (data) {
          this.artData = data;
          this.baseiiifURL = data.config.iiif_url;
          this.count = data.pagination.total;
          this.page = data.pagination.current_page;
          this.nextURL = data.pagination.next_url;
          this.prevURL = data.pagination.prev_url;
          this.finalGalleryData = [];
          this.apiLink = [];
          for (let i = 0; i < this.artData.data.length; i++) {
            this.finalGalleryData.push({
              image: '',  //https://upload.wikimedia.org/wikipedia/commons/3/32/Art_Institute_of_Chicago_logo.svg
              artWorkName: this.artData.data[i].artwork_type_title,
              artist: this.artData.data[i].artist_title,
              material: this.artData.data[i].medium_display,
              dateStart: this.artData.data[i].date_start,
              dateEnd: this.artData.data[i].date_end,
              location: this.artData.data[i].place_of_origin
            });


            let url = 'https://api.artic.edu/api/v1/artworks/' +
              this.artData.data[i].id +
              '?fields=id,title,image_id';

            this.apiLink.push(url);
            this.collectFilterByData(this.artData.data[i].style_titles, i);
          }

          for (let i = 0; i < this.apiLink.length; i++) {
            this.getImageURL(this.apiLink[i], this.finalGalleryData[i]);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /* Function to get actual image URL */
  getImageURL(url: string, obj: any) {
    this.artService
      .getImageURL(url)
      .subscribe(
        (response: any) => {
          let url
          if (response && response.data.image_id) {
            url = this.baseiiifURL + '/' + response.data.image_id + '/full/843,/0/default.jpg'; // Actual Image
          } else {
            url = "https://upload.wikimedia.org/wikipedia/commons/3/32/Art_Institute_of_Chicago_logo.svg"; // Default image if actual image is not loaded
          }
          obj.image = url;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  /* Function to prepare a list for Filter dropdown */
  collectFilterByData(titles: any, index: number) {
    for (let i = 0; i < titles.length; i++) {
      this.filterList.push(titles[i]);
    }

    if (index == this.perPage - 1 && this.filterList.length > 0) {
      const counts: any = {};
      this.filterList.forEach(function (x: any) { counts[x] = (counts[x] || 0) + 1; });
      for (let i = 0; i < counts.length; i++) {
        this.finalFilterList.push(counts.toString());
      }
      this.finalFilterList = counts;
    }
  }

  /* Function to fetch previous set of images from service */
  prevPage() {
    this.fetchData(this.prevURL);
  }

  /* Function to fetch next set of images from service */
  nextPage() {
    this.fetchData(this.nextURL);
  }

  /* Function to apply sort logic on images */
  applySort(): void {
    // Note: Not found example to pass value from template to controller, so just hardcoded the option to "Name"
    // Did not recieve info from document  https://allianz.github.io/ng-aquila/documentation/dropdown/overview
    let option = 'Name';
    let url;
    if (option === 'Name') {
      url = "https://api.artic.edu/api/v1/artworks?limit=8&sort=artist_id";
    } else if (option === 'Artist') {
      url = "https://api.artic.edu/api/v1/artworks?limit=8&sort=artwork_type_id";
    } else {
      url = "https://api.artic.edu/api/v1/artworks?limit=8&sort=date_start";
    }
    this.fetchData(url);
  }


  /* Function to apply filter logic on images */
  applFfilter(): void {
    // Note: Using ngFor is causing this function to execute multiple times,
    // Did not recieve info from document  https://allianz.github.io/ng-aquila/documentation/dropdown/overview
    let url = "https://api.artic.edu/api/v1/artworks?limit=8&query=Japan";
    // this.fetchData(url);
  }

  /* Ng Destroy Lifecycle hook */
  ngOnDestroy(): void {
    this.unSubscribeArt.unsubscribe();
  }
}
