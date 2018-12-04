import React from 'react'
import ReactDOM from 'react-dom'

class Select extends React.Component{
  static displayName = 'Select'

  constructor(props) {
    super(props)
    this.selector = React.createRef()
  }

  componentDidMount(){
    this.resize()
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.resize)
  }

  componentDidUpdate(){
    this.resize()
  }

  resize = () => {
    this.props.resize(this.getElementBounding(), this.refs.selector)
  }

  getElementBounding = () => {
    const rect = ReactDOM.findDOMNode(this.selector.current).getBoundingClientRect()
    return {left: rect.left, top: rect.top, height: rect.height, width: rect.width}
  }

  render(){
    const { detect, openMenu, closeMenu, timeOutFunc } = this.props
    if(detect === "click"){
      return(
        <React.Fragment>
          {React.cloneElement(this.props.children, {ref: this.selector, onClick: openMenu, onTouchEnd: openMenu})}
        </React.Fragment>
      )
    }
    else if(detect === 'hover'){
      return(
        <React.Fragment>
          {React.cloneElement(this.props.children, {ref: this.selector, onMouseEnter: openMenu, onMouseLeave: closeMenu, onTouchEnd: openMenu})}
        </React.Fragment>
      )
    }
    else if(detect === 'hover-hold'){
      return(
        <React.Fragment>
          {React.cloneElement(this.props.children, {ref: this.selector, onMouseEnter: openMenu, onTouchEnd: openMenu})}
        </React.Fragment>
      )
    }
    else if(detect === 'hover-interact'){
      return(
        <React.Fragment>
          {React.cloneElement(this.props.children, {ref: this.selector, onMouseEnter: openMenu, onMouseLeave: timeOutFunc, onTouchEnd: openMenu})}
        </React.Fragment>
      )
    }
    return null
  }
}

export default Select
