import classes from "./index.module.css";
import CloseBtn from "../Media/close-btn.png";
import Image from "next/image";
import Backdrop from "../Backdrop";

export default function Modal(props) {
  return (
    <>
      <Backdrop />
      <div className={classes.modal}>
        <div className={classes["btn-container"]}>
          <button className={classes.btn} onClick={props.click} type="button">
            <Image
              src={CloseBtn}
              alt="home icon by icons 8"
              width={25}
              height={25}
            />
          </button>
        </div>
        {props.children}
      </div>
    </>
  );
}
