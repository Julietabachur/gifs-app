import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({  providedIn: 'root'})

export class GifsService {

  public gifList: Gif[] = []

  // propiedad para almacenar todo lo que la persona va buscando
  private _tagsHistory: string[] = []
  private apiKey: string = "Rk1JWfv9wgR5PW4iT6CxPFrSMktiGyoI" //mi clave de acceso a la API
  private serviceUrl: string = "https://api.giphy.com/v1/gifs" //guardo la url en una prop para dps pasarla como param y hacerla mas corta

  //inyecto el httpCliente y cargo lo guardado en local storgae
  constructor(private http: HttpClient ) {

    this.loadLocalStorage()
    console.log("Gifs service ready");


   }
  // crea getter para mostrar info del array privado de gifs
  get tagsHistory(){
    return [...this._tagsHistory]
  }

  //metodo que valida el tag
  private organizeHistory(tag: string){
    //visualmente se va a ver como dice el pipe, pero el js lo usamos en minuscula xq es case sensitive
    tag = tag.toLocaleLowerCase()

    //si el tag ya esta en la lista, crea una lista nueva con los tags que sean diferentes a que se ingreso

    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(   (oldTag) => oldTag !== tag)
    }

    //luego pone el tag en la lista de nuevo pero primero de todos (como más reciente busqueda)
    this._tagsHistory.unshift(tag)

    //limita la cantidad de busquedas ecientes que se muestran a 10
    this._tagsHistory= this._tagsHistory.splice(0, 10)
    this.saveLocalStorage()

  }

  //crea metodo para guardar lo buscado en localStorage y la llama dentro de organizeHistory()
  private saveLocalStorage(): void{
    localStorage.setItem("history", JSON.stringify( this._tagsHistory) )
  }

  //creo metodo para traer lo q uarde en localStorage
  private loadLocalStorage(): void{
    //si no hay un historial no me devuelvas nada
    if ( !localStorage.getItem("history")) return;
    //si hay historial, el historial va a ser = al historial guardado en localstorage y le pongo ! para que js entienda quen nunca va ser un valor nulo
    this._tagsHistory = JSON.parse( localStorage.getItem("history")! )

    //cuando se recarga la pagina, si no hay busquedas previas no muestra nada, pero si hay muestra la primera
    if (this._tagsHistory.length === 0) return;
     this.searchTag(this._tagsHistory[0])
  }


  // crea metodo para agregar una busqueda al principio del array
  searchTag(tag: string):void{
    if (tag.length === 0) return;
    this.organizeHistory(tag)

    //creo objeto params en donde guardo los parametros de mi peticion
    const params= new HttpParams()
    .set("api_key", this.apiKey)
    .set("limit", "10")
    .set("q", tag)


  //hago peticion como fetch() y .then() pero version angular
  //la respuesta del get va a ser tipo SearchResponse que es la interfaz que saque de giphy
  this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
  .subscribe(resp => {

    this.gifList = resp.data
    console.log({ gifs: this.gifList })
  })

  }

}
