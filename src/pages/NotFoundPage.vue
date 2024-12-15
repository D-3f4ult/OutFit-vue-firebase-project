<template>
  <div class="not-found-page text-center">
    <header>
      <h1>OutFit/</h1>
    </header>
    <div class="error-content py-5">
      <h2 class="display-4 fw-bold">404 ERROR</h2>
      <p class="text-muted">
        This page not found; <br />
        back to home and start again.
      </p>
      <button class="btn btn-dark mt-3" @click="goBack">Back</button>
    </div>
    <footer class="mt-5">
      <div class="footer-links">
        <a href="#" class="text-muted me-3">Contact</a>
        <a href="#" class="text-muted me-3">Terms of Services</a>
        <a href="#" class="text-muted me-3">Shipping and Returns</a>
        <a href="#" class="text-muted">Give an email, get the newsletter.</a>
      </div>
      <div class="social-icons mt-3">
        <a href="#" class="text-muted me-2">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="#" class="text-muted me-2">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="#" class="text-muted">
          <i class="fab fa-twitter"></i>
        </a>
      </div>
      <p class="mt-4 text-muted">&copy; 2025 OutFit. Terms of use and privacy policy.</p>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1); // العودة إلى الصفحة السابقة
    },
  },
};
</script>

<style scoped>
.not-found-page {
  background-color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.error-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.error-content p {
  font-size: 1rem;
}
.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.footer-links a {
  text-decoration: none;
  color: inherit;
  font-size: 0.9rem;
}
.social-icons i {
  font-size: 1.5rem;
}
</style>
