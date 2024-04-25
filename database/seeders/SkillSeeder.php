<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $skills = [
            ['id' => 1, 'name' => 'Python', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'Django', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'Docker', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name' => 'Redis', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name' => 'Celery', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'name' => 'Git', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7, 'name' => 'PostgreSQL', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8, 'name' => 'SQL', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'name' => 'Linux', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'name' => 'JavaScript', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'name' => 'RabbitMQ', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'name' => 'REST', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 13, 'name' => 'HTML', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 14, 'name' => 'MySQL', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 15, 'name' => 'CSS', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 16, 'name' => 'API', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 17, 'name' => 'ООП', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 18, 'name' => 'React', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 19, 'name' => 'SQLAlchemy', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 20, 'name' => 'Nginx', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 21, 'name' => 'CI/CD', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 22, 'name' => 'Pandas', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 23, 'name' => 'Selenium', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 24, 'name' => 'SOLID', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 25, 'name' => 'Unit', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 26, 'name' => 'Testing', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 27, 'name' => 'Gitlab', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 28, 'name' => 'Ubuntu', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 29, 'name' => 'SPA', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 30, 'name' => 'JSON', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 31, 'name' => 'Swagger', 'created_at' => $now, 'updated_at' => $now],
        ];

        Skill::query()->insert($skills);
    }
}
