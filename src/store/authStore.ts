import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserRole {
  idp: number;
  roleName: string;
}

interface UserData {
  idp: number;
  username: string;
  password: string;
  tUserRoles: UserRole[];
}

// 최종 마스터 데이터 타입
interface AuthState {
  userData: UserData | null;
  userToken: string | null;
  setAuthData: (data: { userData: UserData; userToken: string }) => void;
  resetAuthData: () => void;
}
/**
 export const useAuthStore = create<AuthState>()( ...
 AuthState 이건 내가 정의한 데이터 타입

  persist(
    (set) => ({
...
    }),
    {
...
    }
  )
이건 리엑트와 zustland 만든 사람이 정해놓은 모듈 사용 골격
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 변수
      userData: null,
      // 변수
      userToken: null,
      // 값 설정 함수
      setAuthData: ({ userData, userToken }) => set({ userData, userToken }),
      // 값 삭제 함수
      resetAuthData: () => set({ userData: null, userToken: null }),
    }),
    {
      // localStorage 라고 영구 저장하는 브라우저 공간의 이름 정하기
      name: "auth-storage", // localStorage에 저장될 이름
    }
  )
);
