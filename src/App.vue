<template>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" id="app">
    <main role="main" class="inner cover">
      <h1 class="cover-heading">Breeds</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-12 breedNamesWrap">
              <breed-item v-for="(subBreedArray, breedName ) in allBreeds" 
                :key = "breedName"
                :breed-name = "breedName"
                :sub-breed = "subBreedArray" 
                :breed-chkbox-hndlr = "breedselected"                       
                >
              </breed-item>
          </div>
        </div>
      </div>

      <div class="album py-5">
        <div class="container">    
          <div class="row">
              <breed-image v-for="(image, index) in selectedBreedsImages"
                :key = "index"
                :img-url = "image.url"
                :img-breed-name = "image.name"
                :img-index = "index"
                :img-remove-handlr = "removeImgHandlr"    
                @uncheckbreedselection = "uncheckBreed"
              >
              </breed-image>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

import BreedItem from './components/Breed.vue';
import BreedImage from './components/BreedImage.vue';

import api from './services/Repository.js';


export default {
  name: 'app',
  data () {
    return {
      allBreeds:[],
      selectedBreeds:[],
      maxSelection: 2,
      selectedBreedsImages:[],
      imageRemoveTracker: {}
    }
  },
  watch: {

    selectedBreeds : function(newSelectedBreeds) {
      this.selectedBreedsImages = [];
      this.imageRemoveTracker = {};

      if(newSelectedBreeds.length == 1) {
        api.getBreedImages(this.selectedBreeds[0], 10)
          .then(json => this.formatAndMoveimagesToArray(json.message, this.selectedBreeds[0]));

      } else if(newSelectedBreeds.length == 2) {
        api.getBreedImages(this.selectedBreeds[0], 5)
          .then(json => {
            this.formatAndMoveimagesToArray(json.message, this.selectedBreeds[0]);
            api.getBreedImages(this.selectedBreeds[1], 5)
              .then(json => {
                this.formatAndMoveimagesToArray(json.message, this.selectedBreeds[1]);
              })
            });
      }
    }

  },
  created: function() {
    api.getBreeds()
      .then(json =>{ this.allBreeds = json.message;});
  },
  methods: {

    breedselected: function(event) {
      let target = event.currentTarget;
      let name = target.name;
      let selectedBreeds = this.selectedBreeds;

      if(target.checked) {
        selectedBreeds.push(name);
        if(selectedBreeds.length > 2) {
          let removedBreed = selectedBreeds.shift();
          document.querySelector(`input[name=${removedBreed}]`).checked = false;
        }
      } else {
        selectedBreeds.splice(selectedBreeds.indexOf(name), 1);
      }
    },

    removeImgHandlr: function(index, name, vi) {
      this.selectedBreedsImages.splice(index, 1);

      if(this.imageRemoveTracker[name] > 0) {
        this.imageRemoveTracker[name]--;
        if(this.imageRemoveTracker[name] == 0) vi.$emit('uncheckbreedselection', name);
      }            
    },

    formatAndMoveimagesToArray: function(imagesArray, breedName) {
      imagesArray.forEach(item => {
        this.selectedBreedsImages.push({
          'name': breedName, 
          'url': item})
      })
      this.imageRemoveTracker[breedName] = imagesArray.length;
    },

    uncheckBreed: function(name) {
      delete this.imageRemoveTracker[name];
      document.querySelector(`.selectBreed input[name="${name}"`).click();
    }

}, 
  components: {
    BreedItem,
    BreedImage
  }
}
</script>