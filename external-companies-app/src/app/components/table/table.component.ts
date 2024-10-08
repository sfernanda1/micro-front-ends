import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company.model';
import { CompanyService} from './../../services/company.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  companies: Company[] = [];
  displayedCompanies: Company[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  constructor(
    private companiesService: CompanyService,
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
    this.companiesService.getCompanies().subscribe(
      (data) => {
        this.companies = data.map(companies => ({
          ...companies,
          createdAt: new Date(companies.createdAt).toLocaleDateString()
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

  openModal(companies: Company) {
    this.modalComponent.openModal(companies);
  }

  openModalForNew() {
    const newCompany: Company = {
      id:'',
      companyName: '',
      collaboratorsCount: 0,
      isActive: false,
      createdAt: '',
      lastSubmit: '',
      name: ''
    };
    this.modalComponent.openModal(newCompany);
  }

  saveCompanies(companies: Company) {
    if (companies.id) {
      this.companiesService.updateCompany(companies.id, companies).subscribe(
        (updatedCompanies) => {
          const index = this.companies.findIndex(c => c.id === updatedCompanies.id);
          if (index !== -1) {
            this.companies[index] = updatedCompanies;
          }
          this.updateDisplayedCompanies();
        },
        (error) => {
          console.error('Erro ao atualizar o company', error);
        }
      );
    } else {
      this.companiesService.addCompany(companies).subscribe(
        (newCompanies) => {
          this.companies.push(newCompanies);
          this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
          this.updateDisplayedCompanies();
        },
        (error) => {
          console.error('Erro ao adicionar company', error);
        }
      );
    }
  }

  deleteCompanies(index: number) {
    const company = this.displayedCompanies[index];
    this.companiesService.deleteCompany(company.id).subscribe(
      () => {
        const originalIndex = this.companies.findIndex(c => c.id === company.id);
        if (originalIndex !== -1) {
          this.companies.splice(originalIndex, 1);
          this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
          this.updateDisplayedCompanies();
        }
        console.log('Company excluído com sucesso:', company);
      },
      (error) => {
        console.error('Erro ao excluir o company', error);
      }
    );
  }
}
