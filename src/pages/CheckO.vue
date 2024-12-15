<template>
  <div class="checkout-process container">
    <!-- Header -->
    <HeaderL />

    <h1 class="text-center my-4">Checkout</h1>

    <!-- Steps Navigation -->
    <div class="steps-navigation d-flex align-items-center justify-content-between mb-4">
      <div
        class="step"
        :class="{ active: currentStep >= 1 }"
      >
        <i class="fas fa-home"></i>
        <p>Address</p>
      </div>
      <div
        class="step"
        :class="{ active: currentStep >= 2 }"
      >
        <i class="fas fa-credit-card"></i>
        <p>Payment</p>
      </div>
      <div
        class="step"
        :class="{ active: currentStep >= 3 }"
      >
        <i class="fas fa-clipboard-list"></i>
        <p>Review</p>
      </div>
      <div
        class="step"
        :class="{ active: currentStep >= 4 }"
      >
        <i class="fas fa-check-circle"></i>
        <p>Confirmation</p>
      </div>
    </div>

    <!-- Step Content -->
    <div>
      <div v-if="currentStep === 1">
        <ShippingAddress @next="goToNextStep" />
      </div>
      <div v-if="currentStep === 2">
        <PaymentMethod @next="goToNextStep" @back="goToPreviousStep" />
      </div>
      <div v-if="currentStep === 3">
        <ReviewOrder @confirm="confirmOrder" @back="goToPreviousStep" />
      </div>
      <div v-if="currentStep === 4">
        <OrderConfirmation />
      </div>
    </div>

    <!-- Footer -->
    <FooterP />
  </div>
</template>

<script>
import HeaderL from "../components/HeaderL.vue"; // استيراد الهيدر
import FooterP from "../components/FooterP.vue"; // استيراد الفوتر
import ShippingAddress from "../components/ch/ShippingAddress.vue";
import PaymentMethod from "../components/ch/PaymentMethod.vue";
import ReviewOrder from "../components/ch/ReviewOrder.vue";
import OrderConfirmation from "../components/ch/OrderConfirmation.vue";

export default {
  components: {
    HeaderL, // إضافة الهيدر
    FooterP, // إضافة الفوتر
    ShippingAddress,
    PaymentMethod,
    ReviewOrder,
    OrderConfirmation,
  },
  data() {
    return {
      currentStep: 1, // Current active step
    };
  },
  methods: {
    goToNextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    },
    goToPreviousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    confirmOrder() {
      this.currentStep = 4; // Go to confirmation step
    },
  },
};
</script>

<style scoped>
.steps-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
}
.step {
  width: 100px;
  text-align: center;
  padding: 10px;
  position: relative;
  color: #6c757d;
}
.step.active {
  color: #494949;
}
.step i {
  font-size: 24px;
  margin-bottom: 5px;
}
.step p {
  margin: 0;
  font-size: 14px;
}
.steps-navigation::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ddd;
  z-index: -1;
}
.step.active ~ .step::before {
  background-color: #474747;
}
.step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 5%;
  height: 2px;
  width: 100%;
  background-color: #ddd;
  z-index: -1;
}
.step.active:not(:last-child)::after {
  background-color: rgb(0, 0, 0);
}
</style>
