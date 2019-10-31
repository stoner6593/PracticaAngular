import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../interfaces/movies';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MoviesService} from '../services/movies.service';
import { ResponseModel } from '../interfaces/responseModel';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MDBModalRef } from 'angular-bootstrap-md';





@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formMovie: FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    private moviesService: MoviesService,
    private router : Router,
    private toast: ToastrService,
    public modalRef: MDBModalRef,
 
     
     ){ }

  ngOnInit() {
    this.formMovie = this.formBuilder.group({
      name: ['',
        Validators.compose([
          Validators.required,
       
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.required,
       
        ]),
      ],
      genre: [
        '',
        Validators.compose([
          Validators.required,
       
        ]),
      ],
      duration: [
        ''
      ]
      
    });
  }

  	
@Output() refresh = new EventEmitter<any>();

  /**
   * Agregado Input para mostrar formulario en modal
   */
  @Input() message: string;
  
  saveMovie(){
    const movie: Movie = {
      name: this.formMovie.value.name,
      description: this.formMovie.value.description,
      genre: this.formMovie.value.genre,
      duration: this.formMovie.value.duration
      
    };
    this.moviesService.saveMovie(movie).subscribe(
      (result: ResponseModel)=>{
       
        if (result.success) {
          this.formMovie.reset();
          this.toast.success( 'Pelicula registrada');
          this.router.navigate(['home']);
          this.modalRef.hide();
          this.refresh.emit('hgghgs');
        } else {
          
        }
      }
    );
  }

}
