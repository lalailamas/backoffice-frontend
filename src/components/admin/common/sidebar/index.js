'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { menuItems } from '@/utils/urlMenu'
import { useSession } from 'next-auth/react'
import { accessData } from '@/utils/rolData'
import SignOutButton from '../sign_out'
import GreetingComponent from '../greeting'

export default function Sidebar (props) {
  const { toggle } = props
  const { data: session } = useSession()
  const rol = session?.user.role
  const router = usePathname()
  const [openSection, setOpenSection] = useState(null)

  const toggleSubMenu = (submenu) => {
    if (submenu === openSection) {
      setOpenSection(null)
    } else {
      setOpenSection(submenu)
    }
  }

  useEffect(() => {
    // Obtener la ruta actual del enrutador
    const currentPath = router
    // console.log(router, 'este es el router')

    // Iterar a través de los elementos del menú para encontrar la sección correspondiente
    menuItems.forEach((menuItem) => {
      if (
        menuItem.subMenuLinks &&
        menuItem.subMenuLinks.some((subMenuItem) => subMenuItem && currentPath.startsWith(subMenuItem.href))
      ) {
        setOpenSection(menuItem.label)
      }
    })
  }, [router.asPath])

  const isActiveLink = (path) => router.asPath === path

  return (
    <>

      <aside
        id='sidebar-multi-level-sidebar'
        className='fixed top-0 left-0 z-50 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-d-dark-dark-purple text-d-white'
        aria-label='Sidebar'
      >
        <button className='absolute top-2 right-2 text-white' onClick={toggle}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
          </svg>
        </button>
        <ul className='flex flex-col p-6 w-80 h-full gap-3 z-50'>
          <li>
            <img src='/img/logo_white.svg' className='w-full mb-8 z-50' alt='Logo' />
          </li>
          {menuItems
            .filter((menuItem) => {
              if (rol === 'restock') {
                return accessData.some(
                  (data) => data.role === rol && data.menuItems_label.includes(menuItem.label)
                )
              }
              // Si el rol no es "restock", muestra todos los elementos
              return true
            })
            .map((menuItem, index) => (
              <li key={index}>
                <span
                  className={`cursor-pointer p-3 hover:text-d-strong-green rounded-full pl-3 hover:bg-d-dark-purple ${
                    isActiveLink(menuItem.subMenuLinks[0].href) ? 'text-d-strong-green font-bold' : ''
                  }`}
                  onClick={() => toggleSubMenu(menuItem.label)}
                >
                  {menuItem.label}
                  {menuItem.icon && (
                    <svg
                      className={`w-4 h-4 ml-2 inline-block transform ${
                      openSection === menuItem.label ? '-rotate-180' : 'rotate-0'
                    } transition-transform`}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 10 6'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m1 1 4 4 4-4'
                      />
                    </svg>
                  )}
                </span>
                {menuItem.subMenuLinks && (
                  <ul className={`ml-6 p-2 ${openSection === menuItem.label ? '' : 'hidden'}`}>
                    {menuItem.subMenuLinks.filter((subMenuItem) => {
                      if (rol === 'restock') {
                        return accessData.some(
                          (data) => data.role === rol && data.submenu_pages.includes(subMenuItem.label)
                        )
                      }
                      // Si el rol no es "restock", muestra todos los elementos
                      return true
                    }).map((subMenuItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={`hover:text-d-strong-green rounded-full pl-3 mb-2 hover:bg-d-dark-purple ${
                    isActiveLink(subMenuItem.href) ? 'text-d-strong-green font-bold' : ''
                  }`}
                      >
                        <Link href={subMenuItem.href} onClick={() => toggle()}>{subMenuItem.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

          <div className='flex flex-col mt-auto'>

            <div className='flex flex-col flex-grow'>
              <hr className='w-full border-t border-gray-300 mb-4' />
              <GreetingComponent />
            </div>
            <div className='flex w-auto justify-end'>
              <SignOutButton />
            </div>

          </div>

        </ul>

      </aside>
    </>
  )
}
