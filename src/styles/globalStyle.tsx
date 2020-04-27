import { css } from 'linaria'
import { normalize } from 'polished'

const globalStyle = css`
  :global() {
    ${normalize()[0]}
  }
`

export default globalStyle
