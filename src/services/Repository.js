
const baseUrl = "https://dog.ceo/api/";

function fetchApi(url) {
    return fetch(url)
    .then(response => {
        return response.json();
    })
}

export default {

    getBreeds() {
        const allBreedsUrl = `${baseUrl}breeds/list/all`;
        return fetchApi(allBreedsUrl);
    },

    getBreedImages(name, number) {
        const breedImagesUrl = `${baseUrl}breed/${name}/images/random/${number}`;
        return fetchApi(breedImagesUrl);
    }

}