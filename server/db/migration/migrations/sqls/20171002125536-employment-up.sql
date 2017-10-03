CREATE TABLE employment (
"country_iso" varchar(3) REFERENCES country(country_iso) NOT NULL,
"row_name" text,
"1990_total_placeholder" numeric,
"1990_female" numeric,
"1990_male" numeric,
"2000_total_placeholder" numeric,
"2000_female" numeric,
"2000_male" numeric,
"2010_total_placeholder" numeric,
"2010_female" numeric,
"2010_male" numeric,
"2015_total_placeholder" numeric,
"2015_female" numeric,
"2015_male" numeric,
PRIMARY KEY (country_iso, row_name));
