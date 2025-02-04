<!DOCTYPE html>
<html class="h-full" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title inertia>{{ config('app.name', 'Maqden') }}</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=nunito:200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|poetsen-one:400" rel="stylesheet"/>

  <!-- Scripts -->
  @viteReactRefresh
  @vite(['workbench/resources/js/app.jsx', "resources/pages/{$page['component']}.jsx"])
  @inertiaHead
</head>
<body class="h-full font-sans antialiased">
  @inertia
</body>
</html>