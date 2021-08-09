import React from 'react'
import { Icon } from 'antd'
const Tissue = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 47.064 35.689"
  >
    <defs></defs>
    <g transform="translate(0 0)">
      <path
        className="a"
        fill="#c9c9c9"
        d="M87.5,72.033v4.6h30.978v-4.6h-2.94l.78-10.157h-.744c-2.237,0-2.331.937-4.2.937s-1.962-.937-4.2-.937-2.33.937-4.195.937-1.962-.937-4.2-.937-2.33.937-4.195.937-1.963-.937-4.195-.937h-.744l.78,10.157Zm29.6,3.217H115.35l.158-1.838H117.1Zm-28.221,0V73.412h1.667l.141,1.838ZM91.149,63.31c1.147.189,1.53.882,3.446.882,2.237,0,2.33-.937,4.195-.937s1.962.937,4.2.937,2.33-.937,4.195-.937,1.963.937,4.2.937c1.9,0,2.324-.7,3.447-.882l-.917,11.941H92.1C91.689,70.475,91.817,72,91.149,63.31Z"
        transform="translate(-79.454 -61.876)"
      />
      <path
        className="a"
        fill="#c9c9c9"
        d="M38.1,134.624V136h7.584v8.733H1.379V136H9.054v-1.379H0v29H37.045v-1.379H1.379V158.94H43.847v-1.379H1.379V146.114H45.685v3.516H3.217v1.379H45.685v11.238h-6.8v1.379h8.181v-29Z"
        transform="translate(0 -127.937)"
      />
    </g>
    <g transform="translate(21.691 9.263)">
      <path
        className="a"
        fill="#c9c9c9"
        d="M239.653,164.027h-1.379v-1.379h1.379Zm-2.3,0h-1.379v-1.379h1.379Z"
        transform="translate(-235.976 -162.648)"
      />
    </g>
  </svg>
)

const IconTissue = props => <Icon component={Tissue} {...props} />

export default IconTissue
