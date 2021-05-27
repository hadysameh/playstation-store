module.exports = {
    pages:{

      // index:'src/main.js',
      index:'src/views/home/main.js',
      durationcreate:'src/views/durationCreate/main.js',
      durationedit:'src/views/durationEdit/main.js',
      durationend:'src/views/durationEnd/main.js',
      devicerecord:'src/views/deviceRecords/main.js',
      devicesrecord:'src/views/devicesRecords/main.js',
    },

    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true
      }
    }
  }