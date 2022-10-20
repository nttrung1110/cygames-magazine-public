import NotFound from "../components/NotFound/NotFound";
import Archives from "../pages/Archives/Archives";
import Category from "../pages/Category/Category";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import TagAll from "../pages/Tag/TagAll/TagAll";
import TagSingle from "../pages/Tag/TagSingle/TagSingle";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/search", component: Search },
  { path: "/search/page/:currentPage", component: Search },
  { path: "/all", component: Category },
  { path: "/all/page/:page", component: Category },
  { path: "/archives/category/:slug", component: Category },
  { path: "/archives/category/:slug/page/:page", component: Category },
  { path: "/archives/tag/:slug", component: TagSingle },
  { path: "/archives/tag/:slug/page/:page", component: TagSingle },
  { path: "/archives/:slug", component: Archives },
  { path: "/tag_list", component: TagAll },
  { path: "/staffvoice", component: Home },
  { path: "*", component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
