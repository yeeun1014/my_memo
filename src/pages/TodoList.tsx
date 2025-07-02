import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useValidateToken } from "../hooks/LoginValidate";

type Todo = {
  idp: number;
  title: string;
  content: string;
  userIdp: number;
  createdDt: string;
};

const TodoList: React.FC = () => {
  useValidateToken();
  const userToken = useAuthStore((state) => state?.userToken ?? "");
  const userData = useAuthStore((state) => state.userData);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // ✅ 서버에서 목록 불러오기
  useEffect(() => {
    const _useEffect = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/memo/list`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          console.log(`## res:`, res);
          setTodos(res?.data?.data ?? []); // 서버에서 받은 데이터를 todos 상태에 저장
          console.log(`## todos:`, todos);
        })
        .catch((err) => {
          console.error("❌ 데이터 불러오기 실패:", err);
        });
    };
    _useEffect();
  }, []); // 최초 1회만 실행

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) return;

    setTitle("");
    setContent("");
  };

  const handleDelete = async (idp: number) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/memo/delete`,
        {
          idp: idp,
        }
      );

      if (res?.data?.success) {
        // 클라이언트 상태에서도 해당 idp를 가진 메모 삭제
        const updated = todos.filter((todo) => todo.idp !== idp);
        setTodos(updated);
      } else {
        alert(`삭제 실패: ${res.data.message}`);
      }
    } catch (err: any) {
      console.error("❌ 삭제 요청 실패:", err);
      alert("서버 오류로 삭제에 실패했습니다.");
    }
  };

  const handleUpdate = (idp: number) => {
    navigate(`/memo_editorv3?idp=${idp}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">📝 Todo List 페이지입니다!</h2>

      {/* 리스트 출력 */}
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li key={index} className="border-b pb-2">
            <div
              className="font-semibold text-lg text-blue-600 hover:underline cursor-pointer block w-full py-1"
              onClick={() => navigate(`/memo_detail?idp=${todo?.idp ?? 0}`)}
            >
              {todo.title}
            </div>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html:
                  todo.content.length > 20
                    ? `${todo.content.substring(0, 20)}...`
                    : todo.content,
              }}
            ></div>
            <div className="text-sm text-gray-400">{todo.createdDt}</div>
            <div className="mt-2 flex gap-3">
              <button
                onClick={() => handleUpdate(todo?.idp)}
                className="text-blue-600 hover:underline"
              >
                update
              </button>
              <button
                onClick={() => handleDelete(todo?.idp)}
                className="text-red-600 hover:underline"
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
