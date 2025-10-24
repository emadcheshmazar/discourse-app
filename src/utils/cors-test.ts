// تست CORS و راه‌حل‌های ممکن
export const corsSolutions = {
  // راه‌حل ۱: استفاده از CORS proxy
  corsProxy: "https://cors-anywhere.herokuapp.com/",

  // راه‌حل ۲: استفاده از Vite proxy در development
  viteProxy: {
    // در vite.config.ts اضافه کن:
    // server: {
    //   proxy: {
    //     '/api/discourse': {
    //       target: 'https://meta.discourse.org',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api\/discourse/, '')
    //     }
    //   }
    // }
  },

  // راه‌حل ۳: استفاده از server-side proxy
  serverProxy: {
    // یک endpoint در سرور خودت بساز که به Discourse درخواست بفرسته
    // اینطوری CORS مشکل نمیشه
  },
};

// تست اتصال به Discourse
export async function testDiscourseConnection() {
  try {
    const response = await fetch("https://meta.discourse.org/site.json");
    if (response.ok) {
      console.log("✅ اتصال به Discourse موفق");
      return true;
    } else {
      console.log("❌ اتصال به Discourse ناموفق");
      return false;
    }
  } catch (error) {
    console.log("❌ خطای CORS:", error);
    return false;
  }
}
