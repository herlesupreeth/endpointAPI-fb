endpointAPI-fb
============================================================================

API endpoint for Facebook with following request format 

"GET /api/stats?ad_ids=1,2,3&start_time=2013-09-01&end_time=2013-10-01".

## Install

```bash
$ npm install express
$ npm install sqlite3
```

## Run

Run the Python script "createAndloadDB.py" to create the database and also to load the values from .tsv files to this database.

```bash
$ python createAndloadDB.py
```

Then, run apiendpoint.js to provide API endpoint over SQL database

```bash
$ nodejs apiendpoint.js
```

## Usage Example

```bash
$ curl -i -H "Accept: application/json" "http://localhost:3000/api/stats?ad_ids=1,2,3&start_time=2013-09-01&end_time=2013-10-01"
```

#License
The MIT License (MIT)

Copyright (c) 2015 herlesupreeth

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.