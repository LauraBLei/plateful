import { BrowserRouter, Route, Routes } from "react-router";
import { LayOut } from "./components/layout";
import { Home } from "./pages/home";
import { Profile } from "./pages/profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
