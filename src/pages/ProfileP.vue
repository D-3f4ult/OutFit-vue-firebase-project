<template>
    <div class="container-fluid profile-page">
      <!-- Header -->
      <HeaderL />
  
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3 sidebar bg-light">
          <div class="profile-info text-center p-3">
            <h4>{{ user.firstName }} {{ user.lastName }}</h4>
            <p>{{ user.email }}</p>
            <p>{{ user.phone }}</p>
          </div>
          <ul class="list-group">
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              class="list-group-item"
              @click="activeSection = item.section"
              :class="{ active: activeSection === item.section }"
            >
              <i :class="item.icon" class="me-2"></i>{{ item.label }}
            </li>
          </ul>
        </div>
  
        <!-- Main Content -->
        <div class="col-md-9 content p-4">
          <!-- Dynamic Component Rendering -->
          <component :is="activeSection" />
        </div>
      </div>
  
      <!-- Footer -->
      <FooterP />
    </div>
  </template>
  <script>
  import { db } from "@/firebase";
  import { doc, getDoc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  
  // الأقسام الديناميكية
  import PersonalInfo from "../components/pro/PersonalInfo.vue";
  import OrdersP from "../components/pro/OrdersP.vue";
  import WishlistP from "../components/pro/WishlistP.vue";
  import ManageAddresses from "../components/pro/ManageAddresses.vue";
  import SavedCard from "../components/pro/SavedCard.vue";
  import SettingsP from "../components/pro/SettingsP.vue";
  
  // Header and Footer Components
  import HeaderL from "../components/HeaderL.vue";
  import FooterP from "../components/FooterP.vue";
  
  export default {
    name: "ProfileP",
    components: {
      PersonalInfo,
      OrdersP,
      WishlistP,
      ManageAddresses,
      SavedCard,
      SettingsP,
      HeaderL,
      FooterP,
    },
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        activeSection: "PersonalInfo", // القسم الافتراضي عند التحميل
        menuItems: [
          { label: "Personal Information", section: "PersonalInfo", icon: "bi bi-person" },
          { label: "My Orders", section: "OrdersP", icon: "bi bi-bag" },
          { label: "My Wishlist", section: "WishlistP", icon: "bi bi-heart" },
          { label: "Manage Addresses", section: "ManageAddresses", icon: "bi bi-geo-alt" },
          { label: "Saved Card", section: "SavedCard", icon: "bi bi-geo-alt" },
          { label: "Settings", section: "SettingsP", icon: "bi bi-gear" },
        ],
      };
    },
    async created() {
      try {
        const auth = getAuth(); // الحصول على كائن المصادقة
        const currentUser = auth.currentUser; // المستخدم الحالي
  
        if (currentUser) {
          const userId = currentUser.uid; // الحصول على معرف المستخدم
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
  
          if (userSnap.exists()) {
            this.user = userSnap.data();
          } else {
            console.error("User document does not exist!");
          }
        } else {
          console.error("No user is logged in!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  };
  </script>
  <style>
  .profile-page {
    height: 100vh;
  }
  .sidebar {
    height: 100vh;
    border-right: 1px solid #ddd;
  }
  .profile-info {
    text-align: center;
    margin-bottom: 20px;
  }
  .list-group-item.active {
    background-color: #007bff;
    color: white;
  }
  .content {
    padding: 20px;
  }
  </style>
  