import { useAuth } from "@clerk/clerk-react";

import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export default function GNB() {
  const { isSignedIn } = useAuth();

  const routes = [
    {
      text: "베스트",
      path: "/bestseller",
    },
    {
      text: "신상품",
      path: "/new",
    },
    {
      text: "이벤트",
      path: "/event",
    },
  ];

  return (
    <div className={cn("home-nav__gnb", isSignedIn && "login")}>
      <ol className="home-nav__gnb__wrap">
        {routes.map((ele) => (
          <li key={ele.text}>
            <Link className="link home-nav__gnb__wrap__link" to={ele.path}>
              {ele.text}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
