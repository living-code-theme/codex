import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { resolveAll } from '../scripts/palette.mjs';
import { keys, hexColors, assertContrast } from './helpers.mjs';
const fixture = JSON.parse(await readFile(new URL('./fixtures/upstream.json', import.meta.url)));
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
import plist from 'plist';

for (const f of resolveAll()) test(f.name + ': native plist scopes and Codex diff backgrounds', async () => {
  const theme = plist.parse(await read('themes/' + f.slug + '.tmTheme'));
  assert.equal(theme.name, f.name);
  const global = theme.settings[0].settings;
  assert.equal(global.foreground, f.r('fg'));
  assert.equal(global.background, f.r('bg'));
  assertContrast(global.foreground, global.background);
  assertContrast(global.foreground, global.selection);
  const rules = theme.settings.slice(1);
  const scope = value => rules.find(rule => rule.scope.split(', ').includes(value))?.settings;
  for (const [name, role] of Object.entries(fixture.scopes)) assert.equal(scope(name).foreground, f.r(role), name);
  assert.equal(scope('variable.other.constant').foreground, f.r('variable'), 'constant identifiers are not constant values');
  for (const [name, role] of [['markup.inserted', 'added'], ['markup.deleted', 'removed']]) {
    assert.equal(scope(name).background, f.mix('bg', role, 0.10));
    assertContrast(global.foreground, scope(name).background);
  }
  assert.equal(scope('comment').fontStyle, 'italic');
  assert.equal(scope('markup.bold').fontStyle, 'bold');
  for (const rule of rules) { assert.ok(rule.scope); hexColors(Object.fromEntries(Object.entries(rule.settings).filter(([key]) => key !== 'fontStyle'))); }
});
