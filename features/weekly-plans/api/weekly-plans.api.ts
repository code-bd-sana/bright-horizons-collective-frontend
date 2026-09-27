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

export async function getAdminWeeklyPlan(id: string) {
  const response = await fetch(`/api/admin/weekly-plans/${id}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to fetch weekly plan.');
  }
  return response.json();
}

export async function updateAdminWeeklyPlan(id: string, payload: Partial<CreateWeeklyPlanPayload>) {
  const response = await fetch(`/api/admin/weekly-plans/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to update weekly plan.');
  }

  return response.json();
}

export async function duplicateAdminWeeklyPlan(id: string) {
  const response = await fetch(`/api/admin/weekly-plans/${id}/duplicate`, {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to duplicate weekly plan.');
  }

  return response.json();
}

export async function publishAdminWeeklyPlan(id: string) {
  const response = await fetch(`/api/admin/weekly-plans/${id}/publish`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to publish weekly plan.');
  }

  return response.json();
}

export async function archiveAdminWeeklyPlan(id: string) {
  const response = await fetch(`/api/admin/weekly-plans/${id}/archive`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to archive weekly plan.');
  }

  return response.json();
}

export async function deleteAdminWeeklyPlan(id: string) {
  const response = await fetch(`/api/admin/weekly-plans/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to delete weekly plan.');
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
