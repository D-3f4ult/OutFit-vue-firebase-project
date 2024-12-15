<template>
    <div class="forgot-password-page container-fluid vh-100 d-flex align-items-center">
      <div class="row w-100">
        <!-- Left Section with Image -->
        <div class="col-lg-6 d-none d-lg-block">
          <img
            :src="require('@/assets/forget.png')"
            alt="Forgot Password"
            class="img-fluid w-100 h-100"
            style="object-fit: cover;"
          />
        </div>
        <!-- Right Section -->
        <div class="col-lg-6 d-flex flex-column justify-content-center p-5">
          <div class="back-btn mb-4">
            <router-link to="/login" class="text-dark text-decoration-none">
              <i class="fas fa-chevron-left"></i> Back
            </router-link>
          </div>
          <h2 class="fw-bold mb-3">Forgot Password</h2>
          <p class="text-muted mb-4">
            Enter your registered email address. We’ll send you a code to reset your password.
          </p>
          <form @submit.prevent="sendOtp">
            <div class="mb-3">
              <label for="email" class="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="email"
                class="form-control"
                placeholder="robertfox@example.com"
                required
              />
            </div>
            <button type="submit" class="btn btn-dark w-100">Send OTP</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { sendPasswordResetEmail } from "firebase/auth";
  import { auth } from "../firebase";
  
  export default {
    data() {
      return {
        email: "",
      };
    },
    methods: {
      async sendOtp() {
        try {
          await sendPasswordResetEmail(auth, this.email);
          alert("Password reset email sent successfully!");
          this.$router.push("/login"); // Redirect to login after success
        } catch (error) {
          alert("Error sending password reset email: " + error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .forgot-password-page {
    background-color: #f8f9fa;
  }
  .back-btn {
    font-size: 1rem;
  }
  form label {
    font-weight: bold;
  }
  form input {
    border-radius: 12px;
    padding: 10px;
  }
  form button {
    border-radius: 12px;
    padding: 10px;
  }
  </style>
  