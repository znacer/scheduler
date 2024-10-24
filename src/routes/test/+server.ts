import { test_producer } from "$lib/data";
import { json } from "@sveltejs/kit";

export function GET() {
  const resources = []
  for (let i = 0; i < 4; i++) {
    const tasks = test_producer(12);
    resources.push({
      id: i + 1,
      name: `schedule ${i + 1}`,
      tasks
    })
  }

  return json(resources);
}
