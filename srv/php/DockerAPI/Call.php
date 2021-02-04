<?php

namespace DockerAPI;

class Call {

  protected $socket = '/var/run/docker.sock';
  protected $endpoint;
  protected $method = 'GET';
  protected $body;

  public function get($endpoint) {
    $this->endpoint = (string) $endpoint;
    $this->method = "GET";
    $this->_relay();
  }

  public function post($endpoint, $body = "") {
    $this->endpoint = (string) $endpoint;
    $this->method   = "POST";
    $this->body     = (string) $body;
    $this->_relay();
  }

  private function _relay() {

    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL             , "http://localhost/{$this->endpoint}");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER  , true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION  , true);
    curl_setopt($curl, CURLOPT_HTTP_VERSION    , CURL_HTTP_VERSION_1_1);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST   , $this->method);
    curl_setopt($curl, CURLOPT_UNIX_SOCKET_PATH, $this->socket);

    switch( $this->method ) {
      case "POST":
      case "PUT":
        curl_setopt($curl, CURLOPT_HTTPHEADER, array( "Content-Type: application/json" ));
        curl_setopt($curl, CURLOPT_POSTFIELDS, $this->body);
        break;
      default:
    }

    $answer = curl_exec($curl);
    $infos  = curl_getinfo($curl);
    $code   = $infos['http_code'];

    curl_close($curl);

    header("HTTP 1.1 $code");
    header('Content-Type: application/json');
    die($answer);

  }


}

?>
