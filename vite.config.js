import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        login: "login.html",
        register: "register.html",
        basket: "basket.html",
        favorites: "favorites.html",
        event: "event.html",
        eventDetail: "eventDetail.html",
        admin: "admin.html",
        user: "user.html"
      },
    },
  },
});