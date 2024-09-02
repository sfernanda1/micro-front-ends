import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '../company.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() company!: Company;
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
