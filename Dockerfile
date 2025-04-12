# 기본 Node.js 이미지 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 파일 복사
COPY . .

# 포트 열기
EXPOSE 3000

# 앱 시작
CMD ["node", "server.js"]
