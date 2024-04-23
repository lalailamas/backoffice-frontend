const puppeteer = require('puppeteer')

const test = async () => {
  const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true })
  const page = await browser.newPage()
  const context = browser.defaultBrowserContext()
  // Podrías otorgar permisos así o simplemente negarlos.
  await context.overridePermissions('https://dev.despnsa247.com', ['camera'])
  await page.goto('https://dev.despnsa247.com/')
  console.log('Page opened')
  await page.waitForSelector('body > div > div > div > div:nth-child(2) > input')
  //   await new Promise(resolve => setTimeout(resolve, 2000))

  await page.waitForSelector('body > div > div > div > div:nth-child(2) > input')
  await loginUser(page)
  console.log('User logged in')

  await goToRestockPage(page)
  console.log('Restock page opened')
  await OpenStore(page)
}

async function loginUser (page) {
  await page.click('body > div > div > div > div:nth-child(2) > input')
  await page.keyboard.type('graciana.baratti@gmail.com')
  await page.click('body > div > div > div > div:nth-child(3) > div > input')
  await page.keyboard.type('graciana')

  await page.click('body > div > div > div > div:nth-child(4) > button')
}

async function goToRestockPage (page) {
  await page.waitForSelector('body > div > div.drawer > div.drawer-content.overflow-x-auto.bg-d-white > div > label')
  await page.click('body > div > div.drawer > div.drawer-content.overflow-x-auto.bg-d-white > div > label')
  await page.waitForSelector('#sidebar-multi-level-sidebar > ul > li:nth-child(3) > span')
  await page.click('#sidebar-multi-level-sidebar > ul > li:nth-child(3) > span')
  await page.waitForSelector('#sidebar-multi-level-sidebar > ul > li:nth-child(3) > ul > li:nth-child(1) > a')
  await page.click('#sidebar-multi-level-sidebar > ul > li:nth-child(3) > ul > li:nth-child(1) > a')
}

async function OpenStore (page) {
  await page.waitForSelector('body > div > div.flex-grow > div > div > div.flex-col.m-4.p-4 > select > option:nth-child(6)')
  await page.click('body > div > div.flex-grow > div > div > div.flex-col.m-4.p-4 > select')
  await page.select('select.select-sm', 'DEV_CNV_005')

  await page.waitForSelector('body > div > div.flex-grow > div > div > div.flex-col.m-4.p-4 > div > div > button')
  await page.click('body > div > div.flex-grow > div > div > div.flex-col.m-4.p-4 > div > div > button')

  const selector = 'div.flex.flex-col.justify-center.items-center.w-full.h-full.rounded-lg.border.border-gray-300.p-4.text-center'

  await page.waitForSelector(selector, { visible: true })

  // Opcional: Verificar si el texto 'Tomar foto' está presente
  const textContent = await page.$eval(selector, el => el.textContent)
  if (!textContent.includes('Tomar foto')) {
    throw new Error("El botón 'Tomar foto' no fue encontrado.")
  }
  // Hacer clic en el elemento
  await page.click(selector)

  await new Promise(resolve => setTimeout(resolve, 3000))
  const outerCircleSelector = '#outer-circle'

  await page.waitForSelector(outerCircleSelector, { visible: true })

  await page.click(outerCircleSelector)
  await new Promise(resolve => setTimeout(resolve, 2000))

  const nextButtonSelector = 'button:contains("Siguiente")'

  // Espera a que el botón 'Siguiente' esté visible
  await page.waitForSelector(nextButtonSelector, { visible: true })

  // Hace clic en el botón 'Siguiente'
  await page.click(nextButtonSelector)
  console.log("Clic en 'Tomar foto' realizado.")
}

test()
