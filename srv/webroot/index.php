<!DOCTYPE html>
<html>
<head>
<title>Docker Station</title>
<meta charset="utf8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#222">
<link href="main.css" rel="stylesheet" type="text/css">
<link rel="icon" type="image/png" href="pics/docker.png" />
</head>


<script src="containers.js"></script>


<body onload="boot()">

<header></header>

<main>

<div id="containers"></div>

</main>

<footer></footer>

<template id="container">
  <p class="name"></p>
  <p class="state"></p>
  <p class="status"></p>
</template>

</body>
</html>
