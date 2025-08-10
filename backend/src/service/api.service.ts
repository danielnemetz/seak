/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { Injectable } from "@nestjs/common";
import { Arbeitszeit, Person, Planzeit } from "@seak/types";
import * as fs from "fs";
import * as path from "path";
import { parser } from "stream-json";
import { streamArray } from "stream-json/streamers/StreamArray";

@Injectable()
export class ApiService {
  async getPersons(): Promise<Person[]> {
    const filePath = path.join(__dirname, "../../mock/persons.json");
    return this.readJsonFile<Person>(filePath);
  }

  async getArbeitszeiten(): Promise<Arbeitszeit[]> {
    const filePath = path.join(__dirname, "../../mock/arbeitszeiten.json");
    return this.readJsonFile<Arbeitszeit>(filePath);
  }

  async getPlanzeiten(): Promise<Planzeit[]> {
    const filePath = path.join(__dirname, "../../mock/planzeiten.json");
    return this.readJsonFile<Planzeit>(filePath);
  }

  private async readJsonFile<T>(filePath: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const results: T[] = [];

      const pipeline: any = fs
        .createReadStream(filePath)
        .pipe(parser())
        .pipe(streamArray());

      pipeline.on("data", (data: { value: unknown }) => {
        results.push(data.value as T);
      });

      pipeline.on("end", () => {
        resolve(results);
      });

      pipeline.on("error", (error: Error) => {
        reject(error);
      });
    });
  }
}
