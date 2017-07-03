# FRA Platform

## Prerequisites

First, [install Yarn](https://yarnpkg.com/en/docs/install) (modern npm
replacement).

Then, install [NodeJs](https://nodejs.org/en/download/) (currently the
LTS version we are using is 6.x).

## Building web application

To build it once:

```yarn run build```

To constantly build it when something changes, run:

```yarn watch```

## Running the server

```node server/server.js```

## Database

### Create your own local datbase

If you have a Docker server configured locally, just run this command:

```sudo docker run -d --name frap-dev-db -p 5442:5432 -e POSTGRES_DB=frap-dev -e POSTGRES_PASSWORD=frap -e POSTGRES_USER=frap postgres:9.6```

Otherwise, check `.env` configurations for setting it up manually (note that the server port is not default!)

### Migrations

Migrations are run automatically on startup of the server.

### Adding a database migration

When you need e.g. a new table to the database (say "kuikka"), create a migration
template with:

```yarn run create-migration kuikka```

Now you'll see new sql files in `db/migration/migrations/sql/<timestamp>-kuikka-<up/down>.sql`

You should edit the `<timestamp-kuikka-up.sql` to contain your `create table` -statement. Maybe also
add the corresponding `drop table` to `<timestamp>-kuikka-down.sql` if we ever want to run migrations downwards.


## Design decisions

* all numeric values for areas are stored in hectares, and converted for UI for user unnits
* Data points are stored in precision of year

## Icons

https://nucleoapp.com

### Add icon to set

Video: https://fraplatform.slack.com/files/mlindholm/F5M13AE7L/add-icon-to-set.mov

* Select the icon you like, making sure it's from the 16px set
* Add to Projects
* Select `FRA Platform`

### Export icon set

Video: https://fraplatform.slack.com/files/mlindholm/F5MQSQ0JJ/export-icon-set.mov

* Go to Projects > FRA Platform
* Select all & Download
* Settings: https://fraplatform.slack.com/files/mlindholm/F5LUBPDPD/export-icon-set-settings.png
* Download & Unzip
* Move `icon.svg, demo.svg` to `/img`
* Run `update-icons.sh`

## Using the traditional table framework

FRA Platform contains a simple framework for creating tables with
fixed amount of rows and columns. These tables can store and retrieve
their own data so it reduces the need to custom-code the logic for
these simple cases. [The user guide is here](doc/traditional-table-guide.md).
