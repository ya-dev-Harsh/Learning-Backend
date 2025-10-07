# PostgreSQL — Comprehensive README

> **Short description:** PostgreSQL ("Postgres") is an advanced open-source relational database system with strong standards compliance, extensibility, and a large ecosystem of extensions (PostGIS, pg_trgm, etc.). This README gives a concise but detailed reference to PostgreSQL’s datatypes, common commands, examples, administration tips, and typical methods (backups, indexing, maintenance).

---

## Table of contents

1. [Quick start & installation notes](#quick-start--installation-notes)
2. [Connecting to PostgreSQL (psql and connection strings)](#connecting-to-postgresql-psql-and-connection-strings)
3. [Basic SQL workflow & commands (DDL, DML, DCL, TCL)](#basic-sql-workflow--commands)
4. [Postgres datatypes — explained with examples](#postgres-datatypes--explained-with-examples)
5. [Constraints, indexes and performance features](#constraints-indexes-and-performance-features)
6. [Transactions, concurrency & locking](#transactions-concurrency--locking)
7. [Functions, procedures, triggers and views](#functions-procedures-triggers-and-views)
8. [JSON, arrays, and document-style features](#json-arrays-and-document-style-features)
9. [Full-text search and trigram search (brief)](#full-text-search-and-trigram-search-brief)
10. [Backup & restore methods](#backup--restore-methods)
11. [Replication & high-availability (overview)](#replication--high-availability-overview)


---

## Quick start & installation notes

* Postgres runs on Linux, macOS, Windows and many cloud providers (managed services like Amazon RDS / Aurora, Google Cloud SQL, Azure Database for PostgreSQL).
* Typical quick local install:

  * macOS: `brew install postgresql`
  * Debian/Ubuntu: `sudo apt install postgresql`
  * Windows: use the EnterpriseDB installer or package managers.
* The server runs as a `postgres` service. Default DB superuser: `postgres`.
* After install, initialize the cluster (if not auto-initialized) and start the service, then use `psql` or a GUI client.

---

## Connecting to PostgreSQL (psql and connection strings)

### psql (command-line client)

```bash
# Drop into psql as the postgres user (local):
sudo -u postgres psql

# Or connect explicitly:
psql -h localhost -p 5432 -U myuser -d mydb
```

### Typical connection URI (libpq format)

```
postgresql://user:password@host:port/dbname?sslmode=prefer
```

* Example: `postgresql://harsh:secret@db.example.com:5432/myapp?sslmode=require`

---

## Basic SQL workflow & commands

PostgreSQL supports standard SQL (DDL, DML) plus many extensions.

### DDL — Data Definition Language

* `CREATE DATABASE dbname;`
* `DROP DATABASE dbname;`
* `CREATE SCHEMA myschema;`
* `CREATE TABLE t (...);` / `ALTER TABLE ...` / `DROP TABLE ...`

### DML — Data Manipulation Language

* `INSERT INTO`, `SELECT`, `UPDATE`, `DELETE`
* `COPY` for bulk import/export

### DCL & TCL

* `GRANT` / `REVOKE` for privileges
* Transactions: `BEGIN`, `COMMIT`, `ROLLBACK`

Example — create database and table:

```sql
CREATE DATABASE bookstore;
\c bookstore  -- psql meta-command to connect to bookstore

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  published_date DATE,
  price NUMERIC(8,2)
);
```

---

## PostgreSQL datatypes — explained with examples

This section lists common Postgres datatypes and when to use them.

### 1. Numeric types

* `smallint` — 2 bytes, range -32,768 to 32,767. Use for small integer values.
* `integer` (aka `int`) — 4 bytes. Most common integer type.
* `bigint` — 8 bytes. Use for large counters or IDs requiring >2B.
* `serial`, `bigserial` — convenience pseudo-types that create sequences (auto-increment).
* `numeric(precision, scale)` — arbitrary precision fixed-point (money/financial data). e.g. `numeric(10,2)`.
* `real` (4 bytes float), `double precision` (8 bytes float).

**Example:** `price NUMERIC(9,2)` for money.

### 2. Monetary

* `money` — currency type, locale-aware. Many prefer `numeric` for portability.

### 3. Character types

* `varchar(n)` — variable-length, with limit n.
* `character(n)` (fixed-length) — rarely used.
* `text` — unlimited-length string; most commonly used in Postgres.

### 4. Boolean

* `boolean` — `TRUE`, `FALSE`, or `NULL`.

### 5. Date/Time

* `date` — date only.
* `time [ (p) ] [ without time zone | with time zone ]` — time of day.
* `timestamp [ (p) ] [ without time zone | with time zone ]` — date + time. Important: `timestamp with time zone` stores UTC with conversion; prefer it for global apps.
* `interval` — spans of time (e.g., `interval '1 day 2 hours'`).

### 6. UUID

* `uuid` — Universally Unique Identifier, 128-bit. Generate with `gen_random_uuid()` (pgcrypto) or `uuid_generate_v4()` (uuid-ossp).

### 7. Arrays

* Any base type can be an array: `integer[]`, `text[]`.
* Example column: `tags TEXT[]`.

### 8. JSON / JSONB

* `json` and `jsonb` (binary JSON). `jsonb` supports indexing and is generally preferred for querying.

### 9. HSTORE

* `hstore` — key→value store for semi-structured data (extension).

### 10. Geometric, Network, XML, Range types

* `point`, `line`, `polygon` (geometric)
* `inet`, `cidr`, `macaddr` (network addresses)
* `xml` (XML documents)
* `int4range`, `numrange`, `tsrange` (range types) — useful for time ranges and exclusion constraints.

### 11. Enumerated types

* `CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');` — for constrained string-like values.

### 12. Composite types

* Created from table definitions or via `CREATE TYPE` AS (a,b,c).

---

## Constraints, indexes and performance features

### Constraints (declared on table)

* `PRIMARY KEY (col)` — unique + not null.
* `UNIQUE (col)` — enforces uniqueness.
* `NOT NULL`.
* `CHECK (expression)` — custom rule.
* `FOREIGN KEY (col) REFERENCES other(id)` — foreign key.
* `EXCLUDE USING gist (col WITH =)` — exclusion constraints (often combined with ranges).

### Index types

* `btree` — default, good for equality and range queries.
* `hash` — equality only (rarely used; improved in recent versions).
* `gin` — good for arrays, `jsonb` and full-text search documents.
* `gist` — geometric, range types, full-text support (R-tree-like).
* `brin` — extremely small index for very large tables where rows are naturally ordered (e.g., time-series data).

**Create index example:**

```sql
CREATE INDEX idx_books_author ON books (author);
CREATE INDEX idx_books_title_trgm ON books USING gin (title gin_trgm_ops);
```

### Partial & expression indexes

* Partial: `CREATE INDEX ON table (col) WHERE col IS NOT NULL;`
* Expression: `CREATE INDEX ON users ((lower(email)));` — speed up queries using `lower(email)`.

---

## Transactions, concurrency & locking

### Basic transaction control

```sql
BEGIN;
  -- multiple statements
COMMIT;
-- or
ROLLBACK;
```

### Isolation levels

* `READ UNCOMMITTED` (treated like `READ COMMITTED` in Postgres)
* `READ COMMITTED` (default)
* `REPEATABLE READ`
* `SERIALIZABLE` (strictest; may raise serialization errors requiring retry)

Set: `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;`

### Locks

* Row-level locks: `SELECT ... FOR UPDATE`, `FOR SHARE`.
* Table locks with `LOCK TABLE mytable IN SHARE MODE;` etc.
* Avoid long transactions; keep them short to reduce contention and bloat.

---

## Functions, procedures, triggers and views

### Functions (PL/pgSQL example)

```sql
CREATE OR REPLACE FUNCTION add_tax(subtotal numeric)
RETURNS numeric AS $$
BEGIN
  RETURN subtotal * 1.07;  -- add 7% tax
END;
$$ LANGUAGE plpgsql;

SELECT add_tax(100);
```

### Procedures (Postgres 11+)

* `CREATE PROCEDURE` can perform transactions inside using `CALL` but functions cannot use `COMMIT`/`ROLLBACK`.

### Triggers

```sql
CREATE TABLE audit_log (
  id serial PRIMARY KEY,
  table_name text,
  operation text,
  changed_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION audit_trigger_fn() RETURNS trigger AS $$
BEGIN
  INSERT INTO audit_log (table_name, operation) VALUES (TG_TABLE_NAME, TG_OP);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER books_audit
AFTER INSERT OR UPDATE OR DELETE ON books
FOR EACH ROW EXECUTE FUNCTION audit_trigger_fn();
```

### Views and Materialized Views

* `CREATE VIEW v AS SELECT ...;` — virtual table, always computed on access.
* `CREATE MATERIALIZED VIEW mv AS SELECT ...;` — stored result; refresh with `REFRESH MATERIALIZED VIEW mv;`.

---

## JSON, arrays, and document-style features

### JSONB usage examples

```sql
CREATE TABLE events (
  id serial PRIMARY KEY,
  payload jsonb
);

INSERT INTO events (payload) VALUES ('{"user": {"id": 1, "name": "A"}, "action": "login"}');

-- Query: find events where user.id = 1
SELECT * FROM events WHERE payload->'user'->>'id' = '1';

-- Better: index and jsonb containment
CREATE INDEX idx_events_payload_gin ON events USING gin (payload jsonb_path_ops);
SELECT * FROM events WHERE payload @> '{"action": "login"}';
```

### Arrays

```sql
CREATE TABLE posts (
  id serial PRIMARY KEY,
  tags text[]
);

INSERT INTO posts (tags) VALUES (ARRAY['sql','postgres','tutorial']);

-- Find posts that have 'postgres' tag
SELECT * FROM posts WHERE tags @> ARRAY['postgres'];
```

---

## Full-text search and trigram search (brief)

* Convert text to `tsvector` with `to_tsvector('english', col)`, then search with `to_tsquery('english', 'search & query')`.
* Index w/ GIN: `CREATE INDEX idx_docs_tsv ON docs USING gin (to_tsvector('english', content));`
* Trigram (`pg_trgm`) allows fast `ILIKE`/`%like%` searches with GIN/GIST.

Example:

```sql
SELECT * FROM docs WHERE to_tsvector('english', content) @@ to_tsquery('english', 'open & source');
```

---

## Backup & restore methods

### Logical backup (`pg_dump` / `pg_restore`)

* Dump a database:

```bash
pg_dump -Fc -f mydb.dump mydb   # -Fc is custom (compressed) format
```

* Restore:

```bash
pg_restore -d mydb_restored mydb.dump
```

* `pg_dumpall` dumps globals (roles, tablespaces).

### Plain SQL dump

```bash
pg_dump -f mydb.sql mydb
psql -f mydb.sql postgres  # restore from SQL file
```

### Physical backup (`pg_basebackup`)

* Byte-for-byte physical copy (used for replication standby setup). Requires stopping or WAL shipping.

**Tip:** Automate regular backups and test restores. Keep WAL segments if you need PITR (point-in-time recovery).

---

## Replication & high-availability (overview)

* Streaming replication (asynchronous or synchronous) with a primary and one or more replicas.
* Logical replication (pglogical / built-in logical replication) replicates data at SQL level (good for partial replication, upgrades).
* HA setups commonly use streaming replication + a failover manager (Patroni, repmgr) + virtual IP or proxy.

---

## Administration & maintenance commands

* `VACUUM` and `VACUUM (FULL)` — reclaim space; `VACUUM ANALYZE` updates planner statistics.
* `ANALYZE` — collect statistics for the planner.
* `REINDEX` — rebuild an index.
* `CLUSTER` — physically reorder table by an index (can improve locality).
* `pg_stat_activity` — view running queries.
* `EXPLAIN` / `EXPLAIN ANALYZE` — view the query plan and runtime.

**Example:**

```sql
EXPLAIN ANALYZE SELECT * FROM books WHERE author = 'Jane Doe';
```

---

## psql meta-commands cheat-sheet

(enter in the `psql` prompt)

* `\l` — list databases
* `\c dbname` — connect to database
* `\dt` — list tables
* `\d tablename` — describe table
* `\du` — list roles
* `\x` — toggle expanded output
* `\i filename.sql` — run SQL file
* `\copy` — client-side copy
* `\timing` — show query execution time

---

## Examples & recipes (copy-paste)

### Create a user/role and grant privileges

```sql
CREATE ROLE app_user WITH LOGIN PASSWORD 's3cr3t';
CREATE DATABASE appdb OWNER app_user;
GRANT CONNECT ON DATABASE appdb TO app_user;
-- On the database, grant schema/table rights:
\c appdb
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
```

### Add a column and backfill safely

```sql
ALTER TABLE users ADD COLUMN email_verified boolean DEFAULT false;
-- For large tables, avoid long locks; add column without default then set default separately
ALTER TABLE users ADD COLUMN email_verified boolean;
UPDATE users SET email_verified = false WHERE email_verified IS NULL;
ALTER TABLE users ALTER COLUMN email_verified SET DEFAULT false;
```

### Use JSONB containment and index

```sql
CREATE TABLE customers (id serial PRIMARY KEY, data jsonb);
INSERT INTO customers (data) VALUES ('{"name": "Alice", "vip": true}');
CREATE INDEX idx_customers_data_gin ON customers USING gin (data jsonb_path_ops);
SELECT * FROM customers WHERE data @> '{"vip": true}';
```

### Example of a PL/pgSQL function with error handling

```sql
CREATE OR REPLACE FUNCTION safe_divide(a numeric, b numeric) RETURNS numeric AS $$
BEGIN
  IF b = 0 THEN
    RAISE EXCEPTION 'division by zero';
  END IF;
  RETURN a / b;
EXCEPTION WHEN division_by_zero THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

---

## Tips, common pitfalls & next steps

* **Use `EXPLAIN ANALYZE`** to find slow queries.
* **Avoid storing huge unindexed JSONB** blobs if you need to query them frequently.
* **Prefer `timestamp with time zone`** (timestamptz) for global applications.
* **Be careful with `serial`** on very high-scale systems — consider `bigserial` or externally supplied UUIDs for sharding.
* **Watch autovacuum** — tune if you have many updates/deletes.
* **Test your backup/restore** regularly — a backup that never restores is useless.
* **Use connection pooling** (pgbouncer) for web apps with many short-lived connections.

---
