/* This Source Code Form is subject to the terms of the Mozilla Public
 License, v. 2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var DriverManager = (function() {
  var client = null;

  function connectToDriverManager() {
    if (navigator.mozFFOSAssistant.isDriverManagerRunning &&
        navigator.mozFFOSAssistant.driverManagerPort) {
      client = new TelnetClient({
        // host: '10.241.5.197',
        host: '10.241.5.178',
        port: navigator.mozFFOSAssistant.driverManagerPort,
        onmessage: onmessage,
        onopen: onopen,
        onclose: onclose
      }).connect();
    } else {
      console.log("DriverManager process is not running!");
    }
  }

  window.addEventListener('load', function(event) {
    window.setTimeout(function() {
      // TODO Check peirodically
      // Check if the process is running, start it if not
      if (!navigator.mozFFOSAssistant.isDriverManagerRunning) {
        navigator.mozFFOSAssistant.startDriverManager();
        // FIXME 1000 may not enough when running on a lower computer.
        window.setTimeout(connectToDriverManager, 1000);
      } else {
        connectToDriverManager();
      }
    }, 1000);
  });

  function onmessage(msg) {
    console.log("Message: " + msg);
  }

  function onopen() {
    console.log('Telnet client is opened.');
    client.sendCommand("info");
  }

  function onclose() {
    console.log('Telnet client is closed.');
  }

  return {

  };
})();

