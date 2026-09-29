---
# 웹에서 쓰려면 https://regx64.github.io/admin/ 을 쓰세요. 이 파일은 직접 파일로 쓸 때의 틀입니다.
# 새 글: 이 파일을 복사해 astro/src/content/blog/<영문-주소>.md 로 저장
#        → 주소는 https://regx64.github.io/blog/<영문-주소>/ 가 됩니다.
title: "글 제목"
description: "목록과 검색 결과에 보이는 한두 줄 소개"
date: 2026-09-28
category: "음악"          # 음악, 작곡, 취미 등. 공백 없이. 같은 이름끼리 자동으로 묶임
tags: ["태그1", "태그2"]

# 아래는 전부 선택. 필요 없으면 줄째 지우세요.
# 파일은 astro/public/blog/media/ 에 넣고 /blog/media/파일이름 으로 적습니다.
# cover: "/blog/media/cover.jpg"
# coverAlt: "이미지 설명"
# audio: "/blog/media/demo.mp3"      # 글 위에 오디오 플레이어가 붙음
# audioTitle: "데모 v1 (1:42)"
# youtube: "dQw4w9WgXcQ"             # 영상 ID만 (주소의 v= 뒤)
# draft: true                        # true면 배포에서 빠짐 (개발 서버에서는 보임)
---

본문은 마크다운으로 씁니다.

## 소제목

- 목록
- **굵게**, *기울임*, `코드`

![이미지 설명](/blog/media/photo.jpg)

본문 중간에 오디오를 더 넣고 싶으면 HTML을 그대로 쓰면 됩니다.

<audio controls src="/blog/media/take2.mp3"></audio>

SoundCloud나 다른 영상은 이렇게 감쌉니다.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/영상ID" title="영상" allowfullscreen></iframe></div>
