const productDiv = document.getElementById('productDiv');
const drinksDiv2 = document.getElementById('drinksDiv2')
const titleDiv = document.getElementById('titleDiv')

const productData = [];

const selectedCategory = new URLSearchParams(location.search).get('category');


fetch('https://starbucks-data-ashy.vercel.app/menus')
    .then(res => res.json())
    .then(info => {
        productData.push(...info.menus);
        showProduct();
        showDrinks2();
    });


    function showDrinks2() {
        drinksDiv2.innerHTML = '';
        productData.map(item => {
            drinksDiv2.innerHTML += `

            <div>
            <div class="mb-2">
                    <h5 class="text-[19px] font-bold mb-2">${item.name}</h5>
            </div>
                    <ul class="pl-4 mb-10">
                        ${item.children.map(child => `
                            <li class="text-[#00000094]">
                                <a href="product.htm?category=${child.name}" class="text-[17px] hover:underline">${child.name}</a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        });
    }

function showProduct() {
    productDiv.innerHTML = '';

    productData.map(menu => {
        menu.children.map(cat => {
            if (cat.name === selectedCategory) {
                titleDiv.innerHTML = `
                  <div>
                    <h5 class="text-[16px] text-gray-500 col-span-2">Menu / ${cat.name}</h5>
                    <h2 class="font-extrabold text-[24px] col-span-2"> ${cat.name}</h2>
                  </div>
                    `;
                
                cat.children.map(elem => {
                    productDiv.innerHTML += `
                    <div class="py-3 w-full">
                        <h3 class="text-xl font-semibold mb-2">${elem.name}</h3>
                        <hr class="mt-[16px]" />
                    </div>
                    `;
                    if (elem.products && elem.products.length > 0) {
                        elem.products.map(product => {
                            productDiv.innerHTML += 
                            `
                             <div>
                               <div class="py-4">
                                    <img 
                                    class="rounded-full max-w-36 max-h-36 object-cover mb-2" 
                                    src="${product.imageURL}" 
                                    alt="${product.name}" 
                                    />
                                  <div class="max-w-[150px] min-h-[100px]">
                                    <p class="text-[16px]">${product.name}</p>
                                  </div>
                               </div>
                            </div>
                            `
                        })
                    }
                })
            }
        })
    })
}

