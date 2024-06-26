import GlobalLayout from "./pages/_layout";

import Index from "./pages";
import LangIndex from "./pages/lang/[lang]";
import DetailsIndex from "./pages/details/[bookId]";
import LoginIndex from "./pages/login";
import SigninIndex from "./pages/join";
import SigninSuccessIndex from "./pages/join/success";
import SearchIndex from "./pages/search";
import SigninFailureIndex from "./pages/join/failure";
import CartIndex from "./pages/cart";
import BookCategoryIndex from "./pages/category/[lang]/[category]";
import MyRoomIndex from "./pages/myroom";
import MyRoomPointLogIndex from "./pages/myroom/point";
import MyRoomReview from "./pages/myroom/review";
import MyRoomWishListIndex from "./pages/myroom/wish";
import NotFound from "./pages/404";

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
        index: true,
      },
      {
        path: "/lang/:lang",
        element: <LangIndex />,
        index: true,
      },
      {
        path: "/details/:bookId",
        element: <DetailsIndex />,
        index: true,
      },
      {
        path: "/category/:lang/:category",
        element: <BookCategoryIndex />,
        index: true,
      },
      {
        path: "/myroom",
        element: <MyRoomIndex />,
        index: true,
      },
      {
        path: "/myroom/point",
        element: <MyRoomPointLogIndex />,
        index: true,
      },
      {
        path: "/myroom/review",
        element: <MyRoomReview />,
        index: true,
      },
      {
        path: "/myroom/wish",
        element: <MyRoomWishListIndex />,
      },
    ],
  },
  {
    path: "/cart",
    element: <CartIndex />,
    index: true,
  },
  {
    path: "/search",
    element: <SearchIndex />,
    index: true,
  },
  {
    path: "/login",
    element: <LoginIndex />,
    index: true,
  },
  {
    path: "/join",
    element: <SigninIndex />,
    index: true,
  },
  {
    path: "/join/success",
    element: <SigninSuccessIndex />,
    index: true,
  },
  {
    path: "/join/failure",
    element: <SigninFailureIndex />,
    index: true,
  },
  {
    path: "/*",
    element: <NotFound />,
    index: true,
  },
];

export const pages = [
  { route: "/" },
  { route: "/cart" },
  { route: "/search" },
  { route: "/:lang" },
  { route: "/details/:bookId" },
  { route: "/category/:lang/:category" },
  { route: "/login" },
  { route: "/signin" },
  { route: "/join/success" },
  { route: "/join/failure" },
];
