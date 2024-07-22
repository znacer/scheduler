import { json } from "@sveltejs/kit";
import { add, formatISO, startOfDay } from "date-fns";
const startDate = startOfDay(new Date());

const example = [
  {
    "name": "Event 1",
    "start": formatISO(add(startDate, { hours: 4 })),
    "end": formatISO(add(startDate, { hours: 8 })),
    "ships": ["1", "2"],
    "resources": []

  },
  {
    "name": "Event 2",
    "start": formatISO(add(startDate, { hours: 9 })),
    "end": formatISO(add(startDate, { hours: 11 })),
    "ships": ["1"],
    "resources": []
  },
  {
    "name": "Event 3",
    "start": formatISO(add(startDate, { hours: 12 })),
    "end": formatISO(add(startDate, { hours: 15 })),
    "ships": ["1"],
    "resources": []
  },
  {
    "name": "Event 4",
    "start": formatISO(add(startDate, { hours: 15 })),
    "end": formatISO(add(startDate, { hours: 18, minutes: 30 })),
    "ships": ["1"],
    "resources": []
  },
  {
    "name": "Event 5",
    "start": formatISO(add(startDate, { hours: 18 })),
    "end": formatISO(add(startDate, { hours: 20 })),
    "ships": ["1"],
    "resources": []
  },
  {
    "name": "Event 6",
    "start": formatISO(add(startDate, { hours: 19 })),
    "end": formatISO(add(startDate, { hours: 20 })),
    "ships": ["1"],
    "resources": []
  },

  {
    "name": "Event 1",
    "start": formatISO(add(startDate, { hours: 6 })),
    "end": formatISO(add(startDate, { hours: 12 })),
    "ships": ["1", "2"],
    "resources": []
  },
  {
    "name": "Event 2",
    "start": formatISO(add(startDate, { hours: 12 })),
    "end": formatISO(add(startDate, { hours: 16 })),
    "ships": ["2"],
    "resources": []
  },
  {
    "name": "Event 3",
    "start": formatISO(add(startDate, { hours: 16 })),
    "end": formatISO(add(startDate, { hours: 20 })),
    "ships": ["2"],
    "resources": []
  },
  {
    "name": "Event 4",
    "start": formatISO(add(startDate, { hours: 20 })),
    "end": formatISO(add(startDate, { hours: 22, minutes: 30 })),
    "ships": ["2"],
    "resources": []
  },
  {
    "name": "Event 5",
    "start": formatISO(add(startDate, { hours: 8 })),
    "end": formatISO(add(startDate, { hours: 16 })),
    "ships": ["2"],
    "resources": []
  },
  {
    "name": "Event 6",
    "start": formatISO(add(startDate, { hours: 11 })),
    "end": formatISO(add(startDate, { hours: 20 })),
    "ships": ["2"],
    "resources": []
  }
]
  ;

export function GET() {
  return json(example);
}

