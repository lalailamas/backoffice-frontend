import StoreLinks from '@/components/admin/common/storelinks'

export default function ArgomedoStore () {
  return (
    <StoreLinks
      catalogHref='https://app.despnsa247.com/catalog/CNV_009'
      catalogText='Catálogo Argomedo'
      gtmId={process.env.NEXT_PUBLIC_ARGOMEDO_GTM_ID}
      gaId={process.env.NEXT_PUBLIC_ARGOMEDO_GTM_ID}

    />
  )
}
