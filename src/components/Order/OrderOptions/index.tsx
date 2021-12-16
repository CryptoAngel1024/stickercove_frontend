import { Stickers } from "constants/Stickers"
import { useState } from "react"
import { OrderCard } from "../OrderCard"

const generateStickerOption = (handleNext, counts) =>
  Stickers.map((sticker, index) => {
    if (index < counts) {
      return (
        <OrderCard
          key={index}
          image={sticker.image}
          title={sticker.title}
          comment={sticker.description}
          handleNext={handleNext}
        />
      )
    }
  })

export const OrderOptions = ({ handleNext }) => {
  const [showCount, setShowCount] = useState(8)

  return (
    <>
      <div className="order-options flex">
        {generateStickerOption(handleNext, showCount)}
      </div>
      <div className="order-options-more flex">
        <button
          onClick={() => {
            showCount === 8 ? setShowCount(12) : setShowCount(8)
          }}
        >
          {showCount === 8 ? "Show more" : "Show less"}
        </button>
      </div>
    </>
  )
}

 OrderOptions
