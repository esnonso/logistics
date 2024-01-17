import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Container from "../Containers/container";
import Home from "../Media/home.png";
import Service from "../Media/services.png";
import Trolley from "../Media/trolley.png";
import Request from "../Media/request.png";
import CloseBtn from "../Media/close-btn.png";
import Button from "../Button";
import UserIcon from "../Media/user.png";
import classes from "./header.module.css";
import Link from "next/link";
import Footer from "../Footer";
import Backdrop from "../Backdrop";
import Login from "../Auth/login";
import Modal from "../Modal";
import { H1Tags } from "../Text";

const links = [
  { caption: "Homepage", url: "/", icon: Home },
  { caption: "Moving Services", url: "/quote/new", icon: Trolley },
  { caption: "Delivery services", url: "/delivery/new", icon: Service },
];

export default function Header(props) {
  const router = useRouter();
  const { status } = useSession();
  const [sidebar, showSidebar] = useState(false);
  const [dropdown, showDropdown] = useState(false);
  const [loginForm, showLoginForm] = useState(false);

  const showDropDownHandler = () => showDropdown(true);
  const hideDropDownHandler = () => showDropdown(false);
  const showSidebarHandler = () => showSidebar(true);
  const hideSidebarHandler = () => showSidebar(false);
  const showLoginFormHandler = () => showLoginForm(true);
  const hideLoginFormHandler = () => showLoginForm(false);

  return (
    <Container width="100%" flex="column" height="100%">
      <div className={classes.header}>
        <Container align="center">
          <H1Tags color="burlywood">
            <Link href="/" className={classes.logo}>
              Country<span style={{ color: "white" }}>Movers</span>
            </Link>
          </H1Tags>
        </Container>
        <Container align="center">
          <Image
            src={UserIcon}
            alt="logo-cross"
            width={25}
            height={25}
            onMouseOver={showDropDownHandler}
            onMouseLeave={hideDropDownHandler}
            className={classes.image}
          />
          {dropdown && (
            <div
              className={classes["drop-down"]}
              onMouseOver={showDropDownHandler}
              onMouseLeave={hideDropDownHandler}
            >
              {status === "unauthenticated" && (
                <button onClick={showLoginFormHandler}>Login</button>
              )}
              {status === "authenticated" && (
                <>
                  <Button
                    text="Profile"
                    color={"black"}
                    font="inherit"
                    click={() => router.push("/profile")}
                  />
                  <Button
                    text="Logout"
                    color={"black"}
                    font="inherit"
                    click={async () => signOut()}
                  />
                </>
              )}
            </div>
          )}
          <button className={classes["hamburger"]} onClick={showSidebarHandler}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </Container>
      </div>

      {loginForm && (
        <Modal click={hideLoginFormHandler}>
          <Login modal={true} onHide={hideLoginFormHandler} />
        </Modal>
      )}

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
