import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    pims: [
      {
        position: [5.97, 43.05],
        timestamp: 1729468800000,
        name: "WP01",
        description: undefined,
      },
      {
        position: [5.92, 43],
        timestamp: 1729468800000,
        name: "WP02",
        description: "une description",
      },
      {
        position: [5.96, 43],
        timestamp: 1729468800000,
        name: "WP03",
        description: undefined,
      },
      {
        position: [6, 42.9],
        timestamp: 1729468800000,
        name: "WP04",
        description: undefined,
      },
    ],
  };
};
