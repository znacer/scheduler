export class Ship {
  private _id: string
  private _name: string

  constructor(name: string) {
    this._name = name
    this._id = "ship_" + crypto.randomUUID()
  }

  get id(): string { return this._id }
  get name(): string { return this._name }

  set name(newName: string) { this._name = newName}
}
