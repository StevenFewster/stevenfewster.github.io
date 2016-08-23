#!/bin/sh

cp -r /Users/StevenFewster/Projects/Websites/stevenfewster.com/build/* .
git add --all
git commit -m "Pushing latest update"
git push
