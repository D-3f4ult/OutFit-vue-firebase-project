<template>
    <div class="saved-cards">
      <h3>Saved Cards</h3>
      <!-- Button to Add New Card -->
      <button class="btn btn-primary mb-3" @click="toggleAddCardModal">+ Add New Card</button>
  
      <!-- Cards List -->
      <div class="card-list">
        <div v-for="(card, index) in cards" :key="index" class="card-item d-flex align-items-center mb-3">
          <img :src="getCardLogo(card.type)" alt="Card Logo" class="me-3" />
          <div class="card-details">
            <h5>{{ card.type }} Card</h5>
            <p>Cardholder: {{ card.cardholder }}</p>
            <p>Number: {{ maskCardNumber(card.number) }}</p>
            <p>Expiry: {{ card.expiry }}</p>
          </div>
          <button class="btn btn-danger btn-sm ms-auto" @click="deleteCard(index)">Delete</button>
        </div>
      </div>
  
      <!-- Add/Edit Card Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content p-4">
          <h4>Add a New Card</h4>
          <form @submit.prevent="saveCard">
            <div class="mb-3">
              <label>Card Type</label>
              <select v-model="form.type" class="form-select" required>
                <option value="MasterCard">MasterCard</option>
                <option value="Visa">Visa</option>
                <option value="American Express">American Express</option>
              </select>
            </div>
            <div class="mb-3">
              <label>Card Number</label>
              <input v-model="form.number" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Cardholder Name</label>
              <input v-model="form.cardholder" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Expiration Date</label>
              <input v-model="form.expiry" type="month" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>CVV</label>
              <input v-model="form.cvv" type="password" class="form-control" maxlength="3" required />
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary me-2" @click="toggleAddCardModal">Cancel</button>
              <button type="submit" class="btn btn-success">Add Card</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { db, auth } from "@/firebase";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        cards: [],
        showModal: false,
        form: {
          type: "",
          number: "",
          cardholder: "",
          expiry: "",
          cvv: "",
        },
      };
    },
    async created() {
      await this.fetchCards();
    },
    methods: {
      async fetchCards() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
  
          if (userSnap.exists()) {
            this.cards = userSnap.data().cards || [];
          }
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      },
      toggleAddCardModal() {
        this.showModal = !this.showModal;
        if (!this.showModal) this.resetForm();
      },
      resetForm() {
        this.form = {
          type: "",
          number: "",
          cardholder: "",
          expiry: "",
          cvv: "",
        };
      },
      async saveCard() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          this.cards.push({ ...this.form });
  
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            cards: this.cards,
          });
  
          alert("Card added successfully!");
          this.toggleAddCardModal();
        } catch (error) {
          console.error("Error saving card:", error);
        }
      },
      async deleteCard(index) {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          this.cards.splice(index, 1);
  
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            cards: this.cards,
          });
  
          alert("Card deleted successfully!");
        } catch (error) {
          console.error("Error deleting card:", error);
        }
      },
      maskCardNumber(number) {
        return `${number.slice(0, 4)} XXXX XXXX ${number.slice(-4)}`;
      },
      getCardLogo(type) {
        const logos = {
          MasterCard: "https://via.placeholder.com/50?text=MC",
          Visa: "https://via.placeholder.com/50?text=VISA",
          "American Express": "https://via.placeholder.com/50?text=AMEX",
        };
        return logos[type] || "https://via.placeholder.com/50";
      },
    },
  };
  </script>
  <style scoped>
  .saved-cards {
    padding: 20px;
  }
  .card-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    display: flex;
    align-items: center;
  }
  .card-details {
    flex-grow: 1;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    border-radius: 5px;
    width: 90%;
    max-width: 400px;
  }
  </style>
  