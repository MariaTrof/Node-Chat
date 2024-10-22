import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import { AppDispatch } from "../redux/store";
import { checkAuth, setTokens } from "../redux/slice/authSlice";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MainPage from "../pages/MainPage/MainPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
// import AdminPage from "../pages/AdminPage/AdminPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      dispatch(
        setTokens({
          refreshToken: localStorage.getItem("refreshToken")!,
          accessToken: localStorage.getItem("accessToken")!,
        })
      );
      dispatch(checkAuth());
    }
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* 
           <Route path="/admin" element={<AdminPage />} />
           */}
      </Routes>
    </Layout>
  );
}

export default App;
