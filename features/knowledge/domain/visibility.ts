export const visibilityValues = ["public", "unlisted", "internal"] as const;

export type Visibility = (typeof visibilityValues)[number];

