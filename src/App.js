import { Route, Routes } from "react-router-dom";
import { Home, Login, SignUp, NotFound } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<NotFound />} />
    </Routes>
  );
};

export default App;
