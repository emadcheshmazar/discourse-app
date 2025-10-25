# Discourse Integration Files

این فایل‌ها برای ادغام اپ React با Discourse استفاده می‌شوند.

## فایل‌ها

### 1. `iframe-script.html`

اسکریپت iframe که در Discourse قرار می‌گیرد تا صفحه React را نمایش دهد.

**نحوه استفاده:**

- برو به Admin → Customize → Themes
- Theme مورد نظر را انتخاب کن
- برو به common/body.html
- کد را در انتهای فایل قرار بده

### 2. `plugin.rb`

پلاگین Discourse برای redirect کردن مسیر `/my-react-page` به GitHub Pages.

**نحوه نصب:**

1. فایل را در پوشه پلاگین‌های Discourse قرار بده
2. Discourse را restart کن
3. برو به `/my-react-page` - باید redirect شود

## مراحل Deploy

### قدم ۱: Deploy به GitHub Pages

```bash
# در ریشه پروژه
npm run build
./deploy-to-github-pages.sh  # Linux/Mac
# یا
deploy-to-github-pages.bat   # Windows
```

### قدم ۲: فعال‌سازی GitHub Pages

1. برو به https://github.com/emadcheshmazar/discourse-landing-build
2. Settings → Pages
3. Source: Deploy from a branch → main
4. Save

### قدم ۳: ادغام با Discourse

**روش ۱: iframe (ساده‌تر)**

- کد `iframe-script.html` را در common/body.html قرار بده
- برو به `/my-react-page` در Discourse

**روش ۲: redirect plugin (بهتر)**

- پلاگین `plugin.rb` را نصب کن
- برو به `/my-react-page` - redirect می‌شود

## تست

1. URL GitHub Pages: https://emadcheshmazar.github.io/discourse-landing-build/
2. URL Discourse: https://aliasysdiscourse.ir/my-react-page

## عیب‌یابی

- اگر صفحه لود نشد، Console را چک کن
- اگر CSP خطا داد، در Discourse Settings → Security → CSP تنظیمات را تغییر بده
- اگر redirect کار نکرد، پلاگین را restart کن
