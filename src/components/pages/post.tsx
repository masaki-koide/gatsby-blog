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
  imageTitle: string
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
  imageTitle,
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
            <div>
              <img
                alt={imageTitle}
                sizes={imageFluid.sizes}
                src={imageFluid.src}
                srcSet={imageFluid.srcSet}
              />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          {tags && tags.length > 0 && (
            <div>
              <p>Tags</p>
              <ul>
                {tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          )}
          <ul>
            <li>Created at {createdAt}</li>
            <li>Updated at {updatedAt}</li>
          </ul>
        </article>
        <footer>
          <ul>
            {next && (
              <li>
                <Link to={`/posts/${next.slug}/`}>next</Link>
              </li>
            )}
            {previous && (
              <li>
                <Link to={`/posts/${previous.slug}/`}>previous</Link>
              </li>
            )}
          </ul>
        </footer>
      </section>
    </Layout>
  )
}

export default PostPage
