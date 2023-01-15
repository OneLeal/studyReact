import styles from "./App.module.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Footer />
    </div>
  );
}

export default App;
