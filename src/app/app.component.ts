import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  currentDate: Date;
  startOfWeek: Date;
  endOfWeek: Date;
  weekStartDays: Date[] = new Array<Date>();
  ngOnInit() {
    this.findWeekStartDaysInRange(
      2021,
      new Date('11-11-2021'),
      new Date('11-12-2021'),
      1
    );
  }

  getWeekDays() {
    this.currentDate = new Date('11-11-2021'); // get current date
    let rangeDate = new Date(this.currentDate);
    var first = rangeDate.getDate() - rangeDate.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(rangeDate.setDate(first));
    var lastday = new Date(rangeDate.setDate(last));

    this.startOfWeek = firstday;
    this.endOfWeek = lastday;
    console.log(this.currentDate.toLocaleDateString());
    console.log(this.startOfWeek.toLocaleDateString());
    console.log(this.endOfWeek.toLocaleDateString());
  }

  findWeekStartDaysInRange(
    year: number,
    startDate: Date,
    endDate: Date,
    weekDay
  ) {
    if (!endDate) {
      endDate = new Date();
      endDate.setFullYear(year, 0, 1);
      endDate.setDate(endDate.getDate() + 7);
    }

    this.startOfWeek = startDate;
    this.endOfWeek = endDate;
    // get first date of the range
    let rangeDate = new Date(this.currentDate);
    // if weekday is monday then 1 , if sunday then 0, tuesday - 3
    let first = rangeDate.getDate() - rangeDate.getDay() + weekDay;
    var firstday = new Date(rangeDate.setDate(first));

    if (firstday > new Date()) {
      return;
    } else {
      this.weekStartDays.push(firstday);
      // find the week of the end day of the range
      if (!endDate) {
        endDate = new Date();
      }

      let endDateFirstDayOfWeek =
        endDate.getDate() - endDate.getDay() + weekDay;

      while (rangeDate <= endDate) {
        if (rangeDate >= startDate && rangeDate <= endDate) {
          this.weekStartDays.push(rangeDate);
        }
        rangeDate.setDate(rangeDate.getDate() + 7);
      }
    }
  }
}
