import { compile } from 'path-to-regexp'

type Routes = keyof typeof routes
type Placelholder<T extends Routes> = (typeof routes)[T]['placelholder']
type Data<T extends Routes> = Record<Placelholder<T>, string>

const routes = {
  post: {
    path: '/posts/:slug/',
    placelholder: 'slug',
  },
} as const

export const toPath = <T extends Routes>(route: T, data: Data<T>) => {
  return compile(routes[route].path)(data)
}
