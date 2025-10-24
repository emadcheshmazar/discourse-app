export const corsSolutions = {
  corsProxy: "https://cors-anywhere.herokuapp.com/",
  viteProxy: {},
  serverProxy: {},
};

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
