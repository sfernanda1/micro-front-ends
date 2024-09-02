import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parceiros } from '../parceiro.model';
import { ParceirosService } from './../../services/parceiros.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  companies: Parceiros[] = [];
  displayedCompanies: Parceiros[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  constructor(
    private parceirosService: ParceirosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = +params['page'];
      this.currentPage = page > 0 ? page : 1;
      this.loadCompanies();
    });
  }

  loadCompanies() {
    this.parceirosService.getCompanies().subscribe(
      (data) => {
        this.companies = data.map(parceiros => ({
          ...parceiros,
          createdAt: new Date(parceiros.createdAt).toLocaleDateString()
        }));
        this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
        this.updateDisplayedCompanies();
      },
      (error) => {
        console.error('Erro ao carregar empresas', error);
      }
    );
  }

  updateDisplayedCompanies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCompanies = this.companies.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedCompanies();
      this.updateUrl();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCompanies();
      this.updateUrl();
    }
  }

  updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  openModal(parceiros: Parceiros) {
    this.modalComponent.openModal(parceiros);
  }

  openModalForNew() {
    const newParceiro: Parceiros = {
      id: '',
      name: '',
      description: '',
      repositoryGit: '',
      urlDoc: '',
      clients: [],
      projects: [],
      createdAt: ''
    };
    this.modalComponent.openModal(newParceiro);
  }

  saveParceiros(parceiros: Parceiros) {
    if (parceiros.id) {
      this.parceirosService.updateParceiros(parceiros.id, parceiros).subscribe(
        (updatedParceiros) => {
          const index = this.companies.findIndex(c => c.id === updatedParceiros.id);
          if (index !== -1) {
            this.companies[index] = updatedParceiros;
          }
          this.updateDisplayedCompanies();
        },
        (error) => {
          console.error('Erro ao atualizar o parceiro', error);
        }
      );
    } else {
      this.parceirosService.addParceiros(parceiros).subscribe(
        (newParceiros) => {
          this.companies.push(newParceiros);
          this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
          this.updateDisplayedCompanies();
        },
        (error) => {
          console.error('Erro ao adicionar parceiro', error);
        }
      );
    }
  }

  deleteParceiros(index: number) {
    const parceiro = this.displayedCompanies[index];
    this.parceirosService.deleteParceiros(parceiro.id).subscribe(
      () => {
        const originalIndex = this.companies.findIndex(c => c.id === parceiro.id);
        if (originalIndex !== -1) {
          this.companies.splice(originalIndex, 1);
          this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
          this.updateDisplayedCompanies();
        }
        console.log('Parceiro excluído com sucesso:', parceiro);
      },
      (error) => {
        console.error('Erro ao excluir o parceiro', error);
      }
    );
  }
}
