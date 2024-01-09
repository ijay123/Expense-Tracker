import React from 'react'
import Navigation from '../navigation/Navigation'
import Footer from '../footer/Footer'

const Layout = ({children}) => {
  return (
    <div>
<Navigation/>

<div>{children}</div>

<Footer/>
    </div>
  )
}



export default Layout