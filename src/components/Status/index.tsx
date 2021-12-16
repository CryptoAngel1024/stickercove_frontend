import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"
import { FontButton } from "components/FontButton"

export const Status = () => (

<div className="help flex flex-column">
    <span>Order Status</span>
    <label>Check on the status of your order!</label>
    <div className="flex">
      <div className="help-info">
        <label className="help-info-title">Contact Information</label>
        <span className="help-info-text">
          Our team will get back to you within 24 hours.
        </span>
        <div className="help-info-contact">
          <div className="help-info-contact-item">
            <FontAwesomeIcon color={"#E13E59"} icon={faPhoneAlt} />
            <span>
              <a href="tel:864-660-4023">864-660-4023</a>
            </span>
          </div>
          <div className="help-info-contact-item">
            <FontAwesomeIcon color={"#E13E59"} icon={faEnvelope} />
            <span>
              <a href="mailto:help@stickercove.com">help@stickercove.com</a>
            </span>
          </div>
        </div>
        <div className="help-info-social">
          <button className="help-info-social-button">
            <FontButton
              to="https://twitter.com/Sticker__Cove"
              icon={faTwitter}
            />
          </button>
          <button className="help-info-social-button">
            <FontButton
              to="https://www.facebook.com/StickerCove"
              icon={faFacebook}
            />
          </button>
          <button className="help-info-social-button">
            <FontButton
              to="https://www.instagram.com/stickercove/"
              icon={faInstagram}
            />
          </button>
        </div>
      </div>
      <div className="help-input flex flex-column">
        <div className="help-input-wrap flex flex-column">
          <div className="">
            <div>
              <label>Order Confirmation Number</label>
              <input
                type="text"
                className="help-input-firstname help-input-inputs"
                name="firstname"
              />
            </div>
           
          <button className="status-submit-btn">Submit</button>
        </div>
      </div>
    </div>
  </div>
</div>

);
