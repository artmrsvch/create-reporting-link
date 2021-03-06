const form = document.querySelector('#form')
const checkIds = document.querySelector('.sku')
const area = document.querySelector('#area')
const checkLink = document.querySelector('.links')

//kek
const formCategory = document.querySelector('#formCategory')
const areaCategory = document.querySelector('#areaCategory')
const areaAllCategory = document.querySelector('#areaAllCategory')
const inputArea = document.querySelector('#input-area')


formCategory.addEventListener('submit', (e) => {
  e.preventDefault()

  const valueUsersCateg = e.srcElement[0].value
  const valueAllCateg = e.srcElement[1].value

  const difference = getNotRatedCategory(valueAllCateg, valueUsersCateg)
  const withoutUndefinedDiff = difference.filter(el => el)
  console.log(withoutUndefinedDiff)
  inputArea.value = withoutUndefinedDiff.join('\n')
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const skuArea = e.srcElement[0]
  const select = e.srcElement[1]
  const reasonArea = e.srcElement[2]

  console.log(select.value)
  if (select.value === 'no') {
    alert('Отправку не добавленных пока не сделал')
  } else {
    const link = createLink(skuArea.value.split('\n'))

    // checkLink.textContent = link

    if (confirm('Норм ссылка? Отправляем?')) window.open(link);
  }

})

area.addEventListener('input', (e) => {
  e.stopPropagation()
  checkIds.textContent = e.target.value
})
const createLink = (skuArray) => {
  const baseUrl = ids => `http://content.allo.biz.ua/member.php?f_id=&f_magento_id=&f_status=2&f_status_rw=null&f_date_pub_ot=&f_date_pub_do=&f_prod_id=null&f_business=null&f_good_cat=null&f_good_price=&f_good_name=&f_good_code=&f_good_garanty=&f_source=&f_prod_comment=&f_injob_date_ot=&f_injob_date_do=&f_injob_rw_date_ot=&f_injob_rw_date_do=&f_freelancer_comment=&f_jobcomp_date_ot=&f_jobcomp_date_do=&f_jobcomp_rw_date_ot=&f_jobcomp_rw_date_do=&f_price_coeff=null${ids}&free_status=4&free_rw_status=5&free_comment=&fine_job=%D0%93%D0%BE%D1%82%D0%BE%D0%B2%D0%BE%21`;
  const formatedSku = skuArray.map(sku => `&sel_job%5B%5D=${sku}`).join('')

  return baseUrl(formatedSku)
}
const getNotRatedCategory = (ratedText, notRatedText) => {
  const allNotRatedCategorys = Array.from(new Set(notRatedText.split('\n')))

  const currentCategorysObj = (text) => {
    const array = text.split('\n')
    const buffer = new Object

    array.forEach(element => {
      if (element) {
        buffer[element] = element
      }
    });

    return buffer
  }
  const reducedBufferObject = currentCategorysObj(ratedText)

  const difference = allNotRatedCategorys.map(category => {
    if (!category) return
    const isNotEmpty = reducedBufferObject[category]

    if (!isNotEmpty) return category
  })

  return difference
}