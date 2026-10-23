"""Resume a port-owned demo rollout in Codex. No credentials or inference."""
import json


SESSION = 'a40d1e4c-1150-4000-8000-000000000010'


def prepare(c):
    c.git_fixture()
    c.copy(f'themes/{c.slug}.tmTheme', f'.codex/themes/{c.slug}.tmTheme')
    c.write('.codex/config.toml', f'''model_provider = "capture"
model = "gpt-5.4"
check_for_update_on_startup = false
[model_providers.capture]
name = "Local demo (offline)"
base_url = "http://127.0.0.1:9/v1"
wire_api = "responses"
requires_openai_auth = false
[tui]
theme = "{c.slug}"
[projects."{c.work}"]
trust_level = "trusted"
''')
    c.env['CODEX_HOME'] = str(c.home / '.codex')
    timestamp = '2026-01-01T12:00:00.000Z'
    prompt = 'Review the glyph render loop and suggest a safer implementation. (Local demo)'
    review = (c.root / 'capture/review.md').read_text()
    records = [
        ('session_meta', {'id': SESSION, 'session_id': SESSION, 'timestamp': timestamp, 'cwd': str(c.work),
                          'originator': 'codex_cli_rs', 'cli_version': '0.162.1', 'source': 'cli', 'model_provider': 'capture'}),
        ('response_item', {'type': 'message', 'role': 'user', 'content': [{'type': 'input_text', 'text': prompt}]}),
        ('event_msg', {'type': 'user_message', 'message': prompt, 'images': []}),
        ('response_item', {'type': 'message', 'role': 'assistant', 'content': [{'type': 'output_text', 'text': review}],
                           'phase': 'final_answer'}),
        ('event_msg', {'type': 'agent_message', 'message': review, 'phase': 'final_answer'}),
    ]
    c.write(f'.codex/sessions/2026/01/01/rollout-2026-01-01T12-00-00-{SESSION}.jsonl',
            '\n'.join(json.dumps({'timestamp': timestamp, 'type': kind, 'payload': payload}) for kind, payload in records) + '\n')
    return ['codex', '--no-daemon', '--no-alt-screen', 'resume', SESSION]


def drive(c):
    c.wait_text(r'add boundary tests next')
