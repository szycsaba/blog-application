<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'john',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'susan',
            'email' => 'susan@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}
