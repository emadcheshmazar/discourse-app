export async function testApiWithNewConfig() {
  // در development از proxy استفاده می‌کنیم
  const apiBase = import.meta.env.DEV
    ? "/api/discourse"
    : "https://aliasysdiscourse.ir";

  console.log(`🔧 Mode: ${import.meta.env.MODE}`);
  console.log(`🌐 API Base: ${apiBase}`);

  try {
    console.log("📂 تست categories...");
    const categoriesResponse = await fetch(`${apiBase}/categories.json`, {
      method: "GET",
      mode: import.meta.env.DEV ? "same-origin" : "cors",
      credentials: "include",
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
      },
    });

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
    const topicsResponse = await fetch(`${apiBase}/latest.json`, {
      method: "GET",
      mode: import.meta.env.DEV ? "same-origin" : "cors",
      credentials: "include",
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
      },
    });

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
  console.log("🧪 تست مستقیم fetch با proxy...");

  try {
    // استفاده از proxy در development
    const apiUrl = import.meta.env.DEV
      ? "/api/discourse/latest.json"
      : "https://aliasysdiscourse.ir/latest.json";

    console.log(`🔗 درخواست به: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: "GET",
      mode: import.meta.env.DEV ? "same-origin" : "cors",
      credentials: "include",
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
      },
    });

    console.log(`📊 Response status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log(
        "✅ Direct fetch موفق:",
        data.topic_list?.topics?.length || 0,
        "تاپیک"
      );
      return true;
    } else {
      const errorText = await response.text().catch(() => "");
      console.log("❌ Direct fetch ناموفق:", response.status);
      console.log("📄 Response:", errorText.substring(0, 200));
      return false;
    }
  } catch (error) {
    console.error("❌ Direct fetch error:", error);
    return false;
  }
}
