let data = [
   {
      _id: 1,
      img: "./imgs/black_safety_shoe.png",
      name: "Black Safety Shoe",
      price: 50.00,
      inStock: 4,
   },
   {
      _id: 2,
      img: "./imgs/welding-helmet.png",
      name: "welding Helmet",
      price: 55.00,
      inStock: 5,
   },
   {
      _id: 3,
      img: "./imgs/power_mode_drill.png",
      name: "Power Mode Drill",
      price: 100.00,
      inStock: 4,
   },
   {
      _id: 4,
      img: "./imgs/construction_hat.png",
      name: "Construction Hat",
      price: 20.00,
      inStock: 6,
   },
   {
      _id: 5,
      img: "./imgs/safety_glasses.png",
      name: "Safety Spectacle",
      price: 25.00,
      inStock: 3,
   },
   {
      _id: 6,
      img: "./imgs/safety-suit.png",
      name: "Protective Suit",
      price: 55.00,
      inStock: 4,
   },
   {
      _id: 7,
      img: "./imgs/work-gloves.png",
      name: "Work Gloves",
      price: 10.00,
      inStock: 7,
   },
   {
      _id: 9,
      img: "./imgs/metal_chop_saw.png",
      name: "Metal Chop Saw",
      price: 110.00,
      inStock: 2,
   },
   {
      _id: 10,
      img: "./imgs/table_saw.png",
      name: "Professional Table Saw",
      price: 125.50,
      inStock: 2,
   },
   {
      _id: 11,
      img: "./imgs/welding_machine.png",
      name: "Welding Machine",
      price: 135.00,
      inStock: 1,
   },
   {
      _id: 12,
      img: "./imgs/ear_muff.png",
      name: "Ear Muffs",
      price: 10.00,
      inStock: 2,
   },
   {
      _id: 13,
      img: "./imgs/workbench.png",
      name: "Wooden Workbench",
      price: 100.00,
      inStock: 1,
   },

];




// Change Navigation background when scroll
window.addEventListener('scroll', ()=> {
   // Target the navigation
   document.querySelector('.navigation').classList.toggle('when_scroll', window.scrollY > 0);

   document.querySelector('.scroll_to_top').classList.toggle('arrow_appear', window.scrollY > 700)
})


document.querySelector('.scroll_to_top').addEventListener('click', () => {
   window.scrollTo({
      top: 0,
   });
})


const fade_ins = document.querySelectorAll('.fade_in');

// const sliders = document.querySelectorAll(".slide-in")

const optionsOnScroll = {
   threshold: 0.25,
   rootMargin: "0px 0px -100px 0px"
}

const animateOnScroll = new IntersectionObserver(function(entries, animateOnScroll) {
   // looping through the entries
   entries.forEach(entry => {
      if(!entry.isIntersecting) {
         return
      } else {
         // target the current entry and add the appear class to it
         entry.target.classList.add('appear');
         // unobserve all entry that is not intersecting
         animateOnScroll.unobserve(entry.target);
      }
   })
}, optionsOnScroll)

// Looping through the fadeIns and calling the animateOnScroll.observe() fnx
fade_ins.forEach(fade_in => {
   animateOnScroll.observe(fade_in)
});



// Toggle menu
// Targetting elements
const menu = document.querySelector('.menu_btn');
const close_btn = document.querySelector('.close_btn');
const responsive_nav_menu = document.querySelector('.responsive_nav_menu');

// Toggle menu
menu.addEventListener('click', () => {
   responsive_nav_menu.classList.add('display_nav')
   close_btn.style.display = 'block';
   menu.style.display = 'none';
});

// Toggle close_btn
close_btn.addEventListener('click', () => {
   responsive_nav_menu.classList.remove('display_nav')
   close_btn.style.display = 'none';
   menu.style.display = 'block';
})


// Filter work
const work_categories = document.querySelectorAll('.work_title');
const works = document.querySelectorAll('.work');

// Looping through :: Filtering
work_categories.forEach((category) => {
   // category.addEventListener('click', filter_work.bind(this, category));
   category.addEventListener('click', () => {
      changeAvtivePosition(category);
      // console.log(category.attributes.id.value);
      works.forEach((work) => {
         if(!work.classList.contains(category.attributes.id.value)) {
            work.style.display = 'none';
            // console.log('nope');
         }
         else {
            work.style.display = 'block';
            // console.log('yeah');
         }
      })
   });
})

function changeAvtivePosition(activeCategory) {
   for (const activeCategory of work_categories) {
      activeCategory.classList.remove('active')
   }
   activeCategory.classList.add('active');
}



const shop_container = document.querySelector('.shop_container');

// Products
function loadProducts() {
   // Mapping through the data 
   let products = data.map(item => {
      return `
      <div class="product">
         <img src="${item.img}" scr="${item.name}">
         <h3 class="product_name">${item.name}</h3>
         <p class="product_price">$${item.price}</p>
         <div class="cart_btn">
            <button class="cartBtn">Add to cart</button>
         </div>
      </div>
      `
   });
   products = products.join('');
   // console.log(products);
   shop_container.innerHTML = products;

   // Getting products in localstorage
   // let getProductInCart = JSON.parse(localStorage.getItem('products')) || [];
   // console.log(getProductInCart);
   // document.querySelector('.incart').innerText = getProductInCart.reduce((a, c) => a + c.qty, 0)
   
}



// Calling Functions
loadProducts();
// addTocart();








