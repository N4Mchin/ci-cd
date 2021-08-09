import React from 'react'
import { Icon } from 'antd'

const PurpleTube = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 25.994 58.481"
  >
    <defs></defs>
    <g transform="translate(1.226 8.411)">
      <path
        className="a"
        fill="#fff"
        d="M108.758,185.354h-.49c-5.885,0-10.667-2.876-10.667-6.417V137h21.825v41.937C119.425,182.477,114.643,185.354,108.758,185.354Z"
        transform="translate(-96.742 -136.142)"
      />
      <path
        className="b"
        fill="#b5e8e0"
        d="M106.116,183.57h-.49c-6.351,0-11.526-3.156-11.526-7.029V133.5h23.542v43.041C117.642,180.415,112.467,183.57,106.116,183.57Zm-10.3-49.023v41.994c0,3.305,4.39,5.982,9.809,5.982h.49c5.419,0,9.809-2.677,9.809-5.982V134.547Z"
        transform="translate(-94.1 -133.5)"
        text="hi"
      />
    </g>
    <g transform="translate(1.226 8.411)">
      <path
        className="c"
        fill="#c9c9c9"
        d="M106.116,183.57h-.49c-6.351,0-11.526-3.156-11.526-7.029V133.5h23.542v43.041C117.642,180.415,112.467,183.57,106.116,183.57Zm-10.3-49.023v41.994c0,3.305,4.39,5.982,9.809,5.982h.49c5.419,0,9.809-2.677,9.809-5.982V134.547Z"
        transform="translate(-94.1 -133.5)"
        text="hi"
      />
    </g>
    <path
      className="d"
      fill="#a6a6ed"
      d="M112.936,109.451H91.258a2.161,2.161,0,0,1-2.158-2.158v-5a3.077,3.077,0,0,1,3.09-3.09H112a3.077,3.077,0,0,1,3.09,3.09v5A2.146,2.146,0,0,1,112.936,109.451Z"
      transform="translate(-89.1 -99.2)"
      text="hi"
    />
  </svg>
)

const PurpleTubeIcon = props => <Icon component={PurpleTube} {...props} />

export default PurpleTubeIcon
