import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {ResponseModel} from '../interfaces/responseModel';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  API_ENDPOINT = environment.API_ENDPOINT;
  constructor(private httpCliente: HttpClient) { 
    
  }
  
  getAll(){  
    return this.httpCliente.get<ResponseModel>(this.API_ENDPOINT+'peliculas')
  }

  findById(id: number) {
    return this.httpCliente.get<ResponseModel>(this.API_ENDPOINT + 'peliculas/' + id);
  }

 
  saveMovie(movie: Movie) {
    return this.httpCliente.post(this.API_ENDPOINT + 'peliculas/create', movie);
  }

  updateMovie(id: number, movie: Movie) {
  
    return this.httpCliente.put(this.API_ENDPOINT  +"peliculas/" + id, movie);
  }


}
