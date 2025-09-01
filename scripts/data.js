const blackHeart = "/img/icons/black-favorit.svg"
const redHeart = "/img/icons/red-favorit.svg"
let favoritsStorage = localStorage.getItem("favorit")

/*** @param {number} id * @param {object} target */
function favoritProduct(id, target) {
	if (!favoritsStorage) {
		localStorage.setItem("favorit", "0")
		localStorage.setItem("favorit", `,${id}`)
		target.style.color = "red"
		target.querySelector("img[alt='Favorit Icon']").src = redHeart
	} else if (favoritsStorage.includes(id)) {
		localStorage.setItem("favorit", favoritsStorage.replaceAll(`,${id}`, ""))
		target.style.color = "black"
		target.querySelector("img[alt='Favorit Icon']").src = blackHeart
	} else {
		localStorage.setItem("favorit", `${favoritsStorage},${id}`)
		target.style.color = "red"
		target.querySelector("img[alt='Favorit Icon']").src = redHeart
	}

	favoritsStorage = localStorage.getItem("favorit")
	if (currentPath) {
		loadFavorits()
	}
}

/*** @param {number} id * @param {object} target */
function checkFavoritIcon(id, target) {
	if (favoritsStorage && favoritsStorage.includes(id)) {
		target.style.color = "red"
		target.querySelector("img[alt='Favorit Icon']").src = redHeart
	}
}

function loadFavorits() {
	document.querySelector("#liked-list").innerHTML = "<p>You have no favorits</p>"
	destinations.forEach((elm) => {
		if (favoritsStorage.includes(elm.id)) {
			if (document.querySelector("#liked-list").innerHTML.includes("You have no favorits")) {
				document.querySelector("#liked-list").innerHTML = ""
			}
			document.querySelector("#liked-list").insertAdjacentHTML("beforeend", `<li class="items-${elm.id}"><figure><img src="${`/img/${elm.image}`}" alt="${elm.title}">
					<figcaption class="nav"><button><img src="/img/icons/red-favorit.svg"
					alt="Favorit Icon"></button><a href="destination.html?product=${elm.id}">MORE</a></figcaption></figure></li>`)
			checkFavoritIcon(elm.id, document.querySelector(`.items-${elm.id}`))

			document.querySelector(`.items-${elm.id} img[alt='Favorit Icon']`).addEventListener("click", () => {
				favoritProduct(elm.id, document.querySelector(`.items-${elm.id}`))
				document.querySelector("#apartment-list").innerHTML = ""
				loadProducts()
			})
		}
	})
}