import { Outlet } from "react-router-dom";
import Saidbar from "../../components/dashbord/Saidbar";
import Topbar from "../../components/dashbord/Topbar";
import styles from "./dashbourd.module.css"
import MyChart from "./chart/MyChart";

export default function Dashbord() {
  return (
    <div className={styles.dashbord}>
      <Topbar />
      <div className="d-flex gap-1 " style={{ marginTop: "70px" }}>
        <div><img src="../websit/imgWed/Perfecto New.png" alt="" /></div>
        
        <Saidbar />
        <Outlet />
       
      </div>
    </div>
  );
}
