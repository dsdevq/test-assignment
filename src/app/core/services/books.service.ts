import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/shared/models/book.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BooksService {
  constructor(private http: HttpClient) {}

  public getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${environment.url}/api/v1/Books`);
  }

  public addBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(`${environment.url}/api/v1/Books`, {
      ...book,
    });
  }

  public editBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${environment.url}/api/v1/Books/${book.id}`, {
      ...book,
    });
  }
}
