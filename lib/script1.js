var top_mobile_navs = document.querySelectorAll('.sec-nav-li')
var sub_nav_backs = document.querySelectorAll('.nav-sub-back')
var bottom_mobile_menus = document.querySelectorAll('.sec-nav-sub')
var active_nav = null
var last_click = null;
var nav_menu = document.querySelector('.select')
nav_menu.addEventListener('click',function (event) {
  document.querySelector('#sec-nav').style.display='block'
})

top_mobile_navs.forEach( function (e) {

  e.addEventListener('click', function (event) {

    var d = new Date()
    var time = d.getTime()

    var sub = document.querySelector('#'+this.id.replace('-li','-nav'));
    var disp_arr = sub.getAttribute('data-disp').split(',')
    var opac_arr = sub.getAttribute('data-opac').split(',')

    if (last_click) {
      if (time - last_click < 251) {
        window.location.assign(e.getAttribute('data-href'))
      }
    }
    last_click = time
     //ensure all bottom navs are invisible
    active_nav = null
    bottom_mobile_menus.forEach( function (e) {
      e.style.display = 'none'
      e.setAttribute('data-disp','block,none')
    })

    sub.style.display = disp_arr[0]
    sub.setAttribute('data-disp',disp_arr.reverse())


    top_mobile_navs.forEach( function (e) {
      var this_sub = document.querySelector('#'+e.id.replace('-li','-nav'))
      var this_disp_arr = this_sub.getAttribute('data-disp').split(',')
      if (this_disp_arr[0]==='none') {
        active_nav = e.id
      }
    })
    if (active_nav) {
      top_mobile_navs.forEach( function (e) {
        this_rule = (e.id === active_nav) ? '0.45' : '0.1'
        e.style.opacity =  this_rule
      })
    } else {
      top_mobile_navs.forEach( function (e) {
        e.style.opacity = '1'
      })
    }
  })

})

sub_nav_backs.forEach( function (e) {

  e.addEventListener('click', function (event) {
    var par = this.parentElement.parentElement
    var disp_arr = par.getAttribute('data-disp').split(',')
    var opac_arr = par.getAttribute('data-opac').split(',')

    par.style.display = 'none'
    par.setAttribute('data-disp','block,none')

    top_mobile_navs.forEach( function (e) {
      e.style.opacity = '1'
    })

    par.setAttribute('data-opac','0.1,1')

  })

})
