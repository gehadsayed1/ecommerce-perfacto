import styles from "./bars.module.css"
import React, { useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink} from "react-router-dom";
import { Minu } from "../../context/MinuContext";
import { WindowSize } from "../../context/WindoContext";
import { Links } from "./NaveLink";


export default function Saidbar() {
  const minu = useContext(Minu);
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  const isOpin = minu.isOpin;



  return (
    <>
      <div
        className={styles.ovarlay}
        style={{
          display: windowSize < "768" && isOpin ? "block" : "none",
        }}
      ></div>
      <div
        className={`${styles.sid_bar} pt-3 `}
        style={{
          left: windowSize < "768" ? (isOpin ? 0 : "-100%") : 0,
          width: isOpin ? "240px" : "fit-content",
          position: windowSize < 768 ? "fixed" : "sticky",
        }}
      >
        {Links.map((link, key) => (
          //  link.role.includes(uesr.role_id) &&
          <NavLink
          key={key}
          to={link.path}
          className={({ isActive }) => 
            isActive ? styles.said_bar_link_active : styles.said_bar_link
          }
        >
            <FontAwesomeIcon
              style={{
                padding: isOpin ? "10px 8px 10px 15px" : "10px 13px",
              }}
              icon={link.icon}
            />
            <p
              className="m-0 fs-5 fw-bold"
              style={{ display: isOpin ? "block" : "none" }}
            >
              {link.name}
            </p>
          </NavLink>
        ))}
      </div>
    </>
  );
}
