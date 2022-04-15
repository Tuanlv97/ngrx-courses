import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {loadAllCourses} from './course.actions';
import {areCoursesLoaded} from './reducers/courses.reducers';

@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap(coursesLoaded => {
        if (!this.loading && ! coursesLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first(),
      finalize(() => this.loading = false)
    );
  }
  constructor(private store: Store<AppState>) {
  }
}
