import {compareCourses, Course} from '../model/course';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import {CourseActions} from '../action-type';
import {selectCoursesState} from '../courses.selectors';

export interface CoursesState extends  EntityState<Course> {
  allCoursesLoaded: boolean;

}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});
export const initialCoursesState = adapter.getInitialState( {
  allCoursesLoaded: false
});

export const  coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded,
    (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true})),

  on(CourseActions.courseUpdated,
    (state, action) => adapter.updateOne(action.update, state)),
);

export const {
  selectAll
} =  adapter.getSelectors();

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
