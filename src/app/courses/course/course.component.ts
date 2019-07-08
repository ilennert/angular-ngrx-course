import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from 'rxjs';
import {LessonsDataSource} from '../services/lessons.datasource';


@Component({
// tslint:disable-next-line: component-selector
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course: Course;

    dataSource: LessonsDataSource;

    displayedColumns = ['seqNo', 'description', 'duration'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit() {

        this.course = this.route.snapshot.data['course'];

    }

    ngAfterViewInit() {


    }

    loadLessonsPage() {
    }


}
