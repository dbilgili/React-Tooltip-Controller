import React from 'react'
import produce from 'immer'
import ReactDOM from 'react-dom'

class ToolTipController extends React.PureComponent{
  constructor(props) {
    super(props)
    this.tooltip = React.createRef()
  }

  static defaultProps = {
    offsetX: 0,
    offsetY: 0,
    detect: "click",
    closeOnClick: true,
    timeOut: null,
    animation: "",
    duration: "",
    timing: "",
    properties: [],
    returnState: null,
    id: ""

  }
  state = {
    divStyle: {
      position: "absolute",
      top: 0,
      left: 0,
      transitionDuration: this.props.duration,
      transitionTimingFunction: this.props.timing,
      transitionProperty: this.props.properties
    },
    isOpen: false,
    animate: false,
    timeOutID: null,
    tooltipWidth: 0,
    trigger: this.props.triggerClose
  }

  openMenu = (e) => {
    e.preventDefault()
    if(!this.state.animate){

      //Set timeout for menu to close automatically
      if(this.props.timeOut !== null && this.props.detect !== "hover-interact"){
        const timeOutID = setTimeout(() => this.closeMenu(), this.props.timeOut)
        this.setState({timeOutID})
      }

      if(this.props.returnState !== null){
        // Return menu status
        this.setState({isOpen: true},() => this.props.returnState(this.state.isOpen))
      }
      else{
        // Just open the menu
        this.setState({isOpen: true})

      }

      //Turn on the animation > adds the specific animation class
      if(this.props.animation !== ""){
        setTimeout(() => {
          this.setState({animate: true})
          //Add the pointer events from all the active DIVs
          this.tooltip.current.style.pointerEvents = "auto"
        },0)
      }
    }
  }

  closeMenu = () => {
    // Clear time out
    if(this.props.timeOut !== null && this.props.detect !== "hover-interact"){
      clearTimeout(this.state.timeOutID)
    }
    //Turn off the animation > removes the specific animation class
    if(this.state.isOpen){
      if(this.props.animation !== ""){
        // Return menu status
        if(this.props.returnState !== null){
          this.setState({animate: false}, () => this.props.returnState(this.state.animate))
        }
        else{
          this.setState({animate: false})
        }
        //Remove pointer events from all the active DIVs
        this.tooltip.current.style.pointerEvents = "none"
      }
      else{
        if(this.props.returnState !== null){
          this.setState({isOpen: false}, () => this.props.returnState(this.state.isOpen))
        }
        else{
          this.setState({isOpen: false})
        }
      }
    }
  }

  timeOutFunc = () => {
    const timeOutID = setTimeout(() => this.closeMenu(), this.props.timeOut)
    this.setState({timeOutID})
  }

  clearTimeoutFunc = () => {
    clearTimeout(this.state.timeOutID)
  }

  resize = (getElementBounding, selector) => {
    const {offsetX, offsetY} = this.props

    if(offsetX === "center" || offsetX === "centre"){
      this.setState(produce(draft => {
        draft.divStyle.left = getElementBounding.left + (getElementBounding.width - this.state.tooltipWidth)/2
        draft.divStyle.top = getElementBounding.top + getElementBounding.height + offsetY + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0)
      }))
    }
    else{
      this.setState(produce(draft => {
        draft.divStyle.left = getElementBounding.left + offsetX
        draft.divStyle.top = getElementBounding.top + getElementBounding.height + offsetY + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0)
      }))
    }
  }

  componentDidUpdate(prevProp, prevState){
    if(this.state.isOpen){
      this.setState({tooltipWidth: this.tooltip.current.getBoundingClientRect().width})
    }

    if(prevProp.triggerClose !== this.props.triggerClose){
      this.closeMenu()
    }

    setTimeout(() => {
      if(this.props.animation !== ""){
        if(this.state.animate){
          window.addEventListener('click', this.closeMenu)
          window.addEventListener('touchend', this.closeMenu)
        }
        else{
          window.removeEventListener('click', this.closeMenu)
          window.removeEventListener('touchend', this.closeMenu)
        }
      }
      else{
        if(this.state.isOpen){
          window.addEventListener('click', this.closeMenu)
          window.addEventListener('touchend', this.closeMenu)
        }
        else{
          window.removeEventListener('click', this.closeMenu)
          window.removeEventListener('touchend', this.closeMenu)
        }
      }
    },0)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu)
    window.removeEventListener('touchstart', this.closeMenu)

  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.triggerClose !== prevState.trigger){
      return { trigger: nextProps.triggerClose }
    }
    else{
      return false
    }
  }

  render(){
    const{id, children, animation, closeOnClick, detect} = this.props
    const{isOpen, animate, divStyle} = this.state

    const inputChildren = React.Children.map(children, (child, index) => {
      if(child.type.displayName === "Select"){
        return React.cloneElement(child, {detect, openMenu: this.openMenu, closeMenu: this.closeMenu, timeOutFunc: this.timeOutFunc, resize: this.resize})
      }
      else{
        return(
          isOpen && ReactDOM.createPortal(
            <span
              ref={this.tooltip}
              className={animate ? `react-tooltip-absolute-container react-tooltip-${id} ${animation}` : `react-tooltip-absolute-container react-tooltip-${id}`}
              style={divStyle}
              onClick={closeOnClick ? null : e => e.stopPropagation()}
              onTouchEnd={e => e.stopPropagation()}
              onMouseEnter={detect === "hover-interact" ? this.clearTimeoutFunc : undefined}
              onMouseLeave={detect === "hover-interact" ? this.closeMenu : undefined}>
              {React.cloneElement(child)}
            </span>
          , document.body)
        )
      }
    })
    return inputChildren
  }
}

export default ToolTipController;
