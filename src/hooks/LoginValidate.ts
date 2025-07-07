// src/utils/auth.ts
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * 토큰 이상함 : "false"
 * 토큰 정상: "true"
 * 서버에러: "서버에러 ..."
 */
export const useValidateToken = () => {
  const userToken = useAuthStore((state) => state?.userToken ?? "");
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        let res: any = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/validate`,
          {
            token: userToken,
          }
        );
        res = res?.data;
        console.log(`## useValidateToken :`, res);
        if (!res.success) {
          navigate("/login");
        }
      } catch (err: any) {
        console.error("서버 오류", err);
        alert(`서버에러 ${err?.message ?? ""}`);
        navigate("/");
      }
    };
    checkToken();
  }, [userToken, navigate]);
};
/**
 export const useValidateToken = async (): Promise<string> => {
  const userToken = useAuthStore((state) => state?.userToken ?? "");

  try {
    let res: any = await axios.post("http://localhost:3001/api/auth/validate", {
      token: userToken,
    });
    res = res?.data;
    if (!res?.success) {
      return "false";
    }
    return "true";
  } catch (err: any) {
    return `서버에러. ${err?.message ?? ""}`;
  }
};
 */
