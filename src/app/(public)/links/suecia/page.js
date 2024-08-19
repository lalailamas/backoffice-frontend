import StoreLinks from '@/components/admin/common/storelinks'

export default function Suecia () {
  return (
    <StoreLinks
      catalogHref='https://app.despnsa247.com/catalog/CNV_006'
      catalogText='Catálogo Suecia 750'
      gtmId={process.env.NEXT_PUBLIC_SUECIA_GTM_ID}
      gaId={process.env.NEXT_PUBLIC_SUECIA_GA_ID}

    />
  )
}
