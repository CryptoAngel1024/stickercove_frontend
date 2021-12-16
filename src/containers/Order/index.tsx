import { Advertise } from "components/Advertise";
import { OrderAdd } from "components/Order/OrderAdd";
import { OrderBanner } from "components/Order/OrderBanner";
import { OrderOptions } from "components/Order/OrderOptions";
import { OrderVideo } from "components/Order/OrderVideo";
import { ROUTERS } from "constants/Routers";
import { useRouter } from "next/router";
import { createOrder } from "src/helpers/StoreOrder";

export const Order = () => {
  const router = useRouter()

  const handleNext = (title) => {
    if (title) {
      const orderId = createOrder(title)
      const route = title.toLowerCase().replaceAll(" ", "-")
      router.push(`${ROUTERS.CHOOSE_SIZE_QUANTITY}/${route}/${orderId}`)
    }
  }

  return (
    <div className="custom-sticker">
      <OrderBanner />
      <OrderOptions handleNext={handleNext} />
      <OrderAdd />
      <OrderVideo />
      <Advertise key={0} />
    </div>
  )
}
