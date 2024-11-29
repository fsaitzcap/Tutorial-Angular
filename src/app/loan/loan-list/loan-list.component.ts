import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Game } from 'src/app/game/model/Game';
import { GameService } from 'src/app/game/game.service';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { PageRequest } from 'src/app/core/model/page/RequestPage';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent {

  loan: Loan;
  games: Game[];
  clients: Client[];

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'gameTitle', 'clientName', 'dateIni', 'dateFinal', 'action'];

  errorMessage: string | null = null;

  pageRequest: PageRequest = {
    pageable: {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    },
    dateFinal: null,
    dateIni: null,
    gameId: null,
    clientId: null
  };

  constructor(
    private loanService: LoanService,
    public dialog: MatDialog,
    private gameService: GameService,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.loadPage();
    this.selectFilterItems();
  }

  loadPage(event?: PageEvent) {
    this.pageRequest.pageable.pageNumber = this.pageNumber;
    this.pageRequest.pageable.pageSize = this.pageSize;

    if (event != null) {
      this.pageRequest.pageable.pageSize = event.pageSize;
      this.pageRequest.pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoans(this.pageRequest).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  onClearFilter(): void {
    this.pageRequest.gameId = null;
    this.pageRequest.clientId = null;
    this.pageRequest.dateFinal = null;
    this.pageRequest.dateIni = null;
    
    this.loadPage();
  }

  onSearch(): void {
    this.pageRequest.dateFinal = this.loan.dateIni;
    this.pageRequest.dateIni = this.loan.dateIni;
    this.pageRequest.gameId = this.loan.game ? this.loan.game.id : null;
    this.pageRequest.clientId = this.loan.client ? this.loan.client.id : null;
    this.loadPage();
  }

  selectFilterItems() {
    this.loan = new Loan();

    this.gameService.getGames().subscribe(
      games => this.games = games
    );

    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  };

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar autor", description: "Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el autor?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe(result => {
          this.ngOnInit();
        })
      }
    });
  }
}

