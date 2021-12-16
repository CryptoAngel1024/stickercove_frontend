import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faTruck } from "@fortawesome/free-solid-svg-icons"
// import { useSelector } from "react-redux"

export const ShippingSummary = ({
  generateOrderList,
  orderList,
  shippingFee,
  subTotal,
  shFirstName,
  shLastName,
  shStreetOne,
  shStreetTwo,
  shState,
}) => (
  <div className="checkout-panel-status">
    <div className="checkout-panel-status-box">
      <span>Basket Summary</span>

      {generateOrderList(orderList)}
      <div className="checkout-panel-status-box-item">
        <div className="square">
          <FontAwesomeIcon icon={faTruck} />
        </div>
        <div className="text">
          <label>Shipping Fee</label>
        </div>
        <div className="price">{`$${shippingFee}`}</div>
      </div>

      <div className="checkout-panel-status-box-total">
        <span>Total</span>
        <span>{`$${subTotal}`}</span>
      </div>
    </div>
    <div className="checkout-panel-status-box">
      <span>Shipping Details</span>
      <div className="checkout-panel-status-box-item">
        <div className="square">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </div>
        <div className="text">
          <span>{`${shFirstName || "First"} ${shLastName || "Last"}`}</span>
          <span>{`${shStreetOne || "Address"} ${shStreetTwo || ""} ${shState || "City"}`}</span>
        </div>
      </div>
    </div>
  </div>
)

 ShippingSummary
