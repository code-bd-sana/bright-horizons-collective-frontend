import type { BackendTherapyToy, BackendTherapyToyPage } from './therapy-toy.schemas';
import type { TherapyToy, TherapyToyModalToy, TherapyToyPage } from './therapy-toy.types';
import type { TherapyToyExploreItem } from '@/features/explore/model/explore-types';

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

export function mapTherapyToyToModal(toy: TherapyToy): TherapyToyModalToy {
  return {
    id: toy.id,
    name: toy.name,
    imageUrl: toy.imageUrl,
    minAgeMonths: toy.minAgeMonths,
    maxAgeMonths: toy.maxAgeMonths,
    developmentAreas: [toy.developmentArea],
    badge: toy.status === 'PUBLISHED' ? 'OT Favorite' : undefined,
    price: toy.price,
    description: toy.description,
    affiliateLink: toy.affiliateLink,
  };
}

export function mapTherapyToyToExploreItem(toy: TherapyToy, saved = false): TherapyToyExploreItem {
  return {
    id: toy.id,
    kind: 'therapy-toy',
    title: toy.name,
    imageSrc: toy.imageUrl ?? '/Home/therapy-toy-kinetic-sand.png',
    imageAlt: toy.name,
    badge: 'OT Favorite',
    href: `/dashboard/explore?tab=therapy-toys#${toy.id}`,
    saved,
    age: `${toy.minAgeMonths}–${toy.maxAgeMonths} mo`,
    skills: [toy.developmentArea],
    description: toy.description,
    price: toy.price,
    affiliateLink: toy.affiliateLink,
    filters: {
      age: [],
      developmentalSkill: [toy.developmentArea],
      category: [toy.developmentArea],
      collection: [],
      difficulty: [],
    },
  };
}
