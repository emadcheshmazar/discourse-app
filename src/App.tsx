import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopicDetail from "./pages/TopicDetail";
import AliasysExplore from "./pages/AliasysExplore";
import DatacenterSolutions from "./pages/DatacenterSolutions";
import DatacenterProducts from "./pages/DatacenterProducts";
import TechnocraticServices from "./pages/TechnocraticServices";
import ContinuitySLA from "./pages/ContinuitySLA";
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
            <Route
              path="/datacenter-solutions"
              element={<DatacenterSolutions />}
            />
            <Route
              path="/datacenter-products"
              element={<DatacenterProducts />}
            />
            <Route
              path="/technocratic-services"
              element={<TechnocraticServices />}
            />
            <Route path="/continuity-sla" element={<ContinuitySLA />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
