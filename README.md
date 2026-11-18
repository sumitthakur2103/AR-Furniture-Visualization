<div align="center" id="top">

  <h1>🛋️ AR FurniView</h1>

  <p>
    <strong>Augmented Reality Furniture Visualization System</strong>
  </p>

  <p>
    Preview furniture in your real environment before you buy it.
  </p>

  <p>
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/YOUR_GITHUB_USERNAME/AR-FurniView?color=56BEB8">
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/YOUR_GITHUB_USERNAME/AR-FurniView?color=56BEB8">
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/YOUR_GITHUB_USERNAME/AR-FurniView?color=56BEB8">
    <img alt="License" src="https://img.shields.io/github/license/YOUR_GITHUB_USERNAME/AR-FurniView?color=56BEB8">
  </p>

  <br>

<a href="#dart-about">About</a> &#xa0; | &#xa0;
<a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
<a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
<a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
<a href="#checkered_flag-getting-started">Getting Started</a> &#xa0; | &#xa0;
<a href="#iphone-using-the-ar-experience">Using AR</a> &#xa0; | &#xa0;
<a href="#memo-license">License</a>

</div>

<br>

## 🎯 About

**AR FurniView** is a web-based Augmented Reality furniture visualization application that allows users to preview 3D furniture inside their real environment before purchasing it.

The application uses the phone's camera and **WebXR** to detect real-world surfaces and place realistic 3D furniture models directly into the user's surroundings.

Instead of purchasing furniture without knowing how it will look or fit in a room, users can use AR FurniView to:

- Select furniture from a catalogue
- Detect a suitable surface in their surroundings
- Place furniture in real-time
- Rotate the furniture
- Increase or decrease its size
- Remove placed furniture
- Walk around the furniture and view it from different angles

The project focuses on solving a practical problem in online furniture shopping by providing an interactive way to visualize products before making a purchase.

---

## ✨ Features

- ✅ **Markerless Augmented Reality**
- ✅ **WebXR-based AR experience**
- ✅ **Real-world surface detection using Hit Testing**
- ✅ **Real-time furniture placement**
- ✅ **Multiple furniture models**
- ✅ **Furniture catalogue with selectable products**
- ✅ **3D GLB/GLTF furniture models**
- ✅ **Rotate placed furniture**
- ✅ **Scale furniture up**
- ✅ **Scale furniture down**
- ✅ **Remove placed furniture**
- ✅ **Real-time environment light estimation**
- ✅ **Responsive mobile interface**
- ✅ **DOM Overlay for AR controls**
- ✅ **No printed AR marker required**

---

## 🚀 Technologies

The following technologies were used to build the project:

- **React.js** — User interface
- **Three.js** — 3D rendering
- **WebXR** — Augmented Reality
- **WebXR Hit Test API** — Real-world surface detection
- **GLTFLoader** — Loading 3D GLB/GLTF models
- **XREstimatedLight** — AR environment lighting
- **JavaScript** — Application logic
- **HTML5 / CSS3** — Interface and styling
- **Node.js & npm** — Development environment

---

## 🏗️ How It Works

The application follows a simple AR workflow:

```text
User opens the application
          ↓
Selects a furniture model
          ↓
Starts AR mode
          ↓
Camera scans the surroundings
          ↓
WebXR Hit Test detects a surface
          ↓
Placement reticle appears
          ↓
User taps the screen
          ↓
3D furniture is placed
          ↓
User can rotate / resize / remove it
```

---

## 📱 Using the AR Experience

### 1. Open the application

Open the deployed application on a compatible mobile device.

### 2. Start AR

Tap the **Start AR** button.

Allow camera access when the browser asks for permission.

### 3. Select furniture

Choose a furniture model from the catalogue displayed at the bottom of the screen.

### 4. Scan the environment

Move the phone slowly around the room.

The application uses WebXR hit testing to identify suitable surfaces.

### 5. Place furniture

When the placement reticle appears on a detected surface, tap the screen.

The selected furniture will appear at that location.

### 6. Customize the furniture

After placing a furniture model, use the controls to:

| Control      | Action                        |
| ------------ | ----------------------------- |
| ↻ Rotate     | Rotate furniture by 30°       |
| ＋ Scale Up  | Increase furniture size       |
| − Scale Down | Decrease furniture size       |
| 🗑 Remove    | Remove the selected furniture |

### 7. Explore the furniture

Move around the room while using the phone camera to view the furniture from different angles.

### 8. Exit AR

Use the browser's AR controls to exit the AR experience.

---

## 📂 Project Structure

```text
AR-FurniView/
│
├── public/
│   ├── *.glb
│   └── furniture-models
│
├── src/
│   ├── App.js
│   ├── App.css
│   └── ...
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 🪑 Furniture Catalogue

The application currently includes multiple 3D furniture models such as:

- Yellow Armchair
- Blue Armchair
- Marble Coffee Table
- Storage Coffee Table
- Petrol Velvet Armchair
- Nesting Side Tables

The catalogue can be extended by adding additional GLB/GLTF furniture models.

---

## ⚙️ Requirements

Before starting, make sure you have:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- npm
- A modern browser
- An AR-compatible mobile device

For the AR experience, the browser/device must support the required **WebXR AR features**, including hit testing.

---

## 🏁 Getting Started

### Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/AR-FurniView.git
```

### Navigate to the project

```bash
cd AR-FurniView
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

The application will start locally, usually at:

```text
http://localhost:3000
```

---

## 📱 Testing on a Mobile Device

WebXR AR generally requires a secure context.

For local development, you can use a tunneling service such as **ngrok** to expose the local application through HTTPS.

Example:

```bash
ngrok http 3000
```

Open the generated HTTPS URL on your compatible mobile device.

> **Note:** AR support depends on the browser and device. Make sure your device supports the WebXR features required by the application.

---

## 💡 Real-World Use Case

AR FurniView demonstrates how Augmented Reality can improve the online furniture shopping experience.

### Problem

When purchasing furniture online, customers often have difficulty determining:

- Whether the furniture will fit in their room
- How large it will appear
- Whether it will look good in their existing space
- How the furniture will look from different angles

### Solution

AR FurniView allows customers to visualize furniture directly inside their surroundings before making a purchasing decision.

This concept can be extended into a complete AR-based furniture shopping platform with:

- Product prices
- Product dimensions
- Shopping cart
- Online payment
- Furniture categories
- Room measurement
- Multiple furniture placement
- Product recommendations

---

## 🔮 Future Improvements

Possible future improvements include:

- 📏 Real-world furniture measurement
- 🛒 Shopping cart integration
- 💳 Online payment integration
- ❤️ Wishlist functionality
- 🏠 Room measurement
- 🪑 More furniture categories
- 🎨 Furniture color customization
- 📦 Product availability
- 💰 Price comparison
- 📸 Screenshot of AR placement
- 🧠 AI-powered furniture recommendations
- 💾 Save room layouts

---

## 🎓 Academic Project

This project was developed as an **AR/VR practical project** to demonstrate the application of Augmented Reality in a real-world scenario.

### Project Objective

To develop an interactive AR application that allows users to visualize furniture in their physical environment using a mobile device.

### Key Learning Areas

- Augmented Reality
- WebXR
- 3D rendering
- Three.js
- Hit testing
- GLB/GLTF models
- Real-time lighting
- Mobile AR interaction
- 3D object transformation

---

## 👨‍💻 Developer

**Sumit Thakur**

B.Tech — Information Technology (Artificial Intelligence & Robotics)

Madhav Institute of Technology and Science, Gwalior

---

## 📄 License

This project contains components and 3D assets derived from open-source resources. Please refer to the applicable licenses and attribution requirements for the original resources included in the project.

---

<div align="center">

### 🛋️ AR FurniView

**Visualize it. Place it. Experience it.**

<br>

<a href="#top">⬆️ Back to top</a>

</div>
