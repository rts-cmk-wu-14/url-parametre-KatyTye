const param = new URLSearchParams(window.location.search)
const currentPath = window.location.pathname
const productSearch = param.get("product")
let destinations

async function loadProducts() {
	const productList = document.querySelector("#apartment-list")

	await fetch("/data/destinations.json")
		.then((repsonse) => repsonse.json())
		.then((data) => {
			destinations = data.destinations
		})

	let htmlElments = destinations.map((elm) => {
		return `<li class="item-${elm.id}"><figure><img src="${`/img/${elm.image}`}" alt="${elm.title}">
					<figcaption class="nav"><button id="favorit-button-${elm.id}"><img src="/img/icons/black-favorit.svg"
					alt="Favorit Icon"></button><a href="destination.html?product=${elm.id}">MORE</a></figcaption></figure></li>`
	}).join().replaceAll(",", "")

	productList.insertAdjacentHTML("beforeend", htmlElments)

	productList.querySelectorAll("li").forEach((elm) => {
		let id = Number(elm.classList.value.split("-")[1])
		checkFavoritIcon(id, elm)

		elm.querySelector("img[alt='Favorit Icon']").addEventListener("click", () => {
			favoritProduct(id, elm)
		})
	})
}

if (productSearch) {
	window.location.pathname = "/destination.html"
} else if (!currentPath.includes("index")) {
	window.location.pathname = "/index.html"
}

loadProducts()

setTimeout(() => {
	loadFavorits()
}, 200)