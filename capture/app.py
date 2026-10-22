"""Use Codex's real theme picker and native sample-code preview, without inference."""


def prepare(c):
    c.git_fixture()
    c.copy(f'themes/{c.slug}.tmTheme', f'.codex/themes/{c.slug}.tmTheme')
    c.write('.codex/config.toml', f'''model_provider = "capture"
model = "fixture"
[model_providers.capture]
name = "Local screenshot fixture (offline)"
base_url = "http://127.0.0.1:9/v1"
wire_api = "responses"
requires_openai_auth = false
[tui]
theme = "{c.slug}"
[projects."{c.work}"]
trust_level = "trusted"
''')
    c.env['CODEX_HOME'] = str(c.home / '.codex')
    return ['codex', '--no-alt-screen']


def drive(c):
    c.wait_text(r'fixture default')
    c.type('/theme')
    c.wait_text(r'choose a syntax highlighting theme')
    c.key('enter')
    c.wait_text(r'filter themes|Choose a theme|Syntax highlighting theme|Theme preview|Select theme')
