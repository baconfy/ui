<?php

declare(strict_types=1);

namespace Package\Tests;

use Orchestra\Testbench\Concerns\WithWorkbench;

abstract class TestCase extends \Orchestra\Testbench\TestCase
{
    use WithWorkbench;
}
