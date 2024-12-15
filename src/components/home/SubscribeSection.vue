<template>
  <section class="newsletter py-5">
    <div class="container d-flex flex-column align-items-center">
      <h2 class="text-center mb-3">Subscribe To Our Newsletter</h2>
      <p class="text-center text-muted mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
      </p>
      <form class="newsletter-form d-flex align-items-center" @submit.prevent="subscribe">
        <input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="michael@gmmail.com"
          required
        />
        <button type="submit" class="btn btn-dark ms-2">Subscribe</button>
      </form>
      <div class="images-container mt-4">
        <img :src="require('@/assets/man.png')" class="left-image" />
        <img :src="require('@/assets/woman.png')" class="right-image" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    subscribe() {
      // وظيفة التسجيل بالنشرة البريدية
      if (this.email) {
        alert(`Thank you for subscribing with email: ${this.email}`);
        this.email = ""; // تفريغ الحقل بعد الإرسال
      }
    },
  },
};
</script>

<style scoped>
.newsletter {
  position: relative;
  text-align: center;
  background-color: #f8f9fa;
}
.newsletter h2 {
  font-size: 2rem;
  font-weight: bold;
}
.newsletter-form {
  max-width: 500px;
  width: 100%;
}
.newsletter-form .form-control {
  border-radius: 25px;
  height: 50px;
  padding: 0 20px;
  flex-grow: 1;
}
.newsletter-form .btn {
  height: 50px;
  border-radius: 25px;
}
.images-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.images-container img {
  max-height: 300px;
  object-fit: contain;
}
.left-image {
  position: absolute;
  left: -120px;
  top: -270px;
}
.right-image {
  position: absolute;
  right: -120px;
  top: -270px;
}
@media (max-width: 768px) {
  .images-container img {
    max-height: 200px;
  }
  .left-image {
    left: -100px;
  }
  .right-image {
    right: -100px;
  }
}
</style>
