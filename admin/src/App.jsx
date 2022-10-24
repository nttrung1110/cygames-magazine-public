import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useAuth } from "./hooks";

import { PrivateRoute, PublicRoute } from "./routes";

import CreateArticle from "./pages/CreateArticle";
import Articles from "./pages/Articles";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UpdateArticle from "./pages/UpdateArticle";
import Tags from "./pages/Tags";

const App = () => {
  useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute Component={Login} />} />
        <Route path="/" element={<PrivateRoute Component={Articles} />} />
        <Route
          path="/create-article"
          element={<PrivateRoute Component={CreateArticle} />}
        />
        <Route
          path="/update-article/:slug"
          element={<PrivateRoute Component={UpdateArticle} />}
        />
        <Route path="/tags" element={<PrivateRoute Component={Tags} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
