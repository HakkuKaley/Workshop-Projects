fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data=>{
    if(!Array.isArray(data)){
        if(data && Array.isArray(data.products))
        {
            data = data.products;
        }
        else{
            console.log(data)
        }
    }
    const productContainer= document.getElementById('product-container');

    data.forEach(product => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-4','mb-3');
        console.log(product);

        cardDiv.innerHTML = `
        <div class='card' style='width:250px;height:370px'>
            <img src="${product.images[0]}" alt="${product.title}"/>
            <div class="vard-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
            </div>
        </div>`;

        productContainer.appendChild(cardDiv);
    });
});                             