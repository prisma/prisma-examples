/**
 * A tiny hand-rolled CSV writer — no dependency, RFC 4180 quoting plus
 * spreadsheet formula-injection defusing.
 */

/** Cells starting with one of these are executable formulas in Excel/Sheets. */
const FORMULA_PREFIXES = ["=", "+", "-", "@"];

/**
 * Escape one cell: defuse formulas with a leading apostrophe, then quote
 * whenever the value contains a quote, comma, or line break.
 */
export function escapeCsvCell(value: string): string {
  let cell = value.replace(/\r\n?/g, "\n");

  const firstChar = cell.charAt(0);
  if (FORMULA_PREFIXES.includes(firstChar) || firstChar === "\t") {
    cell = `'${cell}`;
  }

  if (/[",\n\r]/.test(cell) || cell !== cell.trim()) {
    return `"${cell.replace(/"/g, '""')}"`;
  }
  return cell;
}

/** Render rows (header included) as a CRLF-delimited CSV document. */
export function toCsv(rows: ReadonlyArray<ReadonlyArray<string>>): string {
  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\r\n") + "\r\n";
}
