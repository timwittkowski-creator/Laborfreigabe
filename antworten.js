"use strict";
// Umlaute, Großschreibung, Leerzeichen und Bindestriche tolerant vergleichen.
function normalizeAnswer(value) {
  return String(value).normalize("NFKC").trim().toLocaleLowerCase("de-DE")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[\s\-–—.,;:]/g, "");
}
function matchesAnswer(value, accepted) {
  const normalized = normalizeAnswer(value);
  return normalized.length > 0 && accepted.some(answer => normalizeAnswer(answer) === normalized);
}
if (typeof module !== "undefined") module.exports = { normalizeAnswer, matchesAnswer };

// Return the number of completed stations, or null for an invalid prefix.
function resumeIndex(value, stations) {
  const code = String(value).replace(/[\s\-–—]/g, "");
  const fullCode = stations.map(s => s.digit).join("");
  if (!/^\d+$/.test(code) || code.length > stations.length || !fullCode.startsWith(code)) return null;
  return code.length;
}
if (typeof module !== "undefined") module.exports.resumeIndex = resumeIndex;
