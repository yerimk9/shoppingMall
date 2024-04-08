import { configureStore } from "@reduxjs/toolkit";
import DarkModeReducer from "@/redux/features/darkSlice";

export const store = configureStore({
  reducer: {
    DarkModeReducer,
  },
});
// Redux-toolkit 라이브러리의 configureStore함수를 사용하여 Redux store의 새 인스턴스 생성

export type RootState = ReturnType<typeof store.getState>; // store.getState() Redux 스토어의 상태를 가져오는 함수 -> 이 함수를 호출하면 현재 Redux 스토어의 전체 상태가 반환됨
// typeof store.getState store.getState()함수의 타입을 가져오는 것, 함수 자체의 타입이 아니라 함수가 반한하는 갑의 타입
// ReturnType<typeof store.getState()>는 store.getState() 함수의 반환 타입을 추출하는 것입니다. 즉, Redux 스토어의 상태 타입이

export type AppDispatch = typeof store.dispatch; // store.dispatch Redux 스토어의 액션을 디스패치하는 함수 -> 이 함수를 호출하여 액션을 스토어로 전달하고 리듀서를 실행시킴
// typeof store.dispatch는 store.dispatch 함수의 타입을 가져오는 것, 함수 자체의 타입이 아니라 함수가 받는 매개변수 및 반환 타입을 나타냄
