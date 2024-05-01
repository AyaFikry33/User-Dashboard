import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  private cache = new Map<string, any[]>();
  public cache$ = new BehaviorSubject<any[]>(null!);

  // The 'set' method for storing data in the cache.
  set(key: string, data: any[]): void {
    if (this.cache.has(key)) {
      throw new Error(`Data already exists for key '${key}'. Use a different key or delete the existing one first.`);
    }
    this.cache.set(key, data);
    this.cache$.next(this.cache.get(key)!);
  }

  // The 'get' method for retrieving data from the cache.
  get(key: string){
    const data = this.cache.get(key);
    this.cache$.next(data!);
    return data;
  }

  // The 'clear' method to clear data from the cache.
  clear(key: string): void {
    this.cache.delete(key);
    this.cache$.next(null!);
  }

}
