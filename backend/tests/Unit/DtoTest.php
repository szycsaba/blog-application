<?php

namespace Tests\Unit;

use App\DTO\CreatePostData;
use App\DTO\UpdatePostData;
use PHPUnit\Framework\TestCase;

class DtoTest extends TestCase
{
    public function test_create_post_data_holds_values(): void
    {
        $dto = new CreatePostData(
            userId: 7,
            title: 'Hello',
            content: 'World'
        );

        $this->assertSame(7, $dto->userId);
        $this->assertSame('Hello', $dto->title);
    }

    public function test_update_post_data_holds_values(): void
    {
        $dto = new UpdatePostData(
            id: 9,
            title: 'Updated',
            content: 'Body'
        );

        $this->assertSame(9, $dto->id);
        $this->assertSame('Updated', $dto->title);
    }
}
