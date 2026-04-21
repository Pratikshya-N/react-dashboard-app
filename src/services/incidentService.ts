import { incidents } from "../constants/mockData";

export const fetchIncidents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(incidents);
    }, 800); // simulate API delay
  });
};