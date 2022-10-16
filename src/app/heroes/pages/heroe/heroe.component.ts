import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { Heroe } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styles: [],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private activateRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.heroeService.getHeroe(id);
        })
      )
      .subscribe((res) => {
        this.heroe = res;
      });
  }

  // getHeoreData(id: string) {
  //   this.heroeService.getHeroe(id).subscribe((res) => {
  //     this.heroe = res;
  //   });
  // }

  regresar(){ //otra manera de indicar la ruta 
    this.router.navigate(['/heroes/listado']);
  }
}
