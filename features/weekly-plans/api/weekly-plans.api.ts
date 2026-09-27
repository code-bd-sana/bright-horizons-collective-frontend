import { type CreateWeeklyPlanPayload } from '../model/weekly-plan.types';

export async function createAdminWeeklyPlan(payload: CreateWeeklyPlanPayload) {
  const response = await fetch('/api/admin/weekly-plans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to create weekly plan.');
  }

  return response.json();
}

export async function uploadWeeklyPlanFeaturedImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/uploads/weekly-plans', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to upload featured image.');
  }

  const result = await response.json();
  const url = result?.data?.url ?? result?.url;
  return { url };
}
