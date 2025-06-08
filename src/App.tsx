import { BrowserRouter, Route, Routes } from "react-router";
import { LayOut } from "./components/layout";
import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import { AuthProvider } from "./context/authprovider";
import { CommonProvider } from "./context/common";
import "./index.css";
import { CreateRecipe } from "./pages/create";

function App() {
  return (
    <>
      <CommonProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LayOut />}>
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create" element={<CreateRecipe />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CommonProvider>
    </>
  );
}

export default App;
