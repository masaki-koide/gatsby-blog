import usePostPage from '.'

describe('usePostPage', () => {
  describe('when data is nullable', () => {
    it('should throw error', () => {
      expect(() =>
        usePostPage({ contentfulBlogPost: undefined }, { id: 'id' })
      ).toThrowError('post is not found')
    })
  })
})
