import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '../company.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() company: Company = {
    id: '',
    companyName: '',
    collaboratorsCount: 0,
    isActive:false,
    createdAt: '',
    lastSubmit: '',
    name: '',
  };
  @Output() save = new EventEmitter<Company>();
  isOpen = false;

  openModal(company: Company) {
    this.company = { ...company };
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onSubmit() {
    this.save.emit(this.company);
    this.closeModal();
  }
}
