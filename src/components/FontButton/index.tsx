import Link from 'next/link'
import { createRipples } from "react-ripples"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Ripples = createRipples({
  during: 1500,
})

export const FontButton = ({ to, icon }) => (
  <div className="font-button-wrapper flex">
    <Ripples>
      <div className="font-button flex">
        <Link href={{ pathname: to }}>
          <FontAwesomeIcon icon={icon} />
        </Link>
      </div>
    </Ripples>
  </div>
)

 FontButton
