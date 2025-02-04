<?php

declare(strict_types=1);

use Baconfy\Ui\UiServiceProvider;
use Illuminate\Support\ServiceProvider;

it('registers the service provider', function () {
    $provider = $this->app->getProvider(UiServiceProvider::class);

    expect($provider)->toBeInstanceOf(ServiceProvider::class);
})->group('service-provider');

// it('loads the configuration file', function () {
//    expect(config('ui.chave'))->toBe('valor_padrao');
// })->group('configuration')->withServiceProviders([UiServiceProvider::class]);
