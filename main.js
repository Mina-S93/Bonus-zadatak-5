const api = "https://api.unsplash.com";
const accessKey = "vApX06batGXbozs55toIpFnOdLRXhxYKJP8BX806klA";
let container = document.querySelector(".container");
let loader = document.querySelector("#loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let array = [];
let modals = document.querySelector(".modal");
let block = document.querySelector(".block");
let list = document.querySelector(".list");
let photos = [];

block.addEventListener("click", () => {
	block.style.color = "blue";
	list.style.color = "blueviolet";
	container.classList.replace("list-container", "block-container");
});

list.addEventListener("click", () => {
	block.style.color = "blueviolet";
	list.style.color = "blue";
	container.classList.replace("block-container", "list-container");
});

function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

let unsplash = async () => {
	try {
		let response = await fetch(
			`${api}/photos/random?client_id=${accessKey}&count=${9}`
		);
		array = await response.json();
		generateBoxesWithImage();
		modal();
	} catch {
		(reason) => console.log(reason.message);
	}
};

function generateBoxesWithImage() {
	imagesLoaded = 0;
	totalImages = array.length;

	array.forEach((photo) => {
		let alt;
		if (photo.alt_description === null) {
			alt = "Unsplash photo";
		} else {
			alt = photo.alt_description;
		}

		let img = document.createElement("img");
		let imgContainer = document.createElement("div");
		imgContainer.appendChild(img);
		imgContainer.classList.add("img-container");
		img.setAttribute("src", `${photo.urls.regular}`);
		img.setAttribute("alt", `${alt}`);
		img.classList.add("img");
		container.appendChild(imgContainer);
		img.addEventListener("load", imageLoaded());
		photos.push(img);
		let info = document.createElement("div");

		info.innerHTML = `	<div class="info">
								<div class="user-info">
									<img src=${photo.user.profile_image.medium} alt="#" class="avatar"/>
									<span class="name">${photo.user.first_name} ${photo.user.last_name}</span>
								</div>
								<p>
									<i class="fas fa-link"></i>
									<a href="${photo.links.html}" class="unsplash-link">Link</a>
								</p>
								<p>
									<i class="fas fa-link"></i>
									<a href=${photo.user.portfolio_url} class="portfolio-link">Portfolio</a>
								</p>
								<p><i class="fas fa-heart"></i> <span class="likes">${photo.likes}</span></p>
								<p><i class="fas fa-download"></i> <span class="likes">${photo.downloads}</span></p>

								<div class="social">
									<a href="https://www.instagram.com/${photo.user.social.instagram_username}" class="twitter"><i class="fab fa-twitter"></i></a>
									<a href="https://www.instagram.com/${photo.user.social.twitter_username}" class="facebook"><i class="fab fa-facebook"></i></a>
								</div>
							<div>`;
		imgContainer.appendChild(info);
	});
}

window.addEventListener("scroll", function () {
	if (
		window.scrollY + window.innerHeight >= document.body.offsetHeight - 100 &&
		ready
	) {
		loader.hidden = false;
		ready = false;
		unsplash();
	}
});

unsplash();

function modal() {
	photos.forEach((img) =>
		img.addEventListener("click", (e) => {
			e.preventDefault();
			let source = e.target.src;
			modals.style.display = "block";
			modals.innerHTML = `<span class="close">&times;</span>
			<img class="modal-content" src="${source}">`;

			let close = document.querySelector(".close");
			close.onclick = function () {
				modals.style.display = "none";
			};
		})
	);
}
