/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from 'linaria'

import { SiteTitleQuery } from '../../graphql-types'
import globalStyle from '../styles/globalStyle'

import Header from './header'

const container = css`
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
  margin: 0 auto;
`

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery<SiteTitleQuery>(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div className={globalStyle} />
      <Header siteTitle={data.site?.siteMetadata?.title ?? ''} />
      <div className={container}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
