import {Component, Inject} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent {
  modalRef: BsModalRef;

  constructor(@Inject(BsModalRef) public message: string) {}


}
