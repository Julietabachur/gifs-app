import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template:  `
  <h5>Buscar:</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  #txtTagInput
  (keyup.enter)="searchTag()"
  >`
})
export class SearchBoxComponent {


  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  // inyeecto servicio en el constructor para poder usar los metodos creado en el
   constructor(private gifsService: GifsService){}

  searchTag(){
    const newTag = this.tagInput.nativeElement.value
    console.log(newTag);

    this.gifsService.searchTag(newTag)

    //limpio la caja de texto para que se vea vacia de nuevo
    this.tagInput.nativeElement.value=''

  }

}
