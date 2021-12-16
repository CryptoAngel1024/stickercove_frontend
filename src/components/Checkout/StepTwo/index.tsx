import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { SCHEDULED_DELIVERY } from "constants/ShippingMethods";
import { useSelector } from "redux/AppReducers";
import { StripeForm } from "components/StripeForm";

export const StepTwo = ({
  onChangeHandler,
  validated,
  generateShippingMethods,
  deliveryMode,
  onCalendarClick,
  stripePromise,
  onConfirmPayment,
  subTotal,
  getIntentAction,
  billingEmail,
  validateForm,
  setIntentId,
  intentId,
  onBack,
  onContinue,
  deleteOrder,
  sendReceiptByEmail,
}) => {
  const checkoutValue = useSelector((state) => state.checkout);
  return (
    <>
      {/* <ScrollToTop> */}
        <span>Billing Information</span>

        {/* <label>Email Address</label>
        <input
          name="billing-email"
          className="checkout-panel-info-input"
          required
          value={checkoutValue.emailAddress}
          onChange={onChangeHandler}
        /> */}

        <div className="checkout-panel-info-input-checkbox">
          <input
            type="checkbox"
            name="billing-shipping-same"
            id="billing-shipping-same"
            checked={checkoutValue.billingShippingSame}
            onChange={onChangeHandler}
          />
          <label htmlFor="billing-shipping-same">
            My billing and shipping address are the same
          </label>
        </div>

        <label>Street Address</label>
        <input
          name="billing-street-one"
          className="checkout-panel-info-input"
          required
          disabled={checkoutValue.billingShippingSame}
          value={checkoutValue.billingStreetOne}
          onChange={onChangeHandler}
        />
        <label>Street Address 2 (Optional)</label>

        <input
          name="billing-street-two"
          className="checkout-panel-info-input"
          required
          disabled={checkoutValue.billingShippingSame}
          value={checkoutValue.billingStreetTwo}
          onChange={onChangeHandler}
        />

        <label>City</label>
        <input
          type="text"
          name="billing-city"
          required
          disabled={checkoutValue.billingShippingSame}
          className="checkout-panel-info-input"
          value={checkoutValue.billingCity}
          onChange={onChangeHandler}
        />

        <label>State</label>
        <input
          type="text"
          name="billing-state"
          required
          disabled={checkoutValue.billingShippingSame}
          className="checkout-panel-info-input"
          value={checkoutValue.billingState}
          onChange={onChangeHandler}
        />

        {/*
      <label>City & State/Province</label>
      <input
        name="billing-state"
        className="checkout-panel-info-input"
        onClick={(e) => onChangeHandler(e)}
      />
      */}

        <span>Delivery Date</span>
        <label className="checkout-panel-delivery-comment">
          Enter your shipping information to see possible delivery dates
        </label>
        <div className="checkout-panel-delivery-dates">
          {generateShippingMethods()}
          {deliveryMode === SCHEDULED_DELIVERY && (
            <Calender
              className="checkout-contents-delivery-dates-calendar"
              onChange={onCalendarClick}
              calendarType={"US"}
              tileDisabled={(activeStartDate, date, view) => {
                const today = new Date();
                const day = new Date(activeStartDate.date);
                const minStart = new Date(today);
                minStart.setDate(today.getDate() + 6);

                let disable = false;
                if (
                  (day.getDate() < minStart.getDate() &&
                    day.getMonth() <= minStart.getMonth() &&
                    day.getFullYear() <= minStart.getFullYear()) ||
                  (day.getMonth() < minStart.getMonth() &&
                    day.getFullYear() <= minStart.getFullYear())
                ) {
                  disable = true;
                }

                return disable;
              }}
            />
          )}
        </div>
        <Elements stripe={stripePromise}>
          <StripeForm
            onConfirmPayment={onConfirmPayment}
            subTotal={subTotal}
            getIntentAction={getIntentAction}
            billingEmail={"admin@stickercove.com"}
            //billingEmail={billingEmail}
            validateForm={validateForm}
            setIntentId={setIntentId}
            intentId={intentId}
            onBack={onBack}
            onContinue={onContinue}
            deleteOrder={deleteOrder}
            sendReceiptByEmail={sendReceiptByEmail}
          />
        </Elements>
      {/* </ScrollToTop> */}
    </>
  );
};

StepTwo;
