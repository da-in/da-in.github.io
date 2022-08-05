---
layout: post
title: "[React-Native] Change State Handler (feat. TypeScript)"
date: 2022-08-03 22:00:00 +0900
categories: React-Native
---

## Change State Handler (feat. TypeScript)

최근에 고민이 생겼다. 😶

<br/>

바로 이녀석 때문이다.

```
const onChangeForm = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
};
```

react에서 객체 형태의 상태를 관리할 때, 상태의 key(name)과 value를 차례로 받아 업데이트 해주는 함수형 컴포넌트이며, Change Handler 라고 할 수 있겠다.

useState를 사용했을 때 기본적으로 리턴하는 갱신 함수를 사용해도 되지만,  
_(갱신함수 : [form, setForm] = useState(); 에서 setForm())_
이걸 사용하면 상태 업데이트를 편하게 할 수 있다.

다음과 같은 form state가 있다고 해보자.
```
[form, setForm] = useState()
```

기존 갱신 함수를 사용해서 form 을 업데이트 한다고 해보자. Form에는 
```

```