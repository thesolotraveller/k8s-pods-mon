// const k8s = require('@kubernetes/client-node');

// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// k8sApi.listNamespacedPod('default').then((res) => {
//     console.log(JSON.stringify(res.body));
// });

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/podsHealth', async (req, res) => {
  const { stdout, stderr } = await exec('kubectl top pods --all-namespaces');

  if (stderr) {
    res.status(500).json({
      error: stderr
    })
  }
  const podsList = stdout.split('\n');
  let podsData = [];
  if (podsList.length > 1) {
    for (let i=1; i<podsList.length-1; ++i) {
      let dataArray = podsList[i].replace(/\s\s+/g, ' ').split(' ');
      let obj = {
          namespace: dataArray[0],
          name: dataArray[1],
          cpu: dataArray[2],
          memory: dataArray[3]
      }
      podsData.push(obj);
    }
  }

  res.status(200).json(podsData);
})

app.listen(2999, () => console.log('Server started'));