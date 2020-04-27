import { css } from 'linaria'
import { normalize } from 'polished'

const globalStyle = css`
  /* stylelint-disable */
  :global() {
    ${normalize()[0]}
  }
`

export default globalStyle
