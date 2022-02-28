const loadPhone = () => {
    const searchFild = document.getElementById("search-input").value;
    document.getElementById("search-input").value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFild}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => getPhone(data.data));
    document.getElementById("products").textContent = "";
};
loadPhone();
// get single phone
const getPhone = (phones) => {
    phones.forEach((phone) => {
        // console.log(phone);
        const productsContainer = document.getElementById("products");
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card shadow">
                <div class="product_img p-5">
                    <img
                        src="${phone.image}"
                        class="card-img-top rounded"
                        alt=""
                    />
                </div>
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <button
                        onclick="loadPhoneDetails('${phone.slug}')"
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        id="details">
                        Details
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(div);
    });
};
