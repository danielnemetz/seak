import { Controller, Get } from "@nestjs/common";
import { Arbeitszeit, Person, Planzeit } from "@seak/types";
import { ApiService } from "../service/api.service";

@Controller("api")
export class ApiController {
  constructor(private readonly appService: ApiService) {}

  @Get("persons")
  async gtPersons(): Promise<Person[]> {
    return this.appService.getPersons();
  }

  @Get("arbeitszeiten")
  async getArbeitszeiten(): Promise<Arbeitszeit[]> {
    return this.appService.getArbeitszeiten();
  }

  @Get("planzeiten")
  async getPlanzeiten(): Promise<Planzeit[]> {
    return this.appService.getPlanzeiten();
  }
}
