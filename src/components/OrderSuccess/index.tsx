
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useState } from "react";
import { ROUTERS } from "constants/Routers";
import { is_ssr } from "src/utils/is_ssr";
import { getOrderList } from "src/helpers/StoreOrder";
import { getShippingFeeHelper, getShippingInfoHelper, LocalStorageShippingInfo } from "src/helpers/Shipping";

export const stageTabs = [
  { className: "details", text: "Your Details" },
  { className: "payment", text: "Payment" },
  { className: "confirm", text: "Confirmation" },
]

export const generateOrderList = (orderList) =>
  orderList.map((order, index) => (
    <div key={index} className="checkout-panel-status-box-item">
      <div className="square">{order.quantity}</div>
      <div className="text">
        <label>{order.type}</label>
        <span className="quantity">x{order.quantity}</span>
      </div>
      <div className="price">{`$${order.price}`}</div>
    </div>
  ))

export const OrderSuccess = () => {
  const [orderList, setOrderList] = useState(is_ssr() ? [] : getOrderList())
  const [shippingInfo, setShippingInfo] = useState<LocalStorageShippingInfo>(is_ssr() ? {} as any : getShippingInfoHelper())
  const [stage, setStage] = useState(2)
  const router = useRouter()
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    let subTotal = 0
    orderList.forEach((order) => {
      subTotal += order.price
    })

    setSubTotal(subTotal + (is_ssr() ? 0 : getShippingFeeHelper()))
  }, [orderList])

  const handleClick = () => {
    router.push(ROUTERS.CUSTOM_STICKER)
  }

  

  return (
    <>
      <div className="checkout">
        <div className="checkout-header">
          <div className="checkout-header-title">
            {stageTabs.map((tab, index) => {
              return (
                <div className={tab.className} key={index}>
                  <div className={"square " + (index == stage ? "active" : "")}>
                    {index + 1}
                  </div>
                  <span className={index == stage ? "active" : ""}>
                    {tab.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="checkout-panel">
          <div className="checkout-panel-info">
            <div className="order-success flex flex-column">
              Congratulations! <br />
              Your order has been submitted
              <br />
              Thank you for using Sticker Cove!
              <div onClick={handleClick}>Continue shopping</div>
            </div>
          </div>

          <div className="checkout-panel-status">
            <div className="checkout-panel-status-box">
              <span>Basket Summary</span>
              {generateOrderList(orderList)}
              {/* <div className="checkout-panel-status-box-item">
                <div className="square">50</div>
                <div className="text">
                  <label>Kick Cut Sticker</label>
                  <span className="quantity">x50</span>
                </div>
                <div className="price">$52.00</div>
              </div>
              <div className="checkout-panel-status-box-item">
                <div className="square"></div>
                <div className="text">
                  <label>Die Cut Sticker</label>
                  <span className="quantity">x50</span>
                </div>
                <div className="price">$47.00</div>
              </div>*/}
              <div className="checkout-panel-status-box-item">
                <div className="square"></div>
                <div className="text">
                  <label>Shopping Fee</label>
                </div>
                <div className="price">${getShippingFeeHelper()}</div>
              </div>

              <div className="checkout-panel-status-box-total">
                <span>total</span>
                <span>${subTotal}</span>
              </div>
            </div>
            <div className="checkout-panel-status-box">
              <span>Shipping Details</span>
              <div className="checkout-panel-status-box-item">
                <div className="square">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div className="text">
                  <span>
                    {shippingInfo && shippingInfo.shFirstName}{" "}
                    {shippingInfo && shippingInfo.shLastName}
                  </span>
                  <span>
                    {shippingInfo && shippingInfo.streetAddress}{" "}
                    {shippingInfo && shippingInfo.shState}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
 OrderSuccess
