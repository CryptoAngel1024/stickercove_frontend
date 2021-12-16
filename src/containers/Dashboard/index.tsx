import { ROUTERS } from "constants/Routers";
import { useRouter } from "next/router";
import { createOrder } from "src/helpers/StoreOrder";
import { default as DashboardComponent } from "components/Dashboard";

export const Dashboard = () => {
  const router = useRouter();

  const handleOrder = (title) => {
    const orderId = createOrder(title);
    const route = title.toLowerCase().replaceAll(" ", "-");
    router.push(`${ROUTERS.CHOOSE_SIZE_QUANTITY}/${route}/${orderId}`);

    // router.push(ROUTERS.CUSTOM_STICKER)
  };

  const handleNext = () => {
    router.push(ROUTERS.CUSTOM_STICKER);
  };

  return (
    <DashboardComponent handleOrder={handleOrder} handleNext={handleNext} />
  );
};
