/** Human-readable tenure like "1 yr 7 mos" from an ISO start date. */
export function tenureSince(startISO: string, now: Date = new Date()): string {
  const start = new Date(startISO);
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  months = Math.max(0, months);
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  parts.push(`${rem} mo${rem === 1 ? '' : 's'}`);
  return parts.join(' ');
}
