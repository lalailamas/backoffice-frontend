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
  console.log('Store opened')
  await inventoryConfirmation(page)

  console.log('Inventory confirmed')

  await addRemoveProducts(page)

  console.log('Products added and removed')

  await confirmRestock(page)

  console.log('store closed')
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

  const buttonSelector = '#YOUR_ID > div > div.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.sm\\:my-8.sm\\:align-middle.sm\\:max-w-lg.sm\\:w-full.sm\\:p-6 > div.mt-5.flex.flex-row-reverse.gap-4 > button.btn.text-xs.rounded-full.bg-d-dark-dark-purple.border-none.text-d-white.hover\\:bg-d-soft-soft-purple.hover\\:text-d-dark-dark-purple'

  // Espera a que el botón 'Siguiente' esté visible
  await page.waitForSelector(buttonSelector, { visible: true })

  // Hace clic en el botón 'Siguiente'
  await page.click(buttonSelector)
  await new Promise(resolve => setTimeout(resolve, 2000))

  const buttonConfirmation = '#YOUR_ID > div > div.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.sm\\:my-8.sm\\:align-middle.sm\\:max-w-lg.sm\\:w-full.sm\\:p-6 > div.mt-5.flex.flex-row-reverse.gap-4 > button.btn.text-xs.rounded-full.bg-d-dark-dark-purple.border-none.text-d-white.hover\\:bg-d-soft-soft-purple.hover\\:text-d-dark-dark-purple'

  // Espera a que el botón sea detectado en el DOM y sea visible
  await page.waitForSelector(buttonConfirmation, { visible: true })

  // Hace clic en el botón
  await page.click(buttonConfirmation)
  console.log("Clic en 'Tomar foto' realizado.")
}

async function inventoryConfirmation (page) {
  await page.waitForSelector('body > div > div.flex-grow > div > div > div.flex.flex-row.gap-2.items-center.justify-center.overflow-x-auto > div > table > tbody', { visible: true })
  await page.waitForSelector('body > div > div.flex-grow > div > div > div.flex.flex-row.gap-2.items-center.justify-center.overflow-x-auto > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > section > div > button:nth-child(3)')
  await page.click('body > div > div.flex-grow > div > div > div.flex.flex-row.gap-2.items-center.justify-center.overflow-x-auto > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > section > div > button:nth-child(3)')
  await page.waitForSelector('body > div > div.flex-grow > div > div > div.flex.flex-row.gap-2.items-center.justify-center.overflow-x-auto > div > table > tbody > tr:nth-child(4) > td:nth-child(2) > section > div > button:nth-child(1)')
  await page.click('body > div > div.flex-grow > div > div > div.flex.flex-row.gap-2.items-center.justify-center.overflow-x-auto > div > table > tbody > tr:nth-child(4) > td:nth-child(2) > section > div > button:nth-child(1)')
  await page.waitForSelector('tbody input[type="checkbox"]')

  // Seleccionar todos los checkboxes dentro de tbody
  const checkboxes = await page.$$('tbody input[type="checkbox"]')

  // Iterar sobre cada checkbox y hacer clic
  for (const checkbox of checkboxes) {
    await checkbox.click()
  }

  await page.waitForSelector('body > div > div.flex-grow > div > div > div.p-10 > button')
  await page.click('body > div > div.flex-grow > div > div > div.p-10 > button')

  const buttonConfirmation = '#YOUR_ID > div > div.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.sm\\:my-8.sm\\:align-middle.sm\\:max-w-lg.sm\\:w-full.sm\\:p-6 > div.mt-5.flex.flex-row-reverse.gap-4 > button.btn.text-xs.rounded-full.bg-d-dark-dark-purple.border-none.text-d-white.hover\\:bg-d-soft-soft-purple.hover\\:text-d-dark-dark-purple'
  // Espera a que el botón sea detectado en el DOM y sea visible
  await page.waitForSelector(buttonConfirmation, { visible: true })

  // Hace clic en el botón
  await page.click(buttonConfirmation)
}

async function addRemoveProducts (page) {
  const buttonRemove = 'body > div > div.flex-grow > div > div:nth-child(1) > div.px-4.md\\:px-6.lg\\:px-8 > div:nth-child(1) > div.flex.flex-row.gap-2.items-center.overflow-x-auto > section:nth-child(1) > div > div:nth-child(2) > div > button:nth-child(3)'
  await page.waitForSelector(buttonRemove)

  await page.click(buttonRemove)
  const buttonAdd = 'body > div > div.flex-grow > div > div:nth-child(1) > div.px-4.md\\:px-6.lg\\:px-8 > div:nth-child(1) > div.flex.flex-row.gap-2.items-center.overflow-x-auto > section:nth-child(5) > div > div:nth-child(1) > div > button:nth-child(3)'

  await page.waitForSelector(buttonAdd)
  await page.click(buttonAdd)

  await page.click('body > div > div.flex-grow > div > div.flex.justify-center.pb-10 > button')

  const buttonConfirmation = '#YOUR_ID > div > div.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.sm\\:my-8.sm\\:align-middle.sm\\:max-w-lg.sm\\:w-full.sm\\:p-6 > div.mt-5.flex.flex-row-reverse.gap-4 > button.btn.text-xs.rounded-full.bg-d-dark-dark-purple.border-none.text-d-white.hover\\:bg-d-soft-soft-purple.hover\\:text-d-dark-dark-purple'

  await page.waitForSelector(buttonConfirmation, { visible: true })
  await page.click(buttonConfirmation)
}

async function confirmRestock (page) {
  const buttonConfirmation = 'body > div > div.flex-grow > div > div.flex.gap-5.justify-center.pb-10 > button'

  await page.waitForSelector(buttonConfirmation, { visible: true })
  await page.click(buttonConfirmation)

  const camera = '#YOUR_ID > div > div.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.sm\\:my-8.sm\\:align-middle.sm\\:max-w-lg.sm\\:w-full.sm\\:p-6 > div:nth-child(2) > div > button > div > div'
  await page.waitForSelector(camera, { visible: true })
  await page.click(camera)

  await new Promise(resolve => setTimeout(resolve, 2000))

  const takePic = '#inner-circle'
  await page.waitForSelector(takePic, { visible: true })
  await page.click(takePic)

  console.log('Picture taken')

  const commentInput = '#YOUR_ID > div > div.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.sm\\:my-8.sm\\:align-middle.sm\\:max-w-lg.sm\\:w-full.sm\\:p-6 > div:nth-child(3) > div > form > div > div.w-full.md\\:w-full.px-3.mb-2.mt-2 > textarea'

  await page.waitForSelector(commentInput, { visible: true })
  await page.focus(commentInput)

  await page.keyboard.type('Prueba Restock realizada el día de hoy')

  console.log('Comment added')

  const confirmationButton = '#YOUR_ID > div > div.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.sm\\:my-8.sm\\:align-middle.sm\\:max-w-lg.sm\\:w-full.sm\\:p-6 > div:nth-child(3) > div > form > div > div.flex.flex-row.justify-end.gap-6.w-full.p-4.mt-4 > input'

  await page.waitForSelector(confirmationButton, { visible: true })
  await page.click(confirmationButton)

  console.log('Restock confirmed')

  const closeStore = '#YOUR_ID > div > div.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.sm\\:my-8.sm\\:align-middle.sm\\:max-w-lg.sm\\:w-full.sm\\:p-6 > div.mt-5.flex.flex-row-reverse.gap-4 > button.btn.text-xs.rounded-full.bg-d-dark-dark-purple.border-none.text-d-white.hover\\:bg-d-soft-soft-purple.hover\\:text-d-dark-dark-purple'

  await page.waitForSelector(closeStore, { visible: true })
  await page.click(closeStore)
}
test()
