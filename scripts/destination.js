const param = new URLSearchParams(window.location.search)
const favButton = document.querySelector("#product-favorit")
const productSearch = Number(param.get("product"))
let currentPath = null

if (!productSearch || productSearch <= 0 || productSearch > 8) {
	window.location.search = "?product=1"
}

document.querySelector("#top-scroll").insertAdjacentHTML("beforeend", "<a href='index.html'>BACK</a>")

fetch(`/data/${productSearch}.json`)
	.then((repsonse) => repsonse.json())
	.then((data) => {
		document.querySelector("#info-city").innerHTML = data.destination
		document.querySelector("#info-title").innerHTML = data.title
		document.querySelector("#info-text").innerHTML = data.text
		document.querySelector("#image").src = `/img/${data.image}`

		data.facilities.forEach((elm) => {
			document.querySelector("#facilities").insertAdjacentHTML("beforeend", `<li><p>${elm}</p></li>`)
		})

		checkFavoritIcon(data.id, favButton)

		favButton.addEventListener("click", () => {
			favoritProduct(data.id, favButton)
		})
	})