import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movies';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MoviesService} from '../services/movies.service';
import { ResponseModel } from '../interfaces/responseModel';
import { ActivatedRoute, Router } from '@angular/router';
import {DataTransferService} from '../services/data-transfer.service'
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {

  
  formMovie: FormGroup;
  private id: number;

  constructor(
    private formBuilder : FormBuilder, 
    private moviesService: MoviesService, 
    private router : Router,
    private activatedRouter : ActivatedRoute,
    private toastr: ToastrService,
    private dataTransfer: DataTransferService ) {
      
      //this.showMessage();
     }


  ngOnInit() {


    this.id = this.activatedRouter.snapshot.params['id'];

    this.formMovie = this.formBuilder.group({
      id: ['',
        Validators.compose([
          Validators.required,
       
        ]),
      ],
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

    this.moviesService.findById(this.id).subscribe(
      (result: ResponseModel) => {
          const movie: Movie= result.message; 
          this.formMovie.reset();
          this.formMovie.setValue({
            id: movie.id,
            name: movie.name,
            description: movie.description,
            genre: movie.genre,
            duration : movie.duration

          })
      });
  }

  updateMovie(){
    const movie: Movie = {
      //id:this.formMovie.value.id,
      name: this.formMovie.value.name,
      description: this.formMovie.value.description,
      genre: this.formMovie.value.genre,
      duration: this.formMovie.value.duration
    };
    this.showMessage();
    this.moviesService.updateMovie(this.id, movie).subscribe(
      (result: ResponseModel) => {        
        if (result.success) {
          this.toastr.success('Pelicula actualizada');
          this.router.navigate(['home']);
        }
    });

  }

  showMessage(): void {
   
    this.dataTransfer.currentMessage.pipe(take(1)).subscribe(message => {
      if (message !== '') {
        this.toastr.success('MENSAJE DEL SISTEMA', message);
        this.dataTransfer.changeMessage('');
      }
    })
   
  }

}
