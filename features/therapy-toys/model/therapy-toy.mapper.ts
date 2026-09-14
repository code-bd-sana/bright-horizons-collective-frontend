import type { BackendTherapyToy, BackendTherapyToyPage } from './therapy-toy.schemas';
import type { TherapyToy, TherapyToyPage } from './therapy-toy.types';

export function mapTherapyToy(toy: BackendTherapyToy): TherapyToy {
  return {
    ...toy,
    accessLevel: [...toy.accessLevel],
  };
}

export function mapTherapyToyPage(page: BackendTherapyToyPage): TherapyToyPage {
  return {
    items: page.items.map(mapTherapyToy),
    pagination: { ...page.pagination },
  };
}
