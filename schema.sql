CREATE TABLE IF NOT EXISTS records (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80) NOT NULL,
  category VARCHAR(40) NOT NULL,
  description VARCHAR(300) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Pending', 'In progress', 'Completed'))
);
CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY);
