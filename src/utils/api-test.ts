export async function testApiWithNewConfig() {
  const apiBase =
    import.meta.env.MODE === "development"
      ? "/api/discourse"
      : "https://aliasysdiscourse.ir";

  console.log(`🔧 Mode: ${import.meta.env.MODE}`);
  console.log(`🌐 API Base: ${apiBase}`);

  try {
    console.log("📂 تست categories...");
    const categoriesResponse = await fetch(`${apiBase}/categories.json`);
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      console.log(
        "✅ Categories:",
        categories.category_list.categories.length,
        "کتگوری"
      );
    } else {
      console.log("❌ Categories failed:", categoriesResponse.status);
    }

    console.log("📝 تست latest topics...");
    const topicsResponse = await fetch(`${apiBase}/latest.json`);
    if (topicsResponse.ok) {
      const topics = await topicsResponse.json();
      console.log("✅ Topics:", topics.topic_list.topics.length, "تاپیک");
    } else {
      console.log("❌ Topics failed:", topicsResponse.status);
    }

    return true;
  } catch (error) {
    console.error("❌ API Test Error:", error);
    return false;
  }
}

export async function testDirectFetch() {
  console.log("🧪 تست مستقیم fetch...");

  try {
    const response = await fetch("/api/discourse/latest.json");
    if (response.ok) {
      const data = await response.json();
      console.log(
        "✅ Direct fetch موفق:",
        data.topic_list.topics.length,
        "تاپیک"
      );
      return true;
    } else {
      console.log("❌ Direct fetch ناموفق:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Direct fetch error:", error);
    return false;
  }
}
