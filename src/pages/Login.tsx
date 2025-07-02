import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // form 기능 막기
    try {
      setError("");
      let response: any = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );
      response = response?.data;
      if (!response?.success) {
        console.error("로그인 실패:", response?.message ?? "");
        setError(`로그인 실패. ${response?.message ?? ""}`);
        return;
      }
      console.log("로그인 성공:", response?.data);
      // 로그인 성공 시 처리
      useAuthStore.getState().setAuthData({
        userData: response?.data?.userData,
        userToken: response?.data?.userToken ?? "",
      });
      navigate("/");
    } catch (error: any) {
      // 로그인 실패 시 처리
      console.error("로그인 실패:", error.response?.data || error.message);
      setError(`로그인 실패. ${error?.message ?? ""}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">사용자명</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디 입력"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">비밀번호</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
