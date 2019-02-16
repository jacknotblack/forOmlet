import React, { Component } from "react";
import { webSocket } from "rxjs/webSocket";
import {
  map,
  mergeMap,
  switchMap,
  catchError,
  retryWhen,
  delay,
  tap
} from "rxjs/operators";

class Player extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    var arrayBuffer;
    var arrayBufferNew;
    var uint8ArrayNew;
    var fileReader = new FileReader();
    // fileReader.onload = function(event) {
    //   arrayBuffer = event.target.result;
    // };

    fileReader.onload = function() {
      arrayBuffer = this.result;
  };
    // fileReader.readAsArrayBuffer(blob);
    // this.props.play(1);
    this.socket$ = webSocket({
      url: "ws://35.247.82.159:8080",
      serializer: raw => raw,
      deserializer: raw => raw
    });
    console.log(this.socket$);
    this.socket$.subscribe(e => {
      // console.log(e.data);
      const mediaSource = this.state.mediaSource

      var sourceBuffer = mediaSource.addSourceBuffer(
        'video/mp4; codecs="avc1.42E01E"'
      );
      fileReader.readAsArrayBuffer(e.data);
      console.log(arrayBuffer)
      if (arrayBuffer !== undefined) {
        sourceBuffer.appendBuffer(arrayBuffer);
      }
      else console.log(999)
      console.log(sourceBuffer)
      console.log(mediaSource)
      this.setState({ video: e.data, sourceBuffer, mediaSource });
    });
    this.socket$.next("video 1");

    // var mimeCodec = 'video/mp4; codecs="avc1.42E01E"';
    // console.log(MediaSource.isTypeSupported(mimeCodec));
    // if (MediaSource.isTypeSupported(mimeCodec)) {
    //   // Create Media Source
    //   console.log(1)
    const mediaSource = new MediaSource();
    this.setState({ mediaSource });
    // mediaSource.addEventListener('sourceopen', this.test, false); // mediaSource.readyState === 'closed'
    // } else {
    // console.error("Unsupported media format");
    // }
  }

  test = e => {
    console.log(this.state.video);
    this.state.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"');
    // this.setState(sourceBuffer)
    // sourceBuffer.appendBuffer(this.state.video);
  };

  render() {
    // console.log(this.state.video)
    console.log(this.state.mediaSource);
    return (
      <div>
        Player
        {this.state.mediaSource && (
          <video src={URL.createObjectURL(this.state.mediaSource)} />
        )}
        {this.video}
      </div>
    );
  }
}

export default Player;
