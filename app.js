const loadPhone = () => {
    const searchFild = document.getElementById("search-input").value;
    document.getElementById("search-input").value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFild}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => getPhone(data.data.slice(0, 20)));
    document.getElementById("spinner").classList.remove("d-none");
    document.getElementById("products").textContent = "";
};
// get single phone
const getPhone = (phones) => {
    if (phones == "") {
        document.getElementById("error").classList.remove("d-none");
    } else {
        document.getElementById("spinner").classList.add("d-none");
        document.getElementById("error").classList.add("d-none");
        phones.forEach((phone) => {
            const productsContainer = document.getElementById("products");
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
                <div class="card p-2 shadow" style="border-radius: 15px;">
                    <div class="product_img p-4">
                        <img
                            src="${phone.image}"
                            class="card-img-top rounded"
                            alt=""
                        />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-center">${phone.phone_name}</h5>
                        <p class="card-text text-center">Brand: ${phone.brand}</p>
                        <div class="d-flex justify-content-center">
                            <button
                                onclick="loadPhoneDetails('${phone.slug}')"
                                type="button"
                                class="btn d-flex justify-content-center btn-success rounded-pill px-5 py-2"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                id="details">
                                Details<i class="bi bi-arrow-right ps-3"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.appendChild(div);
        });
    }
};

// loed phone details
const loadPhoneDetails = (info) => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => getPhoneDetails(data.data));
    document.getElementById("modol_section").innerHTML = "";
};
//get phone details
const getPhoneDetails = (details) => {
    console.log(details);
    document.getElementById("modol_section").innerHTML = `
        <div class="col-md-5">
                <img style="width: 100%; height: auto; padding: 50px;" src="${
                    details.image
                }" alt="" />
            </div>
        <div class="col-md-7">
            <h2>${details.name}</h2>
            <small class="text-muted ">${
                details.releaseDate
                    ? details.releaseDate
                    : "No release date found"
            }</small>
            <p>Brand: <i>${details.brand}</i></p>
            <h5>Main Features</h5>
            <p>Chip Set: ${details.mainFeatures.chipSet}</p>
            <p>Display Size: ${details.mainFeatures.displaySize}</p>
            <p>Storage: ${details.mainFeatures.storage}</p>
            <p>Memory: ${details.mainFeatures.memory}</p>
            <p>Sensors: ${details.mainFeatures.sensors}</p>
            <h5>Others</h5>
            <p>Bluetooth: ${
                details.others ? details.others.Bluetooth : "No data found"
            }</p>
            <p>WLAN: ${
                details.others ? details.others.WLAN : "No data found"
            }</p>
            <p>USB: ${details.others ? details.others.USB : "No data found"}</p>
            </div>
    

    `;
};
