import { useState } from 'react'

import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

import CustomStack from './components/CustomStack'

import right from './riemannSums/right'
import left from './riemannSums/left'
import middle from './riemannSums/middle'

function App() {
  const [formula, setFormula] = useState('')
  const [minimum, setMinimum] = useState('')
  const [maximum, setMaximum] = useState('')
  const [boxes, setBoxes] = useState('')
  const [type, setType] = useState<TypeType>(undefined)

  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')

  return (
    <CustomStack>
      <Typography variant="h3" margin={0.25}>
        Riemann Sums
      </Typography>

      <TextField
        label="Formula"
        margin="normal"
        value={formula}
        onChange={(event) => setFormula(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">f(x) = </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Minimum"
        margin="normal"
        value={minimum}
        onChange={(event) => setMinimum(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">a = </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Maximum"
        margin="normal"
        value={maximum}
        onChange={(event) => setMaximum(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">b = </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Number of Boxes"
        margin="normal"
        value={boxes}
        onChange={(event) => {
          const value = event.target.value

          if (!/[0-9]|^$/.test(value)) return

          setBoxes(value)
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">N = </InputAdornment>
          ),
        }}
      />

      <FormControl margin="normal">
        <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="Left"
            control={
              <Radio
                onChange={(event) => event.target.value && setType('LEFT')}
              />
            }
            label="Left"
          />

          <FormControlLabel
            value="Middle"
            control={
              <Radio
                onChange={(event) => event.target.value && setType('MIDDLE')}
              />
            }
            label="Middle"
          />

          <FormControlLabel
            value="Right"
            control={
              <Radio
                onChange={(event) => event.target.value && setType('RIGHT')}
              />
            }
            label="Right"
          />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        disabled={
          !Boolean(formula) ||
          !Boolean(minimum) ||
          !Boolean(maximum) ||
          !Boolean(boxes) ||
          !type
        }
        onClick={(event) => {
          event.preventDefault()

          const numBoxes = parseInt(boxes)

          try {
            setError('')

            switch (type) {
              case 'LEFT':
                setAnswer(left(formula, minimum, maximum, numBoxes))
                break
              case 'MIDDLE':
                setAnswer(middle(formula, minimum, maximum, numBoxes))
                break
              case 'RIGHT':
                setAnswer(right(formula, minimum, maximum, numBoxes))
                break
            }
          } catch (_) {
            setError('Something went wrong. Make sure you have valid inputs')
            setAnswer('')
          }
        }}
        sx={{ margin: 0.25 }}
      >
        Calculate
      </Button>

      <Typography variant="body2" color="error" margin={0.25}>
        {error}
      </Typography>

      {answer && (
        <Typography variant="h3" margin={0.25}>
          Answer
        </Typography>
      )}

      <Typography variant="h5" margin={1}>
        {answer}
      </Typography>
    </CustomStack>
  )
}

export default App
