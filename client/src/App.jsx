import AppRoute from "./routes/route.tsx";
import Footer from "./components/Footer/Footer.tsx";
// npx prettier --write .
const App = () => {
  return (
    <div>
      <AppRoute />
      <Footer />
    </div>
  );
};

export default App;
