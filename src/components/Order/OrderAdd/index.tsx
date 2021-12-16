import { OrderAddItem } from "../OrderAddItem";

const BOX = "/resources/images/vector/box.webp";
const CIRCUIT = "/resources/images/vector/circuit.webp";
const CLOUD = "/resources/images/vector/cloud.webp";

export const OrderAdd = () => (
  <div className="custom-sticker-shipping-panel">
    <OrderAddItem
      image={BOX}
      title={"Free shipping in 5 days"}
      comment={
        "All orders include free express shipping to ensure your order arrives within 5 days."
      }
    />
    <OrderAddItem
      image={CIRCUIT}
      title={"Get an online proof"}
      comment={
        "Once your order is placed, we will email out a proof before we begin production."
      }
    />
    <OrderAddItem
      image={CLOUD}
      title={"Durable and weatherproof"}
      comment={
        "Enjoy your stickers worry free with our 4+ year UV rating and water resistantice."
      }
    />
  </div>
);
