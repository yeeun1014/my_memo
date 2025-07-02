import React, { useEffect, useState } from "react";
import { Viewer } from "@toast-ui/react-editor";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useValidateToken } from "../hooks/LoginValidate";

interface MemoData {
  idp: number;
  title: string;
  content: string;
  userIdp: number;
  createdDt: string;
}

const MemoDetail: React.FC = () => {
  useValidateToken();
  const [memo, setMemo] = useState<MemoData | null>(null);
  const [searchParams] = useSearchParams();
  const idp = Number(searchParams?.get("idp") ?? 0);

  useEffect(() => {
    const fetchMemo = async () => {
      if (!idp) return;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/memo/get_memo_by_idp`,
          {
            params: { idp },
          }
        );
        setMemo(response?.data?.data);
      } catch (error: any) {
        console.error(
          "메모 데이터를 불러오는 중 오류 발생:",
          error?.message ?? ""
        );
        alert(`메모 데이터를 불러오는 중 오류 발생 ${error?.message ?? ""}`);
      }
    };

    fetchMemo();
  }, [idp]);
  return (
    <div className="max-w-md mx-auto mt-5 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📝 메모 상세 페이지</h2>
      {memo ? (
        <>
          <h3 className="text-lg font-semibold mb-2">{memo.title}</h3>
          <div className="border p-2 rounded bg-gray-50">
            <Viewer initialValue={memo?.content ?? ""} />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            작성일: {new Date(memo?.createdDt).toLocaleString()}
          </p>
        </>
      ) : (
        <p>로딩 중 또는 메모가 없습니다.</p>
      )}
    </div>
  );
};

export default MemoDetail;
