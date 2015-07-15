(function(W, D) {
  var colors = store.get('colors') || []
  var colorBox = D.getElementById('currentColor')

  generate()

  var client = new ZeroClipboard(colorBox)
  client.on( "ready", function( readyEvent ) {
    // alert( "ZeroClipboard SWF is ready!" );

    client.on( "aftercopy", function( event ) {
      // `this` === `client`
      // `event.target` === the element that was clicked
      showinfo("Copied: " + event.data["text/plain"] );
      } );
  } )
  D.getElementById('generate').addEventListener('click', generate)
  D.getElementById('history').addEventListener('click', function() {
    D.getElementById('color-history').style.display = 'block'
  })
  colorHistory()

  function generate() {
    var color = randomColor()
    if(colors.length > 15) {
      colors.splice(0, 1)
    }
    colors.push(color)
    store.set('colors', colors)
    D.body.style.backgroundColor = color
    colorBox.innerHTML = color
    colorBox.setAttribute('data-clipboard-text', color)
    colorHistory()
  }

  function colorHistory() {
    var copys = []
    var his = D.getElementById('color-history')
    var html = D.getElementById('history-tpl').innerHTML
    var output = ''
    var colors = store.get('colors')
    colors = reverse(colors)
    for(var i=0;i<colors.length;i++) {
      output += html.replace(/__COLOR__/g, colors[i]).replace(/__ORDER__/g, i)
    }
    his.innerHTML = output
    for(var i=0;i<colors.length;i++) {
      copys[i] = new ZeroClipboard(D.getElementById('copy-' + i))

    }
  }
  function reverse(array) {
    var length = array.length
    for (length -= 2; length > -1; length -= 1)
      {
          array.push(array[length]);
          array.splice(length, 1);
      }
      return array
  }
  function showinfo(text) {
    var info = D.getElementById('info')
    info.innerHTML = text
    var mark = new Date().getTime()
    info.className = 'info-' + mark
    setTimeout(function() {
      if(D.querySelector('.info-' + mark))
        D.querySelector('.info-' + mark).innerHTML = ''
    }, 2000)
  }
  W.addEventListener('click', function(e) {
    if(e.target.classList.contains('color-history')) {
      showinfo('Copied: ' + e.target.getAttribute('data-clipboard-text'))
    }
  })
})(window, document);
