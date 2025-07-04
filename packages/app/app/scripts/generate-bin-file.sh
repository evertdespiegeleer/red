#!/usr/bin/env bash

set -e
shopt -s nullglob

# Script which generates the bin file in ./dist
if [ ! -d "./dist" ]; then
    echo "Creating dist directory..."
    mkdir -p ./dist
fi

# Check if the main.js file exists
if [ ! -f "./dist/main.js" ]; then
    echo "Error: ./dist/main.js does not exist. Please build the project first."
    exit 1
fi

# Create the bin file
bin_file_path="$(dirname "$0")/../dist/bin"

# Delete bin file if it already exists
if [ -f "$bin_file_path" ]; then
    echo "Removing existing bin file at $bin_file_path..."
    rm "$bin_file_path"
fi

echo "Creating bin file at $bin_file_path..."
touch "$bin_file_path"
echo "#!/usr/bin/env sh" > "$bin_file_path"
echo "node \"\$(dirname \"\$0\")/main.js\"" >> "$bin_file_path"
chmod +x "$bin_file_path"