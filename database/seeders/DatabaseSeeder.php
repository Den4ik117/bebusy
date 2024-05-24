<?php

namespace Database\Seeders;

use App\Models\ChatInformation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            DirectionSeeder::class,
            ServiceSeeder::class,
            SkillSeeder::class,
            DevelopmentDirectionSeeder::class,
            GradeSeeder::class,
        ]);

        if (app()->isLocal()) {
            User::factory(10)->create();

            ChatInformation::factory(30)->create();
        }
    }
}
