@echo off
REM اسکریپت Deploy برای GitHub Pages (Windows)
REM استفاده: deploy-to-github-pages.bat

echo 🚀 شروع فرآیند Deploy به GitHub Pages...

REM بررسی وجود dist folder
if not exist "dist" (
    echo ❌ فولدر dist یافت نشد. ابتدا npm run build اجرا کنید.
    pause
    exit /b 1
)

REM رفتن به فولدر dist
cd dist

REM بررسی وجود git repository
if not exist ".git" (
    echo 📁 ایجاد Git repository...
    git init
    git branch -M main
)

REM اضافه کردن فایل‌ها
echo 📦 اضافه کردن فایل‌ها...
git add .

REM commit
echo 💾 ایجاد commit...
git commit -m "chore: deploy dist for GitHub Pages - %date% %time%"

REM تنظیم remote (اگر وجود نداشته باشد)
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 تنظیم remote repository...
    git remote add origin https://github.com/emadcheshmazar/discourse-landing-build.git
)

REM push به GitHub
echo ⬆️ ارسال به GitHub...
git push -u origin main

echo ✅ Deploy کامل شد!
echo 🌐 URL GitHub Pages: https://emadcheshmazar.github.io/discourse-landing-build/
echo.
echo 📋 مراحل بعدی:
echo 1. برو به https://github.com/emadcheshmazar/discourse-landing-build
echo 2. Settings → Pages
echo 3. Source: Deploy from a branch → main
echo 4. Save
echo 5. منتظر بمان تا GitHub Pages فعال شود
pause
