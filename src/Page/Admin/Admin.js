import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TabContent from "../../components/TabContent/TabContent";

import "./Admin.css";

function Admin() {
  const [currentAdmin, setCurrentAdmin] = useState(
    JSON.parse(localStorage.getItem("currentAdmin"))
  );

  const [selectedTab, setSelectedTab] = useState("dashboard"); // State để lưu tab được chọn

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentAdmin) {
      navigate("/admin/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAdmin, navigate]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "orders":
        return <TabContent tab="orders" />;
      case "products":
        return <TabContent tab="product" />;
      case "accountUsers":
        return <TabContent tab="accountUsers" />;
      case "accountAdmin":
        return <TabContent tab="accountAdmin" />;
      default:
        return <h2>Content</h2>;
    }
  };
  const handleLogout = () => {
    // Xóa thông tin admin hiện tại khỏi localStorage
    localStorage.removeItem("currentAdmin");
    // Cập nhật state để kích hoạt điều kiện chuyển hướng
    setCurrentAdmin(null);
    navigate("/admin/login");
  };
  return (
    <div className="adminPage">
      <header className="adminHeader">
        <h2>Admin page</h2>
        {currentAdmin && (
          <p>
            {currentAdmin.name}{" "}
            <button onClick={handleLogout}>Đăng xuất</button>
          </p>
        )}
      </header>
      <div className="adminContent">
        <ul className="slidebar">
          <li onClick={() => setSelectedTab("orders")}>
            <FontAwesomeIcon className="iconFolder" icon={faFolder} />
            Đơn hàng
          </li>
          <li onClick={() => setSelectedTab("products")}>
            <FontAwesomeIcon className="iconFolder" icon={faFolder} />
            Sản phẩm
          </li>
          <li onClick={() => setSelectedTab("accountUsers")}>
            <FontAwesomeIcon className="iconFolder" icon={faFolder} />
            Account users
          </li>
          <li onClick={() => setSelectedTab("accountAdmin")}>
            <FontAwesomeIcon className="iconFolder" icon={faFolder} />
            Account admin
          </li>
        </ul>
        <div className="adminContainer">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default Admin;
