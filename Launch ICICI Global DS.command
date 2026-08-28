#!/bin/bash
# Double-click this file in Finder to launch GlobalDS OS.
# It serves the app on localhost and opens it in your browser.
# Close this Terminal window (or press Ctrl-C) to stop the server.

cd "$(dirname "$0")" || exit 1
PORT=8790

# If something is already serving on the port, just open the browser.
if curl -s "http://localhost:$PORT" >/dev/null 2>&1; then
  echo "GlobalDS OS is already running."
  open "http://localhost:$PORT"
  exit 0
fi

echo "Starting GlobalDS OS on http://localhost:$PORT"
echo "Keep this window open while you use the app."
echo "Close it (or press Ctrl-C) to stop."
echo ""

# Open the browser once the server is up.
( sleep 1; open "http://localhost:$PORT" ) &

# Serve this folder. python3 ships with macOS.
exec python3 -m http.server "$PORT"
