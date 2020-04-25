import React from 'react'
import { PageProps, graphql } from 'gatsby'

import PostPage from '../components/pages/post'
import { isNotNullable } from '../utils/type-guard'
import { PostQuery } from '../../graphql-types'

export type PostPageContext = {
  id: string
  next?: {
    slug: string
  }
  previous?: {
    slug: string
  }
}

const PostPageContainer = ({
  data,
  pageContext,
}: PageProps<PostQuery, PostPageContext>) => {
  if (!data.contentfulBlogPost) {
    throw Error('post is not found')
  }

  const {
    body,
    createdAt,
    description,
    heroImage,
    tags,
    title,
    updatedAt,
  } = data.contentfulBlogPost
  const imageFluid = heroImage?.fluid
    ? {
        ...heroImage.fluid,
        base64: heroImage.fluid.base64 ?? undefined,
        srcWebp: heroImage.fluid.srcWebp ?? undefined,
        srcSetWebp: heroImage.fluid.srcSetWebp ?? undefined,
      }
    : undefined
  const { next, previous } = pageContext

  const props = {
    bodyHtml: body?.childMarkdownRemark?.html ?? '',
    createdAt: createdAt ?? '',
    descriptionHtml: description?.childMarkdownRemark?.html ?? '',
    imageFluid,
    imageTitle: heroImage?.title ?? '',
    next,
    previous,
    tags: (tags ?? []).filter(isNotNullable),
    title: title ?? '',
    updatedAt: updatedAt ?? '',
  }

  return <PostPage {...props} />
}

export default PostPageContainer

export const pageQuery = graphql`
  query Post($id: String) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      slug
      body {
        id
        childMarkdownRemark {
          id
          html
        }
      }
      createdAt
      description {
        id
        childMarkdownRemark {
          id
          html
        }
      }
      heroImage {
        id
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
        title
      }
      tags
      title
      updatedAt
    }
  }
`
