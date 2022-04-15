import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {CourseEntityService} from '../services/course-entity.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {selectAddvancedCourses, selectBeginnerCourses, selectPromoTotal} from '../courses.selectors';


@Component({
  // tslint:disable-next-line:component-selector
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(
      private dialog: MatDialog,
      private store: Store<AppState>) {

    }

    ngOnInit() {
      this.reload();
    }

  reload() {
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));

    this.advancedCourses$ = this.store.pipe(select(selectAddvancedCourses));

    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
