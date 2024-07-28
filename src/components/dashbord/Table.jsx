import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons"; 
import { Link, useNavigate } from "react-router-dom";
import PaginatedItems from "./pagination";
import styles from "./table.module.css"; 
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 

export default function TableShow(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Function to handle delete confirmation
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => props.delete(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  // Function to handle showing order details
  const handleShowOrder = (id) => {
    // Navigate to the new component to show order details
    navigate(`/Dashbord/invoices/${id}`);
  };

  // Check if header contains "CustomerName"
  const isCustomerNameInHeader = props.header.some(item => item.key === "CustomerName");

  // Filtered and paginated data
  const filteredData = props.data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginate data
  const start = (props.pages - 1) * props.limet;
  const end = start + props.limet;
  const finalData = filteredData.slice(start, end);

  // Header show
  const headerShow = props.header.map((item) => (
    <th key={item.key}>{item.name}</th>
  ));

  // Data show
  let dataShow;
  if (props.isLoading) {
    // Show loading spinner or text in first row
    dataShow = (
      <tr>
        <td colSpan={props.header.length + 2} className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </td>
      </tr>
    );
  } else {
    // Show actual data
    dataShow = finalData.map((item, key) => (
      <tr key={item.id || key}>
        <td>{start + key + 1}</td>
        {props.header.map((item2) => (
          <td className="text-center" key={`${item.id || key}-${item2.key}`}>
            {item2.key === "imageweb" || item2.key === "Imageproudect" ? (
              <img src={`https://perfect.somee.com/${item[item2.key]}`} alt="img" width="100" />
            ) : item2.key === "PriceProduct" || item2.key === "Pricesale" || item2.key === "totalprice" ? (
              `${item[item2.key]} EGP`
            ) : item[item2.key] === 1 ? (
              "Admin"
            ) : item[item2.key] === 0 ? (
              "User"
            ) : (
              item[item2.key] ?? "N/A"
            )}
          </td>
        ))}
        <td>
          <div className="d-flex align-items-center justify-content-around g-2">
            {isCustomerNameInHeader  ? (
              <Button
                variant="dark"
                onClick={() => handleShowOrder(item.BillId)}
              >
                Show Order 
              </Button>
            ) : (
              <>
                {props.header.every(
                  (headerItem) =>
                    headerItem.key !== "imageweb" &&
                    headerItem.key !== "Imageproudect" &&
                    headerItem.key !== "ContectName"
                ) && (
                  <Link to={`${item.id}`}>
                    <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
                  </Link>
                )}
                {item.Role_id !== 1 && ( // Check if the RoleId is not 1 (Admin)
                  <FontAwesomeIcon
                    onClick={() => handleDelete(item.id || item.Id || item.ContectId)}
                    cursor={"pointer"}
                    fontSize={"19px"}
                    color="red"
                    icon={faTrash}
                  />
                )}
              </>
            )}
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div className={styles.table_container}>
      <div className={styles.table_wrapper}>
        <Table striped bordered hover className={styles.tabls}>
          <thead className={`${styles.header} thead-dark `}>
            <tr className="fs-4">
              <th>id</th>
              {headerShow}
              <th>Action</th>
            </tr>
            <tr>
              <th colSpan={props.header.length + 2} className="text-end">
                <div className="d-flex align-items-center justify-content-end g-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.search_input}
                  />
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{dataShow}</tbody>
        </Table>
      </div>
      <PaginatedItems itemsPerPage={props.limet} setPages={props.setPages} data={filteredData} />
    </div>
  );
}
