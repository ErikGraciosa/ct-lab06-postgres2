DROP TABLE IF EXISTS beers;

CREATE TABLE beers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brewery TEXT NOT NULL,
    beername TEXT NOT NULL
);
