var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('smartly.db');

var express = require('express');
var restapi = express();

restapi.set('json spaces', 4);

restapi.get('/api/stats', function(req, res){
	var ad_ids = req.query.ad_ids;
	var start_time = req.query.start_time;
	var end_time = req.query.end_time;
	if(ad_ids == "" || ad_ids === undefined || start_time == "" || start_time === undefined || end_time == "" || end_time === undefined){
		res.json({ "invalidURL" : "Please provide a valid URL" });
	}
	else {
		db.parallelize(function() {
			
			var query_str = "SELECT ad_id, sum(impressions) AS impressions, sum(clicks) AS clicks, sum(spent) AS spent FROM ad_statistics WHERE ad_id IN ("+ ad_ids +") "
			query_str += "AND date BETWEEN date('" + start_time + "') AND date('" + end_time + "') GROUP BY ad_id"
			var statarray, actarray;
			var result_dict = {};
			
			db.all(query_str, function(err, rows){
				statarray = rows;
				for(row in statarray){
					result_dict[statarray[row]['ad_id']] = {
						"impressions": statarray[row]['impressions'],
						"clicks": statarray[row]['clicks'],
						"spent": statarray[row]['spent'],
						"actions": {}
					};
				}

				var act_query_str = "SELECT ad_id, action, sum(count) AS count, sum(value) AS value FROM ad_actions WHERE ad_id IN ("+ ad_ids +") "
				act_query_str += "AND date BETWEEN date('" + start_time + "') AND date('" + end_time + "') GROUP BY ad_id, action ORDER BY ad_id"
				
				db.all(act_query_str, function(err, rows){
					actarray = rows;
					for(row in actarray){
						result_dict[actarray[row]['ad_id']]["actions"][actarray[row]['action']] = {
							"count": actarray[row]['count'],
							"value": actarray[row]['value']
						};
					}
					res.json(result_dict);
				});
			});			
		});
	}	
});

restapi.listen(3000);

console.log("Submit GET to http://localhost:3000/api/stats");