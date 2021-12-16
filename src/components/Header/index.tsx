import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NAVBAR_ROUTERS, ROUTERS } from "constants/Routers";
import { OrderButton } from "components/OrderButton";

const LOGO = "/resources/images/logo/logo.webp";

export const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("");

  const router = useRouter();
  const pathname = router.pathname;
  useEffect(() => {
    setActive(pathname);
  });

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setCollapsed(false);
    });
  }, []);

  // router.listen = (location) => {
  //   setCollapsed(false);
  // };

  const handleClickLogo = () => {
    router.push(ROUTERS.HOME);
  };

  const handleOrder = () => {
    setCollapsed(!collapsed);
    router.push(ROUTERS.CUSTOM_STICKER);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const generateHeaderNav = useMemo(
    () =>
      NAVBAR_ROUTERS.map((nav, index) => {
        return (
          <span
            className={active === nav.path ? "navbar-active" : ""}
            key={index}
            onClick={() => setCollapsed(false)}
          >
            <Link href={nav.path}>{nav.title}</Link>
          </span>
        );
      }),
    [NAVBAR_ROUTERS]
  );

  return (
    <div className="header flex">
      <img src={LOGO} alt="logo" onClick={handleClickLogo} />
      <div className="header-nav  flex">
        <div className="header-menus flex">{generateHeaderNav}</div>
        <div className="header-order-now" onClick={handleOrder}>
          ORDER NOW
        </div>
        <div className="header-order-collapse">
          <FontAwesomeIcon icon={faBars} onClick={handleCollapse} />
          {collapsed && (
            <div className="header-order-collapse-menu flex flex-column">
              <div className="header-order-collapse-menu-close flex">
                <div>
                  <FontAwesomeIcon icon={faTimes} onClick={handleCollapse} />
                </div>
              </div>
              {/*
              <div
                className="header-order-collapse-order-now"
                onClick={handleOrder}
              >
                GET STARTED
              </div>
              */}
              <OrderButton title="Order Now" onClick={handleOrder} />
              {generateHeaderNav}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
