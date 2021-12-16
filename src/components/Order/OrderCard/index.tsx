import { StickerCategory } from "components/StickerCategory";

export const OrderCard = ({ image, title, comment, handleNext }) => (
  <div className="order-card" onClick={() => handleNext(title)}>
    <StickerCategory image={image} title={title} comment={comment} />
  </div>
);