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

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>나의 메모장</h1>
      <nav>
        <a href="/">홈</a>
        <a href="/todo_list">TodoList</a>
      </nav>
    </header>
  );
};

export default Header;
