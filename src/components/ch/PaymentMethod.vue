<template>
    <div>
      <h2>Payment Method</h2>
  
      <!-- Existing Payment Methods -->
      <div v-if="paymentMethods.length > 0">
        <h4>Select a Payment Method:</h4>
        <div v-for="(method, index) in paymentMethods" :key="index" class="card mb-3">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <p class="mb-0"><strong>Card Number:</strong> **** **** **** {{ method.number.slice(-4) }}</p>
              <p class="mb-0"><strong>Cardholder:</strong> {{ method.cardholder }}</p>
              <p class="mb-0"><strong>Expiry:</strong> {{ method.expiry }}</p>
              <p class="mb-0"><strong>Type:</strong> {{ method.type }}</p>
            </div>
            <button class="btn btn-outline-primary" @click="selectPaymentMethod(method)">
              Use This Card
            </button>
          </div>
        </div>
      </div>
  
      <!-- New Payment Method Form -->
      <h4 class="mt-4">Add a New Payment Method</h4>
      <form @submit.prevent="savePaymentMethod">
        <div class="form-group">
          <label for="card">Card Number</label>
          <input
            v-model="newPaymentMethod.number"
            type="text"
            class="form-control"
            id="card"
            maxlength="16"
            pattern="\\d*"
            placeholder="Enter 16-digit card number"
            required
          />
        </div>
        <div class="form-group">
          <label for="cardholder">Cardholder Name</label>
          <input
            v-model="newPaymentMethod.cardholder"
            type="text"
            class="form-control"
            id="cardholder"
            placeholder="Enter cardholder name"
            required
          />
        </div>
        <div class="form-group">
          <label for="expiry">Expiry Date</label>
          <input
            v-model="newPaymentMethod.expiry"
            type="month"
            class="form-control"
            id="expiry"
            required
          />
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input
            v-model="newPaymentMethod.cvv"
            type="text"
            class="form-control"
            id="cvv"
            maxlength="3"
            pattern="\\d*"
            placeholder="Enter 3-digit CVV"
            required
          />
        </div>
        <div class="form-group">
          <label for="type">Card Type</label>
          <select v-model="newPaymentMethod.type" id="type" class="form-control" required>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="Amex">Amex</option>
          </select>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <button type="button" class="btn btn-secondary" @click="$emit('back')">Back</button>
          <button type="submit" class="btn btn-primary">Save Payment Method</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { auth, db } from "@/firebase";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        paymentMethods: [], // Store existing payment methods
        newPaymentMethod: {
          number: "",
          cardholder: "",
          expiry: "",
          cvv: "",
          type: "Visa",
        },
      };
    },
    async created() {
      await this.fetchPaymentMethods();
    },
    methods: {
      async fetchPaymentMethods() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
  
          if (userSnap.exists() && userSnap.data().cards) {
            this.paymentMethods = userSnap.data().cards;
          }
        } catch (error) {
          console.error("Error fetching payment methods:", error);
        }
      },
      async savePaymentMethod() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          const userRef = doc(db, "users", user.uid);
          const updatedCards = [...this.paymentMethods, this.newPaymentMethod];
  
          await updateDoc(userRef, { cards: updatedCards });
          this.paymentMethods = updatedCards;
  
          // Clear the form
          this.newPaymentMethod = { number: "", cardholder: "", expiry: "", cvv: "", type: "Visa" };
          alert("Payment method saved successfully!");
        } catch (error) {
          console.error("Error saving payment method:", error);
        }
      },
      selectPaymentMethod(method) {
        console.log("Selected Payment Method:", method);
        this.$emit("next", method); // Pass selected payment method to the parent
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  