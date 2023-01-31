const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let offset = localStorage.getItem('offset');
if (!offset) {
  offset=5;
  localStorage.setItem('offset',offset.toString());
  //intersectionObserver.unobserve($observe);
}
window.addEventListener('beforeunload', function(e) {
  localStorage.clear();
}, false);

let newItem = document.createElement('section');
newItem.classList.add('Items');

const getData = async api =>  {
  if (offset >=200) {
    $observe.innerText = "Todos los productos Obtenidos";
    return;
  }
  const url = api + '?offset='+offset+'&limit=10';
  const data= await fetch(url);
  const products = await data.json();
  if (data.status != 200) {
    console.log(data.status);
    return;
  }
  products.map(product =>{
      console.log(product);
      const article =  document.createElement('article');
      article.classList.add("Card");
      const img = document.createElement('img');
      img.src = product.images[0];
      const h2 = document.createElement('h2');
      h2.innerText = product.title;
      const small = document.createElement('small');
      small.innerText = "$ " + product.price;
      h2.appendChild(small);
      article.appendChild(img);
      article.appendChild(h2)
      newItem.appendChild(article);
      
      
  })
  $app.appendChild(newItem);
 /*
    <article class="Card">
      <img src="imagen.png" />
      <h2>
        Producto
        <small>$ Precio</small>
      </h2>
    </article>
 */
  
    offset+=10;
    localStorage.setItem('offset',offset.toString())
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
      /*if (entry.intersectionRatio >= 0.75) {
        intersectionCounter++;
      }*/
    }
  });
}, {
  rootMargin: '0px 0px 99% 0px',
});

intersectionObserver.observe($observe);
