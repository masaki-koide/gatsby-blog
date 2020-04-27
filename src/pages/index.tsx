import React from 'react'
import { Link, graphql, PageProps } from 'gatsby'
import { css } from 'linaria'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { TopPageQuery } from '../../graphql-types'
import { toPath } from '../routes'

const imageContainer = css`
  max-width: 300px;
  margin-bottom: 1.45rem;
`

const IndexPage: React.FC<PageProps<TopPageQuery>> = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div className={imageContainer}>
      <Image />
    </div>
    <ul>
      {data.allContentfulBlogPost.nodes.map(node => (
        <li key={node.id}>
          <Link to={toPath('post', { slug: node.slug ?? '' })}>
            {node.slug}
          </Link>
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query TopPage {
    allContentfulBlogPost(sort: { fields: createdAt, order: DESC }) {
      nodes {
        id
        slug
      }
    }
  }
`
