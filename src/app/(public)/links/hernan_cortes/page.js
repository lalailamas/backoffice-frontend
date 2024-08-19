import StoreLinks from '@/components/admin/common/storelinks'

export default function HernanCortesStore () {
  return (
    <StoreLinks
      catalogHref='https://app.despnsa247.com/catalog/CNV_008'
      catalogText='Catálogo Hernán Cortés'
      gtmId={process.env.NEXT_PUBLIC_HERNAN_CORTES_GTM_ID}
      gaId={process.env.NEXT_PUBLIC_HERNAN_CORTES_GA_ID}
    />
  )
}
