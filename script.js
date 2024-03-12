async function getMenu() {
    try {
        const response = await fetch('menu.json');
        const data = await response.json();
        displayMenu(data);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}
function displayMenu(menuItems) {
    const menuCards = document.querySelector('.menu-cards');
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="takeOrder('${item.name}')">+</button>
        `;
        menuCards.appendChild(card);
    });
}
function takeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            const menuItems = document.querySelectorAll('.card');
            const selectedItems = [];
            while (selectedItems.length < 3) {
                const randomIndex = Math.floor(Math.random() * menuItems.length);
                const selectedItem = menuItems[randomIndex].querySelector('h3').textContent;
                if (!selectedItems.includes(selectedItem)) {
                    selectedItems.push(selectedItem);
                }
            }
            const order = {
                item1: selectedItems[0],
                item2: selectedItems[1],
                item3: selectedItems[2]
            };
            console.log('Order taken:', order);
            resolve(order);
        }, 2500);
    });
}
async function orderPrep() {
    try {
        const orderStatus = true;
        const paid = false;
        console.log('Order prepared:', { orderStatus, paid });
        const paymentStatus = await payOrder(); 
        return { orderStatus, paid: paymentStatus.paid };
    } catch (error) {
        console.error('Error preparing order:', error);
        throw error;
    }
}
function payOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            const orderStatus = true;
            const paid = true;
            console.log('Order paid:', { orderStatus, paid });
            resolve({ orderStatus, paid });
        }, 1000);
    });
}
function thankYouFnc() {
    alert('Thank you for eating with us today!');
}
async function processOrder() {
    await getMenu();
    const order = await takeOrder();
    const orderStatus = await orderPrep();
    if (orderStatus.paid) {
        thankYouFnc();
    }
}

processOrder();
