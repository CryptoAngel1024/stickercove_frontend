import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons"



export const OrderStatusBar = ({ title, handlePrevious }) => {
  return (
    <div className="order-status-bar flex">
      <FontAwesomeIcon
        className="order-status-bar-icon"
        icon={faArrowCircleLeft}
        onClick={handlePrevious}
      />
      <span className="order-status-bar-title">{title}</span>
    </div>
  )
}