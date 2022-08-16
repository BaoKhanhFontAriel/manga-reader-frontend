import logo from "./logo.svg";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import NavigationComponent from "./components/NavigationComponent";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <NavigationComponent />
      <main class="my-4">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
