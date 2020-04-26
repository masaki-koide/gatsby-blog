import React from 'react'
import { PageProps, graphql } from 'gatsby'

import PostPage from '../../components/pages/post'
import { PostQuery } from '../../../graphql-types'

import usePostPage from './hooks'

export type PostPageContext = {
  id: string
  next?: {
    slug: string
  }
  previous?: {
    slug: string
  }
}

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

const PostPageContainer = ({
  data,
  pageContext,
}: PageProps<PostQuery, PostPageContext>) => {
  const props = usePostPage(data, pageContext)

  return <PostPage {...props} />
}

export default PostPageContainer
