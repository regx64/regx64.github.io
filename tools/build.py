# regx64.github.io 페이지 생성기: index.html과 프로젝트별 상세 페이지를 같은 데이터로 만든다.
import os, html
OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # 저장소 루트
GH = "https://github.com/twopercenz/"

P = [
 dict(slug="trng", sec="trng", model="trng", tone="tone-b",
  name="TRNG 엔트로피원 비교",
  headline="잡음에서<br>난수를 꺼냅니다.",
  body="애벌랜치 노이즈, 이산소자 링 오실레이터, FPGA 링 오실레이터로 각각 진짜 난수생성기를 만들어 비교하고 있습니다.",
  meta="진행 중", repo=None,
  alt="인버터 다섯 개로 이루어진 링 오실레이터 모형",
  doc=[
   ("개요", "<p>컴퓨터가 흔히 쓰는 의사난수는 정해진 계산으로 만들어지기 때문에 시드를 알면 다시 만들 수 있습니다. 진짜 난수생성기(TRNG)는 물리 현상의 잡음에서 난수를 얻습니다. 이 프로젝트는 서로 다른 세 가지 엔트로피원으로 TRNG를 만들어 비교합니다.</p>"),
   ("엔트로피원", "<dl class='pairs'>"
     "<dt>애벌랜치 노이즈</dt><dd>역방향 전압이 걸린 PN 접합에서 애벌랜치 항복이 일어날 때 생기는 잡음</dd>"
     "<dt>이산소자 링 오실레이터</dt><dd>개별 소자로 만든 인버터를 고리로 연결했을 때 생기는 발진 주기의 흔들림(지터)</dd>"
     "<dt>FPGA 링 오실레이터</dt><dd>같은 원리를 FPGA 내부 논리로 구현한 것</dd></dl>"),
   ("상태", "<p>진행 중입니다.</p>"),
  ]),
 dict(slug="systolic", sec="systolic", model="systolic", tone="tone-a",
  name="폰 노이만 병목과 시스톨릭 배열",
  headline="아두이노 네 대로<br>만든 행렬 곱셈기.",
  body="아두이노 나노 4대로 2×2 시스톨릭 배열을 만들고, 폰 노이만식 순차 처리와 시스톨릭 배열의 두 데이터 흐름(OS, WS)으로 행렬 곱셈을 돌려 비교했습니다. PE끼리는 비트뱅잉으로 통신하고, 처리 시간, MAC 연산 수, 메모리 접근 횟수, 사이클 수를 쟀습니다.",
  meta="<span lang='en'>Von Neumann Bottleneck and Systolic Array Architecture: An Empirical Efficiency Comparison</span><br>2026년, 4인 팀 연구", repo=None,
  alt="전선으로 연결된 아두이노 나노 네 대",
  doc=[
   ("개요", "<p>폰 노이만 구조에서는 연산 장치와 메모리 사이를 데이터가 계속 오가야 해서 병목이 생깁니다. 시스톨릭 배열은 단순한 처리 소자(PE)를 격자로 놓고 데이터를 옆 소자로 흘려보내며 계산합니다. 두 방식을 같은 행렬 곱셈으로 돌려 실제 효율을 비교했습니다.</p>"),
   ("구성", "<ul class='plain'><li>아두이노 나노 4대로 만든 2×2 시스톨릭 배열</li><li>PE 사이 통신은 비트뱅잉으로 직접 구현</li><li>비교 대상: 폰 노이만식 순차 처리, 시스톨릭 배열의 OS 방식과 WS 방식</li></ul>"),
   ("측정 항목", "<ul class='plain'><li>처리 시간</li><li>MAC(곱셈 후 누적) 연산 수</li><li>메모리 접근 횟수</li><li>사이클 수</li></ul>"),
   ("정보", "<p lang='en'>Von Neumann Bottleneck and Systolic Array Architecture: An Empirical Efficiency Comparison</p><p>2026년, 4인 팀 연구</p>"),
  ]),
 dict(slug="kdaa", sec="kdaa", model="kdaa", tone="tone-b",
  name="KDAA",
  headline="타건음만 듣고<br>한글을 읽을 수 있을까.",
  body="키보드 소리로 입력을 알아내는 음향 사이드채널 공격(ASCA)을 한글 두벌식 자판에 적용하는 연구입니다. 지금까지 연구는 거의 영문 QWERTY만 다뤘습니다. 근접 마이크, 원거리 마이크, 배경소음이 섞인 경우로 나눠 CNN 모델 성능을 비교합니다.",
  meta="<span lang='en'>Korean Dubeolsik Acoustic Attack</span><br>진행 중", repo=None,
  alt="눌릴 때마다 소리가 퍼지는 ㅎ 키캡",
  doc=[
   ("개요", "<p>키마다 눌리는 소리가 조금씩 다르다는 점을 이용해, 녹음된 타건음만으로 무엇을 입력했는지 추정하는 공격을 음향 사이드채널 공격(ASCA)이라고 합니다. 기존 연구는 대부분 영문 QWERTY 자판을 대상으로 했습니다. KDAA는 이 공격을 한글 두벌식 자판에 적용합니다.</p>"),
   ("공격 시나리오", "<ul class='plain'><li>근접 마이크</li><li>원거리 마이크</li><li>배경소음이 섞인 환경</li></ul><p>시나리오마다 CNN 기반 모델의 성능을 비교합니다.</p>"),
   ("상태", "<p>진행 중입니다.</p>"),
  ]),
 dict(slug="hobby-os", sec="os", model="os", tone="tone-dark",
  name="Hobby OS",
  headline="부트섹터부터<br>VGA 드라이버까지.",
  body="<span class='nowrap'>x86-64</span> 어셈블리로 만드는 운영체제입니다. 커널 로드, 32비트 보호 모드, 페이징, 64비트 롱 모드를 지나 지금은 freestanding C 커널에서 VGA 드라이버가 돌아갑니다. 테스트는 QEMU로 합니다.",
  meta=None, repo=None,
  alt="부팅 메시지가 출력되는 모니터",
  steps=[("부트섹터",1),("커널 로드",1),("32비트 보호 모드",1),("페이징",1),("64비트 롱 모드",1),("freestanding C 커널",1),("VGA 드라이버",1)],
  doc=[
   ("개요", "<p>전원이 들어온 직후 실행되는 부트섹터부터 시작해, 운영체제가 뜨기까지의 과정을 직접 구현하고 있습니다. <span class='nowrap'>x86-64</span> 어셈블리로 시작해 지금은 C로 짠 커널까지 올라왔습니다.</p>"),
   ("진행", "STEPS"),
   ("도구", "<p><span class='nowrap'>x86-64</span> 어셈블리, C, QEMU</p>"),
  ]),
 dict(slug="cotton", sec="cotton", model="cotton", tone="tone-b",
  name="Cotton",
  headline="마음에 드는 것만<br>골라 만드는 언어.",
  body="Rust, C 계열, Lua, Python, JavaScript에서 좋았던 부분을 섞고 있습니다. 명세는 v0.2까지 썼고, Rust로 짠 렉서가 돌아갑니다. 다음은 파서와 IR입니다.",
  meta=None, repo="cotton",
  alt="목화 솜 모형",
  steps=[("언어 명세 v0.2",1),("렉서",1),("파서",0),("IR",0)],
  doc=[
   ("개요", "<p>여러 언어를 쓰면서 좋았던 부분을 모아 새 프로그래밍 언어를 만들고 있습니다. 구현은 Rust로 합니다.</p>"),
   ("참고한 언어", "<p>Rust, C 계열, Lua, Python, JavaScript</p>"),
   ("진행", "STEPS"),
  ]),
 dict(slug="percentage", sec="percentage", model="percentage", tone="tone-a",
  name="Percentage",
  headline="쌓으면,<br>보입니다.",
  body="나무위키 같은 한국어 개방형 위키입니다. 문서는 직접 만든 위키 문법 PerMark로 쓰고, Next.js와 Supabase로 만들었습니다.",
  meta=None, repo="percentage",
  alt="차곡차곡 쌓이는 문서 더미",
  doc=[
   ("개요", "<p>누구나 문서를 쓰고 고칠 수 있는 한국어 개방형 위키입니다. 슬로건은 “쌓으면, 보입니다.”입니다.</p>"),
   ("PerMark", "<p>Percentage 문서를 쓰기 위해 직접 만든 위키 문법입니다.</p>"),
   ("기술", "<p>Next.js, Supabase</p>"),
  ]),
 dict(slug="music-player", sec="player", model="player", tone="tone-b",
  name="music.player",
  headline="제가 들으려고<br>만드는 플레이어.",
  body="개인용 뮤직 플레이어입니다. 오디오 추출은 MUXIC.js로 할까 생각 중입니다.",
  meta=None, repo="music.player",
  alt="돌아가는 레코드판과 턴테이블",
  doc=[
   ("개요", "<p>직접 쓰려고 만드는 뮤직 플레이어입니다.</p>"),
   ("오디오 추출", "<p>오디오를 가져오는 계층으로 <a href='../muxic/'>MUXIC.js</a>를 쓰는 방안을 검토하고 있습니다.</p>"),
  ]),
 dict(slug="muxic", sec="muxic", model="muxic", tone="tone-a",
  name="MUXIC.js",
  headline="mp3를 받아 오는<br>라이브러리.",
  body="music.player의 오디오 추출 계층으로 쓸지 검토하고 있습니다.",
  meta=None, repo="MUXIC.js",
  alt="원형으로 늘어선 이퀄라이저 막대",
  doc=[
   ("개요", "<p>mp3 다운로더 라이브러리입니다.</p>"),
   ("쓰임", "<p><a href='../music-player/'>music.player</a>의 오디오 추출 계층으로 쓰는 방안을 검토하고 있습니다.</p>"),
  ]),
 dict(slug="ksca", sec="ksca", model="ksca", tone="tone-b",
  name="KSCA",
  headline="학생 논문에도<br>영구 주소를.",
  body="전국 청소년 컴퓨터 사이언스 학회용 웹 서비스입니다. Zenodo 같은 논문 아카이브에 영구 식별자, APA·BibTeX 인용, 버전 관리를 넣고, 게시판을 붙일 계획입니다.",
  meta="기획 중", repo=None,
  alt="부채꼴로 펼쳐진 논문 원고",
  doc=[
   ("개요", "<p>전국 단위 청소년 컴퓨터 사이언스 학회를 위한 웹 서비스입니다. 학생이 쓴 논문을 올리고, 찾고, 인용할 수 있는 곳을 만드는 것이 목표입니다.</p>"),
   ("논문 아카이브", "<p>Zenodo와 비슷한 형태로 만듭니다.</p><ul class='plain'><li>논문마다 영구 식별자</li><li>APA, BibTeX 인용 형식</li><li>버전 관리</li></ul>"),
   ("커뮤니티", "<p>게시판을 함께 둡니다.</p>"),
   ("상태", "<p>기획 중입니다.</p>"),
  ]),
]

def head(title, desc, pre):
    return f"""<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{html.escape(desc, quote=True)}">
<link rel="icon" href="{pre}favicon.ico" sizes="48x48">
<link rel="icon" href="{pre}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="{pre}apple-touch-icon.png">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
<link rel="stylesheet" href="{pre}style.css">
<script type="importmap">
{{
  "imports": {{
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
  }}
}}
</script>
<script type="module" src="{pre}main.js"></script>
</head>
<body>
<a class="skip" href="#main">본문으로 건너뛰기</a>
"""

def foot(pre):
    return """<footer class="foot tone-a">
  <p>x86-64 ASM, C, Rust, TypeScript, Next.js, Supabase, Arduino, KiCad, QEMU, Docker, Oracle Cloud</p>
  <p><a href="https://github.com/twopercenz">twopercenz</a> / <a href="https://github.com/regx64">regx64</a></p>
</footer>
</body>
</html>
"""

def plain(s):
    import re
    return re.sub(r"<[^>]+>", " ", s).replace("  ", " ").strip()

def copy_block(p, tag, pre, detail):
    meta = f'\n      <p class="meta">{p["meta"]}</p>' if p["meta"] else ""
    acts = []
    if not detail:
        acts.append(f'<a class="btn" href="{p["slug"]}/" aria-label="{p["name"]} 자세히 보기">자세히 보기</a>')
    if p["repo"]:
        acts.append(f'<a href="{GH}{p["repo"]}">GitHub에서 보기</a>')
    actions = ("\n      <div class=\"actions\">\n        " + "\n        ".join(acts) + "\n      </div>") if acts else ""
    return f"""    <div class="copy">
      <{tag} class="name">{p["name"]}</{tag}>
      <p class="headline">{p["headline"]}</p>
      <p class="body">{p["body"]}</p>{meta}{actions}
    </div>
    <div class="stage" data-model="{p["model"]}" role="img" aria-label="{p["alt"]}"></div>"""

# ---------- index.html ----------
idx = head("regx64", "트랜지스터부터 컴파일러까지, 컴퓨터를 아래층부터 만들어 보며 공부하는 학생", "")
idx += """
<header class="nav">
  <a class="brand" href="#top">regx64</a>
  <a href="https://github.com/twopercenz">GitHub</a>
</header>

<canvas id="gl" aria-hidden="true"></canvas>

<main id="main">

  <section class="panel hero tone-a" id="top">
    <div class="copy">
      <h1>regx64</h1>
      <p class="headline">트랜지스터부터<br>컴파일러까지.</p>
      <p class="body">컴퓨터공학을 공부하는 학생입니다. 컴퓨터가 실제로 어떻게 돌아가는지 아래층부터 하나씩 만들어 보며 배우고 있습니다. 회로이론과 미적분은 기초부터 따로 공부하는 중입니다.</p>
      <p class="meta">이 계정은 부계정이고, 코드는 대부분 <a href="https://github.com/twopercenz">@twopercenz</a>에 있습니다.</p>
    </div>
    <div class="stage" data-model="stack" role="img" aria-label="회로부터 응용까지 여섯 층이 쌓인 모형"></div>
  </section>
"""
for p in P:
    idx += f"""
  <section class="panel {p["tone"]}" id="{p["sec"]}">
{copy_block(p, "h2", "", False)}
  </section>
"""
idx += "\n</main>\n\n" + foot("")
open(os.path.join(OUT, "index.html"), "w").write(idx)

# ---------- 상세 페이지 ----------
for i, p in enumerate(P):
    pre = "../"
    d = head(f'{p["name"]} | regx64', plain(p["body"])[:150], pre)
    d += f"""
<header class="nav">
  <a class="brand" href="{pre}">regx64</a>
  <a href="{pre}#{p["sec"]}">전체 프로젝트</a>
</header>

<canvas id="gl" aria-hidden="true"></canvas>

<main id="main" class="detail">

  <section class="panel {p["tone"]}">
{copy_block(p, "h1", pre, True)}
  </section>

  <div class="doc tone-a">
"""
    for title, content in p["doc"]:
        if content == "STEPS":
            items = "".join(
                f'\n          <li class="{"done" if done else "next"}"><span>{n}</span><span class="state">{"완료" if done else "다음 목표"}</span></li>'
                for n, done in p["steps"])
            content = f'<ol class="steps">{items}\n        </ol>'
        d += f"""    <section class="doc-sec">
      <h2>{title}</h2>
      <div>
        {content}
      </div>
    </section>
"""
    d += """    <!-- 사진, 결과 그래프, 개발 기록을 넣으려면 아래 형식으로 섹션을 추가하세요.
    <section class="doc-sec">
      <h2>기록</h2>
      <div>
        <figure>
          <img src="이미지.png" alt="이미지 설명">
          <figcaption>설명</figcaption>
        </figure>
        <p>내용</p>
      </div>
    </section>
    -->
"""
    prev, nxt = P[i - 1] if i > 0 else None, P[i + 1] if i < len(P) - 1 else None
    left = f'<a class="prev" href="{pre}{prev["slug"]}/"><span>이전 프로젝트</span>{prev["name"]}</a>' if prev else "<span></span>"
    right = f'<a class="next" href="{pre}{nxt["slug"]}/"><span>다음 프로젝트</span>{nxt["name"]}</a>' if nxt else "<span></span>"
    d += f"""
    <nav class="pager" aria-label="다른 프로젝트">
      {left}
      {right}
    </nav>
  </div>

</main>

""" + foot(pre)
    os.makedirs(os.path.join(OUT, p["slug"]), exist_ok=True)
    open(os.path.join(OUT, p["slug"], "index.html"), "w").write(d)

print("done")
