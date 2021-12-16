import { 
  CHANGE_ABANDON_USER,
  CHNAGE_ORDER_LIST
} from "constants/index"

var initialState = {
  abandonUser: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    streetAddress: "",
    shippingCity: "",
    shippingStreet: "",
    shippingZip: "",
    cart: "",
    date: ""
  },
  orderList: {}
};
    
export const abandon_reducer = function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_ABANDON_USER:
      return {
        ...state,
        abandonUser: action.payload
      };
    case CHNAGE_ORDER_LIST:
      return {
        ...state,
        orderList: action.payload
      }
    default:
      return state;
  }
}