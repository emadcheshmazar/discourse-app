import { useEffect, useState } from "react";
import { DiscourseService } from "../services/discourse-service";
import { Card } from "../components/ui/Card";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import type { DiscourseSession, DiscourseUser } from "../types/discourse";

export default function About() {
  const [user, setUser] = useState<DiscourseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const discourseService = new DiscourseService();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const sessionData: DiscourseSession = await discourseService.getCurrentUser();
        setUser(sessionData.current_user);
        setError(null);
      } catch (err) {
        setError(
          "خطا در دریافت اطلاعات کاربر. احتمالاً کاربر لاگین نیست یا دامنه Discourse تنظیم نشده."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleRetry = () => {
    loadUser();
  };

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const sessionData: DiscourseSession = await discourseService.getCurrentUser();
      setUser(sessionData.current_user);
    } catch (err) {
      setError(
        "خطا در دریافت اطلاعات کاربر. احتمالاً کاربر لاگین نیست یا دامنه Discourse تنظیم نشده."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ℹ️ درباره ما</h1>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">ℹ️ درباره ما</h1>

      {error ? (
        <ErrorMessage
          message={error}
          onRetry={handleRetry}
          className="mb-8"
        />
      ) : user ? (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            اطلاعات کاربر لاگین‌شده
          </h2>
          <Card>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-700">نام کاربری:</span>
                <span className="text-gray-900">{user.username}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-700">نام:</span>
                <span className="text-gray-900">{user.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-700">ایمیل:</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-700">تاریخ عضویت:</span>
                <span className="text-gray-900">
                  {new Date(user.created_at).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-700">سطح اعتماد:</span>
                <span className="text-gray-900">{user.trust_level}</span>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="mb-8">
          <Card>
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                کاربر لاگین نیست
              </h2>
              <p className="text-gray-600">
                برای مشاهده اطلاعات کاربر، ابتدا در Discourse لاگین کنید.
              </p>
            </div>
          </Card>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">درباره اپلیکیشن</h2>
        
        <Card>
          <div className="space-y-4">
            <p className="text-gray-700">
              این اپلیکیشن React با استفاده از Vite و Rolldown ساخته شده و به
              Discourse متصل میشه.
            </p>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">ویژگی‌ها:</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span>React Router برای navigation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span>TypeScript برای type safety</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span>SWC برای کامپایل سریع</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span>Rolldown برای build سریع‌تر</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span>اتصال به Discourse API</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span>کامپوننت‌های قابل استفاده مجدد</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span>ساختار تمیز و قابل نگهداری</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
