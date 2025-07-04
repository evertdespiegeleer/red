#!/usr/bin/env bash

set -e
shopt -s nullglob

# Create the default config files if they don't exist
for file in ./*.example ./.*.example; do
    # Remove the .example suffix
    newfile="${file%.example}"
    # Check if the new file already exists
    if [ ! -f "$newfile" ]; then
        echo "Creating $newfile file..."
        cp "$file" "$newfile"
    else
        echo "$newfile already exists, skipping..."
    fi
done

# Set git hooks
if command -v git 2>&1 >/dev/null
then
    echo "Setting git hooks path"
    git config --local core.hooksPath ./.hooks
fi

# Set correct node version
if command -v nvm 2>&1 >/dev/null
then
    nvm install
    nvm use
fi

# Load the .env file without overriding already set environment variables
curenv="$(export -p)"
set -a; . ./.env; set +a
eval "${curenv%x}"

if [ ! -z "$SKIP_INSTALL_AND_BUILD" ]; then
    echo "Skipping install and build..."
    exit 0;
fi;

# Install dependencies
npm ci --verbose
