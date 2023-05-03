import { Gif } from '../../interfaces/gifs.interfaces';
import { GifsService } from './../../services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent {

  constructor(public gifsService: GifsService){}

  get gifs() : Gif[]{
    return this.gifsService.gifList
  }

}
