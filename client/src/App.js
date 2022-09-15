import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home/Home";
import Search from "./views/Search/Search";
import Category from "./views/Category/Category";
import Archives from "./views/Archives/Archives";
import TagAll from "./views/Tag/TagAll/TagAll";
import TagSingle from "./views/Tag/TagSingle/TagSingle";
import NotFound from "./views/NotFound/NotFound";

import LayoutProvider from "./contexts/LayoutContext";
import ArticleProvider from "./contexts/ArticleContext";
import TagProvider from "./contexts/TagContext";

const App = () => {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <TagProvider>
          <ArticleProvider>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/page/:currentPage" element={<Search />} />
              <Route path="/all" element={<Category />} />
              <Route path="/all/page/:currentPage" element={<Category />} />
              <Route path="/archives/:article_id" element={<Archives />} />
              <Route
                path="/archives/category/:category_name"
                element={<Category />}
              />
              <Route
                path="/archives/category/:category_name/page/:currentPage"
                element={<Category />}
              />

              <Route path="/archives/tag/:tag_name" element={<TagSingle />} />
              <Route
                path="/archives/tag/:tag_name/page/:currentPage"
                element={<TagSingle />}
              />
              <Route path="/staffvoice" element={<Home />} />
              <Route path="/tag_list" element={<TagAll />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ArticleProvider>
        </TagProvider>
      </LayoutProvider>
    </BrowserRouter>
  );
};

export default App;
