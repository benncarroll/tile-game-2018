#!/bin/bash
open "http://0.0.0.0:8000"
python3 -m http.server -d "$(dirname "$0")/phaser"
