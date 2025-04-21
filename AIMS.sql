--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2025-04-21 21:55:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 25002)
-- Name: Book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Book" (
    "BookID" integer NOT NULL,
    "NameOfBook " character varying(50) NOT NULL,
    "Price " double precision NOT NULL,
    "Author" character varying(50)
);


ALTER TABLE public."Book" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25007)
-- Name: Cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart" (
    "CartID" integer NOT NULL,
    "TotalPrice" double precision NOT NULL,
    "UserID" integer NOT NULL
);


ALTER TABLE public."Cart" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25017)
-- Name: CartItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CartItem" (
    "CartItemID" integer NOT NULL,
    "CartID" integer NOT NULL,
    "BookID" integer NOT NULL,
    "Quantity" integer NOT NULL
);


ALTER TABLE public."CartItem" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25032)
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    "OrderID" integer NOT NULL,
    "UserID" integer NOT NULL,
    "BookID" integer NOT NULL,
    "Price" double precision NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25047)
-- Name: OrderBook; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderBook" (
    "OrderBookID" integer NOT NULL,
    "OrderID" integer NOT NULL,
    "BookID" integer NOT NULL,
    "Quantity" integer NOT NULL
);


ALTER TABLE public."OrderBook" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25062)
-- Name: PaymentTransaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PaymentTransaction" (
    "TransactionID" integer NOT NULL,
    "Date" date NOT NULL,
    "OrderID" integer NOT NULL,
    payment_method character varying(50) NOT NULL
);


ALTER TABLE public."PaymentTransaction" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24979)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    "UserID" integer NOT NULL,
    "Name " character varying(20) NOT NULL,
    "Gmail" character varying(20) NOT NULL,
    "PassWord" character varying(13) NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 4877 (class 0 OID 25002)
-- Dependencies: 216
-- Data for Name: Book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Book" ("BookID", "NameOfBook ", "Price ", "Author") FROM stdin;
\.


--
-- TOC entry 4878 (class 0 OID 25007)
-- Dependencies: 217
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cart" ("CartID", "TotalPrice", "UserID") FROM stdin;
\.


--
-- TOC entry 4879 (class 0 OID 25017)
-- Dependencies: 218
-- Data for Name: CartItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CartItem" ("CartItemID", "CartID", "BookID", "Quantity") FROM stdin;
\.


--
-- TOC entry 4880 (class 0 OID 25032)
-- Dependencies: 219
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" ("OrderID", "UserID", "BookID", "Price") FROM stdin;
\.


--
-- TOC entry 4881 (class 0 OID 25047)
-- Dependencies: 220
-- Data for Name: OrderBook; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderBook" ("OrderBookID", "OrderID", "BookID", "Quantity") FROM stdin;
\.


--
-- TOC entry 4882 (class 0 OID 25062)
-- Dependencies: 221
-- Data for Name: PaymentTransaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PaymentTransaction" ("TransactionID", "Date", "OrderID", payment_method) FROM stdin;
\.


--
-- TOC entry 4876 (class 0 OID 24979)
-- Dependencies: 215
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" ("UserID", "Name ", "Gmail", "PassWord") FROM stdin;
\.


--
-- TOC entry 4712 (class 2606 OID 24985)
-- Name: User UserID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "UserID" PRIMARY KEY ("UserID");


--
-- TOC entry 4718 (class 2606 OID 25021)
-- Name: CartItem pk_CartItem; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "pk_CartItem" PRIMARY KEY ("CartItemID");


--
-- TOC entry 4714 (class 2606 OID 25006)
-- Name: Book pk_book; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Book"
    ADD CONSTRAINT pk_book PRIMARY KEY ("BookID");


--
-- TOC entry 4716 (class 2606 OID 25011)
-- Name: Cart pk_cart; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT pk_cart PRIMARY KEY ("CartID");


--
-- TOC entry 4720 (class 2606 OID 25036)
-- Name: Order pk_order; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT pk_order PRIMARY KEY ("OrderID");


--
-- TOC entry 4722 (class 2606 OID 25051)
-- Name: OrderBook pk_orderbook; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderBook"
    ADD CONSTRAINT pk_orderbook PRIMARY KEY ("OrderBookID");


--
-- TOC entry 4724 (class 2606 OID 25066)
-- Name: PaymentTransaction pk_paymentTransaction; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PaymentTransaction"
    ADD CONSTRAINT "pk_paymentTransaction" PRIMARY KEY ("TransactionID");


--
-- TOC entry 4726 (class 2606 OID 25027)
-- Name: CartItem fk_book; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT fk_book FOREIGN KEY ("BookID") REFERENCES public."Book"("BookID");


--
-- TOC entry 4728 (class 2606 OID 25042)
-- Name: Order fk_book; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT fk_book FOREIGN KEY ("BookID") REFERENCES public."Book"("BookID");


--
-- TOC entry 4727 (class 2606 OID 25022)
-- Name: CartItem fk_cart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT fk_cart FOREIGN KEY ("CartID") REFERENCES public."Cart"("CartID");


--
-- TOC entry 4730 (class 2606 OID 25052)
-- Name: OrderBook fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderBook"
    ADD CONSTRAINT fk_order FOREIGN KEY ("OrderID") REFERENCES public."Order"("OrderID");


--
-- TOC entry 4732 (class 2606 OID 25067)
-- Name: PaymentTransaction fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PaymentTransaction"
    ADD CONSTRAINT fk_order FOREIGN KEY ("OrderID") REFERENCES public."Order"("OrderID");


--
-- TOC entry 4731 (class 2606 OID 25057)
-- Name: OrderBook fk_orderbook; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderBook"
    ADD CONSTRAINT fk_orderbook FOREIGN KEY ("BookID") REFERENCES public."Book"("BookID");


--
-- TOC entry 4725 (class 2606 OID 25012)
-- Name: Cart fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT fk_user FOREIGN KEY ("UserID") REFERENCES public."User"("UserID") NOT VALID;


--
-- TOC entry 4729 (class 2606 OID 25037)
-- Name: Order fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT fk_user FOREIGN KEY ("UserID") REFERENCES public."User"("UserID");


-- Completed on 2025-04-21 21:55:16

--
-- PostgreSQL database dump complete
--

