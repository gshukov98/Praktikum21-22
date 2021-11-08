const baseUrl = 'https://fakestoreapi.com/';
const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

let view = 'list';
let products = [];

function getProducts(params = {}) {
    
    const data = { ...params }
    const route = 'products/category';
    $.ajax({
        method: "GET",
        url: `${baseUrl}${route}/${getProductCategory()}`,
        data,
    })
        .done(response => {
            products = response;
            renderProducts();
        })
        .fail(response => {
            console.log(response);
        })
        .always(() => {
            console.log('request completed')
        })
}

function renderProducts() {
    $productList = $('#product-list')
    $productList.empty();
    products.forEach(product => {
        const $template = getProductTemplate(product);
        $productList.append($template);
    })
}

function getProductTemplate(product){
    const templateSelector = `#product-${view}-template`;
    const $template = $($(templateSelector).html());
    $template.find('.product-title').text(product.title);
    const image = product.image ? product.image : defaultPoster;
    $template.find('.product-image').attr('src', image);
    $template.find('.product-price').text(`Цена: ${product.price} лв.`).addClass('badge bg-success');
    $template.find('.product-description').text(product.description);
    $template.find('.product-rating').text(product.rating.rate);

    return $template
}

function getProductParams(){
    const sortBy = $('#filter-sort').val();
    const limit = $('#limitResults').val();
    const params = { limit: limit, sort: sortBy}
    
    return params;
}

function getProductCategory(){
    const category = $('#filter-cat').val();
    return category;
}

$('#get-products').click(()=> {
    getProducts(this.getProductParams());
})

$('#grid-view').click(e => {
    view = 'grid';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#list-view').addClass('btn-outline-primary').removeClass('btn-primary');
    renderProducts();
})

$('#list-view').click(e => {
    view = 'list';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#grid-view').addClass('btn-outline-primary').removeClass('btn-primary');
    renderProducts();
})

getProducts(this.getProductParams());