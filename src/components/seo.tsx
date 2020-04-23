/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { Helmet, HelmetProps } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { SiteMetadataQuery } from '../../graphql-types'

type Meta = HelmetProps['meta']
type Props = {
  description?: string
  lang?: string
  meta?: Meta
  title: string
}

const SEO: React.FC<Props> = ({
  description = '',
  lang = 'en',
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery<SiteMetadataQuery>(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site?.siteMetadata?.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={([
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ] as NonNullable<Meta>).concat(meta)}
      title={title}
      titleTemplate={`%s | ${site?.siteMetadata?.title}`}
    />
  )
}

export default SEO
