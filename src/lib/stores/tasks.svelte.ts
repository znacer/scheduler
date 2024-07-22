export class TaskElement {
  private _id: string
  private _name: string
  private _start: Date
  private _end: Date
  private _ships: string[]
  private _resources: string[]
  private _subrow: Map<string, number>


  constructor(
    name: string,
    start: Date | string,
    end: Date | string,
    ships: string[] = [],
    resources: string[] = []
  ) {
    this._name = name;
    this._start = new Date(start);
    this._end = new Date(end);
    this._id = "task_" + crypto.randomUUID()
    this._ships = ships;
    this._resources = resources;
    this._subrow = new Map<string, number>()
    ships.forEach((ship: string) => this._subrow.set(ship, 0))
  }

  get id(): string { return this._id }
  get name(): string { return this._name }
  get start(): Date { return this._start; }
  get end(): Date { return this._end; }
  get ships(): string[] { return this._ships; }
  get resources(): string[] { return this._resources; }
  public subrow(ship: string): number {
    let out = this._subrow.get(ship);
    if (out !== undefined) {
      return out;
    } else {
      throw new Error("InvalidShip");
    }
  }
  public setSubrow(ship: string, value: number) {
    this._subrow.set(ship, value)
  }

  set name(newName: string) { this._name = newName }
  set start(newStart: Date) {
    if (newStart < this._end) {
      this._start = newStart;
    } else {
      throw new Error("Start date must be earlier than end date.")
    }
  }
  set end(newEnd: Date) {
    if (newEnd > this._start) {
      this._end = newEnd;
    } else {
      throw new Error("End date must be later than start date.")
    }
  }
  public intersect(other: TaskElement) {
    const inter = (a: TaskElement, b: TaskElement) => ((a.start <= b.start) && (a.end > b.start));
    return inter(this, other) || inter(other, this);
  }
  public intersect_list(others: TaskElement[]) {
    return others.reduce((acc: boolean, other: TaskElement) => acc || this.intersect(other), false)
  }
}

export function createTasks() {
  let tasks = $state(new Map<string, TaskElement>());
  let ships = $state(new Set<string>());

  return {
    tasks,

    set: (newTask: TaskElement) => {
      tasks.set(newTask.id, newTask)
    },

    get: (task_id: string) => { return tasks.get(task_id) },

    size: () => tasks.size,

    setSubrow: (id: string, ship: string, value: number) => { tasks.get(id)?.setSubrow(ship, value) },

    computeShips: () => {
      tasks.forEach(
        (task) => task.ships.forEach(
          (ship) => ships.add(ship)
        )
      )
    },

    ships,

    shipsTasks: (ship: string) => {
      return [...tasks].filter(
        ([_, task]) => task.ships.includes(ship)
      )
    },


  }
}

export const tasks = createTasks();



export function subrowingTasks(tasks: Map<string, TaskElement>): Map<string, TaskElement> {
  let ship_list: Set<string> = new Set();
  tasks.forEach(
    (task) => task.ships.forEach(
      (ship) => ship_list.add(ship)
    )
  );
  // for each ship its subrowwing
  ship_list.forEach((ship: string) => {
    let subrows: string[][] = [[]];
    tasks.forEach((task) => {
      let attributed = false;
      if (task.ships.indexOf(ship) !== -1) {
        // check if task intersects with subrows. When found one that fits, append. If none, create a new one.
        subrows.forEach((subrow, id) => {
          let subrow_tasks = subrow.map((id) => {
            let out = tasks.get(id);
            if (out === undefined) {
              throw Error("TaskIdError");
            }
            return out;
          })
          if (!task.intersect_list(subrow_tasks) && !attributed) {
            attributed = true
            subrow.push(task.id)
            tasks.get(task.id)?.setSubrow(ship, id)
          }
        })
        if (!attributed) {
          subrows.push([task.id])
          tasks.get(task.id)?.setSubrow(ship, subrows.length - 1)
        }
      }
    })
  })
  // console.log(tasks)
  return tasks
}


