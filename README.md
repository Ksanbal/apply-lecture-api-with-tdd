# apply-lecture-api-with-tdd
동시성 이슈를 활용한 선착순 특강 신청 API

### Endpoints
- `GET /lecutres` : 강의 목록 조회
- `POST /lectures/apply` : 강의 신청
- `GET  /lectures/{id}/application/{userId}` : 특정 강의의 신청 여부 조회

## ERD
![image](https://github.com/Ksanbal/apply-lecture-api-with-tdd/assets/50395696/3116e6a9-dfd7-49bd-9c22-343ced6d2180)
- lecture_detail : 강의 정보 (제목, 강연자 등의 정보)
- lecture : 강의 목록 (여러 날짜의 강의)
- application : 강의 신청 내역
