/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
import { useEffect, React, Fragment } from 'react'
// import { Tab, initTE } from 'tw-elements'

const TabsComponentLayout = ({ tabs, handleTabChange }) => {
  useEffect(() => {
    const init = async () => {
      const { Tab, initTE } = await import('tw-elements')
      initTE({ Tab })
    }
    init()
  }, [])

  return (
    <div>
      {/* Tabs navigation */}
      <ul className='mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0' role='tablist' data-te-nav-ref>
        {tabs.map((tab, index) => (
          <li key={index} role='presentation' className='w-1/3 sm:w-auto'>
            {index === 0
              ? <a
                  href={`#${tab.id}`}
                  className='my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400'
                  data-te-toggle='pill'
                  data-te-target={`#${tab.id}`}
                  role='tab'
                  data-te-nav-active
                  aria-controls={`#${tab.id}`}
                  aria-selected='true'
                  onClick={() => handleTabChange(index)}

                >
                {tab.name}
              </a>
              : <a
                  href={`#${tab.id}`}
                  className='my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400'
                  data-te-toggle='pill'
                  data-te-target={`#${tab.id}`}
                  role='tab'
                  aria-controls={`#${tab.id}`}
                  aria-selected='true'
                  onClick={() => handleTabChange(index)}
                >
                {tab.name}
                </a>}

          </li>
        ))}
      </ul>

      {/* Tabs content */}
      <div className='mb-6'>
        {tabs.map((tab, index) => (
          <Fragment key={index}>
            {index === 0
              ? <ul
                  key={index}
                  className={`hidden opacity-${tab.active ? '100' : '0'} transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
                  id={tab.id}
                  role='tabpanel'
                  aria-labelledby={`${tab.id}-tab`}
                  data-te-tab-active
                >
            {tab.content}
          </ul>
              : <ul
                  key={index}
                  className={`hidden opacity-${tab.active ? '100' : '0'} transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
                  id={tab.id}
                  role='tabpanel'
                  aria-labelledby={`${tab.id}-tab`}
                >
            {tab.content}
          </ul>}

          </Fragment>
        ))}
      </div>

    </div>

  )
}

export default TabsComponentLayout
