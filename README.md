# Dogsit Trip - 강아지 돌봄 서비스 랜딩페이지

여행 중에도 우리 강아지를 안심하고 맡길 수 있는 검증된 도우미 매칭 서비스의 랜딩페이지입니다.

## 🚀 배포 방법

### Vercel (권장)
1. GitHub에 코드 업로드
2. [Vercel](https://vercel.com)에서 GitHub 저장소 연결
3. 자동 배포 완료

### Netlify
1. GitHub에 코드 업로드
2. [Netlify](https://netlify.com)에서 GitHub 저장소 연결
3. 자동 배포 완료

### GitHub Pages
1. GitHub에 코드 업로드
2. Settings > Pages에서 Source를 "Deploy from a branch" 선택
3. Branch를 "main"으로 설정
4. 배포 완료

## 📱 기능

- **반응형 디자인**: 모바일(375px) ~ 데스크톱(1440px) 지원
- **빠른 로딩**: 순수 HTML/CSS, 외부 의존성 최소화
- **접근성**: 키보드 네비게이션, 스크린리더 지원
- **SEO 최적화**: 메타태그, Open Graph, Twitter Card

## 🎨 디자인

- **색상**: 검은 배경(#000), 흰색 텍스트, 라임 포인트(#D2FF8D)
- **타이포그래피**: 시스템 폰트 스택 사용
- **레이아웃**: CSS Grid, Flexbox 활용

## 📄 페이지 구성

- `/` - 메인 랜딩페이지
- `/terms` - 이용약관
- `/privacy` - 개인정보처리방침
- `/safety` - 안전가이드
- `/faq` - 자주묻는질문

## 🔧 기술 스택

- HTML5
- CSS3 (Grid, Flexbox, 애니메이션)
- Vanilla JavaScript (최소한)
- 외부 라이브러리 없음

## 📊 성능 최적화

- 이미지 최적화 (WebP 우선)
- CSS/JS 인라인화
- 지연 로딩
- 압축 최적화

## 🚀 로컬 실행

```bash
# 간단한 HTTP 서버 실행
python -m http.server 8000
# 또는
npx serve .
```

브라우저에서 `http://localhost:8000` 접속

## 📝 라이선스

© 2024 Dogsit Trip. All rights reserved.
