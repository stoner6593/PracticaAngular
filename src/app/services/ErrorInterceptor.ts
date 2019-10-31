import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } 
from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {DataTransferService} from './data-transfer.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public toasterService: ToastrService,private dataTransferService: DataTransferService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                  
                    if (error.status === 401) {
                        return throwError(error.statusText);
                    }

                    if (error.status === 422) {
                        
                       /* this.toasterService.warning("Error "+error.status, 
                        error.error.errors.name, { positionClass: 'toast-top-center' });*/
                        this.dataTransferService.changeMessage(error.error.errors.name);
                    }

                    const serverError = error.error;
                    let modalStateError = '';
                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modalStateError += serverError[key] + '\n';
                            }
                        }
                    }

                    return throwError(modalStateError || serverError || 'Server Error');
                }
            }),
        );
    }

}