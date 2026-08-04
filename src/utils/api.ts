import { Supporter, TimelineStep } from '../types';

export interface CampaignStateResponse {
  pixKey: string | null;
  goal: number | null;
  raised: number | null;
  timelineSteps: TimelineStep[];
  supporters: Supporter[];
}

export async function fetchState(): Promise<CampaignStateResponse> {
  const res = await fetch('/api/state');
  if (!res.ok) throw new Error(`fetchState failed: ${res.status}`);
  return res.json();
}

export async function saveState(
  passcode: string,
  data: { pixKey: string; goal: number; raised: number; timelineSteps: TimelineStep[] }
): Promise<void> {
  const res = await fetch('/api/state', {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'x-admin-passcode': passcode },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`saveState failed: ${res.status}`);
}

export async function addSupporterApi(data: Omit<Supporter, 'id' | 'date' | 'likes'>): Promise<void> {
  const res = await fetch('/api/supporters', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`addSupporter failed: ${res.status}`);
}

export async function likeSupporterApi(id: string): Promise<void> {
  const res = await fetch('/api/supporters', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id, like: true }),
  });
  if (!res.ok) throw new Error(`likeSupporter failed: ${res.status}`);
}

export async function editSupporterAmountApi(passcode: string, id: string, amount: number): Promise<void> {
  const res = await fetch('/api/supporters', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json', 'x-admin-passcode': passcode },
    body: JSON.stringify({ id, amount }),
  });
  if (!res.ok) throw new Error(`editSupporterAmount failed: ${res.status}`);
}

export async function deleteSupporterApi(passcode: string, id: string): Promise<void> {
  const res = await fetch('/api/supporters', {
    method: 'DELETE',
    headers: { 'content-type': 'application/json', 'x-admin-passcode': passcode },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error(`deleteSupporter failed: ${res.status}`);
}
