<?php

namespace App\Repositories;

interface UserRepositoryInterface
{
    public function createUser(array $data): array;
    public function findByEmail(string $email): ?\App\Models\User;
}
