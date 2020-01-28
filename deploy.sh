#!/bin/sh

echo "Removing old website for clean build."
rm -rf _site/

echo "Building website"
/usr/bin/jekyll build .

echo "Copying files"
cd ./_site
scp -r * ndepalma@alumni.media.mit.edu:public_html/
cd ..

