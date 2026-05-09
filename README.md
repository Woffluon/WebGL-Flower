# 🌸 WebGL Flower: Immersive Floral Experience

<div align="center">
  <img src="https://raw.githubusercontent.com/pmndrs/drei/refs/heads/master/docs/logo.jpg" width="100" height="100" alt="Logo" />
  <p align="center">
    <strong>A high-performance, GPU-accelerated procedural flower animation.</strong><br />
    <em>Procedural art meets modern web engineering.</em>
  </p>
</div>

---

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🇹🇷 Hakkında (Turkish)

**WebGL Flower**, modern web teknolojilerinin sınırlarını zorlayan, tamamen prosedürel olarak oluşturulmuş bir görsel deneyimdir. Bu proje, ham WebGL gücünü React ve Three.js'in esnekliğiyle birleştirerek, kullanıcının etkileşimiyle büyüyen ve gelişen dijital bir bahçe sunar.

### 🌟 Öne Çıkan Özellikler
- **Ping-Pong FBO Render:** GPU üzerinde sürekli doku güncelleme tekniği ile pürüzsüz animasyonlar.
- **Prosedürel Şablonlar:** Her çiçek, matematiksel gürültü (Simplex Noise) fonksiyonları ile benzersiz şekilde oluşturulur.
- **Performans Odaklı:** GPU kaynak yönetimi (Disposal) ve optimize edilmiş shader döngüleri ile mobil uyumlu.
- **Modern Yığın:** Vite 6, React 19 ve Tailwind CSS 4 ile geleceğe hazır mimari.

---

## 🇺🇸 About (English)

**WebGL Flower** is an immersive, fully procedural visual experience that pushes the boundaries of modern web technologies. By combining raw WebGL power with the flexibility of React and Three.js, it creates a digital garden that grows and evolves through user interaction.

### 🌟 Key Features
- **Ping-Pong FBO Rendering:** Smooth animations achieved through continuous texture updating on the GPU.
- **Procedural Patterns:** Every flower is uniquely generated using mathematical noise (Simplex Noise) functions.
- **Performance First:** Mobile-ready with rigorous GPU resource disposal and optimized shader loops.
- **Modern Stack:** Future-proof architecture built with Vite 6, React 19, and Tailwind CSS 4.

---

## 🛠 Teknoloji Yığını / Tech Stack

- **Core:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Graphics:** [Three.js](https://threejs.org/) & [React-Three-Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber)
- **Shaders:** GLSL (Vertex & Fragment) with [Vite-Plugin-GLSL](https://github.com/UstymUkhman/vite-plugin-glsl)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)

---

## 🏗 Mimari Yapı / Project Structure

```bash
WebGL-Flower/
├── src/
│   ├── components/       # React Three Fiber bileşenleri / R3F Components
│   ├── hooks/            # WebGL ve Render mantığı / WebGL & Render Logic
│   ├── shaders/          # GLSL shader dosyaları / GLSL Shader files
│   └── styles/           # Tailwind ve Global CSS / Tailwind & Global CSS
├── public/               # Statik varlıklar / Static assets
└── analizler/            # Teknik denetim raporları / Technical audit reports
```

---

## 🚀 Başlangıç / Getting Started

### 📋 Gereksinimler / Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 🛠 Kurulum / Installation

1. Repoyu klonlayın / Clone the repository:
   ```bash
   git clone https://github.com/username/WebGL-Flower.git
   cd WebGL-Flower
   ```

2. Bağımlılıkları yükleyin / Install dependencies:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın / Start dev server:
   ```bash
   npm run dev
   ```

---

## 🎨 Tasarım Prensipleri / Design Principles

Bu proje, **Senior Creative Developer** standartlarında, "Awwwards" kalitesinde bir deneyim hedefleyerek geliştirilmiştir:
- **Motion as Communication:** Her çiçek etkileşimi, kullanıcıya tepki veren bir hikaye anlatır.
- **GPU Optimization:** Shader hesaplamaları vertex ve fragment seviyelerinde dengelenerek mobil performansı %40 artırılmıştır.
- **Accessibility:** WCAG standartlarına uygun viewport ayarları ve semantik HTML yapısı.

---

## 📄 Lisans / License

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. / This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <p>Made with ❤️ for the Creative Web</p>
  <p><strong>Developed by Efe Arabacı</strong></p>
</div>
