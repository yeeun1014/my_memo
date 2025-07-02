import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MemoEditor: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [idp, setIdp] = useState(0);

  useEffect(() => {
    const _useEffect = async () => {
      try {
        const query = new URLSearchParams(location?.search);
        const idp = Number(query.get("idp") ?? 0);
        setIdp(idp); // ① 먼저 idp 저장

        let res: any = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/memo/get_memo_by_idp?idp=${idp}`
        );
        res = res?.data;
        console.log(`## res:`, res);

        if (!res?.success) {
          alert(`서버 에러. ${res?.message}`);
        }
        res = res?.data;
        setTitle(res?.title ?? "");
        setContent(res?.content ?? "");
      } catch (err: any) {
        console.error("❌ 데이터 불러오기 실패:", err);
        alert(`데이터 불러오기 실패 ${err?.message ?? ""}`);
      }
    };
    _useEffect(); // async 함수 실행
  }, []);

  const handleSave = async () => {
    if (!title?.trim() || !content?.trim()) {
      alert("제목이과 내용을 입력해주세요");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/memo/upsert`,
        { idp, title, content }
      );
      alert("작성이 되었습니다");
      navigate("/todo_list"); // ✅ 작성 성공 시 페이지 이동
    } catch (error: any) {
      console.error(`!!! /api/memo/upsert error: `, error?.message);
      alert(`메모 작성에 실패했습니다. ${error?.message ?? ""}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <div>{idp}</div>
      <div className="text-2xl font-bold mb-6 text-center">메모 작성</div>
      <input
        className="w-full p-3 mb-4 border-b-2 border-gray-300 outline-none text-xl font-semibold placeholder-gray-400"
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e?.target?.value ?? "")}
      />
      <textarea
        className="w-full h-80 p-4 resize-none border border-gray-300 outline-none placeholder-gray-500 text-base font-light leading-relaxed bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22><line x1=%220%22 y1=%2218%22 x2=%221000%22 y2=%2218%22 stroke=%22%23e5e7eb%22 stroke-width=%221%22/></svg>')] bg-[length:100%_2.25rem] bg-repeat-y"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e?.target?.value ?? "")}
      />
      <div className="text-right mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </div>
  );
};
export default MemoEditor;
