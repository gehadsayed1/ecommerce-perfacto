import Skeleton from "react-loading-skeleton";

export default function Sekelcton() {
    return (
      <>
    <div className="row g-4 d-flex justify-content-between ">
  <div className="  col-12 col-md-6 col-lg-4 ">
  <Skeleton height="500px" width="300px"/>
  </div>
  <div className="  col-12 col-md-6 col-lg-4">
  <Skeleton height="500px" width="300px"/>
  </div>
  <div className="   col-12 col-md-6 col-lg-4">
  <Skeleton height="500px" width="300px"/>
  </div>
  <div className="   col-12 col-md-6 col-lg-4">
  <Skeleton height="500px" width="300px"/>
  </div>
  <div className="   col-12 col-md-6 col-lg-4">
  <Skeleton height="500px" width="300px"/>
  </div>
  <div className="   col-12 col-md-6 col-lg-4">
  <Skeleton height="500px" width="300px"/>
  </div>
  </div>
      </>
    )
  }