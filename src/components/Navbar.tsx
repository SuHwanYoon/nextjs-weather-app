import React from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
//ESLint규칙을 위한 수정
type Props = object;

export default function Navbar({}: Props) {
  return (
    // 상단 네비게이션 바: 그림자 효과, 상단 고정, 흰색 배경
    <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
      {/* 
        네비게이션 바 컨테이너:
        - h-[80px]: 높이 80px
        - w-full: 전체 너비 사용
        - flex, justify-between, items-center: 플렉스박스로 내용물 양끝 정렬 및 수직 중앙 정렬
        - max-w-7xl: 최대 너비 제한
        - px-3: 좌우 패딩
        - mx-auto: 가운데 정렬
      */}
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        {/* 
          제목 컨테이너:
          - flex: 플렉스박스 사용
          - items-center: 수직 중앙 정렬
          - justify-center: 수평 중앙 정렬
          - gap-2: 요소들 사이 간격
        */}
        <p className="flex items-center justify-center gap-2">
          {/* 
            제목 텍스트:
            - text-gray-500: 회색 텍스트
            - text-3xl: 큰 글씨 크기
          */}
          <h2 className="text-gray-500 text-3xl">天気予報</h2>
          {/*해모양 아이콘 텍스트 크기 margin-top  */}
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </p>
        {/*현재위치, 위치, 검색상자 섹션  */}
        <section className="flex gap-2 items-center">
          <MdMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <MdOutlineLocationOn className="text-3xl" />
          <p className="text-slate-900/80 text-sm">Seoul</p>
          <div >
            <SearchBox value={""} onChange={undefined} onSubmit={undefined} />
          </div>
        </section>
      </div>
    </nav>
  );
}
