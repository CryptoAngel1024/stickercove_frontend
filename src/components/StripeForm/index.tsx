import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useGA4React } from "ga-4-react";
import { useSelector } from "redux/AppReducers";
import { API_ROOT } from "configuration/constants";
import { ROUTERS } from "constants/Routers";
import { CONVERSION_TRACKING_ID } from "constants/app-constants";

export const cardStyle = {
  style: {
    base: {
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const tagGoogleAnalyticsConversion = async (analytics) => {
  try {
    const id = Cookies.get("intentId");
    const amount = Cookies.get("subTotal");
    Cookies.set("intentId", "");
    Cookies.set("subTotal", "");
    if (id && amount) {
      // eslint-disable-next-line no-undef
      await analytics.gtag("event", "conversion", {
        send_to: `${CONVERSION_TRACKING_ID}/hJ14CMjQz-0CEJ-EmJYB`,
        value: parseFloat(amount),
        currency: "USD",
        transaction_id: id,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const StripeForm = ({
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
  const abandonUser = useSelector((state) => state.abandon);
  const router = useRouter();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [intentReady, setIntentReady] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const analytics = useGA4React();

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   const delayDebounceFn = setTimeout(() => {
  //     subTotal &&
  //       billingEmail &&
  //       //billingEmail.indexOf("@") !== -1 &&
  //       //billingEmail.indexOf(".com") !== -1 &&

  //   }, 3000)
  //   return () => clearTimeout(delayDebounceFn)
  // }, [subTotal, billingEmail]);

  // const upsertIntentAndUpdateDetails = useCallback(async (price, intentId) => {
  //   if(price && price > 0) {
  //      // get a payment intent from the remote api
  //     setIntentReady(false);
  //     await getIntentAction({
  //       body: {
  //         price: subTotal,
  //         email: billingEmail,
  //         id: intentId,
  //       },
  //       onSuccess: ({ data }) => {
  //         setClientSecret(data.clientSecret)
  //         setIntentId(data.id)
  //         setIntentReady(true);
  //       },
  //       onFailure: () => {
  //         setIntentReady(false);
  //       }
  //     })
  //   }
  // }, [billingEmail]);

  // useEffect(() => {
  //   upsertIntentAndUpdateDetails(subTotal, intentId)
  // }, [subTotal, intentId])

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);
    if (validateForm()) {
      try {
        let secret, intent_id;

        const callbackSuccess = async (data) => {
          try {
            console.log("sending confirmCardPayment");
            console.log(`Client secret: ${secret}`);
            const payload = await stripe.confirmCardPayment(secret, {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            });
            if (payload.error || !payload) {
              if (payload.error) {
                setError(`Payment failed ${payload.error.message}`);
              }
              setProcessing(false);
              deleteOrder(data);
            } else {
              console.log("confirmCardPayment: success");

              setError(null);
              setProcessing(false);
              setSucceeded(true);
              sendReceiptByEmail({
                id: payload.paymentIntent.id,
              });

              const gclId = Cookies.get("_gac_UA-285031413-1");
              Cookies.set("intentId", payload.paymentIntent.id);
              Cookies.set("subTotal", subTotal);

              await tagGoogleAnalyticsConversion(analytics);

              if (gclId) {
                (window as any).dataLayer?.push({
                  event: "conversion-tracking",
                });
              }
              router.push(ROUTERS.SUCCESS);

              try {
                axios
                  .delete(`${API_ROOT}/delete`, abandonUser.abandonUser.date)
                  .then((response) => {})
                  .catch((error) => {
                    console.log(error);
                  });
              } catch (err) {
                console.log(`error:::::: ${err.message}`);
                console.log("test 6");
              }
            }
          } catch (err) {
            //debugger
            console.log(`error:::::: ${err.message}`);
            setProcessing(false);
            deleteOrder(data);
            console.log("test 5");
          }
        };

        const callbackFailure = () => {
          setError(`Payment failed`);
          setProcessing(false);
        };

        await getIntentAction({
          body: {
            price: subTotal,
            email: billingEmail,
            id: intentId,
          },
          onSuccess: ({ data }) => {
            console.log(`Payment intent: ${data.id} replied`);
            secret = data.clientSecret;
            intent_id = data.id;
            console.log(`Client secret: ${secret}`);
            setClientSecret(data.clientSecret);
            setIntentId(data.id);
            setIntentReady(true);

            onConfirmPayment(callbackSuccess, callbackFailure);
          },
          onFailure: () => {
            setIntentReady(false);
          },
        });
      } catch (err) {
        console.log(err.message);
        setError(`Payment failed`);
        setProcessing(false);
      }
    } else {
      setError(`Payment failed`);
      setProcessing(false);
      console.log("test 2");
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <label>
        Card Details: <i>Required</i>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
      </label>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <div className="checkout-panel-info-control">
        <button className="checkout-panel-info-control-button" onClick={onBack}>
          BACK
        </button>

        {/*<Link href="/success" className="checkout-panel-info-control-button">
          CONTINUE
      </Link>*/}
        <button
          className="payment-button"
          disabled={processing || disabled || succeeded}
          type="submit"
        >
          <span id="button-text">
            {processing ? (
              <FontAwesomeIcon icon={faSpinner} className="rotating" />
            ) : (
              "PAY NOW"
            )}
          </span>
        </button>
      </div>
    </form>
  );
};

StripeForm;
