import React from 'react'

import GrayTube from './GrayTube'
import GreenTube from './GreenTube'
import IconCotton from './IconCotton'
import IconRubber from './IconRubber'
import IconTissue from './IconTissue'
import IconNeedle from './IconNeedle'
import IconBandAid from './IconBandAid'
import IconTow from './IconTow'
import IconTowelPaper from './IconTowelPaper'
import RedTube from './RedTube'
import MintGreenTube from './MintGreenTube'
import PurpleTube from './PurpleTube'
import LightBlueTube from './LightBlueTube'
import YellowTube from './YellowTube'

const CustomIcon = props => {
  const iconArray = {
    GrayTube,
    GreenTube,
    IconCotton,
    IconRubber,
    IconTissue,
    IconNeedle,
    IconBandAid,
    IconTow,
    IconTowelPaper,
    RedTube,
    MintGreenTube,
    PurpleTube,
    LightBlueTube,
    YellowTube,
  }

  const iconStyle = props.style
  if (props.type) return iconArray[props && props.type]({ style: iconStyle })
  else return <div />
}

export default CustomIcon
