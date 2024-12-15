<template>
    <div class="register-page d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-lg p-4" style="max-width: 900px; border-radius: 12px;">
        <div class="row g-0">
          <!-- صورة جانبية -->
          <div class="col-md-6 d-none d-md-block">
            <img
              :src="require('@/assets/ff.jpeg')"
              class="img-fluid rounded-start"
              alt="Register"
              style="object-fit: cover; height: 100%; border-radius: 12px 0 0 12px;"
            />
          </div>
  
          <!-- نموذج إنشاء حساب -->
          <div class="col-md-6 p-4">
            <h1 class="text-center fw-bold mb-4">OutFit</h1>
            <p class="text-center mb-3">Create Account</p>
  
            <!-- أزرار تسجيل الدخول -->
            <div class="d-flex justify-content-between mb-4">
              <!-- زر Google -->
              <button @click="registerWithGoogle" class="btn btn-danger w-100 me-2 text-white">
                <i class="fab fa-google"></i> Sign up with Google
              </button>
  
              <!-- زر Facebook -->
              <button @click="registerWithFacebook" class="btn btn-outline-primary w-100">
                <i class="fab fa-facebook"></i> Sign up with Facebook
              </button>
            </div>
  
            <p class="text-center text-muted mb-4">-- OR --</p>
  
            <!-- الحقول -->
            <form @submit.prevent="createAccount">
              <div class="row g-3">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="firstName"
                    placeholder="First Name"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="lastName"
                    placeholder="Last Name"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="email"
                    class="form-control"
                    v-model="email"
                    placeholder="Email Address"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="phone"
                    placeholder="Phone Number"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                    placeholder="Password"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="password"
                    class="form-control"
                    v-model="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
  
              <!-- زر إنشاء الحساب -->
              <button type="submit" class="btn btn-dark w-100 mt-4">Create Account</button>
  
              <!-- روابط إضافية -->
              <p class="text-center mt-3">
                Already have an account?
                <router-link to="/login" class="text-primary">Login</router-link>
              </p>
            </form>
  
            <p class="text-center text-muted mt-4">OutFit Terms & Conditions</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import { auth, db } from "../firebase"; // تأكد من إعداد Firebase
  import { doc, setDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      };
    },
    methods: {
      async createAccount() {
        if (this.password !== this.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
  
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );
  
          const user = userCredential.user;
          await setDoc(doc(db, "users", user.uid), {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
          });
  
          alert("Account created successfully!");
          this.$router.push("/login");
        } catch (error) {
          alert("Error creating account: " + error.message);
        }
      },
      async registerWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
          const userCredential = await signInWithPopup(auth, provider);
          const user = userCredential.user;
  
          await setDoc(doc(db, "users", user.uid), {
            firstName: user.displayName.split(" ")[0] || "",
            lastName: user.displayName.split(" ")[1] || "",
            email: user.email,
            phone: "",
          });
  
          alert("Google registration successful!");
          this.$router.push("/shop");
        } catch (error) {
          alert("Google registration failed: " + error.message);
        }
      },
      async registerWithFacebook() {
        const provider = new FacebookAuthProvider();
        try {
          const userCredential = await signInWithPopup(auth, provider);
          const user = userCredential.user;
  
          await setDoc(doc(db, "users", user.uid), {
            firstName: user.displayName.split(" ")[0] || "",
            lastName: user.displayName.split(" ")[1] || "",
            email: user.email,
            phone: "",
          });
  
          alert("Facebook registration successful!");
          this.$router.push("/shop");
        } catch (error) {
          alert("Facebook registration failed: " + error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-page {
    background-color: #f8f9fa;
  }
  .card {
    border-radius: 12px;
  }
  </style>
  