import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";

/**
 * 화면 바인딩 :
 * 변수의 값이 바뀌면, 화면도 자동갱신 되는개념
 */
function App() {
  // 일반 변수선언 방법. 화면 바인딩이 안됨. 하지만 메모리 연산은 잘됨
  let text2 = "쓰레기값";
  let time2: any;
  /**
   * 화면 바인딩 변수&조작기 선언방법
   * 변수 이름은 text, 변수 조작함수는 setText(), useState 이라는 리엑트
   * 내장 함수를 통해서 선언 해줘야함.
   * 타입은 string, 초기값은 "쓰레기값"
   */
  const [text, setText] = useState<string>("쓰레기값");
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e?.target?.value ?? "");
  };
  /*
  react 화면이 보여지면, 무조건 실행.
   */
  useEffect(() => {
    // 본문
    // setInterval : 1초에 한번씩 실행되는 forloop
    const timer = setInterval(() => {
      // 1초에 한번씩 시간 갱신 시킴
      setTime(new Date().toLocaleTimeString());
      time2 = new Date().toLocaleTimeString();
    }, 1000);
    return () => clearInterval(timer);
    // 본문 끝
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>화면 바인딩 :{time}</div>
        <div>그냥 변수 :{time2}</div>
        /* input box에 text 에 있는 값 보여주고, 타이핑 이벤트가 발생하면,
        handleChange 함수를 갔다 써라. */
        <input type="text" value={text} onChange={handleChange} />
        /* text 는 화면 바인딩이 된 변수. text 값이 바뀌면, 바로바로 갱신이 되서
        출력 */
        <div>당신이 입력한 값:{text}</div>
      </header>
    </div>
  );
}

export default App;
