<?php

namespace Tests\Unit;

use App\DTO\ServiceResponse;
use PHPUnit\Framework\TestCase;

class ServiceResponseTest extends TestCase
{
    public function test_to_array_filters_nulls(): void
    {
        $response = new ServiceResponse(success: true);
        $data = $response->toArray();

        $this->assertTrue($data['success']);
        $this->assertArrayNotHasKey('message', $data);
    }
}
