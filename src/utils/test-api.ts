import { DiscourseApi } from "../services/discourse-api";

export async function testAliasysAPI() {
  const api = new DiscourseApi();

  try {
    console.log("🧪 تست API آلیاسیس...");

    console.log("📂 دریافت لیست کتگوری‌ها...");
    const categories = await api.getCategories();
    console.log(
      "✅ کتگوری‌ها:",
      categories.category_list.categories.length,
      "کتگوری"
    );

    console.log("📝 دریافت لیست تاپیک‌ها...");
    const topics = await api.getLatestTopics();
    console.log("✅ تاپیک‌ها:", topics.topic_list.topics.length, "تاپیک");

    if (topics.topic_list.topics.length > 0) {
      const firstTopic = topics.topic_list.topics[0];
      console.log("📌 اولین تاپیک:", firstTopic.title);
    }

    return true;
  } catch (error) {
    console.error("❌ خطا در تست API:", error);
    return false;
  }
}

export async function testDirectConnection() {
  try {
    const response = await fetch("https://aliasysdiscourse.ir/site.json");
    if (response.ok) {
      console.log("✅ اتصال مستقیم موفق");
      return true;
    } else {
      console.log("❌ اتصال مستقیم ناموفق");
      return false;
    }
  } catch (error) {
    console.log("❌ خطای CORS:", error);
    return false;
  }
}
