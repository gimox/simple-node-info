NODEJS INFO
===================
Simple class for get basic system info


How It Works
-------------
Get stat value in string format, except getStat() that return json.


```javascript


const info = require('node-info');
const allStat = info.getStat(); //get all data
const pid =  info.getPid(); // get pid process

    console.log(pid);
    console.log(allStat);

```



Functions
-------------

getPid: get process number

upTime: get uptime server

getNodeVersion: get nodeJs version number installed in server

getStartInfo: get currente server date

getLoadAvg: return CPU load average

getFreeMemory: get free server memory

getMemoryUsage: get memory used

getEnv: get enviroment vars

getHostname: return server hostname

getIp: return array of server ip

getStat: all stat in json format