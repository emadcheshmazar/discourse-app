#!/bin/bash

# اسکریپت Deploy برای GitHub Pages
# استفاده: ./deploy-to-github-pages.sh

echo "🚀 شروع فرآیند Deploy به GitHub Pages..."

# بررسی وجود dist folder
if [ ! -d "dist" ]; then
    echo "❌ فولدر dist یافت نشد. ابتدا npm run build اجرا کنید."
    exit 1
fi

# رفتن به فولدر dist
cd dist

# بررسی وجود git repository
if [ ! -d ".git" ]; then
    echo "📁 ایجاد Git repository..."
    git init
    git branch -M main
fi

# اضافه کردن فایل‌ها
echo "📦 اضافه کردن فایل‌ها..."
git add .

# commit
echo "💾 ایجاد commit..."
git commit -m "chore: deploy dist for GitHub Pages - $(date)"

# تنظیم remote (اگر وجود نداشته باشد)
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 تنظیم remote repository..."
    git remote add origin https://github.com/emadcheshmazar/discourse-landing-build.git
fi

# push به GitHub
echo "⬆️ ارسال به GitHub..."
git push -u origin main

echo "✅ Deploy کامل شد!"
echo "🌐 URL GitHub Pages: https://emadcheshmazar.github.io/discourse-landing-build/"
echo ""
echo "📋 مراحل بعدی:"
echo "1. برو به https://github.com/emadcheshmazar/discourse-landing-build"
echo "2. Settings → Pages"
echo "3. Source: Deploy from a branch → main"
echo "4. Save"
echo "5. منتظر بمان تا GitHub Pages فعال شود"
