export const StickerCategory = ({
  image,
  title,
  comment,
  popular,
  onClick,
}: Partial<any>) => (
  <div className="sticker-category-item" onClick={onClick}>
    <div className="sticker-category-image-wrapper">
      <img className="sticker-category-image-type" src={image} alt="option" />
      {/* <img
        className="sticker-category-image-bg"
        src={BACKGROUND}
        alt="option"
      /> */}
    </div>
    <div className="sticker-category-title-wrapper">
      <span>{title}</span>
      <span className="sticker-category-title-popular">
        {title == "Die Cut Stickers" ? "Most Popular" : ""}
      </span>
    </div>
  </div>
);
