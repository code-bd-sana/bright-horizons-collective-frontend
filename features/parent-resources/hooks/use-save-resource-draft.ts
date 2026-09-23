'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateParentResource } from './parent-resources.mutations';
import { useResourceFormStore } from '../store/use-resource-form-store';
import type { CreateParentResourceInput } from '../model/parent-resource.types';

export function useSaveResourceDraft() {
  const router = useRouter();
  const { getCreatePayload, resetForm } = useResourceFormStore();
  const createResourceMutation = useCreateParentResource();

  async function saveDraft(overrideData?: Partial<CreateParentResourceInput>): Promise<boolean> {
    const payload = getCreatePayload();
    if (overrideData) {
      Object.assign(payload, overrideData);
    }

    if (!payload.title?.trim()) {
      toast.error('Please enter a resource title to save as a draft.');
      return false;
    }

    if (!payload.summary?.trim()) {
      toast.error('Please enter a summary to save as a draft.');
      return false;
    }

    payload.status = 'DRAFT';

    try {
      await createResourceMutation.mutateAsync(payload);
      toast.success(`“${payload.title}” has been saved as draft in database.`);
      resetForm();
      router.push('/dashboard/admin/parent-resources');
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save draft.';
      toast.error(message);
      return false;
    }
  }

  return {
    saveDraft,
    isSavingDraft: createResourceMutation.isPending,
  };
}
