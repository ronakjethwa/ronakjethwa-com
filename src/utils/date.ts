// Postmark-style date: "16 AUG 2026" (uppercased in CSS).
// Always format in UTC so dated frontmatter doesn't shift a day across timezones.
export function postmark(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
