import { Component, OnInit, ViewChild, 
  HostListener, AfterViewInit, ChangeDetectorRef, ElementRef, 
  ViewContainerRef, ComponentFactoryResolver, Renderer2 } from '@angular/core';
import { MoviesService } from '../services/movies.service' ;
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movies';
import { ResponseModel } from '../interfaces/responseModel';
import { MdbTableDirective,ButtonsModule,MdbTablePaginationComponent,MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {DataTransferService} from '../services/data-transfer.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  modalRef: MDBModalRef;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective

  elements: any = [];
  previous: any = [];
  movies : Movie[];
  headElements = ['ID', 'First', 'Last', 'Handle','#'];
  searchText: string = '';
  dataPassToChild: any = null;
  modalBody: any;

  constructor(
    private movieServices: MoviesService,
    private httpCliente: HttpClient,
    private dataTransfer : DataTransferService,
    private router: Router,
    private buttonsModule : ButtonsModule,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private elRef: ElementRef,
    private renderer: Renderer2, 
    private resolver: ComponentFactoryResolver
   
    

    ) { 
      console.log(elRef.nativeElement.tagName);
    }
   
   
  
    
  @HostListener('input') oninput() {
    this.searchItems();
  }
  

  ngOnInit() {
  
    this.getAll();
  
   
    
  }
  modalOptions = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    containerClass: '',
    animated: true,
    data: {
        heading: 'Agregar pelicula',
        //content: { heading: 'algo por aqui', description: 'Content description'}
        //content:`<h1>11</h1>`
    }
  }  

  /**
   * Abre modal
   */ 

  openModal() {
    //this.modalRef = this.modalService.show(ModalComponent)    

    this.modalRef = this.modalService.show(ModalComponent,  this.modalOptions );

  }


  /**
   * Obtiene todos los registros
   */
  getAll(){    

    this.movieServices.getAll().subscribe((data : ResponseModel) =>{
      if(data.success){
      
        this.movies=data.message;  
        this.mdbTable.setDataSource(this.movies);
        this.movies = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        this.elements=this.movies;
         
      }else{

      }
      
          
    })

  } 

  /**
   * Recibe clase Movie para buscar y mostrar en pantalla
   * @param movie 
   */
  verPelicula(movie: Movie){
    if (movie) {

      this.router.navigate(['/form-edit', movie.id]);
    }
  }

  /**
   * Busca registros en tabla
   */
  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.movies = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
     
      this.movies = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();

    

  }


 
    
}
