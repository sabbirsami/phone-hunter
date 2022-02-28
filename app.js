const loadPhone = () => {
    const searchFild = document.getElementById("search-input").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFild}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data));
};
