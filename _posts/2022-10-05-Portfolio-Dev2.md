---
layout: post
author: dain
title: "[Portfolio] 4일차, 개발(2) Scroll Navigation (Feat. FowardRef & Intersection Observer)"
date: 2022-10-05 22:47:00 +0900
categories: [Project, Portfolio]
tags: [portfolio, project, react, intersection observer]
pin: false
---

## 4일차, 개발 (2) Scroll Navigation

> 포트폴리오 스크롤의 길이가 매우 길어질 것 같았다. 그래서 쉽게 영역들을 이동할 수 있도록 좌측에 **네비게이션**을 두었다. 스크롤 시에도 고정된 위치에서 보여지도록 구상했고, 현재 영역을 진하게 그리고 화살표로 표시했다.

-2일차 디자인 내용 중-

어제의 애니메이션은 어려워보였지만 생각보다 쉬웠다면, 오늘을 쉽게 생각했다가 큰코다쳤다.

Scroll Navigation... 커뮤니티 라이브러리 등을 사용하면 쉽게 구현할 수 있겠지만, 가져다 쓰기는 싫었다. 뭐든 일단 직접 구현해보며 성장한다는 마인드🙂

<br/>

**Navigation의 기능**을 정리하면 두 가지로 나눌 수 있다.

1. Navigation 선택 영역으로 자동 스크롤
2. 현재 영역 Navigation에 표시

<br/>

## 1. Navigation 선택 영역으로 자동 스크롤

먼저 Web Element 클래스의 인터페이스 scrollIntoView() 함수를 사용하면, 웹 요소가 사용자의 View에 노출되도록 스크롤 할 수 있다. 그리고 소개된 옵션들 중 `behavior: "smooth"` 옵션을 사용하여 해당 영역으로 부드럽게 스크롤 하도록 구현해보자.

MDN Web Docs - Elements.scrollIntoView | [https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

### (1) useRef()로 이동하고싶은 Element 등록

먼저 useRef() 를 사용하여 이동하고싶은 Dom Element 들을 선택해준다. 각 ref 를 따로 선언하지 않고, 하나의 배열 형태로 저장해주었다.

```javascript
// App.js
function App() {
  const scrollRef = useRef([]);
  return (
    ...
    <MainContainer>
      <Navigation />
      <MainSectionContainer>
        <Title ref={scrollRef} />
        <Intro />
        <Contact ref={scrollRef} />
        <Skill ref={scrollRef} />
        <Project ref={scrollRef} />
        <Timeline ref={scrollRef} />
      </MainSectionContainer>
    </MainContainer>
    ...
  );
}

// section/Contact.js
function Contact(scrollRef) {
  return (
    <div ref={(cur) => (scrollRef.current[1] = cur)}>
      <SectionTitle>Contact</SectionTitle>
      ...
    </div>
  );
}
```

자 이렇게 하면 에러가 발생한다! 🚨

<!-- prettier-ignore -->
> Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
{: .prompt-danger }

ref를 props로 넘겨줄 수 없기 때문에 발생하는 문제이다. 해결 방법은 두 가지가 있다. 첫 번째는 props 이름을 ref가 아닌 다른 것으로 바꾸어 전달하는 방법. 두 번째는 fowardRef()를 사용하는 방법이다.

둘 다 해보았는데 잘 작동한다. 👍

ref.current에 Element 를 등록할 때에는 첫번째 방식으로, 읽어와서 이동시킬 때는 두 번째 방식으로 코드를 소개해보겠다. 고친 코드는 아래와 같다. Title, Contact, Skill, Project, Timeline 영역으로 이동시키고 싶어서, App.js에서 ScrollRef Props를 전달해주고, 각 컴포넌트의 div 태그의 ref를 scrollRef에 등록해주었다.

```javascript
// App.js
function App() {
  const scrollRef = useRef([]);
  return (
    ...
    <MainContainer>
      <Navigation />
      <MainSectionContainer>
        <Title scrollRef={scrollRef} />
        <Intro />
        <Contact scrollRef={scrollRef} />
        <Skill scrollRef={scrollRef} />
        <Project scrollRef={scrollRef} />
        <Timeline scrollRef={scrollRef} />
      </MainSectionContainer>
    </MainContainer>
    ...
  );
}

// section/Contact.js
function Contact(scrollRef) {
  return (
    <div ref={(cur) => (scrollRef.current[1] = cur)}>
      <SectionTitle>Contact</SectionTitle>
      ...
    </div>
  );
}
```

### (2) 해당 Element로 Scroll

이제 등록한 ScrollRef를 Navigation에서 읽어와 Element.scrollIntoView() 메소드를 통해 이동시켜보자. 앞서 말했듯 이번에는 fowardRef()를 사용해서 설명하겠다.

자식 컴포넌트에 ref를 전달하는 방법으로 아래 React 공식문서에 자세히 설명되어있다.

Reactjs Docs - Fowarding Refs | [https://ko.reactjs.org/docs/forwarding-refs.html](https://ko.reactjs.org/docs/forwarding-refs.html)

```javascript
// App.js
function App() {
  const scrollRef = useRef([]);
  return (
    ...
    <Navigation ref={scrollRef} />
    ...
  );
}

// components/Navigation.js
const Navigation = forwardRef((props, scrollRef) => {
  return (
    ...
    <NavButton
        index={0}
        title="Intro"
        ref={scrollRef}
        cur={props.index}
    />
    <NavButton
        index={1}
        title="Contact"
        ref={scrollRef}
        cur={props.index}
    />
    ...
  );
});

// components/NavButton.js
const NavButton = forwardRef((props, scrollRef) => {
    const onScroll = () => {
        scrollRef.current[props.index].scrollIntoView({
            behavior: 'smooth',
        });
    };
    return (
        <NavButtonBlock onClick={onScroll}>
            <p>{props.title}</p>
        </NavButtonBlock>
    );
});
```

App.js에서 ScrollRefs를 Navigation에 넘겨주었고, NavButton에서 fowardRef()로 해당 ref를 받는다. 그리고 Index, Title 등의 정보와 함께 NavButton에 넘겨주고, 클릭했을 때 스크롤하는 동작을 onScroll 함수로 선언하여 사용했다.

_전체 코드는 포스트 제일 아래 Github링크를 통해 볼 수 있다._ 🙂

여기 까지 구현하면 아래와 같이 작동한다.

![Scroll Navigation](/assets/img/post/1005_nav1.gif)
_실행결과_

<br/>

## 2. 현재 영역 Navigation에 표시

이제 Navigation에 현재 영역을 표시해주면 된다!✨

구현할 수 있는 여러가지 방법이 있는데, Scroll Listener를 이용한 방법들도 자주 사용되고 있지만, Intersection Observer(이하 IO)가 더 뛰어난 퍼포먼스를 가진다는 자료를 많이 볼 수 있었다.

MDN Web Docs - Intersection Observer | [https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

IO는 브라우저 뷰포트와 지정한 Element의 교차점을 비동기적으로 관찰한다. 동작 원리를 살펴보면 IO가 효율적이라는 것을 느낄 수 있지만, 퍼포먼스 차이를 완전 눈에 보이게 정리된 글이 있어 공유한다. (나도 나중에 저런 글을 써야지)

Aggelos Arvanitakis Blog | [https://itnext.io/1v1-scroll-listener-vs-intersection-observers-469a26ab9eb6](https://itnext.io/1v1-scroll-listener-vs-intersection-observers-469a26ab9eb6)

그래서 결론은 Intersection Observer를 사용하여 구현하였다.

<br/>

```javascript
function App() {
  const scrollRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(new Set([0]));
  const observeRef = (ref, index) => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          setCurrentIndex((prev) => new Set([...prev, index]));
        } else {
          setCurrentIndex(
            (prev) => new Set([...prev].filter((x) => x !== index))
          );
        }
      });
    });
    io.observe(ref);
  };

  useEffect(() => {
    scrollRef.current.forEach(observeRef);
  }, []);

  return (
    ...
    <Navigation ref={scrollRef} currentIndex={currentIndex} />
  );
}
```

전체적인 흐름 먼저 설명하자면 ref를 관찰하는 observeRef 함수를 정의해주었다. useEffect()를 이용해 App이 마운트 될 때, scrollRef의 모든 ref들에 대하여 forEach 메서드로 observeRef 함수를 호출해 관찰하는 흐름이다. _(useEffect를 사용하지 않는다면 observeRef 함수가 어어엄처어어엉 호출되어 무한히 관찰하고 난리가 나는 장면을 볼 수 있다. 그걸 어떻게 아냐구요?🥲)_ forEach는 index도 넘겨주기 때문에 observeRef의 파라미터로 사용할 수 있다!

`useState`를 통해 `currentIndex`라는 상태로 현재 보이는 `ref`의 `index`를 저장하고자 했는데, 하나의 값으로 저장하면 마지막에 추가된 요소를 현재위치로 등록된다. 일관적이고 예측 가능한 동작을 위해서는 현재 보이는 모든 요소들 중 가장 위쪽의 요소를 현재 위치로 보는게 좋다고 생각했다.

그래서 `State`의 초기값을 Set() 집합 형태로 지정해준 뒤, IO로 관찰하여 요소가 등장하면 Set에 추가, 사라지면 Set 에서 제거해주었다.

이제 NavButton 에서, 받아온 `currentIndex` 상태 값으로 조건부 스타일링을 해주면 끝이다.

```javascript
import { MdWest } from 'react-icons/md';

const NavButton = forwardRef((props, scrollRef) => {
  const isCurrent = props.index === Math.min(...props.currentIndex);
  ...
  return (
    <NavButtonBlock onClick={onScroll}>
      <p style={isCurrent ? { color: "black" } : { color: "rgba(0,0,0,0.3)" }}>
        {props.title}
      </p>
      {isCurrent ? <MdWest size={20}/> : <></>}
    </NavButtonBlock>
  );
});
```

해당 역역이 현재 영역인지에 대한 Boolean 값 `isCurrent`를 선언해주었다. 현재 인덱스와 currentIndex에서 가장 작은 값이 같으면 참이 된다. `isCurrent`가 참일 때 글자를 검정색, 거짓일 때 회색으로 표시해주었다. 그리고 이 값이 참일때 `<MdWest/>` 아이콘을 조건부렌더링 해주었다.

그러면 다음과 같이 현재 영역에 따라 표시되는 것을 볼 수 있다!

![Scroll Navigation](/assets/img/post/1005_nav2.gif)
_실행결과_

<br/>

그렇게 전체적인 개발을 완료했다! 세부 내용과 텍스트들을 차근차근 채워갈 예정이다!👍

그리고 모바일 환경에서 예상과 다르게 보이는 부분들과 몇몇 문제들을 깃허브 이슈로 등록해서 수정해나갈 예정이다! :)

이상으로 포트폴리오 포스팅 끝!😆

<br/>

🔥 **프론트엔드 개발자의 열정 가득한 포트폴리오 Link**  
🔗 [https://da-in.github.io/portfolio](https://da-in.github.io/portfolio)

📂 **전체 코드 Github**  
🔗 [https://github.com/da-in/portfolio](https://github.com/da-in/portfolio)
