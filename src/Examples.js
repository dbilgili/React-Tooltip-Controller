import React from 'react'
import ToolTipController from './ToolTipController'
import Select from './Select'
import ToolTip from './Tooltips/ToolTip'
import ToolTipAdvanced from './Tooltips/ToolTipAdvanced'
import Button from '@material-ui/core/Button'
import './styles/prism.css'

class Examples extends React.Component{

  state={
    tooltipState: false,
    tooltipState2: false,
    trigger: false
  }

  getTooltipState = (data) => {
    this.setState({tooltipState: data})
  }

  getOtherTooltipState = (data) => {
    this.setState({tooltipState2: data})
  }

  close = () => {
    this.setState({trigger: true})
  }

  componentDidUpdate(prevProp, prevState){
    if(prevState.tooltipState2 !== this.state.tooltipState2){
      this.setState({trigger: false})
    }

  }

  render(){
    return(
      <div className="Examples">

        <h1>React-Tooltip-Controller | Examples Page</h1>
        <div className="links">
          <a href="https://github.com/dbilgili/React-Tooltip-Controller" target="_blank"  rel="noopener noreferrer">GitHub</a>
          <a href="https://www.npmjs.com/package/react-tooltip-controller" target="_blank"  rel="noopener noreferrer">NPM</a>
        </div>

        <div className="example1 example">

          <pre><code className="language-jsx">{`
            <ToolTipController
              detect="click"
              offsetX="centre"
              offsetY={20}>
              <Select>
                <Button variant="outlined">Click me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          `}</code></pre>

          <ToolTipController
            detect="click"
            offsetX="centre"
            offsetY={20}>
            <Select>
              <Button variant="outlined">Click me</Button>
            </Select>
            <ToolTip/>
          </ToolTipController>
        </div>

        <hr/>

        <div className="example2 example">

          <pre><code className="language-jsx">{`
            <ToolTipController
              detect="hover"
              offsetX="centre"
              offsetY={20}>
              <Select>
                <Button variant="outlined">Hover over me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          `}</code></pre>

          <ToolTipController
            detect="hover"
            offsetX="centre"
            offsetY={20}>
            <Select>
              <Button variant="outlined">Hover over me</Button>
            </Select>
            <ToolTip/>
          </ToolTipController>
        </div>

        <hr/>

        <div className="example3 example">

          <pre><code className="language-jsx">{`
            <ToolTipController
              detect="hover-hold"
              offsetX="centre"
              offsetY={20}>
              <Select>
                <Button variant="outlined">Hover over me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          `}</code></pre>

          <div>
            <div>
              <p>Button won't close when the cursor is moved out</p>
            </div>

            <ToolTipController
              detect="hover-hold"
              offsetX="centre"
              offsetY={20}>
              <Select>
                <Button variant="outlined">Hover over me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          </div>
        </div>

        <hr/>

        <div className="example4 example">

          <pre><code className="language-jsx">{`
            <ToolTipController
              detect="hover-interact"
              closeOnClick={false}
              timeOut={200}
              offsetX="centre"
              offsetY={20}>
              <Select>
                <Button variant="outlined">Hover over me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          `}</code></pre>

          <div>
            <p>
              The cursor can be moved over the tooltip before it closes
              <br/>This option should be used with <span className="md">timeOut</span> prop
            </p>
            <ToolTipController
              detect="hover-interact"
              closeOnClick={false}
              timeOut={200}
              offsetX="centre"
              offsetY={20}>
              <Select>
                <Button variant="outlined">Hover over me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          </div>
        </div>

        <hr/>

        <div className="example5 example">

          <pre className="margin-right"><code className="language-jsx">{`
            <ToolTipController
              id="5"
              detect="hover"
              offsetX="centre"
              offsetY={20}
              animation="fadeIn"
              duration="200ms"
              timing="ease"
              properties={["opacity", "transform"]}>
              <Select>
                <Button variant="outlined">Hover over me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          `}</code></pre>

          <pre className="margin-right"><code className="language-stylus">{`
            .react-tooltip-5
              opacity: 0
              transform: translateY(10px)
              &.fadeIn
                opacity: 1
                transform: translateY(0)
          `}</code></pre>

          <div>
            <p>Tooltip has an animation class</p>
            <ToolTipController
              id="5"
              detect="hover"
              offsetX="centre"
              offsetY={20}
              animation="fadeIn"
              duration="200ms"
              timing="ease"
              properties={["opacity", "transform"]}>
              <Select>
                <Button variant="outlined">Hover over me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          </div>
        </div>

        <hr/>

        <div className="example6 example">

          <pre><code className="language-jsx">{`
            <ToolTipController
              detect="click"
              offsetX="centre"
              offsetY={20}
              timeOut={1000}>
              <Select>
                <Button variant="outlined">Click me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          `}</code></pre>

          <div>
            <p>Tooltip will disapear after 1000ms</p>
            <ToolTipController
              detect="click"
              offsetX="centre"
              offsetY={20}
              timeOut={1000}>
              <Select>
                <Button variant="outlined">Click me</Button>
              </Select>
              <ToolTip/>
            </ToolTipController>
          </div>
        </div>

        <hr/>

        <div className="example7 example">

          <pre><code className="language-jsx">{`
            <ToolTipController
              detect="click"
              offsetX="centre"
              offsetY={20}
              closeOnClick={false}>
              <Select>
                <Button variant="outlined">Click me</Button>
              </Select>
              <ToolTipAdvanced/>
            </ToolTipController>
          `}</code></pre>

          <div>
            <p>Tooltip is interactable (Does not close when clicked on)</p>
            <ToolTipController
              detect="click"
              offsetX="centre"
              offsetY={20}
              closeOnClick={false}>
              <Select>
                <Button variant="outlined">Click me</Button>
              </Select>
              <ToolTipAdvanced/>
            </ToolTipController>
          </div>


        </div>

        <hr/>

        <div className="example8 example">

          <pre className="margin-right"><code className="language-jsx">{`
            <ToolTipController
              detect="click"
              offsetX="centre"
              offsetY={20}
              closeOnClick={false}
              returnState={this.getTooltipState}>
              <Select>
                <Button variant="outlined">Click me</Button>
              </Select>
              <ToolTipAdvanced/>
            </ToolTipController>
          `}</code></pre>

          <pre className="margin-right"><code className="language-javascript">{`
            state={
              tooltipState: false
            }

            getTooltipState = (data) => {
              this.setState({tooltipState: data})
            }
          `}</code></pre>

          <div>
            <p>Tooltip State: {this.state.tooltipState.toString()}</p>
            <ToolTipController
              detect="click"
              offsetX="centre"
              offsetY={20}
              closeOnClick={false}
              returnState={this.getTooltipState}>
              <Select>
                <Button variant="outlined">Click me</Button>
              </Select>
              <ToolTipAdvanced/>
            </ToolTipController>
          </div>

        </div>

        <hr/>

        <div className="example9 example">

          <pre className="margin-right"><code className="language-jsx">{`
            <ToolTipController
              detect="click"
              offsetX="centre"
              offsetY={20}
              closeOnClick={false}
              triggerClose={this.state.trigger}
              returnState={this.getOtherTooltipState}>
              <Select>
                <Button variant="outlined">Click me</Button>
              </Select>
              <ToolTipAdvanced close={this.close}/>
            </ToolTipController>
          `}</code></pre>

          <pre className="margin-right"><code className="language-javascript">{`
            state={
              trigger: false
            }

            close = () => {
              this.setState({trigger: true})
            }
          `}</code></pre>

          <div>
            <p>Button in the tooltip triggers the close action</p>
            <ToolTipController
              detect="click"
              offsetX="centre"
              offsetY={20}
              closeOnClick={false}
              triggerClose={this.state.trigger}
              returnState={this.getOtherTooltipState}>
              <Select>
                <Button variant="outlined">Click me</Button>
              </Select>
              <ToolTipAdvanced close={this.close}/>
            </ToolTipController>
          </div>

        </div>

      </div>
    )
  }
}

export default Examples
