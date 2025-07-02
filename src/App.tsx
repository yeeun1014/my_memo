import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import MemoEditor from "./pages/MemoEditor";
import MemoEditorV2 from "./pages/MemoEditorV2";
import MemoEditorV3 from "./pages/MemoEditorV3";
import MemoDetail from "./pages/MemoDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "@toast-ui/editor/dist/toastui-editor.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout은 공통 틀이고 */}
        <Route element={<Layout />}>
          {/* 여기 안에 있는 것만 바뀜 */}
          <Route path="/" element={<Home />} />
          <Route path="/todo_list" element={<TodoList />} />
          <Route path="/memo_editor" element={<MemoEditor />} />
          <Route path="/memo_editorv2" element={<MemoEditorV2 />} />
          <Route path="/memo_editorv3" element={<MemoEditorV3 />} />
          <Route path="/memo_detail" element={<MemoDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
