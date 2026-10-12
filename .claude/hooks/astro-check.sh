#!/bin/sh
# PostToolUse hook (Edit|Write): run `astro check` after edits to src/ code files.
# Silent exit 0 for other files or on success; on type errors prints the tail
# of the output to stderr and exits 2 so Claude is woken to fix them.

f=$(jq -r '.tool_input.file_path // .tool_response.filePath // empty') || exit 0
[ -n "$f" ] || exit 0

root=${CLAUDE_PROJECT_DIR:-$(git -C "$(dirname "$f")" rev-parse --show-toplevel 2>/dev/null)}
[ -n "$root" ] || exit 0

case "$f" in
  "$root"/src/*) ;;
  *) exit 0 ;;
esac
case "$f" in
  *.astro|*.ts|*.mts|*.tsx) ;;
  *) exit 0 ;;
esac

cd "$root" || exit 0
out=$(npx astro check --minimumFailingSeverity error 2>&1)
status=$?
if [ "$status" -ne 0 ]; then
  printf '%s\n' "$out" | tail -n 40 >&2
  exit 2
fi
exit 0
