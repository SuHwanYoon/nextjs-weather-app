import { cn } from "@/utils/cn";
import React from "react";

//부모컴포넌트에서 전달한 속성을 받는 자식 컴포넌트
// HTML div 요소에서 사용할 수 있는 모든 표준 속성들을 포함하는 타입을 파라미터로 받는다
export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
    //   부모함수에서 전달된 props.className 요소가 우선 적용
      className={cn(
        "w-full bg-white border rounded-xl flex py-4 shadow-sm",
        props.className
      )}
    />
  );
}
