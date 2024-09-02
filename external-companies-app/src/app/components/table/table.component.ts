import { Company } from '../company.model';
import { CompanyService } from './../../services/company.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  companies: Company[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Erro ao carregar empresas', error);
      }
    );
  }

  openModal(company: Company) {
    console.log('Abrindo modal para a empresa:', company);

  }

  deleteCompany(index: number) {
    const company = this.companies[index];
    this.companyService.deleteCompany(company.id).subscribe(
      () => {
        this.companies.splice(index, 1);
        console.log('Empresa excluída com sucesso:', company);
      },
      (error) => {
        console.error('Erro ao excluir a empresa', error);
      }
    );
  }

  saveCompany(company: Company) {
    if (company.id) {
      // Atualiza a empresa existente
      this.companyService.updateCompany(company.id, company).subscribe(
        (updatedCompany) => {
          const index = this.companies.findIndex(c => c.id === updatedCompany.id);
          if (index !== -1) {
            this.companies[index] = updatedCompany;
          }
          console.log('Empresa atualizada com sucesso:', updatedCompany);
        },
        (error) => {
          console.error('Erro ao atualizar a empresa', error);
        }
      );
    } else {
      this.companyService.addCompany(company).subscribe(
        (newCompany) => {
          this.companies.push(newCompany);
          console.log('Empresa adicionada com sucesso:', newCompany);
        },
        (error) => {
          console.error('Erro ao adicionar empresa', error);
        }
      );
    }
  }
}
