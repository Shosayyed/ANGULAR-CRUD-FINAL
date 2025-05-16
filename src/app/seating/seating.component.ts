import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeatingService } from './seating.service';

@Component({
  selector: 'app-seating',
  templateUrl: './seating.component.html'
})
export class SeatingComponent implements OnInit {
  form: FormGroup;
  list: any[] = [];
  isEdit = false;
  editId = 0;

  constructor(private fb: FormBuilder, private service: SeatingService) {
    this.form = this.fb.group({
      seatingSectionName: ['', Validators.required],
      discPerc: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      discEndDate: ['', Validators.required],
      allowIncentive: [false]
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
  this.service.getAll().subscribe({
    next: (res: any) => {
      console.log('Raw response:', res); // Debug
      this.list = res.data;               // Fix here
      console.log('Loaded list:', this.list);
    },
    error: err => {
      console.error('Load error:', err);
    }
  });
}

  save() {
    if (this.form.invalid) {
      alert('Please fill all fields properly');
      return;
    }

    const f = this.form.value;

    const data = {
      id: this.isEdit ? this.editId : 0,
      seatingSectionName: f.seatingSectionName,
      discPerc: f.discPerc,
      discEndDate: new Date(f.discEndDate).toISOString(),
      allowIncentive: f.allowIncentive ? 'true' : 'false'
    };

    console.log('Sending to API:', data);

    const op = this.isEdit
      ? this.service.update(data)
      : this.service.create(data);

    op.subscribe({
      next: () => {
        this.reset();
        this.load();
      },
      error: err => {
        console.error('API error:', err);
        alert('Error saving data. Please check console.');
      }
    });
  }

  edit(item: any) {
    this.form.patchValue({
      seatingSectionName: item.seatingSectionName,
      discPerc: item.discPerc,
      discEndDate: item.discEndDate.substring(0, 10),
      allowIncentive: item.allowIncentive === 'true'
    });
    this.isEdit = true;
    this.editId = item.id;
  }

  remove(id: number) {
    if (!confirm('Are you sure to delete?')) return;
    this.service.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.form.reset();
    this.isEdit = false;
    this.editId = 0;
  }
}
