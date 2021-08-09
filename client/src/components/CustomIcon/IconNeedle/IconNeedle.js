import React from 'react'
import { Icon } from 'antd'

const Needle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 40.461 39.051"
  >
    <defs></defs>
    <path
      className="a"
      fill="#c9c9c9"
      d="M32.6,1.3a.632.632,0,0,0-.894.894l.072.072-5.922,8.46-3.983,3.983c-.005.005-.007.013-.012.018a.631.631,0,0,0-.122.184c-.005.013-.006.025-.011.038a.685.685,0,0,0-.034.118l-.417,2.921-21.1,21.1c-.011.011-.014.025-.024.037a.6.6,0,0,0-.072.109.578.578,0,0,0-.05.1.6.6,0,0,0-.023.116.619.619,0,0,0-.008.128c0,.015-.005.029,0,.044a.654.654,0,0,0,.027.08.6.6,0,0,0,.034.1.611.611,0,0,0,.084.126.484.484,0,0,0,.035.053c.005.005.013.007.018.012a.633.633,0,0,0,.148.1.465.465,0,0,0,.051.03.623.623,0,0,0,.229.045h0a.61.61,0,0,0,.089-.006l3.129-.448a.646.646,0,0,0,.07-.025.672.672,0,0,0,.119-.042.588.588,0,0,0,.107-.071.714.714,0,0,0,.061-.04L23.515,20.222l2.921-.417a.633.633,0,0,0,.117-.034c.013,0,.027-.006.04-.011a.631.631,0,0,0,.184-.122c.005-.005.013-.006.017-.011l3.983-3.983,8.461-5.922.147.147a.632.632,0,0,0,.894-.894ZM3.46,38.487l-1.042.149L21.877,19.177l.446.447ZM23.44,18.954l-.893-.894L22.77,16.5l2.235,2.235Zm2.907-.67-3.13-3.13,3.129-3.129,3.13,3.13Zm4.094-3.95L27.167,11.06l5.521-7.888,5.64,5.64Z"
      transform="translate(-0.002 -1.113)"
    />
  </svg>
)

const IconNeedle = props => <Icon component={Needle} {...props} />

export default IconNeedle
