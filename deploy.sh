#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Move to the build directory
cd build

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# If you're deploying to a custom domain, add a CNAME file
# echo "yourdomain.com" > CNAME

# Initialize git repository if not already done
if [ ! -d .git ]; then
  git init
  git checkout -b main
  git remote add origin git@github.com:dbrownTAG/Amherst-Title-Data.git
fi

# Add all files
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Force push to the gh-pages branch
git push -f origin main:gh-pages

echo "Deployed successfully!" 