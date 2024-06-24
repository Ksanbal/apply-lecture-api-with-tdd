# apply-lecture-api-with-tdd
동시성 이슈를 활용한 선착순 특강 신청 API

## Step 3

### 요구사항
- 동일한 신청자는 한 번의 수강 신청만 성공할 수 있습니다.
- 선착순 30명만 신청 가능합니다.
- 어떤 유저가 특강을 신청했는지 히스토리를 저장해야합니다.

### Endpoints
- `POST /lectures/apply` : 강의 신청
- `GET /lectures/application/{userId}` : 강의 신청 여부 조회

### ERD
![image](https://github.com/Ksanbal/apply-lecture-api-with-tdd/assets/50395696/7952f6eb-a86b-40a7-818f-7fb2e3a5656b)


## Step 4

### 요구사항
- 동일한 신청자는 한 번의 수강 신청만 성공할 수 있습니다.
- 선착순으로 신청 가능하고, 자리는 강의마다 다릅니다.
- 어떤 유저가 특강을 신청했는지 히스토리를 저장해야합니다.
- 강의는 여러 날짜에 걸쳐서 열릴 수 있습니다.

### Endpoints
- `GET /lecutres` : 강의 목록 조회
- `POST /lectures/apply` : 강의 신청
- `GET /lectures/{id}/application/{userId}` : 특정 강의의 신청 여부 조회

### ERD
![image](https://github.com/Ksanbal/apply-lecture-api-with-tdd/assets/50395696/f6aa1255-4f9f-4817-8986-4c76ddddaac6)
