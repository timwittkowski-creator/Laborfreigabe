"use strict";
const data = window.ESCAPE;
const room = document.querySelector("#room");
let current = 0;
let digits = [];
function el(tag, text, cls) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (cls) node.className = cls;
  return node;
}
function heading(text) {
  const h = el("h2", text); h.tabIndex = -1; room.append(h); return h;
}
function updateProgress() {
  document.querySelector("#progress").max = data.stations.length;
  document.querySelector("#progress").value = digits.length;
  document.querySelector("#progressText").textContent = `${digits.length} von ${data.stations.length} Stationen gelöst`;
  const list = document.querySelector("#digits"); list.replaceChildren();
  data.stations.forEach((s, i) => list.append(el("li", `Station ${i + 1}: ${digits[i] || "noch verschlossen"}`)));
}
function render(focus = true) {
  room.replaceChildren(); updateProgress();
  if (current === data.stations.length) { finish(focus); return; }
  const s = data.stations[current];
  const h = heading(s.title);
  if (s.image) { const img = el("img"); img.src = s.image; img.alt = s.imageAlt || ""; img.className = s.imageClass || "symbol"; room.append(img); }
  if (s.source) room.append(el("p", s.source, "source"));
  room.append(el("p", s.material, "reading"));
  if (s.link) {
    const link = el("a", s.linkLabel || "Recherchequelle öffnen");
    link.href = s.link; link.target = "_blank"; link.rel = "noopener noreferrer"; room.append(link);
  }
  if (s.fallback) {
    const backup = el("details"); backup.append(el("summary", "Ersatzkarte: falls die Internetquelle nicht erreichbar ist"), el("p", s.fallback)); room.append(backup);
  }
  const form = el("form"); const field = el("fieldset"); field.append(el("legend", s.question));
  const inputs = [];
  s.fields.forEach((item, i) => {
    const label = el("label", item.label); const input = el("input");
    input.type = "text"; input.id = `answer-${i}`; input.required = true;
    input.autocomplete = "off"; input.spellcheck = false; label.htmlFor = input.id;
    field.append(label, input); inputs.push(input);
  });
  field.append(el("p", "Groß-/Kleinschreibung, Leerzeichen und Bindestriche sind egal. Gebt die gesuchten Begriffe oder Codes ein, keine ganzen Sätze.", "source"));
  const check = el("button", "Akte entschlüsseln"); check.type = "submit";
  form.append(field, check); room.append(form);
  const help = el("details"); help.append(el("summary", "Hinweis 1: Wo finde ich die Information?"), el("p", s.hints[0]));
  const more = el("details"); more.append(el("summary", "Hinweis 2: genauerer Tipp"), el("p", s.hints[1])); help.append(more); room.append(help);
  const feedback = el("p"); feedback.id = "feedback"; feedback.setAttribute("role", "status"); room.append(feedback);
  let solved = false;
  form.addEventListener("submit", event => {
    event.preventDefault(); if (solved) return;
    const incorrect = inputs.map((input, i) => {
      const correct = matchesAnswer(input.value, s.fields[i].answers);
      input.setAttribute("aria-invalid", String(!correct));
      return correct ? null : i + 1;
    }).filter(Boolean);
    if (incorrect.length) {
      feedback.textContent = `Fast geknackt! Prüft noch Feld ${incorrect.join(", ")}. Nutzt die Quelle oder einen Hinweis. Bereits passende Angaben könnt ihr stehen lassen.`;
      inputs[incorrect[0] - 1].focus(); return;
    }
    solved = true; field.disabled = true; check.disabled = true;
    digits.push(s.digit); updateProgress();
    feedback.textContent = `${s.success || "Geschafft!"} ${s.explanation} Eure Codeziffer: ${s.digit}.`;
    room.append(el("p", "Kurz besprechen: " + s.reflection));
    const next = el("button", current === data.stations.length - 1 ? "Zum Abschlussfach" : "Nächste Akte öffnen");
    next.type = "button"; next.onclick = () => { current++; render(); }; room.append(next); next.focus();
  });
  if (focus) h.focus();
}
function finish(focus) {
  const h = heading("Zehn Akten. Ein letzter Code.");
  room.append(el("p", "Tragt alle gesammelten Ziffern in der Reihenfolge der Stationen ein."));
  const form = el("form"); const label = el("label", "Euer Abschlusscode"); label.htmlFor = "code";
  const input = el("input"); input.id = "code"; input.type = "text"; input.inputMode = "numeric"; input.required = true; input.autocomplete = "off";
  const button = el("button", "Fach öffnen"); button.type = "submit";
  const feedback = el("p"); feedback.setAttribute("role", "status");
  form.append(label, input, button); room.append(form, feedback);
  form.onsubmit = event => {
    event.preventDefault();
    if (input.value.trim() !== data.stations.map(s => s.digit).join("")) { feedback.textContent = "Das Fach bleibt zu. Prüft Ziffern und Reihenfolge auf eurem Codezettel."; return; }
    const trophy = el("img"); trophy.src = "assets/mission-geschafft.png";
    trophy.alt = "Geöffnete Spielkiste mit goldenen Spielmarken: Die Mission ist geschafft.";
    trophy.className = "finale-art"; room.append(trophy);
    feedback.className = "success";
    feedback.textContent = "Geheimakte geöffnet – Mission geschafft! Ihr habt recherchiert, kombiniert und als Team zehn Akten gelöst. Nennt gemeinsam drei Sicherheitsregeln und erklärt ein Gefahrstoffpiktogramm. Für echte Versuche braucht ihr weiterhin die Freigabe eurer Lehrkraft.";
    input.disabled = true; button.disabled = true;
  };
  if (focus) h.focus();
}
document.querySelector("#title").textContent = data.title;
document.querySelector("#intro").textContent = data.intro;
document.title = data.title;
document.querySelector("#restart").onclick = () => {
  if (confirm("Den gesamten Spielstand löschen und neu beginnen?")) { current = 0; digits = []; render(); }
};
document.querySelector("#resumeForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.querySelector("#resumeCode");
  const feedback = document.querySelector("#resumeFeedback");
  const next = resumeIndex(input.value, data.stations);
  if (next === null) {
    input.setAttribute("aria-invalid", "true");
    feedback.textContent = "Der Code passt noch nicht. Gebt nur die gesammelten Ziffern ein, beginnend mit Station 1. Prüft die Reihenfolge und lasst keine Station aus.";
    input.focus(); return;
  }
  if (next < digits.length && !confirm("Mit diesem Code würdet ihr zu einer früheren Station zurückkehren. Wirklich dort weitermachen?")) return;
  current = next;
  digits = data.stations.slice(0, next).map(s => s.digit);
  input.removeAttribute("aria-invalid");
  feedback.textContent = next === data.stations.length ? "Alle Stationen gelöst. Öffnet jetzt das Abschlussfach!" : `Willkommen zurück! Weiter geht es mit Station ${next + 1}.`;
  render();
  room.scrollIntoView({ block: "start" });
});
render(false);
