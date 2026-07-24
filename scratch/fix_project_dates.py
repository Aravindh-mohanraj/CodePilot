import sqlite3

db_path = "backend/database/interview.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Set all dates prior to 2026-07-23 to 2026-07-23 (Project Start Date)
cursor.execute("""
UPDATE questions 
SET created_date = '2026-07-23' 
WHERE created_date < '2026-07-23' OR created_date IS NULL
""")

count_updated = cursor.rowcount
conn.commit()

# Print new date distribution
cursor.execute("SELECT created_date, COUNT(*) FROM questions GROUP BY created_date ORDER BY created_date DESC")
print("Updated Date Distribution:")
for row in cursor.fetchall():
    print(f"Date: {row[0]} -> {row[1]} Questions")

conn.close()
