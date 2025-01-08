document.addEventListener("DOMContentLoaded", async () => {
    const apiURL = 'https://dummyjson.com/products'; // Replace with your API
    const productsGrid = document.getElementById("products-grid");
    const searchInput = document.getElementById("search-input");
    const pagination = document.getElementById("pagination");
    let currentPage = 1;
    const productsPerPage = 10;
    let products = [];

    // Fetch products from the API
    async function fetchProducts() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            products = data.map((item, index) => ({
                id: item.id,
                name: item.title,
                price: (index + 1) * 10, // Mock price
                category: index % 2 === 0 ? "Electronics" : "Clothing", // Mock category
                image: item.thumbnailUrl,
                description: "Description of " + item.title
            }));
            renderProducts();
            renderPagination();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    // Render products to the grid
    function renderProducts() {
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        const filteredProducts = products.slice(start, end);

        productsGrid.innerHTML = filteredProducts
            .map(
                (product) => `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                        </div>
                    </div>
                </div>
            `
            )
            .join("");
    }

    // Render pagination buttons
    function renderPagination() {
        const totalPages = Math.ceil(products.length / productsPerPage);
        pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
            <li class="page-item ${i + 1 === currentPage ? "active" : ""}">
                <button class="page-link" data-page="${i + 1}">${i + 1}</button>
            </li>
        `).join("");
    }

    // Handle pagination click
    pagination.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            currentPage = Number(event.target.dataset.page);
            renderProducts();
            renderPagination();
        }
    });

    // Handle search functionality
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        products = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        renderProducts();
        renderPagination();
    });

    // Initialize
    fetchProducts();
});
