import React from 'react'

const SlideMenu = () => {
  return (
    <div><ul className="menu bg-base-200 h-full w-56">
    <li className='pt-10'><a>Home</a></li>
    
    <li><a>Portfolio</a></li>
    <div><line>----------------------------------------</line></div>
    <div>
      <h1 className=''>Tools</h1>
      <div>
        <ul>
          <li>Chart Settings</li>
          <li>
          <details open>
            <summary>Technical Tool</summary>
            <ul>
              <li><a>moving Average </a></li>
              <li><a>Tool 1</a></li>
              <li><a>Tool 2</a></li>
              <li><a>Tool 3</a></li>
              <li><a>Tool 4</a></li>
              <li><a>Tool 5</a></li>
            </ul>
          </details>
        </li>
        </ul>
      </div>
    </div>
  </ul></div>
  )
}

export default SlideMenu