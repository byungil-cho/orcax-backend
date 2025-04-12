# Dockerfile

# 1. Node.js 이미지 사용
FROM node:18

# 2. 앱 디렉터리 생성
WORKDIR /app

# 3. package.json과 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 앱 소스 복사
COPY . .

# 6. 포트 개방
EXPOSE 3000

# 7. 앱 시작
CMD ["node", "server.js"]
