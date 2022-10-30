import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { Heroe, Publisher } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";
import { ConfirmarComponent } from "../../component/confirmar/confirmar.component";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.component.html",
  styles: [],
})
export class AgregarComponent implements OnInit {
  accion: string = "";

  publishers = [
    {
      id: "DC Comics",
      description: "DC - Comics",
    },
    {
      id: "Marvel Comics",
      description: "Marvel - Comics",
    },
  ];

  heroe: Heroe = {
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.MarvelComics,
    alt_image: "",
  };

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes("editar")) {
      this.accion = "Agregar";
      return;
    }

    this.accion = "Editar";

    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.heroesService.getHeroe(id);
        })
      )
      .subscribe((heroe) => {
        this.heroe = heroe;
      });
  }

  guardar() {
    if (!this.heroe.superhero.trim()) {
      return;
    }

    if (this.heroe.id) {
      //Update
      this.heroesService.editHeroe(this.heroe).subscribe((res) => {
        this.mostrarSnackBar("Registro actualizado");
      });
    } else {
      //Create
      this.heroesService.addHeroe(this.heroe).subscribe((res) => {
        this.router.navigate(["/heroes/editar", res.id]);
        this.mostrarSnackBar("Registro agregado");
      });
    }
  }

  eliminar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: "300px",
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHeroe(this.heroe.id!).subscribe((res) => {
          this.router.navigate(["/heroes"]);
        });
      }
    });
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, "OK!", {
      duration: 2500,
    });
  }
}
