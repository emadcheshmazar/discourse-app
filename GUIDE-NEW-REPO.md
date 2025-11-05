# راهنمای انتقال پروژه به ریپوی جدید GitHub

## مرحله ۱: ایجاد ریپوی جدید در GitHub

1. به آدرس https://github.com/new بروید
2. یک نام برای ریپوی جدید انتخاب کنید
3. ریپو را Public یا Private کنید
4. **مهم**: ریپو را خالی ایجاد کنید (README، .gitignore یا license اضافه نکنید)
5. روی "Create repository" کلیک کنید

## مرحله ۲: دریافت URL ریپوی جدید

بعد از ایجاد ریپو، URL را کپی کنید. به صورت یکی از این دو حالت است:
- HTTPS: `https://github.com/yourusername/your-repo-name.git`
- SSH: `git@github.com:yourusername/your-repo-name.git`

## مرحله ۳: اجرای اسکریپت

در PowerShell، دستور زیر را اجرا کنید:

```powershell
.\push-to-new-repo.ps1 -NewRepoUrl "https://github.com/yourusername/your-repo-name.git"
```

یا اگر می‌خواهید دستی انجام دهید:

### گزینه الف: با اسکریپت (پیشنهادی)
```powershell
.\push-to-new-repo.ps1 -NewRepoUrl "URL_ریپوی_جدید_شما"
```

### گزینه ب: دستی

1. **حذف remote فعلی:**
```powershell
git remote remove origin
```

2. **اضافه کردن remote جدید:**
```powershell
git remote add origin https://github.com/yourusername/your-new-repo.git
```

3. **Commit کردن تغییرات (اگر می‌خواهید):**
```powershell
git add .
git commit -m "Initial commit"
```

4. **Push کردن به ریپوی جدید:**
```powershell
git push -u origin production
```

یا اگر می‌خواهید به branch اصلی (main) push کنید:
```powershell
git push -u origin production:main
```

## نکات مهم:

- اگر تغییرات commit نشده دارید، اول آن‌ها را commit کنید
- اگر می‌خواهید branch دیگری را push کنید، نام branch را در دستور push تغییر دهید
- اگر می‌خواهید تمام branch ها را push کنید: `git push -u origin --all`

