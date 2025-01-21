#!/bin/bash
set -e

echo "Initializing database..."
psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "postgres" <<-EOSQL
     -- Create the 'petcare_admin' role with a password from the environment variable
    CREATE ROLE $DB_USERNAME WITH LOGIN PASSWORD '$DB_PASSWORD';
    
    -- Allow the role to create databases
    ALTER ROLE $DB_USERNAME CREATEDB;

    -- Create the required databases and assign ownership to the role
    CREATE DATABASE $DB_NAME OWNER $DB_USERNAME;
    CREATE DATABASE petcare_test OWNER $DB_USERNAME;
EOSQL

echo "Database initialization complete"