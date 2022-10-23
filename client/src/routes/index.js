import NotFound from "../components/NotFound";
import Archives from "../pages/Archives";
import Category from "../pages/Category";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Tag from "../pages/Tag";
import TagList from "../pages/TagList";

const publicRoutes = [
  {
    path: "/",
    component: Home,
    navigationBar: true,
    showNavigationBarMobile: true,
  },
  { path: "/search", component: Search },
  { path: "/search/page/:page", component: Search },
  { path: "/all", component: Category },
  { path: "/all/page/:page", component: Category },
  {
    path: "/archives/category/:slug",
    component: Category,
    navigationBar: true,
  },
  {
    path: "/archives/category/:slug/page/:page",
    component: Category,
    navigationBar: true,
  },
  { path: "/archives/tag/:slug", component: Tag, navigationBar: true },
  {
    path: "/archives/tag/:slug/page/:page",
    component: Tag,
    navigationBar: true,
  },
  { path: "/archives/:slug", component: Archives },
  { path: "/tag_list", component: TagList },
  { path: "/staffvoice", component: Home },
  { path: "*", component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
