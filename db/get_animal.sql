-- Table: public.animals

-- DROP TABLE public.animals;

CREATE TABLE public.animals
(
    animal_id bigint NOT NULL DEFAULT nextval('animals_animal_id_seq'::regclass),
    animal_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    in_stock character varying(10) COLLATE pg_catalog."default" NOT NULL,
    image_url character varying(200) COLLATE pg_catalog."default" NOT NULL,
    cart_position integer NOT NULL,
    CONSTRAINT animals_pkey PRIMARY KEY (animal_id)
)

ALTER TABLE public.animals