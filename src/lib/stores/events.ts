export class TaskElement {
  private _name: string
  private _start: Date
  private _end: Date
  private _overlaps: number

  constructor(name: string, start: Date | string, end: Date | string) {
    this._name = name;
    this._start = new Date(start);
    this._end = new Date(end);
    this._overlaps = 1;
  }

  get name(): string { return this._name; }
  get start(): Date { return this._start; }
  get end(): Date { return this._end; }
  get overlaps(): number { return this._overlaps; }


  set name(newName: string) { this._name = newName; }
  set start(newStart: Date) {
    // if (newStart < this._end) {
    this._start = newStart;
    // } else {
    // throw new Error("Start date must be earlier than end date.")
    // }
  }
  set end(newEnd: Date) {
    if (newEnd > this._start) {
      this._end = newEnd;
    } else {
      throw new Error("End date must be later than start date.")
    }
  }
  set overlaps(newOverlaps: number) {
    if (newOverlaps < 1) {
      throw Error("Number of overlaps must be 1 or higher");
    }
    this._overlaps = newOverlaps;
  }
  public intersect(other: TaskElement) {
    const inter = (a: TaskElement, b: TaskElement) => ((a.start <= b.start) && (a.end > b.start)); //&& (a.start !== b.start || a.end !== b.end));
    return inter(this, other) || inter(other, this);
  }
}
