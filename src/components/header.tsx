import React from 'react'
import { Link } from 'gatsby'
import { css } from 'linaria'

type Props = {
  siteTitle?: string
}

const header = css`
  margin-bottom: 1.45rem;
  background: rebeccapurple;
`

const headingContainer = css`
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  margin: 0 auto;
`

const heading = css`
  margin: 0;
`

const titleLink = css`
  color: white;
  text-decoration: none;
`

const Header: React.FC<Props> = ({ siteTitle = '' }) => (
  <header className={header}>
    <div className={headingContainer}>
      <h1 className={heading}>
        <Link className={titleLink} to="/">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

export default Header
