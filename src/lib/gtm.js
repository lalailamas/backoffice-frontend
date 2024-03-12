export const GTM_ID = 'GTM-WK457DPP'

export const pageview = (url) => {
  if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'pageview',
      page: url
    })
  } else {
    console.log({
      event: 'pageview',
      page: url
    })
  }
}
