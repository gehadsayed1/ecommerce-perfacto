import React, { useState } from "react";
import style from "./bullits.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Login from "../../../pages/Auth/Login";
import CardPage from "../../../pages/websit/cardPage/CardPage";
import Invoice from "../../../pages/websit/invice/Invice";
import Cookies from "universal-cookie";
import OrderSentPage from "../../../pages/websit/ordersent/OrderSentPage ";



const Bullits = () => {
  const cookies = new Cookies();
  const token = cookies.get('ecommerc');

  const [activePage, setActivePage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const labels = isLoggedIn ? ["Bag", "Delivery", "Confirme"] : ["Bag", "Login", "Delivery", "Confirme"];

  const handleBulletClick = (index) => {
    if (index === 0) {
      setActivePage(index);
    }
  };

  const handleNavigateToInvoice = (totalPrice) => {
    setTotalCartPrice(totalPrice);
    setActivePage(1);
  };

  const handleNavigateToInvoice2 = () => {
    setActivePage(2);
  };

  const pages = () => {
    if (token) {
      return (
        <>
          {activePage === 0 && <CardPage onNavigateToInvoice={handleNavigateToInvoice} />}
          {activePage === 1 && <Invoice onNavigateToInvoice={handleNavigateToInvoice2} totalCartPrice={totalCartPrice} />}
          {activePage === 2 && <OrderSentPage/>}
        </>
      )
    } else {
      return (
        <>
          {activePage === 0 && <CardPage onNavigateToInvoice={handleNavigateToInvoice} />}
          {activePage === 1 && <Login />}
          {activePage === 2 && <Invoice onNavigateToInvoice={handleNavigateToInvoice2} totalCartPrice={totalCartPrice} />}
          {activePage === 3 && <OrderSentPage/>}
        </>
      )
    }
  }

  return (
    <div className={style.all}>
      <div className={style.bulletContainer}>
        {labels.map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`${style.bulletWrapper} ${activePage === index ? style.activeBullet : ""}`}
              onClick={() => handleBulletClick(index)}
              style={{ cursor: index === 0 ? "pointer" : "not-allowed" }}
            >
              <div className={`${style.bullet} ${activePage >= index ? style.bulletWithCheck : ""}`}>
                {activePage >= index ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  index + 1
                )}
              </div>
              <div className={style.label}>{labels[index]}</div>
            </div>
            {index < labels.length - 1 && <div className={style.line}></div>}
          </React.Fragment>
        ))}
      </div>
      {pages()}
    </div>
  );
};

export default Bullits;
