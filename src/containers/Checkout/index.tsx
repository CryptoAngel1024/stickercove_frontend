import { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import { orderStateSelector } from "redux/Selectors";
import {
  createOrderAction,
  deleteOrderAction,
  stripePayAction,
  getIntentAction,
  sendEmailAction,
} from "redux/Reducers/Order";

import {
  STANDARD_DELIVERY,
  SCHEDULED_DELIVERY,
  SCHEDULED_DELIVERY_SELECTED,
  ShippingMethods,
} from "constants/ShippingMethods";

import Swal from "sweetalert2";

import {
  CHANGE_PHONE_NUMBER,
  CHANGE_EMAIL_ADDRESS,
  CHANGE_SHIPPING_FIRSTNAME,
  CHANGE_SHIPPING_LASTNAME,
  CHANGE_SHIPPING_COMPANY,
  CHANGE_SHIPPING_STREET_ONE,
  CHANGE_SHIPPING_CITY,
  CHANGE_SHIPPING_STATE,
  CHANGE_SHIPPPING_ZIP,
  CHANGE_BILLING_EMAIL,
  CHANGE_BILLING_STREET_ONE,
  CHANGE_BILLING_STREET_TWO,
  CHANGE_BILLING_CITY,
  CHANGE_BILLING_STATE,
  BILLING_SHIPPING_SAME,
  CHANGE_SHIPPING_STREET_TWO,
} from "constants/index";
import { getDeliveryDayFromMethod, setShippingFeeHelper, setShippingInfoHelper } from "src/helpers/Shipping";
import { getDateTimeFormat } from "src/helpers/DateTimeHelper";
import { getShippingPrice } from "src/helpers/Sticker";
import { getOrderList } from "src/helpers/StoreOrder";
import { Checkout as CheckoutComponent } from "components/Checkout";
import { useSelector } from "redux/AppReducers";

const Checkout = ({
  createOrderAction,
  deleteOrderAction,
  getIntentAction,
  sendEmailAction,
}) => {
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.checkout);

  const [orderList, setOrderList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(checkout.phoneNumber);
  const [emailAddress, setEmailAddress] = useState(checkout.emailAddress);
  const [shFirstName, setShFirstName] = useState(checkout.shippingFirstname);
  const [shLastName, setShLastName] = useState(checkout.shippingLastname);
  const [shCompany, setShCompany] = useState(checkout.shippingCompany);
  const [shStreetOne, setShStreetOne] = useState(checkout.shippingStreetOne);
  const [shStreetTwo, setShStreetTwo] = useState(checkout.shippingStreetTwo);
  const [shCity, setShCity] = useState(checkout.shippingCity);
  const [shState, setShState] = useState(checkout.shippingState);
  const [shZip, setShZip] = useState(checkout.shippingZip);
  const [deliveryDate, setDeliveryDate] = useState(
    getDeliveryDayFromMethod(STANDARD_DELIVERY)
  );
  const [deliveryMode, setDeliveryMode] = useState(STANDARD_DELIVERY);
  const [shippingFee, setShippingFee] = useState(0);
  const [biEmail, setBiEmail] = useState(checkout.emailAddress);
  const [biStreetOne, setBiStreetOne] = useState(checkout.billingStreetOne);
  const [biStreetTwo, setBiStreetTwo] = useState(checkout.billingStreetTwo);
  const [biCity, setBiCity] = useState(checkout.billingCity);
  const [biState, setBiState] = useState(checkout.billingState);
  const [validated, setValidated] = useState({
    phone: false,
    email: false,
    shFirst: false,
    shLast: false,
    shStreetOne: false,
    shCity: false,
    shState: false,
    shZip: false,
    biEmail: false,
    biStreetOne: false,
    biCity: false,
    biState: false,
  });
  const [intentId, setIntentId] = useState(false);
  const fieldsName = {
    phone: "Phone number",
    email: "Email",
    shFirst: "Shippment First Name",
    shLast: "Shippment First Name",
    shStreetOne: "Shippment Street",
    shCity: "Shippment City",
    shState: "Shippment State",
    shZip: "Shippment Zip code",
    biEmail: "Billing Email",
    biStreetOne: "Billing Street",
    biCity: "Billing City",
    biState: "Billing State",
  };

  useEffect(() => {
    setShippingInfoHelper({
      shFirstName,
      shLastName,
      streetAddress: `${shStreetOne}`,
      streetAddressTwo: shStreetTwo ? shStreetTwo : "",
      shState,
    });
  });

  useEffect(() => {
    const orderList = getOrderList();
    setShippingFee(getShippingPrice(orderList, deliveryMode));

    if (orderList.length) {
      setOrderList(orderList);
    }

    let subTotal = 0;
    orderList.forEach((order) => {
      subTotal += order.price;
    });

    setSubTotal(subTotal + shippingFee);
  }, [deliveryMode]);

  const validateStage1Values = () => {
    let needFill = [];

    if (!phoneNumber) needFill.push("Phone number");
    if (
      emailAddress.indexOf("@") === -1 ||
      (emailAddress.indexOf(".com") === -1 &&
        emailAddress.indexOf(".net") === -1 &&
        emailAddress.indexOf(".org") === -1 &&
        emailAddress.indexOf(".co") === -1 &&
        emailAddress.indexOf(".uk") === -1)
    )
      needFill.push("Shipping email");
    if (!shFirstName) needFill.push("Shipping First Name");
    if (!shLastName) needFill.push("Shipping Last Name");
    if (!checkout.shippingStreetOne) needFill.push("Shipping Street");
    if (!checkout.shippingCity) needFill.push("Shipping City");
    if (!checkout.shippingState) needFill.push("Shipping State");
    if (!checkout.shippingZip) needFill.push("Shipping ZIP");
    return needFill;
  };

  const validateValues = () => {
    let needFill = [];
    if (!phoneNumber) needFill.push("Phone number");
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress))
      needFill.push("Shipping email");
    if (!shFirstName) needFill.push("Shipping First Name");
    if (!shLastName) needFill.push("Shipping Last Name");
    if (!checkout.shippingStreetOne) needFill.push("Shipping Street");
    if (!checkout.shippingCity) needFill.push("Shipping City");
    if (!checkout.shippingState) needFill.push("Shipping State");
    if (!/^\d+$/.test(checkout.shippingZip)) needFill.push("Shipping ZIP");
    // if (biEmail.indexOf("@") === -1 || (biEmail.indexOf(".com") === -1 && biEmail.indexOf(".net") === -1 && biEmail.indexOf(".org") === -1 && biEmail.indexOf(".co") === -1 && biEmail.indexOf(".uk") === -1 ))
    //   needFill.push("Billing Email")
    if (!checkout.billingStreetOne) needFill.push("Billing Street");
    if (!checkout.billingCity) needFill.push("Billing City");
    if (!checkout.billingState) needFill.push("Billing State");

    return needFill;
  };

  const validatePass = () => {
    let needFill = [];

    for (const key in validated) {
      if (validated[key] === false) {
        needFill.push(fieldsName[key]);
      }
    }

    return needFill;
  };

  const validateStage1 = () => {
    const fieldsValidates = validateStage1Values();
    if (fieldsValidates.length) {
      Swal.fire(
        `To continue you need to fill in the following field${
          fieldsValidates.length > 1 ? "s" : ""
        }.`,
        `${fieldsValidates.join(", ")}`,
        "info"
      );
      return false;
    } else {
      return true;
    }
  };

  const validateForm = () => {
    const fieldsValidates = validateValues();
    if (fieldsValidates.length) {
      Swal.fire(
        `To continue you need to fill in the following field${
          fieldsValidates.length > 1 ? "s" : ""
        }.`,
        `${fieldsValidates.join(", ")}`,
        "info"
      );
      return false;
    } else {
      return true;
    }
  };

  const onConfirmPayment = (callbackSuccess, callbackFailure) => {
    // console.log({
    //   city: shCity,
    //   state: shState,
    //   zip: shZip,
    // })

    createOrderAction({
      body: {
        email: checkout.emailAddress,
        phone: checkout.phoneNumber,
        firstname: checkout.shippingFirstname,
        lastname: checkout.shippingLastname,
        company: checkout.shippingCompany,
        streetAddress: checkout.shippingStreetOne,
        streetAddressTwo: checkout.shippingStreetTwo ?? "",
        city: checkout.shippingCity,
        state: checkout.shippingState,
        zip: checkout.shippingZip,
        deliveryDate,
        orders: getOrderList(),
        price: subTotal,
        label: "ONHOLD",
      },
      onSuccess: ({ data }) => {
        callbackSuccess(data);
      },
      onFailure: ({ data }) => {
        callbackFailure(data);
      },
    });
  };

  const deleteOrder = (data) => {
    deleteOrderAction({
      body: data.order,
      onSuccess: ({ data }) => {
        console.log("sucess in delete");
      },
      onFailure: ({ data }) => {
        console.log("error in delete");
        console.log(data);
      },
    });
  };

  const sendReceiptByEmail = ({ id }) => {
    const date = `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`;

    const body = {
      emailToSend: emailAddress,
      name: `${shFirstName} ${shLastName}`,
      address: `${shStreetOne}, ${
        shStreetTwo ? shStreetTwo : ""
      } ${shCity} ${shState} ${shZip}`,
      deliveryDate,
      orderDate: date,
      products: getOrderList(),
      price: subTotal,
      id,
    };
    sendEmailAction({
      body,
      onSuccess: () => {
        console.log("email sended");
      },
      onFailure: () => {
        console.log("error in email");
      },
    });
  };

  const handleDeliveryModeChange = (mode, date) => {
    setDeliveryMode(mode);

    if (mode !== SCHEDULED_DELIVERY) {
      setDeliveryDate(date);
    }

    const orderList = getOrderList();
    setShippingFee(getShippingPrice(orderList, mode));
    setShippingFeeHelper(getShippingPrice(orderList, mode));
    setShippingInfoHelper({
      shFirstName,
      shLastName,
      streetAddress: `${shStreetOne}`,
      streetAddressTwo: shStreetTwo ? shStreetTwo : "",
      shState,
    });
  };

  const onCalendarClick = (value) => {
    const selectedDate = getDateTimeFormat(value);

    setDeliveryMode(SCHEDULED_DELIVERY_SELECTED);
    setDeliveryDate(selectedDate);
  };

  const onChooseAnotherDate = () => {
    if (SCHEDULED_DELIVERY_SELECTED) {
      setDeliveryMode(SCHEDULED_DELIVERY);
    }
  };

  const onChangeHandler = (e) => {
    const type = e.target.name;

    switch (type) {
      case "phone-number":
        setPhoneNumber(e.target.value);
        // setCheckout(x => ({
        //   ...x,
        //   phoneNumber: e.target.value
        // }))
        dispatch({ type: CHANGE_PHONE_NUMBER, payload: e.target.value });
        break;
      case "email-address":
        setEmailAddress(e.target.value);
        // setCheckout(x => ({
        //   ...x,
        //   emailAddress: e.target.value
        // }))
        dispatch({ type: CHANGE_EMAIL_ADDRESS, payload: e.target.value });
        break;
      case "shipping-firstname":
        setShFirstName(e.target.value);
        // setCheckout(x => ({
        //   ...x,
        //   shippingFirstname: e.target.value
        // }))
        dispatch({ type: CHANGE_SHIPPING_FIRSTNAME, payload: e.target.value });
        break;
      case "shipping-lastname":
        setShLastName(e.target.value);
        // setCheckout(x => ({
        //   ...x,
        //   shippingLastname: e.target.value
        // }))
        dispatch({ type: CHANGE_SHIPPING_LASTNAME, payload: e.target.value });
        break;
      case "shipping-company":
        setShCompany(e.target.value);
        // setCheckout(x => ({
        //   ...x,
        //   shippingCompany: e.target.value
        // }))
        dispatch({ type: CHANGE_SHIPPING_COMPANY, payload: e.target.value });
        break;
      case "shipping-street-one":
        setShStreetOne(e.target.value);
        // setCheckout(x => ({
        //   ...x,
        //   shippingStreetOne: e.target.value
        // }))
        dispatch({ type: CHANGE_SHIPPING_STREET_ONE, payload: e.target.value });
        break;
      case "shipping-street-two":
        setShStreetTwo(e.target.value);
        // setCheckout(x => ({
        //   ...x,
        //   shippingStreetTwo: e.target.value
        // }))
        dispatch({ type: CHANGE_SHIPPING_STREET_TWO, payload: e.target.value });
        break;
      case "shipping-city":
        setShCity(e.target.value);
        // setCheckout(x => ({
        //   ...x,
        //   shippingCity: e.target.value
        // }))
        dispatch({ type: CHANGE_SHIPPING_CITY, payload: e.target.value });
        break;
      case "shipping-state":
        setShState(e.target.value);
        // setCheckout(x => ({
        //   ...x,
        //   shippingState: e.target.value
        // }))
        dispatch({ type: CHANGE_SHIPPING_STATE, payload: e.target.value });
        break;
      case "shipping-zip":
        // setCheckout(x => ({
        //   ...x,
        //   shippingZip: e.target.value
        // }))
        setShZip(e.target.value);
        dispatch({ type: CHANGE_SHIPPPING_ZIP, payload: e.target.value });
        break;
      case "billing-email":
        setBiEmail(e.target.value);
        dispatch({ type: CHANGE_EMAIL_ADDRESS, payload: e.target.value });
        break;
      case "billing-street-one":
        setBiStreetOne(e.target.value);
        dispatch({ type: CHANGE_BILLING_STREET_ONE, payload: e.target.value });
        break;
      case "billing-street-two":
        setBiStreetTwo(e.target.value);
        dispatch({ type: CHANGE_BILLING_STREET_TWO, payload: e.target.value });
        break;
      case "billing-city":
        setBiCity(e.target.value);
        dispatch({ type: CHANGE_BILLING_CITY, payload: e.target.value });
        break;
      case "billing-state":
        setBiState(e.target.value);
        dispatch({ type: CHANGE_BILLING_STATE, payload: e.target.value });
        break;
      case "billing-shipping-same":
        dispatch({ type: BILLING_SHIPPING_SAME, payload: e.target.checked });
        break;
      default:
        break;
    }

    validateValues();
  };

  return (
    <CheckoutComponent
      shFirstName={shFirstName}
      shLastName={shLastName}
      shStreetOne={checkout.shippingStreetOne}
      shStreetTwo={checkout.shippingStreetTwo}
      shState={checkout.shippingState}
      orderList={orderList}
      shippingFee={shippingFee}
      subTotal={subTotal}
      firstName={shFirstName}
      lastName={shLastName}
      shippingStreet={shStreetOne}
      shippingCity={shCity}
      deliveryMode={deliveryMode}
      deliveryDate={deliveryDate}
      shippingMethods={ShippingMethods}
      onConfirmPayment={onConfirmPayment}
      handleDeliveryModeChange={handleDeliveryModeChange}
      onCalendarClick={onCalendarClick}
      onChooseAnotherDate={onChooseAnotherDate}
      onChangeHandler={onChangeHandler}
      validated={validated}
      getDeliveryDayFromMethod={getDeliveryDayFromMethod}
      getShippingPrice={getShippingPrice}
      getIntentAction={getIntentAction}
      biEmail={biEmail}
      validateForm={validateForm}
      validateStage1={validateStage1}
      setIntentId={setIntentId}
      intentId={intentId}
      deleteOrder={deleteOrder}
      sendReceiptByEmail={sendReceiptByEmail}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  orderStore: orderStateSelector,
});

const mapDispatchToProps = {
  createOrderAction,
  deleteOrderAction,
  stripePayAction,
  getIntentAction,
  sendEmailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
