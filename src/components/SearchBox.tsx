import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {};

export default function SearchBox({}: Props) {
  return (
    <form className="flex relative items-center justify-center h-10">
      {/* 
    검색 입력창:
    - px-4: 좌우 패딩 1rem
    - py-2: 상하 패딩 0.5rem
    - w-[230px]: 너비 230px로 고정
    - border: 테두리 추가
    - border-gray-300: 회색 테두리 색상
    - rounded-1-md: 왼쪽 모서리 둥글게
    - focus:outline-none: 포커스 시 기본 아웃라인 제거
    - focus:border-blue-500: 포커스 시 파란색 테두리
    - h-full: <form>의 높이(h-10 = 40px)와 동일하게 설정
  */}
      <input
        type="text"
        placeholder="地域検索"
        className="px-4 py-2 w-[230px] border
        border-gray-300
        rounded-1-md
        focus:outline-none
        focus:border-blue-500
        h-full"
      />
      {/* 
    검색 버튼:
    - px-4: 좌우 패딩 1rem
    - py-[9px]: 상하 패딩 9px
    - bg-blue-500: 파란색 배경
    - text-white: 흰색 텍스트
    - rounded-r-md: 오른쪽 모서리 둥글게
    - focus:outline-none: 포커스 시 기본 아웃라인 제거
    - hover:bg-blue-600: 호버 시 더 진한 파란색
    - h-full: 부모 높이(40px)와 동일하게 설정
  */}
      <button
        className="px-4 py-[9px] 
      bg-blue-500
      text-white rounded-r-md focus:outline-none
      hover:bg-blue-600  h-full"
      >
        <IoSearch />
      </button>
    </form>
  );
}
