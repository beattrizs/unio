// Types for the "Pitch & Lean Canvas" page (startup area).
//
// TODO(api): the backend has no pitch endpoints yet. The only pitch data it
// stores today is the free-text `pitchCanvas` field of the startup profile
// (PUT /api/profile/me). Every shape below is the frontend's assumption and
// must be checked against the real DTO once it exists.

// TODO(api): assumed enum values, sent as uppercase strings.
export type PitchStatus = "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "REJECTED";

// TODO(api): assumed field names (camelCase, one string per block).
export interface LeanCanvas {
  problem: string;
  customerSegments: string;
  uniqueValueProposition: string;
  solution: string;
  channels: string;
  revenueStreams: string;
  costStructure: string;
  keyMetrics: string;
  unfairAdvantage: string;
}

export type LeanCanvasField = keyof LeanCanvas;

// Normalized pitch used by the page (nulls already replaced by "").
export interface StartupPitch {
  status: PitchStatus;
  shortPitch: string;
  videoUrl: string | null;
  // TODO(api): assumed ISO-8601 timestamp; null when never saved.
  updatedAt: string | null;
  leanCanvas: LeanCanvas;
}

// TODO(api): assumed raw response of GET/PUT /api/startups/me/pitch and
// POST /api/startups/me/pitch/publish. Text fields may come as null.
export interface StartupPitchResponse {
  status: PitchStatus;
  shortPitch: string | null;
  videoUrl: string | null;
  updatedAt: string | null;
  leanCanvas: { [K in LeanCanvasField]: string | null } | null;
}

// TODO(api): assumed body of PUT /api/startups/me/pitch (full replacement).
export interface UpdatePitchRequest {
  shortPitch: string;
  videoUrl: string | null;
  leanCanvas: LeanCanvas;
}

// Values edited in the form (videoUrl as "" instead of null).
export interface PitchFormValues {
  shortPitch: string;
  videoUrl: string;
  leanCanvas: LeanCanvas;
}

export type PitchFieldKey = "shortPitch" | "videoUrl" | LeanCanvasField;

export type PitchFormErrors = Partial<Record<PitchFieldKey, string>>;

export type PitchTab = "pitch" | "canvas";
