import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { Client } from 'src/app/client/model/Client';
import { Game } from 'src/app/game/model/Game';
import { GameService } from 'src/app/game/game.service';
import { ClientService } from 'src/app/client/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {

  loan: Loan;
  games: Game[];
  clients: Client[];
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.selectFilterItems();
  }

  onSave(): void {
    if (!this.checkDurationLoan()) {
      this.loanService.saveLoan(this.loan).subscribe({
        next: (result) => {
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Cerrar', {
            duration: 5000
          });
        }
      });
    }
  }


  onClose() {
    this.dialogRef.close();
  }

  checkDurationLoan(): boolean {
    if (this.loan.dateIni && this.loan.dateFinal) {
      const dateIni = new Date(this.loan.dateIni);
      const dateFinal = new Date(this.loan.dateFinal);

      if (dateFinal < dateIni) {

        this.snackBar.open('La fecha de retorno no puede ser inferior a la de préstamo, elija otra fecha', 'Cerrar', {
          duration: 3000
        });
        return true;

      }
    }
    return false;
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

  validateButton():boolean {
    return !!this.loan.game &&
           !!this.loan.client &&
           !!this.loan.dateIni &&
           !!this.loan.dateFinal;

  } 
}