import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import '../styles/main.css'

class ToolTipAdvanced extends React.Component{

  state = {
    radio: "Radio 1",
  }

  handleRadio = event => {
    this.setState({ radio: event.target.value });
  }

  render(){
    return(
      <div className="ToolTip advanced">
        <FormControl className="radio-buttons">
          <FormLabel component="legend">Radio Buttons</FormLabel>
          <RadioGroup
            value={this.state.radio}
            onChange={this.handleRadio}>
            <FormControlLabel value="Radio 1" control={<Radio />} label="Radio 1" />
            <FormControlLabel value="Radio 2" control={<Radio />} label="Radio 2" />
            <FormControlLabel value="Radio 3" control={<Radio />} label="Radio 3" />
          </RadioGroup>
        </FormControl>

        <Button variant="outlined" onClick={this.props.close}>Button</Button>
      </div>
    )
  }
}

export default ToolTipAdvanced
