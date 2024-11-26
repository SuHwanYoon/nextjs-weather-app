/** @format */

//화씨 number를 섭씨로 바꿔주는 함수
export function convertTemp(apiTemp: number): number {
    const convertedTemp = apiTemp - 273.15;
    //소수점 지우기
    return Math.floor(convertedTemp); 
  }