import { lazy } from "react";
import RequireAuth from "./components/RequireAuth";
import AppLayout from "./layout";

const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/login"));
const Home = lazy(() => import("./pages/home"));
const SiteCms = lazy(() => import("./pages/cms/SiteCms"));
const HomeCms = lazy(() => import("./pages/cms/HomeCms"));
const AboutCms = lazy(() => import("./pages/cms/AboutCms"));
const ProjectsCms = lazy(() => import("./pages/cms/ProjectsCms"));
const ContactCms = lazy(() => import("./pages/cms/ContactCms"));

export const routes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "cms/site", element: <SiteCms /> },
      { path: "cms/home", element: <HomeCms /> },
      { path: "cms/about", element: <AboutCms /> },
      { path: "cms/projects", element: <ProjectsCms /> },
      { path: "cms/contact", element: <ContactCms /> },
    ],
  },
];
