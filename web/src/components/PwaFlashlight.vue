<template>
  <div class="center">
    <button class="btn" :disabled="isDisabled" @click="toggleIt" v-bind:class="{ active: toggle }"></button>
  </div>
</template>

<script>
export default {
  name: "PwaFlashlight",
  data() {
    return {
      toggle: false,
      isDisabled:false,
      track: null
    };
  },
  methods: {
    toggleIt() {
      if (!this.toggle) {
        this.start();
      } else {
        this.stop();
      }
    },
    start() {
      this.isDisabled=true;
      var SUPPORTS_MEDIA_DEVICES = "mediaDevices" in navigator;
      try {
        if (SUPPORTS_MEDIA_DEVICES) {
          //Get the environment camera (usually the second one)
          navigator.mediaDevices
            .enumerateDevices()
            .then(devices => {
              let cameras = devices.filter(
                device => device.kind === "videoinput"
              );

              if (cameras.length === 0) {
                throw "No camera found on this device.";
              }
              let camera = cameras[cameras.length - 1];

              // Create stream and get video track
              navigator.mediaDevices
                .getUserMedia({
                  video: {
                    deviceId: camera.deviceId,
                    facingMode: ["user", "environment"]
                  }
                })
                .then(stream => {
                  let track = stream.getVideoTracks()[0];
                  this.track = track;

                  //Create image capture object and get camera capabilities
                  let imageCapture = new ImageCapture(track);
                  let photoCapabilities = imageCapture
                    .getPhotoCapabilities()
                    .then(() => {
                      this.isDisabled=false;
                      this.toggle = true;
                      track.applyConstraints({
                        advanced: [{ torch: true }]
                      });
                    });
                });
            })
            .catch(err => {
              alert("Нет поддерживаемых устройств");
            });
        }
      } catch (err) {
        alert(err);
      }
    },
    stop() {
      if (this.track) {
        this.isDisabled=true;
        this.track.stop();
        this.isDisabled=false;
        this.toggle = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100%;
  position: relative;
  background-color: white;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.btn {
  background-color: DodgerBlue;
  /* Blue background */
  border: none;
  display: block;
  height: 300px;
  width: 300px;
  font-size: 48px;
  border-radius: 50%;
  outline: none;
  /* Mouse pointer on hover */
}
.btn:active {
  -webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  background: #2c37cf;
  border: solid 2px #203e5f;
}
.btn:hover {
  border: solid 2px #203e5f;
}
/* Darker background on mouse-over */
.active {
  -webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  background: #e7ffa4;
  border: solid 2px #203e5f;
}
</style>
