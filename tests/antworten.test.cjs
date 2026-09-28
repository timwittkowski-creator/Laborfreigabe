const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { matchesAnswer, resumeIndex, matchesFinalCode } = require('../antworten.js');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../inhalte.js'), 'utf8'), context);
const stations = context.window.ESCAPE.stations;
const code = stations.map(s => s.digit).join('');
test('all accepted answers survive case and surrounding whitespace', () => {
  for (const station of stations) for (const field of station.fields) {
    for (const answer of field.answers) assert.ok(matchesAnswer(`  ${answer.toUpperCase()}  `, field.answers));
    assert.equal(matchesAnswer('', field.answers), false);
  }
});
test('German spelling variants and valid contamination synonym', () => {
  assert.ok(matchesAnswer('VORRATSGEFAESS', ['Vorratsgefäß']));
  assert.ok(matchesAnswer('kontaminiert', stations[5].fields[2].answers));
  assert.equal(matchesAnswer('H335', ['H336']), false);
});
test('resume accepts exactly valid nonempty prefixes', () => {
  for (let i = 1; i <= stations.length; i++) assert.equal(resumeIndex(code.slice(0, i), stations), i);
  for (const value of ['', '---', '123', code + '0', '437x', '437.2']) assert.equal(resumeIndex(value, stations), null);
});
test('final code and resume agree on separators; partial code cannot finish', () => {
  for (const value of [code, '4372-968 510', '4372–968—510', '４３７２９６８５１０']) {
    assert.equal(resumeIndex(value, stations), stations.length);
    assert.ok(matchesFinalCode(value, stations));
  }
  for (const value of ['', '4372', code + '0', '4372968511']) assert.equal(matchesFinalCode(value, stations), false);
});
test('offline research card contains every requested answer', () => {
  const research = stations[6];
  for (const field of research.fields) assert.ok(research.fallback.includes(field.answers[0]));
});
test('referenced illustrations exist', () => {
  for (const station of stations) if (station.image) assert.ok(fs.existsSync(path.join(__dirname, '..', station.image)));
});
