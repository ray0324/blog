var data = {
  a:1,
  b:2
}
console.log(data);
hljs.configure({
})

$(document).ready(function(){
  console.log('ready');
  $('pre code').each(function (i, block) {
    
    hljs.highlightBlock(block);
  });
})