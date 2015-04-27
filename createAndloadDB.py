import sqlite3 as lite
import csv

con = lite.connect('smartly.db')

with con:
	cur = con.cursor()
	cur.execute("DROP TABLE IF EXISTS ad_statistics")
	cur.execute("DROP TABLE IF EXISTS ad_actions")
	cur.execute("CREATE TABLE IF NOT EXISTS ad_statistics(ad_id INTEGER, date TEXT, impressions INTEGER, clicks INTEGER, spent INTEGER, PRIMARY KEY (ad_id, date, impressions, clicks, spent))")
	cur.execute("CREATE TABLE IF NOT EXISTS ad_actions(ad_id INTEGER, date TEXT, action TEXT, count INTEGER, value INTEGER, PRIMARY KEY (ad_id, date, action, count, value))")
	con.commit()

	# Load the TSV file into TSV reader
	ad_statistics_tsvfile = open('ad_statistics.tsv', 'rb')
	ad_actions_tsvfile = open('ad_actions.tsv', 'rb')

	ad_statistics_treader = csv.reader(ad_statistics_tsvfile, delimiter='\t')
	ad_actions_treader = csv.reader(ad_actions_tsvfile, delimiter='\t')

	# Iterate through the TSV reader, inserting values into the database
	for t in ad_statistics_treader:
		cur.execute('INSERT INTO  ad_statistics VALUES (?,?,?,?,?)', t)

	# Iterate through the TSV reader, inserting values into the database
	for t in ad_actions_treader:
		cur.execute('INSERT INTO  ad_actions VALUES (?,?,?,?,?)', t)

	ad_statistics_tsvfile.close()
	ad_actions_tsvfile.close()

	con.commit()

con.close()
	 