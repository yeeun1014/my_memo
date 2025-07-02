/**
 * npm install @toast-ui/react-editor --legacy-peer-deps
 */
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
//import "@toast-ui/editor/dist/toastui-editor.css";

const MemoEditorV2: React.FC = () => {
  const editorRef = useRef<Editor>(null);
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
        setIdp(idp);

        let res: any = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/memo/get_memo_by_idp?idp=${idp}`
        );
        res = res?.data;

        if (!res?.success) {
          alert(`서버 에러. ${res?.message}`);
          return;
        }

        const { title, content } = res?.data;
        setTitle(title ?? "");

        // ✅ 에디터가 렌더링 된 이후 HTML 삽입
        setTimeout(() => {
          editorRef.current?.getInstance().setHTML(content ?? "");
        }, 0);
      } catch (err: any) {
        console.error("❌ 데이터 불러오기 실패:", err);
        alert(`데이터 불러오기 실패 ${err?.message ?? ""}`);
      }
    };
    _useEffect();
  }, []);

  const handleSave = async () => {
    const content = editorRef.current?.getInstance().getHTML() ?? "";
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
      <Editor
        ref={editorRef}
        height="400px"
        initialEditType="wysiwyg"
        previewStyle="vertical"
        useCommandShortcut={true}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === "string") {
                callback(reader.result, "base64 image");
              }
            };
            reader.readAsDataURL(blob);
            return false; // 서버 업로드 하지 않음
          },
        }}
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
export default MemoEditorV2;
