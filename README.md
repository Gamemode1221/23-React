# 202030236 최용호

## React 강의 전용 Repository

---

### 강의 목록

###### ※ 본 강의 목록은 *내림차순*으로 정렬되어있음.

1. [12주차](#12주차)
2. [11주차](#11주차)
3. [10주차](#10주차)
4. [9주차](#9주차)
5. [7주차](#7주차)
6. [6주차](#6주차)
7. [5주차](#5주차)
8. [4주차](#4주차)
9. [3주차](#3주차)
10. [2주차](#2주차)
11. [1주차](#1주차)

---

## 12주차

### 2023.05.18 목요일

### 강의

##### 합성에 대해 알아보기

- 합성(Conposition)은 '여러 개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 것'.
- 조합 방법에 따라 합성의 사용 기법은 다음과 같이 나눌 수 있음.

##### 1. Containment (담다, 포함하다, 격리하다)

- 특정 컴포넌트가 하위 컴포넌트를 포함하는 형태의 합성 방법.
- 컴포넌트에 따라서는 어떤 자식 엘리먼트가 들어올 지 미리 예상할 수 없는 경우가 있음.
- 범용적인 '박스'역할을 하는 Sidebar 혹은 Dialog와 같은 컴포넌트에서 특히 자주 볼 수 있음.
- 이런 컴포넌트에서는 children prop을 사용하여 자식 엘리먼트를 출력에 그대로 전달하는 것이 좋음.
- 이때 children prop은 컴포넌트의 props에 기본적으로 들어있는 children 속성을 사용함.
- 다음과 같이 props.children을 사용하면 해당 컴포넌트의 하위 컴포넌트가 모두 children으로 들어오게 됨.

```jsx
function FancyBorder(props) {
  return (
    <div className={"FancyBorder Fancyborder-" + props.color}>
      {props.children}
    </div>
  );
}
```

- children은 다음 구조에서 세 번째 들어가는 파라미터임.
- 파라미터가 배열로 되어있는 이유는 여러 개의 하위 컴포넌트를 가질 수 있기 때문.
- children이 배열로 되어있는 것은 여러 개의 하위 컴포넌트를 위한 것.

```jsx
React.createElement(type, [props], [...children]);
```

##### React.createElement()에 관하여

- 교재 150page에서 설명한 것과 같이 jsx를 사용하지 않는 경우의 props 전달 방법임.
- 정확히 말하면 JSX를 사용하지 않고 리액트로 엘리먼트를 생성하는 방법임.

```jsx
// JSX를 이용한 간단한 방법
const jsxElement = <h1 className="jsx">JSX Element</h1>;
```

```jsx
// 리액트 기능을 사용한 방법
const reactElement = React.createElement(
  "h1", // tag
  { className: "obj" }, // props
  "OBJ Element" // child element
);
```

- FancyBorder 컴포넌트를 사용하는 예제.
- WelcomeDialog 컴포넌트는 FancyBorder 컴포넌트를 사용하고, FancyBorder 컴포넌트는 \<h1>과 \<p> 두 개의 태그를 children이 props로 전달됨.

```jsx
function WelcomeDialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">어서오세요</h1>
      <p className="Dialog-message">우리 사이트에 방문하신 것을 환영합니다!</p>
    </FancyBorder>
  );
}
```

- 리액트에서는 props.chilren을 통해 하위 컴포넌트를 하나로 모아서 제공해 줌.
- 만일 여러 개의 children 집합이 필요할 경우는 별도로 props를 정의해서 각각 원하는 컴포넌트를 넣어줌.
- 예와 같이 SplitPane은 화면을 왼쪽과 오른쪽으로 분할해 주고, App에서는 SplitPane을 사용해서 left, right 두 개의 props를 정의하고 있음.
- 즉, App에서 left, right를 props를 받아서 화면을 분할하게 됨. 이처럼 여러 개의 children 집합이 필요한 경우 별도의 props를 정의해서 사용함.

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="Split-right">{props.right}</div>
    </div>
  );
}
```

```jsx
function App(props) {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
}
```

##### 2. Specialization (특수화, 전문화)

- 웰컴다이얼로그는 다이얼로그의 특별한 케이스임.
- 범용적인 개념을 구별이 되게 구체화 하는 것을 특수화라고 함.
- 객체지향 언어에서는 상속을 사용하여 특수화를 구현함.
- 리액트에서는 합성을 사용하여 특수화를 구현함.
- 다음 예와 같이 특수화는 범용적으로 쓸 수 있는 컴포넌트를 만들어 놓고 이를 특수한 목적으로 사용하는 합성 방식임.

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
    </FancyBorder>
  );
}

function WelcomeDialog(props) {
  return (
    <Dialog
      title="어서 오세요"
      message="우리 사이트에 방문하신 것을 환영합니다!"
    />
  );
}
```

###### 3. Containment와 Specialization을 같이 사용하기

- Containment를 위해서 props.children을 사용하고, Specialization을 위해 직접 정의한 props를 사용하면 됨.
- 366page의 코드를 참고함.
- Dialog 컴포넌트는 이전의 것과 비슷한데 Containment를 위해 끝부분에 props.children을 추가함.
- Dialog를 사용하는 SignUpDialog는 Specialization을 위해 props인 title, message에 값을 넣어주고 있고, 입력을 받기 위해 \<input>과 \<button>을 사용함. 이 두 개의 태그는 모두 props.children으로 전달되어 다이얼로그에 표시됨.
- 이러한 형태로 Containment와 Specialization을 동시에 사용할 수 있음.

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}

function SignUpDialog(props) {
  const [nickname, setNickname] = useState("");

  const handleChange = (event) => {
    setNickname(event.target.value);
  };

  const handleSignUp = () => {
    alert(`어서 오세요. ${nickname}님!`);
  };

  return (
    <Dialog title="화성 탐사 프로그램" message="닉네임을 입력해 주세요.">
      <input value={nickname} onChange={handleChange} />
      <button onClick={handleSignUp}>가입하기</button>
    </Dialog>
  );
}
```

##### 상속에 대해 알아보기

- 합성과 대비되는 개념으로 상속(inheritance)이 있음.
- 자식 클래스는 부모 클래스가 가진 변수나 함수 등의 속성을 모두 갖게 되는 개념임.
- 하지만 리액트에서는 상속보다는 합성을 통해 새로운 컴포넌트를 생성함.

※ 복잡한 컴포넌트를 쪼개 여러 개의 컴포넌트로 만들고, 만든 컴포넌틑들을 조합하여 새로운 컴포넌트를 만들 것.

##### 컨텍스트란?

- 기존의 일반적인 리액트에서는 데이터가 컴포넌트의 props를 통해 부모에서 자식으로 단방향으로 전달되었음.
- 컨텍스트는 리액트 컴포넌트들 사이에서 데이터를 기존의 props를 통해 전달하는 방식 대신 '컴포넌트 트리를 통해 곧바로 컴포넌트에 전달하는 새로운 방식'을 제공함.
- 이 것을 통해 어떤 컴포넌트라도 쉽게 데이터에 접근할 수 있음.
- 컨텍스트를 사용하면 일일히 props로 전달할 필요 없이 그림처럼 데이터를 필요로 하는 컴포넌트에 곧바로 데이터를 전달할 수 있음.

##### 언제 컨텍스트를 사용해야할까?

- 여러 컴포넌트에서 자주 필요로 하는 데이터는 로그인 여부, 로그인 정보, UI 테마, 현재 선택된 언어 등이 있음.
- 이런 데이터들을 기존의 방식대로 컴포넌트의 props를 통해 넘겨주는 예를 382page에서 보여주고 있음.
- 예제에서 처럼 props를 통해 데이터를 전달하는 기존 방식은 실제 데이터를 필요로 하는 컴포넌트까지의 깊이가 깊어질수록 복잡해짐.
- 또한 반복적인 코드를 계속해서 작성해 주어야 하기 때문에 비효율적이고 가독성이 떨어짐.
- 컨텍스트를 사용하면 이러한 방식을 깔끔하게 개선할 수 있음.
- 383page의 예제는 컨텍스트를 사용한 예.
- React.createContext()함수를 사용해서 ThemeContext라는 이름의 컨텍스트를 생성함.
- 컨텍스트를 사용하려면 컴포넌트의 상위 컴포넌트에서 Provider로 감싸주어야 함.

```jsx
function App(props) {
  return <Toolbar theme="dark" />;
}

function Toolbar(props) {
  // 이 Toolbar 컴포넌트는 ThemeButton에 theme를 넘겨주기 위해서 'theme' prop을 가져야만 함.
  // 현재 테마를 알아야 하는 모든 버튼에 대해서 props로 전달하는 것은 굉장이 비효율 적임.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

function ThemedButton(props) {
  return <Button theme={props.theme} />;
}
```

- 예제에서는 최상위 컴포넌트인 App 컴포넌트에서 Toolbar를 ThemeContext.Provider로 감싸줌.
- 이렇게 하면 Provider로 감싼 하귀 컴포넌트가 얼마나 깊이 위치해 있는지에 관계없이 컨텍스트의 데이터를 읽을 수 있음.

```jsx
// 컨텍스트는 데이터를 매번 컴포넌트를 통해 전달할 필요 없이 컴포넌트 트리로 곧바로 전달하게 해줌.
// 여기에서는 현재 테마를 위한 컨텍스트를 생성하며, 기본값은 'light'임.
const ThemeContext = React.createContext("light");

// Provider를 사용하여 하위 컴포넌트들에게 현재 테마 데이터를 전달함.
// 모든 하위 컴포넌트들은 컴포넌트 트리 하단에 얼마나 깊이 있는지에 관계없이 데이터를 읽을 수 있음.
// 여기에서는 현재 테마값으로 'dark'를 전달하고 있음.
function App(props) {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 이제 중간에 위치한 컴포넌트는 테마 데이터를 하위 컴포넌트로 전달할 필요가 없음.
function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}

function ThemedButton(props) {
  // 리액트는 가장 가까운 상위 테마 Provider를 찾아서 해당되는 값을 사용함.
  // 만약 해당되는 Provider가 없을 경우 기본값(여기에서는 'light')을 사용함.
  // 여기에서는 상위 Provider가 있기 때문에 현재 테마의 값은 'dark'가 됨.
  return (
    <ThemeContext.Consumer>
      {(value) => <Button theme={value} />}
    </ThemeContext.Consumer>
  );
}
```

##### 컨텍스트를 사용하기 전에 고려할 점

- 컨텍스트는 다른 레벨의 많은 컴포넌트가 특정 데이터를 필요로 하는 경우에 주로 사용함.
- 하지만 무조건 컨텍스트를 사용하는 것이 좋은 것은 아님.
- 왜냐하면 컴포넌트와 컨텍스트가 연동되면 재사용성이 떨어지기 때문.
- 따라서 다른 레벨의 많은 컴포넌트가 에디터를 필요로 하는 경우가 아니면 props를 통해 데이터를 전달하는 컴포넌트 합성 방법이 더 적합함.

```jsx
// Page 컴포넌트는 PageLayout 컴포넌트를 렌더링
<Page user={user} avatarSize={avatarSize} />

// PageLayout 컴포넌트는 NavigationBar 컴포넌트를 렌더링
<PageLayout user={user} avatarSize={avatarSize} />

// NavigationBar 컴포넌트는 Link 컴포넌트를 렌더링
<NavigationBar user={user} avatarSize={avatarSize} />

// Link 컴포넌트는 Avatar 컴포넌트를 렌더링
<Link href={user.permalink}>
    <Avatar user={user} size={avatarSize} />
</Link>
```

- 385page의 예제처럼 실제 user와 avatarSize를 사용하는 것은 Avatar 컴포넌트 뿐인데 여러 단계에 걸쳐 props를 전달하고 있음.
- 이런 경우 컨텍스트를 사용하지 않고 문제를 해결할 수 있는 방법은 Avatar 컴포넌트를 변수에 저장하여 직접 넘겨주는 것임. (9장 참고)
- 이렇게 하면 중간 단계의 컴포넌트들은 user와 avatarSize에 대해 몰라도 됨.
- 386page의 예제를 참고할 것.

```jsx
function Page(props) {
  const user = props.user;

  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );

  // Page 컴포넌트는 PageLayout 컴포넌트를 렌더링
  // 이때 props로 userLink를 함께 전달함.
  return <PageLayout userLink={userLink} />;
}

// PageLayout 컴포넌트는 NavigationBar 컴포넌트를 렌더링
<PageLayout userLink={...} />

// NavigatoinBar 컴포넌트는 props로 전달받은 userLink element를 리턴
<NavigationBar userLink={...} />
```

- 하지만 386page의 예제가 모든 상황에서 좋은 것은 아님.
- 데이터가 많아질수록 상위 컴포넌트가 점점 더 복잡해지기 때문.
- 이런 경우 하위 컴포넌트를 여러 개의 변수로 나눠서 전달하면 됨.
- 387page의 예제를 참고할 것.

```jsx
function Page(props) {
  const user = props.user;

  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );

  const content = <Feed user={user} />;

  return <PageLayout topBar={topBar} content={content} />;
}
```

- 하지만 어떤 경우에는 하나의 데이터에 다양한 레벨에 있는 중첩된 컴포넌트들의 접근이 필요할 수 있음.
- 이런 경우라면 컨텍스트가 유리함.
- 컨텍스트는 해당 데이터와 데이터의 변경사항을 모두 하위 컴포넌트들에게 broadcast해주기 때문.
- 컨텍스트를 사용하기에 적합한 데이터의 대표적인 예로는 '지역 정보', 'UI테마' 그리고 '캐싱된 데이터' 등이 있음.

##### 컨텍스트 API

##### 1. React.createContext

- 컨텍스트를 생성하기 위한 함수임.
- 파라미터에는 기본값을 넣어주면 됨.
- 하위 컨포넌트는 가장 가까운 상위 레벨의 Provider로부터 컨텍스트를 받게 되지만, 만일 Provider를 찾을 수 없다면 위에서 설정한 기본값은 사용하게 됨.

```jsx
const MyContext = React.createContext(기본값);
```

##### 2. Context.Provider

- Context.Provider 컴포넌트로 하위 컴포넌트들을 감싸주면 모든 하위 컴포넌트들이 해당 컨텍스트의 데이터에 접근할 수 있게 됨.

```jsx
<MyContext.Provider value={/* some value */}>
```

- Provider 컴포넌트에는 value라는 prop이 있고, 이것은 Provider 컴포넌트 하위에 있는 컴포넌트에게 전달됨.
- 하위 컴포넌트를 consumer 컴포넌트라고 부름.

※ Note. Provider value에서 주의해야 할 사항 참고.

- 컨텍스트는 재렌더링 여부를 결정할 때 레퍼런스 정보를 사용하기 때문에 Provider의 부모 컴포넌트가 재렌더링 되었을 경우, 의도치 않게 consumer 컴포넌트의 재렌더링이 일어날 수 있음.
- 예를 들어 아래 코드는 Provider 컴포넌트가 재렌더링 될 때 마다 모든 하위 consumer 컴포넌트의 재렌더링이 발생함.
- 왜냐하면, value prop을 위한 새로운 객체가 매번 새롭게 생성되기 때문.

```jsx
function App(props) {
  return (
    <MyContext.Provider value={{ something: "something" }}>
      <Toolbar />
    </MyContext.Provider>
  );
}
```

이를 방지하기 위해서는 value를 직접 넣는 것이 아니라 컴포넌트의 state로 옮기고 해당 state의 값을 넣어 주어야함.
아래 코드는 수정한 이후의 모습임.

```jsx
funtion App(props) {
    const [value, setValue] = useState({ something: 'something' });

    return (
        <MyContext.Provider value={value}>
          <Toolbar />
        </MyContext.Provider>
    );
}
```

##### 3. Class.contextType

- Provider 하위에 있는 클래스 컴포넌트에서 컨텍스트의 데이터에 접근하기 위해 사용함.
- Class 컴포넌트는 더 이상 사용하지 않으므로 참고만 함.

##### 4. Context.Consumer

- 함수형 컴포넌트에서 Context.Consumer를 사용하여 컨텍스트를 구독할 수 있음.

```jsx
<MyContext.Consumer>
  {value => /* 컨텍스트의 값에 따라서 컴포넌트들을 렌더링 */}
</MyContext.Consumer>
```

- 컴포넌트의 자식으로 함수가 올 수 있는데, 이것을 'function as a child'라고 부름.
- Context.Consumer로 감싸주면 자식으로 들어간 함수가 현재 컨텍스트의 value를 받아서 리액트 노드로 리턴함.
- 함수로 전달되는 value는 Provider의 value prop과 동일함.

##### 5. Context.displayName

- 컨텍스트 객체는 displayName이라는 문자열 속성을 가짐.
- 크롬의 리액트 개발자 도구에서는 컨텍스트의 Provider나 Consumer를 표시할 때 displayName을 함께 표시해줌.

```jsx
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

// 개발자 도구에 "MyDisplayName.Provider"로 표시됨
<MyContext.Provider>

// 개발자 도구에 "MyDisplayName.Consumer"로 표시됨
<MyContext.Consumer>
```

### 실습

#### Card 컴포넌트

```jsx
function Card(props) {
  const { title, backgroundColor, children } = props;

  return (
    <div
      style={{
        margin: 8,
        padding: 8,
        borderRadius: 8,
        boxShadow: "0px 0px 4px grey",
        backgroundColor: backgroundColor || "white",
      }}
    >
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}

export default Card;
```

#### ProfileCard

```jsx
import Card from "./Card";

function ProfileCard(props) {
  return (
    <Card title="Inje Lee" backgroundColor="#4ea04e">
      <p>안녕하세요, 소플입니다.</p>
      <p>저는 리액트를 사용해서 개발하고 있습니다.</p>
    </Card>
  );
}

export default ProfileCard;
```

---

## 11주차

### 2023.05.11 목요일

### 강의

### 실습

#### TemperatureInput

```jsx
const scaleNames = {
  c: "섭씨",
  f: "화씨",
};

function TemperatureInput(props) {
  const handleChange = (event) => {
    props.onTemperatureChange(event.target.value);
  };

  return (
    <fieldset>
      <legend>온도를 입력해주세요(단위 : {scaleNames[props.scale]}) :</legend>
      <input value={props.temperature} onChange={handleChange} />
    </fieldset>
  );
}

export default TemperatureInput;
```

#### Calculator

```jsx
import React, { useState } from "react";
import TemperatureInput from "./TemperatureInput";

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>물이 끓습니다.</p>;
  }

  return <p>물이 끓지 않습니다.</p>;
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);

  if (Number.isNaN(input)) {
    return "";
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;

  return rounded.toString();
}

function Calculator(props) {
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  const handleCelsiusChange = (temperature) => {
    setTemperature(temperature);
    setScale("c");
  };

  const handleFahrenheitChange = (temperature) => {
    setTemperature(temperature);
    setScale("f");
  };

  const celsius =
    scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit =
    scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureInput={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
}

export default Calculator;
```

---

## 10주차

### 2023.05.04 목요일

### 강의

##### 리스트와 키란 무엇인가?

- 리스트는 자바스크립트의 변수나 객체를 하나의 변수로 묶어 놓은 배열과 같은 것.
- 키는 각 객체나 아이템을 구분할 수 있는 고유한 값을 의미함.
- 리액트에서는 배열과 키를 사용하는 반복되는 다수의 엘리먼트를 쉽게 렌더링 할 수 있음.

##### 여러 개의 컴포넌트 렌더링하기

> ┌───┬───┬───┬───┐  
> │&nbsp;&nbsp; A &nbsp;&nbsp;│&nbsp;&nbsp; A &nbsp;&nbsp;│&nbsp;&nbsp; A &nbsp;&nbsp;│&nbsp;&nbsp; A &nbsp;&nbsp;│  
> └───┴───┴───┴───┘  
> ┌───────┬───────┐  
> │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│  
> └───────┴───────┘

- 위처럼 같은 컴포넌트를 화면에 반복적으로 나타내야 할 경우 배열에 들어있는 엘리먼트를 map() 함수를 이용하여 렌더링함.
- 다음은 numbers 배열이 들어있는 각각의 요소를 map()을 이용하여 하나씩 추출하여, 2를 곱한 후 doubled라는 배열에 다시 넣는 코드.

```jsx
const doubled = numbers.map((number) => number * 2);
```

- 다음은 리액트에서 map() 함수를 사용한 예제.

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);
```

- 이 코드는 numbers의 요소에 2를 곱하는 대신 \<li> 태그를 결합해서 리턴함.
- 리턴된 listItems는 \<ul> 태그와 결합하여 렌더링 됨.
  > - 1
  > - 2
  > - 3
  > - 4
  > - 5

```jsx
ReactDom.render(
  <ul>
    <li>{1}</li>
    <li>{2}</li>
    <li>{3}</li>
    <li>{4}</li>
    <li>{5}</li>
  </ul>,
  document.getElementById("root")
);
```

- 앞서 작성한 코드를 별도의 컴포넌트로 분리하면 다음과 같음.
- 이 컴포넌트는 props로 받은 숫자를 numbers로 받아 리스트로 렌더링 해줌.

```jsx
function NumberList(props) {
  const { numbers } = props;

  const listItems = numbers.map((number) => <li>{number}</li>);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

- 이 코드를 실행하면 "리스트 아이템에 무조건 키가 있어야 한다"는 경고 문구가 나옴.
- 경고 문구가 나오는 이유는 각각의 아이템에 key props가 없기 때문.

##### 리스트의 키에 대해 알아보기

- 리스트에서의 키는 "리스트에서 아이템을 구별하기 위한 고유한 문자열"임.
- 이 키는 리스트에서 어떤 아이템이 변경, 추가 또는 제거되었는지 구분하기 위해 사용함.
- 키는 같은 리스트에 있는 엘리먼트 사이에서만 고유한 값이면 됨.

##### 폼이란 무엇인가?

- 폼은 일반적으로 사용자로부터 입력을 받기위한 양식에서 많이 사용됨.

```html
<form>
  <label>
    이름 :
    <input type="text" name="name" />
  </label>
  <button type="submit">제출</button>
</form>
```

##### 제어 컴포넌트

- 제어 컴포넌트는 사용자가 입력한 값에 접근하고 제어할 수 있도록 해주는 컴포넌트임.
- 다음 코드는 사용자의 이름을 입력 받는 HTML폼을 리액트 제어 컴포넌트로 만든 것.

```jsx
function NameForm(props) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    alert("입력한 이름 : " + value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름 :
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <button type="submit">제출</button>
    </form>
  );
}
```

##### textarea 태그

- HTML에서는 \<textarea>의 children으로 텍스트가 들어가는 형태임.

```html
<textarea>
  
    안녕하세요, 여기에 이렇게 텍스트가 들어가게 됩니다.  
</textarea>
```

- 리액트에서는 state를 통해 태그의 value라는 attribute를 변경하여 텍스트를 표시함.

```jsx
function RequestForm(props) {
  const [value, setValue] = useState("요청사항을 입력하세요.");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    alert("입력한 요청사항 : " + value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        요청사항 :
        <textarea value={value} onChange={handleChange} />
      </label>
      <button type="submit">제출</button>
    </form>
  );
}
```

##### select 태그

- Select 태그로 textarea와 동일함.

```html
<select>
  <option value="apple">사과</option>
  <option value="banaba">바나나</option>
  <option selected value="grape">포도</option>
  <option value="watermelon">수박</option>
</select>
```

```jsx
function FruitSelect(props) {
  const [value, setValue] = useState("grape");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    alert("선택한 과일 : " + value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        과일을 선택하세요 :
        <select value={value} onChange={handleChange}>
          <option value="apple">사과</option>
          <option value="banana">바나나</option>
          <option value="grape">포도</option>
          <option value="watermelon">수박</option>
        </select>
      </label>
      <button type="submit">제출</button>
    </form>
  );
}
```

##### File input 태그

- File input 태그는 그 값이 읽기 전용이기 때문에 리액트에서는 비제어 컴포넌트가 됨.

```html
<input type="file" />
```

##### 여러 개의 입력 다루기

- File input 태그는 그 값이 읽기 전용이기 때문에 리액트에서는 비제어 컴포넌트가 됨.

```jsx
function Reservation(props) {
  const [haveBreakfast, setHaveBreakfast] = useState(true);
  const [numberOfGuest, setNumberOfGuest] = useState(2);

  const handleSubmit = (event) => {
    alert(`아침식사 여부 : ${haveBreakfast}, 방문객 수 : ${numberOfGuest}`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        아침식사 여부 :
        <input
          type="checkbox"
          checked={haveBreakfast}
          onChange={(event) => {
            setHaveBreakfast(event.target.checked);
          }}
        />
      </label>
      <br />
      <label>
        방문객 수 :
        <input
          type="number"
          value={numberOfGuest}
          onChange={(event) => {
            setNumberOfGuest(event.target.value);
          }}
        />
      </label>
      <button type="submit">제출</button>
    </form>
  );
}
```

##### Input Null Value

- 제어 컴포넌트에 value prop을 정해진 값으로 넣으면 코드를 수정하지 않는 한 입력값을 바꿀 수 없음.
- 만약 value prop은 넣되 자유롭게 입력할 수 있게 만들고 싶다면 값이 undefined 또는 null을 넣어주면 됨.

```jsx
ReactDOM.render(<input value="hi" />, rootNode);

setTimeout(function () {
  ReactDOM.render(<input value={null} />, rootNode);
}, 1000);
```

##### Shared State

- shared state는 말 그대로 공유된 state를 의미함.
- 자식 컴포넌트들이 가장 가까운 공통된 부모 컴포넌트의 state를 공유해서 사용함.
- shared state는 어떤 컴포넌트의 state에 있는 데이터를 여러 개의 하위 컴포넌트에서 공통적으로 사용하는 경우.
  > 세 개의 컴포넌트 중 A컴포넌트{value: 2}가 부모 컴포넌트고 AA컴포넌트{value: 4}와 AB컴포넌트{value: 6}가 자식 컴포넌트일 때, 부모 컴포넌트는 값을 가지고 있다.  
  > AA컴포넌트는 값에 2를 곱해서 표시하는 컴포넌트고 AB컴포넌트는 값에 3을 곱해서 표시하는 컴포넌트다.  
  > 이러한 경우에 자식 컴포넌트들이 각각 값을 갖고 있을 필요는 없다.  
  > 부모 컴포넌트의 state에 있는 값에 각각 2와 3을 곱해서 표시해 주면 되기 때문이다.

물의 끓을 여부를 알려주는 컴포넌트

```jsx
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>물이 끓습니다.</p>;
  }

  return <p>물이 끓지 않습니다.</p>;
}
```

```jsx
function Calculator(props) {
  const [temperature, setTemperature] = useState("");

  const handleChange = (event) => {
    setTemperature(event.target.value);
  };

  return (
    <fieldset>
      <legend>섭씨 온도를 입력하세요</legend>
      <input value={temperature} onChange={handleChange} />
      <BoilingVerdict celsius={parseFloat(temperature)} />
    </fieldset>
  );
}
```

```jsx
const scaleNames = {
  c: "섭씨",
  f: "화씨",
};

function TemperatureInput(props) {
  const [temperature, setTemperature] = useState("");

  const handleChange = (event) => {
    setTemperature(event.target.value);
  };

  return (
    <fieldset>
      <legend>온도를 입력해 주세요(단위 : {scaleNames[props.scale]}) : </legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  );
}
```

```jsx
function Calculator(props) {
  return (
    <div>
      <TemperatureInput scale="c" />
      <TemperatureInput scale="f" />
    </div>
  );
}
```

온도 변환

```jsx
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);

  if (Number.isNaN(input)) {
    return "";
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;

  return rounded.toString();
}
```

##### Shared State 적용하기

- 하위 컴포넌트의 state를 공통된 부모 컴포넌트로 올려서 shared state를 적용해야 함.
- state를 상위 컴포넌트로 올린다는 것을 State 끌어올리기(Lifting State Up)라고 표현함.

```jsx
return (
    ...
        // 변경 전 : <input value={temperature} onChange={handleChange} />
        <input value={props.temperature} onChange={handleChange} />
    ...
);
```

### 실습

#### AttendanceBook

```jsx
import React from "react";

const students = [
  {
    id: 1,
    name: "Inje",
  },
  {
    id: 2,
    name: "Steve",
  },
  {
    id: 3,
    name: "Bill",
  },
  {
    id: 4,
    name: "Jeff",
  },
];

function AttendanceBook(props) {
  return (
    <ul>
      {students.map((student) => {
        return <li key={student.id}>{student.name}</li>;
      })}
    </ul>
  );
}

export default AttendanceBook;
```

#### SignUp

```jsx
import React, { useState } from "react";

function SignUp(props) {
  const [name, setName] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    alert(`이름 : ${name}`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름 :
        <input type="text" value={name} onChange={handleChangeName} />
      </label>
      <button type="submit">제출</button>
    </form>
  );
}

export default SignUp;
```

---

## 9주차

### 2023.04.27 목요일

### 강의

##### 이벤트 처리하기

- DOM에서 클릭 이벤트를 처리하는 예제 코드

```js
<button onclick="activate()">Activate</button>
```

- React에서 클릭 이벤트를 처리하는 예제 코드

```jsx
<button onClick={activate}>Activate</button>
```

- 둘의 차이점
- 1. 이벤트 이름이 onclick에서 onClick으로 변경.(Camel Case)
- 2. 전달하려는 함수는 문자열에서 함수 그대로 전달.
- 이벤트가 발생했을 때 해당 이벤트를 처리하는 함수를 "이벤트 핸들러(Event Handler)"라고 함. 또는 이벤트가 발생하는 것을 계속 듣고 있다는 의미로 "이벤트 리스너(Event Listener)" 라고 부름.

##### 이벤트 핸들러를 추가하는 방법

- 버튼을 클릭하면 이벤트 핸들러 함수인 handleClick()함수를 호출하도록 되어 있음.
- bind를 사용하지 않으면 this.handleClick은 글로벌 스코프에서 호출되어, undefined로 사용할 수 없기 때문.
- bind를 사용하지 않으려면 화살표 함수를 사용하는 방법도 있음.
- 하지만 클래스 컴포넌트는 이제 거의 사용하지 않기 때문에 이 내용은 참고만 함.

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isToggleOn: true };

    // callback에서 `this`를 사용하기 위해서는 바인딩을 필수적으로 해줘야 함.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "켜짐" : "꺼짐"}
      </button>
    );
  }
}
```

- 클래스형을 함수형으로 바꾸면 다음 코드와 같음.
- 함수형에서 이벤트 핸들러를 정의하는 방법을 두 가지임.
- 함수형에서는 this를 사용하지 않고, onClick에서 바로 HandleClick을 넘기면 됨.

```jsx
function Toggle(props) {
  const [isToggleOn, setIsToggleOn] = useState(true);

  // 방법 1. 함수 안에 함수로 정의
  function handleClick() {
    setIsToggleOn((isToggleOn) => !isToggleOn);
  }

  // 방법 2. arrow function을 사용하여 정의
  const handleClick = () => {
    setIsToggleOn((isToggleOn) => !isToggleOn);
  };

  return <button onClick={handleClick}>{isToggleOn ? "켜짐" : "꺼짐"}</button>;
}
```

##### Arguments 전달하기

- 함수를 정의할 때에는 파라미터(Parameter) 혹은 매개변수, 함수를 사용할 때에는 아규먼트(Argument) 혹은 인자라고 부름.
- 이벤트 핸들러에 매개변수를 전달해야 하는 경우도 많음.

```jsx
<button onClick={(event) => this.deleteItem(id, event)}>삭제하기</button>
<button onClick={this.deleteItem.bind(this, id)}>삭제하기</button>
```

- 위의 코드는 모두 동일한 역할을 하지만 하나는 화살표 함수를, 다른 하나는 bind를 사용함.
- event라는 매개변수는 리액트의 이벤트 객체를 의미함.
- 두 방법 모두 첫 번째 매개변수는 id이고 두 번째 매개변수로 event가 전달됨.
- 첫 번째 코드를 명시적으로 event를 매개변수로 넣어 주었고, 두 번째 코드는 id 이후 두 번째 매개변수로 event가 자동 전달됨. (클래스형에서 사용하는 방법.)
- 함수형 컴포넌트에서 이벤트 핸들러에 매개변수를 전달할 때에는 254페이지 코드와 같이 함.

```jsx
function MyButton(props) {
  const handleDelete = (id, event) => {
    console.log(id, event.target);
  };

  return <button onClick={(event) => handleDelete(1, event)}>삭제하기</button>;
}
```

##### 조건부 렌더링이란?

- 여기서 조건이란 우리가 알고 있는 조건문의 조건.

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  if (isLoggedIn) {
    return <UserGreeting />;
  }

  return <GuestGreeting />;
}
```

- props로 전달 받은 isLoggedIn이 true이면 <UserGreeting />을, false면 <GuestGreeting />을 리턴함.
- 이와 같은 렌더링을 조건부 렌더링이라고 함.

##### 엘리먼트 변수

- 렌더링해야 될 컴포넌트를 변수처럼 사용하는 방법이 엘리먼트 변수임.
- 272페이지 코드처럼 state에 따라 button 변수에 컴포넌트의 객체를 저장하여 return문에 사용하고 있음.

```jsx
let button;
if (isLoggedIn) {
  button = <LogoutButton onClick={handleLogoutClick} />;
} else {
  button = <LogoutButton onClick={handleLoginClick} />;
}

return (
  <div>
    <Greeting isLoggedIn={isLoggedIn} />
    {button}
  </div>
);
```

##### 인라인 조건

- 필요한 곳에 조건문을 직접 넣어 사용하는 방법.

1. 인라인 if

- if문을 직접 사용하지 않고, 동일한 효과를 내기 위해 && 논리 연산자를 사용함.
- &&는 and연산자로 모든 조건이 참일 때만 참이 됨.
- 첫 번째 조건이 거짓이면 두 번째 조건은 판단할 필요가 없음. 단축평가.
  > true && expression -> expression  
  > false && expression -> false

```jsx
{
  unreadMessages.length > 0 && (
    <h2>현재 {unreadMessages.length}개의 읽지 않은 메시지가 있습니다.</h2>
  );
}
```

- 판단만 하지 않는 것이고 결과 값은 그래도 리턴됨.

2. 인라인 if-else

- 삼항 연산자를 사용함.
  > 조건문 ? 참일 경우 : 거짓일 경우
- 문자열이나 엘리먼트를 넣어서 사용할 수도 있음.

```jsx
function UserStatus(props) {
  return (
    <div>
      이 사용자는 현재 <b>{props.isLoggedIn ? "로그인" : "로그인하지 않은"}</b>{" "}
      상태입니다.
    </div>
  );
}
```

```jsx
<div>
  <Greeting isLoggedIn={isLoggedIn} />
  {isLoggedIn ? (
    <LogoutButton onClick={handleLogoutClick} />
  ) : (
    <LoginButton onClick={handleLoginClick} />
  )}
</div>
```

##### 컴포넌트 렌더링 막기

- 컴포넌트를 렌더링하고 싶지 않을 때에는 null을 리턴.

```jsx
function WarningBanner(props) {
  if (!props.warning) {
    return null;
  }

  return <div>경고!</div>;
}
```

### 실습

ConfirmButton, Toolbar, LandingPage

---

## 7주차

### 2023.04.13 목요일

### 강의

##### 훅이란?

- 클래스형 컴포넌트에서는 생성자(constructor)에서 state를 정의하고, setState() 함수를 통해 state를 업데이트함.
- 예전에 사용하던 함수형 컴포넌트는 별도로 state를 정의하거나, 컴포넌트의 생명주기에 맞춰서 어떤 코드가 실행되도록 할 수 없었음.
- 함수형 컴포넌트에서도 state나 생명주기 함수의 기능을 사용하게 해주기 위해 추가된 기능이 바로 훅(Hook).
- 함수형 컴포넌트도 훅을 사용하여 클래스형 컴포넌트위 기능을 모두 동일하게 구현할 수 있게 됨.
- Hook이란 'state와 생명주기 기능에 갈고리를 걸어 원하는 시점에 정해진 함수를 실행되도록 만든 함수'.
- 훅의 이름은 모두 'use'로 시작함.
- 사용자 정의 훅(custom hook)을 만들 수 있으며, 컴포넌트 로직을 함수로 뽑아내어 재사용할 수 있음.

##### useState

- useState는 함수형 컴포넌트에서 state를 사용하기 위한 Hook.
- 다음 예제는 버튼을 클릭할 때마다 카운트가 증가하는 함수형 컴포넌트.
- 하지만 증가는 시킬 수 있지만, 증가할 때마다 재 렌더링은 일어나지 않음.
- 이럴 때 state를 사용해야 하지만, 함수형에는 없기 때문에 useState()를 사용함.
- useState() 함수의 사용법은 다음과 같음.
- 첫번째 항목은 state의 이름(변수명)이고, 두번째 항목은 state의 set함수이다. 즉 state를 업데이트 하는 함수.
- 함수를 호출할 때 state의 초기값을 설정.
- 함수의 리턴 값은 배열의 형태.

```jsx
import React from "react";

function Counter(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>총 {count}번 클릭했습니다.</p>
      <button onClick={() => setCount(count + 1)}>클릭</button>
    </div>
  );
}
```

##### useEffect

- useState와 함께 가장 많이 사용하는 Hook.
- 이 함수는 사이드 이펙트를 수행하기 위한 것.
- 영어로 side effect는 부작용을 의미. 일반적으로 프로그래밍에서 사이드 이펙트는 '개발자가 의도하지 않은 코드가 실행되면서 버그가 발행하는 것'.
- 하지만 리액트에서는 효과 혹은 영향을 뜻하는 effect의 의미에 가까움.
- 예를 들면 서버에서 데이터를 받아오거나 수동으로 DOm을 변경하는 등의 작업을 의미함.
- 이 작업을 이펙트라고 부르는 이유는 이 작업들이 다른 컴포넌트에 영향을 미칠 수 있으며, 렌더링 중에는 작업이 완료될 수 없기 때문. 렌더링이 끝난 이후에 실행되어야 하는 작업들.
- 클래스 컴포넌트의 생명주기 함수와 같은 기능을 하나로 통합한 기능을 제공함.
- 저자는 userEffect가 side effect가 아니라 effect에 가깝다고 설명하고 있지만, 이것은 부작용의 의미를 잘못 해석해서 생긴 오해이다.
- Side Effect는 副作用으로 '원래의 용도 혹은 목적의 효과 외에, 부수적으로 다른 효과가 있는 것을 뜻하는 것'.
- 결국 side effect는 렌더링 외에 실행해야 하는 부수적인 코드.
- 예를 들면 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 정리(clean-up)가 필요없는 경우들.
- useEffect() 함수는 다음과 같이 사용.
- 첫번째 파라미터는 이펙트 함수가 들어가고, 두번째 파라미터로는 의존성 배열이 들어감.
- 의존성 배열은 이펫트가 의존하고 있는 배열로, 배열 안에 있는 변수 중에 하나라도 값이 변경되었을 때 이펙트 함수가 실행됨.
- 만약 이펙트 함수가 마운트와 언마운트 될 때만 한 번씩 실행되게 하고 싶으면 빈 배열을 넣으면 됨. 이 경우 props나 state에 있는 어떤 값에도 의존하지 않기 때문에
- 의존성 배열을 생략하는 경우는 업데이트 될 때마다 호출됨.

```jsx
import React, { useState, useEffect } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `총 ${count}번 클릭했습니다.`;
  });

  return (
    <div>
      <p>총 {count}번 클릭했습니다.</p>
      <button onClick={() => setCount(count + 1)}>클릭</button>
    </div>
  );
}
```

- 정리하면 다음과 같음.

```jsx
useEffect(() => {
    // 컴포넌트가 마운트 된 이후,
    // 의존성 배열에 있는 변수들 중 하나라도 값이 변경되었을 때 실행됨
    // 의존성 배열에 빈 배열을 넣으면 마운트와 언마운트시에 단 한 번식만 실행됨
    // 의존성 배열 생략 시 컴포넌트 업데이트 시마다 실행됨
    ...

    return () => {
        // 컴포넌트가 마운트 해제되기 전에 실행됨
        ...
    }
}, [의존성변수1, 의존성변수2, ...]);
```

##### useMemo

- useMemo() 훅은 Memorized value를 리턴하는 훅.
- 이전 계산값을 갖고 있기 때문에 연산량이 놓은 작업의 반복을 피할 수 있음.
- 이 훅은 렌더링이 일어나는 동안 실행됨.
- 따라서 렌더링이 일어나는 동안 실행돼서는 안될 작업을 넣으면 안됨.
- 예를 들면 useEffect 사이드 이펙트 같은 것.

```jsx
const memorizedValue = useMemo(() => {
  // 연산량이 높은 작업을 수행하여 결과를 반환
  return computeExpensiveValue(의존성변수1, 의존성변수2);
}, [의존성변수1, 의존성변수2]);
```

- 다음 코드와 같이 의존성 배열을 넣지 않을 경우, 렌더링이 일어난 대마다 매번 함수가 실행됨.
- 따라서 의존성 배열을 넣지 않는 것은 의미가 없음.
- 만약 빈 배열을 넣게 되면 컴포넌트 마운트 시에만 함수가 실행됨.

```jsx
const memorizedValue = useMemo(() => computeExpensiveValue(a, b));
```

- 218Page Note를 참고.

##### useCallback

- useCallBack() 훅은 useMemo()와 유사한 역할을 함.
- 차이점은 값이 아닌 함수를 반환한다는 점.
- 의존성 배열을 파라미터로 받는 것은 useMemo와 동일함.
- 파라미터로 받은 함수를 콜백이라고 부름.
- useMemo와 마찬가지로 의존성 배열 중 하나라도 변경되면 콜백함수를 반환.

```jsx
const memorizedCallback = useCallback(() => {
  doSomething(의존성변수1, 의존성변수2);
}, [의존성변수1, 의존성변수2]);
```

##### useRef

- useRef() 훅은 레퍼런스를 사용하기 위한 훅
- 레퍼런스란 특정 컴포넌트에 접근할 수 있는 객체를 의미.
- useRef() 훅은 바로 이 레퍼런스 객체를 반환.
- 레퍼런스 객체에는 .current라는 속성이 있는데, 이것은 현재 참조하고 있는 엘리먼트를 의미.

```jsx
const refContainer = useRef(초깃값);
```

- 이렇게 반환된 레퍼런스 객체는 컴포넌트의 라이프타임 전체에 걸쳐서 유지됨.
- 즉, 컴포넌트가 마운트 해제 전까지는 계속 유지됨.

##### 훅의 규칙

- 첫번째 규칙은 무조건 최상의 레벨에서만 호출해야 한다는 것. 여기서 최상위는 컴포너트의 최상위 레벨을 의미.
- 따라서 반복문이나 조건문 또는 중첩된 함수들 안에서 훅을 호출하면 안됨.
- 이 규칙에 따라서 훅은 컴포넌트가 렌더링 될 때마다 같은 순서로 호출되어야 함.
- 페이지 224의 코드는 조건에 따라 호출됨으로 잘못된 코드.
- 두번째 규칙은 리액트 함수 컴포넌트에서만 훅을 호출해야 한다는 것.
- 따라서 일단 자바스크립트 함수에서 훅을 호출하면 안됨.
- 훅은 리액트 함수 컴포넌트 훅은 직접 만든 커스텀 훅에서만 호출할 수 있음.

##### 나만의 훅 만들기

- 필요하다면 직접 훅을 만들어 쓸 수도 있음.
- 이름이 use로 시작하고 내부에서 다른 훅을 호출하는 단순한 자바스크립트 함수.
- 파라미터로 무엇을 받을 지, 어떤 것을 리턴해야할지를 개발자가 직접 정할 수 있음.
- 중복되는 로직을 커스텀 훅으로 추출하여 재사용성을 높힘.
- 이름이 use로 시작하지 않으면 특정 함수의 내부에서 훗을 호출하는지를 알 수 없기 때문에 훅의 규칙 위반 여부를 자동으로 확인할 수 없음.

### 실습

useCounter, Accommodate 코드 실습

---

## 6주차

### 2023.04.06 목요일

### 강의

##### 컴포넌트 추출

- 복잡한 컴포넌트를 쪼개서 여러 개의 컴포넌트로 나눌 수도 있음.
- 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만드는 것.
- 실무에서는 처음부터 1개의 컴포넌트에 하나의 기능만 사용하도록 설계하는 것이 좋음.

```js
function Avatar(props) {
  return (
    <img className="avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function Comment(props) {
  return (
    <div className="comment">
      <div className="user-info">
        <Avatar user={props.author} />
        <div className="user-info-name">{props.author.name}</div>
      </div>

      <div className="comment-text">{props.text}</div>

      <div className="comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

- Comment는 댓글 표시 컴포넌트.
- 내부에는 이미지, 이름, 댓글과 작성일이 포함됨.
- 첫 번째 이미지 부분을 Avatar 컴포넌트로 출력해봄.

```js
function Comment(props) {
  return (
    <div className="comment">
      <UserInfo user={props.author} />
      <div className="comment-text">{props.text}</div>
      <div className="comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

- 추출 후 다시 결합한 UserInfo를 Comment 컴포넌트 반영하면 다음과 같은 모습이 됨.
- 처음에 비해서 가독성이 높아진 것을 확인할 수 있음.

```js
function UserInfo(props) {
  return (
    <div className="user-info">
      <Avatar user={props.user} />
      <div className="usr-info-name">{props.user.name}</div>
    </div>
  );
}
```

##### State란?

- state는 리액트 컴포넌트의 상태를 의미함.
- 상태의 의미는 정상인지 비정상인지가 아니라 컴포넌트의 데이터를 의미함.
- 정확히는 컴포넌트의 변경가능한데이터를 의미함.
- State가 변하면 다시 렌더링이 되기 때문에 렌더링과 관련된 값만 state에 포함시켜야 함.

##### State의 특징

- 리액트 만의 특별한 형태가 아닌 단지 자바스크립트 객체일 뿐.
- 예의 LikeButton은 class 컴포넌트임.
- constructor는 생성자이고 그 안에 있는 this.state가 현 컴포넌트의 state임.

```js
class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
    };
  }
}
```

※ _함수형에서는 userState()라는 함수를 사용함._

##### 생명주기에 대해 알아보기

- 생명주기는 컴포넌트의 생성 시점, 사용 시점, 종료 시점을 나타내는 것.
- constructor가 실행되면서 컴포넌트가 생성됨.
- 생성 직후 componentDidMount() 함수가 호출됨.
- 컴포넌트가 소멸하기 전까지 여러 번 렌더링 함.
- 렌더링은 props, setState(), forceUpdate()에 의해 상태가 변경되면 이루어짐.
- 그리고 렌더링이 끝나면 componentDinUpdate() 함수가 호출됨.
- 마지막으로 컴포넌트가 언마운트 되면 componentWillUnmount() 함수가 호출됨.

### 실습

Comment, CommentList, Notification, NotificationList 작성

---

## 5주차

### 2023.03.30 목요일

### 강의

##### 엘리먼트의 정의

- 리액트앱의 가장 작은 빌딩 블록들.
- 일반 객체이며, 쉽게 생성할 수 있음.

##### 엘리먼트의 생김새

- 리액트 엘리먼트는 자바스크립트 객체의 형태로 존재.
- 컴포넌트, 속성, 및 내부의 모든 children을 포함하는 일반 JS객체.
- 이 객체는 마음대로 변경할 수 없는 불변성을 갖고 있음.

##### 엘리먼트 렌더링

- 아래의 코드는 리액트에 필수로 들어가는 아주 중요한 코드
- 이 div태그 안에 리액트 엘리먼트가 렌더링 되며, Root DOM node라 부름.

```jsx
<div id="root"></div>
```

##### 렌더링된 엘리먼트 업데이트

- 다음 코드는 tick()함수를 정의하고 있음
- 이 함수는 현재 시간을 포함한 element를 생성해서 root div에 렌더링 해줌
- 그런데 라인12에 보면 setInterval()함수를 이용해서 위에서 정의함 tick()을 1초에 한번씩 호출하고 있음
- 결국 1초에 한번씩 element를 새로 만들고 그것을 교체하는 것
- 다음 코드를 실행하고, 크롬 개발자 도구에서 확인해 보면 시간 부분만 업데이트 되는 것을 확인할 수 있음

```jsx
function tick() {
  const element = (
    <div>
      <h1>안녕, 리액트!</h1>
      <h1>현재 시간: {new Date().toLocaleTimeString()}</h1>
    </div>
  );

  ReactDOM.render(element, document.getElementById("root"));
}
```

##### 컴포넌트

- 2정에서 설명한 바와 같이 리액트는 컴포넌트 기반의 구조를 가짐.
- 컴포넌트 구조하는 것은 작은 컴포넌트가 모여 큰 컴포넌트를 구성하고, 다시 이런 컴포넌트들이 모여서 전체 페이지를 구성한다는 것을 의미.
- 컴포넌트 재사용이 가능하기 때문에 전체 코드의 양을 줄일 수 있어 개발 시간과 유지 보수 비용도 줄일 수 있음.
- 컴포넌트는 자바스크립트 함수와 입력과 출력이 있다는 면에서 유사함.
- 다만 입력과 출력은 입력은 Props가 담당하고, 출력은 리액트 엘리먼트의 형태로 출력됨.
- 엘리먼트를 필요한 만큼 만들어 사용한다는 면에서는 객체 지향의 개념과 비슷함.

##### Props의 개념

- props는 prop(property : 속성, 특성)의 줄인말.
- 이 props가 바로 컴포넌트의 속성.
- 컴포넌트에 어떤 속성, props를 넣느냐에 따라서 속성이 다른 엘리먼트가 출력됨.
- props는 컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트 객체.
- Airbnb의 예도 마찬가지.

##### Props의 특징

- 읽기 전용.
- 속성이 다른 엘리먼트를 생성하려면 새로운 props를 컴포넌트에 전달하면 됨.

##### Pure 함수 vs. Impure 함수

- Pure 함수는 인수로 받은 정보가 함수 내부에서도 변하지 않는 함수.
- Impure 함수는 인수로 받은 정보가 함수 내부에서 변하는 함수.

##### 컴포넌트 추출

- 복잡한 컴포넌트를 쪼갯 여러 개의 컴포넌트로 나눌 수도 있음.
- 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만드는 것.
- 실무에서는 처음부터 1개의 컴포넌트에 하나의 기능만 사용하도록 설계하는 것이 좋음.

### 실습

Clock 예제 작성 및 실행

---

## 4주차

### 2023.03.23 목요일

### 강의

리액트 JSX 특징

##### 장점

1. 코드가 간결해짐.
2. 가독성이 향상됨.
3. Injection Attack이라 불리는 해킹 방법을 방어함으로 보안에 강함.

##### JSX 사용법

1. 모든 자바스크립트 문법을 지원함
2. 자바스크립트 문법에 XML과 HTML을 섞어서 사용함
3. 아래 코드의 2번 라인처럼 섞어서 사용하는 것
4. 만일 html이나 xml에 자바스크립트 코드를 사용하고 싶으로 중괄호를 사용함

```jsx
const name = "소플";
const element = <h1>Hello, {name}</h1>;
```

### 실습

리액트 프로젝트 디렉토리를 Github 업로드 및 클론.  
Book.jsx, Library.jsx 작성

---

## 3주차

### 2023.03.16 목요일

### 강의

README 파일 작성 방법  
JavaScript의 라이브러리 React

##### 리액트의 장점

1. 동기식(DOM), 비동기식(Virtual DOM)
2. 컴포넌트 기반 구조
3. 재사용성 - 반복적인 작업 ↓
4. 든든한 지원군 - 메타에서 지속적인 프로젝트 관리
5. 활발한 지식 공유 & 커뮤니티
6. 모바일 앱 개발가능 - 리액트 네이티브를 통한 Cross-Platform 개발

##### 리액트의 단점

1. 방대한 학습량 - 자바스크립트를 공부한 경우 빠르게 학습 가능
2. 높은 상태 관리 복잡도 - state, component life cycle 등의 개념이 있지만 어렵지 않음.

### 실습

리액트 프로젝트 디렉토리 생성  
리액트 예제(Add React in One Minute) 실행

---

## 2주차

### 2023.03.09 목요일

### 강의

자바스크립트의 역사  
ECMAScript 기준의 역사  
자바스크립트의 자료형  
자바스크립트의 함수

### 실습

깃헙 리포지토리 생성  
README.md 파일 커밋

---

## 1주차

### 2023.03.02 목요일

### 강의

오리엔테이션  
프로그램(Visual Studio Code, Github) 안내

---
