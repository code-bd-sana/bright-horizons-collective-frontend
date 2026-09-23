import type { ParentResource } from './parent-resource.types';
import type {
  ParentResourceExploreItem,
  PrintableExploreItem,
} from '@/features/explore/model/explore-types';
import { BACKEND_TO_UI_RESOURCE_TYPE } from './parent-resource.types';
import { figmaExploreImages } from '@/features/explore/data/figma-explore-assets';

function getMatchingSkills(category?: string): string[] {
  const skills: string[] = [];
  const text = (category ?? '').toLowerCase();
  if (text.includes('fine motor')) skills.push('Fine Motor');
  if (text.includes('gross motor')) skills.push('Gross Motor');
  if (text.includes('sensory')) skills.push('Sensory');
  if (text.includes('coordination')) skills.push('Coordination');
  if (text.includes('visual')) skills.push('Visual-Motor');
  if (skills.length === 0) {
    if (category) skills.push(category);
    else skills.push('Sensory');
  }
  return skills;
}

export function mapParentResourceToExploreItem(
  resource: ParentResource,
  saved = false
): ParentResourceExploreItem {
  const uiType = BACKEND_TO_UI_RESOURCE_TYPE[resource.resourceType] || 'Article';
  const badge = resource.category || uiType;
  const skills = getMatchingSkills(resource.category);

  // Fallback image selection based on category or type
  let fallbackImage: string = figmaExploreImages.resources.parentEducation.src;
  if (resource.resourceType === 'PRINTABLE' || resource.resourceType === 'PDF') {
    fallbackImage = figmaExploreImages.resources.printable.src;
  } else if (resource.resourceType === 'GUIDE') {
    fallbackImage = figmaExploreImages.resources.guides.src;
  } else if (resource.category?.toLowerCase().includes('milestone')) {
    fallbackImage = figmaExploreImages.resources.milestones.src;
  }

  return {
    id: resource.id,
    kind: 'parent-resource',
    title: resource.title,
    imageSrc: resource.coverImageUrl || fallbackImage,
    imageAlt: resource.title,
    badge,
    href: `/dashboard/explore/parent-resources/${resource.id}`,
    saved,
    description: resource.summary,
    readTime: resource.estimatedReadTime || '5 min read',
    actionLabel: 'Read More',
    filters: {
      age: ['0–12 mo', '12–24 mo', '2–3 yr', '3–5 yr', '5–7 yr'],
      developmentalSkill: skills,
      category: ['Parent Education', 'Sensory Development', resource.category].filter(Boolean),
      collection: resource.resourceType === 'PRINTABLE' ? ['OT Picks'] : ['Starter Series'],
      difficulty: ['Easy'],
    },
  };
}

export function mapParentResourceToPrintableItem(
  resource: ParentResource,
  saved = false
): PrintableExploreItem {
  const downloadUrl =
    resource.attachments && resource.attachments.length > 0
      ? resource.attachments[0].url
      : `/dashboard/explore/parent-resources/${resource.id}`;

  return {
    id: resource.id,
    kind: 'printable',
    title: resource.title,
    imageSrc: resource.coverImageUrl || figmaExploreImages.resources.printable.src,
    imageAlt: resource.title,
    badge: 'Printable',
    href: downloadUrl,
    saved,
    description: resource.summary,
    downloadLabel: 'Download PDF',
    filters: {
      age: ['0–12 mo', '12–24 mo', '2–3 yr', '3–5 yr', '5–7 yr'],
      developmentalSkill: getMatchingSkills(resource.category),
      category: ['Parent Education', 'Sensory Development', resource.category].filter(Boolean),
      collection: ['OT Picks'],
      difficulty: ['Easy'],
    },
  };
}
