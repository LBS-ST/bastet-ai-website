const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape a content string, then turn `**bold**` into <strong>. Used with set:html. */
export function rich(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ESC[c]).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** Strip `**` markers for plain-text contexts (meta, JSON-LD). */
export const plain = (text: string) => text.replace(/\*\*/g, '');
