import { Component, OnInit } from "@angular/core";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Heroe } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: "app-buscar",
  templateUrl: "./buscar.component.html",
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = "";
  heroes: Heroe[] = [];
  heroeSelected: Heroe | undefined;

  constructor(private heroesServices: HeroesService) {}

  ngOnInit(): void {}

  searching() {
    this.heroesServices
      .searchHeroes(this.termino.trim())
      .subscribe((res) => (this.heroes = res));
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    
    if (!event.option.value) {
      this.heroeSelected  = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesServices
      .getHeroe(heroe.id!)
      .subscribe((res) => (this.heroeSelected = res));
  }
}
