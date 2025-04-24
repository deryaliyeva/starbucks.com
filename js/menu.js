const drinksDiv = document.getElementById('drinksDiv');
const menuDiv = document.getElementById('menuDiv');
const data = [];

fetch('https://starbucks-data-ashy.vercel.app/menus')
    .then(response => response.json())
    .then(info => {
        data.length = 0;
        data.push(...info.menus);
        showDrinks();
        showMenu();
    });

function showDrinks() {
    drinksDiv.innerHTML = '';

    data.map(item => {
        drinksDiv.innerHTML += `
            <div class="mb-5">
                    <h5 class="text-[19px] font-bold">${item.name}</h5>
                <ul class="pl-4">
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

function showMenu() {
    menuDiv.innerHTML = '';

    data.map(menu => {
        menuDiv.innerHTML += `
        <div class="col-span-1 mn:col-span-2">
            <h2 class="font-bold text-[19px] my-4 w-full">${menu.name}</h2>
            <hr class="mb-10" />
        </div>
        `;

        menu.children.map(cat => {
            menuDiv.innerHTML += `
                <div class="flex w-1/2 items-center gap-3 mb-4">
                    <a href="product.htm?category=${cat.name}">
                        <div class="flex items-center justify-between gap-6">
                            <img src="${cat.categoryImageURL}" alt="${cat.name}" class="w-28 h-28 object-cover rounded-full" />
                            <h5 class="mb-2 w-full">${cat.name}</h5> 
                        </div>
                    </a>
                </div>
            `;
        });
    });
}
