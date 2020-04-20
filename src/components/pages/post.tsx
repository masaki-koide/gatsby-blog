import React from 'react'
import { Link } from 'gatsby'

import { ContentfulFluid } from '../../../graphql-types'
import Layout from '../layout'
import SEO from '../seo'

type Props = {
  bodyHtml: string
  createdAt: string
  descriptionHtml: string
  imageFluid?: Pick<ContentfulFluid, 'src' | 'srcSet' | 'sizes'>
  next?: {
    slug: string
  }
  previous?: {
    slug: string
  }
  tags?: string[]
  title: string
  updatedAt: string
}

const PostPage: React.FC<Props> = ({
  bodyHtml,
  createdAt,
  descriptionHtml,
  imageFluid,
  next,
  previous,
  tags,
  title,
  updatedAt,
}) => {
  return (
    <Layout>
      <SEO title={title} />
      <section>
        <header>
          <h2>{title}</h2>
        </header>
        <article>
          {imageFluid && (
            <img
              src={imageFluid.src}
              srcSet={imageFluid.srcSet}
              sizes={imageFluid.sizes}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          <div>
            {tags && tags.length > 0 && tags.map(tag => <span>{tag}</span>)}
          </div>
          <p>Created at {createdAt}</p>
          <p>Updated at {updatedAt}</p>
        </article>
        <footer>
          {next && <Link to={`/posts/${next.slug}/`}>next</Link>}
          {previous && <Link to={`/posts/${previous.slug}/`}>previous</Link>}
        </footer>
      </section>
    </Layout>
  )
}

export default PostPage
