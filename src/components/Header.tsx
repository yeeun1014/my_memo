// src/components/Header.tsx

/**
 * 컴포넌트 기본 골격:
 * import React from "react";    무조건 가져오고
 * css 필요한거 import 하고
 * const Header: React.FC = () => {
 * 에서 Header 요거는 내가 정하고 싶은 이름(파일이름이랑 똑같이)
 *
 * return (
 * ...
 * 여기 안에 html 태그로 내용 작성
 * )
 *
 * 마지막에 export default Header;
 * Header 를 내가 정하고 싶은 이름으로 변경(파일이음이랑 똑같이)
 */
import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header: React.FC = () => {
  const userData = useAuthStore((state) => state.userData);
  const resetAuthData = useAuthStore((state) => state.resetAuthData);
  const navigate = useNavigate();

  const handleLogout = () => {
    resetAuthData(); // 토큰과 유저 정보 초기화
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="top-row">
        <div className="user-info">
          {userData ? (
            <>
              <span className="username">
                {userData?.username || "사용자"} 님
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link className="login-link" to="/login">
                로그인
              </Link>
              <Link className="login-link" to="/register">
                회원가입
              </Link>
            </>
          )}
        </div>
        <h1 className="title">나의 메모장</h1>
      </div>

      <nav className="menu-row">
        <Link to="/">홈</Link>
        <Link to="/todo_list">TodoList</Link>
        <Link to="/memo_editorv3">메모작성</Link>
      </nav>
    </header>
  );
};

export default Header;
