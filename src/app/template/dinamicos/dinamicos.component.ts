import { Component} from '@angular/core';



interface Persona{
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito{
  id: number;
  nombre: string;

}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent{

  persona: Persona = {
    nombre: 'Bruno',
    favoritos: [
      {id: 1 , nombre: 'Lost Ark'},
      {id: 2 , nombre: 'Borderlands 3'},

    ]
  };
  nuevoJuego:string = '';


  guardar(){
    console.log('Formulario Posteado');
  }

  eliminar(posicion:number){
    this.persona.favoritos.splice(posicion,1);
  }
  agregarJuego(){
    const nuevoFavortio: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavortio});
    this.nuevoJuego = '';
  }

}
