<?php

namespace Database\Seeders;

use App\Models\Direction;
use Illuminate\Database\Seeder;

class DirectionSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $directions = [
            ['id' => 1, 'name' => '1C Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'Android Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'BI Analyst', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name' => 'Business Analyst', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name' => 'C/C++ Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'name' => 'C# ', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7, 'name' => 'Data Analyst', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8, 'name' => 'Database Administrator', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'name' => 'Database Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'name' => 'Data Engineer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'name' => 'Data Scientist', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'name' => 'DevOps', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 13, 'name' => 'Embedded Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 14, 'name' => 'Flutter Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 15, 'name' => 'Frontend Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 16, 'name' => 'Golang Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 17, 'name' => 'HR Manager', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 18, 'name' => 'iOS Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 19, 'name' => 'Java Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 20, 'name' => 'Machine Learning Engineer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 21, 'name' => 'Network Engineer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 22, 'name' => 'Node.js Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 23, 'name' => 'Pentester', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 24, 'name' => 'PHP Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 25, 'name' => 'Product Analyst', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 26, 'name' => 'Product Designer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 27, 'name' => 'Product Manager', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 28, 'name' => 'Project Manager', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 29, 'name' => 'Python Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 30, 'name' => 'QA Engineer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 31, 'name' => 'Ruby Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 32, 'name' => 'Rust Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 33, 'name' => 'Scala Developer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 34, 'name' => 'System Administrator', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 35, 'name' => 'System Analyst', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 36, 'name' => 'Unity Developer', 'created_dat' => $now, 'updated_at' => $now],
            ['id' => 37, 'name' => 'Unreal Engine Developer', 'created_dat' => $now, 'updated_at' => $now],
            ['id' => 38, 'name' => 'UX/UI Designer', 'created_dat' => $now, 'updated_at' => $now],
        ];

        Direction::query()->insert($directions);
    }
}
