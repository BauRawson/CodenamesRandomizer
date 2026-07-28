#!/bin/bash
set -e

SRC="/Users/bau/Documents/GitHub/DreamRoom/Builds/webgl"
REPO="/Users/bau/Documents/GitHub/CodenamesRandomizer"

echo "== Dream Room reupload =="
echo "Source: $SRC"
echo ""

if [ ! -d "$SRC/Build" ]; then
  echo "ERROR: no build found at $SRC"
  echo "Export from Unity first, then run this again."
  read -p "Press Enter to close..."
  exit 1
fi

echo "-- Copying build into the repo --"
rm -rf "$REPO/js/dream-room"
mkdir -p "$REPO/js/dream-room"
cp -r "$SRC/." "$REPO/js/dream-room/"
rm -rf "$REPO"/js/dream-room/*_BurstDebugInformation_DoNotShip
rm -f "$REPO/js/dream-room/.DS_Store"

if grep -qo "game-cdn\.poki\.com\|master-loader\.js" "$REPO/js/dream-room/index.html" 2>/dev/null; then
  echo "WARNING: this looks like Unity's Poki WebGL template — index.html loads an"
  echo "external script from game-cdn.poki.com instead of being self-contained."
  echo "It may not run reliably (or at all) outside Poki's own platform. If you want"
  echo "a build that definitely self-hosts, switch back to the Default WebGL template"
  echo "in Unity: Player Settings > Resolution and Presentation > WebGL Template."
  read -p "Continue uploading anyway? (y/N) " CONTINUE
  if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    read -p "Press Enter to close..."
    exit 1
  fi
fi

BUILD_KB=$(du -sk "$REPO/js/dream-room/Build" | cut -f1)
BUILD_MB=$(awk "BEGIN { printf \"%.1f\", $BUILD_KB/1024 }")
echo "-- Build size --"
echo "Users will download ~${BUILD_MB} MB (compressed) to play this build."
echo ""

echo "-- Checking for a decompression fallback in the loader --"
if grep -qo "BrotliDecompressBuffer\|pako\|inflate" "$REPO"/js/dream-room/Build/*.loader.js; then
  echo "OK: found a client-side decompressor, this build should load fine on GitHub Pages."
else
  echo "WARNING: no decompression fallback detected."
  echo "GitHub Pages can't send the Content-Encoding header these compressed files need,"
  echo "so this build will likely fail to load. In Unity: Project Settings > Player >"
  echo "Publishing Settings > check 'Decompression Fallback', then re-export."
  read -p "Continue uploading anyway? (y/N) " CONTINUE
  if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    read -p "Press Enter to close..."
    exit 1
  fi
fi

echo ""
echo "-- Building --"
cd "$REPO"
npm run build:games

echo ""
echo "-- Committing --"
git add js/dream-room docs/play/dream-room

if git diff --cached --quiet; then
  echo "Nothing changed since the last upload — no commit made."
else
  git commit -m "Update Dream Room to latest Unity build

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
  echo ""
  echo "Committed! Run 'git push' (or your usual method) from the repo to publish."
fi

echo ""
read -p "Done. Press Enter to close this window..."
