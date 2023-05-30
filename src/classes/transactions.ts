import { v4 as createUuid } from "uuid";

export enum Type {
  Input = "income",
  Output = "outcome",
}

export class Transactions {
  private _id: string;

  constructor(
    private _title: string,
    private _value: number,
    private _type: Type
  ) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public get value() {
    return this._value;
  }

  public get type() {
    return this._type;
  }

  public set title(title: string){
    this._title = title;
  }

  public set value(value: number){
    this._value = value;
  }

  public set type(type: Type){
    this._type = type;
  }

  public toJsonT() {
    return {
      id: this.id,
      titulo: this._title,
      valor: this._value,
      tipo: this._type,
    };
  }
}
