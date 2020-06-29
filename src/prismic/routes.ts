import Prismic from 'prismic-javascript'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'

let api: ResolvedApi

export default async function routes(): Promise<any> {
  try {
    api = await Prismic.getApi('https://bortolus.cdn.prismic.io/api/v2')

    const immobili = await immobiliResolver()
    const pages = await pagesResolver()

    return [immobili, pages].reduce((acc: string[], paths: string[]) => {
      return acc.concat(paths)
    }, [])
  } catch (e) {
    console.log(e)
  }
}

async function immobiliResolver(): Promise<string[]> {
  const { results } = await api.query(
    Prismic.Predicates.at('document.type', 'immobile'),
    { pageSize: 100, fetch: ['title'], lang: '*' }
  )
  return results.map(immobile => `/immobili/${immobile.uid}`)
}

async function pagesResolver(): Promise<string[]> {
  const { results } = await api.query(
    Prismic.Predicates.at('document.type', 'page'),
    { pageSize: 100, fetch: ['title'], lang: '*' }
  )
  return results.map(page => `/${page.uid}`)
}
