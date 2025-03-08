#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Move to the build directory
cd build

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

echo "Build completed successfully!"
echo "The static files are ready in the 'build' directory."
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Copy the contents of the 'build' directory to your gh-pages branch"
echo "2. Or follow the manual deployment instructions in the README.md file" 