import { date2pos } from '$lib/utils/date2pos';
import { add, endOfDay, startOfDay } from 'date-fns';
// import { clientWidth } from '$lib/components/Row.svelte'

const start = startOfDay(new Date());
const end = endOfDay(new Date());

export function dateStore(initDate: Date, initEndDate: Date) {
  let startDate = $state(initDate);
  let endDate = $state(initEndDate);
  let timeDelta: number = $derived(Math.ceil((endDate - startDate) / (1000 * 60 * 60)));
  let timeSteps: Array<Date> = $derived(
    Array.from(Array(timeDelta).keys()).map(
      (k) => add(startDate, { hours: k })
    )
  );

  return {
    // date,
    get startDate() { return startDate; },
    get endDate() { return endDate; },
    get timeDelta() { return timeDelta; },
    get timeSteps() { return timeSteps; },
    set startDate(newDate: Date) {
      startDate = newDate;
      // timeDelta = Math.ceil((endDate - startDate) / (1000 * 60 * 60));
    },
    set endDate(newDate: Date) {
      endDate = newDate;
      // timeDelta = Math.ceil((endDate - startDate) / (1000 * 60 * 60));
    }
  }
}
export let layoutDate = dateStore(start, end);
export function createPixelWidth() {
  let pixelWidth = $state(0);

  return {
    get pixelWidth() { return pixelWidth },
    set pixelWidth(newPixelWidth: number) { pixelWidth = newPixelWidth }
  }
}
export let pixelWidth = createPixelWidth();
