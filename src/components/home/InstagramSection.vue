<template>
  <section class="instagram-section py-5">
    <div class="container text-center">
      <!-- العنوان -->
      <h2 class="fw-bold">Follow Us On Instagram</h2>
      <p class="text-muted">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
      </p>
      <!-- الصور -->
      <div class="row mt-4 justify-content-center">
        <div class="col-md-2 col-sm-4 col-6 mb-3" v-for="(image, index) in instagramImages" :key="index">
          <img
            :src="image.url"
            :alt="'Instagram image ' + index"
            class="img-fluid rounded shadow-sm"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      instagramImages: [
  { url: require('@/assets/instagram1.png') },
  { url: require('@/assets/instagram2.png') },
  { url: require('@/assets/instagram3.png') },
  { url: require('@/assets/instagram4.png') },
  { url: require('@/assets/instagram5.png') },
],
    };
  },
};
</script>

<style scoped>
.instagram-section {
  background-color: #f8f9fa;
}
.instagram-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.instagram-section img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  transition: transform 0.3s ease-in-out;
}
.instagram-section img:hover {
  transform: scale(1.05);
}
</style>
