//client component
"use client";
import Container from "@/components/Container";
// 메인 페이지 컴포넌트
import Navbar from "@/components/Navbar"; // 네비게이션 바 컴포넌트 임포트
import { convertTemp } from "@/utils/convertTemp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
// import Image from "next/image";

// https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=c9f84443cfcfa927cc155002a2cdb685&cnt=2
// API 날씨 데이터를 기반으로 만든 interface

interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: City;
}

interface WeatherData {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coordinates {
  lat: number;
  lon: number;
}

export default function Home() {
  //ReactQuery를 사용한 API 호출 확인 함수
  //<WeatherData> 타입지정
  // useQuery는 WeatherResponse 제네릭
  // data.main, data.weather 등의 속성에 안전하게 접근 가능
  const { isPending, error, data } = useQuery<WeatherResponse>({
    queryKey: ["repoData"],
    queryFn: async () => {
      // Axios get으로 API를 가져옴
      const { data } = await axios.get(
        //${}를 위한 ``
        `https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=${process.env.NEXT_PUBLIC_WHATHER_APP}&cnt=40`
      );
      //API 데이터 return
      return data;
    },
  });
  // fetch 대신 axios를 사용
  // fetch(
  //   "https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=c9f84443cfcfa927cc155002a2cdb685&cnt=2"
  // ).then((res) => res.json()),

  //API로 가져오는 WeatherResponse의 첫번째 WeatherData 리스트
  const firstData = data?.list[0];

  console.log("WeatherResponse", data);

  //API를 가져오는 로딩시에 함수
  if (isPending)
    return (
      //element를 가운데 위치시키기
      <div className="flex items-center min-h-screen justify-center">
        {/* 로딩 문자 */}
        {/* ESLint 규칙으로인한 {} */}
        <p className="animate-bounce text-5xl">{"Loading..."}</p>
      </div>
    );
  //API가 에러가 났을 경우
  if (error)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="text-red-400">{error.message}</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
      {/* 
      메인 컨테이너:
      - flex flex-col: 세로 방향 플렉스박스 레이아웃
      - gap-4: 자식 요소들 사이 1rem(16px) 간격
      - bg-gray-100: 연한 회색 배경
      - min-h-screen: 최소 높이를 화면 전체 높이로 설정
    */}
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today weather data */}
        <section className="space-y-4">
          {/* 요일, 날짜 컨테이너 */}
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              {/* data-fns를 사용한 요일 포맷팅 dt_txt값이 null, undified일경우 빈문자열을 전달*/}
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "iiii")}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ""), "yyyy-MM-dd")})
              </p>
            </h2>
          </div>
          {/* 온도 표시 컨테이너 */}
          {/* 추가 className 전달 */}
          <Container className="gap-10 px-6 items-center">
            {/* 온도 element */}
            <div className=" flex flex-col px-4">
              {/* 현재온도 */}
              <span className="text-5xl">
                {convertTemp(firstData?.main.temp ?? 285.75)}°
              </span>
              {/* 체감온도 */}
              <p className="text-xs space-x-1 whitespace-nowrap">
                <span>体感温度</span>
                <span>
                  {/* 체감온도 기본값 0 */}
                  {convertTemp(firstData?.main.feels_like ?? 0)}°
                </span>
              </p>
              <p className="text-xs space-x-2">
                <span>
                  {convertTemp(firstData?.main.temp_min ?? 0)}
                  °↓{" "}
                </span>
                <span>
                  {/* 공백추가 */} {convertTemp(firstData?.main.temp_max ?? 0)}
                  °↑
                </span>
              </p>
            </div>
            {/* 시간과 날씨 아이콘 */}
            {/* 
              flex: Flexbox 레이아웃 적용
              gap-10: 아이템 간 2.5rem 간격
              sm:gap-16: 작은 화면에서 4rem 간격으로 변경
              overflow-x-auto: 가로 스크롤 가능
              w-full: 전체 너비 사용
              justify-between: 아이템들을 균등하게 분산
              pr-3: 오른쪽 패딩 0.75rem
              */}
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {/* API data의 시간별 날씨정보 list를 나열 */}
              {/* API데이터는 {}로 감싸서 사용 */}
              {data?.list.map((data, index) => (
                // 날씨정보 list의 index를 하나씩 나열
                <div
                  key={index}
                  className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                >
                  {/* 줄바꿈 방지, ISO 시간 문자열을 'h:mm a' 형식으로 변환 */}
                  <p className="whitespace-nowrap">
                    {format(parseISO(data.dt_txt), "h:mm a")}
                  </p>
                  <p>
                  {convertTemp(data?.main.temp ?? 0)}°
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
        {/* 7days weather data */}
        <section></section>
      </main>
    </div>
  );
}
