<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="mobile-web-app-capable" content="yes"/>

    <!-- Page Title -->
    <title>{{ config('app.name', 'Baconfy') }} :: {{ __($attributes['page-title']) }}</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Styles -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" rel="stylesheet" />
    <link rel="icon" href="{{ config('ui.brand-icon') }}" type="image/svg+xml" />
    <link rel="stylesheet" href="/baconfy/ui/vendor.css" />
    <link rel="stylesheet" href="/baconfy/ui/css/app.css" />
    @stack('styles')
</head>

<body {!! $attributes->merge(['class' => 'bg-white dark:bg-gray-800']) !!}>
    {{ $slot }}
</body>

<!-- Scripts -->
<script src="/baconfy/ui/vendor.js"></script>
<script src="/baconfy/ui/app.js"></script>
@stack('scripts')
</html>