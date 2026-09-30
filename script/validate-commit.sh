#!/bin/bash

# Exit immediately if any command returns a non-zero status
set -e

echo "🚀 Starting Pre-Commit Validation..."

# 1. Regenerate Prisma Client to ensure local types match schema changes
echo "🔄 Regenerating Prisma client..."
npx prisma generate

# 2. Check for Next.js TypeScript compilation errors
echo "🔍 Type-checking code (tsc)..."
npx tsc --noEmit

# 3. Check for linting errors
echo "🧹 Running linter..."
npm run lint

echo "✅ All checks passed! Proceeding with commit."
exit 0
