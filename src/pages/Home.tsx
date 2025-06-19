import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <h2 className="min-h-screen bg-gray-100 flex items-center justify-center">
        홈 화면이에요!
      </h2>
      <p>리액트와 타입스크립트를 배워봐요 🎉</p>
      <Link to="/todo_list">
        <button
          className="px-6 py-3 bg-gradient-to-r
        from-green-500 to-indigo-500"
        >
          Todo List로 이동
        </button>
      </Link>
    </>
  );
};

export default Home;
