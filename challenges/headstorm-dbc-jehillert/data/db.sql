--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.5 (Ubuntu 11.5-1.pgdg18.04+1)

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

SET default_with_oids = false;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: jeh
--

CREATE TABLE public.customer (
    id integer NOT NULL,
    record_id integer NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    cell_phone text DEFAULT ''::text NOT NULL,
    work_phone text DEFAULT ''::text NOT NULL,
    email text DEFAULT ''::text NOT NULL,
    address text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.customer OWNER TO jeh;

--
-- Name: customer_id_seq; Type: SEQUENCE; Schema: public; Owner: jeh
--

CREATE SEQUENCE public.customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_id_seq OWNER TO jeh;

--
-- Name: customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jeh
--

ALTER SEQUENCE public.customer_id_seq OWNED BY public.customer.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: jeh
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    record_id integer NOT NULL,
    order_type text DEFAULT ''::text NOT NULL,
    quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.orders OWNER TO jeh;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: jeh
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO jeh;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jeh
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: records; Type: TABLE; Schema: public; Owner: jeh
--

CREATE TABLE public.records (
    id integer NOT NULL,
    record_id integer NOT NULL
);


ALTER TABLE public.records OWNER TO jeh;

--
-- Name: records_id_seq; Type: SEQUENCE; Schema: public; Owner: jeh
--

CREATE SEQUENCE public.records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.records_id_seq OWNER TO jeh;

--
-- Name: records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jeh
--

ALTER SEQUENCE public.records_id_seq OWNED BY public.records.id;


--
-- Name: customer id; Type: DEFAULT; Schema: public; Owner: jeh
--

ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: jeh
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: records id; Type: DEFAULT; Schema: public; Owner: jeh
--

ALTER TABLE ONLY public.records ALTER COLUMN id SET DEFAULT nextval('public.records_id_seq'::regclass);


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: jeh
--

COPY public.customer (id, record_id, name, cell_phone, work_phone, email, address) FROM stdin;
1	1234	Joe Smith	405.867.5309	123.123.1234	joe_s@gmail.com	123 Vic Way, Dallas TX 75001
2	1236	John Oliver	555.121.3929	555.212.3333	john.oliver@hbo.com	528 West 57th St., New York NY 75001
3	1235	Grimace VanderWorker	405.867.5309	123.123.1234	joe_s@gmail.com	123 Vic Way, Dallas TX 75001
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: jeh
--

COPY public.orders (id, record_id, order_type, quantity) FROM stdin;
1	1234	Basic Widget	37
2	1234	Advanced Widget	12
3	1236	Basic Widget	2000000
4	1236	Advanced Widget	15000000
5	1235	Basic Widget	0
6	1235	Advanced Widget	0
\.


--
-- Data for Name: records; Type: TABLE DATA; Schema: public; Owner: jeh
--

COPY public.records (id, record_id) FROM stdin;
1	1234
2	1236
3	1235
\.


--
-- Name: customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jeh
--

SELECT pg_catalog.setval('public.customer_id_seq', 3, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jeh
--

SELECT pg_catalog.setval('public.orders_id_seq', 6, true);


--
-- Name: records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jeh
--

SELECT pg_catalog.setval('public.records_id_seq', 3, true);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: jeh
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: jeh
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: records records_pkey; Type: CONSTRAINT; Schema: public; Owner: jeh
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_pkey PRIMARY KEY (id);


--
-- Name: records records_record_id_key; Type: CONSTRAINT; Schema: public; Owner: jeh
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_record_id_key UNIQUE (record_id);


--
-- Name: customer fk_record_id; Type: FK CONSTRAINT; Schema: public; Owner: jeh
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT fk_record_id FOREIGN KEY (record_id) REFERENCES public.records(record_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders fk_record_id; Type: FK CONSTRAINT; Schema: public; Owner: jeh
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_record_id FOREIGN KEY (record_id) REFERENCES public.records(record_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

