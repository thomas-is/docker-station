<?php

namespace DockerAPI;

class Call {

  protected $socket = '/var/run/docker.sock';
  protected $endpoint;
  protected $method = 'GET';
  protected $payload;


  public function __construct() {
    $this->payload = new \stdClass;
  }

  public function get($endpoint) {
    $this->endpoint = (string) $endpoint;
    $this->method = "GET";
    $this->_relay();
  }

  private function _relay() {

    $curl = curl_init();

    $opts = array();
    $opts[CURLOPT_URL             ] = "http://localhost/{$this->endpoint}";
    $opts[CURLOPT_RETURNTRANSFER  ] = true;
    $opts[CURLOPT_FOLLOWLOCATION  ] = true;
    $opts[CURLOPT_HTTP_VERSION    ] = CURL_HTTP_VERSION_1_1;
    $opts[CURLOPT_CUSTOMREQUEST   ] = $this->method;
    $opts[CURLOPT_UNIX_SOCKET_PATH] = $this->socket;

    switch( $this->method ) {
      case "POST":
      case "PUT":
        $opts[CURLOPT_POSTFIELDS] = json_encode($this->payload);
        $opts[CURLOPT_HTTPHEADER] = array( "Content-Type: application/json" );
        break;
      default:
    }

    curl_setopt_array( $curl, $opts );

    $answer = curl_exec($curl);
    $infos  = curl_getinfo($curl);
    $code = $infos['http_code'];

    curl_close($curl);

    header("HTTP 1.1 $code");
    header('Content-Type: application/json');
    die($answer);

  }


}

?>
