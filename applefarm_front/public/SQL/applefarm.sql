--회원 테이블
CREATE TABLE MEMBER_TBL (
	MEMBER_NO	                NUMBER		        PRIMARY KEY,
	MEMBER_NAME	                VARCHAR2(30)		NOT NULL,
	MEMBER_NICKNAME	            VARCHAR2(30)		NOT NULL    UNIQUE,
	MEMBER_ID	                VARCHAR2(30)		NOT NULL    UNIQUE,
	MEMBER_PW	                CHAR(60)		    NOT NULL,
	MEMBER_EMAIL	            VARCHAR2(100)		NOT NULL,
	MEMBER_PHONE	            CHAR(13)		    NOT NULL,
	MEMBER_GRADE	            NUMBER		        NOT NULL,           -- 1:사용자  2:관리자  // 3: 블랙(게시글 및 후기, 댓글 작성 금지-1일)
	MEMBER_ACCOUNTNUMBER	    VARCHAR2(20)		NULL,
	ENROLL_DATE	                DATE		        NOT NULL,
	SELLER_SCORE	            NUMBER		        NOT NULL,           -- 0~100 사이. 시작 37점.
	SELLER_GRADE	            NUMBER		        NOT NULL,           --(1~3) 레벨에따른 수수료 부가
	MEMBER_WITHDRAW	            CHAR(1)		        NOT NULL            -- 0 : 정상회원 /1: 탈퇴회원 →1일 경우 해당 계정으로 로그인 금지
);
CREATE SEQUENCE MEMBER_SEQ;

--주소테이블
CREATE TABLE ADDRESS_TBL (
	ADDRESS_NO	            NUMBER		        PRIMARY KEY,
	MEMBER_NO	            NUMBER		        NOT NULL    REFERENCES MEMBER_TBL,
	ZIPCODE	                CHAR(5)		        NOT NULL,
	ADDRESS	                VARCHAR2(200)		NOT NULL,
	ADDRESS_DETAIL	        VARCHAR2(100)		NULL,
	ADDRESS_NAME	        VARCHAR2(30)		NOT NULL,
	ADDRESS_PHONE	        CHAR(13)		    NOT NULL,
	ADDRESS_REQUEST	        VARCHAR2(200)		NULL,
	ADDRESS_DEFALUT	        NUMBER		        NOT NULL        -- 1:기본배송지
);
CREATE SEQUENCE ADDRESS_SEQ;


--상품 테이블
CREATE TABLE PRODUCT_TBL (
	PRODUCT_NO	                NUMBER		            PRIMARY KEY,
	MEMBER_NO	                NUMBER		            NOT NULL        REFERENCES MEMBER_TBL,
	PRODUCT_QUALITY	            CHAR(1)		            NOT NULL,
	PRODUCT_TITLE	            VARCHAR2(100)		    NOT NULL,
	PRODUCT_EXPLAIN	            VARCHAR2(4000)		    NULL,
	PRODUCT_PRICE	            NUMBER		            NOT NULL,
	PRODUCT_DATE	            DATE		            NOT NULL,
	PRODUCT_HIDE                CHAR(1)                 NOT NULL,       -- 0 : 보여주기, 1: 숨기기
	PRODUCT_LINE	            VARCHAR2(100)		    NOT NULL,
	PRODUCT_GEN	                VARCHAR2(100)		    NULL,
	PRODUCT_MODEL	            VARCHAR2(100)		    NULL,
	PRODUCT_COLOR	            VARCHAR2(100)		    NULL,
    PRODUCT_MODEL2              VARCHAR2(100)           NULL,
	PRODUCT_STORAGE	            VARCHAR2(100)		    NULL,
	PRODUCT_MEMORY	            VARCHAR2(100)		    NULL,
	PRODUCT_CHIP	            VARCHAR2(100)		    NULL,
    PRODUCT_CPU                 VARCHAR2(100)           NULL,
    PRODUCT_GPU                 VARCHAR2(100)           NULL,
	PRODUCT_CASE	            VARCHAR2(100)		    NULL,
	PRODUCT_CONNECTIVITY	    VARCHAR2(100)		    NULL,
	PRODUCT_CHARGE	            VARCHAR2(100)		    NULL,
    PRODUCT_THUMBNAIL	        VARCHAR2(100)		    NULL,
	PRODUCT_SUMMARY	            VARCHAR2(300)		    NOT NULL        -- EX) iPhone 15 Pro Max 256GB 화이트
);
CREATE SEQUENCE PRODUCT_SEQ;


--상품 첨부파일 테이블
CREATE TABLE PRODUCT_FILE_TBL (
	FILE_NO	            NUMBER		        PRIMARY KEY,
	PRODUCT_NO	        NUMBER		        NOT NULL        REFERENCES PRODUCT_TBL,
	FILE_NAME	        VARCHAR2(100)		NOT NULL,
	FILE_PATH	        VARCHAR2(100)		NOT NULL
);
CREATE SEQUENCE PRODUCT_FILE_SEQ;


--거래테이블
CREATE TABLE TRADE_TBL (
	TRADE_NO	                NUMBER		            PRIMARY KEY,
	TRADE_SELLER	            NUMBER		            NOT NULL        REFERENCES MEMBER_TBL,
	TRADE_BUYER	                NUMBER		            NOT NULL        REFERENCES MEMBER_TBL,
	PRODUCT_NO	                NUMBER		            NOT NULL        REFERENCES PRODUCT_TBL,     -- PRODUCT_TBL이랑 JOIN해서 RPODUCT_SUMMARY 가져와야 함. 상품이 뭔지 보여주는 용도
	TRADE_RESERVE_DATE          DATE                    NULL,               -- TRADE_STATE = "예약중"인 것의 예약일임
    TRADE_DATE	                DATE    		        NOT NULL,
	TRADE_PRICE	                NUMBER		            NOT NULL,
	TRADE_STATE	                VARCHAR2(30)		    NOT NULL,           -- 예약중, 결제완료, 발송대기, 배송중,  배송완료, 구매확정 or 환불
	ZIPCODE	                    CHAR(5)		            NOT NULL,
	ADDRESS	                    VARCHAR2(200)		    NOT NULL,
	ADDRESS_DETAIL	            VARCHAR2(100)		    NULL,
	ADDRESS_NAME	            VARCHAR2(30)		    NOT NULL,
	ADDRESS_PHONE	            CHAR(13)		        NOT NULL,
	ADDRESS_REQUEST	            VARCHAR2(200)		    NOT NULL,
	INVOICE_NUMBER	            VARCHAR2(30)		    NULL                -- 구매자가 결제완료후 판매자가 판매물품 택배보내면서 등록
);
CREATE SEQUENCE TRADE_SEQ;


--상품별 매수호가 테이블
CREATE TABLE BID_TBL (
	BID_NO	                NUMBER		    PRIMARY KEY,
	PRODUCT_NO	            NUMBER		    NOT NULL        REFERENCES PRODUCT_TBL,
	MEMBER_NO	            NUMBER		    NOT NULL        REFERENCES MEMBER_TBL,      -- 입찰자
	BID_PRICE	            NUMBER		    NOT NULL
);
CREATE SEQUENCE BID_SEQ;



--좋아요 테이블
CREATE TABLE LIKE_TBL (
	LIKE_NO	            NUMBER		    PRIMARY KEY,
	MEMBER_NO	        NUMBER		    NOT NULL    REFERENCES MEMBER_TBL,
	PRODUCT_NO	        NUMBER		    NOT NULL    REFERENCES PRODUCT_TBL
);
CREATE SEQUENCE LIKE_SEQ;


--후기 테이블
CREATE TABLE REVIEW_TBL (
	TRADE_NO	                NUMBER		        NOT NULL    REFERENCES TRADE_TBL,
	REVIEW_SELLER	            NUMBER		        NOT NULL    REFERENCES MEMBER_TBL,
	REVIEW_CONSUMER	            NUMBER		        NOT NULL    REFERENCES MEMBER_TBL,
	PRODUCT_NO	                NUMBER		        NOT NULL    REFERENCES PRODUCT_TBL,
	REVIEW_SATISFACTION	        NUMBER		        NOT NULL,       -- -1:불만족, 0:보통, 1:만족
	REVIEW_DETAIL	            VARCHAR2(3000)		NULL
);


--쪽지 테이블
CREATE TABLE NOTE_TBL (
	NOTE_NO	                    NUMBER		            PRIMARY KEY,
	SENDER_MEMBER_NO	        NUMBER		            NOT NULL        REFERENCES MEMBER_TBL,  --보낸이 회원번호
	RECEIVER_MEMBER_NO	        NUMBER		            NOT NULL        REFERENCES MEMBER_TBL,  --받는이 회원번호
	PRODUCT_NO	                NUMBER		            NULL            REFERENCES PRODUCT_TBL,
	NOTE_TITLE	                VARCHAR2(200)		    NOT NULL,
	NOTE_CONTENT	            VARCHAR2(2000)		    NOT NULL,
	SEND_DATE	                DATE		            NOT NULL,
	RECEIVE_DATE	            DATE		            NOT NULL,
	RECEIVER_READ	            CHAR(1)		            NOT NULL,       -- 0(읽음x) / 1(읽음)   받은이가 읽었는지
	RECEIVER_DELETE	            CHAR(1)		            NOT NULL,       -- 0(삭제x) / 1(삭제)   받은이가 삭제했는지
	SENDER_DELETE	            CHAR(1)		            NOT NULL        -- 0(삭제x) / 1(삭제)   보낸이가 삭제했는지
);
CREATE SEQUENCE NOTE_SEQ;


----------------------제품비교테이블---------------------------
--아이폰
CREATE TABLE IPHONE_TBL (
	PRODUCT_LINE	        VARCHAR2(100)		    NOT NULL,
	IPHONE_GEN	            VARCHAR2(100)		    NOT NULL,
	IPHONE_MODEL	        VARCHAR2(100)		    NOT NULL,
	IPHONE_COLOR	        VARCHAR2(100)		    NOT NULL,
	IPHONE_IMAGE	        VARCHAR2(100)		    NOT NULL,
	IPHONE_STORAGE	        VARCHAR2(100)		    NOT NULL
);
--맥북
CREATE TABLE MACBOOK_TBL (
	PRODUCT_LINE	        VARCHAR2(100)		    NOT NULL,
	MACBOOK_GEN	            VARCHAR2(100)		    NOT NULL,
	MACBOOK_MODEL	        VARCHAR2(100)		    NOT NULL,
    MACBOOK_MODEL2	        VARCHAR2(100)		    NULL,
	MACBOOK_COLOR	        VARCHAR2(100)		    NOT NULL,
	MACBOOK_IMAGE	        VARCHAR2(100)		    NOT NULL,
	MACBOOK_STORAGE	        VARCHAR2(100)		    NOT NULL,
	MACBOOK_MEMORY	        VARCHAR2(100)		    NOT NULL,
	MACBOOK_CHIP	        VARCHAR2(100)		    NULL,
    MACBOOK_CPU 	        VARCHAR2(100)		    NULL,
    MACBOOK_GPU 	        VARCHAR2(100)		    NULL
);
--아이패드
CREATE TABLE IPAD_TBL (
	PRODUCT_LINE	        VARCHAR2(100)		    NOT NULL,
	IPAD_GEN	            VARCHAR2(100)		    NOT NULL,
	IPAD_COLOR	            VARCHAR2(100)		    NOT NULL,
	IPAD_IMAGE	            VARCHAR2(100)		    NOT NULL,
	IPAD_STORAGE	        VARCHAR2(100)		    NOT NULL,
	IPAD_CONNECTIVITY	    VARCHAR2(100)		    NOT NULL
);
--워치
CREATE TABLE WATCH_TBL (
	PRODUCT_LINE	        VARCHAR2(100)		NOT NULL,
	WATCH_GEN	            VARCHAR2(100)		NOT NULL,
	WATCH_CASE	            VARCHAR2(100)		NOT NULL,
	WATCH_MODEL	            VARCHAR2(100)		NOT NULL,
	WATCH_COLOR	            VARCHAR2(100)		NOT NULL,
	WATCH_IMAGE	            VARCHAR2(100)		NOT NULL,
	WATCH_CONNECTIVITY	    VARCHAR2(100)		NOT NULL
);
--에어팟
CREATE TABLE AIRPODS_TBL (
	PRODUCT_LINE	        VARCHAR2(100)		NOT NULL,
	AIRPODS_GEN	            VARCHAR2(100)		NOT NULL,
	AIRPODS_COLOR	        VARCHAR2(100)		NOT NULL,
	AIRPODS_IMAGE	        VARCHAR2(100)		NOT NULL,
	AIRPODS_CHARGE	        VARCHAR2(100)		NOT NULL
);
--색상
CREATE TABLE COLOR_TBL (
	color	            VARCHAR2(100)		NOT NULL,   -- JOIN USING COLOR
	colorImg	        VARCHAR2(300)		NOT NULL    -- 이미지 이름 입력
);
-------------------------------------------------------------------

--게시판 테이블
CREATE TABLE BOARD_TBL (
	BOARD_NO	            NUMBER		        PRIMARY KEY,
	BOARD_TITLE	            VARCHAR2(100)		NOT NULL,
	BOARD_CONTENT	        VARCHAR2(4000)		NOT NULL,
	MEMBER_NO	            NUMBER		        NOT NULL    REFERENCES MEMBER_TBL,
	READ_COUNT	            NUMBER		        NOT NULL,
	BOARD_TYPE	            NUMBER		        NOT NULL,     -- 1.공지사항, 2.자유게시판, 3.질문게시판, 4.뽐내기, 5.매거진
	PRODUCT_CATEGORY	    VARCHAR2(50)		NULL,         -- IPHONE,  MACBOOK,  IPAD,  APPLEWATCH,  AIRPODS
	BOARD_HIDE	            CHAR(1)		        NOT NULL,     -- 0 : 보여주기, 1 : 숨기기
	BOARD_DATE	            DATE        		NOT NULL
);
CREATE SEQUENCE BOARD_SEQ;

--댓글 테이블
CREATE TABLE COMMENT_TBL (
	COMMENT_NO	            NUMBER		        PRIMARY KEY,
	BOARD_NO	            NUMBER		        NOT NULL    REFERENCES BOARD_TBL,
	COMMENT_WRITER	        NUMBER		        NULL        REFERENCES MEMBER_TBL,
	COMMENT_CONTENT	        VARCHAR2(500)		NOT NULL,
	SELF_REF	            NUMBER		        NULL        REFERENCES COMMENT_TBL,   --NULL: 댓글, NULL x: 대댓글
	COMMENT_HIDE	        CHAR(1)		        NOT NULL,   -- 0 : 보여주기, 1 : 숨기기
	COMMENT_DATE	        DATE    		    NOT NULL
);
CREATE SEQUENCE COMMENT_SEQ;

--게시판 첨부파일 테이블
CREATE TABLE BOARD_FILE_TBL (
	FILE_NO	                NUMBER		        PRIMARY KEY,
	BOARD_NO	            NUMBER		        NOT NULL    REFERENCES BOARD_TBL,
	FILE_NAME	            VARCHAR2(300)		NOT NULL,
	FILE_PATH	            VARCHAR2(300)		NOT NULL
);
CREATE SEQUENCE BOARD_FILE_SEQ;

--환불관리 테이블
CREATE TABLE REFUND_TBL (
	REFUND_NO	            NUMBER		        PRIMARY KEY,
	TRADE_NO	            NUMBER		        NOT NULL    REFERENCES TRADE_TBL,
    PRODUCT_NO              NUMBER              NOT NULL    REFERENCES PRODUCT_TBL,     -- PRODUCT_TBL이랑 JOIN해서 RPODUCT_SUMMARY 가져와야 함. 상품이 뭔지 보여주는 용도
	REFUND_DATE	            DATE		        NOT NULL,
	REFUND_REASON	        VARCHAR2(2000)		NOT NULL,
	REFUND_STATUS	        NUMBER		        NULL    --신청,진행중(0), 반려(->구매확정, 1) , 승인(2)
);
CREATE SEQUENCE REFUND_SEQ;

--신고테이블
CREATE TABLE REPORT_TBL (
	REPORT_NO	            NUMBER		        PRIMARY KEY,
	REPORT_TYPE	            NUMBER		        NOT NULL,       --1(상품판매글), 2(상품후기), 3(자유), 4(질문), 5(뽐내기), 6(자유,질문,뽐내기댓글)
	REPORT_TARGET	        NUMBER		        NOT NULL,       --각 유형에 맞게 PK넘겨주기.  (상품판매글, 상품후기, 자유,질문,뽐내기, 댓글)번호
    REPORT_CONTENT	        VARCHAR2(1000)		NULL,           --신고유형이 기타일 시 활성화
	REPORT_DATE	            DATE    		    NOT NULL,
	REPORTING_MEMBER	    NUMBER		        NOT NULL    REFERENCES MEMBER_TBL,
	REPORTED_MEMBER	        NUMBER		        NOT NULL    REFERENCES MEMBER_TBL,
	REPORT_STATUS	        NUMBER		        NOT NULL        --진행중(0), 반려(1), 제재(2)
);
CREATE SEQUENCE REPORT_SEQ;

--신고 선택 내용 참조 테이블
CREATE TABLE REPORT_SELECT_REFERENCE_TBL(
    REPROT_SELECT_NO            NUMBER             PRIMARY KEY,    -- SEQ 사용 X. 삭제 및 수정 용이하기 위해
    REPROT_SELECT_CONTENT       VARCHAR2(100)      NOT NULL
);

--신고선택 테이블
CREATE TABLE REPORT_SELECT_TBL (
	REPORT_NO	        NUMBER		    NOT NULL    REFERENCES REPORT_TBL,
	REPROT_SELECT_NO	NUMBER		    NOT NULL    REFERENCES REPORT_SELECT_REFERENCE_TBL
);


INSERT INTO REPORT_SELECT_REFERENCE_TBL VALUES(1,'욕설을 사용했어요');
INSERT INTO REPORT_SELECT_REFERENCE_TBL VALUES(2,'사기를 저질렀어요');
INSERT INTO REPORT_SELECT_REFERENCE_TBL VALUES(3,'피싱을 시도했어요');
INSERT INTO REPORT_SELECT_REFERENCE_TBL VALUES(4,'위조상품을 판매했어요');
INSERT INTO REPORT_SELECT_REFERENCE_TBL VALUES(5,'불법활동이 의심되어요');
INSERT INTO REPORT_SELECT_REFERENCE_TBL VALUES(6,'불건전한 내용이 작성되었어요');
INSERT INTO REPORT_SELECT_REFERENCE_TBL VALUES(7,'비방적인 언어를 사용했어요');