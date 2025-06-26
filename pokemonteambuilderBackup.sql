--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: AuthToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AuthToken" (
    id integer NOT NULL,
    token character varying(255) NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."AuthToken" OWNER TO postgres;

--
-- Name: AuthToken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AuthToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AuthToken_id_seq" OWNER TO postgres;

--
-- Name: AuthToken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AuthToken_id_seq" OWNED BY public."AuthToken".id;


--
-- Name: ability; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ability (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.ability OWNER TO postgres;

--
-- Name: ability_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ability_id_seq OWNER TO postgres;

--
-- Name: ability_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ability_id_seq OWNED BY public.ability.id;


--
-- Name: attack; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attack (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    accuarcy integer,
    power integer,
    class character varying(255) NOT NULL,
    "typeId" integer NOT NULL
);


ALTER TABLE public.attack OWNER TO postgres;

--
-- Name: attackXPokemon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."attackXPokemon" (
    id integer NOT NULL,
    "attackId" integer NOT NULL,
    "pokemonId" integer NOT NULL
);


ALTER TABLE public."attackXPokemon" OWNER TO postgres;

--
-- Name: attackXPokemon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."attackXPokemon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."attackXPokemon_id_seq" OWNER TO postgres;

--
-- Name: attackXPokemon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."attackXPokemon_id_seq" OWNED BY public."attackXPokemon".id;


--
-- Name: attack_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attack_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attack_id_seq OWNER TO postgres;

--
-- Name: attack_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attack_id_seq OWNED BY public.attack.id;


--
-- Name: attribute; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attribute (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    value integer NOT NULL
);


ALTER TABLE public.attribute OWNER TO postgres;

--
-- Name: attribute_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attribute_id_seq OWNER TO postgres;

--
-- Name: attribute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attribute_id_seq OWNED BY public.attribute.id;


--
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    "imageUrl" character varying(255) NOT NULL
);


ALTER TABLE public.item OWNER TO postgres;

--
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_id_seq OWNER TO postgres;

--
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;


--
-- Name: nature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nature (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.nature OWNER TO postgres;

--
-- Name: nature_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nature_id_seq OWNER TO postgres;

--
-- Name: nature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nature_id_seq OWNED BY public.nature.id;


--
-- Name: pokemon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pokemon (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "typeId" integer NOT NULL,
    "imageUrl" character varying(255),
    hp integer NOT NULL,
    attack integer NOT NULL,
    defense integer NOT NULL,
    "specialAttack" integer NOT NULL,
    "specialDefense" integer NOT NULL,
    speed integer NOT NULL,
    "previousFormId" integer,
    "type2Id" integer
);


ALTER TABLE public.pokemon OWNER TO postgres;

--
-- Name: pokemonBaseStats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pokemonBaseStats" (
    id integer NOT NULL,
    "pokemonId" integer NOT NULL,
    "attributeId" integer NOT NULL,
    value integer NOT NULL
);


ALTER TABLE public."pokemonBaseStats" OWNER TO postgres;

--
-- Name: pokemonBaseStats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."pokemonBaseStats_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."pokemonBaseStats_id_seq" OWNER TO postgres;

--
-- Name: pokemonBaseStats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."pokemonBaseStats_id_seq" OWNED BY public."pokemonBaseStats".id;


--
-- Name: pokemonEV; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pokemonEV" (
    id integer NOT NULL,
    "pokemonXTeamId" integer NOT NULL,
    hp integer NOT NULL,
    attack integer NOT NULL,
    defense integer NOT NULL,
    "specialAttack" integer NOT NULL,
    "specialDefense" integer NOT NULL,
    speed integer NOT NULL
);


ALTER TABLE public."pokemonEV" OWNER TO postgres;

--
-- Name: pokemonEV_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."pokemonEV_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."pokemonEV_id_seq" OWNER TO postgres;

--
-- Name: pokemonEV_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."pokemonEV_id_seq" OWNED BY public."pokemonEV".id;


--
-- Name: pokemonIV; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pokemonIV" (
    id integer NOT NULL,
    "pokemonXTeamId" integer NOT NULL,
    hp integer NOT NULL,
    attack integer NOT NULL,
    defense integer NOT NULL,
    "specialAttack" integer NOT NULL,
    "specialDefense" integer NOT NULL,
    speed integer NOT NULL
);


ALTER TABLE public."pokemonIV" OWNER TO postgres;

--
-- Name: pokemonIV_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."pokemonIV_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."pokemonIV_id_seq" OWNER TO postgres;

--
-- Name: pokemonIV_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."pokemonIV_id_seq" OWNED BY public."pokemonIV".id;


--
-- Name: pokemonXAbility; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pokemonXAbility" (
    id integer NOT NULL,
    "pokemonId" integer NOT NULL,
    "abilityId" integer NOT NULL
);


ALTER TABLE public."pokemonXAbility" OWNER TO postgres;

--
-- Name: pokemonXAbility_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."pokemonXAbility_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."pokemonXAbility_id_seq" OWNER TO postgres;

--
-- Name: pokemonXAbility_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."pokemonXAbility_id_seq" OWNED BY public."pokemonXAbility".id;


--
-- Name: pokemonXTeam; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pokemonXTeam" (
    id integer NOT NULL,
    "teamId" integer NOT NULL,
    "pokemonId" integer NOT NULL,
    alias character varying(255),
    "objectId" integer,
    "natureId" integer,
    "abilityId" integer,
    "itemId" integer
);


ALTER TABLE public."pokemonXTeam" OWNER TO postgres;

--
-- Name: pokemonXTeamXAttack; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pokemonXTeamXAttack" (
    id integer NOT NULL,
    "pokemonXTeamId" integer NOT NULL,
    "attackId" integer NOT NULL
);


ALTER TABLE public."pokemonXTeamXAttack" OWNER TO postgres;

--
-- Name: pokemonXTeamXAttack_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."pokemonXTeamXAttack_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."pokemonXTeamXAttack_id_seq" OWNER TO postgres;

--
-- Name: pokemonXTeamXAttack_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."pokemonXTeamXAttack_id_seq" OWNED BY public."pokemonXTeamXAttack".id;


--
-- Name: pokemonXTeam_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."pokemonXTeam_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."pokemonXTeam_id_seq" OWNER TO postgres;

--
-- Name: pokemonXTeam_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."pokemonXTeam_id_seq" OWNED BY public."pokemonXTeam".id;


--
-- Name: pokemonXType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pokemonXType" (
    id integer NOT NULL,
    "pokemonId" integer NOT NULL,
    "typeId" integer NOT NULL
);


ALTER TABLE public."pokemonXType" OWNER TO postgres;

--
-- Name: pokemonXType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."pokemonXType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."pokemonXType_id_seq" OWNER TO postgres;

--
-- Name: pokemonXType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."pokemonXType_id_seq" OWNED BY public."pokemonXType".id;


--
-- Name: pokemon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pokemon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pokemon_id_seq OWNER TO postgres;

--
-- Name: pokemon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pokemon_id_seq OWNED BY public.pokemon.id;


--
-- Name: team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.team OWNER TO postgres;

--
-- Name: team_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.team_id_seq OWNER TO postgres;

--
-- Name: team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.team_id_seq OWNED BY public.team.id;


--
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "imageUrl" character varying(255) NOT NULL
);


ALTER TABLE public.type OWNER TO postgres;

--
-- Name: type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.type_id_seq OWNER TO postgres;

--
-- Name: type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_id_seq OWNED BY public.type.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: AuthToken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken" ALTER COLUMN id SET DEFAULT nextval('public."AuthToken_id_seq"'::regclass);


--
-- Name: ability id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ability ALTER COLUMN id SET DEFAULT nextval('public.ability_id_seq'::regclass);


--
-- Name: attack id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attack ALTER COLUMN id SET DEFAULT nextval('public.attack_id_seq'::regclass);


--
-- Name: attackXPokemon id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."attackXPokemon" ALTER COLUMN id SET DEFAULT nextval('public."attackXPokemon_id_seq"'::regclass);


--
-- Name: attribute id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attribute ALTER COLUMN id SET DEFAULT nextval('public.attribute_id_seq'::regclass);


--
-- Name: item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);


--
-- Name: nature id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nature ALTER COLUMN id SET DEFAULT nextval('public.nature_id_seq'::regclass);


--
-- Name: pokemon id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pokemon ALTER COLUMN id SET DEFAULT nextval('public.pokemon_id_seq'::regclass);


--
-- Name: pokemonBaseStats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonBaseStats" ALTER COLUMN id SET DEFAULT nextval('public."pokemonBaseStats_id_seq"'::regclass);


--
-- Name: pokemonEV id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonEV" ALTER COLUMN id SET DEFAULT nextval('public."pokemonEV_id_seq"'::regclass);


--
-- Name: pokemonIV id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonIV" ALTER COLUMN id SET DEFAULT nextval('public."pokemonIV_id_seq"'::regclass);


--
-- Name: pokemonXAbility id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXAbility" ALTER COLUMN id SET DEFAULT nextval('public."pokemonXAbility_id_seq"'::regclass);


--
-- Name: pokemonXTeam id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeam" ALTER COLUMN id SET DEFAULT nextval('public."pokemonXTeam_id_seq"'::regclass);


--
-- Name: pokemonXTeamXAttack id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeamXAttack" ALTER COLUMN id SET DEFAULT nextval('public."pokemonXTeamXAttack_id_seq"'::regclass);


--
-- Name: pokemonXType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXType" ALTER COLUMN id SET DEFAULT nextval('public."pokemonXType_id_seq"'::regclass);


--
-- Name: team id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team ALTER COLUMN id SET DEFAULT nextval('public.team_id_seq'::regclass);


--
-- Name: type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type ALTER COLUMN id SET DEFAULT nextval('public.type_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: AuthToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AuthToken" (id, token, "userId") FROM stdin;
1	1610pmxodl5s	1
2	1dfn2t3xkzt6	1
3	1ldl5cn9on7	1
4	1mi69nxfkbkf	1
5	11f7m99wofwg	1
6	1zlg01zhm9fm	1
7	1kmahphery1	1
\.


--
-- Data for Name: ability; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ability (id, name, description) FROM stdin;
1	Alcoholico	Llega yema a la pelea
2	Powerpoint master	Te enseña C++ en media hora con powerpoints
3	Mirada de la muerte	Como la del vengador fantasma
4	Regenerador	Se regenera xd
5	Bailarin	Baila en el festival nur
\.


--
-- Data for Name: attack; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attack (id, name, description, accuarcy, power, class, "typeId") FROM stdin;
\.


--
-- Data for Name: attackXPokemon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."attackXPokemon" (id, "attackId", "pokemonId") FROM stdin;
\.


--
-- Data for Name: attribute; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attribute (id, name, value) FROM stdin;
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item (id, name, description, "imageUrl") FROM stdin;
1	torta	torta de chocolate xd	/uploads/imageUrl-1750744653098-950135131.png
2	diamante	carisimo bro	/uploads/imageUrl-1750744826634-520864039.png
\.


--
-- Data for Name: nature; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nature (id, name, description) FROM stdin;
1	serious	
2	quirky	
\.


--
-- Data for Name: pokemon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pokemon (id, name, "typeId", "imageUrl", hp, attack, defense, "specialAttack", "specialDefense", speed, "previousFormId", "type2Id") FROM stdin;
1	charmander	1	/uploads/imageUrl-1750657887688-513263042.png	39	52	43	60	50	65	\N	\N
2	eevee	3	/uploads/imageUrl-1750742122001-531908938.png	55	55	50	45	65	55	\N	\N
3	squirtle	2	/uploads/imageUrl-1750793055628-997395703.png	44	48	65	50	64	43	\N	\N
4	machop	4	/uploads/imageUrl-1750793560266-459162784.png	70	80	50	35	35	35	\N	\N
5	machoke	4	/uploads/imageUrl-1750793691784-85433331.png	80	100	70	50	60	45	4	\N
6	machamp	4	/uploads/imageUrl-1750793804735-680394388.png	90	130	80	65	85	55	4	\N
\.


--
-- Data for Name: pokemonBaseStats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pokemonBaseStats" (id, "pokemonId", "attributeId", value) FROM stdin;
\.


--
-- Data for Name: pokemonEV; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pokemonEV" (id, "pokemonXTeamId", hp, attack, defense, "specialAttack", "specialDefense", speed) FROM stdin;
\.


--
-- Data for Name: pokemonIV; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pokemonIV" (id, "pokemonXTeamId", hp, attack, defense, "specialAttack", "specialDefense", speed) FROM stdin;
\.


--
-- Data for Name: pokemonXAbility; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pokemonXAbility" (id, "pokemonId", "abilityId") FROM stdin;
\.


--
-- Data for Name: pokemonXTeam; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pokemonXTeam" (id, "teamId", "pokemonId", alias, "objectId", "natureId", "abilityId", "itemId") FROM stdin;
1	1	1	charmandersito	1	1	1	\N
2	1	2	cachuchin	2	1	4	\N
\.


--
-- Data for Name: pokemonXTeamXAttack; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pokemonXTeamXAttack" (id, "pokemonXTeamId", "attackId") FROM stdin;
\.


--
-- Data for Name: pokemonXType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pokemonXType" (id, "pokemonId", "typeId") FROM stdin;
\.


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team (id, name, "userId") FROM stdin;
1	team1	1
\.


--
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type (id, name, "imageUrl") FROM stdin;
1	fuego	/uploads/imageUrl-1750390246288-371076607.png
2	agua	/uploads/imageUrl-1750390328822-97104985.png
3	normal	/uploads/imageUrl-1750390351693-674484601.png
4	lucha	/uploads/imageUrl-1750390361402-946713361.png
5	volador	/uploads/imageUrl-1750390383561-974682647.png
6	veneno	/uploads/imageUrl-1750390397789-87272419.png
7	tierra	/uploads/imageUrl-1750390409601-925390007.png
8	roca	/uploads/imageUrl-1750390420546-77791323.png
9	bicho	/uploads/imageUrl-1750390435991-16208050.png
10	fantasma	/uploads/imageUrl-1750390448084-264898459.png
11	acero	/uploads/imageUrl-1750390457812-899068789.png
12	planta	/uploads/imageUrl-1750390469335-371381400.png
13	electricidad	/uploads/imageUrl-1750390481503-152051166.png
14	psiquico	/uploads/imageUrl-1750390491485-136773867.png
15	hielo	/uploads/imageUrl-1750390501422-90518960.png
16	dragon	/uploads/imageUrl-1750390509983-817219364.png
17	oscuro	/uploads/imageUrl-1750390519943-828410395.png
18	hada	/uploads/imageUrl-1750390528388-146994248.png
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, email, password, "isAdmin") FROM stdin;
1	pol	pol@test.com	$2b$10$V1ozshpYLNDhu4qWB/j/Gu6qgfjAWaIldg2AZKdU93HUS2ujxhNGS	f
\.


--
-- Name: AuthToken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AuthToken_id_seq"', 7, true);


--
-- Name: ability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ability_id_seq', 5, true);


--
-- Name: attackXPokemon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."attackXPokemon_id_seq"', 1, false);


--
-- Name: attack_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attack_id_seq', 1, false);


--
-- Name: attribute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attribute_id_seq', 1, false);


--
-- Name: item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_id_seq', 2, true);


--
-- Name: nature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nature_id_seq', 2, true);


--
-- Name: pokemonBaseStats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."pokemonBaseStats_id_seq"', 1, false);


--
-- Name: pokemonEV_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."pokemonEV_id_seq"', 1, false);


--
-- Name: pokemonIV_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."pokemonIV_id_seq"', 1, false);


--
-- Name: pokemonXAbility_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."pokemonXAbility_id_seq"', 1, false);


--
-- Name: pokemonXTeamXAttack_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."pokemonXTeamXAttack_id_seq"', 1, false);


--
-- Name: pokemonXTeam_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."pokemonXTeam_id_seq"', 2, true);


--
-- Name: pokemonXType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."pokemonXType_id_seq"', 1, false);


--
-- Name: pokemon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pokemon_id_seq', 6, true);


--
-- Name: team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.team_id_seq', 1, true);


--
-- Name: type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_id_seq', 18, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- Name: AuthToken AuthToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_pkey" PRIMARY KEY (id);


--
-- Name: AuthToken AuthToken_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key1" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key10" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key11" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key12" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key13" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key14" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key15" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key16" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key17" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key18" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key19" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key2" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key20" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key21" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key22" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key23" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key24" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key25" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key26" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key27" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key3" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key4" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key5" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key6" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key7" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key8" UNIQUE (token);


--
-- Name: AuthToken AuthToken_token_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthToken"
    ADD CONSTRAINT "AuthToken_token_key9" UNIQUE (token);


--
-- Name: ability ability_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ability
    ADD CONSTRAINT ability_pkey PRIMARY KEY (id);


--
-- Name: attackXPokemon attackXPokemon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."attackXPokemon"
    ADD CONSTRAINT "attackXPokemon_pkey" PRIMARY KEY (id);


--
-- Name: attack attack_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attack
    ADD CONSTRAINT attack_pkey PRIMARY KEY (id);


--
-- Name: attribute attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attribute
    ADD CONSTRAINT attribute_pkey PRIMARY KEY (id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- Name: nature nature_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nature
    ADD CONSTRAINT nature_pkey PRIMARY KEY (id);


--
-- Name: pokemonBaseStats pokemonBaseStats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonBaseStats"
    ADD CONSTRAINT "pokemonBaseStats_pkey" PRIMARY KEY (id);


--
-- Name: pokemonEV pokemonEV_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonEV"
    ADD CONSTRAINT "pokemonEV_pkey" PRIMARY KEY (id);


--
-- Name: pokemonIV pokemonIV_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonIV"
    ADD CONSTRAINT "pokemonIV_pkey" PRIMARY KEY (id);


--
-- Name: pokemonXAbility pokemonXAbility_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXAbility"
    ADD CONSTRAINT "pokemonXAbility_pkey" PRIMARY KEY (id);


--
-- Name: pokemonXTeamXAttack pokemonXTeamXAttack_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeamXAttack"
    ADD CONSTRAINT "pokemonXTeamXAttack_pkey" PRIMARY KEY (id);


--
-- Name: pokemonXTeam pokemonXTeam_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeam"
    ADD CONSTRAINT "pokemonXTeam_pkey" PRIMARY KEY (id);


--
-- Name: pokemonXType pokemonXType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXType"
    ADD CONSTRAINT "pokemonXType_pkey" PRIMARY KEY (id);


--
-- Name: pokemon pokemon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pokemon
    ADD CONSTRAINT pokemon_pkey PRIMARY KEY (id);


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);


--
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: attackXPokemon attackXPokemon_attackId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."attackXPokemon"
    ADD CONSTRAINT "attackXPokemon_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES public.attack(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: attackXPokemon attackXPokemon_pokemonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."attackXPokemon"
    ADD CONSTRAINT "attackXPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES public.pokemon(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: attack attack_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attack
    ADD CONSTRAINT "attack_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public.type(id) ON UPDATE CASCADE;


--
-- Name: pokemonEV pokemonEV_pokemonXTeamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonEV"
    ADD CONSTRAINT "pokemonEV_pokemonXTeamId_fkey" FOREIGN KEY ("pokemonXTeamId") REFERENCES public."pokemonXTeam"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemonIV pokemonIV_pokemonXTeamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonIV"
    ADD CONSTRAINT "pokemonIV_pokemonXTeamId_fkey" FOREIGN KEY ("pokemonXTeamId") REFERENCES public."pokemonXTeam"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemonXAbility pokemonXAbility_abilityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXAbility"
    ADD CONSTRAINT "pokemonXAbility_abilityId_fkey" FOREIGN KEY ("abilityId") REFERENCES public.ability(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemonXAbility pokemonXAbility_pokemonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXAbility"
    ADD CONSTRAINT "pokemonXAbility_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES public.pokemon(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemonXTeamXAttack pokemonXTeamXAttack_attackId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeamXAttack"
    ADD CONSTRAINT "pokemonXTeamXAttack_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES public.attack(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemonXTeamXAttack pokemonXTeamXAttack_pokemonXTeamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeamXAttack"
    ADD CONSTRAINT "pokemonXTeamXAttack_pokemonXTeamId_fkey" FOREIGN KEY ("pokemonXTeamId") REFERENCES public."pokemonXTeam"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemonXTeam pokemonXTeam_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeam"
    ADD CONSTRAINT "pokemonXTeam_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.item(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: pokemonXTeam pokemonXTeam_natureId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeam"
    ADD CONSTRAINT "pokemonXTeam_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES public.nature(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: pokemonXTeam pokemonXTeam_pokemonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeam"
    ADD CONSTRAINT "pokemonXTeam_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES public.pokemon(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemonXTeam pokemonXTeam_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXTeam"
    ADD CONSTRAINT "pokemonXTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public.team(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemonXType pokemonXType_pokemonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXType"
    ADD CONSTRAINT "pokemonXType_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES public.pokemon(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemonXType pokemonXType_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pokemonXType"
    ADD CONSTRAINT "pokemonXType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public.type(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team team_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT "team_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

