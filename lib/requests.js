/**
 * Pure constants shared between the DB model and the UI — no mongoose
 * imports here so client components can bundle it safely.
 */
export const SERVICE_REQUEST_STATUSES = ["NEW", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];