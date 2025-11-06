import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopicDetail from "./pages/TopicDetail";
import AliasysExplore from "./pages/AliasysExplore";
import { Header } from "./components/layout/Header";
import "./App.css";

// Force rebuild for GitHub Pages - v2

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 p-0">
        <Header />

        <main>
          <Routes>
            <Route path="/discourse-landing-build/" element={<Home />} />
            <Route
              path="/discourse-landing-build/topic/:topicId"
              element={<TopicDetail />}
            />
            <Route path="/topic/:topicId" element={<TopicDetail />} />
            <Route path="/aliasys-explore" element={<AliasysExplore />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
