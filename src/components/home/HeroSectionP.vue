<template>
  <section class="hero-section container-fluid py-5">
    <div class="row align-items-center">
      <!-- العمود الأيسر -->
      <div class="col-lg-3 col-md-12 text-center">
        <img :src="require('@/assets/left.png')" />
      </div>

      <!-- العمود الأوسط -->
      <div class="col-lg-6 col-md-12 text-center">
        <h1 class="display-3 fw-bold">ULTIMATE SALE</h1>
        <p class="text-uppercase text-muted">New Collection</p>
        <button class="btn btn-dark btn-lg">Shop Now</button>
      </div>

      <!-- العمود الأيمن -->
      <div class="col-lg-3 col-md-12 text-center">
        <img :src="require('@/assets/right.png')" />
      </div>
    </div>
    <div class="row mt-4">
      <!-- صور إضافية -->
      <div class="col-md-6 text-center">
        <img :src="require('@/assets/images.png')" />
      </div>
      <div class="col-md-6 text-center">
        <img :src="require('@/assets/down.png')" />
      </div>
    </div>
  </section>
</template>
<style scoped>
.hero-section {
  background-color: #f8f9fa;
}
.hero-section h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.hero-section p {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}
.hero-section img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}
.btn-dark {
  border-radius: 20px;
}
</style>
