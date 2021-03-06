import {
  STANDARD_DELIVERY,
  FAST_DELIVERY,
  FASTER_DELIVERY,
} from "constants/ShippingMethods";
import { is_ssr } from "src/utils/is_ssr";
import { getDateTimeFormat } from "./DateTimeHelper";

const getDates = () => {
  let dateList = [];

  const today = new Date();
  const fasterDelivery = new Date(today);
  fasterDelivery.setDate(today.getDate() + 1);
  if (getDateTimeFormat(fasterDelivery).indexOf("Sun") > -1) {
    fasterDelivery.setDate(fasterDelivery.getDate() + 1);
  }
  dateList.push(fasterDelivery);

  const fastDelivery = new Date(fasterDelivery);
  fastDelivery.setDate(fastDelivery.getDate() + 1);
  if (getDateTimeFormat(fastDelivery).indexOf("Sun") > -1) {
    fastDelivery.setDate(fastDelivery.getDate() + 1);
  }
  dateList.push(fastDelivery);

  const standardDelivery = new Date(fastDelivery);
  standardDelivery.setDate(standardDelivery.getDate() + 3);
  if (getDateTimeFormat(standardDelivery).indexOf("Sun") > -1) {
    standardDelivery.setDate(standardDelivery.getDate() + 1);
  }
  dateList.push(standardDelivery);

  return dateList;
};

export const getDeliveryDayFromMethod = (method) => {
  if (method === FASTER_DELIVERY) {
    return getDateTimeFormat(getDates()[0]);
  } else if (method === FAST_DELIVERY) {
    return getDateTimeFormat(getDates()[1]);
  } else if (method === STANDARD_DELIVERY) {
    return getDateTimeFormat(getDates()[2]);
  }
};

export const setShippingFeeHelper = (fee) => {
  localStorage.setItem("shipping_fee", fee);
};
export const getShippingFeeHelper = () => {
  const fee = is_ssr() ? 0 : localStorage.getItem("shipping_fee");

  if (fee) {
    return parseFloat(fee);
  }

  return 0;
};

export const setShippingInfoHelper = (info: LocalStorageShippingInfo) => {
  localStorage.setItem("shipping_info", JSON.stringify(info));
};

export interface LocalStorageShippingInfo {
  shFirstName;
  shLastName;
  streetAddress;
  streetAddressTwo;
  shState;
}

export const getShippingInfoHelper = (): LocalStorageShippingInfo => {
  return JSON.parse(localStorage.getItem("shipping_info") || "{}");
};
