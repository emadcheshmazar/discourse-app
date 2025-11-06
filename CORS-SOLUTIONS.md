# راه‌حل‌های CORS برای Discourse API

## مشکل CORS

وقتی از مرورگر مستقیماً به API خارجی درخواست می‌فرستی، CORS error می‌گیری.

## راه‌حل‌های موجود

### 1. استفاده از Vite Proxy (پیشنهادی)

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      "/api/discourse": {
        target: "https://meta.discourse.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/discourse/, ""),
      },
    },
  },
});
```

### 2. استفاده از Environment Variables

```bash
# .env
VITE_DISCOURSE_BASE_URL=/api/discourse
```

### 3. استفاده از CORS Proxy (تست)

```typescript
// برای تست فقط
const corsProxy = "https://cors-anywhere.herokuapp.com/";
const baseUrl = corsProxy + "https://meta.discourse.org";
```

### 4. Server-side Proxy (Production)

یک endpoint در سرور خودت بساز که به Discourse درخواست بفرسته.

## استفاده از HttpClient

```typescript
import { DiscourseApi } from "./services/discourse-api";

const api = new DiscourseApi();

// لیست کتگوری‌ها
const categories = await api.getCategories();

// لیست پست‌ها
const topics = await api.getLatestTopics();

// پست‌های یک کتگوری
const categoryTopics = await api.getCategoryTopics("general", 124);
```

## تست اتصال

```typescript
import { testDiscourseConnection } from "./utils/cors-test";

// تست اتصال
const isConnected = await testDiscourseConnection();
console.log("اتصال:", isConnected ? "موفق" : "ناموفق");
```
