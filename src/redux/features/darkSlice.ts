import { createSlice } from "@reduxjs/toolkit";

type DarkModeState = {
  value: boolean;
};

const initialState = {
  value: false,
} as DarkModeState;

export const DarkMode = createSlice({
  name: "DarkMode",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeMode } = DarkMode.actions;
export default DarkMode.reducer;
/**
 * 액션(action)은 Redux에서 상태를 변경하는데 사용되는 객체를 가리킴
 * Redux Toolkit 에서는 PayloadAction이라는 타입이 액션을 정의하는데 사용됨
 * setSearchInput 리듀서에서 action.payload는 문자열 값을 가지는 검색어를 의미 -> 이 값을 이용하여 검색어 상태를 변경
 */
