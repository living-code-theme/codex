import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import plist from 'plist';
import { resolveAll } from '../scripts/palette.mjs';
const reference = JSON.parse(await readFile(new URL('./fixtures/neovim-syntax.json', import.meta.url)));
const scopes = {
  comment: 'comment', keyword: 'keyword', 'storage.type': 'keyword', 'storage.modifier': 'keyword',
  'keyword.operator': 'operator', punctuation: 'punctuation', string: 'string',
  'constant.numeric': 'number', 'constant.language': 'constant',
  'entity.name.function': 'function', 'entity.name.type': 'type', 'entity.name.namespace': 'namespace',
  variable: 'variable', 'variable.parameter': 'parameter', 'variable.other.property': 'property',
  'variable.language': 'builtin', 'variable.other.constant': 'variable',
};
for (const f of resolveAll()) test(`${f.name}: native TextMate syntax scopes match Neovim`, async () => {
  const theme = plist.parse(await readFile(new URL(`../themes/${f.slug}.tmTheme`, import.meta.url), 'utf8'));
  for (const [role, color] of Object.entries(reference.flavors[f.id])) assert.equal(f.r(role), color, role);
  for (const [scope, role] of Object.entries(scopes)) {
    const rule = theme.settings.find(rule => rule.scope?.split(', ').includes(scope));
    assert.equal(rule?.settings.foreground, reference.flavors[f.id][role], scope);
  }
});
