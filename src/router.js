import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth'; // استيراد Firebase Authentication

// استيراد الصفحات
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import ShopPage from './pages/ShopPage.vue';
import DealsPage from './pages/DealsPage.vue';
import NewArrivals from './pages/NewArrivals.vue';
import PackagesP from './pages/PackagesP.vue';
import ForgotPasswordPage from './pages/ForgotPasswordPage.vue';
import NotFoundPage from "./pages/NotFoundPage.vue";
import ProductDetails from './pages/ProductDetails.vue';
import ProfileP from './pages/ProfileP.vue';
import CheckOut from './pages/CheckOut.vue';
import WishL from './pages/WishL.vue';
import DashL from './pages/DashL.vue';
import CheckO from './pages/CheckO.vue';

// وظيفة التحقق من تسجيل الدخول
const requireAuth = (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    next(); // إذا كان المستخدم مسجل الدخول، تابع
  } else {
    next('/login'); // إذا لم يكن مسجل الدخول، أعد التوجيه إلى صفحة تسجيل الدخول
  }
};

// وظيفة التحقق من عدم تسجيل الدخول (لصفحات مثل تسجيل الدخول والتسجيل)
const redirectIfAuthenticated = (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    next('/'); // إذا كان المستخدم مسجل الدخول، أعد التوجيه إلى الصفحة الرئيسية
  } else {
    next(); // إذا لم يكن مسجل الدخول، تابع
  }
};

// تعريف المسارات (Routes)
const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LoginPage', component: LoginPage, beforeEnter: redirectIfAuthenticated },
  { path: '/register', name: 'RegisterPage', component: RegisterPage, beforeEnter: redirectIfAuthenticated },
  { path: '/deals', name: 'DealsPage', component: DealsPage },
  { path: '/New-Arrivals', name: 'NewArrivals', component: NewArrivals },
  { path: '/Packages', name: 'PackagesP', component: PackagesP },
  { path: "/forgot-password", name: "ForgotPassword", component: ForgotPasswordPage },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
  { path: '/fav', name: 'WishL', component: WishL, beforeEnter: requireAuth },
  { path: '/shop', name: 'ShopPage', component: ShopPage, beforeEnter: requireAuth },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails, beforeEnter: requireAuth },
  { path: '/profile', name: 'ProfileP', component: ProfileP, beforeEnter: requireAuth },
  { path: '/CheckOut', name: 'CheckOut', component: CheckOut, beforeEnter: requireAuth },
  { path: '/Check', name: 'CheckO', component: CheckO, beforeEnter: requireAuth },
  { path: '/DashL', name: 'DashL', component: DashL },
];

// إنشاء نظام التوجيه
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
