#!/usr/bin/env bash

set -e
shopt -s nullglob

npm run --workspaces build
