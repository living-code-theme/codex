// Native TextMate themes for Codex's syntect renderer and diff background extraction.
const scopes = [
  ['comment', 'comment'], ['keyword, storage.type, storage.modifier', 'keyword'],
  ['keyword.operator', 'operator'], ['punctuation', 'punctuation'], ['string', 'string'],
  ['constant.character.escape', 'escape'], ['string.regexp', 'regex'], ['constant.numeric', 'number'],
  ['constant.language, support.constant', 'constant'], ['entity.name.function, support.function, variable.function', 'function'],
  ['entity.name.type, entity.name.class, support.type, support.class, entity.other.inherited-class', 'type'],
  ['entity.name.namespace, support.module', 'namespace'], ['meta.annotation, meta.decorator, entity.name.function.macro', 'decorator'],
  ['entity.name.tag', 'tag'], ['entity.other.attribute-name', 'attribute'],
  ['variable', 'variable'], ['variable.other.property, support.type.property-name', 'property'],
  ['variable.parameter', 'parameter'], ['variable.language, support.variable', 'builtin'],
  ['variable.other.constant, entity.name.constant, constant.other.caps', 'variable'],
  ['markup.heading, entity.name.section', 'heading'], ['markup.underline.link, string.other.link', 'link'],
  ['markup.raw, markup.inline.raw', 'code'], ['markup.quote', 'quote'],
  ['markup.inserted, diff.inserted', 'added'], ['markup.deleted, diff.deleted', 'removed'], ['markup.changed', 'modified'],
  ['invalid, invalid.illegal', 'error'], ['invalid.deprecated', 'warning'],
];
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const dict = value => `<dict>${Object.entries(value).map(([key, val]) => `<key>${escape(key)}</key><string>${escape(val)}</string>`).join('')}</dict>`;
export function textmate(f) {
  const global = { background: f.r('bg'), foreground: f.r('fg'), caret: f.r('cursor'), selection: f.r('selection'),
    lineHighlight: f.r('lineHighlight'), gutter: f.r('bg'), gutterForeground: f.r('lineNumber'), invisibles: f.r('border') };
  const rules = scopes.map(([scope, role]) => {
    const settings = { foreground: f.r(role) };
    if (f.styles[role]) settings.fontStyle = f.styles[role];
    if (['added', 'removed'].includes(role)) settings.background = f.mix('bg', role, 0.10);
    return `<dict><key>name</key><string>${role}</string><key>scope</key><string>${scope}</string><key>settings</key>${dict(settings)}</dict>`;
  });
  for (const [scope, fontStyle] of [['markup.bold', 'bold'], ['markup.italic', 'italic'], ['markup.strikethrough', 'strikethrough']]) {
    rules.push(`<dict><key>scope</key><string>${scope}</string><key>settings</key>${dict({ fontStyle })}</dict>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0"><dict><key>name</key><string>${f.name}</string><key>settings</key><array><dict><key>settings</key>${dict(global)}</dict>${rules.join('')}</array></dict></plist>\n`;
}
export function generate(flavors) {
  return flavors.map(f => ({ path: `themes/${f.slug}.tmTheme`, content: textmate(f) }));
}
