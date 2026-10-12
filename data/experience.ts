export interface ExperienceEntry {
  /** e.g. "Frontend Developer" or "BS Information Technology" */
  title: string;
  /** Company, client or school. */
  organization: string;
  /** e.g. "2024" or "Jun 2025". */
  start: string;
  /** Leave out for a current role. */
  end?: string;
  location?: string;
  summary?: string;
  points?: string[];
}

/** Newest first. While this is empty the Experience section and its nav link stay hidden. */
export const experience: ExperienceEntry[] = [];
