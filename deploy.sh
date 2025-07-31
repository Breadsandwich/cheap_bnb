#!/bin/bash

# Cheap BnB Deployment Script for Dokploy
# This script helps prepare and deploy the application

set -e

echo "🚀 Starting Cheap BnB deployment..."

# Check if we're in the right directory
if [ ! -f "Dockerfile" ]; then
    echo "❌ Error: Dockerfile not found. Please run this script from the project root."
    exit 1
fi

# Check if required files exist
echo "📋 Checking required files..."
required_files=("dokploy.yaml" "requirements.txt" "Dockerfile" "app/__init__.py")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Required file $file not found."
        exit 1
    fi
done

echo "✅ All required files found."

# Check if environment variables are set
echo "🔧 Checking environment variables..."
required_env_vars=("SECRET_KEY" "DATABASE_URL" "AWS_ACCESS_KEY_ID" "AWS_SECRET_ACCESS_KEY" "AWS_S3_BUCKET")
missing_vars=()

for var in "${required_env_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "⚠️  Warning: The following environment variables are not set:"
    printf '   %s\n' "${missing_vars[@]}"
    echo "   Please set them in your Dokploy dashboard before deployment."
fi

# Build the React app
echo "🏗️  Building React application..."
cd react-app
npm install
npm run build
cd ..

echo "✅ React build completed."

# Check if build was successful
if [ ! -d "react-app/build" ]; then
    echo "❌ Error: React build failed. Check the build output above."
    exit 1
fi

echo "✅ React build verified."

# Test Docker build locally (optional)
if [ "$1" = "--test-build" ]; then
    echo "🐳 Testing Docker build locally..."
    docker build -t cheap-bnb-test .
    echo "✅ Docker build test completed."
fi

echo "🎉 Deployment preparation completed!"
echo ""
echo "📝 Next steps:"
echo "1. Push your changes to GitHub"
echo "2. Connect your repository to Dokploy"
echo "3. Set the required environment variables in Dokploy dashboard"
echo "4. Deploy using the dokploy.yaml configuration"
echo "5. Run database migrations: flask db upgrade"
echo "6. Seed the database: flask seed all"
echo ""
echo "🔗 For more information, see the README.md file."
