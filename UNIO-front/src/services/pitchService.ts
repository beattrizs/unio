import api from "./api";
import type { LeanCanvas, StartupPitch, StartupPitchResponse, UpdatePitchRequest } from "../types/pitch";

// Single data access point for the "Pitch & Lean Canvas" page. Uses the
// shared axios instance, so the JWT Bearer token and the 401 redirect come
// from services/api.ts.
//
// TODO(api): none of these endpoints exist in the backend yet. Until they
// do, the page shows its error state against the real back. With
// VITE_MOCK_BACKEND=true they are answered by services/mockBackend.ts.
const BASE_PATH = "/api/startups/me/pitch";

function text(value: string | null | undefined) {
  return value ?? "";
}

function normalize(data: StartupPitchResponse): StartupPitch {
  const canvas = data.leanCanvas;
  const leanCanvas: LeanCanvas = {
    problem: text(canvas?.problem),
    customerSegments: text(canvas?.customerSegments),
    uniqueValueProposition: text(canvas?.uniqueValueProposition),
    solution: text(canvas?.solution),
    channels: text(canvas?.channels),
    revenueStreams: text(canvas?.revenueStreams),
    costStructure: text(canvas?.costStructure),
    keyMetrics: text(canvas?.keyMetrics),
    unfairAdvantage: text(canvas?.unfairAdvantage),
  };
  return {
    status: data.status,
    shortPitch: text(data.shortPitch),
    videoUrl: data.videoUrl || null,
    updatedAt: data.updatedAt,
    leanCanvas,
  };
}

// TODO(api): assumes the backend answers 200 with an empty DRAFT (not 404)
// when the startup has never saved a pitch.
export async function getMyPitch(): Promise<StartupPitch> {
  const response = await api.get<StartupPitchResponse>(BASE_PATH);
  return normalize(response.data);
}

// TODO(api): assumes PUT replaces the whole pitch and returns it updated.
export async function updateMyPitch(body: UpdatePitchRequest): Promise<StartupPitch> {
  const response = await api.put<StartupPitchResponse>(BASE_PATH, body);
  return normalize(response.data);
}

// TODO(api): assumes POST has no body, submits the saved version for
// moderation and returns the pitch with status IN_REVIEW.
export async function publishMyPitch(): Promise<StartupPitch> {
  const response = await api.post<StartupPitchResponse>(`${BASE_PATH}/publish`);
  return normalize(response.data);
}
