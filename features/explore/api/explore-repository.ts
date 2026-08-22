import type {
  ExplorePagePayload,
  ExplorePageRequest,
  SaveExploreItemRequest,
} from '@/features/explore/model/explore-types';

export interface ExploreRepository {
  getPage(request: ExplorePageRequest): Promise<ExplorePagePayload>;
  setSaved(request: SaveExploreItemRequest): Promise<void>;
}
