<!-- living-code-readme:1 -->
# 🤖 Living Code for Codex

**Calm slate. Living color.** Living Code for the Codex CLI: native TextMate syntax themes with coordinated Markdown, selections and added/removed diff backgrounds.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Previews

Real application screenshots have not been captured yet.

## Installation

```sh
git clone https://github.com/living-code-theme/codex.git
cd codex
```

```sh
mkdir -p "${CODEX_HOME:-$HOME/.codex}/themes"
cp themes/*.tmTheme "${CODEX_HOME:-$HOME/.codex}/themes/"
codex -c 'tui.theme="living-code-night"'
```

You can also choose a flavor with `/theme` in the Codex TUI. The picker persists your selection.

## Flavors

Expand a flavor for its full-size preview and activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

A real application capture is not available yet.

```sh
codex -c 'tui.theme="living-code-night"'
```

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

A real application capture is not available yet.

```sh
codex -c 'tui.theme="living-code-frost"'
```

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

A real application capture is not available yet.

```sh
codex -c 'tui.theme="living-code-paper"'
```

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

A real application capture is not available yet.

```sh
codex -c 'tui.theme="living-code-signal"'
```

</details>

## Configuration

To persist a choice manually, merge `theme = "living-code-night"` into the existing `[tui]` table of `${CODEX_HOME:-~/.codex}/config.toml`. The setting uses the filename stem, not the display name or `.tmTheme` extension. Each theme specifies both `markup.inserted` and `markup.deleted` backgrounds so Codex does not fall back to unrelated diff tints.

## Compatibility

For Codex CLI versions with custom `.tmTheme` loading and the `/theme` picker. The theme is for the terminal CLI, not the Codex desktop app or VS Code extension. Codex deliberately preserves the host terminal background for ordinary code spans; pair the port with a matching Living Code terminal theme. Theme parsing and syntax scopes are tested; this does not assert that every Codex UI element is themeable.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/codex/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque
