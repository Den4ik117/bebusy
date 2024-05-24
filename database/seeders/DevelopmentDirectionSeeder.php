<?php

namespace Database\Seeders;

use App\Models\DevelopmentDirection;
use Illuminate\Database\Seeder;

class DevelopmentDirectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        $directions = [
            ['id' => 1, 'name' => '1C Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'Android Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'Business Analyst', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name' => 'C/C++ Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name' => 'C# Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'name' => 'Data Scientist', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7, 'name' => 'DevOps', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8, 'name' => 'Flutter Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'name' => 'Frontend Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'name' => 'Golang Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'name' => 'iOS Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'name' => 'Java Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 13, 'name' => 'Machine Learning Engineer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 14, 'name' => 'Node.js Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 15, 'name' => 'PHP Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 16, 'name' => 'Product Manager', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 17, 'name' => 'Project Manager', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 18, 'name' => 'Python Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 19, 'name' => 'QA Engineer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 20, 'name' => 'Ruby Developer', 'created_at' => $now, 'updated_at' => $now],
        ];

        DevelopmentDirection::query()->insert($directions);
    }
}
