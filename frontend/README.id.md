# React + Vite

Template ini menyediakan pengaturan minimal untuk menjalankan React di Vite dengan HMR (Hot Module Replacement) dan beberapa aturan ESLint.

Saat ini, tersedia dua plugin resmi:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) menggunakan [Babel](https://babeljs.io/) untuk Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) menggunakan [SWC](https://swc.rs/) untuk Fast Refresh.

## Kompiler React

React Compiler tidak diaktifkan pada template ini karena dampaknya terhadap performa pengembangan dan build. Untuk menambahkannya, lihat [dokumentasi ini](https://react.dev/learn/react-compiler/installation).

## Memperluas Konfigurasi ESLint

Jika Anda membangun aplikasi produksi, kami menyarankan penggunaan TypeScript dengan aturan lint berbasis tipe yang diaktifkan. Lihat [template TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) untuk informasi tentang cara mengintegrasikan TypeScript dan [`typescript-eslint`](https://typescript-eslint.io) ke dalam proyek Anda.
