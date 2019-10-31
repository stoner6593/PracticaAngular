import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor() {
    this.messageSource.next('');

    //this.showMessage(); este se llama en los componentes para mostrar algun mensaje
  }

  changeMessage(message: string) {
    this.messageSource.next(message);

  }
}

/*
showMessage(): void {
    this.subs.add(
      this.dataTransfer.currentMessage.pipe(take(1)).subscribe(message => {
        if (message !== '') {
          this.toastr.success('MENSAJE DEL SISTEMA', message);
          this.dataTransfer.changeMessage('');
        }
      }),
    );
  }
*/
