import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => ({
  base: "/",
  plugins: [react()],
  server: {
    proxy:
      mode === "development"
        ? {
            "/api/discourse": {
              target: "https://aliasysdiscourse.ir",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api\/discourse/, ""),
              secure: false,
              configure: (proxy) => {
                proxy.on("proxyReq", (proxyReq, req) => {
                  // فوروارد کردن کوکی‌های درخواست اصلی
                  let cookieHeader = req.headers.cookie || "";

                  // اضافه کردن کوکی‌های Discourse به صورت هاردکد (برای development)
                  // این کوکی‌ها از درخواست موفق شما کپی شده‌اند
                  const discourseCookies = [
                    "theme_ids=5%7C2",
                    "forced_color_mode=dark",
                    "_forum_session=8j3GEsjLgHG7JLarYSTnjfDsnFWNdrbx7gGqu0MIDXwES2%2Fmk0StRs6j3OQlHGHKy3zJNKWFNDYC60WT2YeFop19KhrDS6tvvI9qHkxyQv1lZ8y00Ws1dfiBWArT5higBWaTKf1PtGbAiRg0LrDxHggyeeLuGV9%2BWzRxwSPb1nEyTs0WNWRcHUmGsz0w4RxW8GUBMGHMYOW1xeyelIGiDafZggXY4lOZj%2BWZeJAR%2FsxgJYcDQIMhSNvcmnuKvaY5PuSuVHMX%2B3r9iliqBhY%3D--jqQIOQxX5bmhB56I--rfcKyfZQ89HqQXAFWBSr%2Fw%3D%3D",
                    "_t=hOUAN3li8N%2FJ%2FmUgPCTgazaL%2FaKOFmqIFT491XsIgu3EPx9BuegVy6suPIFY3MovjTVCGo7568RNI0p3GJ6WIxhetDpqlFM9CzH4M39TpcAW4WNxqdKmbbY%2FzkEUuDhBy8y8molKaRPSt%2BBRmC6SSyUXoHd8zgjmV4UGitjHSLVlD4jE311tIbXIf%2BqvwhvKE7JScfRhcuZQ0JsQDjNL%2BIqOaUwOPY9Y5%2Fc02MHJ2mDGQXMUv9oV4J%2F9rVjn44hBo60zPvntgOElXOjMjIYLB9fVCtVAwpAP--5dEgHZfAI4z0scUC--g29aMYfS6uzTN453bAFYlg%3D%3D",
                    "__profilin=p%3Dt%2Ca%3D36fd16e71ed6ca2683aa45848f1591a4%7C5e202d935bc9c43e26c7b515ae9d1ca3",
                  ].join("; ");

                  // ترکیب کوکی‌های موجود با کوکی‌های Discourse
                  if (cookieHeader) {
                    cookieHeader = `${cookieHeader}; ${discourseCookies}`;
                  } else {
                    cookieHeader = discourseCookies;
                  }

                  proxyReq.setHeader("Cookie", cookieHeader);

                  // اضافه کردن هدرهای Discourse برای احراز هویت (هاردکد)
                  proxyReq.setHeader("discourse-logged-in", "true");
                  proxyReq.setHeader("discourse-present", "true");
                  proxyReq.setHeader("discourse-track-view", "true");

                  // CSRF token هاردکد برای development
                  proxyReq.setHeader(
                    "x-csrf-token",
                    "ik6bj9SiQVSq9EdbLaTTp2EATCwY1t0SBli3AApSIrv7GE_CeKUKVFm_NfDWF8rtb0pj5HE5Qd1g4d1OkbX1rg"
                  );

                  // هدرهای دیگر
                  proxyReq.setHeader("x-requested-with", "XMLHttpRequest");
                  proxyReq.setHeader(
                    "accept",
                    "application/json, text/javascript, */*; q=0.01"
                  );
                  proxyReq.setHeader(
                    "accept-language",
                    "en-US,en;q=0.9,fa-IR;q=0.8,fa;q=0.7"
                  );
                });
              },
            },
          }
        : undefined,
  },
}));
