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
  CHANGE_SHIPPING_STREET_TWO
} from "constants/index"

var initialState = {
  phoneNumber: '',
  emailAddress: '',
  shippingFirstname: '',
  shippingLastname: '',
  shippingCompany: '',
  shippingStreetOne: '',
  shippingStreetTwo: '',
  shippingCity: '',
  shippingState: '',
  shippingZip: '',
  billingEmail: '',
  billingStreetOne: '',
  billingStreetTwo: '',
  billingCity: '',
  billingState: '',
  billingShippingSame: false
};
  
export const checkout_reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case CHANGE_EMAIL_ADDRESS:
      return {
        ...state,
        emailAddress: action.payload,
      };
    case CHANGE_SHIPPING_FIRSTNAME:
      return {
        ...state,
        shippingFirstname: action.payload,
      };
    case CHANGE_SHIPPING_LASTNAME:
      return {
        ...state,
        shippingLastname: action.payload,
      };
    case CHANGE_SHIPPING_COMPANY:
      return {
        ...state,
        shippingCompany: action.payload,
      };
    case CHANGE_SHIPPING_STREET_ONE:
      if (state.billingShippingSame) {
        return {
          ...state,
          shippingStreetOne: action.payload,
          billingStreetOne: action.payload,
        };
      }
      return {
        ...state,
        shippingStreetOne: action.payload,
      };
    case CHANGE_SHIPPING_STREET_TWO:
      if (state.billingShippingSame) {
        return {
          ...state,
          shippingStreetTwo: action.payload,
          billingStreetTwo: action.payload,
        };
      }
      return {
        ...state,
        shippingStreetTwo: action.payload,
      };
    case CHANGE_SHIPPING_CITY:
      if (state.billingShippingSame) {
        return {
          ...state,
          shippingCity: action.payload,
          billingCity: action.payload,
        };
      }
      return {
        ...state,
        shippingCity: action.payload,
      };
    case CHANGE_SHIPPING_STATE:
      if (state.billingShippingSame) {
        return {
          ...state,
          shippingState: action.payload,
          billingState: action.payload,
        };
      }
      return {
        ...state,
        shippingState: action.payload,
      };
    case CHANGE_SHIPPPING_ZIP:
      return {
        ...state,
        shippingZip: action.payload,
      };
    case CHANGE_BILLING_EMAIL:
      return {
        ...state,
        billingEmail: action.payload,
      };
    case CHANGE_BILLING_STREET_ONE:
      
      return {
        ...state,
        billingStreetOne: action.payload,
      };
    case CHANGE_BILLING_STREET_TWO:
      return {
        ...state,
        billingStreetTwo: action.payload,
      };
    case CHANGE_BILLING_CITY:
      return {
        ...state,
        billingCity: action.payload,
      };
    case CHANGE_BILLING_STATE:
      return {
        ...state,
        billingState: action.payload,
      };
    case BILLING_SHIPPING_SAME:
      let billingStreetOne, billingStreetTwo, billingCity, billingState;
      if (action.payload) {
        billingStreetOne = state.shippingStreetOne;
        billingStreetTwo = state.shippingStreetTwo;
        billingCity = state.shippingCity;
        billingState = state.shippingState;
      } else {
        billingStreetOne = "";
        billingStreetTwo = "";
        billingCity = "";
        billingState = "";
      }
      return {
        ...state,
        billingShippingSame: action.payload,
        billingStreetOne,
        billingStreetTwo,
        billingCity,
        billingState
      };
    default:
      return state;
  }
}