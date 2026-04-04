#!/bin/bash
# ============================================
# Wikiang Theme Installer for Angple
# ============================================
# Usage:
#   ./install.sh /path/to/angple
#   ./install.sh              # defaults to ../angple
# ============================================

set -euo pipefail

ANGPLE_DIR="${1:-../angple}"

if [ ! -f "$ANGPLE_DIR/package.json" ]; then
    echo "Error: $ANGPLE_DIR does not appear to be an Angple installation."
    echo "Usage: $0 /path/to/angple"
    exit 1
fi

echo "Installing Wikiang Theme to: $ANGPLE_DIR"
echo ""

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Themes -> custom-themes/
if [ -d "$SCRIPT_DIR/themes" ] && [ "$(ls -A "$SCRIPT_DIR/themes")" ]; then
    mkdir -p "$ANGPLE_DIR/custom-themes"
    cp -r "$SCRIPT_DIR/themes/"* "$ANGPLE_DIR/custom-themes/"
    echo "[OK] Wikiang theme installed to custom-themes/"
fi

echo ""
echo "Wikiang theme installation complete!"
echo "Restart your dev server and activate the 'wikiang' theme in Admin."
