import { PostQuery } from '../../../../graphql-types'
import { isNotNullable } from '../../../utils/type-guard'
import { PostPageContext } from '../index'

const usePostPage = (data: PostQuery, pageContext: PostPageContext) => {
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

  return {
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
}

export default usePostPage
