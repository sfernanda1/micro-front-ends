import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Parceiros } from '../parceiro.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() parceiro: Parceiros = {
    id: '',
    name: '',
    description: '',
    repositoryGit: '',
    urlDoc: '',
    clients: [],
    projects: [],
    createdAt: ''
  };
  @Output() save = new EventEmitter<Parceiros>();
  isOpen = false;

  openModal(parceiro: Parceiros) {
    this.parceiro = { ...parceiro };
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onSubmit() {
    this.save.emit(this.parceiro);
    this.closeModal();
  }
}
