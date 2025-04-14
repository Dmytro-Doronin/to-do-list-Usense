import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { baseUrl } from '../../mock-data/base-url'

export const baseUrlInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const newRequest = request.clone({
    url: `${baseUrl}/${request.url}`,
  })

  return next(newRequest)
}
