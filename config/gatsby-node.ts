import path from 'path'

import { GatsbyNode } from 'gatsby'

import { AllPostsQuery } from '../graphql-types'
import { PostPageContext } from '../src/templates/post'
import { toPath } from '../src/routes'

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
}) => {
  const { data, errors } = await graphql<AllPostsQuery>(`
    query AllPosts {
      allContentfulBlogPost(sort: {fields: createdAt, order: DESC}) {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (errors || !data) {
    throw errors
  }

  data.allContentfulBlogPost.nodes.forEach(({ id, slug }, index, array) => {
    if (!slug) {
      throw Error(`slug is undefined id:${id}`)
    }

    const nextElement = array[index + 1]
    const next = nextElement && nextElement.slug ? { slug: nextElement.slug } : undefined
    const previousElement = array[index - 1]
    const previous = previousElement && previousElement.slug ? { slug: previousElement.slug } : undefined

    createPage<PostPageContext>({
      path: toPath('post', { slug }),
      component: path.resolve('src/templates/post.tsx'),
      context: { id, next, previous },
    })
  })
}
