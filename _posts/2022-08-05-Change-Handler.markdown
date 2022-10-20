---
layout: post
title: "[React-Native] Change State Handler (feat. TypeScript)"
date: 2022-08-05 23:19:00 +0900
categories: React-Native
tags: [react native, handler]
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
이걸 사용하면 상태 업데이트를 매우 편리하게 할 수 있다.

<br/>

## 🙂 코드가 간결해진다!

아이디가 유효(형태, 중복체크 등)해야 회원가입을 할 수 있는 로직을 생각하면 다음과 같은 form을 상태관리 할 수 있다.

```
[form, setForm] = useState({
  id: '',
  idValid : false,
  password : '',
})
```

기존 갱신 함수를 사용해서 password 를 업데이트 한다고 해보자.
그러면 다음과 같이 구현할 수 있다.

```
<TextInput onChangeText={(value: string) =>
  setForm({...form, password: value})
}/>
```

하지만 앞서 만든 onChangeForm을 사용한다면 코드가 매우 간결해진다.

```
<TextInput onChangeText={onChangeForm('password')}/>
```

한 번만 상태를 업데이트 하는거면 전자와 같이 사용해도 문제가 없으나, form 안에서 관리하는 값이 많아지고, 반복되어 사용한다면 전자와 후자의 차이는 매우 커질 것이다.

<br/>

## 🙂 코드 이해하기

원리를 살펴보면
onChangeForm('password')는 onChangeForm 함수에서 첫 번째 인자만 입력한 상태이므로,
`(value: string) => setForm({...form, password: value});`를 리턴한다.
TextInput의 속성 onChangeText 에 이 함수를 적용하면, 변화한 텍스트 값을 이 함수의 인자로 넘겨주어 작동하는 것이다.

<br/>

## 👍 프로젝트가 커질수록 더욱더 유용한 이유

프로젝트가 커지면
