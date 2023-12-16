import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  faCircleCheck,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addCart, editCart } from "../../Config/store/cart";

import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.cart);
  const product = data.find((item) => {
    return item.id === id;
  });
  console.log(product);
  const [selectedSize, setSelectedSize] = useState("");
  const [LinkImg, setLinkImg] = useState(product.img_desc[0]);

  useEffect(() => {
    document.querySelector(".imgSlide:first-child").classList.add("active");
  }, []);

  const handleImgSlideClick = (e) => {
    const clickedImage = e.currentTarget.querySelector("img").src;
    setLinkImg(clickedImage);

    document.querySelectorAll(".imgSlide").forEach((item) => {
      item.classList.remove("active");
    });

    e.currentTarget.classList.add("active");
  };

  const handleSlide = (event) => {
    const active = document.querySelector(".imgSlide.active");
    if (event.target.classList.contains("btnPrev")) {
      let preElement =
        active.previousElementSibling ||
        document.querySelector(".imgSlide:last-child");

      setLinkImg(preElement.querySelector("img").src);

      active.classList.remove("active");

      preElement.classList.add("active");
    } else {
      let nextElement =
        active.nextElementSibling ||
        document.querySelector(".imgSlide:first-child");

      setLinkImg(nextElement.querySelector("img").src);

      active.classList.remove("active");

      nextElement.classList.add("active");
    }
  };

  const handlePriceSale = (product) => {
    return (product.price / 100) * (100 - product.sale);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    document
      .querySelector(`option[value="${event.target.value}"]`)
      .classList.add("active");
    const prevSizeOption = document.querySelector(
      `option[value="${selectedSize}"]`
    );
    if (prevSizeOption) {
      prevSizeOption.classList.remove("active");
    }
  };

  const handleAddtoCart = (product) => {
    if (!selectedSize) {
      return;
    } else {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        navigate("/user/login");
      } else {
        let found = false;

        const updatedCartItems = cartItems.map((item) => {
          if (
            item.name === product.name &&
            item.selectedSize === selectedSize &&
            item.userId === currentUser.id
          ) {
            found = true;
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        if (!found) {
          const newProduct = {
            ...product,
            selectedSize,
            userId: currentUser.id,
            quantity: 1,
          };
          dispatch(addCart(newProduct));
        } else {
          // Dispatch action to update cart items with the new array
          dispatch(editCart(updatedCartItems));
        }
        navigate("/cart");
      }
    }
  };
  return (
    <div className="mainContent">
      <div className="infoProduct">
        <div className="slideImg">
          <img className="imgMain" src={LinkImg} alt={product.name} />
          <ul className="imgDescSlide">
            {product.img_desc.map((item, index) => {
              return (
                <li
                  key={index}
                  className="imgSlide"
                  onClick={(e) => {
                    handleImgSlideClick(e);
                  }}
                >
                  <img src={item} alt="img" />
                </li>
              );
            })}
          </ul>
          <button className="btnPrev" onClick={handleSlide}>
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button className="btnNext" onClick={handleSlide}>
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
        <div className="Info">
          <h2 className="nameProduct">{product.name}</h2>
          <div className="price">
            <p className="priceSale">{handlePriceSale(product)}</p>
            <p className="priceOriginal">{product.price}</p>
          </div>
          <div className="size">
            <span className="label">SIZE</span>
            <section className="sizeValue">
              {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map((size) => (
                <option
                  key={size}
                  value={size}
                  className={size === selectedSize ? "active" : ""}
                  onClick={handleSizeChange}
                >
                  {size}
                </option>
              ))}
            </section>
          </div>
          <div className="btn">
            <button
              disabled={!selectedSize && true}
              onClick={() => handleAddtoCart(product)}
              className="btnAddToCart"
            >
              Thêm vào giỏ hàng
            </button>
            <button disabled={!selectedSize && true} className="btnPay">
              Mua ngay
            </button>
          </div>
          <ul className="saleShop">
            <li>
              🔥 <span>BLACK FRIDAY</span> 🔥{" "}
              <b> SIÊU SALE BOM TẤN (CHỈ 10 NGÀY)</b>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} /> Sale
              toàn bộ cửa hàng <b>upto 70%</b>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} />
              Cơ hội bốc thăm nhận <b>IPHONE 15 pro</b> với giá <b>0đ</b>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} /> Giao
              hàng nhanh 60 phút trong nội thành Hà Nội và tp Hcm
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} /> Nhận
              hàng và kiểm tra trước khi thanh toán.
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} /> Hỗ Trợ
              đổi trả size linh hoạt
            </li>
          </ul>
          <p>
            <b>Thương hiệu:</b> {product.slug}
          </p>
        </div>
      </div>
      <div className="description">
        <h2>Mô tả</h2>
        <div className="textDesc">{product.desc}</div>
        <div className="imgDesc">
          {product.img_desc.map((item, index) => {
            return <img key={index} alt="img-desc" src={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
