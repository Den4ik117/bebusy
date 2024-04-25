<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    @vite(['resources/js/app.js'])
    <title>{{ config('app.name') }}</title>
</head>
<body class="antialiased bg-[#181818] text-white">

@auth
    <div class="lg:max-w-screen-lg max-w-md w-full mx-auto bg-[#212121] h-[100dvh] border-x border-[#0F0F0F] relative overflow-hidden">
        <div id="app"></div>
    </div>
@endauth

@guest
    <div class="max-w-md w-full mx-auto h-[100dvh] flex flex-col justify-center items-center">
        <a
            class="text-indigo-400 px-4 py-2 rounded uppercase text-sm font-medium hover:bg-indigo-100 hover:bg-opacity-10"
            href="/oauth/redirect"
        >Войти через HeadHunter</a>
    </div>
@endguest

@production
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(95091891, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/95091891" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
@endproduction
</body>
</html>
