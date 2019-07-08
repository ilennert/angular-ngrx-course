
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError, concatMap, exhaustMap, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {Actions, ofType, createEffect} from '@ngrx/effects';

import * as CourseActions from './course.actions';
import {CoursesService} from './services/courses.service';
import {AppState} from '../reducers';
import {allCoursesLoaded} from './course.selectors';

@Injectable()
export class CourseEffects {

  loadCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseRequested),
      mergeMap(action => this.coursesService.findCourseById(action.courseId)),
      map(course => CourseActions.courseLoaded(course)),
      catchError(err => {
        console.log('error loading course ', err);
        return throwError(err);
      })
    )
  );

  loadAllCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.allCoursesRequested),
      withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
      filter(([action, coursesLoaded]) => !coursesLoaded),
      mergeMap(() => this.coursesService.findAllCourses()),
      map(courses => CourseActions.allCoursesLoaded(courses)),
      catchError(err => {
        console.log('error loading all courses ', err);
        return throwError(err);
      })
    )
  );

  constructor(private actions$: Actions, private coursesService: CoursesService,
              private store: Store<AppState>) {
  }

}
