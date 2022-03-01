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

// get phone details
const loadPhoneDetails = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => getPhoneDetails(data.data));
    document.getElementById("modol_section").innerHTML = "";
};
const getPhoneDetails = (details) => {
    console.log(details);
    document.getElementById("modol_section").innerHTML = `
        <div class="col-md-5">
            <div class="m-3">
                <img class="img-fluid" src="${details.image}" alt="" />
                </div>
            </div>
        <div class="col-md-7">
            <h2>${details.name}</h2>
            <small class="text-muted">${details.releaseDate}</small>
            <p>Brand: <i>${details.brand}</i></p>
            <p>Chip Set: ${details.mainFeatures.chipSet}</p>
            <p>Display Size: ${details.mainFeatures.displaySize}</p>
            <p>Storage: ${details.mainFeatures.storage}</p>
            <p>Memory: ${details.mainFeatures.memory}</p>
            <p>Sensors: ${details.mainFeatures.sensors[0]}</p>
            <p>Others: ${details?.others?.WLAN}</p>
            </div>
    

    `;
};
