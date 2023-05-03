import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit{

  //creo input porque le voy a pasar 1 gif por parametro
  @Input()
  public gif!: Gif; //lleva "!" porque nunca va a ser nulo

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required');
  }

}
