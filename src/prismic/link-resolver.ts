const linkResolver = (doc: any): string => {

  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'page' || doc.type === 'blog') {
    return '/' + doc.uid
  }

  if (doc.type === 'post') {
    return '/blog/' + doc.uid
  }

  return '/not-found'
}

export default linkResolver
