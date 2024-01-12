import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Container from "../Containers/container";
import Home from "../Media/home.png";
import Service from "../Media/services.png";
import Request from "../Media/request.png";
import CloseBtn from "../Media/close-btn.png";
// import Logo from "../Images/logo2.jpeg";
import Button from "../Button";
import classes from "./header.module.css";
import Link from "next/link";
import Footer from "../Footer";
import Backdrop from "../Backdrop";

const links = [
  { caption: "Homepage", url: "/", icon: Home },
  { caption: "Moving Services", url: "/quote/new", icon: Request },
  { caption: "Delivery services", url: "/delivery/new", icon: Service },
  // { caption: "Dashboard", url: "/admin/dashboard" },
];

export default function Header(props) {
  const router = useRouter();
  // const { status } = useSession();
  const [sidebar, showSidebar] = useState(false);

  const showSidebarHandler = () => showSidebar(true);
  const hideSidebarHandler = () => showSidebar(false);

  return (
    <Container width="100%" flex="column" height="100%">
      <div className={classes.header}>
        <Container align="center">
          {/* <Image src={Logo} alt="logo-cross" width={35} height={35} /> */}
        </Container>
        <Container align="center">
          <button className={classes["hamburger"]} onClick={showSidebarHandler}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </Container>
      </div>
      {/* <div className={classes.motto}>DEVELOPERS LIFE SAVING HOSPITAL</div> */}
      {sidebar && (
        <>
          <Backdrop />
          <div className={classes.sidebar}>
            <Container align="center" width="100%">
              <Container width="80%">
                {/* <Image src={Logo} alt="logo-cross" width={25} height={25} /> */}
              </Container>
              <Container width="20%" justify="flex-end">
                <div onClick={hideSidebarHandler}>
                  <Image
                    src={CloseBtn}
                    alt="close button icons8"
                    width={25}
                    height={25}
                  />
                </div>
              </Container>
            </Container>

            <ul>
              {links.map((l, i) => (
                <li key={l.url}>
                  <Image
                    src={l.icon}
                    alt="home icon by icons 8"
                    width={25}
                    height={25}
                  />
                  <Link href={l.url} onClick={hideSidebarHandler}>
                    {" "}
                    {l.caption.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <main>{props.children}</main>
      <Footer />
    </Container>
  );
}
