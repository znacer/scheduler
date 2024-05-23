import { json } from "@sveltejs/kit";
import { add, formatISO, startOfDay } from "date-fns";
const startDate = startOfDay(new Date());

const example = [
  {
    "name": "exemple1",
    "tasks": [
      {
        "name": "Event 1",
        "start": formatISO(add(startDate, { hours: 4 })),
        "end": formatISO(add(startDate, { hours: 8 })),
      },
      {
        "name": "Event 2",
        "start": formatISO(add(startDate, { hours: 9 })),
        "end": formatISO(add(startDate, { hours: 11 })),
      },
      {
        "name": "Event 3",
        "start": formatISO(add(startDate, { hours: 12 })),
        "end": formatISO(add(startDate, { hours: 15 })),
      },
      {
        "name": "Event 4",
        "start": formatISO(add(startDate, { hours: 15 })),
        "end": formatISO(add(startDate, { hours: 18, minutes: 30 })),
      },
      {
        "name": "Event 5",
        "start": formatISO(add(startDate, { hours: 18 })),
        "end": formatISO(add(startDate, { hours: 20 })),
      },
      {
        "name": "Event 6",
        "start": formatISO(add(startDate, { hours: 19 })),
        "end": formatISO(add(startDate, { hours: 20 })),
      }
    ]
  },

  {
    "name": "exemple2",
    "tasks": [
      {
        "name": "Event 1",
        "start": formatISO(add(startDate, { hours: 4 })),
        "end": formatISO(add(startDate, { hours: 8 })),
      },
      {
        "name": "Event 2",
        "start": formatISO(add(startDate, { hours: 9 })),
        "end": formatISO(add(startDate, { hours: 11 })),
      },
      {
        "name": "Event 3",
        "start": formatISO(add(startDate, { hours: 12 })),
        "end": formatISO(add(startDate, { hours: 15 })),
      },
      {
        "name": "Event 4",
        "start": formatISO(add(startDate, { hours: 15 })),
        "end": formatISO(add(startDate, { hours: 18, minutes: 30 })),
      },
      {
        "name": "Event 5",
        "start": formatISO(add(startDate, { hours: 18 })),
        "end": formatISO(add(startDate, { hours: 20 })),
      },
      {
        "name": "Event 6",
        "start": formatISO(add(startDate, { hours: 19 })),
        "end": formatISO(add(startDate, { hours: 20 })),
      }
    ]
  },
]
  ;

export function GET() {
  return json(example);
}
